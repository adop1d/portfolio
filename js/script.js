// Scramble text animation
const targetText = "Kelvin Puche";
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
    let hasScrambled = false;

    // Intersection Observer for scramble text
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasScrambled) {
          hasScrambled = true;
          buildText(container);
          startScramble(container);
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

// Fallback para imágenes rotas
document.addEventListener('error', function(e) {
  const img = e.target;
  if (img.tagName === 'IMG') {
    img.style.display = 'none';
    const fallback = document.createElement('span');
    fallback.className = 'img-fallback';
    fallback.textContent = '🖼 imagen no disponible';
    img.parentNode?.insertBefore(fallback, img.nextSibling);
  }
}, true);


