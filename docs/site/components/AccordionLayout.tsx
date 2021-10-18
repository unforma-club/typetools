import styles from "./accordion.module.scss";
import type { CSSProperties, FC } from "react";
import { animated, useSpring, useTransition } from "react-spring";
import { useMeasure } from "libs/hooks";
import { AccordionButton } from "./AccordionButton";

export interface BaseAccordion {
    label: string;
    style?: CSSProperties;
    isActive: boolean;
    onClick: () => void;
}

export interface AccordionLayoutProps extends BaseAccordion {
    navigation: JSX.Element;
}

export const AccordionLayout: FC<AccordionLayoutProps> = (props) => {
    const { children, isActive, style, onClick, label, navigation } = props;
    const [ref, { height }] = useMeasure();

    const parent = useSpring({
        from: { height: 0, opacity: 0 },
        to: {
            height: isActive ? height : 0,
            opacity: isActive ? 1 : 0,
        },
        config: { mass: 3, tension: 2000, friction: 200 },
        reverse: !isActive,
    });

    const child = useSpring({
        from: { y: -(height / 8) },
        to: { y: isActive ? 0 : height },
        config: { mass: 5, tension: 2000, friction: 400 },
        reverse: !isActive,
    });

    const transitions = useTransition(isActive, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        reverse: isActive,
        config: { mass: 3, tension: 2000, friction: 200 },
    });

    return (
        <>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "calc(var(--grid-gap) * 8)",
                    position: "sticky",
                    top: 0,
                    zIndex: 1000,
                }}
            >
                <AccordionButton
                    active={isActive}
                    label={label}
                    onClick={onClick}
                />
                {transitions(
                    (styles, item) =>
                        item && (
                            <animated.div style={styles}>
                                {navigation}
                            </animated.div>
                        )
                )}
            </div>
            <animated.div
                data-active={isActive}
                className={styles.layout}
                style={{ ...parent }}
            >
                <animated.div
                    ref={ref}
                    style={{
                        minHeight:
                            "calc(100vh - calc(var(--header-height) * 6))",
                        position: "relative",
                        ...style,
                        ...child,
                    }}
                >
                    {children}
                </animated.div>
            </animated.div>
        </>
    );
};
