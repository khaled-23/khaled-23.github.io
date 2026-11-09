import { Component, computed, inject } from '@angular/core';
import { ProjectList } from '../../components/project-list/project-list';
import { Reveal } from '../../directives/reveal';
import { ProjectFilter, ProjectService } from '../../services/project.service';

interface FilterOption {
  value: ProjectFilter;
  label: string;
  count: number;
}

/** The "Work" page: all projects, grouped into games and web/backend work, with filters. */
@Component({
  selector: 'app-projects',
  imports: [ProjectList, Reveal],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects {
  private readonly projectService = inject(ProjectService);
  private readonly allProjects = this.projectService.getAll();

  /** The selected filter (kept in the service so it survives opening a project). */
  protected readonly filter = this.projectService.filter;

  /** Filter buttons. Categories with no projects are left out. */
  protected readonly filters: FilterOption[] = (
    [
      { value: 'all', label: 'All' },
      { value: 'unity', label: 'Unity' },
      { value: 'unreal', label: 'Unreal Engine' },
      { value: 'web', label: 'Web and backend' },
    ] as const
  )
    .map((option) => ({
      ...option,
      count:
        option.value === 'all'
          ? this.allProjects.length
          : this.allProjects.filter((project) => project.category === option.value).length,
    }))
    .filter((option) => option.count > 0);

  private readonly visible = computed(() => {
    const filter = this.filter();
    return filter === 'all'
      ? this.allProjects
      : this.allProjects.filter((project) => project.category === filter);
  });

  protected readonly games = computed(() => this.visible().filter((p) => p.type === 'Game'));
  protected readonly other = computed(() => this.visible().filter((p) => p.type !== 'Game'));

  protected select(value: ProjectFilter): void {
    this.filter.set(value);
  }
}
