// Scramble text animation
const targetText = "Kelvin Puch";
const chars = "!¡?¿=<>@%$#&][/ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

let spans = [];
let scrambleInterval;

function buildText(container) {
  container.innerHTML = '';
  targetText.split('').forEach(char => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? ' ' : '';
    if (char !== ' ') span.classList.add('flicker');
    container.appendChild(span);
  });
}

function startScramble(container) {
  spans = container.querySelectorAll('span');

  scrambleInterval = setInterval(() => {
    spans.forEach((span, i) => {
      if (targetText[i] === ' ') return;
      if (!span.dataset.locked) {
        span.textContent = chars[Math.floor(Math.random() * chars.length)];
      }
    });
  }, 50);
  setTimeout(() => revealNext(0, container), 810);
}

function revealNext(index, container) {
  if (index >= spans.length) {
    clearInterval(scrambleInterval);
    return;
  }
  const span = spans[index];
  if (targetText[index] === ' ') {
    revealNext(index + 1, container);
    return;
  }
  span.dataset.locked = true;
  span.textContent = targetText[index];
  span.classList.remove('flicker');
  setTimeout(() => revealNext(index + 1, container), 53);
}

// Initialize scramble text animation when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById("scramble");
  
  if (container) {
    // Intersection Observer for scramble text
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          buildText(container);
          startScramble(container);
        } else {
          console.log("future test, if I dont forget");
        }
      });
    }, {
      threshold: 0.5
    });

    observer.observe(container);
  }
});

// Dropdown menu functionality
document.addEventListener('DOMContentLoaded', function () {
  const dropdown = document.getElementById('contact-link');
  
  if (dropdown) {
    dropdown.addEventListener('click', function (event) {
      event.preventDefault();
      dropdown.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function (e) {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('active');
      }
    });

    // Allow links inside dropdown to work normally
    document.querySelectorAll('.dropdown-menu a').forEach(link => {
      link.addEventListener('click', function (event) {
        event.stopPropagation();
      });
    });
  }
});

// Fade in on scroll
document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible");
      }
    });
  }, {
    threshold: 0.1
  });
  
  document.querySelectorAll('.fade-in-on-scroll').forEach(el => {
    observer.observe(el);
  });
});

// Navigation animation
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('nav > ul');
  const items = document.querySelectorAll('nav > ul li a');
  let anim = null;
  let currentActiveItem = null;

  if (!nav || items.length === 0) return;

  const animate = (from, to) => {
    if (anim) clearInterval(anim);

    const start = Date.now();
    anim = setInterval(() => {
      const p = Math.min((Date.now() - start) / 500, 1);
      const e = 1 - Math.pow(1 - p, 3);

      const x = from + (to - from) * e;
      const y = -40 * (4 * e * (1 - e));
      const r = 200 * Math.sin(p * Math.PI);

      nav.style.setProperty('--translate-x', `${x}px`);
      nav.style.setProperty('--translate-y', `${y}px`);
      nav.style.setProperty('--rotate-x', `${r}deg`);

      if (p >= 1) {
        clearInterval(anim);
        anim = null;
        nav.style.setProperty('--translate-y', '0px');
        nav.style.setProperty('--rotate-x', '0deg');
      }
    }, 16);
  };

  const getCurrentPosition = () => parseFloat(nav.style.getPropertyValue('--translate-x')) || 0;

  const getItemCenter = (item) => {
    return item.getBoundingClientRect().left + item.offsetWidth / 2 - nav.getBoundingClientRect().left - 5;
  };

  const moveToItem = (item) => {
    const current = getCurrentPosition();
    const target = getItemCenter(item);
    animate(current, target);
  };

  const setActiveItem = (item) => {
    if (currentActiveItem) {
      currentActiveItem.classList.remove('active');
    }

    currentActiveItem = item;
    item.classList.add('active');
    moveToItem(item);
  };

  const handleMouseLeave = () => {
    if (currentActiveItem) {
      moveToItem(currentActiveItem);
    } else {
      if (anim) clearInterval(anim);
    }
  };

  items.forEach(item => {
    item.addEventListener('mouseenter', () => moveToItem(item));
    item.addEventListener('mouseleave', handleMouseLeave);
    item.addEventListener('click', () => setActiveItem(item));
  });

  nav.addEventListener('mouseleave', handleMouseLeave);

  if (items.length > 0) {
    setTimeout(() => {
      setActiveItem(items[0]);
    }, 100);
  }
});
