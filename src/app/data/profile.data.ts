import { SkillGroup, SocialLink } from '../models/profile';

/**
 * Personal details used across the whole site.
 * Edit this file to change your name, email, links or skills everywhere at once.
 */
export const PROFILE = {
  name: 'Khaled Alkuhaily',
  role: 'Unity Developer',
  email: 'khaledalkuhaily@gmail.com',
  /** Status line shown on the Home and Contact pages. */
  availability: 'Open to Unity developer roles',
} as const;

/**
 * Profile links. Paste your real URLs here.
 * Any link left as an empty string ('') is hidden automatically,
 * so the site never shows a broken placeholder link.
 * iconSrc points at the official logo files in public/icons/ (the built-in line
 * icon is shown if a file is missing). The files are black, so invertIcon
 * displays them in white on the dark background.
 */
export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'GitHub',
    url: 'https://github.com/khaled-23',
    icon: 'code',
    iconSrc: 'icons/github.svg',
    invertIcon: true,
  },
  {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/khaled-alkuhaily/',
    icon: 'briefcase',
    iconSrc: 'icons/linkedin.png',
    invertIcon: true,
  },
  { label: 'itch.io', url: '', icon: 'gamepad' },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: 'Game development',
    skills: ['Unity', 'Gameplay programming', 'AI systems', 'Unreal Engine'],
  },
  {
    title: 'Languages',
    skills: ['C#', 'C++', 'Java'],
  },
  {
    title: 'Backend',
    skills: ['Spring Boot', 'MySQL'],
  },
  {
    title: 'Tools',
    skills: ['Git', 'Jira'],
  },
];
