import type { BaseTypeface } from "./types/typeface";
import { useState, useEffect } from "react";

type UseProps = "hhea" | "typo" | "win";

interface MetricsState {
    ascent: number;
    descent: number;
    unitsPerEm: number;
    capHeight: number;
    xHeight: number;
}

interface useMetricsProps {
    use: UseProps;
    font: BaseTypeface | null;
    fontSize: number;
    lineHeight: number;
}

export const useMetrics = ({
    font,
    use,
    fontSize,
    lineHeight,
}: useMetricsProps) => {
    const [metrics, setMetrics] = useState<MetricsState>({
        ascent: 0,
        descent: 0,
        unitsPerEm: 0,
        capHeight: 0,
        xHeight: 0,
    });
    useEffect(() => {
        if (!font) return;
        const { typefaceMetrics } = font;
        if (use === "hhea") {
            setMetrics((prev) => ({
                ...prev,
                ascent: typefaceMetrics.ascender,
                descent: typefaceMetrics.descender,
            }));
        }
        if (use === "win") {
            setMetrics((prev) => ({
                ...prev,
                ascent: typefaceMetrics.usWinAscent,
                descent: typefaceMetrics.usWinDescent * -1,
            }));
        }
        if (use === "typo") {
            setMetrics((prev) => ({
                ...prev,
                ascent: typefaceMetrics.sTypoAscender,
                descent: typefaceMetrics.sTypoDescender,
            }));
        }
        setMetrics((prev) => {
            return {
                ...prev,
                unitsPerEm: typefaceMetrics.unitsPerEm,
                capHeight: typefaceMetrics.capHeight,
                xHeight: typefaceMetrics.xHeight,
            };
        });
    }, [font, use]);

    // @ts-ignore
    const { typefaceMetrics } = font;

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

    return {
        baselineOffset,
        ascenderOffset,
        capHeightOffset,
        xHeightOffset,
        descenderOffset,
        lineHeightRatio,
        boundingBoxRatio,
        lineGapRatio,
        originOffset,
    };
};
