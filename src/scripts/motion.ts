/**
 * Shared GSAP setup.
 *
 * Astro has no component unmount, so there is no React-style cleanup hook.
 * v1 of this site deliberately does NOT use <ClientRouter>, which means every
 * navigation is a full page load and ScrollTriggers die with the document.
 * If view transitions are added later, every init below must move to an
 * `astro:page-load` listener and revert on `astro:before-swap`.
 *
 * Rules enforced here:
 *   - transform and opacity only, never layout properties
 *   - no window scroll listeners, ScrollTrigger and IntersectionObserver only
 *   - prefers-reduced-motion collapses everything to the final static state
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

export { gsap, ScrollTrigger, SplitText };

/** True when the visitor has asked the OS to reduce motion. */
export function prefersReduced(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Run `build` only when motion is allowed. Otherwise call `settle`, which must
 * put the elements into their finished state so nothing is left invisible.
 */
export function motion(build: () => void, settle?: () => void): void {
  if (prefersReduced()) {
    settle?.();
    return;
  }
  build();
}

/** The house easing curve. Slow out, no bounce. Cinematic, not springy. */
export const EASE = 'power3.out';

/**
 * Standard reveal: elements marked [data-reveal] rise and fade as they enter.
 * Used by every section that does not need pinning.
 */
export function revealOnScroll(
  root: ParentNode = document,
  selector = '[data-reveal]',
): void {
  const items = gsap.utils.toArray<HTMLElement>(selector, root);
  if (!items.length) return;

  motion(
    () => {
      items.forEach((item) => {
        const delay = Number(item.dataset.revealDelay ?? 0);
        gsap.fromTo(
          item,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            delay,
            ease: EASE,
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              once: true,
            },
          },
        );
      });
    },
    () => gsap.set(items, { opacity: 1, y: 0 }),
  );
}

/**
 * ScrollTrigger measures against layout that fonts and images can still shift.
 * Refresh once both have settled so pinned sections start at the right point.
 */
export function refreshWhenSettled(): void {
  const refresh = () => ScrollTrigger.refresh();
  if (document.fonts?.ready) void document.fonts.ready.then(refresh);
  window.addEventListener('load', refresh, { once: true });
}
