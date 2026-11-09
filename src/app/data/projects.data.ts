import { Project } from '../models/project';

/**
 * All portfolio projects, in the order they appear on the Projects page.
 *
 * Images: put them in public/images/projects/<project-id>/ and set
 *   cover: 'images/projects/<project-id>/cover.jpg',          ← the main image
 *   screenshots: [                                             ← the sub images
 *     'images/projects/<project-id>/screenshot-1.jpg',
 *     'images/projects/<project-id>/screenshot-2.jpg',
 *   ],
 * Full image URLs work too. Without a cover the page shows a tinted title card.
 *
 * Links (itch.io, Steam, GitHub…) appear as buttons at the top of the project page:
 *   links: [{ label: 'Play on itch.io', url: 'https://…' }],
 */
export const PROJECTS: Project[] = [
  {
    id: 'let-me-work-in-peace',
    tint: '#9a82b4',
    title: 'Let Me Work in Peace',
    tagline: 'A comedy stress-simulation game about surviving a shift at a grocery store.',
    overview: [
      'Let Me Work in Peace is a comedy stress-simulation game. You play a grocery store employee ' +
        'trying to get through each workday without snapping, while customers and an ever-watching ' +
        'manager keep interrupting.',
      'Tasks are UI-based mini-games played against the clock. Every task raises a stress bar; ' +
        'coffee breaks, your phone or insulting customers bring it down, but every choice has ' +
        'consequences. The goal: finish the shift, keep your job, and maybe afford that RAM upgrade.',
      'I was the lead programmer, responsible for gameplay programming, the game systems and ' +
        'scripts, and the team’s Git workflow.',
    ],
    category: 'unity',
    type: 'Game',
    engine: 'Unity',
    platform: 'Windows',
    genres: ['Simulation', 'Comedy'],
    role: 'Lead Programmer',
    responsibilities: [
      'Gameplay programming',
      'Game systems',
      'Scripting',
      'Git and version control for the team',
    ],
    focus: [
      'Stress system',
      'UI-based mini-games',
      'Customer and manager interruptions',
      'Timed workdays',
    ],
    technologies: ['Unity', 'Git'],
    featured: true,
    // Artwork from the game's itch.io page. To use a local copy instead, save it as
    // public/images/projects/let-me-work-in-peace/cover.png and use that path here.
    cover: 'https://img.itch.zone/aW1nLzI1NDkxMDA0LnBuZw==/original/JXpft1.png',
    // Sub images (files in public/images/projects/let-me-work-in-peace/)
    screenshots: [
      'images/projects/let-me-work-in-peace/screenshot-1.jpg',
      'images/projects/let-me-work-in-peace/screenshot-2.jpg',
      'images/projects/let-me-work-in-peace/screenshot-3.jpg',
    ],
    links: [{ label: 'Play on itch.io', url: 'https://fesalalsubie.itch.io/let-me-work-in-peace' }],
  },
  {
    id: 'kernel-panic',
    tint: '#5b93ad',
    title: 'KERNEL PANIC',
    tagline: 'An action-puzzle shooter where you hack sealed droids from the inside.',
    overview: [
      'KERNEL PANIC is set in an abandoned industrial facility taken over by machines. Bullets ' +
        'can’t hurt the sealed droids, but each one carries a wireless signal, and that signal is ' +
        'the only way in.',
      'You fire a microbot gun at the signal to breach the system, then climb as an electrical ' +
        'surge up a narrow shaft while a wall of fire rises behind you. Reach the core and it ' +
        'overheats, forcing the armour open for your sidearm. Your body stands still while you’re ' +
        'inside, so every kill starts with a decision about when to stop moving.',
      'Each machine needs a different approach: spiders share one nest mind, soldiers carry their ' +
        'core on their back, and the Enforcer can only be opened by breaching relays hidden ' +
        'around the room.',
      'I worked on the game as a gameplay programmer.',
    ],
    category: 'unity',
    type: 'Game',
    engine: 'Unity',
    platform: 'Windows',
    genres: ['Action', 'Puzzle'],
    role: 'Gameplay Programmer',
    focus: [
      'Signal breach hacking',
      'Vertical surge sequence',
      'Enemy-specific weak points',
      'Two-weapon system',
    ],
    technologies: ['Unity'],
    featured: true,
    // Artwork from the game's itch.io page
    cover: 'https://img.itch.zone/aW1nLzI5MDQ3Nzc3LnBuZw==/original/4P0G9b.png',
    // Sub images (files in public/images/projects/kernel-panic/)
    screenshots: [
      'images/projects/kernel-panic/screenshot-1.jpg',
      'images/projects/kernel-panic/screenshot-2.jpg',
      'images/projects/kernel-panic/screenshot-3.jpg',
    ],
    links: [{ label: 'Play on itch.io', url: 'https://fesalalsubie.itch.io/kernelpanic' }],
  },
  {
    id: 'yourfarm',
    tint: '#86a05c',
    title: 'YourFarm',
    tagline: 'A web application with a Spring Boot and MySQL backend.',
    overview: ['YourFarm is a web application built with Spring Boot and a MySQL database.'],
    category: 'web',
    type: 'Web application',
    genres: [],
    technologies: ['Java', 'Spring Boot', 'MySQL'],
    featured: true,
    // Main and sub images: add files to public/images/projects/yourfarm/ and list them here
    // cover: 'images/projects/yourfarm/cover.jpg',
    screenshots: [],
  },
];
