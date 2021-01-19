import { config } from '../siteConfig'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons'
import Link from 'next/link'
export default function Intro() {
  return (
    <div className="w-full  bg-color-basic-900">

      <div className="container text-white mx-auto flex flex-row justify-between md:justify-between ">
        <Link href='/'>
          <a>
            <section className="flex-col flex justify-items-center hover:underline">
              <h1 className="text-2xl md:text-4xl font-bold tracking-tighter leading-tight">
                {config.blogName}
              </h1>
              <h4 className=" text-lg md:pl-8">
                {config.blogDescription}
              </h4>
            </section>
          </a>

        </Link>

        <span className='flex-row flex items-center space-x-4'>
          <a className='hover:underline' href='https://twitter.com/minigirraffe'>
            <FontAwesomeIcon icon={faTwitter} />
            Twitter
          </a>
          <a className='hover:underline' href='https://github.com/MinisculeGirraffe'>
            <FontAwesomeIcon icon={faGithub} />
            Github
          </a>
        </span>
      </div>
    </div>


  )
}
