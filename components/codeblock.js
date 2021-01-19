import { PrismAsync as SyntaxHighlighter } from "react-syntax-highlighter"
import {atomDark} from 'react-syntax-highlighter/dist/cjs/styles/prism/'
export const CodeBlock = ({language, value}) => (
    <SyntaxHighlighter language={language}  style={atomDark} children={value} />
)
