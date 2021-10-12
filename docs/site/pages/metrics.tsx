import { useState } from "react";
import { BaseTypeface } from "@unforma-club/typetools";
import { useFonts } from "libs/context/ContextFonts";
import { TextMetrics } from "components/TextMetrics";
import { MainLayout } from "components/Layout";
import { Slider } from "components/Slider";

interface MetricsListProps {
    font: BaseTypeface;
}

const MetricsList = ({}: MetricsListProps) => {
    const { selectedFont } = useFonts();
    const [fontSize, setFontSize] = useState(180);
    const [lineHeight, setLineHeight] = useState(1.5);

    if (!selectedFont) return <></>;
    return (
        <>
            <ul
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    fontFeatureSettings: `"ss04", "tnum"`,
                    listStyle: "none",
                    gap: "var(--grid-gap)",
                    padding: "0 var(--grid-gap)",
                    margin: "0 0 var(--grid-gap) 0",
                }}
            >
                <li>
                    <Slider
                        label="Font Size"
                        min={90}
                        max={200}
                        step={1}
                        value={fontSize}
                        defaultValue={180}
                        onChange={(e) => setFontSize(e)}
                        onDoubleClick={(e) => setFontSize(e)}
                    />
                </li>
                <li>
                    <Slider
                        label="Line Height"
                        min={0.8}
                        max={3}
                        step={0.1}
                        value={lineHeight}
                        defaultValue={1.5}
                        onChange={(e) => setLineHeight(e)}
                        onDoubleClick={(e) => setLineHeight(e)}
                    />
                </li>
            </ul>
            <ul
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    listStyle: "none",
                    padding: "0 var(--grid-gap)",
                    margin: 0,
                    gap: "var(--grid-gap)",
                }}
            >
                <TextMetrics
                    use="hhea"
                    fontSize={fontSize}
                    lineHeight={lineHeight}
                />
                <TextMetrics
                    use="win"
                    fontSize={fontSize}
                    lineHeight={lineHeight}
                />
                <TextMetrics
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

    if (!selectedFont) {
        return (
            <MainLayout>
                <div className="not-found">Loading...</div>
            </MainLayout>
        );
    }
    return (
        <MainLayout title="Vertical Metrics">
            <MetricsList font={selectedFont} />
        </MainLayout>
    );
}
