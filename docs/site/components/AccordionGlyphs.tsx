import { useMemo } from "react";
import { AccordionLayout, BaseAccordion } from "components/AccordionLayout";
import { useFonts } from "libs/context/ContextFonts";
import { useElementSize } from "libs/hooks";
import { TextMetrics } from "components/TextMetrics";
import { ProviderGlyphs, useGlyphs } from "libs/context/ContextGlyphs";

const CustomUl = () => {
    const {
        ref,
        bounds: { width },
    } = useElementSize();
    const { glyphs } = useGlyphs();
    const memoizedGlyphs = useMemo(() => glyphs, [glyphs]);

    const { selectedFont } = useFonts();

    const divide = 14;
    return (
        <ul
            // @ts-ignore
            ref={ref}
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
                memoizedGlyphs.slice(0, 80).map((item, i) => {
                    const { unitsPerEm } = selectedFont.typefaceMetrics;

                    const parentWidth = width / divide + 1;
                    const parentHeight = parentWidth;
                    const glyphWidth = parentWidth;
                    const glyphHeight = parentHeight;

                    const glyphScale = Math.min(
                        glyphWidth,
                        glyphHeight / (unitsPerEm * 2)
                    );

                    const glyphSize = glyphScale * unitsPerEm;
                    const glyphBaseline = parentHeight - parentHeight / 4.5;

                    const FG = item.glyph.advanceWidth * glyphScale;
                    const gW = glyphBaseline - parentHeight * glyphScale;
                    const xmin = (parentWidth - FG) / 2; // Glyph position, divide by two mean horizontally centered from parent

                    // Grid for glyph inspector
                    // const ypx = (val: number) =>
                    //     glyphBaseline - val * glyphScale;

                    return (
                        <li
                            key={i}
                            style={{
                                border: "1px solid",
                                width: parentWidth,
                                height: parentWidth,
                                overflow: "hidden",
                                margin: "0 -1px -1px 0",
                            }}
                        >
                            <svg
                                width={parentWidth}
                                height={parentWidth}
                                viewBox={`0 0 ${parentWidth} ${parentWidth}`}
                                fill="currentColor"
                                style={{ userSelect: "none" }}
                            >
                                {/* <line
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
                                /> */}

                                {/* <line
                                    x1={0}
                                    x2={parentWidth}
                                    y1={18}
                                    y2={18}
                                    stroke="var(--accents-3)"
                                    strokeWidth="1"
                                /> */}
                                <text
                                    fontSize="0.6em"
                                    fontFamily="var(--font-sans)"
                                    fill="var(--accents-8)"
                                    style={{
                                        fontFeatureSettings: `"ss04", "tnum"`,
                                    }}
                                >
                                    <tspan x="6" y="12">
                                        {item.name}
                                    </tspan>
                                </text>
                                <path
                                    fill="currentColor"
                                    d={item.glyph
                                        .getPath(xmin, gW, glyphSize)
                                        .toPathData(10)}
                                />
                            </svg>
                        </li>
                    );
                })}
        </ul>
    );
};

export const AccordionGlyphs = (props: BaseAccordion) => {
    const { selectedFont } = useFonts();

    return (
        <ProviderGlyphs>
            <AccordionLayout {...props}>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 2fr",
                        alignItems: "flex-start",
                        gap: "var(--grid-gap)",
                    }}
                >
                    <>
                        <div
                            style={{
                                position: "sticky",
                                top: "var(--header-height)",
                                border: "1px solid",
                                // borderRight: "1px solid",
                                // borderLeft: "1px solid",
                            }}
                        >
                            <TextMetrics
                                font={selectedFont}
                                fontSize={400}
                                lineHeight={1.5}
                                use="hhea"
                                text="H"
                            />
                        </div>
                        <CustomUl />
                    </>
                </div>
            </AccordionLayout>
        </ProviderGlyphs>
    );
};

export default AccordionGlyphs;
