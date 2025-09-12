import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

interface SitemapEntry {
  url: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

export class SitemapGenerator {
  private baseUrl: string;
  private entries: SitemapEntry[] = [];

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  addEntry(url: string, lastmod?: string, changefreq: SitemapEntry['changefreq'] = 'weekly', priority: number = 0.8) {
    this.entries.push({
      url: `${this.baseUrl}${url}`,
      lastmod: lastmod || new Date().toISOString().split('T')[0],
      changefreq,
      priority
    });
  }

  generateSitemap(): string {
    const header = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    const entries = this.entries.map(entry => `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join('\n');

    const footer = `</urlset>`;

    return `${header}\n${entries}\n${footer}`;
  }

  async generateFromContent() {
    // Add main pages
    this.addEntry('/', undefined, 'daily', 1.0);
    this.addEntry('/about', undefined, 'monthly', 0.9);
    this.addEntry('/work', undefined, 'weekly', 0.9);
    this.addEntry('/contact', undefined, 'monthly', 0.8);

    // Add articles
    try {
      const articlesPath = join(process.cwd(), 'src/data/articles');
      const articleFiles = require('fs').readdirSync(articlesPath).filter((file: string) => file.endsWith('.mdx'));
      
      articleFiles.forEach((file: string) => {
        const slug = file.replace('.mdx', '');
        this.addEntry(`/article/${slug}`, undefined, 'monthly', 0.7);
      });
    } catch (error) {
      console.warn('Could not read articles directory:', error);
    }

    // Add projects
    try {
      const projectsPath = join(process.cwd(), 'src/data/projects');
      const projectFiles = require('fs').readdirSync(projectsPath).filter((file: string) => file.endsWith('.mdx'));
      
      projectFiles.forEach((file: string) => {
        const slug = file.replace('.mdx', '');
        this.addEntry(`/work/${slug}`, undefined, 'monthly', 0.8);
      });
    } catch (error) {
      console.warn('Could not read projects directory:', error);
    }

    return this.generateSitemap();
  }

  saveSitemap(outputPath: string) {
    const sitemap = this.generateSitemap();
    writeFileSync(outputPath, sitemap, 'utf8');
    console.log(`Sitemap generated at: ${outputPath}`);
  }
}
