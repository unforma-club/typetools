import { MainLayout } from "components/Layout";
import { useFonts } from "libs/context/ContextFonts";

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
        <MainLayout>
            <ul
                style={{
                    listStyle: "none",
                    padding: "0 var(--grid-gap)",
                    margin: 0,
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "calc(var(--grid-gap) / 2)",
                }}
            >
                {/* @ts-ignore */}
                {selectedFont.characters.map((item, i) => (
                    <li
                        key={i}
                        style={{
                            aspectRatio: "1/1",
                            width: "4em",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: "1px solid",
                            // margin: "0 -1px -1px 0",
                        }}
                    >
                        {/* <div>{item.name}</div> */}
                        <div
                            dangerouslySetInnerHTML={{ __html: item.character }}
                            data-name={item.name}
                            style={{
                                fontFamily: selectedFont.typefaceFullName,
                                fontSize: "1.5em",
                            }}
                        />
                    </li>
                ))}
            </ul>
        </MainLayout>
    );
}
