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
    buttonStyle?: CSSProperties;
}

export interface AccordionLayoutProps extends BaseAccordion {
    navigation: JSX.Element;
}

export const AccordionLayout: FC<AccordionLayoutProps> = (props) => {
    const {
        children,
        isActive,
        style,
        onClick,
        label,
        navigation,
        buttonStyle,
    } = props;
    const [refContent, { height: heightContent }] = useMeasure();
    const [refButton, { height: heightButton }] = useMeasure();

    const parent = useSpring({
        from: { height: 0, opacity: 0, y: -heightButton },
        to: {
            height: isActive ? heightContent : 0,
            opacity: isActive ? 1 : 0,
            y: isActive ? 0 : -heightButton,
        },
        config: { mass: 3, tension: 2000, friction: 200 },
        reverse: !isActive,
    });

    const child = useSpring({
        from: { y: -(heightContent / 8) },
        to: { y: isActive ? 0 : heightContent },
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
                    alignItems: "flex-end",
                    gap: "calc(var(--grid-gap) * 8)",
                    position: "sticky",
                    top: 0,
                    zIndex: 1000,
                    overflow: "hidden",
                    height: "var(--header-height)",
                }}
            >
                <AccordionButton
                    ref={refButton}
                    active={isActive}
                    label={label}
                    onClick={onClick}
                    style={buttonStyle}
                />
                {transitions(
                    (styles, item) =>
                        item && (
                            <animated.div
                                style={{
                                    padding: "calc(var(--grid-gap) * 1.25) 0",
                                    ...styles,
                                }}
                            >
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
                    ref={refContent}
                    style={{
                        minHeight:
                            "calc(100vh - calc(var(--header-height) * 6) - 1px)",
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
