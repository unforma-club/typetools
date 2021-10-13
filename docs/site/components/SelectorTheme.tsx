import styles from "./selector.module.scss";
import { useOnClickOutside } from "libs/hooks";
import { useRef, useState } from "react";
import { useTheme } from "next-themes";

export const SelectorTheme = () => {
    const [state, setState] = useState(false);

    const refContainer = useRef(null);
    useOnClickOutside(refContainer, () => setState(false));

    const { themes, theme, setTheme } = useTheme();

    return (
        <div ref={refContainer} className={styles.container}>
            <button
                className={styles.toggle}
                onClick={() => setState((prev) => !prev)}
                data-active={state}
                style={{ width: "6em" }}
            >
                <span style={{ textTransform: "capitalize" }}>{theme}</span>
                <span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="1.25em"
                        height="1.25em"
                        fill="currentColor"
                    >
                        <path d="M0 0h24v24H0V0z" fill="none" />
                        <path d="M12 5.83l2.46 2.46c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L12.7 3.7c-.39-.39-1.02-.39-1.41 0L8.12 6.88c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 5.83zm0 12.34l-2.46-2.46c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l3.17 3.18c.39.39 1.02.39 1.41 0l3.17-3.17c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0L12 18.17z" />
                    </svg>
                </span>
            </button>
            {state && (
                <ul className={styles.dropdown}>
                    {themes.map((item, i) => {
                        return (
                            <li key={i} className={styles.list}>
                                <button
                                    onClick={() => setTheme(item)}
                                    data-active={item === theme}
                                    style={{ textTransform: "capitalize" }}
                                >
                                    {item}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default SelectorTheme;
