import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { title, description, type, date, tags } = req.query

  if (!title) {
    return res.status(400).json({ error: 'Title is required' })
  }

  // Generate OG image HTML
  const ogImageHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            width: 1200px;
            height: 630px;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            overflow: hidden;
          }
          
          .container {
            width: 100%;
            height: 100%;
            padding: 60px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            position: relative;
          }
          
          .background-pattern {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            opacity: 0.1;
            background-image: 
              radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
              radial-gradient(circle at 75% 75%, white 2px, transparent 2px);
            background-size: 60px 60px;
          }
          
          .content {
            position: relative;
            z-index: 1;
            max-width: 900px;
          }
          
          .type-badge {
            display: inline-block;
            background: rgba(255, 255, 255, 0.2);
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 24px;
            backdrop-filter: blur(10px);
          }
          
          .title {
            font-size: 64px;
            font-weight: 800;
            line-height: 1.1;
            margin-bottom: 24px;
            text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
          }
          
          .description {
            font-size: 24px;
            line-height: 1.4;
            opacity: 0.9;
            margin-bottom: 32px;
            font-weight: 400;
          }
          
          .meta {
            display: flex;
            align-items: center;
            gap: 24px;
            font-size: 18px;
            opacity: 0.8;
          }
          
          .date {
            display: flex;
            align-items: center;
            gap: 8px;
          }
          
          .tags {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            margin-top: 24px;
          }
          
          .tag {
            background: rgba(255, 255, 255, 0.15);
            padding: 6px 12px;
            border-radius: 12px;
            font-size: 14px;
            font-weight: 500;
            backdrop-filter: blur(10px);
          }
          
          .logo {
            position: absolute;
            bottom: 60px;
            right: 60px;
            font-size: 24px;
            font-weight: 700;
            opacity: 0.7;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="background-pattern"></div>
          <div class="content">
            <div class="type-badge">${type === 'project' ? 'Project' : 'Article'}</div>
            <h1 class="title">${title}</h1>
            ${description ? `<p class="description">${description}</p>` : ''}
            <div class="meta">
              ${date ? `<div class="date">📅 ${new Date(date as string).toLocaleDateString()}</div>` : ''}
            </div>
            ${tags ? `
              <div class="tags">
                ${(tags as string).split(',').slice(0, 5).map(tag => 
                  `<span class="tag">${tag.trim()}</span>`
                ).join('')}
              </div>
            ` : ''}
          </div>
          <div class="logo">Himanshu's Portfolio</div>
        </div>
      </body>
    </html>
  `

  // Set headers for image response
  res.setHeader('Content-Type', 'text/html')
  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
  
  return res.status(200).send(ogImageHtml)
}
