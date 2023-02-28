import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import "nprogress/nprogress.css";
import type { AppProps } from "next/app";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ToastContainer } from "react-toastify";
import { AppContextType } from "next/dist/shared/lib/utils";
import altogic from "@/libs/altogic";
import { setCookie, getCookie } from "cookies-next";
import { User } from "@/types";
import AuthProvider from "@/store/AuthProvider";
import { Router } from "next/router";
import NProgress from "nprogress";
import LoginModal from "@/components/LoginModal";
import RegisterModal from "@/components/RegisterModal";
import Script from "next/script";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const notAllowedContainerAndFooter = ["Login", "Register", "ForgotPassword"];

function App({ Component, pageProps }: AppProps) {
  const isAllowedContainerAndFooter = Component.displayName
    ? !notAllowedContainerAndFooter.includes(Component.displayName)
    : true;
  return (
    <AuthProvider defaultUser={pageProps.user}>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />
      <Script strategy="lazyOnload">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                page_path: window.location.pathname,
            });
        `}
      </Script>
      <main data-has-footer={isAllowedContainerAndFooter}>
        {isAllowedContainerAndFooter && <Header />}
        <Component {...pageProps} />
        {isAllowedContainerAndFooter && <Footer />}
        <ToastContainer />
      </main>
      <LoginModal />
      <RegisterModal />
    </AuthProvider>
  );
}

App.getInitialProps = async ({ ctx: { req, res } }: AppContextType) => {
  const isServer = Boolean(req);
  let user: User | null = null;
  const token = isServer ? getCookie("session_token", { req }) : null;

  if (isServer && token) {
    const { user: userFromDB } = await altogic.auth.getUserFromDBbyCookie(req, res);
    if (userFromDB) {
      user = userFromDB as User;
      setCookie("userId", userFromDB?._id, {
        req,
        res,
        secure: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
      });
    }
  } else {
    user = altogic.auth.getUser() as User;
  }

  return {
    pageProps: {
      user,
    },
  };
};

export default App;
