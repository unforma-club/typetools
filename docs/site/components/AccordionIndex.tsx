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
                            wordBreak: "break-word",
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

    const infos: Array<InfoProps> = [
        { label: "Family", value: selectedFont.typefaceFamily },
        { label: "Full Name", value: selectedFont.typefaceFullName },
        { label: "File Name", value: selectedFont.fileName },
        { label: "File Type", value: selectedFont.fileType },
        {
            label: "File Size",
            value: `${Math.round(selectedFont.fileSize / 1000)} kb`,
        },
        { label: "Version", value: selectedFont.typefaceInfo.version },
        { label: "Style", value: selectedFont.typefaceStyle },
        { label: "Weight", value: selectedFont.typefaceWeight.toString() },
        {
            label: "Variable",
            value: selectedFont.typefaceVariable ? "Support" : "-",
        },
        { label: "Short Name", value: selectedFont.typefaceShortName },
        {
            label: "Features",
            value: selectedFont.typefaceFeatures
                .map((item) => item.tag)
                .join(", "),
        },
        { label: "Tables", value: selectedFont.typefaceTables.join(", ") },
        { label: "Designer", value: selectedFont.typefaceInfo.designer.value },
        {
            label: "Designer URL",
            value: selectedFont.typefaceInfo.designer.url,
        },
        {
            label: "Manufacturer",
            value: selectedFont.typefaceInfo.manufacturer.value,
        },
        {
            label: "Manufacturer URL",
            value: selectedFont.typefaceInfo.manufacturer.url,
        },
        { label: "License", value: selectedFont.typefaceInfo.license.value },
        { label: "License URL", value: selectedFont.typefaceInfo.license.url },
        { label: "Trademark", value: selectedFont.typefaceInfo.trademark },
        { label: "Copyright", value: selectedFont.typefaceInfo.copyright },
    ];
    return (
        <AccordionLayout {...props} navigation={<div>Navigation</div>}>
            <ul
                style={{
                    listStyle: "none",
                    padding: "calc(var(--grid-gap) * 2) 0",
                    margin: 0,
                    position: "relative",
                    display: "grid",
                    gridTemplateColumns: "repeat(6, 1fr)",
                    gap: "var(--grid-gap)",
                    alignItems: "flex-start",
                    // maxWidth: 1440,
                }}
            >
                {infos.map((item, i) => (
                    <Info key={i} {...item} />
                ))}
            </ul>
        </AccordionLayout>
    );
};
