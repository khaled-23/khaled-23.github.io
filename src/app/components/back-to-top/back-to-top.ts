import { DOCUMENT } from '@angular/common';
import { Component, inject, signal } from '@angular/core';

/** Round "back to top" button that appears once the visitor has scrolled down. */
@Component({
  selector: 'app-back-to-top',
  template: `
    <button
      type="button"
      class="top"
      [class.is-visible]="visible()"
      [attr.tabindex]="visible() ? null : -1"
      [attr.aria-hidden]="visible() ? null : 'true'"
      aria-label="Back to top"
      (click)="toTop()"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 19V5M5.5 11.5 12 5l6.5 6.5" />
      </svg>
    </button>
  `,
  styles: `
    .top {
      /* Stays still during page transitions */
      view-transition-name: back-to-top;
      position: fixed;
      right: max(1rem, env(safe-area-inset-right));
      bottom: max(1.25rem, env(safe-area-inset-bottom));
      z-index: 40;
      display: grid;
      place-items: center;
      width: 2.75rem;
      height: 2.75rem;
      border: 1px solid var(--color-line-strong);
      border-radius: 50%;
      background: var(--color-surface);
      color: var(--color-muted);
      cursor: pointer;
      opacity: 0;
      transform: translateY(8px);
      pointer-events: none;
      transition:
        opacity 200ms ease,
        transform 200ms ease,
        color var(--duration) ease,
        border-color var(--duration) ease;
    }

    .top.is-visible {
      opacity: 1;
      transform: none;
      pointer-events: auto;
    }

    .top:hover {
      color: var(--color-accent);
      border-color: var(--color-accent);
    }

    svg {
      width: 1.125rem;
      height: 1.125rem;
      fill: none;
      stroke: currentColor;
      stroke-width: 1.75;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    @media print {
      .top {
        display: none;
      }
    }
  `,
  host: { '(window:scroll)': 'onScroll()' },
})
export class BackToTop {
  private readonly document = inject(DOCUMENT);

  protected readonly visible = signal(false);

  protected onScroll(): void {
    this.visible.set(window.scrollY > 600);
  }

  protected toTop(): void {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    // Move keyboard focus back to the top of the page content as well
    this.document.getElementById('main-content')?.focus({ preventScroll: true });
  }
}
