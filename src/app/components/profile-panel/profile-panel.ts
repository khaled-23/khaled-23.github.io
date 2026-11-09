import { Component, input } from '@angular/core';
import { ProfileFact, SocialLink } from '../../models/profile';

/**
 * Profile card shown next to your name on the Home page.
 * Styled after a game-engine inspector: a component header bar,
 * an identity block, label / value fields, and links at the bottom.
 */
@Component({
  selector: 'app-profile-panel',
  templateUrl: './profile-panel.html',
  styleUrl: './profile-panel.css',
})
export class ProfilePanel {
  readonly name = input.required<string>();
  readonly role = input.required<string>();
  readonly initials = input.required<string>();
  /** Optional photo path; initials are shown when it's empty. */
  readonly photo = input<string>('');
  readonly availability = input<string>('');
  readonly facts = input.required<ProfileFact[]>();
  readonly links = input<SocialLink[]>([]);
  readonly email = input<string>('');
}
