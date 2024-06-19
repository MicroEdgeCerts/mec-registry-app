import Head from "next/head";
import Header from "@/components/Header";

// types

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Head>
        <title>MEC Registry</title>
      </Head>
      <Header />
      {children}
    </>
  );
}
