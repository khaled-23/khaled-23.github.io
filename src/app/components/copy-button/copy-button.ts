import { DOCUMENT } from '@angular/common';
import { Component, DestroyRef, inject, input, signal } from '@angular/core';

/**
 * Small button that copies some text (an email address, a link…) to the
 * clipboard and shows "Copied" for two seconds.
 */
@Component({
  selector: 'app-copy-button',
  template: `
    <button
      type="button"
      class="copy"
      [class.is-copied]="copied()"
      [attr.aria-label]="copied() ? 'Copied' : label()"
      (click)="copy()"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        @if (copied()) {
          <path d="m5 12.5 4.5 4.5L19 7.5" />
        } @else {
          <rect x="8.5" y="8.5" width="11" height="11" rx="2" />
          <path d="M15.5 8.5V6.5a2 2 0 0 0-2-2h-7a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h2" />
        }
      </svg>
      <span class="text">{{ copied() ? 'Copied' : idleText() }}</span>
    </button>
    <span class="visually-hidden" aria-live="polite">{{ copied() ? 'Copied to clipboard' : '' }}</span>
  `,
  styles: `
    :host {
      display: inline-flex;
    }

    .copy {
      display: inline-flex;
      align-items: center;
      gap: 0.4em;
      min-height: 2.25rem;
      padding: 0 0.75rem;
      border: 1px solid var(--color-line-strong);
      border-radius: var(--radius);
      background: transparent;
      color: var(--color-muted);
      font-size: var(--text-sm);
      cursor: pointer;
      transition:
        color var(--duration) ease,
        border-color var(--duration) ease;
    }

    .copy:hover {
      color: var(--color-text);
      border-color: var(--color-muted);
    }

    .copy.is-copied {
      color: var(--color-accent);
      border-color: var(--color-accent);
    }

    svg {
      width: 1em;
      height: 1em;
      fill: none;
      stroke: currentColor;
      stroke-width: 1.75;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
  `,
})
export class CopyButton {
  private readonly document = inject(DOCUMENT);

  /** The text that ends up on the clipboard. */
  readonly text = input.required<string>();
  /** What screen readers hear, e.g. "Copy email address". */
  readonly label = input('Copy');
  /** The visible text before copying. */
  readonly idleText = input('Copy');

  protected readonly copied = signal(false);
  private timer?: ReturnType<typeof setTimeout>;

  constructor() {
    inject(DestroyRef).onDestroy(() => clearTimeout(this.timer));
  }

  protected async copy(): Promise<void> {
    const text = this.text();
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Older browsers, or pages not served over https: use a hidden text box
      const box = this.document.createElement('textarea');
      box.value = text;
      box.setAttribute('readonly', '');
      box.style.position = 'fixed';
      box.style.opacity = '0';
      this.document.body.appendChild(box);
      box.select();
      this.document.execCommand('copy');
      box.remove();
    }

    this.copied.set(true);
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.copied.set(false), 2000);
  }
}
