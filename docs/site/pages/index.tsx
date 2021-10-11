import { generateAlphabet, VariableAxes } from "@unforma-club/typetools";
import { MainLayout } from "components/Layout";
import { useFonts } from "libs/context/ContextFonts";
import { CSSProperties, useCallback, useEffect, useState } from "react";
import { TextMetrics } from "components/TextMetrics";
import { Slider } from "components/Slider";

interface InfoProps {
    label: string;
    value: string;
}

const Info = ({ label, value }: InfoProps) => {
    return (
        <li
            style={{
                display: "grid",
                gridTemplateColumns: "10em 1fr",
                fontFeatureSettings: `"ss04", "tnum"`,
                fontFamily: "var(--font-sans)",
                fontSize: "0.8em",
            }}
        >
            <span>{label}</span>
            <span>{value ? value : "-"}</span>
        </li>
    );
};

export default function Page() {
    const { selectedFont } = useFonts();
    const [vf, setVf] = useState<Array<VariableAxes>>([]);
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

    const customFontStyle = useCallback(() => {
        if (!selectedFont) return {};
        const { typefaceWeight, typefaceStyle, typefaceFullName } =
            selectedFont;

        const baseStyle: CSSProperties = {
            fontFamily: typefaceFullName,
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
    return (
        <MainLayout>
            {selectedFont && (
                <div>
                    <ul
                        style={{
                            listStyle: "none",
                            padding: "var(--grid-gap)",
                            margin: 0,
                        }}
                    >
                        <Info
                            label="Family"
                            value={selectedFont.typefaceFamily}
                        />
                        <Info
                            label="Full Name"
                            value={selectedFont.typefaceFullName}
                        />
                        <Info
                            label="Version"
                            value={selectedFont.typefaceInfo.version}
                        />
                        <Info
                            label="Designer"
                            value={selectedFont.typefaceInfo.designer.value}
                        />
                        <Info
                            label="Designer Url"
                            value={selectedFont.typefaceInfo.designer.url}
                        />
                        <Info
                            label="Manufacturer"
                            value={selectedFont.typefaceInfo.manufacturer.value}
                        />
                        <Info
                            label="Manufacturer Url"
                            value={selectedFont.typefaceInfo.manufacturer.url}
                        />
                        <Info
                            label="License"
                            value={selectedFont.typefaceInfo.license.value}
                        />
                        <Info
                            label="License Url"
                            value={selectedFont.typefaceInfo.license.url}
                        />
                        <Info
                            label="Trademark"
                            value={selectedFont.typefaceInfo.trademark}
                        />
                        <Info
                            label="Copyright"
                            value={selectedFont.typefaceInfo.copyright}
                        />
                    </ul>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(3, 1fr)",
                        }}
                    >
                        <TextMetrics
                            fontSize={180}
                            lineHeight={1.5}
                            use="hhea"
                        />
                        <TextMetrics
                            fontSize={180}
                            lineHeight={1.5}
                            use="win"
                        />
                        <TextMetrics
                            fontSize={180}
                            lineHeight={1.5}
                            use="typo"
                        />
                    </div>
                    {vf.length !== 0 && (
                        <form style={{ display: "flex" }}>
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
                    )}
                    <p
                        style={{
                            fontFamily: selectedFont.typefaceFullName,
                            fontSize: "4em",
                            ...customFontStyle(),
                            transition:
                                "font-variation-settings var(--main-transition)",
                        }}
                    >
                        {generateAlphabet()}
                    </p>
                </div>
            )}
        </MainLayout>
    );
}
