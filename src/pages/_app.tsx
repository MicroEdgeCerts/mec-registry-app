import dynamic from "next/dynamic";
import type { AppProps } from "next/app";
import Layout from "@/layout";
import "@/styles/globals.scss";
import Loading from "@/components/Loading";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { wrapAppWithTranslation } from '@/context/LocalizedContext'
const WalletWrapper = dynamic(() => import("@/context/WalletWrapper"), {
  ssr: false,
  loading: () => <Loading />,
});

const  App = ({ Component, pageProps }: AppProps) => {
  return (
    <WalletWrapper>
      <ToastContainer />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </WalletWrapper>
  );
}

export default wrapAppWithTranslation(App);

