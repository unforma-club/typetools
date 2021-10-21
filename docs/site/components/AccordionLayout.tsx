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
        opacity: isActive ? 1 : 0,
        height: isActive ? heightContent : 0,
        y: isActive ? 0 : -heightButton,
        config: { mass: 3, tension: 2000, friction: 200 },
    });

    const child = useSpring({
        y: isActive ? 0 : -(heightContent / 8),
        config: { mass: 5, tension: 1500, friction: 400 },
        delay: 100,
    });

    const transitions = useTransition(isActive, {
        from: { opacity: 0, y: -heightButton },
        enter: { opacity: 1, y: 0 },
        leave: { opacity: 0, y: heightButton },
        config: { mass: 5, tension: 2000, friction: 400 },
        delay: 400,
    });

    return (
        <>
            <div className={styles.navigation}>
                <AccordionButton
                    ref={refButton}
                    active={isActive}
                    label={label}
                    onClick={onClick}
                    style={{ ...buttonStyle }}
                />
                {transitions(
                    (styles, item) =>
                        item && (
                            <animated.div
                                style={{
                                    padding: "calc(var(--grid-gap) * 1.75) 0",
                                    // borderBottom: "1px solid",
                                    height: "100%",
                                    // overflow: "hidden",
                                    display: "flex",
                                    alignItems: "flex-end",
                                    // backgroundColor: "maroon",
                                    width: "100%",
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
                            "calc(100vh - calc(var(--header-height) * 6) - 0px)",
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
