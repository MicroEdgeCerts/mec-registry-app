
import Head from 'next/head'
import Header from '@/components/Header'

// types


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Head>
        <title>Ethereum 101</title>
      </Head>
      <Header/>
      {children}
    </>
  )
}