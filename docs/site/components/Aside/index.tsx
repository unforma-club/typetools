import styles from "./aside.module.scss";
import NextDynamic from "next/dynamic";
import NextLink from "next/link";
import { STATIC_LINKS } from "libs/static-links";
import { InputFont } from "components/InputFont";
import { useRouter } from "next/router";

const ThemeSelector = NextDynamic(() => import("components/ThemeSelector"), {
    ssr: false,
});

export const Aside = () => {
    const { pathname } = useRouter();
    return (
        <aside className={styles.container}>
            <div className={styles.sticky}>
                <div
                    style={{
                        padding: "0 calc(var(--grid-gap) * 3)",
                        height: "var(--header-height)",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <span
                        style={{
                            // fontSize: "1.5em",
                            height: "1.75em",
                            // border: "1px solid",
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <a style={{ fontSize: "1.25em" }}>Typetools</a>
                    </span>
                </div>
                <ul
                    style={{
                        listStyle: "none",
                        padding: "0 calc(var(--grid-gap) * 3)",
                        margin: "2em 0",
                    }}
                >
                    {STATIC_LINKS.map((item, i) => (
                        <li key={i}>
                            <NextLink href={item.href}>
                                <a
                                    data-active={item.href === pathname}
                                    style={{
                                        display: "flex",
                                        height: "1.75em",
                                        fontWeight: 300,
                                        alignItems: "center",
                                        padding: "0 var(--grid-gap)",
                                        borderRadius:
                                            "calc(var(--grid-gap) / 2)",
                                        backgroundColor:
                                            item.href === pathname
                                                ? "var(--accents-2)"
                                                : "transparent",
                                    }}
                                >
                                    {item.label}
                                </a>
                            </NextLink>
                        </li>
                    ))}
                </ul>
                <ThemeSelector />
                <InputFont />
            </div>
        </aside>
    );
};
