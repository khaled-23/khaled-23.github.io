import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-profile-card',
  imports: [],
  templateUrl: './profile-card.html',
  styleUrl: './profile-card.css',
})
export class ProfileCard {
  // Fixed data: never changes, so plain fields are enough
  readonly name = input.required<string>();
  readonly role = input.required<string>();
  protected readonly skills = ['C#', 'Unity', 'C++', 'Gameplay Programming'];
  protected readonly maxLikes = 5;

  // Changing data: signals tell Angular when to update the page
  protected readonly likes = signal(0);
  protected readonly showSkills = signal(false);

  protected like(): void {
    this.likes.update((current) => current + 1);
  }

  protected toggleSkills(): void {
    this.showSkills.update((visible) => !visible);
  }
  protected resetLikes(): void {
    this.likes.set(0);
  }

}