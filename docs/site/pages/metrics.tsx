import { useState } from "react";
import NextHead from "next/head";
import { BaseTypeface } from "@unforma-club/typetools";
import { useFonts } from "libs/context/ContextFonts";
import { TextMetrics } from "components/TextMetrics";

interface MetricsListProps {
    font: BaseTypeface;
}

const MetricsList = ({}: MetricsListProps) => {
    const { selectedFont } = useFonts();
    const [fontSize, setFontSize] = useState(200);
    const [lineHeight, setLineHeight] = useState(1);

    if (!selectedFont) return <></>;
    return (
        <>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(5, 1fr)",
                    fontFeatureSettings: `"ss04", "tnum"`,
                }}
            >
                <label>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <span>Font Size</span>
                        <output>{fontSize}</output>
                    </div>
                    <input
                        type="range"
                        min={72}
                        max={200}
                        step={1}
                        value={fontSize}
                        onChange={(e) => setFontSize(e.target.valueAsNumber)}
                        style={{ width: "100%" }}
                    />
                </label>
                <label>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <span>Line Height</span>
                        <output>{lineHeight}</output>
                    </div>
                    <input
                        type="range"
                        min={0.8}
                        max={2}
                        step={0.1}
                        value={lineHeight}
                        onChange={(e) => setLineHeight(e.target.valueAsNumber)}
                        style={{ width: "100%" }}
                    />
                </label>
            </div>
            <ul
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    listStyle: "none",
                    padding: "var(--grid-gap)",
                    margin: 0,
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "100%",
                    gap: "var(--grid-gap)",
                }}
            >
                <TextMetrics
                    // font={selectedFont}
                    // metrics={selectedFont.typefaceMetrics}
                    use="hhea"
                    fontSize={fontSize}
                    lineHeight={lineHeight}
                />
                <TextMetrics
                    // font={selectedFont}
                    // metrics={selectedFont.typefaceMetrics}
                    use="win"
                    fontSize={fontSize}
                    lineHeight={lineHeight}
                />
                <TextMetrics
                    // font={selectedFont}
                    // metrics={selectedFont.typefaceMetrics}
                    use="typo"
                    fontSize={fontSize}
                    lineHeight={lineHeight}
                />
            </ul>
        </>
    );
};

export default function Page() {
    const { selectedFont } = useFonts();
    return (
        <>
            <NextHead>
                <title>Vertical Metrics</title>
            </NextHead>
            <main style={{ position: "relative", height: "100vh" }}>
                {selectedFont && <MetricsList font={selectedFont} />}
            </main>
        </>
    );
}
