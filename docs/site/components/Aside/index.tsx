import styles from "./aside.module.scss";
import NextDynamic from "next/dynamic";
import { InputFont } from "components/InputFont";

const ThemeSelector = NextDynamic(() => import("components/ThemeSelector"), {
    ssr: false,
});

export const Aside = () => {
    return (
        <aside className={styles.container}>
            <div className={styles.sticky}>
                <ThemeSelector />
                <InputFont />
            </div>
        </aside>
    );
};
