import styles from "./header.module.scss";
import { SelectorFont } from "components/SelectorFont";
import useScrollDirection from "libs/hooks/use-scroll-direction";

export const Header = () => {
    const { isLifting } = useScrollDirection(null, 1);
    return (
        <header data-lifting={isLifting} className={styles.container}>
            <div>
                <SelectorFont />
            </div>
        </header>
    );
};
