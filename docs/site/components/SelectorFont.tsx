import styles from "./selector.module.scss";
import { useRef, useState } from "react";
import { useFonts } from "libs/context/ContextFonts";
import { useOnClickOutside } from "libs/hooks";

export const SelectorFont = () => {
    const { fonts, selectedFont, chooseFont } = useFonts();
    const [state, setState] = useState(false);

    const refContainer = useRef(null);
    useOnClickOutside(refContainer, () => setState(false));

    return (
        <div ref={refContainer} className={styles.container}>
            <button
                className={styles.toggle}
                onClick={() => setState((prev) => !prev)}
                data-active={state}
                style={{
                    width: "var(--aside-width)",
                    fontFeatureSettings: `"ss04", "tnum"`,
                }}
            >
                <span>{selectedFont?.typefaceFullName}</span>
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
            {state && fonts.length !== 0 && (
                <ul className={styles.dropdown}>
                    {fonts.map((item, i) => {
                        const familyName = item.typefaceFamily;
                        const fullName = item.typefaceFullName;

                        return (
                            <li key={i} className={styles.list}>
                                <button
                                    onClick={() =>
                                        chooseFont(item.typefaceFullName)
                                    }
                                    data-active={
                                        selectedFont?.typefaceFullName ===
                                        item.typefaceFullName
                                    }
                                >
                                    <span>{familyName}</span> -{" "}
                                    <span
                                        style={{
                                            fontFamily: item.typefaceFullName,
                                            fontStyle:
                                                item.typefaceStyle === "italic"
                                                    ? "italic"
                                                    : "normal",
                                        }}
                                    >
                                        {fullName.slice(familyName.length)}
                                    </span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};
