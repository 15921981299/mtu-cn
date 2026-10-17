const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');
const navClose = document.getElementById('nav-close');

menuToggle?.addEventListener('click', () => {
  navMenu?.classList.add('is-open');
  document.body.style.overflow = 'hidden';
});

navClose?.addEventListener('click', () => {
  navMenu?.classList.remove('is-open');
  document.body.style.overflow = '';
});

document.querySelectorAll<HTMLElement>('.nav-dropdown-toggle').forEach((toggle) => {
  const dropdown = toggle.closest('.nav-dropdown');
  const list = dropdown?.querySelector('.nav-dropdown-list');

  dropdown?.addEventListener('mouseenter', () => {
    if (window.innerWidth > 1199) {
      list?.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
    }
  });

  dropdown?.addEventListener('mouseleave', () => {
    if (window.innerWidth > 1199) {
      list?.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  toggle.addEventListener('click', () => {
    if (window.innerWidth <= 1199) {
      const isOpen = list?.classList.contains('is-open');
      list?.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
    }
  });
});

document.querySelectorAll('.nav-menu-link, .nav-dropdown-link-block').forEach((link) => {
  link.addEventListener('click', () => {
    navMenu?.classList.remove('is-open');
    document.body.style.overflow = '';
  });
});
