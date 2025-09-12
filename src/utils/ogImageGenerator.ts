import { createCanvas, loadImage, registerFont } from 'canvas';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

interface OGImageOptions {
  title: string;
  description?: string;
  type?: 'article' | 'project' | 'page';
  author?: string;
  date?: string;
  tags?: string[];
}

export class OGImageGenerator {
  private width = 1200;
  private height = 630;
  private padding = 60;
  private backgroundColor = '#0a0a0a';
  private textColor = '#ffffff';
  private accentColor = '#3b82f6';

  constructor() {
    // Register fonts if available
    try {
      registerFont(join(process.cwd(), 'public/fonts/Inter-Bold.ttf'), { family: 'Inter', weight: 'bold' });
      registerFont(join(process.cwd(), 'public/fonts/Inter-Regular.ttf'), { family: 'Inter', weight: 'normal' });
    } catch (error) {
      console.warn('Custom fonts not found, using default fonts');
    }
  }

  async generateOGImage(options: OGImageOptions, outputPath: string) {
    const canvas = createCanvas(this.width, this.height);
    const ctx = canvas.getContext('2d');

    // Background
    ctx.fillStyle = this.backgroundColor;
    ctx.fillRect(0, 0, this.width, this.height);

    // Gradient overlay
    const gradient = ctx.createLinearGradient(0, 0, this.width, this.height);
    gradient.addColorStop(0, 'rgba(59, 130, 246, 0.1)');
    gradient.addColorStop(1, 'rgba(147, 51, 234, 0.1)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, this.width, this.height);

    // Title
    ctx.fillStyle = this.textColor;
    ctx.font = 'bold 48px Inter, Arial, sans-serif';
    ctx.textAlign = 'left';
    
    // Wrap text
    const maxWidth = this.width - (this.padding * 2);
    const words = options.title.split(' ');
    let line = '';
    let y = this.padding + 60;
    const lineHeight = 60;

    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;

      if (testWidth > maxWidth && i > 0) {
        ctx.fillText(line, this.padding, y);
        line = words[i] + ' ';
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, this.padding, y);

    // Description
    if (options.description) {
      y += 40;
      ctx.font = '24px Inter, Arial, sans-serif';
      ctx.fillStyle = '#a1a1aa';
      
      const descWords = options.description.split(' ');
      let descLine = '';
      const descMaxWidth = maxWidth;
      const descLineHeight = 30;

      for (let i = 0; i < descWords.length && y < this.height - 100; i++) {
        const testLine = descLine + descWords[i] + ' ';
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;

        if (testWidth > descMaxWidth && i > 0) {
          ctx.fillText(descLine, this.padding, y);
          descLine = descWords[i] + ' ';
          y += descLineHeight;
        } else {
          descLine = testLine;
        }
      }
      if (descLine && y < this.height - 100) {
        ctx.fillText(descLine, this.padding, y);
      }
    }

    // Type badge
    if (options.type) {
      const badgeWidth = 120;
      const badgeHeight = 40;
      const badgeX = this.width - this.padding - badgeWidth;
      const badgeY = this.padding;

      ctx.fillStyle = this.accentColor;
      ctx.fillRect(badgeX, badgeY, badgeWidth, badgeHeight);

      ctx.fillStyle = this.textColor;
      ctx.font = 'bold 16px Inter, Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(options.type.toUpperCase(), badgeX + badgeWidth / 2, badgeY + 25);
    }

    // Author and date
    if (options.author || options.date) {
      ctx.textAlign = 'left';
      ctx.font = '20px Inter, Arial, sans-serif';
      ctx.fillStyle = '#71717a';
      y = this.height - this.padding - 30;
      
      if (options.author) {
        ctx.fillText(`By ${options.author}`, this.padding, y);
      }
      if (options.date) {
        const dateText = new Date(options.date).toLocaleDateString();
        const dateWidth = ctx.measureText(dateText).width;
        ctx.fillText(dateText, this.width - this.padding - dateWidth, y);
      }
    }

    // Tags
    if (options.tags && options.tags.length > 0) {
      y = this.height - this.padding - 60;
      ctx.font = '16px Inter, Arial, sans-serif';
      ctx.fillStyle = this.accentColor;
      
      let tagX = this.padding;
      const tagPadding = 8;
      const tagHeight = 24;
      
      options.tags.slice(0, 5).forEach(tag => {
        const tagWidth = ctx.measureText(tag).width + 16;
        
        if (tagX + tagWidth > this.width - this.padding) {
          return; // Don't overflow
        }
        
        ctx.fillRect(tagX, y, tagWidth, tagHeight);
        ctx.fillStyle = this.textColor;
        ctx.fillText(tag, tagX + 8, y + 16);
        ctx.fillStyle = this.accentColor;
        tagX += tagWidth + tagPadding;
      });
    }

    // Save image
    const buffer = canvas.toBuffer('image/png');
    writeFileSync(outputPath, buffer);
    console.log(`OG image generated: ${outputPath}`);
  }

  async generateForArticle(slug: string, frontmatter: any) {
    const outputDir = join(process.cwd(), 'public/og');
    if (!existsSync(outputDir)) {
      mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = join(outputDir, `${slug}.png`);
    
    await this.generateOGImage({
      title: frontmatter.title || 'Article',
      description: frontmatter.description,
      type: 'article',
      author: frontmatter.author || 'Himanshu',
      date: frontmatter.date,
      tags: frontmatter.tags
    }, outputPath);

    return `/og/${slug}.png`;
  }

  async generateForProject(slug: string, frontmatter: any) {
    const outputDir = join(process.cwd(), 'public/og');
    if (!existsSync(outputDir)) {
      mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = join(outputDir, `project-${slug}.png`);
    
    await this.generateOGImage({
      title: frontmatter.title || 'Project',
      description: frontmatter.description,
      type: 'project',
      author: frontmatter.author || 'Himanshu',
      date: frontmatter.date,
      tags: frontmatter.technologies
    }, outputPath);

    return `/og/project-${slug}.png`;
  }
}