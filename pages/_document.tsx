// @ts-nocheck
import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

const MyDocument = () => {
    return (
        <Html lang="en-UK">
            <Head />
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
};

// myDocument.getInitialProps = async ({ renderPage }: DocumentContext) => {
//     const sheet = new ServerStyleSheet();
//     const page = await renderPage((App: React.ComponentType) => (props: any) =>
//         sheet.collectStyles(<App {...props} />)
//     );
//     const styleTags = sheet.getStyleElement();
//     return { ...page, styleTags };
// };

MyDocument.getInitialProps = async (ctx) => {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
        ctx.renderPage = () =>
            originalRenderPage({
                enhanceApp: (App) => (props) =>
                    sheet.collectStyles(<App {...props} />),
            });

        const initialProps = await Document.getInitialProps(ctx);
        return {
            ...initialProps,
            styles: (
                <>
                    {initialProps.styles}
                    {sheet.getStyleElement()}
                </>
            ),
        };
    } finally {
        sheet.seal();
    }
};


export default MyDocument;