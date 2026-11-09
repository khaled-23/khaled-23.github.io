/** Names of the built-in line icons (see components/icon). */
export type IconName = 'mail' | 'mail-solid' | 'code' | 'briefcase' | 'gamepad' | 'link';

/** A labelled group of skills, e.g. "Game development" → Unity, Unreal Engine… */
export interface SkillGroup {
  title: string;
  skills: string[];
}

/** A profile link such as GitHub or LinkedIn. Links with an empty url are hidden. */
export interface SocialLink {
  label: string;
  url: string;
  /** Built-in line icon shown next to the label. */
  icon: IconName;
  /** Optional image to use instead, e.g. 'icons/github.svg' (file in public/icons/). */
  iconSrc?: string;
  /** Show the image in white. Use for black logo files on the dark background. */
  invertIcon?: boolean;
}

/** A row in the profile panel on the Home page: a label and one or more values. */
export interface ProfileFact {
  label: string;
  values: string[];
}
