import { ImageResponse } from '@vercel/og'
import React from 'react'

export const config = {
  runtime: 'edge',
}

export default async function handler(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const slug = searchParams.get('slug')
    const title = searchParams.get('title')
    const description = searchParams.get('description')
    const type = searchParams.get('type') || 'project'
    const date = searchParams.get('date')
    const tags = searchParams.get('tags')

    if (!title) {
      return new Response('Title is required', { status: 400 })
    }

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#1e293b',
            backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
            position: 'relative',
          }}
        >
          {/* Background Pattern */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.1,
              backgroundImage: `
                radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
                radial-gradient(circle at 75% 75%, white 2px, transparent 2px)
              `,
              backgroundSize: '60px 60px',
            }}
          />
          
          {/* Main Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '60px',
              maxWidth: '900px',
              textAlign: 'center',
              position: 'relative',
              zIndex: 1,
            }}
          >
            {/* Type Badge */}
            <div
              style={{
                display: 'inline-block',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: '24px',
                backdropFilter: 'blur(10px)',
                color: 'white',
              }}
            >
              {type === 'project' ? 'Project' : 'Article'}
            </div>

            {/* Title */}
            <h1
              style={{
                fontSize: '64px',
                fontWeight: 800,
                lineHeight: 1.1,
                marginBottom: '24px',
                color: 'white',
                textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                margin: 0,
              }}
            >
              {title}
            </h1>

            {/* Description */}
            {description && (
              <p
                style={{
                  fontSize: '24px',
                  lineHeight: 1.4,
                  opacity: 0.9,
                  marginBottom: '32px',
                  fontWeight: 400,
                  color: 'white',
                  margin: 0,
                }}
              >
                {description}
              </p>
            )}

            {/* Meta Information */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '24px',
                fontSize: '18px',
                opacity: 0.8,
                color: 'white',
                marginBottom: '24px',
              }}
            >
              {date && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  📅 {new Date(date).toLocaleDateString()}
                </div>
              )}
            </div>

            {/* Tags */}
            {tags && (
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '12px',
                  justifyContent: 'center',
                }}
              >
                {tags.split(',').slice(0, 5).map((tag, index) => (
                  <span
                    key={index}
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                      padding: '6px 12px',
                      borderRadius: '12px',
                      fontSize: '14px',
                      fontWeight: 500,
                      backdropFilter: 'blur(10px)',
                      color: 'white',
                    }}
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Logo */}
          <div
            style={{
              position: 'absolute',
              bottom: '60px',
              right: '60px',
              fontSize: '24px',
              fontWeight: 700,
              opacity: 0.7,
              color: 'white',
            }}
          >
            Himanshu's Portfolio
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e: any) {
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
