import { config } from '../siteConfig'
import HeaderIcon from './header-icon'
import Link from 'next/link'
export default function Intro() {
  return (
    <div className=" justify-start fixed flex w-full bg-color-basic-900 shadow-lg z-20">

      <div className="container text-white mx-auto flex flex-row justify-between md:justify-between ">
        <Link href='/'>
          <a>
            <section className="flex-col flex justify-items-center hover:underline rounded ">
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
        <HeaderIcon
          link='/archive'
          text='Archive'
          icon='archive'
       />
        <HeaderIcon
          link="https://twitter.com/minigirraffe"
          text='Twitter'
          icon={['fab','twitter']}
        />
        <HeaderIcon
          link='https://github.com/MinisculeGirraffe'
          text='Github'
          icon={['fab','github']}
        />
   
        </span>
      </div>
    </div>


  )
}
