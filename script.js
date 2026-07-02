/* =============================================
   GoCRM — Scripts
   ============================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* --- Mobile Menu Toggle --- */
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', function () {
      mobileMenu.classList.toggle('active');
      const isOpen = mobileMenu.classList.contains('active');
      mobileToggle.innerHTML = isOpen
        ? '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18"/><path d="M6 6l12 12"/></svg>'
        : '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
    });
  }

  /* --- Mobile Submenu Toggle --- */
  document.querySelectorAll('.mobile-menu__link[data-submenu]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('data-submenu');
      const target = document.getElementById(targetId);
      if (target) {
        target.classList.toggle('active');
        this.classList.toggle('active');
      }
    });
  });

  /* --- FAQ Accordion --- */
  document.querySelectorAll('.faq__question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const item = this.parentElement;
      const answer = item.querySelector('.faq__answer');
      const isActive = item.classList.contains('active');

      // Close all
      document.querySelectorAll('.faq__item').forEach(function (i) {
        i.classList.remove('active');
        var a = i.querySelector('.faq__answer');
        if (a) a.style.maxHeight = null;
      });

      // Open clicked if it was closed
      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  /* --- Form Validation --- */
  function validateForm(formEl) {
    let valid = true;
    const groups = formEl.querySelectorAll('.form-group[data-required]');

    groups.forEach(function (group) {
      const input = group.querySelector('.form-input, .form-select, .form-textarea');
      const error = group.querySelector('.form-error');
      if (!input) return;

      const value = input.value.trim();
      let message = '';

      if (!value) {
        message = 'Ce champ est requis.';
      } else if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        message = 'Veuillez entrer une adresse e-mail valide.';
      }

      if (message) {
        group.classList.add('error');
        if (error) error.textContent = message;
        valid = false;
      } else {
        group.classList.remove('error');
      }
    });

    return valid;
  }

  // Attach validation to all forms with data-validate
  document.querySelectorAll('form[data-validate]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (validateForm(form)) {
        var successEl = form.parentElement.querySelector('.form-success');
        if (successEl) {
          form.style.display = 'none';
          successEl.classList.add('active');
        } else {
          alert('Merci ! Votre demande a été envoyée.');
          form.reset();
        }
      }
    });
  });

  // Real-time validation on blur
  document.querySelectorAll('.form-group[data-required] .form-input, .form-group[data-required] .form-textarea').forEach(function (input) {
    input.addEventListener('blur', function () {
      var group = this.closest('.form-group');
      if (group && group.classList.contains('error')) {
        var value = this.value.trim();
        if (value && (this.type !== 'email' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))) {
          group.classList.remove('error');
        }
      }
    });
  });

  /* --- Newsletter Form --- */
  document.querySelectorAll('.newsletter__form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = form.querySelector('.newsletter__input');
      if (input && input.value.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())) {
        var btn = form.querySelector('.newsletter__btn');
        if (btn) btn.textContent = 'Inscrit !';
        input.value = '';
      }
    });
  });

  /* --- Close mobile menu on link click --- */
  document.querySelectorAll('.mobile-submenu__link, .mobile-menu__cta .btn').forEach(function (link) {
    link.addEventListener('click', function () {
      if (mobileMenu) {
        mobileMenu.classList.remove('active');
        if (mobileToggle) {
          mobileToggle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
        }
      }
    });
  });

});
