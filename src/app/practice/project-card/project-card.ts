import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PracticeProject } from '../practice-project';

@Component({
  selector: 'app-project-card',
  imports: [RouterLink],
  templateUrl: './project-card.html',
  styleUrl: './project-card.css',
})
export class ProjectCard {
  readonly project = input.required<PracticeProject>();
}