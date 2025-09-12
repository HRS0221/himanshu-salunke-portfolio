# 🚀 Himanshu's Portfolio Website

A modern, interactive portfolio website built with React 19, TypeScript, and cutting-edge web technologies. Features AI-powered interactions, 3D animations, and advanced user experience enhancements.

## ✨ Features

### 🎨 Core Features
- **Modern Tech Stack**: React 19, TypeScript 5.x, Vite 6, Tailwind CSS 4.x
- **Interactive 3D Hero**: React Three Fiber with animated blob and particle background
- **AI Chatbot Assistant**: Floating widget for visitor questions about projects and skills
- **Recruiter Mode**: Toggle to filter recruiter-relevant content and highlight professional achievements
- **Dynamic Now Page**: Real-time view of current work, learning, and focus areas
- **Progress Tracker**: Gamified scroll progress with exploration percentage
- **Easter Egg**: Hidden Konami code activation for fun interactions

### 🎭 Advanced Animations
- **Page Transitions**: Smooth transitions between routes with Framer Motion
- **Micro-interactions**: Card tilts, staggered reveals, spring counters, hover 3D effects
- **Particle System**: Interactive particle background with Three.js
- **Floating Elements**: Subtle floating animations for visual interest
- **Magnetic Buttons**: Interactive buttons with magnetic hover effects

### 📊 Dynamic Content
- **GitHub Integration**: Real-time stats (stars, forks, commits) for projects
- **Tech Usage Visualization**: Animated progress bars showing technology proficiency
- **MDX Content**: Rich project and article pages with syntax highlighting
- **Responsive Images**: WebP/AVIF optimization with lazy loading
- **Theme System**: Dark/light mode with smooth transitions

### 🎯 User Experience
- **Accessibility**: WCAG AA compliant with keyboard navigation and screen reader support
- **Performance**: Code splitting, lazy loading, and optimized Lighthouse scores
- **SEO Optimized**: Meta tags, structured data, and sitemap generation
- **Mobile First**: Responsive design with touch-friendly interactions

## 🛠️ Tech Stack

### Frontend
- **React 19** - Latest React with concurrent features
- **TypeScript 5.x** - Type-safe development
- **Vite 6** - Fast build tool and dev server
- **Tailwind CSS 4.x** - Utility-first styling
- **Framer Motion 11+** - Advanced animations
- **React Router v7** - Client-side routing
- **React Three Fiber** - 3D graphics and animations
- **MDX v3** - Rich content authoring

### Development Tools
- **ESLint** - Code linting with TypeScript support
- **Prettier** - Code formatting with Tailwind plugin
- **Husky** - Git hooks for pre-commit and pre-push
- **lint-staged** - Run linters on staged files
- **Commitlint** - Conventional commits enforcement
- **Vitest** - Unit testing with React Testing Library
- **Playwright** - E2E testing with cross-browser support
- **GitHub Actions** - CI/CD pipeline with automated testing
- **Lighthouse CI** - Performance auditing in CI/CD

### Deployment
- **Vercel** - Static site hosting
- **Serverless Functions** - API endpoints
- **Environment Variables** - Secure configuration

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/himanshu-portfolio-website.git
   cd himanshu-portfolio-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your values:
   ```env
   # Site Configuration
   SITE_URL=https://your-domain.com
   SITE_NAME="Your Portfolio"
   SITE_DESCRIPTION="Your Portfolio Description"
   
   # Optional: GitHub API token for higher rate limits
   GITHUB_TOKEN=your_github_token
   GITHUB_USERNAME=your_github_username
   
   # Optional: Contact form integration
   SLACK_WEBHOOK_URL=your_slack_webhook_url
   RESEND_API_KEY=your_resend_api_key
   
   # Optional: Analytics (Vercel Analytics is enabled by default)
   VERCEL_ANALYTICS=true
   
   # Development
   NODE_ENV=development
   VITE_DEV_SERVER_PORT=3000
   ```

