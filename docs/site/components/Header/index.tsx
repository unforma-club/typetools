import styles from "./header.module.scss";
import NextDynamic from "next/dynamic";
import { SelectorFont } from "components/SelectorFont";
import { InputFont } from "components/InputFont";

const SelectorTheme = NextDynamic(() => import("components/SelectorTheme"), {
    ssr: false,
});

export const Header = () => {
    return (
        <header className={styles.container}>
            <a
                href="https://unforma.club"
                target="_blank"
                rel="noopener"
                style={{
                    fontSize: "1em",
                    fontVariationSettings: `"wght" 500`,
                    fontFamily: "var(--font-display)",
                }}
            >
                Unforma®Club
            </a>
            <div className={styles.selector}>
                <SelectorTheme />
                <SelectorFont />
                <InputFont />
            </div>
        </header>
    );
};
