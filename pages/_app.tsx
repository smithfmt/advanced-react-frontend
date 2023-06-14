import { ApolloProvider } from '@apollo/client';
import NProgress from 'nprogress';
import Router from 'next/router';
import Page from '../components/Page';
import '../components/styles/nprogress.css';
import withData from '../lib/withData';
import { CartStateProvider } from '../lib/cartState';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const MyApp = ({ Component, pageProps, apollo }: any) => {
    return (
        <ApolloProvider client={apollo}>
            <CartStateProvider>
                <Page>
                    <Component {...pageProps} />
                </Page>
            </CartStateProvider>
        </ApolloProvider>
    );
};

MyApp.getInitialProps = async ({ Component, ctx }: any) => {
    let pageProps: any = {};
    if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
    }
    pageProps.query = ctx.query;
    return { pageProps };
};

export default withData(MyApp as any);



















// import { AppProps } from "next/app";
// import { ComponentType } from "react";
// import { NextPageContext } from "next";
// import { ApolloClient, ApolloLink } from "@apollo/client";
// import { ApolloProvider } from "@apollo/client";
// import { ApolloProvider as ApolloHooksProvider } from "@apollo/client";
// import { createUploadLink } from "apollo-upload-client";
// import { InMemoryCache } from "@apollo/client";

// import NProgress from "nprogress";
// import "nprogress/nprogress.css";
// import Router from "next/router";

// import Page from "../components/Page";
// import { onError } from "@apollo/link-error";

// type MyAppProps = AppProps & {
//     Component: ComponentType<any>;
//     ctx: NextPageContext;
// };

// // NProgress setup
// Router.events.on("routeChangeStart", () => NProgress.start());
// Router.events.on("routeChangeComplete", () => NProgress.done());
// Router.events.on("routeChangeError", () => NProgress.done());

// const endpoint = "http://localhost:3000/api/graphql";

// const createApolloClient = () => {
//     return new ApolloClient({
//         link: ApolloLink.from([
//             onError(({ graphQLErrors, networkError }) => {
//                 if (graphQLErrors)
//                     graphQLErrors.forEach(({ message, locations, path }) =>
//                         console.log(
//                             `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
//                         )
//                     );
//                 if (networkError)
//                     console.log(
//                         `[Network error]: ${networkError}. Backend is unreachable. Is it running?`
//                     );
//             }),
//             createUploadLink({
//                 uri: endpoint,
//                 fetchOptions: {
//                     credentials: 'include',
//                 },
//                 // headers,
//             }),
//         ]),
//         cache: new InMemoryCache({
//             typePolicies: {
//                 Query: {
//                     fields: {
//                         // TODO: We will add this together!
//                         // allProducts: paginationField(),
//                     },
//                 },
//             },
//         }).restore({}),
//         //   }).restore(initialState || {}),
//     });
// };

// const MyApp = ({ Component, pageProps }: AppProps) => {
//     const apolloClient = createApolloClient();

//     return (
//         <ApolloProvider client={apolloClient}>
//             <ApolloHooksProvider client={apolloClient}>
//                 <Page>
//                     <Component {...pageProps} />
//                 </Page>
//             </ApolloHooksProvider>
//         </ApolloProvider>
//     );
// };


// export const getServerSideProps = async ({ Component, ctx }: MyAppProps) => {
//     let pageProps = {};

//     if (Component.getInitialProps) {
//         pageProps = await Component.getInitialProps(ctx);
//     }

//     if (ctx && ctx.req) {
//         // Do server-side logic here
//     }

//     return { props: { pageProps } };
// };

// export default MyApp;