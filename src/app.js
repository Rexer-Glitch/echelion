const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

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
    navLinks.style.color = "#fff";
  } else {
    navbar.style.backgroundColor = "#222";
    navLinks.style.backgroundColor = "#222";
    navLinks.style.color = "#fff";
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

(function () {
  emailjs.init("eqfaaN4jHgdNRqilI");
})();

document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const feedbackLabel = document.getElementById("formFeedback");
    const name = this.user_name.value.trim();
    const email = this.user_email.value.trim();
    const message = this.user_message.value.trim();

    feedbackLabel.textContent = "";
    feedbackLabel.style.color = "";

    // Basic validation
    if (!name || !email || !message) {
      feedbackLabel.textContent = "⚠️ Please fill in all fields.";
      feedbackLabel.style.color = "red";
      return;
    }

    if (!validateEmail(email)) {
      feedbackLabel.textContent = "⚠️ Please enter a valid email address.";
      feedbackLabel.style.color = "red";
      return;
    }

    // Sending feedback
    feedbackLabel.textContent = "Sending message...";
    feedbackLabel.style.color = "#007bff";

    emailjs.sendForm("service_u3xk96d", "template_367rriq", this).then(
      () => {
        feedbackLabel.textContent = "✅ Your message was sent successfully!";
        feedbackLabel.style.color = "green";
        this.reset();
      },
      (error) => {
        console.error("EmailJS Error:", error);
        feedbackLabel.textContent =
          "❌ Oops! Message failed. Please try again later.";
        feedbackLabel.style.color = "red";
      }
    );
  });

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

//Testimonials

(function () {
  const root = document.getElementById("testimonials");
  if (!root) return;
  const DATA = [
    {
      name: "Winnifred K.",
      role: "Uganda → Xiangtan University",
      text: "I secured a full scholarship to study Environmental Engineering in China. Learning Mandarin alongside my master’s helped me fully integrate and grow academically.",
      ratingText: "Scholarship & integration",
    },
    {
      name: "Kofi A.",
      role: "Ghana → Tsinghua University",
      text: "China’s fast-paced development and tech-forward economy inspired my decision to study here. The internship opportunities opened up thanks to strong academic-industry ties.",
      ratingText: "Technology & opportunity",
    },
    {
      name: "Chimamanda O.",
      role: "Nigeria → Shandong University",
      text: "I wanted a globally recognized degree without exorbitant costs. Studying in China gave me access to top universities with great value and cultural immersion.",
      ratingText: "Value-driven experience",
    },
  ];

  const carousel = root.querySelector("#t-carousel");
  const prevBtn = root.querySelector("#t-prev");
  const nextBtn = root.querySelector("#t-next");
  const dotsWrap = root.querySelector("#t-dots");

  const star =
    '<svg viewBox="0 0 24 24" fill="#fbbc04" aria-hidden="true"><path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z"/></svg>';
  DATA.forEach((t, idx) => {
    const slide = document.createElement("article");
    slide.className = "slide" + (idx === 0 ? " stack-0" : " stack-rest");
    slide.innerHTML = `
      <div class="bubble">
        <svg class="quoteMark" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7.17 6C4.88 6 3 7.88 3 10.17c0 2.18 1.69 3.83 3.8 3.83 1.76 0 3.2-1.24 3.2-2.99 0-1.67-1.2-2.89-2.92-2.89-.35 0-.69.05-1.01.15.33-1.27 1.35-2.02 2.77-2.02V6h-1.01z"/></svg>
        <h2 class="title">${t.name}</h2>
        <p class="role">${t.role}</p>
        <p class="text">“${t.text}”</p>
        <div class="rating" aria-label="Rated 5 out of 5">
          <span class="stars" aria-hidden="true">${star.repeat(5)}</span>
          <span class="caption">${t.ratingText}</span>
        </div>
      </div>`;
    carousel.appendChild(slide);
  });

  const slides = Array.from(carousel.querySelectorAll(".slide"));
  let i = 0,
    timer = null,
    animating = false;

  const dots = slides.map((_, idx) => {
    const b = document.createElement("button");
    b.className = "dot";
    b.type = "button";
    b.setAttribute("role", "tab");
    b.setAttribute("aria-label", `Go to testimonial ${idx + 1}`);
    b.addEventListener("click", () => go(idx));
    dotsWrap.appendChild(b);
    return b;
  });

  function mark() {
    dots.forEach((d, idx) =>
      d.setAttribute("aria-current", idx === i ? "true" : "false")
    );
  }
  function jitterTilt(min = -0.8, max = 0.8) {
    return (Math.random() * (max - min) + min).toFixed(2) + "deg";
  }
  function jitterX(px = 6) {
    return Math.round(Math.random() * px - px / 2) + "px";
  }

  function restack() {
    slides.forEach((s) => {
      s.classList.remove(
        "stack-0",
        "stack-1",
        "stack-2",
        "stack-rest",
        "promote",
        "demote"
      );
      s.style.removeProperty("--r1");
      s.style.removeProperty("--x1");
      s.style.removeProperty("--r2");
      s.style.removeProperty("--x2");
      s.style.removeProperty("--tilt");
    });
    const order = [i, (i + 1) % slides.length, (i + 2) % slides.length];
    slides[order[0]].classList.add("stack-0");
    slides[order[0]].style.setProperty("--tilt", jitterTilt(-0.4, 0.4));
    slides[order[1]].classList.add("stack-1");
    slides[order[1]].style.setProperty("--r1", jitterTilt(-0.8, 0.8));
    slides[order[1]].style.setProperty("--x1", jitterX());
    slides[order[1]].style.setProperty("--tilt", jitterTilt(-0.6, 0.6));
    slides[order[2]].classList.add("stack-2");
    slides[order[2]].style.setProperty("--r2", jitterTilt(-0.8, 0.8));
    slides[order[2]].style.setProperty("--x2", jitterX());
    slides[order[2]].style.setProperty("--tilt", jitterTilt(-0.6, 0.6));
    slides.forEach((s, idx) => {
      if (!order.includes(idx)) s.classList.add("stack-rest");
    });
  }

  function go(nextIndex) {
    if (animating || nextIndex === i) return;
    animating = true;
    stop();
    const current = slides[i];
    const next = slides[nextIndex];
    next.classList.add("promote");
    current.classList.add("demote");
    const onDone = (e) => {
      if (e.target !== current) return;
      current.removeEventListener("animationend", onDone);
      i = nextIndex;
      restack();
      mark();
      animating = false;
      start();
    };
    current.addEventListener("animationend", onDone);
  }

  function next() {
    go((i + 1) % slides.length);
  }
  function prev() {
    go((i - 1 + slides.length) % slides.length);
  }
  function start() {
    stop();
    timer = setInterval(next, 5000);
  }
  function stop() {
    clearInterval(timer);
  }

  // init
  restack();
  mark();
  start();
  nextBtn.addEventListener("click", next);
  prevBtn.addEventListener("click", prev);
  carousel.addEventListener("mouseenter", stop);
  carousel.addEventListener("mouseleave", start);
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") next();
    else if (e.key === "ArrowLeft") prev();
  });
})();

