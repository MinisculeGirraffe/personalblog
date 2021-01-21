import '../styles/index.css'
import "@fortawesome/fontawesome-svg-core/styles.css"
import { fab } from '@fortawesome/free-brands-svg-icons'
import {far} from '@fortawesome/free-regular-svg-icons'
import {fas} from '@fortawesome/free-solid-svg-icons'
import { config, library } from '@fortawesome/fontawesome-svg-core'
import '../styles/atom-dark.css'

config.autoAddCss = false;
library.add(fab,far,fas)

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}
