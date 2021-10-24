import styles from "./accordion.module.scss";
import { CSSProperties, FC } from "react";
import { useMeasure, usePrevious } from "libs/hooks";
import { animated, useTransition } from "react-spring";

interface AccordionButtonProps {
    active: boolean;
    label: string;
    onClick: () => void;
    style?: CSSProperties;
}

export const AccordionButton: FC<AccordionButtonProps> = (props) => {
    const { label, onClick, active, style, children } = props;

    const previous = usePrevious(active);
    const [refButton, { height: heightButton }] = useMeasure();

    const transitions = useTransition(active, {
        from: { opacity: 0, y: -heightButton },
        enter: { opacity: 1, y: 0 },
        leave: { opacity: 0, y: heightButton },
        config: { mass: 5, tension: 2000, friction: 400 },
        delay: 300,
        reset: active && previous !== active,
    });

    return (
        <div ref={refButton} className={styles.navigation} data-active={active}>
            <div style={{ height: "100%" }}>
                <button
                    name={label}
                    title={label}
                    onClick={onClick}
                    className={styles.button}
                    data-active={active}
                    style={style}
                    disabled={active}
                >
                    <span data-active={active} className={styles.button_text}>
                        {label}
                    </span>
                </button>
            </div>

            {transitions(
                (styles, item) =>
                    item && (
                        <animated.div
                            style={{
                                height: "100%",
                                width: "100%",
                                display: "flex",
                                alignItems: "center",
                                ...styles,
                            }}
                        >
                            {children}
                        </animated.div>
                    )
            )}
        </div>
    );
};