4. **Set up Git hooks** (Optional but recommended)
   ```bash
   # Husky is already configured, just ensure it's set up
   npx husky install
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
src/
├── app/                    # Main app and routing
│   ├── pages/             # Route components
│   └── App.tsx            # App root with providers
├── components/            # Reusable components
│   ├── animations/        # Animation components
│   ├── chatbot/          # AI chatbot widget
│   ├── gamification/     # Progress tracker, easter eggs
│   ├── header/           # Navigation header
│   ├── home/             # Homepage sections
│   ├── recruiter/        # Recruiter mode components
│   ├── ui/               # Basic UI components
│   └── work/             # Project-related components
├── context/              # React contexts
├── data/                 # Static data and MDX content
├── hooks/                # Custom React hooks
├── utils/                # Utility functions
└── assets/               # Static assets
```

## 🎨 Customization

### Adding New Projects

1. **Create MDX file** in `src/data/projects/`
   ```mdx
   ---
   title: "Your Project"
   slug: "your-project"
   date: "2025-01-15"
   featured: true
   category: "Web Development"
   status: "Completed"
   coverImage: "/images/work/project-cover.webp"
   summary: "Brief project description"
   bullets:
     - "Key feature 1"
     - "Key feature 2"
   techStack:
     - "React"
     - "TypeScript"
   metrics:
     - label: "Performance"
       value: "95%"
   githubUrl: "https://github.com/username/repo"
   liveUrl: "https://your-project.com"
   ---
   
   # Your Project
   
   Detailed project description with code examples...
   ```

2. **Add cover image** to `public/images/work/`

### Adding New Articles

1. **Create MDX file** in `src/data/articles/`
   ```mdx
   ---
   title: "Your Article"
   slug: "your-article"
   date: "2025-01-15"
   coverImage: "/images/articles/article-cover.webp"
   tags:
     - "React"
     - "Tutorial"
   author: "Your Name"
   readTime: 5
   excerpt: "Article summary"
   ---
   
   # Your Article
   
   Article content with code blocks and examples...
   ```

### Customizing Current Focus

Edit `src/data/currentFocus.json`:
```json
[
  {
    "id": "your-focus",
    "title": "Your Focus Area",
    "description": "What you're working on",
    "icon": "rocket",
    "status": "active"
  }
]
```

## 🧪 Testing

### Unit Tests
```bash
npm run test
```

### E2E Tests
```bash
npm run test:e2e
```

### Test Coverage
```bash
npm run test:coverage
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect to Vercel**
   - Push your code to GitHub
   - Connect repository to Vercel
   - Set environment variables in Vercel dashboard:
     - `VERCEL_TOKEN` - Your Vercel API token
     - `VERCEL_ORG_ID` - Your Vercel organization ID
     - `VERCEL_PROJECT_ID` - Your Vercel project ID

2. **Automatic Deployment**
   - GitHub Actions will automatically deploy on push to main branch
   - Pull requests will create preview deployments
   - Lighthouse CI will run performance audits

3. **Manual Deploy**
   ```bash
   npm run build
   ```

4. **Custom Domain** (Optional)
   - Add domain in Vercel dashboard
   - Update DNS settings

### Manual Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy dist/ folder** to your hosting provider

3. **Set up redirects** for SPA routing:
   ```
   /* /index.html 200
   ```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm run typecheck` - Run TypeScript checks
- `npm run test` - Run unit tests
- `npm run test:e2e` - Run E2E tests
- `npm run generate:sitemap` - Generate sitemap.xml

## 🎯 Performance

### Lighthouse Scores
- **Performance**: 95+
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 100

### Optimization Features
- Code splitting and lazy loading
- Image optimization (WebP/AVIF)
- Font preloading
- Service worker caching
- Bundle analysis

## 🔒 Security

- Environment variables for sensitive data
- Content Security Policy headers
- XSS protection
- CSRF protection for forms
- Rate limiting on API endpoints

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes using conventional commits: `git commit -m 'feat: add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Commit Convention
This project uses [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Test additions/changes
- `chore:` - Build process or auxiliary tool changes

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI library
- [Three.js](https://threejs.org/) - 3D graphics
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Vercel](https://vercel.com/) - Hosting

## 📞 Contact

- **Email**: your.email@example.com
- **LinkedIn**: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- **GitHub**: [Your GitHub](https://github.com/yourusername)
- **Portfolio**: [Your Website](https://your-domain.com)

---

⭐ **Star this repository** if you found it helpful!

Made with ❤️ by [Your Name](https://github.com/yourusername)