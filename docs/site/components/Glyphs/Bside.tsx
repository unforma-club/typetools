import styles from "./glyph.module.scss";
import { TypefaceMetrics } from "@unforma-club/typetools";
import { NewGlyph } from "@unforma-club/typetools";
import { useFonts } from "libs/context/ContextFonts";
import { useGlyphs } from "libs/context/ContextGlyphs";
import { useMeasure } from "libs/hooks";
import { useSVGMetrics } from "libs/use-svg-metrics";
import { useMemo } from "react";

interface GlyphBsideProps {
    glyphs: Array<NewGlyph>;
}

interface CellProps {
    glyph: NewGlyph;
    metrics: TypefaceMetrics;
    parentWidth: number;
}
const Cell = (props: CellProps) => {
    const { chooseGlyph, selectedGlyph } = useGlyphs();

    const { glyph, metrics, parentWidth: width } = props;

    const divide = 20;
    // const newParentWidth = width / divide + 0.95;
    const newParentWidth = width / divide;
    // const newParentHeight = width / divide + 0.95;
    const newParentHeight = width / divide;

    const { glyphBaseline, glyphSize, xmin, glyphScale } = useSVGMetrics({
        width: newParentWidth,
        height: newParentHeight,
        advanceWidth: glyph.glyph.advanceWidth,
        ...metrics,
    });

    // Grid for glyph inspector
    // @ts-ignore
    const ypx = (val: number) => glyphBaseline - val * glyphScale;
    const isActive = glyph === selectedGlyph;
    return (
        <li
            onMouseEnter={() => chooseGlyph(glyph)}
            style={{
                position: "relative",
                border: "1px solid",
                // width: `calc(${parentWidth}px - calc(--var-grid-gap) * 1)`,
                overflow: "hidden",
                // margin: "0 -1px -1px 0",
                fontSize: "inherit",
                display: "flex",
                flexDirection: "column",
                transition:
                    "background-color var(--main-transition), transform var(--main-transition), z-index var(--main-transition)",
            }}
        >
            <div
                style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <svg
                    width="100%"
                    height="100%"
                    viewBox={`0 0 ${newParentWidth} ${newParentWidth}`}
                    fill="currentColor"
                    style={{
                        position: "relative",
                        userSelect: "none",
                        backgroundColor: isActive
                            ? "var(--accents-3)"
                            : "inherit",
                    }}
                >
                    <path
                        fill="currentColor"
                        d={glyph.glyph
                            .getPath(xmin, glyphBaseline, glyphSize)
                            .toPathData(10)}
                    />
                </svg>
            </div>
            <div
                style={{
                    borderTop: "1px solid",
                    padding:
                        "calc(var(--grid-gap) / 2) calc(var(--grid-gap) / 1)",
                }}
            >
                <span
                    style={{
                        fontSize: "0.65em",
                        display: "block",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                    }}
                >
                    {glyph.name}
                </span>
            </div>
        </li>
    );
};

export const GlyphBside = ({ glyphs }: GlyphBsideProps) => {
    const memoizedGlyphs = useMemo(() => glyphs, [glyphs]);
    const { selectedFont } = useFonts();

    const [ref, { width }] = useMeasure();
    return (
        <ul ref={ref} className={styles.bside}>
            {memoizedGlyphs &&
                memoizedGlyphs
                    .sort((a, b) => {
                        if (a.id < b.id) return -1;
                        if (a.id > b.id) return 1;
                        else return 0;
                    })
                    .map((item, i) => (
                        <Cell
                            key={i}
                            glyph={item}
                            metrics={selectedFont.typefaceMetrics}
                            parentWidth={width}
                        />
                    ))}
        </ul>
    );
};
