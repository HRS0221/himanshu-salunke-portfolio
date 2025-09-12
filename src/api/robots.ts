export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const baseUrl = process.env.VITE_SITE_URL || 'https://himanshu.dev';
  
  const robotsTxt = `User-agent: *
Allow: /

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Disallow admin and private areas
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /private/

# Allow all other content
Allow: /about
Allow: /work
Allow: /contact
Allow: /article/
Allow: /work/`;

  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
  res.status(200).send(robotsTxt);
}
