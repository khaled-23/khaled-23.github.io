/** Which group a project belongs to. Used by the filter on the Projects page. */
export type ProjectCategory = 'unity' | 'unreal' | 'web';

/** An external link shown on a project page (store page, repository, trailer…). */
export interface ProjectLink {
  label: string;
  url: string;
}

/**
 * Everything the site knows about one project.
 * Optional fields (marked with ?) are simply hidden when they are missing.
 */
export interface Project {
  /** URL-friendly name, used in /projects/:id */
  id: string;
  title: string;
  /** One short sentence shown on cards. */
  tagline: string;
  /** Paragraphs for the overview on the details page. */
  overview: string[];
  /** Leave out if the engine is unknown; the project then only shows under "All". */
  category?: ProjectCategory;
  /** e.g. "Game" or "Web application" */
  type: string;
  engine?: string;
  platform?: string;
  genres: string[];
  /** Your role on the project, e.g. "Lead Programmer". */
  role?: string;
  /** What you personally did. Shown as "My responsibilities". */
  responsibilities?: string[];
  /** What the project focuses on. Shown as "Gameplay focus" / "Focus". */
  focus?: string[];
  technologies: string[];
  /** Shown on the Home page when true. */
  featured: boolean;
  /** Muted colour used for the project's title card and accents, e.g. '#5b74a8'. */
  tint?: string;
  /**
   * The main image. Path inside /public, e.g. "images/projects/yourfarm/cover.jpg",
   * or a full image URL. Without one, the project page shows a tinted title card.
   */
  cover?: string;
  /** The sub images, shown as thumbnails under the main image. Same format as `cover`. */
  screenshots?: string[];
  /** Link to a trailer or gameplay video (YouTube, Vimeo…). */
  videoUrl?: string;
  links?: ProjectLink[];
}
