import { Component } from '@angular/core';
import { PracticeProject } from '../practice-project';
import { ProjectCard } from '../project-card/project-card';
import { SectionTitle } from '../section-title/section-title';

@Component({
  selector: 'app-project-list',
  imports: [ProjectCard, SectionTitle],
  templateUrl: './project-list.html',
  styleUrl: './project-list.css',
})
export class ProjectList {
  protected readonly projects: PracticeProject[] = [
    {
      id: 'undying-flame',
      title: 'Undying Flame',
      engine: 'Unreal Engine',
      platform: 'PC',
      genres: ['Roguelike', 'Action'],
      featured: true,
    },
    {
      id: 'echoes-of-the-fallen',
      title: 'Echoes of the Fallen',
      engine: 'Unity',
      platform: 'PC',
      genres: ['Psychological Horror', 'Stealth', 'Action Adventure'],
      featured: true,
    },
    {
      id: 'star-drift',
      title: 'STAR DRIFT',
      engine: 'Unity',
      platform: 'PC',
      genres: ['Roguelike', 'Space Exploration', 'Survival'],
      featured: false,
      videoUrl: 'https://example.com',
    },
  ];

  protected readonly featuredCount = this.projects.filter((project) => project.featured).length;

  protected readonly summary = `${this.projects.length} projects, ${this.featuredCount} featured`;
}