import { DOCUMENT } from '@angular/common';
import { Component, computed, effect, inject, input } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router, RouterLink } from '@angular/router';
import { CopyButton } from '../../components/copy-button/copy-button';
import { ProjectGallery } from '../../components/project-gallery/project-gallery';
import { Reveal } from '../../directives/reveal';
import { PROFILE } from '../../data/profile.data';
import { ProjectService } from '../../services/project.service';

interface Fact {
  label: string;
  value: string;
}

@Component({
  selector: 'app-project-details',
  imports: [RouterLink, ProjectGallery, CopyButton, Reveal],
  templateUrl: './project-details.html',
  styleUrl: './project-details.css',
  // ← and → open the previous and next project
  host: { '(document:keydown)': 'onKeydown($event)' },
})
export class ProjectDetails {
  private readonly projectService = inject(ProjectService);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly router = inject(Router);
  private readonly document = inject(DOCUMENT);

  /**
   * Filled in by the router from the ":id" part of the URL
   * (enabled by withComponentInputBinding in app.config.ts).
   */
  readonly id = input.required<string>();

  /** The project for the current URL, or undefined if the id doesn't exist. */
  protected readonly project = computed(() => this.projectService.getById(this.id()));

  protected readonly neighbours = computed(() => this.projectService.getNeighbours(this.id()));

  /** When the last arrow-key navigation happened (performance.now()). */
  private lastKeyNavigation = -Infinity;

  /** e.g. { index: 2, total: 5 } for "Project 2 of 5". */
  protected readonly position = computed(() => this.projectService.getPosition(this.id()));

  /** Full link to this page, for the "Copy link" button. */
  protected readonly shareUrl = computed(
    () => new URL(`projects/${this.id()}`, this.document.baseURI).href,
  );

  /** Label / value rows for the side panel. Missing values are skipped. */
  protected readonly facts = computed<Fact[]>(() => {
    const project = this.project();
    if (!project) {
      return [];
    }
    const builtWith = project.technologies.filter((tech) => tech !== project.engine);
    const rows: (Fact | undefined)[] = [
      project.role ? { label: 'Role', value: project.role } : undefined,
      { label: 'Type', value: project.type },
      project.engine ? { label: 'Engine', value: project.engine } : undefined,
      project.platform ? { label: 'Platform', value: project.platform } : undefined,
      project.genres.length ? { label: 'Genre', value: project.genres.join(', ') } : undefined,
      // Skip technologies already shown as the engine (e.g. "Unreal Engine" twice)
      builtWith.length ? { label: 'Built with', value: builtWith.join(', ') } : undefined,
    ];
    return rows.filter((row): row is Fact => row !== undefined);
  });

  /** "Gameplay focus" for games, "Focus" for everything else. */
  protected readonly focusHeading = computed(() =>
    this.project()?.type === 'Game' ? 'Gameplay focus' : 'Focus',
  );

  constructor() {
    // Keep the browser tab title and the meta description in sync with the project.
    effect(() => {
      const project = this.project();
      if (project) {
        this.title.setTitle(`${project.title} | ${PROFILE.name}`);
        this.meta.updateTag({ name: 'description', content: project.tagline });
      } else {
        this.title.setTitle(`Project not found | ${PROFILE.name}`);
        this.meta.updateTag({ name: 'description', content: 'This project does not exist.' });
      }
    });
  }

  protected onKeydown(event: KeyboardEvent): void {
    // Leave shortcuts alone while typing, or when a modifier key is held
    const target = event.target as HTMLElement | null;
    if (
      event.defaultPrevented ||
      event.repeat ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      target?.closest('input, textarea, select, [contenteditable]')
    ) {
      return;
    }

    const { previous, next } = this.neighbours();
    const destination =
      event.key === 'ArrowLeft' ? previous : event.key === 'ArrowRight' ? next : undefined;
    if (!destination) {
      return;
    }
    event.preventDefault();

    // Ignore presses while the page is still changing, so the animation isn't cut off
    const now = performance.now();
    if (this.router.currentNavigation() || now - this.lastKeyNavigation < 450) {
      return;
    }
    this.lastKeyNavigation = now;
    this.router.navigate(['/projects', destination.id]);
  }
}
