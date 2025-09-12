// Simple markdown to HTML converter for MDX content
export function markdownToHtml(markdown: string): string {
  let html = markdown

  // Convert headers
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>')
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>')
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>')

  // Convert bold and italic
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>')

  // Convert code blocks
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>')
  html = html.replace(/`(.*?)`/g, '<code>$1</code>')

  // Convert links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')

  // Convert images
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="w-full rounded-lg shadow-lg my-4" />')

  // Convert lists
  html = html.replace(/^\* (.*$)/gim, '<li>$1</li>')
  html = html.replace(/^- (.*$)/gim, '<li>$1</li>')
  html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')

  // Convert numbered lists
  html = html.replace(/^\d+\. (.*$)/gim, '<li>$1</li>')
  html = html.replace(/(<li>.*<\/li>)/s, '<ol>$1</ol>')

  // Convert paragraphs
  html = html.replace(/\n\n/g, '</p><p>')
  html = '<p>' + html + '</p>'

  // Clean up empty paragraphs
  html = html.replace(/<p><\/p>/g, '')
  html = html.replace(/<p>\s*<\/p>/g, '')

  // Convert line breaks
  html = html.replace(/\n/g, '<br>')

  return html
}

// Enhanced markdown parser with better formatting
export function parseMarkdown(markdown: string): string {
  const lines = markdown.split('\n')
  const htmlLines: string[] = []
  let inCodeBlock = false
  let codeLanguage = ''

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // Handle code blocks
    if (line.startsWith('```')) {
      if (!inCodeBlock) {
        codeLanguage = line.replace('```', '').trim()
        htmlLines.push(`<pre><code class="language-${codeLanguage}">`)
        inCodeBlock = true
      } else {
        htmlLines.push('</code></pre>')
        inCodeBlock = false
        codeLanguage = ''
      }
      continue
    }

    if (inCodeBlock) {
      htmlLines.push(line)
      continue
    }

    // Handle headers
    if (line.startsWith('### ')) {
      htmlLines.push(`<h3>${line.replace('### ', '')}</h3>`)
    } else if (line.startsWith('## ')) {
      htmlLines.push(`<h2>${line.replace('## ', '')}</h2>`)
    } else if (line.startsWith('# ')) {
      htmlLines.push(`<h1>${line.replace('# ', '')}</h1>`)
    }
    // Handle lists
    else if (line.startsWith('- ') || line.startsWith('* ')) {
      htmlLines.push(`<li>${line.replace(/^[-*] /, '')}</li>`)
    }
    // Handle numbered lists
    else if (/^\d+\. /.test(line)) {
      htmlLines.push(`<li>${line.replace(/^\d+\. /, '')}</li>`)
    }
    // Handle empty lines
    else if (line.trim() === '') {
      htmlLines.push('')
    }
    // Handle regular paragraphs
    else {
      htmlLines.push(line)
    }
  }

  // Process the HTML lines
  let html = htmlLines.join('\n')

  // Convert inline formatting
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>')
  html = html.replace(/`(.*?)`/g, '<code>$1</code>')

  // Convert links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')

  // Convert images
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="w-full rounded-lg shadow-lg my-4" />')

  // Wrap consecutive list items in ul/ol
  html = html.replace(/(<li>.*<\/li>(\s*<li>.*<\/li>)*)/g, (match) => {
    if (match.includes('1.') || match.includes('2.') || match.includes('3.')) {
      return `<ol>${match}</ol>`
    }
    return `<ul>${match}</ul>`
  })

  // Wrap paragraphs
  const paragraphs = html.split('\n\n')
  html = paragraphs.map(p => {
    p = p.trim()
    if (p && !p.startsWith('<') && !p.startsWith('```')) {
      return `<p>${p}</p>`
    }
    return p
  }).join('\n\n')

  return html
}
