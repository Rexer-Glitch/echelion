
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

const testimonials = document.querySelectorAll('.testimonial');
let current = 0;
let interval;

function showTestimonial(index) {
  testimonials.forEach(t => t.classList.remove('active'));
  testimonials[index].classList.add('active');
}

document.getElementById('next').addEventListener('click', () => {
  current = (current + 1) % testimonials.length;
  showTestimonial(current);
  resetAutoScroll();
});

document.getElementById('prev').addEventListener('click', () => {
  current = (current - 1 + testimonials.length) % testimonials.length;
  showTestimonial(current);
  resetAutoScroll();
});

function startAutoScroll() {
  interval = setInterval(() => {
    current = (current + 1) % testimonials.length;
    showTestimonial(current);
  }, 10000);
}

function resetAutoScroll() {
  clearInterval(interval);
  startAutoScroll();
}

// Initialize
showTestimonial(current);
startAutoScroll();



navToggle.addEventListener('click', (event) => {
  event.stopPropagation(); 
  navLinks.classList.toggle('show');
});

document.addEventListener('click', (event) => {
  const isClickInsideMenu = navLinks.contains(event.target);
  const isClickOnToggle = navToggle.contains(event.target);

  if (!isClickInsideMenu && !isClickOnToggle) {
    navLinks.classList.remove('show');
  }
});

document.querySelectorAll('.nav-links a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
      // Optionally close mobile nav
      document.getElementById('navLinks').classList.remove('show');
    });
  });

const consultBtn = document.querySelector('.consultBtn');

consultBtn.addEventListener('click', () => {
  const target = document.querySelector('#contact');
  target.scrollIntoView({ behavior: 'smooth' });
});


const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    navbar.style.backgroundColor = '#000';
    navLinks.style.backgroundColor = '#000';
  } else {
    navbar.style.backgroundColor = '#222';
    navLinks.style.backgroundColor = '#222';
  }
});
