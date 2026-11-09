import { Component } from '@angular/core';
import { Icon } from '../../components/icon/icon';
import { PROFILE, SOCIAL_LINKS } from '../../data/profile.data';

@Component({
  selector: 'app-footer',
  imports: [Icon],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  protected readonly name = PROFILE.name;
  protected readonly email = PROFILE.email;
  protected readonly year = new Date().getFullYear();
  /** Only links that have a real URL are shown. */
  protected readonly links = SOCIAL_LINKS.filter((link) => link.url !== '');
}
