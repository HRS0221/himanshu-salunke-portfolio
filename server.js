import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { readFileSync, readdirSync } from 'fs';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// API endpoint for contact form submission
app.post('/api/submit-form', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Check if the Slack Webhook URL is set up correctly
    const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;
    
    if (!SLACK_WEBHOOK_URL) {
      console.error('❌ Slack Webhook URL is not configured');
      return res.status(500).json({ error: 'Slack Webhook URL is not configured.' });
    }

    // Format the data into a nice-looking Slack message using "Block Kit"
    const slackMessage = {
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: '📬 New Portfolio Message',
            emoji: true,
          },
        },
        {
          type: 'divider',
        },
        {
          type: 'section',
          fields: [
            {
              type: 'mrkdwn',
              text: `*From:*\n${name}`,
            },
            {
              type: 'mrkdwn',
              text: `*Email:*\n${email}`,
            },
            {
              type: 'mrkdwn',
              text: `*Subject:*\n${subject}`,
            },
          ],
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Message:*\n${message}`,
          },
        },
        {
          type: 'context',
          elements: [
            {
              type: 'plain_text',
              text: `Received on: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })}`,
              emoji: true,
            },
          ],
        },
      ],
    };

    // Send the message to your secret Slack Webhook URL
    const slackResponse = await fetch(SLACK_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(slackMessage),
    });

    if (slackResponse.ok) {
      console.log('✅ Slack notification sent successfully');
      res.json({ success: true });
    } else {
      console.error('❌ Failed to send Slack notification:', slackResponse.status, slackResponse.statusText);
      res.status(500).json({ error: 'Failed to send notification to Slack.' });
    }

  } catch (error) {
    console.error('❌ Failed to process request:', error);
    res.status(500).json({ error: 'Failed to process request.' });
  }
});

// Projects API endpoints
const projectsDir = path.join(__dirname, 'src/data/projects');

// Helper function to get all projects
function getAllProjects() {
  try {
    const files = readdirSync(projectsDir).filter(file => file.endsWith('.mdx'));
    
    const projects = files.map(file => {
      const filePath = path.join(projectsDir, file);
      const fileContent = readFileSync(filePath, 'utf8');
      const { data: frontmatter, content } = matter(fileContent);
      
      return {
        ...frontmatter,
        slug: frontmatter.id, // Add slug field for frontend compatibility
        content,
        readingTime: Math.ceil(content.split(' ').length / 200)
      };
    });
    
    // Sort by order field if available, otherwise by date
    return projects.sort((a, b) => {
      if (a.order && b.order) {
        return a.order - b.order;
      }
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  } catch (error) {
    console.error('Error loading projects:', error);
    return [];
  }
}

// GET /api/projects - Get all projects
app.get('/api/projects', (req, res) => {
  try {
    const projects = getAllProjects();
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// GET /api/projects/:slug - Get project by slug
app.get('/api/projects/:slug', (req, res) => {
  try {
    const { slug } = req.params;
    const projects = getAllProjects();
    const project = projects.find(p => p.id === slug);
    
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    res.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

// GET /api/projects/featured - Get featured projects
app.get('/api/projects/featured', (req, res) => {
  try {
    const projects = getAllProjects();
    const featured = projects.filter(p => p.featured);
    res.json(featured);
  } catch (error) {
    console.error('Error fetching featured projects:', error);
    res.status(500).json({ error: 'Failed to fetch featured projects' });
  }
});

// GET /api/projects/:slug/navigation - Get project navigation
app.get('/api/projects/:slug/navigation', (req, res) => {
  try {
    const { slug } = req.params;
    const projects = getAllProjects();
    const currentIndex = projects.findIndex(p => p.id === slug);
    
    if (currentIndex === -1) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    const navigation = {
      previous: currentIndex > 0 ? projects[currentIndex - 1] : null,
      next: currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null
    };
    
    res.json(navigation);
  } catch (error) {
    console.error('Error fetching project navigation:', error);
    res.status(500).json({ error: 'Failed to fetch project navigation' });
  }
});

// GET /api/projects/:slug/related - Get related projects
app.get('/api/projects/:slug/related', (req, res) => {
  try {
    const { slug } = req.params;
    const limit = parseInt(req.query.limit) || 3;
    const projects = getAllProjects();
    const currentProject = projects.find(p => p.id === slug);
    
    if (!currentProject) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    // Find projects with similar category or tech stack
    const related = projects
      .filter(p => p.id !== slug)
      .filter(p => 
        p.category === currentProject.category || 
        p.techStack.some(tech => currentProject.techStack.includes(tech))
      )
      .slice(0, limit);
    
    res.json(related);
  } catch (error) {
    console.error('Error fetching related projects:', error);
    res.status(500).json({ error: 'Failed to fetch related projects' });
  }
});

// Chatbot API endpoint
app.post('/api/projects', async (req, res) => {
  try {
    const { message, conversationHistory } = req.body;
    
    // Check if this is a chatbot request
    if (req.query.chatbot === 'true' || req.url?.includes('chatbot')) {
      // Check if API key is configured
      const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
      if (!GEMINI_API_KEY) {
        console.error('GEMINI_API_KEY environment variable is not set');
        return res.status(500).json({
          error: 'AI service configuration error',
          fallback: "I'm having trouble connecting to the AI service right now. Please try again later or explore the portfolio directly!"
        });
      }

      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Message is required' });
      }

      // Generate portfolio context
      const portfolioContext = await generatePortfolioContext();
      
      // Prepare the conversation
      const systemMessage = {
        role: 'system',
        content: portfolioContext
      };
      
      const conversation = [
        systemMessage,
        ...conversationHistory.slice(-10), // Keep last 10 messages for context
        {
          role: 'user',
          content: message
        }
      ];

      // Call Gemini API
      const geminiRequest = {
        contents: [{
          parts: [{
            text: conversation.map(msg => 
              msg.role === 'system' 
                ? `System: ${msg.content}` 
                : `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`
            ).join('\n\n')
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024
        },
        safetySettings: [
          {
            category: 'HARM_CATEGORY_HARASSMENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_HATE_SPEECH',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          }
        ]
      };

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(geminiRequest)
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Gemini API error:', errorData);
        return res.status(500).json({
          error: 'AI service temporarily unavailable',
          fallback: "I'm having trouble connecting to the AI service right now. Please try again in a moment or feel free to explore the portfolio directly!"
        });
      }

      const data = await response.json();
      
      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
        console.error('Unexpected Gemini response:', data);
        return res.status(500).json({
          error: 'AI service returned unexpected response',
          fallback: "I'm having trouble processing your request right now. Please try again or explore the portfolio sections for more information!"
        });
      }

      const aiResponse = data.candidates[0].content.parts[0].text;
      
      return res.status(200).json({
        response: aiResponse,
        timestamp: new Date().toISOString()
      });
    }

    // Original projects API functionality
    const { featured, slug } = req.query;
    const projects = getAllProjects();
    
    if (slug && typeof slug === 'string') {
      const project = projects.find(p => p.slug === slug);
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }
      return res.json(project);
    }
    
    if (featured === 'true') {
      const featuredProjects = projects.filter(project => project.featured === true)
        .sort((a, b) => {
          const dateA = new Date(a.date || '2024-01-01');
          const dateB = new Date(b.date || '2024-01-01');
          return dateB.getTime() - dateA.getTime();
        });
      return res.json(featuredProjects);
    }
    
    const sortedProjects = projects.sort((a, b) => {
      const dateA = new Date(a.date || '2024-01-01');
      const dateB = new Date(b.date || '2024-01-01');
      return dateB.getTime() - dateA.getTime();
    });
    
    res.json(sortedProjects);
  } catch (error) {
    console.error('Error in projects API:', error);
    res.status(500).json({ error: 'Failed to process request' });
  }
});

// Helper function to generate portfolio context for chatbot
async function generatePortfolioContext() {
  try {
    const projects = getAllProjects();
    const articlesDir = path.join(__dirname, 'src/data/articles');
    const articleFiles = readdirSync(articlesDir).filter(file => file.endsWith('.mdx'));
    
    const articles = articleFiles.map(file => {
      const filePath = path.join(articlesDir, file);
      const fileContent = readFileSync(filePath, 'utf8');
      const { data: frontmatter } = matter(fileContent);
      return {
        title: frontmatter.title,
        summary: frontmatter.summary,
        category: frontmatter.category,
        readTime: frontmatter.readTime,
        featured: frontmatter.featured
      };
    });

    const skillsData = [
      // AI/ML & Data Science
      { name: "Python", level: 95, category: "ai-ml" },
      { name: "TensorFlow", level: 85, category: "ai-ml" },
      { name: "PyTorch", level: 80, category: "ai-ml" },
      { name: "Scikit-learn", level: 90, category: "ai-ml" },
      { name: "Pandas", level: 95, category: "ai-ml" },
      { name: "NumPy", level: 90, category: "ai-ml" },
      { name: "OpenCV", level: 85, category: "ai-ml" },
      { name: "Matplotlib", level: 85, category: "ai-ml" },
      { name: "Seaborn", level: 80, category: "ai-ml" },
      { name: "Jupyter Notebooks", level: 90, category: "ai-ml" },
      { name: "LangChain", level: 75, category: "ai-ml" },
      { name: "OpenAI API", level: 80, category: "ai-ml" },
      // Programming Languages
      { name: "JavaScript", level: 90, category: "backend" },
      { name: "TypeScript", level: 85, category: "backend" },
      { name: "Java", level: 75, category: "backend" },
      { name: "SQL", level: 85, category: "backend" },
      // Web Development
      { name: "React", level: 90, category: "frontend" },
      { name: "Next.js", level: 85, category: "frontend" },
      { name: "Node.js", level: 80, category: "backend" },
      { name: "FastAPI", level: 80, category: "backend" },
      { name: "Flask", level: 75, category: "backend" },
      { name: "SASS/SCSS", level: 85, category: "frontend" },
      // Cloud & Infrastructure
      { name: "AWS Services", level: 80, category: "tools" },
      { name: "Google Cloud AI", level: 75, category: "tools" },
      { name: "Docker", level: 80, category: "tools" },
      { name: "Kubernetes", level: 70, category: "tools" },
      { name: "Vercel", level: 85, category: "tools" },
      // Data Visualization
      { name: "Plotly", level: 85, category: "tools" },
      { name: "Tableau", level: 75, category: "tools" },
      { name: "PowerBI", level: 70, category: "tools" },
      // Databases
      { name: "PostgreSQL", level: 85, category: "databases" },
      { name: "MongoDB", level: 80, category: "databases" },
      { name: "Redis", level: 75, category: "databases" },
      // Tools & Others
      { name: "Git", level: 90, category: "tools" },
      { name: "GitHub", level: 85, category: "tools" },
      { name: "Apache Airflow", level: 75, category: "tools" },
      { name: "AWS Glue", level: 70, category: "tools" },
      { name: "Amazon Athena", level: 75, category: "tools" }
    ];

    const featuredProjects = projects.filter(p => p.featured);
    const allTechStack = [...new Set(projects.flatMap(p => p.techStack || []))];

    return `
