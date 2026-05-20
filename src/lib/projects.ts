import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  description?: string;
  category: 'ARCHITECTURE' | 'PRODUCT' | 'ADVERTISEMENT' | 'ANIMATION';
  video: string;
  image: string;
  date: string;
  client?: string;
  software?: string;
  featured?: boolean;
  contentHtml: string;
}

const projectsDirectory = path.join(process.cwd(), 'content/projects');

export function getAllProjects(): Project[] {
  // Ensure the directory exists
  if (!fs.existsSync(projectsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(projectsDirectory);
  const allProjectsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(projectsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      
      // Parse front-matter and content
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || '',
        subtitle: data.subtitle || '',
        description: data.description || '',
        category: (data.category || 'PRODUCT').toUpperCase() as Project['category'],
        video: data.video || '',
        image: data.image || '',
        date: data.date || '',
        client: data.client || '',
        software: data.software || '',
        featured: data.featured ?? false,
        contentHtml: content,
      } as Project;
    });

  // Sort by date (newest first)
  return allProjectsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

/**
 * Returns all project slugs for Next.js generateStaticParams
 */
export function getAllProjectSlugs(): string[] {
  if (!fs.existsSync(projectsDirectory)) {
    return [];
  }
  return fs
    .readdirSync(projectsDirectory)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''));
}

/**
 * Fetches a single project by slug with its markdown content rendered to HTML.
 */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const fullPath = path.join(projectsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  // Convert markdown body to HTML using remark
  const processed = await remark().use(remarkHtml).process(content);
  const contentHtml = processed.toString();

  return {
    slug,
    title: data.title || '',
    subtitle: data.subtitle || '',
    description: data.description || '',
    category: (data.category || 'PRODUCT').toUpperCase() as Project['category'],
    video: data.video || '',
    image: data.image || '',
    date: data.date || '',
    client: data.client || '',
    software: data.software || '',
    featured: data.featured ?? false,
    contentHtml,
  } as Project;
}

/**
 * Returns exactly 4 projects, one from each category:
 * ARCHITECTURE, PRODUCT, ADVERTISEMENT, ANIMATION
 * If a category has multiple, a random one is selected.
 */
export function getHeroAccordionProjects(): Project[] {
  const allProjects = getAllProjects();
  const categories: Project['category'][] = ['ARCHITECTURE', 'PRODUCT', 'ADVERTISEMENT', 'ANIMATION'];
  const selectedProjects: Project[] = [];

  categories.forEach((category) => {
    const categoryProjects = allProjects.filter((p) => p.category === category);
    if (categoryProjects.length > 0) {
      // Pick a random project from this category to meet the random selection requirement
      const randomIndex = Math.floor(Math.random() * categoryProjects.length);
      selectedProjects.push(categoryProjects[randomIndex]);
    }
  });

  // Fallback: if some categories are missing, fill up to 4 using other projects
  if (selectedProjects.length < 4) {
    const remaining = allProjects.filter((p) => !selectedProjects.includes(p));
    while (selectedProjects.length < 4 && remaining.length > 0) {
      selectedProjects.push(remaining.shift()!);
    }
  }

  return selectedProjects.slice(0, 4);
}
