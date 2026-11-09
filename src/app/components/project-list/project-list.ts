import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Project } from '../../models/project';

interface ProjectRow {
  project: Project;
  /** First small column: the engine, or the role / type when there is no engine. */
  primary: string;
  /** Second small column: the main genre, or a key technology for non-game projects. */
  secondary: string;
}

/**
 * A ruled list of projects: one row per project with title, engine and genre.
 * Each row links to the project's page.
 */
@Component({
  selector: 'app-project-list',
  imports: [RouterLink],
  templateUrl: './project-list.html',
  styleUrl: './project-list.css',
})
export class ProjectList {
  readonly projects = input.required<readonly Project[]>();

  protected readonly rows = computed<ProjectRow[]>(() =>
    this.projects().map((project) => ({
      project,
      primary: project.engine ?? project.role ?? project.type,
      secondary:
        project.genres.length > 0
          ? project.genres[0]
          : project.technologies.length > 1
            ? project.technologies[1]
            : project.type,
    })),
  );
}
