import { Component, effect, input, signal } from '@angular/core';
import { IconName } from '../../models/profile';

/**
 * Small line icon that inherits the text colour and size of its parent.
 * Pass `src` to show an image instead (e.g. an official logo file placed in
 * public/icons/). If that file doesn't exist yet, the line icon is shown.
 */
@Component({
  selector: 'app-icon',
  template: `
    @if (src() && !failed()) {
      <img [src]="src()" alt="" [class.invert]="invert()" (error)="failed.set(true)" />
    } @else {
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.75"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        @switch (name()) {
          @case ('mail-solid') {
            <!-- Solid envelope with the flap cut out, to sit next to solid logos -->
            <path
              class="solid"
              fill-rule="evenodd"
              d="M3.5 4h17A2.5 2.5 0 0 1 23 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-17A2.5 2.5 0 0 1 1 17.5v-11A2.5 2.5 0 0 1 3.5 4ZM3.1 7.1 12 12.9l8.9-5.8.9 1.4L12 14.9 2.2 8.5Z"
            />
          }
          @case ('mail') {
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m3.5 7 8.5 6 8.5-6" />
          }
          @case ('code') {
            <path d="m8 7-5 5 5 5" />
            <path d="m16 7 5 5-5 5" />
            <path d="m13.5 4-3 16" />
          }
          @case ('briefcase') {
            <rect x="3" y="7" width="18" height="13" rx="2" />
            <path d="M8.5 7V5.5A1.5 1.5 0 0 1 10 4h4a1.5 1.5 0 0 1 1.5 1.5V7" />
            <path d="M3 12.5h18" />
          }
          @case ('gamepad') {
            <rect x="2.5" y="7" width="19" height="11" rx="4" />
            <path d="M7 11v3M5.5 12.5h3" />
            <path d="M15.5 12h.01M18 13.5h.01" />
          }
          @default {
            <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" />
            <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
          }
        }
      </svg>
    }
  `,
  styles: `
    :host {
      display: inline-flex;
      flex: none;
      width: 1.05em;
      height: 1.05em;
    }

    svg,
    img {
      width: 100%;
      height: 100%;
    }

    img {
      object-fit: contain;
    }

    /* Solid icons match the white logo files next to them */
    .solid {
      fill: #fff;
      stroke: none;
      opacity: 0.9;
    }

    /* Turns a black logo file white for the dark background */
    img.invert {
      filter: invert(1);
      opacity: 0.9;
    }
  `,
  host: { 'aria-hidden': 'true' },
})
export class Icon {
  readonly name = input<IconName>('link');
  /** Optional image path that replaces the built-in line icon. */
  readonly src = input<string>('');
  /** Show the image in white (for black logo files). */
  readonly invert = input<boolean>(false);

  /** True when the image file is missing, so the line icon is shown instead. */
  protected readonly failed = signal(false);

  constructor() {
    // Try the image again whenever a different file is passed in
    effect(() => {
      this.src();
      this.failed.set(false);
    });
  }
}
