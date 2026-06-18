// Floating "back to top" button. Call mountBackToTop() once per page; it appends
// a fixed button that fades in after the user scrolls down and smooth-scrolls to
// the top when clicked.
import './backToTop.css';

export function mountBackToTop() {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'back-to-top';
  btn.setAttribute('aria-label', 'Back to top');
  btn.innerHTML = '<span class="back-to-top_chevron"></span>';
  document.body.appendChild(btn);

  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  const toggle = function () {
    btn.classList.toggle('is-visible', window.scrollY > 400);
  };
  window.addEventListener('scroll', toggle, { passive: true });
  toggle();
}
