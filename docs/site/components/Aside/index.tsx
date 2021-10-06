import styles from "./aside.module.scss";
import NextDynamic from "next/dynamic";
import { InputFont } from "components/InputFont";
import { useFonts } from "libs/context/ContextFonts";
import NextLink from "next/link";
import { STATIC_LINKS } from "libs/static-links";

const ThemeSelector = NextDynamic(() => import("components/ThemeSelector"), {
    ssr: false,
});

export const Aside = () => {
    const { fonts, selectedFont, chooseFont } = useFonts();
    return (
        <aside className={styles.container}>
            <div className={styles.sticky}>
                <div>Typetools</div>
                <ul>
                    {STATIC_LINKS.map((item, i) => (
                        <li key={i}>
                            <NextLink href={item.href}>
                                <a>{item.label}</a>
                            </NextLink>
                        </li>
                    ))}
                </ul>
                <div>
                    <NextLink href="/">
                        <a>Overview</a>
                    </NextLink>
                    <NextLink href="/vertical-metrics">
                        <a>Vertical Metrics</a>
                    </NextLink>
                </div>
                <ThemeSelector />
                <InputFont />
                {fonts.length !== 0 && selectedFont && (
                    <select
                        value={selectedFont.typefaceFullName}
                        onChange={(e) => chooseFont(e.target.value)}
                    >
                        {fonts.map((item, i) => (
                            <option key={i} value={item.typefaceFullName}>
                                {item.typefaceFullName}
                            </option>
                        ))}
                    </select>
                )}
            </div>
        </aside>
    );
};
