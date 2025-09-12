import React from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { Tag } from '../ui/Tag'
import { CodeBlock, InlineCode, CodeTabs } from './CodeBlock'

// Helper function to filter out conflicting props between HTML and Framer Motion
const filterMotionProps = (props: any) => {
  const { 
    onDrag, 
    onDragStart, 
    onDragEnd,
    onCopy,
    onCopyCapture,
    onCut,
    onCutCapture,
    onPaste,
    onPasteCapture,
    ...filteredProps 
  } = props
  return filteredProps
}

// Custom components for MDX content
export const MDXComponents = {
  // Headings
  h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <motion.h1
      className="text-4xl font-bold text-neutral-900 dark:text-white mb-6 mt-8 first:mt-0"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      {...filterMotionProps(props)}
    >
      {children}
    </motion.h1>
  ),
  
  h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <motion.h2
      className="text-3xl font-semibold text-neutral-900 dark:text-white mb-4 mt-8 first:mt-0"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      viewport={{ once: true }}
      {...filterMotionProps(props)}
    >
      {children}
    </motion.h2>
  ),
  
  h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <motion.h3
      className="text-2xl font-semibold text-neutral-900 dark:text-white mb-3 mt-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
      {...filterMotionProps(props)}
    >
      {children}
    </motion.h3>
  ),
  
  h4: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <motion.h4
      className="text-xl font-semibold text-neutral-900 dark:text-white mb-2 mt-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      viewport={{ once: true }}
      {...filterMotionProps(props)}
    >
      {children}
    </motion.h4>
  ),
  
  h5: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <motion.h5
      className="text-lg font-semibold text-neutral-900 dark:text-white mb-2 mt-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      viewport={{ once: true }}
      {...filterMotionProps(props)}
    >
      {children}
    </motion.h5>
  ),
  
  h6: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <motion.h6
      className="text-base font-semibold text-neutral-900 dark:text-white mb-2 mt-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      viewport={{ once: true }}
      {...filterMotionProps(props)}
    >
      {children}
    </motion.h6>
  ),
  
  // Paragraphs
  p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <motion.p
      className="text-neutral-700 dark:text-neutral-300 mb-4 leading-relaxed"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      {...filterMotionProps(props)}
    >
      {children}
    </motion.p>
  ),
  
  // Links
  a: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <motion.a
      href={href}
      className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 underline underline-offset-2 transition-colors duration-200"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...filterMotionProps(props)}
    >
      {children}
    </motion.a>
  ),
  
  // Lists
  ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <motion.ul
      className="list-disc list-inside text-neutral-700 dark:text-neutral-300 mb-4 space-y-2"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      {...filterMotionProps(props)}
    >
      {children}
    </motion.ul>
  ),
  
  ol: ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <motion.ol
      className="list-decimal list-inside text-neutral-700 dark:text-neutral-300 mb-4 space-y-2"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      {...filterMotionProps(props)}
    >
      {children}
    </motion.ol>
  ),
  
  li: ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="leading-relaxed" {...props}>
      {children}
    </li>
  ),
  
  // Code blocks
  pre: ({ children, className, ...props }: React.HTMLAttributes<HTMLPreElement> & { className?: string }) => {
    const language = className?.replace('language-', '') || 'text'
    const codeContent = React.Children.toArray(children).find(
      (child: any) => child && typeof child === 'object' && child.type === 'code'
    ) as any
    const codeText = codeContent?.props?.children
    
    if (codeText && typeof codeText === 'string') {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <CodeBlock language={language} showLineNumbers={true}>
            {codeText}
          </CodeBlock>
        </motion.div>
      )
    }
    
    return (
      <motion.pre
        className="bg-neutral-900 dark:bg-neutral-800 rounded-lg p-4 overflow-x-auto mb-6 relative"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        {...filterMotionProps(props)}
      >
        {children}
      </motion.pre>
    )
  },
  
  code: ({ children, className, ...props }: React.HTMLAttributes<HTMLElement> & { className?: string }) => {
    const isInline = !className?.includes('language-')
    
    if (isInline) {
      return <InlineCode {...props}>{children}</InlineCode>
    }
    
    return (
      <code className={`${className} text-neutral-100 dark:text-neutral-200`} {...props}>
        {children}
      </code>
    )
  },
  
  // Blockquotes
  blockquote: ({ children, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <motion.blockquote
      className="border-l-4 border-primary-500 pl-4 italic text-neutral-600 dark:text-neutral-400 mb-6"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      {...filterMotionProps(props)}
    >
      {children}
    </motion.blockquote>
  ),
  
  // Images
  img: ({ src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <motion.img
      src={src}
      alt={alt}
      className="rounded-lg shadow-md mb-6 w-full h-auto"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      loading="lazy"
      {...filterMotionProps(props)}
    />
  ),
  
  // Tables
  table: ({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <motion.div
      className="overflow-x-auto mb-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <table
        className="min-w-full border-collapse border border-neutral-300 dark:border-neutral-600"
        {...props}
      >
        {children}
      </table>
    </motion.div>
  ),
  
  thead: ({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="bg-neutral-100 dark:bg-neutral-800" {...props}>
      {children}
    </thead>
  ),
  
  tbody: ({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody className="bg-white dark:bg-neutral-900" {...props}>
      {children}
    </tbody>
  ),
  
  tr: ({ children, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className="border-b border-neutral-300 dark:border-neutral-600" {...props}>
      {children}
    </tr>
  ),
  
  th: ({ children, ...props }: React.ThHTMLAttributes<HTMLTableHeaderCellElement>) => (
    <th
      className="px-4 py-2 text-left font-semibold text-neutral-900 dark:text-white border-r border-neutral-300 dark:border-neutral-600 last:border-r-0"
      {...props}
    >
      {children}
    </th>
  ),
  
  td: ({ children, ...props }: React.TdHTMLAttributes<HTMLTableDataCellElement>) => (
    <td
      className="px-4 py-2 text-neutral-700 dark:text-neutral-300 border-r border-neutral-300 dark:border-neutral-600 last:border-r-0"
      {...props}
    >
      {children}
    </td>
  ),
  
  // Horizontal rule
  hr: ({ ...props }: React.HTMLAttributes<HTMLHRElement>) => (
    <motion.hr
      className="border-0 border-t border-neutral-300 dark:border-neutral-600 my-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      {...filterMotionProps(props)}
    />
  ),
  
  // Custom components
  Tag: ({ children, variant = 'default', size = 'md' }: { children: React.ReactNode; variant?: string; size?: string }) => (
    <Tag variant={variant as any} size={size as any}>
      {children}
    </Tag>
  ),
  
  CodeBlock,
  InlineCode,
  CodeTabs,
}
