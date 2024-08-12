(() => {
  const refs = {
    openModalBtn: document.querySelector('[data-menu-open]'),
    closeModalBtn: document.querySelector('[data-menu-close]'),
    modal: document.querySelector('[data-menu]'),
    body: document.body,
    menuLinks: document.querySelectorAll('[data-menu] a[href^="#"]'), // Ссылки в меню, начинающиеся с #
  };

  const toggleMenu = () => {
    const isMenuOpen = refs.modal.classList.toggle('is-open');
    refs.openModalBtn.setAttribute('aria-expanded', isMenuOpen);

    if (isMenuOpen) {
      disableBodyScroll();
    } else {
      enableBodyScroll();
    }
  };

  const disableBodyScroll = () => {
    refs.body.style.overflow = 'hidden';
  };

  const enableBodyScroll = () => {
    refs.body.style.overflow = '';
  };

  const closeMenuOnLinkClick = event => {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      toggleMenu();
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  refs.openModalBtn.addEventListener('click', toggleMenu);
  refs.closeModalBtn.addEventListener('click', toggleMenu);

  refs.menuLinks.forEach(link => {
    link.addEventListener('click', closeMenuOnLinkClick);
  });

  window.matchMedia('(min-width: 768px)').addEventListener('change', e => {
    if (!e.matches) return;
    refs.modal.classList.remove('is-open');
    refs.openModalBtn.setAttribute('aria-expanded', false);
    enableBodyScroll();
  });

  if (window.matchMedia('(min-width: 768px)').matches) {
    refs.modal.classList.remove('is-open');
    refs.openModalBtn.setAttribute('aria-expanded', false);
    enableBodyScroll();
  }
})();
