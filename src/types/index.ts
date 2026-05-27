// src/types/index.ts

export type Mode = 'frontend' | 'backend' | 'fullstack';
export type Theme = 'light' | 'dark';
export type ProjectCategory = 'frontend' | 'backend' | 'fullstack';

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  category: ProjectCategory;
  repo?: string;
  liveUrl?: string;
  demoVideo?: string; // Google Drive file ID only
  demoImage?: string;
  year: number;
  featured?: boolean;
  role?: string;
}

export interface PersonalInfo {
  name: string;
  alias: string;
  title: string;
  location: string;
  bio: string;
  github: string;
  linkedin: string;
  cv: string;
  stacks: StackGroup[];
  awards: Award[];
  certifications: string[];
}

export interface StackGroup {
  label: string;
  items: string[];
}

export interface Award {
  title: string;
  org: string;
  year: string;
  description: string;
}
