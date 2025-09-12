const { SitemapGenerator } = require('../src/utils/sitemapGenerator.ts');
const fs = require('fs');
const path = require('path');

async function generateSitemap() {
  const baseUrl = process.env.VITE_SITE_URL || 'https://himanshu.dev';
  const generator = new SitemapGenerator(baseUrl);
  
  try {
    const sitemap = await generator.generateFromContent();
    const outputPath = path.join(process.cwd(), 'public', 'sitemap.xml');
    
    // Ensure public directory exists
    if (!fs.existsSync(path.join(process.cwd(), 'public'))) {
      fs.mkdirSync(path.join(process.cwd(), 'public'), { recursive: true });
    }
    
    fs.writeFileSync(outputPath, sitemap, 'utf8');
    console.log(`✅ Sitemap generated successfully at: ${outputPath}`);
    console.log(`📊 Generated ${generator.entries.length} URLs`);
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
}

generateSitemap();