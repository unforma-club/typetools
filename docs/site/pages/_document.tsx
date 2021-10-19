import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="en-US">
                <Head>
                    <link
                        rel="preload"
                        type="font/ttf"
                        as="font"
                        href="font/Space-Grotesk/SpaceGrotesk-VariableFont_wght.ttf"
                        crossOrigin=""
                    />
                    <link
                        rel="stylesheet"
                        type="text/css"
                        href="css/global.css"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
