import React from 'react';
import { Helmet } from 'react-helmet-async';
import { MetaGenerator } from '../../utils/metaGenerator';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  author?: string;
  ogImage?: string;
  ogUrl?: string;
  ogType?: 'website' | 'article' | 'profile';
  canonical?: string;
  robots?: string;
  structuredData?: any;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords,
  author,
  ogImage,
  ogUrl,
  ogType = 'website',
  canonical,
  robots = 'index, follow',
  structuredData
}) => {
  const metaTags = MetaGenerator.generateMetaTags({
    title,
    description,
    keywords,
    author,
    ogImage,
    ogUrl,
    ogType,
    canonical,
    robots
  });

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{metaTags.title}</title>
      <meta name="description" content={metaTags.description} />
      <meta name="keywords" content={metaTags.keywords} />
      <meta name="author" content={metaTags.author} />
      <meta name="robots" content={metaTags.robots} />
      <meta name="language" content={metaTags.language} />
      <meta name="revisit-after" content={metaTags['revisit-after']} />
      <meta name="distribution" content={metaTags.distribution} />
      <meta name="rating" content={metaTags.rating} />

      {/* Viewport */}
      <meta name="viewport" content={metaTags.viewport} />

      {/* Open Graph Tags */}
      <meta property="og:title" content={metaTags['og:title']} />
      <meta property="og:description" content={metaTags['og:description']} />
      <meta property="og:image" content={metaTags['og:image']} />
      <meta property="og:url" content={metaTags['og:url']} />
      <meta property="og:type" content={metaTags['og:type']} />
      <meta property="og:site_name" content={metaTags['og:site_name']} />
      <meta property="og:locale" content={metaTags['og:locale']} />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content={metaTags['twitter:card']} />
      <meta name="twitter:title" content={metaTags['twitter:title']} />
      <meta name="twitter:description" content={metaTags['twitter:description']} />
      <meta name="twitter:image" content={metaTags['twitter:image']} />
      <meta name="twitter:creator" content={metaTags['twitter:creator']} />
      <meta name="twitter:site" content={metaTags['twitter:site']} />

      {/* Theme Color */}
      <meta name="theme-color" content={metaTags['theme-color']} />
      <meta name="msapplication-TileColor" content={metaTags['msapplication-TileColor']} />

      {/* Canonical URL */}
      <link rel="canonical" href={metaTags.canonical} />

      {/* Favicon */}
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="icon" type="image/png" href="/favicon-32x32.png" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

// Pre-configured SEO components for different page types
export const HomeSEO: React.FC = () => (
  <SEOHead
    title="Himanshu - Aspiring Data Scientist"
    description="Aspiring Data Scientist specializing in machine learning, data science, and modern web development. Building intelligent solutions and innovative applications."
    keywords="Data Scientist, Machine Learning, Data Science, Python, React, TypeScript, Portfolio"
    ogType="website"
    canonical="/"
  />
);

export const AboutSEO: React.FC = () => (
  <SEOHead
    title="About Himanshu - Aspiring Data Scientist"
    description="Learn about my journey as an Aspiring Data Scientist, my passion for technology, and how I build innovative solutions that make a difference."
    keywords="About, AI Engineer, Machine Learning, Developer, Experience, Skills, Journey"
    ogType="profile"
    canonical="/about"
  />
);

export const WorkSEO: React.FC = () => (
  <SEOHead
    title="My Work - Projects & Case Studies"
    description="Explore my portfolio of AI/ML projects, web applications, and case studies showcasing my technical expertise and problem-solving abilities."
    keywords="Portfolio, Projects, Case Studies, AI Projects, Web Development, Machine Learning Applications"
    ogType="website"
    canonical="/work"
  />
);

export const ContactSEO: React.FC = () => (
  <SEOHead
    title="Contact Himanshu - Let's Work Together"
    description="Get in touch for collaborations, project discussions, or just to say hello. I'm always excited to work on new challenges and opportunities."
    keywords="Contact, Collaboration, Hire, Project, Work Together, Get In Touch"
    ogType="website"
    canonical="/contact"
  />
);
