import { useFonts } from "libs/context/ContextFonts";
import { CSSProperties, useEffect, useState } from "react";

interface TextMetricsProps {
    fontSize: number;
    lineHeight: number;
    use: "hhea" | "typo" | "win";
    style?: CSSProperties;
}

interface MetricsState {
    ascent: number;
    descent: number;
    unitsPerEm: number;
    capHeight: number;
    xHeight: number;
}

interface GuideBoxProps {
    origin: number;
    height: number;
    width: number;
    y: number;
    x: number;
}

const GuideBox = (props: GuideBoxProps) => {
    const { origin, height, width, y, x } = props;
    return (
        <span
            style={{
                position: "absolute",
                left: x,
                bottom: origin,
            }}
        >
            <span
                style={{
                    position: "absolute",
                    width,
                    height,
                    backgroundColor: "var(--accents-3)",
                    bottom: y,
                    transform: `translateY(${origin - 1}px)`,
                }}
            />
        </span>
    );
};

interface GuideHProps {
    y: number;
    label: string;
    origin: number;
}
const GuideH = ({ y, label, origin }: GuideHProps) => {
    return (
        <span
            style={{
                position: "absolute",
                width: "100%",
                height: "1px",
                backgroundColor: "currentColor",
                bottom: y,
                userSelect: "none",
            }}
        >
            <span
                style={{
                    fontSize: "0.6em",
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    bottom: 0,
                    padding: "0 var(--grid-gap)",
                    textTransform: "capitalize",
                    fontFeatureSettings: `"ss04", "tnum"`,
                }}
            >
                <span>{label}</span>
                <span>{origin}</span>
            </span>
        </span>
    );
};

export const TextMetrics = (props: TextMetricsProps) => {
    const { fontSize = 50, lineHeight = 1.3, use = "hhea", style } = props;
    const { selectedFont } = useFonts();

    const [metrics, setMetrics] = useState<MetricsState>({
        ascent: 0,
        descent: 0,
        unitsPerEm: 1000,
        capHeight: 0,
        xHeight: 0,
    });

    useEffect(() => {
        if (!selectedFont) return;
        if (use === "hhea") {
            setMetrics((prev) => ({
                ...prev,
                ascent: selectedFont.typefaceMetrics.ascender,
                descent: selectedFont.typefaceMetrics.descender,
            }));
        }
        if (use === "win") {
            setMetrics((prev) => ({
                ...prev,
                ascent: selectedFont.typefaceMetrics.usWinAscent,
                descent: selectedFont.typefaceMetrics.usWinDescent * -1,
            }));
        }
        if (use === "typo") {
            setMetrics((prev) => ({
                ...prev,
                ascent: selectedFont.typefaceMetrics.sTypoAscender,
                descent: selectedFont.typefaceMetrics.sTypoDescender,
            }));
        }
        setMetrics((prev) => ({
            ...prev,
            unitsPerEm: selectedFont.typefaceMetrics.unitsPerEm,
            capHeight: selectedFont.typefaceMetrics.capHeight,
            xHeight: selectedFont.typefaceMetrics.xHeight,
        }));
    }, [selectedFont, use]);

    if (!selectedFont) return <div>Loading...</div>;

    const { typefaceMetrics } = selectedFont;

    const lineHeightRatio = lineHeight;
    const capHeightRatio = metrics.capHeight / typefaceMetrics.unitsPerEm;
    const xHeightRatio = metrics.xHeight / typefaceMetrics.unitsPerEm;
    const ascenderRatio = metrics.ascent / typefaceMetrics.unitsPerEm;
    const descenderRatio = metrics.descent / typefaceMetrics.unitsPerEm;

    const baselineRatio = descenderRatio * -1;
    const boundingBoxRatio =
        (metrics.ascent + Math.abs(metrics.descent)) /
        typefaceMetrics.unitsPerEm;
    const lineGapRatio = lineHeightRatio - boundingBoxRatio;
    const originOffset = (lineGapRatio / 2) * fontSize;

    const baselineOffset = originOffset + baselineRatio * fontSize;
    const ascenderOffset = baselineOffset + ascenderRatio * fontSize;
    const capHeightOffset = baselineOffset + capHeightRatio * fontSize;
    const xHeightOffset = baselineOffset + xHeightRatio * fontSize;
    const descenderOffset = baselineOffset + descenderRatio * fontSize;

    return (
        <div style={{ position: "relative" }}>
            <div>{use}</div>
            <div
                style={{
                    position: "relative",
                    margin: "3em 0",
                }}
            >
                <GuideBox
                    origin={originOffset}
                    height={boundingBoxRatio * fontSize}
                    width={fontSize * 0.3}
                    y={originOffset}
                    x={fontSize * 0.3 + 2}
                />

                <GuideBox
                    origin={originOffset}
                    height={lineHeightRatio * fontSize}
                    width={fontSize * 0.3}
                    y={0}
                    x={0}
                />

                <div
                    style={{
                        ...style,
                        fontFamily: selectedFont.typefaceFullName,
                        fontSize,
                        lineHeight,
                        textAlign: "center",
                        position: "relative",
                    }}
                >
                    Hxfg
                </div>

                <GuideH
                    y={ascenderOffset}
                    label="ascender"
                    origin={
                        use === "hhea"
                            ? selectedFont.typefaceMetrics.ascender
                            : use === "win"
                            ? selectedFont.typefaceMetrics.usWinAscent
                            : selectedFont.typefaceMetrics.sTypoAscender
                    }
                />
                <GuideH
                    y={capHeightOffset}
                    label="cap height"
                    origin={selectedFont.typefaceMetrics.capHeight}
                />
                <GuideH
                    y={xHeightOffset}
                    label="x height"
                    origin={selectedFont.typefaceMetrics.xHeight}
                />
                <GuideH
                    y={baselineOffset}
                    label="baseline"
                    origin={selectedFont.typefaceMetrics.baseLine}
                />
                <GuideH
                    y={descenderOffset}
                    label="descender"
                    origin={
                        use === "hhea"
                            ? selectedFont.typefaceMetrics.descender
                            : use === "win"
                            ? selectedFont.typefaceMetrics.usWinDescent
                            : selectedFont.typefaceMetrics.sTypoDescender
                    }
                />
            </div>
            {/* <pre>{JSON.stringify(metrics, null, 2)}</pre> */}
        </div>
    );
};
