import { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { ProviderFonts } from "libs/context/ContextFonts";

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <ThemeProvider
                defaultTheme="system"
                disableTransitionOnChange
                themes={["light", "dark", "gray", "blue", "red"]}
            >
                <ProviderFonts>
                    <Component {...pageProps} />
                </ProviderFonts>
            </ThemeProvider>

            <style jsx global>{`
                :root {
                    --accordion-button-height: 5em;
                }

                * {
                    scroll-behavior: smooth;

                    overflow: -moz-scrollbars-none;
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                }

                *::-webkit-scrollbar {
                    width: 0px !important;
                    display: none;
                }

                body {
                    overscroll-behavior: auto none;
                }

                main {
                    position: relative;
                    min-height: 100vh;
                    background-color: inherit;
                    color: inherit;
                }

                pre {
                    white-space: pre-wrap;
                    font-size: 0.8em;
                    font-family: var(--font-monospace);
                }

                a {
                    color: currentColor;
                    text-decoration: none;
                }

                #__next {
                    background-color: inherit;
                    color: inherit;
                }

                [data-scrollbar="hide"] {
                    overflow: -moz-scrollbars-none;
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                }
                [data-scrollbar="hide"]::-webkit-scrollbar {
                    width: 0px !important;
                    display: none;
                }

                .marquee {
                    animation: marqueeText 10000ms infinite;
                }

                @keyframes marqueeText {
                    0% {
                        transform: translateX(0%);
                    }
                    100% {
                        transform: translateX(-100%);
                    }
                }

                @media screen and (min-width: 1921px) {
                    body {
                        font-size: 20px;
                    }
                }
            `}</style>
        </>
    );
}
