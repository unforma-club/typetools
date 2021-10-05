import { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { ProviderFonts } from "libs/context/ContextFonts";
import { Aside } from "components/Aside";

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <ThemeProvider
                defaultTheme="system"
                disableTransitionOnChange
                themes={["light", "dark", "gray", "blue", "red"]}
            >
                <ProviderFonts>
                    <Aside />
                    <Component {...pageProps} />
                </ProviderFonts>
            </ThemeProvider>

            <style jsx global>{`
                #__next {
                    display: grid;
                    grid-template-columns: max-content 1fr;
                }
            `}</style>
        </>
    );
}
