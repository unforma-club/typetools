import type { NewGlyph, TypefaceMetrics } from "@unforma-club/typetools";
import { CSSProperties, useEffect, useMemo, useState } from "react";
import { useFonts } from "libs/context/ContextFonts";
import {
    ProviderGlyphs,
    useGlyphs,
    ConsumerGlyph,
} from "libs/context/ContextGlyphs";
import { GlyphsAside } from "./Glyphs/Aside";
import { useMeasure } from "libs/hooks";

interface useSVGMetricsProps extends TypefaceMetrics {
    width: number;
    height: number;
    advanceWidth: number;
}
const useSVGMetrics = (props: useSVGMetricsProps) => {
    const { width, height, advanceWidth, yMax, yMin, xMax, xMin, unitsPerEm } =
        props;

    const pixelRatio = window.devicePixelRatio;
    const parentWidth = width / pixelRatio;
    const parentHeight = height / pixelRatio;
    const maxHeight = yMax - yMin;
    const maxWidth = xMax - xMin;
    const glyphScale = Math.min(
        parentWidth / maxWidth,
        parentHeight / maxHeight
    );
    const glyphSize = glyphScale * unitsPerEm;
    const glyphBaseline = (parentHeight * yMax) / maxHeight;
    const glyphWidth = advanceWidth * glyphScale;
    const xmin = (parentWidth - glyphWidth) / 2; // Glyph position, divide by two mean horizontally centered from parent

    return {
        parentHeight,
        parentWidth,
        maxHeight,
        glyphSize,
        glyphBaseline,
        xmin,
        glyphScale,
    };
};

