import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/** Shown for any URL that doesn't match a page (the "**" route). */
@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
    <div class="page">
      <section class="page-intro">
        <p class="code">404</p>
        <h1>Page not found</h1>
        <p class="lead">The page you’re looking for doesn’t exist or has moved.</p>
        <div class="actions">
          <a class="btn" routerLink="/">Go to the home page</a>
          <a class="btn btn--ghost" routerLink="/projects">See all work</a>
        </div>
      </section>
    </div>
  `,
  styles: `
    .code {
      margin-bottom: var(--space-3);
      font-size: var(--text-sm);
      font-weight: 600;
      letter-spacing: 0.12em;
      color: var(--color-accent);
    }

    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-3);
      margin-top: var(--space-6);
    }
  `,
})
export class NotFound {}
