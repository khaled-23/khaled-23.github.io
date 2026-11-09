import { Component, computed, effect, input, signal } from '@angular/core';
import { Project } from '../../models/project';

/**
 * Shows a project's cover image, or a styled title card (tinted with the
 * project's colour) when there is no image yet or the image fails to load.
 */
@Component({
  selector: 'app-project-cover',
  templateUrl: './project-cover.html',
  styleUrl: './project-cover.css',
  host: {
    // Makes the project's colour available to the CSS as var(--tint)
    '[style.--tint]': 'project().tint ?? null',
    '[class.is-banner]': "variant() === 'banner'",
    '[class.has-image]': 'hasImage()',
  },
})
export class ProjectCover {
  readonly project = input.required<Project>();
  /** 'card' (16:9) for project cards, 'banner' (wide) for the top of a project page. */
  readonly variant = input<'card' | 'banner'>('card');
  /** Use 'eager' for the image at the top of a page, 'lazy' for cards further down. */
  readonly loading = input<'lazy' | 'eager'>('lazy');

  /** True when the image file couldn't be loaded, so the title card is shown instead. */
  protected readonly failed = signal(false);

  /** The image path or URL, or '' when the project has none. */
  protected readonly cover = computed(() => this.project().cover ?? '');
  protected readonly hasImage = computed(() => this.cover() !== '' && !this.failed());

  constructor() {
    // Try again whenever a different project (and image) is shown
    effect(() => {
      this.cover();
      this.failed.set(false);
    });
  }
}