(function () {
  const btn = document.getElementById("scrollTop");
  const threshold = 300;

  function toggleVisibility() {
    if (window.scrollY > threshold) {
      btn.classList.add("show");
    } else {
      btn.classList.remove("show");
    }
  }

  function goTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Show/hide on scroll + on first load
  window.addEventListener("scroll", toggleVisibility, { passive: true });
  window.addEventListener("load", toggleVisibility);

  // Activate on click
  btn.addEventListener("click", goTop);

  // Keyboard support (Enter / Space)
  btn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      goTop();
    }
  });
})();

//emblem component.

(function () {
  const SECTIONS = document.querySelectorAll(".emblem-marquee");
  if (!SECTIONS.length) return;

  SECTIONS.forEach((sec) => {
    const track = sec.querySelector(".emblem-marquee__track");
    const speed = Number(sec.dataset.speed || 80); 
    const size = Number(sec.dataset.size || 120); 
    const gap = Number(sec.dataset.gap || 28); 


    sec.style.setProperty("--em-size", size + "px");
    sec.style.setProperty("--em-gap", gap + "px");


    const clone = track.cloneNode(true);
    clone.classList.add("emblem-marquee__track--clone");
    track.parentNode.appendChild(clone);

    const wrapper = document.createElement("div");
    wrapper.className = "emblem-marquee__track";
    track.parentNode.replaceChild(wrapper, track);
    wrapper.appendChild(track);
    wrapper.appendChild(clone);

    function applyDuration() {
      const total = wrapper.scrollWidth;
      const distance = total / 2;
      const duration = distance / speed; 
      wrapper.style.setProperty("--em-duration", duration + "s");
    }

    const onReady = () => requestAnimationFrame(applyDuration);
    if (document.readyState === "complete") onReady();
    else window.addEventListener("load", onReady, { once: true });
    window.addEventListener("resize", () => {
      clearTimeout(sec.__emT);
      sec.__emT = setTimeout(applyDuration, 100);
    });
  });
})();


//model for the services

(() => {
  const WHATSAPP_NUMBER = '8619564144344'
  const EMAIL_ADDRESS = 'Echeloninternationaledu@gmail.com';

  const overlay = document.getElementById('cta-modal');
  const modal = overlay.querySelector('.modal');
  const closeBtn = overlay.querySelector('.modal-close');
  const planEl = document.getElementById('modal-plan');
  const emailLink = document.getElementById('email-link');
  const waLink = document.getElementById('whatsapp-link');

  const openModal = (plan) => {
    planEl.textContent = `Selected: ${plan}`;
    const subject = encodeURIComponent(`Application Enquiry — ${plan}`);
    const body = encodeURIComponent(
      `Hello,\n\nI would like to apply for the ${plan} option. Please share next steps.\n\nName:\nCountry:\nPreferred intake:\nPhone:\n`
    );
    emailLink.href = `mailto:${EMAIL_ADDRESS}?subject=${subject}&body=${body}`;

    const text = encodeURIComponent(`Hi! I'm interested in the ${plan} option. Could you assist me with next steps?`);
    waLink.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;

    overlay.removeAttribute('aria-hidden');
    document.body.style.overflow = 'hidden';
    setTimeout(() => emailLink.focus(), 0);
  };

  const closeModal = () => {
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.pricing-card .cta-button').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const card = e.currentTarget.closest('.pricing-card');
      const plan = (card?.querySelector('h3')?.textContent || 'Application').trim();
      openModal(plan);
    });
  });

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });
  closeBtn.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.getAttribute('aria-hidden') !== 'true') closeModal();
  });
})();