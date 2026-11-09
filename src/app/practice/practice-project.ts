export interface PracticeProject {
  id: string;
  title: string;
  engine: string;
  platform: string;
  genres: string[];
  featured: boolean;
  videoUrl?: string;
}