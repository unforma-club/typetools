import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="en-US">
                <Head>
                    <link
                        rel="apple-touch-icon"
                        sizes="180x180"
                        href="image/icons/apple-touch-icon.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="32x32"
                        href="image/icons/favicon-32x32.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="16x16"
                        href="image/icons/favicon-16x16.png"
                    />
                    <link rel="manifest" href="image/icons/site.webmanifest" />
                    <link
                        rel="mask-icon"
                        href="image/icons/safari-pinned-tab.svg"
                        color="#5bbad5"
                    />
                    <link rel="shortcut icon" href="image/icons/favicon.ico" />
                    <meta name="msapplication-TileColor" content="#da532c" />
                    <meta
                        name="msapplication-config"
                        content="image/icons/browserconfig.xml"
                    />
                    <meta name="theme-color" content="#ffffff" />

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
