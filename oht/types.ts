export interface Project {
  id: string;
  title: string;
  category: string;
  location?: string;
  description: string;
  image: string;
  slug: string;
}

export interface NavItem {
  label: string;
  path: string;
}