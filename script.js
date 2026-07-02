document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const toggle = document.querySelector('.mobile-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', function() {
      mobileNav.classList.toggle('open');
      const isOpen = mobileNav.classList.contains('open');
      toggle.innerHTML = isOpen
        ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'
        : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
    });
  }

  // FAQ accordion
  document.querySelectorAll('.faq-question').forEach(function(btn) {
    btn.addEventListener('click', function() {
      const item = btn.parentElement;
      const answer = item.querySelector('.faq-answer');
      const isOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item.open').forEach(function(openItem) {
        openItem.classList.remove('open');
        openItem.querySelector('.faq-answer').style.maxHeight = null;
      });
      // Toggle current
      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // Form validation
  function validateForm(form) {
    let valid = true;
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(function(field) {
      const error = field.parentElement.querySelector('.form-error');
      field.classList.remove('error');
      if (error) error.classList.remove('visible');
      if (!field.value.trim()) {
        field.classList.add('error');
        if (error) error.classList.add('visible');
        valid = false;
      } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
        field.classList.add('error');
        if (error) { error.textContent = 'Veuillez entrer une adresse e-mail valide.'; error.classList.add('visible'); }
        valid = false;
      }
    });
    return valid;
  }

  // Demo form
  const demoForm = document.getElementById('demo-form');
  if (demoForm) {
    demoForm.addEventListener('submit', function(e) {
      e.preventDefault();
      if (validateForm(demoForm)) {
        demoForm.style.display = 'none';
        document.getElementById('demo-success').classList.add('visible');
      }
    });
  }

  // Contact form
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      if (validateForm(contactForm)) {
        contactForm.style.display = 'none';
        document.getElementById('contact-success').classList.add('visible');
      }
    });
  }

  // Newsletter form
  const nlForm = document.getElementById('newsletter-form');
  if (nlForm) {
    nlForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const input = nlForm.querySelector('input');
      if (input && input.value.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
        const btn = nlForm.querySelector('button');
        btn.textContent = 'Inscrit !';
        btn.style.background = '#16A34A';
        input.value = '';
        setTimeout(function() { btn.textContent = "S'abonner"; btn.style.background = ''; }, 3000);
      }
    });
  }

  // Close mobile nav on link click
  document.querySelectorAll('.mobile-nav a').forEach(function(link) {
    link.addEventListener('click', function() {
      if (mobileNav) mobileNav.classList.remove('open');
    });
  });
});
