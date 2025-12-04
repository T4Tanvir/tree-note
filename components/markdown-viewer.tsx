"use client"
import type { JSX } from "react"

export function MarkdownViewer({ content }: { content: string }) {
  const parseMarkdown = (md: string) => {
    const elements: JSX.Element[] = []
    const lines = md.split("\n")
    let currentList: string[] = []

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]

      // Skip empty lines
      if (!line.trim()) {
        if (currentList.length > 0) {
          elements.push(
            <ul key={`list-${elements.length}`} className="my-2 space-y-1 ml-4">
              {currentList.map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{renderInline(item)}</span>
                </li>
              ))}
            </ul>,
          )
          currentList = []
        }
        continue
      }

      // Headers
      if (line.startsWith("# ")) {
        elements.push(
          <h1 key={`h1-${elements.length}`} className="text-2xl font-bold mt-6 mb-3">
            {renderInline(line.substring(2))}
          </h1>,
        )
        continue
      }
      if (line.startsWith("## ")) {
        elements.push(
          <h2 key={`h2-${elements.length}`} className="text-xl font-bold mt-5 mb-3">
            {renderInline(line.substring(3))}
          </h2>,
        )
        continue
      }
      if (line.startsWith("### ")) {
        elements.push(
          <h3 key={`h3-${elements.length}`} className="text-lg font-bold mt-4 mb-2">
            {renderInline(line.substring(4))}
          </h3>,
        )
        continue
      }

      // Lists
      if (line.startsWith("- ")) {
        currentList.push(line.substring(2))
        continue
      }

      // Code blocks
      if (line.startsWith("```")) {
        let codeContent = ""
        i++
        while (i < lines.length && !lines[i].startsWith("```")) {
          codeContent += lines[i] + "\n"
          i++
        }
        elements.push(
          <pre
            key={`code-${elements.length}`}
            className="bg-secondary/50 rounded-lg p-3 my-3 overflow-x-auto border border-border"
          >
            <code className="text-xs font-mono text-foreground">{codeContent.trim()}</code>
          </pre>,
        )
        continue
      }

      // Paragraphs
      elements.push(
        <p key={`p-${elements.length}`} className="my-3">
          {renderInline(line)}
        </p>,
      )
    }

    if (currentList.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`} className="my-2 space-y-1 ml-4">
          {currentList.map((item, idx) => (
            <li key={idx} className="flex items-start">
              <span className="mr-2">•</span>
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ul>,
      )
    }

    return elements
  }

  const renderInline = (text: string) => {
    const elements: (string | JSX.Element)[] = []
    const lastIndex = 0

    // Bold: **text**
    const boldRegex = /\*\*(.*?)\*\*/g
    let match
    const textWithBold = text.replace(boldRegex, (_, content) => `__BOLD_START__${content}__BOLD_END__`)

    // Italic: *text*
    const italicRegex = /\*(.*?)\*/g
    const textWithItalic = textWithBold.replace(italicRegex, (_, content) => `__ITALIC_START__${content}__ITALIC_END__`)

    // Inline code: `text`
    const codeRegex = /`([^`]+)`/g
    const textWithCode = textWithItalic.replace(codeRegex, (_, content) => `__CODE_START__${content}__CODE_END__`)

    const parts = textWithCode.split(/(__(?:BOLD|ITALIC|CODE)_(?:START|END)__)/g)

    let boldOpen = false
    let italicOpen = false
    let codeOpen = false

    for (const part of parts) {
      if (part === "__BOLD_START__") {
        boldOpen = true
      } else if (part === "__BOLD_END__") {
        boldOpen = false
      } else if (part === "__ITALIC_START__") {
        italicOpen = true
      } else if (part === "__ITALIC_END__") {
        italicOpen = false
      } else if (part === "__CODE_START__") {
        codeOpen = true
      } else if (part === "__CODE_END__") {
        codeOpen = false
      } else if (part) {
        if (codeOpen) {
          elements.push(
            <code
              key={`inline-code-${elements.length}`}
              className="bg-secondary/50 px-2 py-0.5 rounded text-xs font-mono text-primary"
            >
              {part}
            </code>,
          )
        } else if (boldOpen && italicOpen) {
          elements.push(
            <strong key={`bold-italic-${elements.length}`} className="font-bold italic">
              {part}
            </strong>,
          )
        } else if (boldOpen) {
          elements.push(
            <strong key={`bold-${elements.length}`} className="font-bold">
              {part}
            </strong>,
          )
        } else if (italicOpen) {
          elements.push(
            <em key={`italic-${elements.length}`} className="italic">
              {part}
            </em>,
          )
        } else {
          elements.push(part)
        }
      }
    }

    return elements
  }

  return (
    <div className="prose prose-invert max-w-none text-sm leading-relaxed text-foreground space-y-2">
      {parseMarkdown(content)}
    </div>
  )
}
