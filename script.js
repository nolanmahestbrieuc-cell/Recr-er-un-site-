// === NAVBAR SCROLL ===
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// === BURGER MENU ===
const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = burger.querySelectorAll('span');
  const isOpen = navLinks.classList.contains('open');
  spans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
  spans[1].style.opacity = isOpen ? '0' : '1';
  spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px, -5px)' : '';
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    burger.querySelectorAll('span').forEach(s => {
      s.style.transform = '';
      s.style.opacity = '1';
    });
  });
});

// === COUNTER ANIMATION ===
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(ease * target);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target;
  }

  requestAnimationFrame(update);
}

const counters = document.querySelectorAll('.stat-number');
const statsSection = document.querySelector('.stats');
let countersStarted = false;

const statsObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting && !countersStarted) {
    countersStarted = true;
    counters.forEach(animateCounter);
  }
}, { threshold: 0.4 });

statsObserver.observe(statsSection);

// === SCROLL REVEAL ===
const revealEls = document.querySelectorAll(
  '.philo-card, .planche-card, .cours-card, .stat-item, .contact-item'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = `opacity 0.6s ease ${i * 0.07}s, transform 0.6s ease ${i * 0.07}s`;
  revealObserver.observe(el);
});

// === TESTIMONIAL SLIDER ===
const testimonials = document.querySelectorAll('.temoignage');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;
let autoSlide;

function goToSlide(index) {
  testimonials[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');
  currentSlide = index;
  testimonials[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    clearInterval(autoSlide);
    goToSlide(parseInt(dot.dataset.index, 10));
    startAutoSlide();
  });
});

function startAutoSlide() {
  autoSlide = setInterval(() => {
    goToSlide((currentSlide + 1) % testimonials.length);
  }, 5000);
}

startAutoSlide();

// === CONTACT FORM ===
const form = document.getElementById('contact-form');
const successMsg = document.getElementById('form-success');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Envoi en cours...';
  btn.disabled = true;

  setTimeout(() => {
    form.reset();
    btn.textContent = 'Envoyer le message';
    btn.disabled = false;
    successMsg.classList.add('visible');
    setTimeout(() => successMsg.classList.remove('visible'), 5000);
  }, 1200);
});

// === SMOOTH ANCHOR SCROLL (offset for fixed navbar) ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = navbar.offsetHeight + 8;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
