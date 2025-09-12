import React, { useState } from 'react'
import { motion } from 'framer-motion'

interface CodeBlockProps {
  children: string
  className?: string
  language?: string
  title?: string
  showLineNumbers?: boolean
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  children,
  className = '',
  language = 'text',
  title,
  showLineNumbers = false
}) => {
  const [copied, setCopied] = useState(false)
  const [showCopyButton, setShowCopyButton] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  const lines = children.split('\n')
  const lineNumbers = lines.map((_, index) => index + 1)

  return (
    <div className="relative group">
      {/* Header */}
      {title && (
        <div className="flex items-center justify-between px-4 py-2 bg-neutral-100 dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700 rounded-t-lg">
          <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            {title}
          </span>
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            {language}
          </span>
        </div>
      )}

      {/* Code Block */}
      <div
        className={`relative ${title ? 'rounded-b-lg' : 'rounded-lg'} overflow-hidden bg-neutral-900 dark:bg-neutral-950 ${className}`}
        onMouseEnter={() => setShowCopyButton(true)}
        onMouseLeave={() => setShowCopyButton(false)}
      >
        {/* Copy Button */}
        <motion.button
          className={`absolute top-3 right-3 z-10 p-2 rounded-md transition-all duration-200 ${
            copied
              ? 'bg-green-600 text-white'
              : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white'
          } ${showCopyButton || copied ? 'opacity-100' : 'opacity-0'}`}
          onClick={handleCopy}
          aria-label={copied ? 'Copied!' : 'Copy code'}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {copied ? (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          )}
        </motion.button>

        {/* Language Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="px-2 py-1 text-xs font-medium bg-neutral-800 text-neutral-300 rounded">
            {language}
          </span>
        </div>

        {/* Code Content */}
        <div className="overflow-x-auto">
          <pre className="p-4 text-sm text-neutral-100 leading-relaxed">
            <code className={`language-${language}`}>
              {showLineNumbers ? (
                <div className="flex">
                  <div className="flex-shrink-0 pr-4 text-neutral-500 select-none">
                    {lineNumbers.map(lineNum => (
                      <div key={lineNum} className="leading-relaxed">
                        {lineNum.toString().padStart(2, ' ')}
                      </div>
                    ))}
                  </div>
                  <div className="flex-1">
                    {lines.map((line, index) => (
                      <div key={index} className="leading-relaxed">
                        {line || '\u00A0'}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                children
              )}
            </code>
          </pre>
        </div>
      </div>

      {/* Copy Success Message */}
      {copied && (
        <motion.div
          className="absolute top-12 right-3 z-20 px-3 py-1 bg-green-600 text-white text-sm rounded-md shadow-lg"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          Copied!
        </motion.div>
      )}
    </div>
  )
}

interface InlineCodeProps {
  children: React.ReactNode
  className?: string
}

export const InlineCode: React.FC<InlineCodeProps> = ({ children, className = '' }) => {
  return (
    <code className={`px-2 py-1 text-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 rounded font-mono ${className}`}>
      {children}
    </code>
  )
}

interface CodeTabsProps {
  tabs: Array<{
    label: string
    language: string
    code: string
  }>
  defaultTab?: number
}

export const CodeTabs: React.FC<CodeTabsProps> = ({ tabs, defaultTab = 0 }) => {
  const [activeTab, setActiveTab] = useState(defaultTab)

  return (
    <div className="rounded-lg overflow-hidden bg-neutral-900 dark:bg-neutral-950">
      {/* Tab Headers */}
      <div className="flex border-b border-neutral-700">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === index
                ? 'bg-neutral-800 text-white border-b-2 border-primary-500'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-4">
        <CodeBlock
          language={tabs[activeTab].language}
          showLineNumbers={true}
        >
          {tabs[activeTab].code}
        </CodeBlock>
      </div>
    </div>
  )
}