interface CellProps {
    glyph: NewGlyph;
    metrics: TypefaceMetrics;
    parentWidth: number;
}
const Cell = (props: CellProps) => {
    const { chooseGlyph, selectedGlyph } = useGlyphs();

    const { glyph, metrics, parentWidth: width } = props;

    const divide = 18;
    const newParentWidth = width / divide + 0.95;
    const newParentHeight = width / divide + 0.95;

    const { glyphBaseline, glyphSize, xmin, parentWidth, glyphScale } =
        useSVGMetrics({
            width: newParentWidth,
            height: newParentHeight,
            advanceWidth: glyph.glyph.advanceWidth,
            ...metrics,
        });

    // @ts-ignore
    const [hover, setHover] = useState(false);

    // Grid for glyph inspector
    // @ts-ignore
    const ypx = (val: number) => glyphBaseline - val * glyphScale;
    const isActive = glyph === selectedGlyph;
    return (
        <li
            onMouseEnter={() => {
                chooseGlyph(glyph);
                // setHover(true);
            }}
            style={{
                position: "relative",
                border: "1px solid",
                width: parentWidth,
                // height: parentHeight,
                overflow: "hidden",
                margin: "0 -1px -1px 0",
                // transform: `scale(${hover ? 2 : 1})`,
                zIndex: hover ? 10 : 1,
                fontSize: "inherit",
                display: "flex",
                flexDirection: "column",
                transition:
                    "background-color var(--main-transition), transform var(--main-transition), z-index var(--main-transition)",
            }}
        >
            <div
                style={{
                    borderBottom: "1px solid",
                    fontSize: "0.65em",
                    padding: "calc(var(--grid-gap) / 2)",
                    display: "block",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                }}
            >
                {glyph.name}
            </div>
            <div
                style={{
                    padding: "calc(var(--grid-gap) / 1)",
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
                        // border: "1px solid",
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
        </li>
    );
};

interface CustomUlProps {
    glyphs: Array<NewGlyph>;
}

const CustomUl = ({ glyphs }: CustomUlProps) => {
    const memoizedGlyphs = useMemo(() => glyphs, [glyphs]);
    const { selectedFont } = useFonts();

    const [ref, { width }] = useMeasure();

    return (
        <ul
            ref={ref}
            style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexWrap: "wrap",
                alignItems: "flex-start",
                position: "relative",
                width: "100%",
            }}
        >
            {memoizedGlyphs &&
                memoizedGlyphs.map((item, i) => (
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

const buttonStyle: CSSProperties = {
    appearance: "none",
    background: "none",
    border: "1px solid",
    borderRadius: "none",
    cursor: "pointer",
    height: "1.75em",
    minWidth: "1.75em",
    fontSize: "inherit",
    fontFamily: "inherit",
    marginLeft: -1,
};

const BSide = () => {
    const { selectedFont } = useFonts();
    const { glyphs, chooseGlyph } = useGlyphs();
    const [currentPage, setCurrentPage] = useState(1);
    // @ts-ignore
    const [postsPerPage, setPostsPerPage] = useState(108);

    const [search, setSearch] = useState("");
    const finalGlyphs = useMemo(() => {
        if (!search) return glyphs;
        const filtered = glyphs.filter((item) => {
            if (search.length === 1) {
                return item.name.startsWith(search);
            }
            return item.name.match(search);
        });
        return filtered.sort((a, b) => {
            if (a.name.length < b.name.length) return -1;
            if (a.name.length > b.name.length) return 1;
            return 0;
        });
    }, [search, glyphs]);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = finalGlyphs.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const getPageNumber = () => {
        let pageNumbers: Array<number> = [];
        for (
            let i = 1;
            i <= Math.ceil(finalGlyphs.length / postsPerPage);
            i++
        ) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedFont]);
    useEffect(() => {
        if (!search)
            return chooseGlyph(currentPosts.find((item) => item.name === "A")!);
        chooseGlyph(currentPosts[0]);
    }, [search]);
    useEffect(() => {
        if (currentPage === 1)
            return chooseGlyph(currentPosts.find((item) => item.name === "A")!);
        chooseGlyph(currentPosts[0]);
    }, [currentPage]);
    return (
        <div>
            <header
                style={{
                    marginBottom: -1,
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                }}
            >
                <div>
                    <input
                        type="text"
                        value={search}
                        placeholder="Search..."
                        onChange={(e) => setSearch(e.target.value)}
                        style={{
                            background: "none",
                            border: "1px solid",
                            height: "1.75em",
                            fontSize: "inherit",
                            fontFamily: "inherit",
                            padding: "0 var(--grid-gap)",
                            outline: "none",
                            width: "100%",
                        }}
                    />
                </div>

                <div>
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((prev) => (prev -= 1))}
                        style={{ ...buttonStyle }}
                    >
                        Prev
                    </button>
                    {getPageNumber().map((number) => (
                        <button
                            key={number}
                            onClick={() => paginate(number)}
                            style={{
                                ...buttonStyle,
                                backgroundColor:
                                    number === currentPage
                                        ? "var(--accents-3)"
                                        : "inherit",
                            }}
                        >
                            {number}
                        </button>
                    ))}
                    <button
                        disabled={currentPage === getPageNumber().length}
                        onClick={() => setCurrentPage((prev) => (prev += 1))}
                        style={{ ...buttonStyle }}
                    >
                        Next
                    </button>
                </div>
            </header>
            <CustomUl glyphs={currentPosts} />
        </div>
    );
};

export const AccordionGlyphs = () => {
    return (
        <ProviderGlyphs>
            <ConsumerGlyph>
                {({ selectedGlyph, glyphsLength, charLength }) =>
                    selectedGlyph && (
                        <>
                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "1fr 3fr",
                                    gap: "var(--grid-gap)",
                                    alignItems: "flex-start",
                                }}
                            >
                                <GlyphsAside
                                    glyph={selectedGlyph!}
                                    glyphsLength={glyphsLength}
                                    charsLength={charLength}
                                />
                                <BSide />
                            </div>
                        </>
                    )
                }
            </ConsumerGlyph>
        </ProviderGlyphs>
    );
};

export default AccordionGlyphs;