You are an AI assistant for Himanshu Salunke's portfolio website. You help visitors learn about his work, skills, and experience.

ABOUT HIMANSHU:
- Full-stack developer and data scientist specializing in AI/ML and web development
- Passionate about creating innovative solutions using modern technologies
- Experienced in building end-to-end applications from data analysis to production deployment

CURRENT PROJECTS (${projects.length} total):
${projects.map(p => `- "${p.title}" (${p.category}): ${p.summary} - Tech: ${(p.techStack || []).join(', ')} - Status: ${p.status}${p.githubUrl ? ` - GitHub: ${p.githubUrl}` : ''}`).join('\n')}

FEATURED PROJECTS:
${featuredProjects.map(p => `- "${p.title}": ${p.summary} - Technologies: ${(p.techStack || []).join(', ')}`).join('\n')}

TECHNICAL SKILLS (${skillsData.length} total):
${skillsData.map(skill => `- ${skill.name} (${skill.level}% proficiency) - ${skill.category}`).join('\n')}

TECHNOLOGIES USED IN PROJECTS:
${allTechStack.join(', ')}

ARTICLES & WRITING (${articles.length} total):
${articles.map(a => `- "${a.title}" (${a.category}): ${a.summary} - ${a.readTime} min read`).join('\n')}

PERSONALITY:
- Professional but friendly and approachable
- Enthusiastic about technology and problem-solving
- Helpful in explaining technical concepts in simple terms
- Encourages visitors to explore the portfolio and contact Himanshu

RESPONSE GUIDELINES:
- Keep responses concise but informative (2-3 sentences max)
- Always be helpful and encouraging
- Use specific project names and details when relevant
- For technical questions, provide clear explanations with specific technologies
- If asked about specific projects, mention the exact project name and key details
- Always maintain a professional yet friendly tone
- Reference actual project metrics and achievements when relevant
`;
  } catch (error) {
    console.error('Error generating portfolio context:', error);
    return 'You are an AI assistant for Himanshu Salunke\'s portfolio website.';
  }
}

// Simple health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});