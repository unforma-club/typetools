import { AccordionLayout, BaseAccordion } from "components/AccordionLayout";
import { useFonts } from "libs/context/ContextFonts";

export const AccordionGlyphs = (props: BaseAccordion) => {
    const { selectedFont } = useFonts();

    return (
        <AccordionLayout
            {...props}
            style={{
                position: "relative",
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                alignItems: "flex-start",
            }}
        >
            <div style={{ position: "sticky", top: "var(--header-height)" }}>
                Glyph Inspector
            </div>
            {selectedFont && (
                <ul
                    style={{
                        listStyle: "none",
                        padding: 0,
                        margin: 0,
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "start",
                        justifyContent: "start",
                        gap: "calc(var(--grid-gap) / 2)",
                        width: "100%",
                    }}
                >
                    {/* @ts-ignore */}
                    {selectedFont.characters
                        // .slice(0, 350)
                        // @ts-ignore
                        .map((item, i) => (
                            <li
                                key={i}
                                style={{
                                    aspectRatio: "1 / 1",
                                    width: "3em",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    border: "1px solid",
                                }}
                            >
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: item.character,
                                    }}
                                    data-name={item.name}
                                    style={{
                                        fontFamily:
                                            selectedFont.typefaceFullName,
                                        fontSize: "1.5em",
                                    }}
                                />
                            </li>
                        ))}
                </ul>
            )}
        </AccordionLayout>
    );
};
