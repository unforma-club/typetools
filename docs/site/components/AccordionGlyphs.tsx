import type { NewGlyph } from "@unforma-club/typetools";
import { useMemo, useState } from "react";
import { AccordionLayout, BaseAccordion } from "components/AccordionLayout";
import { useFonts } from "libs/context/ContextFonts";
import { useElementSize } from "libs/hooks";
import {
    ProviderGlyphs,
    useGlyphs,
    ConsumerGlyph,
} from "libs/context/ContextGlyphs";

interface GlyphInspectorProps {
    glyph: NewGlyph;
}

const GlyphInspector = ({ glyph }: GlyphInspectorProps) => {
    const {
        selectedFont: {
            typefaceMetrics: {
                unitsPerEm,
                baseLine,
                capHeight,
                ascender,
                xHeight,
                descender,
                xMax,
                xMin,
                yMax,
                yMin,
            },
        },
    } = useFonts();

    const {
        ref,
        bounds: { width, height },
    } = useElementSize();

    const pixelRatio = window.devicePixelRatio;
    const parentWidth = width / pixelRatio;
    const parentHeight = height / pixelRatio;
    const maxHeight = yMax - yMin;

    const glyphScale = Math.min(
        parentWidth / (xMax - xMin),
        parentHeight / maxHeight
    );
    const glyphSize = glyphScale * unitsPerEm;

    const glyphBaseline = (parentHeight * yMax) / maxHeight;

    const glyphWidth = glyph.glyph.advanceWidth * glyphScale;
    const xmin = (parentWidth - glyphWidth) / 2; // Glyph position, divide by two mean horizontally centered from parent

    const ypx = (val: number) => glyphBaseline - val * glyphScale;

    return (
        <div
            style={{
                position: "sticky",
                top: "var(--header-height)",
            }}
        >
            <div
                // @ts-ignore
                ref={ref}
                style={{
                    border: "1px solid",
                    borderRadius: "var(--grid-gap)",
                    height: "calc(100vh - calc(var(--header-height) * 8))",
                    overflow: "hidden",
                }}
            >
                <svg
                    width={parentWidth}
                    height={parentHeight}
                    viewBox={`0 0 ${parentWidth} ${parentHeight}`}
                    fill="currentColor"
                    style={{ userSelect: "none" }}
                >
                    <line
                        x1={0}
                        x2={parentWidth}
                        y1={ypx(ascender)}
                        y2={ypx(ascender)}
                        stroke="var(--accents-3)"
                        strokeWidth="1"
                    />
                    <line
                        x1={0}
                        x2={parentWidth}
                        y1={ypx(capHeight)}
                        y2={ypx(capHeight)}
                        stroke="var(--accents-3)"
                        strokeWidth="1"
                    />
                    <line
                        x1={0}
                        x2={parentWidth}
                        y1={ypx(xHeight)}
                        y2={ypx(xHeight)}
                        stroke="var(--accents-3)"
                        strokeWidth="1"
                    />
                    <line
                        x1={0}
                        x2={parentWidth}
                        y1={ypx(baseLine)}
                        y2={ypx(baseLine)}
                        stroke="var(--accents-3)"
                        strokeWidth="1"
                    />
                    <line
                        x1={0}
                        x2={parentWidth}
                        y1={ypx(descender)}
                        y2={ypx(descender)}
                        stroke="var(--accents-3)"
                        strokeWidth="1"
                    />

                    <text
                        fontSize="0.6em"
                        fontFamily="var(--font-sans)"
                        fill="var(--accents-8)"
                        style={{
                            fontFeatureSettings: `"tnum"`,
                        }}
                    >
                        <tspan x="6" y="12">
                            {glyph.name}
                        </tspan>

                        <tspan x="6" y={ypx(baseLine)}>
                            Baseline
                        </tspan>
                        <tspan x="6" y={ypx(xHeight)}>
                            X Height
                        </tspan>
                        <tspan x="6" y={ypx(capHeight)}>
                            Cap Height
                        </tspan>
                        <tspan x="6" y={ypx(descender)}>
                            Descender
                        </tspan>
                        <tspan x="6" y={ypx(ascender)}>
                            Ascender
                        </tspan>
                    </text>
                    <path
                        fill="currentColor"
                        style={{ transition: "all var(--main-transition)" }}
                        d={glyph.glyph
                            .getPath(xmin, glyphBaseline, glyphSize)
                            .toPathData(10)}
                    />
                </svg>
            </div>
        </div>
    );
};

