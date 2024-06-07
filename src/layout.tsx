import Head from 'next/head'

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
      {children}
    </>
  )
}