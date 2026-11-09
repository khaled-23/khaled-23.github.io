import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BackToTop } from './components/back-to-top/back-to-top';
import { Footer } from './layout/footer/footer';
import { Navbar } from './layout/navbar/navbar';

/** The app shell: navbar and footer stay on screen, pages swap inside <router-outlet>. */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer, BackToTop],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
