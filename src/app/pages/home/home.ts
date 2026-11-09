import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CopyButton } from '../../components/copy-button/copy-button';
import { Icon } from '../../components/icon/icon';
import { ProjectList } from '../../components/project-list/project-list';
import { SkillGroups } from '../../components/skill-groups/skill-groups';
import { Reveal } from '../../directives/reveal';
import { PROFILE, SKILL_GROUPS, SOCIAL_LINKS } from '../../data/profile.data';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink, Icon, ProjectList, SkillGroups, CopyButton, Reveal],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private readonly projectService = inject(ProjectService);

  protected readonly profile = PROFILE;
  /** Only links that have a real URL. */
  protected readonly links = SOCIAL_LINKS.filter((link) => link.url !== '');
  protected readonly skillGroups = SKILL_GROUPS;
  protected readonly featuredProjects = this.projectService.getFeatured();
}
