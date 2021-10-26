import styles from "./glyph.module.scss";
import { useMemo } from "react";
import { TypefaceMetrics, NewGlyph } from "@unforma-club/typetools";
import { useFonts } from "libs/context/ContextFonts";
import { useGlyphs } from "libs/context/ContextGlyphs";
import { GlyphPath } from "./GlyphPath";

interface GlyphBsideProps {
    glyphs: Array<NewGlyph>;
}

interface CellProps {
    glyph: NewGlyph;
    metrics: TypefaceMetrics;
}
const Cell = (props: CellProps) => {
    const { chooseGlyph, selectedGlyph } = useGlyphs();

    const { glyph } = props;

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
                    // height="100%"
                    viewBox={glyph.svg.viewBox}
                    fill="currentColor"
                    style={{
                        position: "relative",
                        userSelect: "none",
                        backgroundColor: isActive
                            ? "var(--accents-3)"
                            : "inherit",
                    }}
                >
                    {/* <g>
                        <GlyphGuideLine y={glyph.svg.ascender} />
                        <GlyphGuideLine y={glyph.svg.descender} />
                        <GlyphGuideLine y={glyph.svg.baseLine} />
                        <GlyphGuideLine y={glyph.svg.xHeight} />
                        <GlyphGuideLine y={glyph.svg.capHeight} />
                    </g> */}
                    <GlyphPath path={glyph.svg.path} />
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
    return (
        <ul className={styles.bside}>
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
                        />
                    ))}
        </ul>
    );
};
