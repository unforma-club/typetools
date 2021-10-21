import { CSSProperties, useCallback } from "react";
import { useEffect, useMemo, useState } from "react";
import { useFonts } from "libs/context/ContextFonts";
import { ProviderGlyphs, useGlyphs } from "libs/context/ContextGlyphs";
import { AccordionLayout, BaseAccordion } from "./AccordionLayout";
import { GlyphsAside } from "./Glyphs/Aside";
import { GlyphBside } from "./Glyphs/Bside";

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
    fontFeatureSettings: `"tnum"`,
};

const GlyphWrapper = (props: BaseAccordion) => {
    const { selectedFont } = useFonts();
    const { selectedGlyph, glyphsLength, charLength, glyphs, chooseGlyph } =
        useGlyphs();
    const [currentPage, setCurrentPage] = useState(1);
    // @ts-ignore
    // const [postsPerPage, setPostsPerPage] = useState(158);
    const [postsPerPage, setPostsPerPage] = useState(100);
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

    const getPageNumber = useCallback(() => {
        let pageNumbers: Array<number> = [];
        for (
            let i = 1;
            i <= Math.ceil(finalGlyphs.length / postsPerPage);
            i++
        ) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    }, [postsPerPage]);

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
        <AccordionLayout
            {...props}
            navigation={
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
                            onClick={() =>
                                setCurrentPage((prev) => (prev -= 1))
                            }
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
                            onClick={() =>
                                setCurrentPage((prev) => (prev += 1))
                            }
                            style={{ ...buttonStyle }}
                        >
                            Next
                        </button>
                    </div>
                </header>
            }
        >
            {selectedGlyph && (
                <div
                    style={{
                        padding: "calc(var(--grid-gap) * 2) 0",
                        display: "grid",
                        gridTemplateColumns: "1fr 2fr",
                        gap: "var(--grid-gap)",
                        alignItems: "flex-start",
                    }}
                >
                    <GlyphsAside
                        glyph={selectedGlyph}
                        glyphsLength={glyphsLength}
                        charsLength={charLength}
                    />
                    <GlyphBside glyphs={currentPosts} />
                </div>
            )}
        </AccordionLayout>
    );
};

export const AccordionGlyphs = (props: BaseAccordion) => {
    return (
        <ProviderGlyphs>
            <GlyphWrapper {...props} />
        </ProviderGlyphs>
    );
};

export default AccordionGlyphs;
