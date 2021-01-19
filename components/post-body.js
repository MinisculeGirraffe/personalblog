import ReactMarkdown from "react-markdown"
import {CodeBlock} from './codeblock'
export default function PostBody({ content }) {
  console.log(content)
  return (
    <div className="max-w-2xl mx-auto">
      <ReactMarkdown
        children={content}
        escapeHtml={false}
        renderers={{code: CodeBlock}}
      />

    </div>
  )
}
