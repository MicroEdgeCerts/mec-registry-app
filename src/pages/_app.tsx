import '@/styles/globals.scss';
import type { AppProps } from 'next/app'
import Layout from '@/layout'
import WalletWrapper from '@/context/WalletWrapper'

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Layout>
          <WalletWrapper> 
            <Component {...pageProps} />
          </WalletWrapper>

         </Layout>
}
