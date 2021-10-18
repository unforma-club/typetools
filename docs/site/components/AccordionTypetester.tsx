import { generateAlphabet, VariableAxes } from "@unforma-club/typetools";
import { useFonts } from "libs/context/ContextFonts";
import { CSSProperties, useCallback, useEffect, useState } from "react";
import { AccordionLayout, BaseAccordion } from "./AccordionLayout";
import { Slider } from "./Slider";

export const AccordionTypetester = (props: BaseAccordion) => {
    const { selectedFont } = useFonts();

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
        <AccordionLayout
            {...props}
            navigation={
                <form
                    style={{
                        display: "flex",
                    }}
                >
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
                </form>
            }
        >
            {selectedFont && (
                <p
                    style={{
                        textAlign: "left",
                        margin: 0,
                        fontFamily: selectedFont.typefaceFullName,
                        maxWidth: 1200,
                        fontSize: "4em",
                        ...customFontStyle(),
                        transition:
                            "font-variation-settings var(--main-transition)",
                    }}
                >
                    {generateAlphabet()}
                </p>
            )}
        </AccordionLayout>
    );
};
