import ReactMarkdown from "react-markdown"
import {CodeBlock} from './codeblock'
const gfm = require('remark-gfm')

export default function PostBody({ content }) {
  console.log(content)
  return (
    <div className="max-w-2xl mx-auto">
      <ReactMarkdown
        plugins={[gfm]}
        children={content}
        escapeHtml={false}
        renderers={{code: CodeBlock}}
      />

    </div>
  )
}
