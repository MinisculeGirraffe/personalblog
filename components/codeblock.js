import { PrismAsync as SyntaxHighlighter } from "react-syntax-highlighter"
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism/'
export const CodeBlock = ({ language, value }) => {
    const lang = language ? language : 'powershell'
    return (
        <SyntaxHighlighter language={lang} style={atomDark} children={value} />
    )

}


