import { Injectable, signal } from '@angular/core';
import { PROJECTS } from '../data/projects.data';
import { Project, ProjectCategory } from '../models/project';

/** 'all', or one project category. */
export type ProjectFilter = 'all' | ProjectCategory;

/**
 * The single place pages ask for project data.
 * Pages never import PROJECTS directly, so if the data ever moves
 * (to a JSON file or an API) only this service has to change.
 */
@Injectable({ providedIn: 'root' })
export class ProjectService {
  private readonly projects: readonly Project[] = PROJECTS;

  /**
   * The filter picked on the Work page. It lives here (not in the page) so it's
   * still selected when the visitor opens a project and comes back.
   */
  readonly filter = signal<ProjectFilter>('all');

  getAll(): readonly Project[] {
    return this.projects;
  }

  getFeatured(): Project[] {
    return this.projects.filter((project) => project.featured);
  }

  getByCategory(category: ProjectCategory): Project[] {
    return this.projects.filter((project) => project.category === category);
  }

  getById(id: string): Project | undefined {
    return this.projects.find((project) => project.id === id);
  }

  /** Where a project sits in the full list, e.g. { index: 2, total: 5 }. */
  getPosition(id: string): { index: number; total: number } {
    return {
      index: this.projects.findIndex((project) => project.id === id) + 1,
      total: this.projects.length,
    };
  }

  /** The projects before and after the given one, for "previous / next" links. */
  getNeighbours(id: string): { previous?: Project; next?: Project } {
    const index = this.projects.findIndex((project) => project.id === id);
    if (index === -1) {
      return {};
    }
    return {
      previous: this.projects[index - 1],
      next: this.projects[index + 1],
    };
  }
}
