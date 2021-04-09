import Footer from '../components/footer'
import Meta from '../components/meta'
import Intro from '../components/intro'
import prism from 'prismjs'
import "prismjs/components/prism-jsx.min.js";
import "prismjs/components/prism-powershell.min.js"
import { initGA, logPageView } from '../lib/analytics'
import { useEffect } from 'react'

export default function Layout({ preview, children }) {
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  return (
    <>
      <Meta />
      <div className=" flex min-h-full bg-color-basic-1100 text-color-basic-100 text-opacity-80 ">
        <Intro />
        <div className='flex-1 flex-wrap min-h-screen mt-20 w-screen'>
          <main>{children}</main>
        </div>
      </div>
      <Footer />
    </>
  )
}
