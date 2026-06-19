// Motion helpers shared across pages. Centralizes the prefers-reduced-motion
// check so every animated entry can honor the OS "reduce motion" setting in one
// place. CSS-driven motion is neutralized in styles/base.css; this covers the
// JS-driven motion (the nav slide-in, the 3D auto-rotation, color cycling).
import gsap from 'gsap';

// True when the user has asked the system to minimize non-essential motion.
export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Slide the nav bar down on page load. Skipped under reduced motion, which
// leaves the nav in its resting position with no animation.
export function animateNavIn() {
  if (prefersReducedMotion()) return;
  gsap.timeline({ defaults: { duration: 1 } }).fromTo('nav', { y: '-100%' }, { y: '0%' });
}
