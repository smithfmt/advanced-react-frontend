import { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";
import { DocumentContext } from 'next/document';

const myDocument = () => {
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

myDocument.getInitialProps = async ({ renderPage }: DocumentContext) => {
    const sheet = new ServerStyleSheet();
    const page = await renderPage((App: React.ComponentType) => (props: any) =>
        sheet.collectStyles(<App {...props} />)
    );
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
};

export default myDocument;