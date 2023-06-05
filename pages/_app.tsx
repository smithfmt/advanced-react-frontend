import NProgress from "nprogress";
import "../components/styles/nprogress.css"
import Router from "next/router";
import Page from "../components/Page";
import { AppProps } from "next/app";

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const myapp: React.FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <Page>
            <Component {...pageProps} />
        </Page>
    )
};

export default myapp;