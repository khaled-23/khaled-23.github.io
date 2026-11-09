import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Project } from '../../models/project';
import { ProjectCover } from '../project-cover/project-cover';

@Component({
  selector: 'app-project-card',
  imports: [RouterLink, ProjectCover],
  templateUrl: './project-card.html',
  styleUrl: './project-card.css',
})
export class ProjectCard {
  readonly project = input.required<Project>();

  /** Short tags under the title: engine (or type), role, then up to two genres. */
  protected readonly tags = computed(() => {
    const project = this.project();
    const tags = [project.engine ?? project.type];
    if (project.role) {
      tags.push(project.role);
    }
    return [...tags, ...project.genres.slice(0, 2)];
  });
}
