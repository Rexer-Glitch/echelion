const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

const testimonials = document.querySelectorAll(".testimonial");
let current = 0;
let interval;

function showTestimonial(index) {
  testimonials.forEach((t) => t.classList.remove("active"));
  testimonials[index].classList.add("active");
}

document.getElementById("next").addEventListener("click", () => {
  current = (current + 1) % testimonials.length;
  showTestimonial(current);
  resetAutoScroll();
});

document.getElementById("prev").addEventListener("click", () => {
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

navToggle.addEventListener("click", (event) => {
  event.stopPropagation();
  navLinks.classList.toggle("show");
});

document.addEventListener("click", (event) => {
  const isClickInsideMenu = navLinks.contains(event.target);
  const isClickOnToggle = navToggle.contains(event.target);

  if (!isClickInsideMenu && !isClickOnToggle) {
    navLinks.classList.remove("show");
  }
});

document.querySelectorAll('.nav-links a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
    // Optionally close mobile nav
    document.getElementById("navLinks").classList.remove("show");
  });
});

const consultBtn = document.querySelector(".consultBtn");

consultBtn.addEventListener("click", () => {
  const target = document.querySelector("#contact");
  target.scrollIntoView({ behavior: "smooth" });
});

const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 10) {
    navbar.style.backgroundColor = "#000";
    navLinks.style.backgroundColor = "#000";
  } else {
    navbar.style.backgroundColor = "#222";
    navLinks.style.backgroundColor = "#222";
  }
});

document.querySelectorAll(".faq-question").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.parentElement;
    item.classList.toggle("active");
  });
});

const dividers = document.querySelectorAll(".fancy-divider");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.1,
  }
);

dividers.forEach((divider) => {
  observer.observe(divider);
});

//FAQ
const faqs = [
  {
    question: "Which Chinese universities do you help students apply to?",
    answer:
      "We work with a wide network of accredited Chinese universities, including top-ranked institutions like Tsinghua University, Zhejiang University, and more.",
  },
  {
    question: "Do I need to know Chinese to study in China?",
    answer:
      "Not necessarily. Many universities in China offer English-taught programs. We’ll help you find a course that matches your language preference and support needs.",
  },
  {
    question: "What are the admission requirements for Chinese universities?",
    answer:
      "Requirements vary by program but typically include academic transcripts, a valid passport, a personal statement, and sometimes HSK or English proficiency scores.",
  },
  {
    question: "Can you help with student visa applications?",
    answer:
      "Yes, we provide full guidance on obtaining a Chinese student visa (X1 or X2), including document preparation, interview prep, and embassy application support.",
  },
  {
    question: "Are scholarships available for international students?",
    answer:
      "Yes, we assist with Chinese Government Scholarships (CSC), provincial scholarships, and university-specific awards based on merit or financial need.",
  },
  {
    question: "How long does the application process usually take?",
    answer:
      "From document preparation to final admission, it usually takes 4–8 weeks. We recommend starting 4–6 months before the intended intake date.",
  },
];

const fuse = new Fuse(faqs, {
  keys: ["question", "answer"],
  threshold: 0.3,
});

const faqList = document.getElementById("faqList");
const searchInput = document.getElementById("searchInput");

function renderFAQs(list) {
  faqList.innerHTML = "";
  list.forEach((item) => {
    const faqItem = document.createElement("div");
    faqItem.className = "faq-item";

    const question = document.createElement("div");
    question.className = "faq-question";
    question.innerHTML = `
          <span>${item.question}</span>
          <span class="icon">+</span>
        `;

    const answer = document.createElement("div");
    answer.className = "faq-answer";
    answer.textContent = item.answer;

    question.addEventListener("click", () => {
      faqItem.classList.toggle("open");
    });

    faqItem.appendChild(question);
    faqItem.appendChild(answer);
    faqList.appendChild(faqItem);
  });
}

renderFAQs(faqs);

searchInput.addEventListener("input", (e) => {
  const query = e.target.value.trim();
  const results = query === "" ? faqs : fuse.search(query).map((r) => r.item);
  renderFAQs(results);
});

const galleryItems = document.querySelectorAll(".gallery-item");

const g_observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.2,
  }
);

galleryItems.forEach((item) => g_observer.observe(item));

function isWithinOperatingHours() {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const hour = now.getHours();

  switch (day) {
    case 0: // Sunday
      return hour >= 9 && hour < 12;
    case 1: // Monday
    case 2: // Tuesday
    case 3: // Wednesday
    case 4: // Thursday
      return hour >= 9 && hour < 18;
    case 5: // Friday
      return hour >= 9 && hour < 14;
    case 6: // Saturday
      return false;
    default:
      return false;
  }
}

window.addEventListener('DOMContentLoaded', () => {
    const isActive = isWithinOperatingHours();
    const buttons = document.querySelectorAll('.whatsapp-btn');
  
    buttons.forEach(btn => {
      const wrapper = btn.closest('.tooltip-wrapper');
      const tooltip = wrapper?.querySelector('.custom-tooltip');
  
      if (!isActive) {
        btn.classList.add('disabled');
        btn.href = 'javascript:void(0)';
        btn.style.opacity = '0.5';
        btn.style.pointerEvents = 'none';
  
        if (tooltip) {
          tooltip.style.display = 'block';
        }
      } else {
        if (tooltip) {
          tooltip.remove(); // remove tooltip if it's working hours
        }
      }
    });
  });
  
