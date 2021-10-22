import { generateAlphabet, VariableAxes } from "@unforma-club/typetools";
import { useFonts } from "libs/context/ContextFonts";
import { CSSProperties, useCallback, useEffect, useState } from "react";
import { AccordionButton } from "./AccordionButton";
import { AccordionLayout, BaseAccordion } from "./AccordionLayout";
import { Slider } from "./Slider";

const buttonStyle: CSSProperties = {
    appearance: "none",
    background: "none",
    border: "1px solid",
    fontSize: "0.8em",
    fontFamily: "inherit",
    height: "1.75em",
    cursor: "pointer",
};

export const AccordionTypetester = (props: BaseAccordion) => {
    const { selectedFont } = useFonts();
    const { typefaceFeatures } = selectedFont;

    const [fontSize, setFontSize] = useState(30);

    const [vf, setVf] = useState<Array<VariableAxes>>([]);

    const customFontStyle = useCallback(() => {
        if (!selectedFont) return {};
        const { typefaceWeight, typefaceStyle, typefaceFullName } =
            selectedFont;

        const baseStyle: CSSProperties = {
            fontFamily: `${typefaceFullName}, var(--font-sans)`,
            fontWeight: typefaceWeight,
            fontStyle: typefaceStyle === "italic" ? "italic" : "normal",
        };

        if (vf.length === 0) return baseStyle;
        const reduce = vf.reduce((p, c) => ({ ...p, [c.tag]: c.value }), {});
        const stringify = JSON.stringify(reduce).replace(/[{}:]/g, " ");
        return {
            fontFamily: baseStyle.fontFamily,
            fontStyle: baseStyle.fontStyle,
            fontVariationSettings: stringify,
        };
    }, [vf, selectedFont]);

    useEffect(() => {
        if (!selectedFont) {
            return setVf([]);
        }
        if (!selectedFont.typefaceVariable) {
            return setVf([]);
        }
        const newVF = selectedFont.typefaceVariable;
        setVf(newVF.axes);
    }, [selectedFont]);

    return (
        <>
            <AccordionButton
                active={props.isActive}
                label={props.label}
                onClick={props.onClick}
                style={{ ...props.buttonStyle }}
            >
                <div
                    style={{
                        display: "flex",
                        gap: "calc(var(--grid-gap) * 4)",
                        alignItems: "center",
                    }}
                >
                    <Slider
                        label="Size"
                        min={10}
                        max={200}
                        step={1}
                        value={fontSize}
                        defaultValue={30}
                        onChange={(e) => {
                            setFontSize(e);
                        }}
                        onDoubleClick={(e) => {
                            setFontSize(e);
                        }}
                    />

                    {vf.map((item, i) => (
                        <Slider
                            key={i}
                            label={item.name}
                            min={item.min}
                            max={item.max}
                            step={item.step}
                            value={item.value}
                            defaultValue={item.defaultValue}
                            onChange={(e) => {
                                setVf((prev) => {
                                    prev[i].value = e;
                                    return [...prev];
                                });
                            }}
                            onDoubleClick={(e) => {
                                setVf((prev) => {
                                    prev[i].value = e;
                                    return [...prev];
                                });
                            }}
                        />
                    ))}
                    {typefaceFeatures.length !== 0 && (
                        <ul
                            style={{
                                display: "flex",
                                flexWrap: "wrap",
                                listStyle: "none",
                                padding: 0,
                                margin: 0,
                                // gap: "var(--grid-gap)",
                            }}
                        >
                            {typefaceFeatures.map((item, i) => (
                                <li key={i}>
                                    <button
                                        onClick={(e) => e.preventDefault()}
                                        style={{ ...buttonStyle }}
                                    >
                                        {item.tag}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </AccordionButton>

            <AccordionLayout {...props}>
                <p
                    lang="en-US"
                    style={{
                        textAlign: "center",
                        margin: "0 auto",
                        maxWidth: 1440,
                        fontSize: fontSize,
                        height: "100%",
                        padding: "calc(var(--grid-gap) * 2)",
                        transition:
                            "font-variation-settings var(--main-transition)",
                        ...customFontStyle(),
                    }}
                >
                    {generateAlphabet()}
                </p>
            </AccordionLayout>
        </>
    );
};
