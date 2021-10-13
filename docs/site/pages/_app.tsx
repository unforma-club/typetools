import "styles/global.scss";
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
        </>
    );
}