interface CellProps {
    glyph: NewGlyph;
    parentWidth: number;
    unitsPerEm: number;
    ascender: number;
    descender: number;
    capHeight: number;
    xHeight: number;
    baseLine: number;
}
const Cell = (props: CellProps) => {
    const { chooseGlyph, selectedGlyph } = useGlyphs();
    const { glyph, parentWidth: width, unitsPerEm } = props;

    // @ts-ignore
    const [hover, setHover] = useState(false);

    const pixelRatio = window.devicePixelRatio;

    const divide = 14;
    const parentWidth = width / pixelRatio / divide + 1;
    const parentHeight = parentWidth;
    const glyphWidth = parentWidth;
    const glyphHeight = parentHeight;

    const glyphScale = Math.min(glyphWidth, glyphHeight / (unitsPerEm * 2));

    const glyphSize = glyphScale * unitsPerEm;
    const glyphBaseline = parentHeight - parentHeight / 4.5;

    const FG = glyph.glyph.advanceWidth * glyphScale;
    // @ts-ignore
    const gW = glyphBaseline - parentHeight * glyphScale;
    const xmin = (parentWidth - FG) / 2; // Glyph position, divide by two mean horizontally centered from parent

    // Grid for glyph inspector
    // @ts-ignore
    const ypx = (val: number) => glyphBaseline - val * glyphScale;
    return (
        <li
            onMouseEnter={() => {
                chooseGlyph(glyph);
                // setHover(true);
            }}
            onMouseLeave={() => {
                chooseGlyph(null);
                // setHover(false);
            }}
            style={{
                border: "1px solid",
                width: parentWidth,
                height: parentWidth,
                overflow: "hidden",
                margin: "0 -1px -1px 0",
                backgroundColor:
                    glyph === selectedGlyph
                        ? "var(--geist-ufc-color)"
                        : "inherit",
                transform: `scale(${hover ? 2 : 1})`,
                zIndex: hover ? 10 : 1,
                transition:
                    "background-color var(--main-transition), transform var(--main-transition), z-index var(--main-transition)",
            }}
        >
            <svg
                width={parentWidth}
                height={parentWidth}
                viewBox={`0 0 ${parentWidth} ${parentWidth}`}
                fill="currentColor"
                style={{ userSelect: "none" }}
            >
                <text
                    fontSize="0.6em"
                    fontFamily="var(--font-sans)"
                    fill="var(--accents-8)"
                    style={{
                        fontFeatureSettings: `"ss04", "tnum"`,
                    }}
                >
                    <tspan x="6" y="12">
                        {glyph.name}
                    </tspan>
                </text>
                <path
                    fill="currentColor"
                    d={glyph.glyph
                        .getPath(xmin, glyphBaseline, glyphSize)
                        .toPathData(10)}
                />
            </svg>
        </li>
    );
};

const CustomUl = () => {
    const { glyphs, refParent, parentWidth } = useGlyphs();
    const memoizedGlyphs = useMemo(() => glyphs, [glyphs]);
    const { selectedFont } = useFonts();
    const { unitsPerEm, ascender, descender, capHeight, xHeight, baseLine } =
        selectedFont.typefaceMetrics;

    return (
        <ul
            // @ts-ignore
            ref={refParent}
            style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexWrap: "wrap",
                alignItems: "flex-start",
                width: "100%",
            }}
        >
            {memoizedGlyphs &&
                memoizedGlyphs
                    .slice(0, 80)
                    .map((item, i) => (
                        <Cell
                            key={i}
                            glyph={item}
                            parentWidth={parentWidth}
                            unitsPerEm={unitsPerEm}
                            ascender={ascender}
                            descender={descender}
                            capHeight={capHeight}
                            xHeight={xHeight}
                            baseLine={baseLine}
                        />
                    ))}
        </ul>
    );
};

export const AccordionGlyphs = (props: BaseAccordion) => {
    return (
        <ProviderGlyphs>
            <ConsumerGlyph>
                {({ selectedGlyph }) => (
                    <AccordionLayout {...props}>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 2fr",
                                alignItems: "flex-start",
                                gap: "var(--grid-gap)",
                            }}
                        >
                            {selectedGlyph ? (
                                <GlyphInspector glyph={selectedGlyph} />
                            ) : (
                                <div>Loading...</div>
                            )}
                            <CustomUl />
                        </div>
                    </AccordionLayout>
                )}
            </ConsumerGlyph>
        </ProviderGlyphs>
    );
};

export default AccordionGlyphs;
