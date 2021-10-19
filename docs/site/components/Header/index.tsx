import styles from "./header.module.scss";
import NextDynamic from "next/dynamic";
import { SelectorFont } from "components/SelectorFont";
import { InputFont } from "components/InputFont";
import { SITE_DATA } from "libs/constants";

const SelectorTheme = NextDynamic(() => import("components/SelectorTheme"), {
    ssr: false,
});

export const Header = () => {
    return (
        <header className={styles.container}>
            <a
                href={SITE_DATA.author.url}
                target="_blank"
                rel="noopener"
                style={{
                    fontSize: "1em",
                    fontWeight: "bold",
                    fontFamily: "var(--font-display)",
                    fontFeatureSettings: `"ss01", "ss04"`,
                    lineHeight: 1,
                }}
            >
                {SITE_DATA.name} by <br />
                {SITE_DATA.author.name}
            </a>
            <div className={styles.selector}>
                <SelectorTheme />
                <SelectorFont />
                <InputFont />
            </div>
        </header>
    );
};
