import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PROFILE } from '../../data/profile.data';

interface NavItem {
  label: string;
  path: string;
}

/**
 * Top bar: your name (links home) and three page links. No menu button needed.
 * It sticks to the top while scrolling and gets a thin border once the page moves.
 */
@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  host: {
    '[class.is-scrolled]': 'scrolled()',
    '(window:scroll)': 'onScroll()',
  },
})
export class Navbar {
  protected readonly scrolled = signal(false);

  protected readonly name = PROFILE.name;

  protected readonly items: NavItem[] = [
    { label: 'Work', path: '/projects' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  protected onScroll(): void {
    this.scrolled.set(window.scrollY > 8);
  }
}
