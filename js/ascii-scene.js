/**
 * Sondaven-style WebGL grid dither scenes (local videos in assets/scenes/).
 */
(function () {
  const BP = 992;
  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isDesk = () => window.innerWidth >= BP;
  const SCENE_BASE = 'assets/scenes/';

  const ASSETS = {
    clouds02: SCENE_BASE + 'claudes_02.mp4',
    clouds03: SCENE_BASE + 'claudes_03.mp4',
    prologR: SCENE_BASE + 'prolog-r-c.mp4',
  };

  const FALLBACK_COLORS = {
    bg: [0.14, 0.13, 0.14],
    fill: [0.93, 0.91, 0.93],
  };

  function cssColorToRgb(input) {
    if (!input) return null;
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 1;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    try {
      ctx.fillStyle = '#000000';
      ctx.fillStyle = input.trim();
      const normalized = ctx.fillStyle;
      if (normalized.startsWith('#')) {
        const hex = normalized.length >= 7 ? normalized.slice(0, 7) : normalized;
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        if ([r, g, b].some(Number.isNaN)) return null;
        return [r / 255, g / 255, b / 255];
      }
      const m = normalized.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
      if (m) return [+m[1] / 255, +m[2] / 255, +m[3] / 255];
    } catch (_) {}
    return null;
  }

  function themeColors() {
    const root = getComputedStyle(document.documentElement);
    const bg = cssColorToRgb(root.getPropertyValue('--color-paper')) || FALLBACK_COLORS.bg;
    const fill = cssColorToRgb(root.getPropertyValue('--color-ink')) || FALLBACK_COLORS.fill;
    return { bg, fill };
  }

  function compileShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('[ascii-scene] shader:', gl.getShaderInfoLog(shader));
      return null;
    }
    return shader;
  }

  function resolveDrawBounds(cfg, cw, ch, vwBase, tw, th, toPx) {
    const boxX = toPx(cfg.x ?? 0, cw, vwBase);
    const boxY = toPx(cfg.y ?? 0, ch, vwBase);
    const boxW = toPx(cfg.width ?? '100%', cw, vwBase);
    const boxH = toPx(cfg.height ?? '100%', ch, vwBase);

    let x0 = boxX;
    let y0 = boxY;
    let bw = boxW;
    let bh = boxH;

    if (cfg.aspectFit && tw > 0 && th > 0) {
      const ar = tw / th;
      const boxAr = boxW / boxH;
      if (cfg.aspectFit === 'cover') {
        if (boxAr > ar) bh = boxW / ar;
        else bw = boxH * ar;
      } else {
        if (boxAr > ar) bw = boxH * ar;
        else bh = boxW / ar;
      }

      const alignX = cfg.alignX || 'center';
      const alignY = cfg.alignY || 'center';
      if (alignX === 'center') x0 = boxX + (boxW - bw) / 2;
      else if (alignX === 'right') x0 = boxX + boxW - bw;
      if (alignY === 'center') y0 = boxY + (boxH - bh) / 2;
      else if (alignY === 'bottom') y0 = boxY + boxH - bh;
    }

    let gx = cfg.xSquares ?? 100;
    let gy = cfg.ySquares ?? 100;
    if (cfg.squareCells !== false && bw > 0) {
      const cell = bw / gx;
      gy = Math.max(1, Math.round(bh / cell));
    }

    return { x0, y0, bw, bh, gx, gy };
  }

  function initCanvasEffect(target, layers) {
    const nodes = typeof target === 'string' ? [...document.querySelectorAll(target)] : [target];
    const instances = nodes.map((node) => createCanvasInstance(node, layers)).filter(Boolean);
    if (!instances.length) return null;
    return {
      destroy: () => instances.forEach((i) => i.destroy()),
      loaded: Promise.all(instances.map((i) => i.loaded)),
    };
  }

  function createCanvasInstance(canvas, layers) {
    if (!canvas) return null;

    const MAX_DPR = 1.5;
    const NEIGHBOR = 2;
    const frameMs = 1000 / 60;
    const defaults = {
      gamma: 1,
      blackPoint: 0,
      whitePoint: 255,
      threshold: 255,
      ySquares: 100,
      xSquares: 100,
      minSquareWidth: '-2%',
      maxSquareWidth: '102%',
      bgOpacity: 0,
      fillOpacity: 0.92,
    };

    let neighborGlsl = '';
    for (let oy = -NEIGHBOR; oy <= NEIGHBOR; oy++) {
      for (let ox = -NEIGHBOR; ox <= NEIGHBOR; ox++) {
        if (!ox && !oy) continue;
        neighborGlsl += `
          neighbor = texture2D(u_texture, cc + vec2(${ox.toFixed(1)}, ${oy.toFixed(1)}) * texelSize);
          if (neighbor.a < 0.01 || (neighbor.r < 0.01 && neighbor.g < 0.01 && neighbor.b < 0.01)) { discard; }
        `;
      }
    }

    const gl = canvas.getContext('webgl', { alpha: true, antialias: false, premultipliedAlpha: false });
    if (!gl) return null;

    const vs = compileShader(gl, gl.VERTEX_SHADER, `attribute vec2 a_position; attribute vec2 a_texCoord;
       void main() { gl_Position = vec4(a_position, 0.0, 1.0); }`);
    const fs = compileShader(
      gl,
      gl.FRAGMENT_SHADER,
      `precision mediump float;
      uniform sampler2D u_texture; uniform vec2 u_texSize; uniform vec2 u_gridSize;
      uniform float u_minWidth; uniform float u_maxWidth; uniform float u_threshold; uniform float u_gamma;
      uniform float u_blackPoint; uniform float u_whitePoint; uniform vec3 u_bgColor; uniform vec3 u_fillColor;
      uniform float u_bgOpacity; uniform float u_fillOpacity; uniform vec4 u_bounds;
      void main() {
        vec2 p = gl_FragCoord.xy; vec2 b0 = u_bounds.xy; vec2 b1 = u_bounds.zw;
        if (p.x < b0.x || p.x > b1.x || p.y < b0.y || p.y > b1.y) discard;
        vec2 lc = (p - b0) / (b1 - b0); vec2 cs = 1.0 / u_gridSize;
        vec2 ci = floor(lc / cs); vec2 cc = (ci + 0.5) * cs;
        vec4 tc = texture2D(u_texture, cc);
        if (tc.a < 0.01 || (tc.r < 0.01 && tc.g < 0.01 && tc.b < 0.01)) discard;
        vec2 texelSize = 1.0 / u_texSize; vec4 neighbor; ${neighborGlsl}
        vec3 rgb = tc.rgb; if (u_gamma != 1.0) rgb = pow(rgb, vec3(u_gamma));
        float range = u_whitePoint - u_blackPoint;
        if (range != 0.0) rgb = clamp((rgb * 255.0 - u_blackPoint) / range, 0.0, 1.0);
        float br = dot(rgb, vec3(0.333)) * tc.a;
        if (br > u_threshold / 255.0) { gl_FragColor = vec4(u_bgColor, u_bgOpacity); return; }
        vec2 cl = (lc - ci * cs) / cs;
        float lw = ((1.0 - br) * (u_maxWidth - u_minWidth) + u_minWidth) / (b1.x - b0.x) * u_gridSize.x;
        gl_FragColor = abs(cl.x - 0.5) < lw * 0.5 ? vec4(u_fillColor, u_fillOpacity) : vec4(u_bgColor, u_bgOpacity);
      }`
    );
    if (!vs || !fs) return null;

    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
    gl.useProgram(program);

    const loc = {
      uTex: gl.getUniformLocation(program, 'u_texture'),
      uTexSize: gl.getUniformLocation(program, 'u_texSize'),
      uGrid: gl.getUniformLocation(program, 'u_gridSize'),
      uMinW: gl.getUniformLocation(program, 'u_minWidth'),
      uMaxW: gl.getUniformLocation(program, 'u_maxWidth'),
      uThr: gl.getUniformLocation(program, 'u_threshold'),
      uGam: gl.getUniformLocation(program, 'u_gamma'),
      uBP: gl.getUniformLocation(program, 'u_blackPoint'),
      uWP: gl.getUniformLocation(program, 'u_whitePoint'),
      uBg: gl.getUniformLocation(program, 'u_bgColor'),
      uFill: gl.getUniformLocation(program, 'u_fillColor'),
      uBgOpacity: gl.getUniformLocation(program, 'u_bgOpacity'),
      uFillOpacity: gl.getUniformLocation(program, 'u_fillOpacity'),
      uBounds: gl.getUniformLocation(program, 'u_bounds'),
      aPos: gl.getAttribLocation(program, 'a_position'),
      aUV: gl.getAttribLocation(program, 'a_texCoord'),
    };

    const buf = (data) => {
      const b = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, b);
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
      return b;
    };
    const buffers = {
      pos: buf(new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1])),
      uv: buf(new Float32Array([0, 1, 1, 1, 0, 0, 1, 0])),
    };
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.pos);
    gl.enableVertexAttribArray(loc.aPos);
    gl.vertexAttribPointer(loc.aPos, 2, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.uv);
    gl.enableVertexAttribArray(loc.aUV);
    gl.vertexAttribPointer(loc.aUV, 2, gl.FLOAT, false, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.activeTexture(gl.TEXTURE0);
    gl.uniform1i(loc.uTex, 0);

    const colors = themeColors();
    const applyThemeColors = () => {
      const next = themeColors();
      colors.bg = next.bg;
      colors.fill = next.fill;
      gl.uniform3fv(loc.uBg, colors.bg);
      gl.uniform3fv(loc.uFill, colors.fill);
    };
    applyThemeColors();

    let cssW = 0;
    let raf = null;
    let last = 0;
    let visible = true;
    let loaded = [];
    let destroyed = false;

    const toPx = (val, axisTotal, vwBase) => {
      if (typeof val !== 'string') return val;
      if (val.endsWith('%')) return (parseFloat(val) / 100) * axisTotal;
      if (val.endsWith('vw')) return (parseFloat(val) / 100) * vwBase;
      return parseFloat(val);
    };

    const fitCanvas = () => {
      const host = canvas.parentElement || canvas;
      const rect = host.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width));
      const h = Math.max(1, Math.round(rect.height));
      if (!w || !h) return false;
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      const pw = Math.round(w * dpr);
      const ph = Math.round(h * dpr);
      if (canvas.width !== pw || canvas.height !== ph) {
        canvas.width = pw;
        canvas.height = ph;
        cssW = w;
        gl.viewport(0, 0, pw, ph);
      }
      return true;
    };

    const ro = new ResizeObserver(() => {
      if (fitCanvas() && loaded.length) draw();
    });
    ro.observe(canvas.parentElement || canvas);

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0].isIntersecting;
        loaded.forEach((layer) => {
          if (layer.type !== 'video') return;
          if (visible) layer.el.play().catch(() => {});
          else if (!layer.el.paused) layer.el.pause();
        });
        if (visible) startLoop();
        else if (raf) {
          cancelAnimationFrame(raf);
          raf = null;
        }
      },
      { threshold: 0, rootMargin: '80px' }
    );
    io.observe(canvas);

    const makeTex = () => {
      const tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      return tex;
    };

    const loadVideo = (layer) =>
      new Promise((resolve) => {
        const video = document.createElement('video');
        video.muted = true;
        video.defaultMuted = true;
        video.loop = layer.loop !== false;
        video.playsInline = true;
        video.autoplay = true;
        video.preload = 'auto';
        video.setAttribute('muted', '');
        video.setAttribute('playsinline', '');

        (layer.sources || [{ src: layer.src, type: 'video/mp4' }]).forEach(({ src, type }) => {
          const s = document.createElement('source');
          s.src = src;
          if (type) s.type = type;
          video.appendChild(s);
        });

        const tex = makeTex();
        let ready = false;
        const item = {
          type: 'video',
          el: video,
          tex,
          config: layer.config || {},
          isReady: () => ready && video.videoWidth > 0,
          lastTime: -1,
        };

        const onReady = () => {
          if (ready || video.readyState < video.HAVE_CURRENT_DATA || !video.videoWidth) return;
          ready = true;
          gl.bindTexture(gl.TEXTURE_2D, tex);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);
          video.play().catch(() => {});
          resolve(item);
        };

        video.addEventListener('loadeddata', onReady);
        video.addEventListener('canplay', onReady);
        video.addEventListener('error', () => {
          if (!ready) {
            ready = true;
            resolve(item);
          }
        });
        video.load();
      });

    const uploadVideo = (layer) => {
      const v = layer.el;
      if (!layer.isReady() || v.readyState < v.HAVE_CURRENT_DATA) return;
      if (v.currentTime === layer.lastTime) return;
      layer.lastTime = v.currentTime;
      gl.bindTexture(gl.TEXTURE_2D, layer.tex);
      gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, gl.RGBA, gl.UNSIGNED_BYTE, v);
    };

    const drawLayer = (layer) => {
      const cfg = { ...defaults, ...layer.config };
      gl.bindTexture(gl.TEXTURE_2D, layer.tex);
      if (layer.type === 'video') uploadVideo(layer);

      const tw = layer.el.videoWidth || 1920;
      const th = layer.el.videoHeight || 1080;

      const cw = canvas.width;
      const ch = canvas.height;
      const vwBase = cssW * Math.min(window.devicePixelRatio || 1, MAX_DPR);
      const { x0, y0, bw, bh, gx, gy } = resolveDrawBounds(cfg, cw, ch, vwBase, tw, th, toPx);

      gl.uniform2f(loc.uTexSize, tw, th);
      gl.uniform2f(loc.uGrid, gx, gy);

      const cell = bw / gx;
      gl.uniform1f(loc.uMinW, toPx(cfg.minSquareWidth, cell, vwBase));
      gl.uniform1f(loc.uMaxW, toPx(cfg.maxSquareWidth, cell, vwBase));
      gl.uniform1f(loc.uThr, cfg.threshold);
      gl.uniform1f(loc.uGam, cfg.gamma);
      gl.uniform1f(loc.uBP, cfg.blackPoint);
      gl.uniform1f(loc.uWP, cfg.whitePoint);
      gl.uniform1f(loc.uBgOpacity, cfg.bgOpacity);
      gl.uniform1f(loc.uFillOpacity, cfg.fillOpacity);

      const y1 = ch - y0 - bh;
      gl.uniform4f(loc.uBounds, x0, y1, x0 + bw, y1 + bh);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const draw = () => {
      if (!loaded.length || destroyed) return;
      if (!fitCanvas()) return;
      applyThemeColors();
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      loaded.forEach((layer) => {
        if (layer.isReady()) drawLayer(layer);
      });
    };

    const loop = (t) => {
      if (visible && t - last >= frameMs) {
        last = t;
        draw();
      }
      raf = requestAnimationFrame(loop);
    };

    const startLoop = () => {
      if (raf || destroyed) return;
      last = 0;
      raf = requestAnimationFrame(loop);
    };

    fitCanvas();

    const loadedPromise = Promise.all(layers.filter((l) => !l.skip?.()).map(loadVideo)).then((items) => {
      loaded = items.filter((l) => l.isReady());
      startLoop();
      draw();
      return loaded;
    });

    return {
      loaded: loadedPromise,
      destroy() {
        destroyed = true;
        if (raf) cancelAnimationFrame(raf);
        ro.disconnect();
        io.disconnect();
        loaded.forEach((layer) => {
          if (layer.tex) gl.deleteTexture(layer.tex);
          layer.el.pause();
        });
        gl.deleteBuffer(buffers.pos);
        gl.deleteBuffer(buffers.uv);
        gl.deleteProgram(program);
        loaded = [];
      },
    };
  }

  function cloudCfg(x, y, w, h) {
    return {
      x,
      y,
      width: w,
      height: h,
      blackPoint: 25,
      whitePoint: 255,
      threshold: 255,
      bgOpacity: 0,
      fillOpacity: isDesk() ? 0.82 : 0.65,
      xSquares: isDesk() ? 110 : 90,
      ySquares: isDesk() ? 68 : 55,
    };
  }

  function flowerLayer(loop) {
    return {
      type: 'video',
      loop,
      sources: [{ src: ASSETS.prologR, type: 'video/mp4' }],
      config: {
        x: '0%',
        y: '0%',
        width: '100%',
        height: '100%',
        aspectFit: 'contain',
        alignX: 'center',
        alignY: 'center',
        squareCells: true,
        xSquares: 72,
        blackPoint: 200,
        whitePoint: 25,
        bgOpacity: 0,
        fillOpacity: 0.9,
      },
    };
  }

  function initHero() {
    const root = document.querySelector('[data-ascii-hero]');
    if (!root) return;

    const over = root.querySelector('[data-ascii-scene="hero-over"]');
    if (!over) return;

    const layers = [];

    if (isDesk()) {
      layers.push(
        { type: 'video', sources: [{ src: ASSETS.clouds02, type: 'video/mp4' }], config: cloudCfg('-24%', '0%', '64%', '40vw') },
        { type: 'video', sources: [{ src: ASSETS.clouds03, type: 'video/mp4' }], config: cloudCfg('66%', '2%', '60%', '38vw') }
      );
    } else {
      layers.push(
        { type: 'video', sources: [{ src: ASSETS.clouds02, type: 'video/mp4' }], config: cloudCfg('-18%', '2%', '55%', '28vw') },
        { type: 'video', sources: [{ src: ASSETS.clouds03, type: 'video/mp4' }], config: cloudCfg('68%', '6%', '48%', '26vw') }
      );
    }

    initCanvasEffect(over, layers);
  }

  function initSkillsFlower() {
    const desk = document.querySelector('[data-ascii-scene="skills-flower-desk"]');
    const mobile = document.querySelector('[data-ascii-scene="skills-flower-mobile"]');

    if (isDesk() && desk) initCanvasEffect(desk, [flowerLayer(false)]);
    else if (!isDesk() && mobile) initCanvasEffect(mobile, [flowerLayer(false)]);
  }

  function boot() {
    requestAnimationFrame(() => {
      initHero();
      initSkillsFlower();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
