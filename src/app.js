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