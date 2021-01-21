import Alert from '../components/alert'
import Footer from '../components/footer'
import Meta from '../components/meta'
import Prism from "Prismjs";
import "prismjs/components/prism-jsx.min";
import "prismjs/components/prism-powershell.min"
import {useEffect} from 'react'

export default function Layout({ preview, children }) {
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  return (
    <>
      <Meta />
      <div className="flex flex-col h-screen">
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}
