import {
  Component,
  computed,
  effect,
  ElementRef,
  input,
  isDevMode,
  signal,
  viewChild,
} from '@angular/core';
import { Project } from '../../models/project';
import { ProjectCover } from '../project-cover/project-cover';

/** How many sub-image slots to suggest while developing (never shown on the live site). */
const SUGGESTED_SUB_IMAGES = 3;

/**
 * A project's images: one large main image (the `cover`) with the sub images
 * (`screenshots`) as thumbnails underneath. Clicking a thumbnail shows it as
 * the main image; clicking the main image opens a full-screen viewer.
 *
 * With no images at all, the tinted title card from ProjectCover is shown.
 * During `ng serve`, dashed slots show where more sub images can go.
 */
@Component({
  selector: 'app-project-gallery',
  imports: [ProjectCover],
  templateUrl: './project-gallery.html',
  styleUrl: './project-gallery.css',
  host: { '[style.--tint]': 'project().tint ?? null' },
})
export class ProjectGallery {
  readonly project = input.required<Project>();

  private readonly viewer = viewChild<ElementRef<HTMLDialogElement>>('viewer');

  /** Images that failed to load are left out, so nothing ever shows as broken. */
  private readonly failed = signal<readonly string[]>([]);

  /** Main image first, then the sub images. */
  protected readonly images = computed(() => {
    const { cover, screenshots = [] } = this.project();
    const all = cover ? [cover, ...screenshots] : screenshots;
    return all.filter((src) => !this.failed().includes(src));
  });

  /** Which image is shown large. */
  protected readonly selected = signal(0);
  protected readonly current = computed(() => this.images()[this.selected()] ?? '');

  /** Dev-only hints, e.g. "images/projects/yourfarm/screenshot-2.jpg". */
  protected readonly slots = computed(() => {
    if (!isDevMode()) {
      return [];
    }
    const { id, screenshots = [] } = this.project();
    const slots: string[] = [];
    for (let n = screenshots.length + 1; n <= SUGGESTED_SUB_IMAGES; n++) {
      slots.push(`images/projects/${id}/screenshot-${n}.jpg`);
    }
    return slots;
  });

  constructor() {
    // Start at the main image whenever another project is shown
    effect(() => {
      this.project();
      this.selected.set(0);
      this.failed.set([]);
    });
  }

  protected altText(index: number): string {
    const title = this.project().title;
    return index === 0 && this.project().cover ? `${title} main image` : `${title} image ${index + 1}`;
  }

  protected onError(src: string): void {
    this.failed.update((list) => [...list, src]);
    this.selected.set(0);
  }

  protected show(index: number): void {
    const count = this.images().length;
    // Wraps around: after the last image comes the first
    this.selected.set((index + count) % count);
  }

  protected openViewer(): void {
    this.viewer()?.nativeElement.showModal();
  }

  protected closeViewer(): void {
    this.viewer()?.nativeElement.close();
  }

  protected onViewerKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      // Handled here, so the page's ← → project navigation doesn't also run
      event.preventDefault();
      event.stopPropagation();
      this.show(this.selected() + (event.key === 'ArrowRight' ? 1 : -1));
    }
  }

  /** A click on the dark area around the image closes the viewer. */
  protected onViewerClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.closeViewer();
    }
  }
}
