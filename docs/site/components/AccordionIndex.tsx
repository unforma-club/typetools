import { useFonts } from "libs/context/ContextFonts";
import { AccordionLayout, BaseAccordion } from "./AccordionLayout";

const validURL = (str: string) => {
    const urlPattern =
        /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm;
    return !!urlPattern.exec(str);
};
interface InfoProps {
    label: string;
    value: string;
}

const Info = ({ label, value }: InfoProps) => {
    return (
        <li
            style={{
                display: "grid",
                // gridTemplateColumns: "10em 1fr",
                fontFeatureSettings: `"ss04", "tnum"`,
                fontFamily: "var(--font-sans)",
                fontSize: "0.8em",
            }}
        >
            <span style={{ fontSize: "0.8em", color: "var(--accents-8)" }}>
                {label}
            </span>
            <span
                style={{
                    fontSize: "1.3em",
                    lineHeight: 1.2,
                }}
            >
                {validURL(value) ? (
                    <a
                        href={value}
                        target="_blank"
                        rel="noopener noreferer"
                        style={{ textDecoration: "underline" }}
                    >
                        {value}
                    </a>
                ) : (
                    <p
                        style={{
                            color: validURL(value) ? "red" : "inherit",
                            margin: 0,
                            lineHeight: 1.2,
                            display: "-webkit-box",
                            overflow: "hidden",
                            WebkitLineClamp: 5,
                            WebkitBoxOrient: "vertical",
                            hyphens: "auto",
                            minHeight: "calc(var(--header-height) / 1.5)",
                        }}
                    >
                        {value ? value : "-"}
                    </p>
                )}
            </span>
        </li>
    );
};

export const AccordionIndex = (props: BaseAccordion) => {
    const { selectedFont } = useFonts();
    return (
        <AccordionLayout {...props} navigation={<div>Navigation</div>}>
            <ul
                style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    position: "relative",
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "var(--grid-gap)",
                    alignItems: "flex-start",
                    maxWidth: 1440,
                }}
            >
                <Info label="File Name" value={selectedFont.fileName} />
                <Info label="File Type" value={selectedFont.fileType} />
                <Info
                    label="File Size"
                    value={`${Math.round(selectedFont.fileSize / 1000)} kb`}
                />
                <Info
                    label="Version"
                    value={selectedFont.typefaceInfo.version}
                />
                <Info label="Family" value={selectedFont.typefaceFamily} />
                <Info label="Full Name" value={selectedFont.typefaceFullName} />
                <Info label="Style" value={selectedFont.typefaceStyle} />
                <Info
                    label="Weight"
                    value={selectedFont.typefaceWeight.toString()}
                />
                <Info
                    label="Font Variable"
                    value={selectedFont.typefaceVariable ? "Support" : "-"}
                />
                <Info
                    label="Font Features"
                    value={`${selectedFont.typefaceFeatures
                        .map((item) => item.tag)
                        .join(", ")}.`}
                />
                <Info
                    label="Font Tables"
                    value={`${selectedFont.typefaceTables.join(", ")}.`}
                />
                <Info
                    label="Font Tables"
                    value={selectedFont.typefaceShortName}
                />
                <Info
                    label="Designer"
                    value={selectedFont.typefaceInfo.designer.value}
                />
                <Info
                    label="Designer Url"
                    value={selectedFont.typefaceInfo.designer.url}
                />
                <Info
                    label="Manufacturer"
                    value={selectedFont.typefaceInfo.manufacturer.value}
                />
                <Info
                    label="Manufacturer Url"
                    value={selectedFont.typefaceInfo.manufacturer.url}
                />
                <Info
                    label="License"
                    value={selectedFont.typefaceInfo.license.value}
                />
                <Info
                    label="License Url"
                    value={selectedFont.typefaceInfo.license.url}
                />
                <Info
                    label="Trademark"
                    value={selectedFont.typefaceInfo.trademark}
                />
                <Info
                    label="Copyright"
                    value={selectedFont.typefaceInfo.copyright}
                />
            </ul>
        </AccordionLayout>
    );
};
