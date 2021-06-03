import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import "@fontsource/roboto";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
export default MyApp
