document.addEventListener('DOMContentLoaded', function () {
  try {
    // Mobile menu toggle
    const burgerBtn = document.getElementById('burgerBtn');
    const navLinks = document.getElementById('navLinks');
    if (burgerBtn && navLinks) {
      burgerBtn.addEventListener('click', () => {
        navLinks.classList.toggle('open');
      });
      navLinks.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => navLinks.classList.remove('open'));
      });
    }
  } catch (e) { console.warn('menu toggle init failed', e); }

  try {
    // Shrink header on scroll + back-to-top visibility
    const header = document.querySelector('header');
    const toTopBtn = document.getElementById('toTopBtn');
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY > 40;
      if (header) header.classList.toggle('scrolled', scrolled);
      if (toTopBtn) toTopBtn.classList.toggle('show', window.scrollY > 500);
    });
    if (toTopBtn) {
      toTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  } catch (e) { console.warn('scroll UI init failed', e); }

  try {
    // Highlight active nav link while scrolling (scroll-spy)
    const navLinks = document.getElementById('navLinks');
    const sections = document.querySelectorAll('main section[id]');
    if (navLinks && sections.length) {
      const navAnchors = navLinks.querySelectorAll('a');
      const spyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const id = entry.target.getAttribute('id');
          const link = navLinks.querySelector('a[href="#' + id + '"]');
          if (!link) return;
          if (entry.isIntersecting) {
            navAnchors.forEach(a => a.classList.remove('active'));
            link.classList.add('active');
          }
        });
      }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
      sections.forEach(s => spyObserver.observe(s));
    }
  } catch (e) { console.warn('scroll-spy init failed', e); }

  try {
    // Reveal sections on scroll.
    // Content is visible by default in CSS (see .reveal in style.css) so
    // pages still work correctly even if this script fails to load.
    // Here we opt elements INTO the hidden-then-fade-in animation.
    const revealEls = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => {
      el.classList.add('js-anim');
      revealObserver.observe(el);
    });
  } catch (e) { console.warn('reveal animation init failed', e); }
});
