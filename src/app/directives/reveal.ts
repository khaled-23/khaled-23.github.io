import { afterNextRender, DestroyRef, Directive, ElementRef, inject } from '@angular/core';

/**
 * Fades a section up the first time it scrolls into view.
 *
 * Only sections that start below the fold are hidden, so nothing on screen
 * ever blinks. Skipped entirely when the visitor prefers reduced motion.
 * The animation itself is the .reveal class in styles.css.
 *
 * Usage: <section appReveal>…</section>
 */
@Directive({ selector: '[appReveal]' })
export class Reveal {
  constructor() {
    const element: HTMLElement = inject(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduceMotion || typeof IntersectionObserver === 'undefined') {
        return;
      }
      // Already visible: leave it alone
      if (element.getBoundingClientRect().top < window.innerHeight) {
        return;
      }

      element.classList.add('reveal');
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            element.classList.add('is-revealed');
            observer.disconnect();
          }
        },
        { rootMargin: '0px 0px -40px 0px' },
      );
      observer.observe(element);
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
