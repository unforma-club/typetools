import { useFonts } from "libs/context/ContextFonts";

interface InfoProps {
    label: string;
    value: string;
}

const Info = ({ label, value }: InfoProps) => {
    return (
        <li
            style={{
                display: "grid",
                gridTemplateColumns: "10em 1fr",
                fontFeatureSettings: `"ss04", "tnum"`,
                fontFamily: "var(--font-sans)",
                fontSize: "0.8em",
            }}
        >
            <span>{label}</span>
            <span>{value ? value : "-"}</span>
        </li>
    );
};

export default function Page() {
    const { fonts } = useFonts();
    return (
        <main>
            {fonts.length !== 0 && (
                <ul
                    style={{
                        listStyle: "none",
                        padding: "var(--grid-gap)",
                        margin: 0,
                        display: "flex",
                        flexDirection: "column",
                        gap: "var(--grid-gap)",
                    }}
                >
                    {fonts.map((item, i) => (
                        <li
                            key={i}
                            style={{
                                border: "1px solid",
                                padding: "var(--grid-gap)",
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                alignItems: "center",
                            }}
                        >
                            <ul
                                style={{
                                    listStyle: "none",
                                    padding: 0,
                                    margin: 0,
                                }}
                            >
                                <Info
                                    label="Version"
                                    value={item.typefaceInfo.version}
                                />
                                <Info
                                    label="Designer"
                                    value={item.typefaceInfo.designer.value}
                                />
                                <Info
                                    label="Designer Url"
                                    value={item.typefaceInfo.designer.url}
                                />
                                <Info
                                    label="Manufacturer"
                                    value={item.typefaceInfo.manufacturer.value}
                                />
                                <Info
                                    label="Manufacturer Url"
                                    value={item.typefaceInfo.manufacturer.url}
                                />
                                <Info
                                    label="License"
                                    value={item.typefaceInfo.license.value}
                                />
                                <Info
                                    label="License Url"
                                    value={item.typefaceInfo.license.url}
                                />
                                <Info
                                    label="Trademark"
                                    value={item.typefaceInfo.trademark}
                                />
                                <Info
                                    label="Copyright"
                                    value={item.typefaceInfo.copyright}
                                />
                            </ul>
                            <div
                                style={{
                                    fontSize: "3em",
                                    fontFamily: item.typefaceFullName,
                                }}
                            >
                                {item.typefaceFamily} - {item.typefaceShortName}{" "}
                                - {item.typefaceWeight}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </main>
    );
}
