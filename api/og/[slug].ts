import { ImageResponse } from '@vercel/og'
import { VercelRequest, VercelResponse } from '@vercel/node'
import React from 'react'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const { searchParams } = new URL(req.url || '')
    const slug = searchParams.get('slug')
    const title = searchParams.get('title')
    const description = searchParams.get('description')
    const type = searchParams.get('type') || 'project'
    const date = searchParams.get('date')
    const tags = searchParams.get('tags')

    if (!title) {
      return res.status(400).json({ error: 'Title is required' })
    }

    const imageResponse = new ImageResponse(
      React.createElement('div', {
        style: {
          height: '100%',
          width: '100%',
          display: 'flex',
          backgroundColor: '#ffffff',
          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
          position: 'relative',
        }
      }, [
        // Background Pattern
        React.createElement('div', {
          key: 'bg-pattern',
          style: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
            opacity: 0.8,
          }
        }),
        
        // Decorative Elements
        React.createElement('div', {
          key: 'decorative-1',
          style: {
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '300px',
            height: '300px',
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
            borderRadius: '50%',
            opacity: 0.1,
          }
        }),
        
        React.createElement('div', {
          key: 'decorative-2',
          style: {
            position: 'absolute',
            bottom: '-150px',
            left: '-150px',
            width: '400px',
            height: '400px',
            background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
            borderRadius: '50%',
            opacity: 0.08,
          }
        }),

        // Main Content Container
        React.createElement('div', {
          key: 'main-container',
          style: {
            display: 'flex',
            width: '100%',
            height: '100%',
            padding: '80px',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative',
            zIndex: 1,
          }
        }, [
          // Left Content
          React.createElement('div', {
            key: 'left-content',
            style: {
              display: 'flex',
              flexDirection: 'column',
              maxWidth: '700px',
              gap: '24px',
            }
          }, [
            // Type Badge
            React.createElement('div', {
              key: 'type-badge',
              style: {
                display: 'inline-block',
                backgroundColor: '#8b5cf6',
                color: 'white',
                padding: '8px 20px',
                borderRadius: '25px',
                fontSize: '16px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                width: 'fit-content',
              }
            }, type === 'project' ? 'Project' : 'Article'),

            // Title
            React.createElement('h1', {
              key: 'title',
              style: {
                fontSize: '64px',
                fontWeight: 800,
                lineHeight: 1.1,
                color: '#1e293b',
                margin: 0,
                background: 'linear-gradient(135deg, #1e293b 0%, #8b5cf6 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }
            }, title),

            // Description
            description && React.createElement('p', {
              key: 'description',
              style: {
                fontSize: '24px',
                lineHeight: 1.4,
                color: '#64748b',
                margin: 0,
                fontWeight: 400,
              }
            }, description),

            // Meta Information
            React.createElement('div', {
              key: 'meta-info',
              style: {
                display: 'flex',
                alignItems: 'center',
                gap: '24px',
                marginTop: '16px',
              }
            }, [
              date && React.createElement('div', {
                key: 'date',
                style: {
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '18px',
                  color: '#64748b',
                  fontWeight: 500,
                }
              }, `📅 ${new Date(date).toLocaleDateString()}`)
            ]),

            // Tags
            tags && React.createElement('div', {
              key: 'tags',
              style: {
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
                marginTop: '16px',
              }
            }, tags.split(',').slice(0, 4).map((tag: string, index: number) =>
              React.createElement('span', {
                key: index,
                style: {
                  backgroundColor: '#e2e8f0',
                  color: '#475569',
                  padding: '6px 16px',
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: 500,
                }
              }, tag.trim())
            )),

            // Author Info
            React.createElement('div', {
              key: 'author-info',
              style: {
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginTop: '24px',
              }
            }, [
              React.createElement('div', {
                key: 'author-avatar',
                style: {
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  fontWeight: 700,
                  color: 'white',
                }
              }, 'HS'),
              
              React.createElement('div', {
                key: 'author-details',
                style: {
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px',
                }
              }, [
                React.createElement('div', {
                  key: 'author-name',
                  style: {
                    fontSize: '18px',
                    fontWeight: 600,
                    color: '#1e293b',
                  }
                }, 'Himanshu Salunke'),
                
                React.createElement('div', {
                  key: 'author-title',
                  style: {
                    fontSize: '14px',
                    color: '#64748b',
                  }
                }, 'Aspiring Data Scientist')
              ])
            ])
          ]),

          // Right Side - Project Visual
          React.createElement('div', {
            key: 'right-content',
            style: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }
          }, [
            React.createElement('div', {
              key: 'project-visual',
              style: {
                width: '300px',
                height: '300px',
                borderRadius: '20px',
                background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                position: 'relative',
                overflow: 'hidden',
              }
            }, [
              // Project Icon/Visual
              React.createElement('div', {
                key: 'project-icon',
                style: {
                  width: '200px',
                  height: '200px',
                  borderRadius: '15px',
                  background: 'linear-gradient(135deg, #f1f5f9, #e2e8f0)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '60px',
                  fontWeight: 700,
                  color: '#8b5cf6',
                }
              }, '💻'),
              
              // Decorative overlay
              React.createElement('div', {
                key: 'overlay',
                style: {
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1))',
                }
              })
            ])
          ])
        ]),

        // Bottom Brand
        React.createElement('div', {
          key: 'bottom-brand',
          style: {
            position: 'absolute',
            bottom: '40px',
            right: '80px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }
        }, [
          React.createElement('div', {
            key: 'brand-icon',
            style: {
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              fontWeight: 700,
              color: 'white',
            }
          }, 'HS'),
          
          React.createElement('div', {
            key: 'brand-text',
            style: {
              fontSize: '18px',
              fontWeight: 600,
              color: '#64748b',
            }
          }, 'himanshu-salunke.vercel.app')
        ])
      ]),
      {
        width: 1200,
        height: 630,
      }
    )

    return imageResponse
  } catch (e: any) {
    console.log(`${e.message}`)
    return res.status(500).json({ error: 'Failed to generate the image' })
  }
}