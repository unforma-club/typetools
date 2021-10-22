import "styles/global.scss";
import NextDynamic from "next/dynamic";
import { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { ProviderFonts } from "libs/context/ContextFonts";

const Birds = NextDynamic(() => import("components/Birds"), { ssr: false });

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <ThemeProvider
                defaultTheme="system"
                disableTransitionOnChange
                themes={["light", "dark", "gray"]}
            >
                <ProviderFonts>
                    <Component {...pageProps} />
                    <Birds />
                </ProviderFonts>
            </ThemeProvider>
        </>
    );
}
