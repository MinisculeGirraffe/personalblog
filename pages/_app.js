import '../styles/index.css'
import "@fortawesome/fontawesome-svg-core/styles.css"
import { config, library } from '@fortawesome/fontawesome-svg-core'
config.autoAddCss = false;

export default function MyApp({ Component, pageProps }) {

  return <Component {...pageProps} />
}
