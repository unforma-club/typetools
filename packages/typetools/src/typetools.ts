import { load, Font } from "opentype.js";
import { FileReaderOutput } from "./types/file";
import { VariableAxes, VariableInstance } from "./types/typeface";
import VariableTools from "./VariableTools";

export default class Typetools {
    private generateVariableFont(font: Font) {
        const variableFont = new VariableTools(font);
        const axes = variableFont.getAxes();
        const instances = variableFont.getInstances() as Array<any>;
        const newAxes: Array<VariableAxes> = [];

        if (axes) {
            axes.map((item: any) => {
                newAxes.push({
                    tag: item.tag,
                    name: item.name.en,
                    value: item.defaultValue,
                    defaultValue: item.defaultValue,
                    min: item.minValue,
                    max: item.maxValue,
                    step: item.maxValue <= 1 && item.maxValue >= -1 ? 0.01 : 1,
                });
            });
        }
        return newAxes.length !== 0
            ? {
                  axes: newAxes,
                  instances: instances.map((item) => ({
                      coordinates: item.coordinates,
                      name: item.name.en,
                  })) as Array<VariableInstance>,
              }
            : null;
    }

    private checkItalic(font: Font) {
        const italic = font.tables.post.italicAngle !== 0;
        return italic;
    }

    private generateFullName(font: Font) {
        const fullName = font.names.fullName.en;
        const typefaceVariable = this.generateVariableFont(font);
        const italic = this.checkItalic(font);

        return typefaceVariable
            ? fullName.includes("Variable")
                ? fullName
                : `${fullName} ${
                      italic && !fullName.includes("Italic" || "Ital")
                          ? "Italic Variable"
                          : "Variable"
                  }`
            : fullName;
    }

    private generateFamily(font: Font) {
        // @ts-ignore
        const typefaceFamily = font.names.preferredFamily
            ? // @ts-ignore
              font.names.preferredFamily.en
            : font.names.fontFamily.en;
        return typefaceFamily;
    }

    private generateFontFeatures(font: Font) {
        const fontFeatures: string[] = [];
        font.tables.gsub?.features.forEach((item: any) =>
            fontFeatures.push(item.tag)
        );

        const uniqueLayout: string[] = fontFeatures.reduce(
            (unique: string[], item: string) =>
                unique.includes(item) ? unique : [...unique, item],
            []
        );

        return uniqueLayout;
    }

    private generateFontInfo(font: Font) {
        const names = font.names;
        return {
            copyright: names.copyright ? names.copyright.en : "",
            trademark: names.trademark ? names.trademark.en : "",
            version: names.version ? names.version.en : "",
            designer: {
                value: names.designer ? names.designer.en : "",
                url: names.designerURL ? names.designerURL.en : "",
            },
            license: {
                value: names.license ? names.license.en : "",
                url: names.licenseURL ? names.licenseURL.en : "",
            },
            manufacturer: {
                value: names.manufacturer ? names.manufacturer.en : "",
                url: names.manufacturerURL ? names.manufacturerURL.en : "",
            },
        };
    }

    public generateFontface(typefaces: Array<any>) {
        return Promise.all(
            typefaces
                .sort((a, b) => a.typefaceWeight - b.typefaceWeight)
                .map(async (typeface) => {
                    const newName = typeface.typefaceFullName;

                    // @ts-ignore
                    const fontFace = new FontFace(
                        newName,
                        `url("${typeface.fileUrl}")`,
                        {
                            display: "block",
                            weight: typeface.typefaceWeight.toString(),
                            style:
                                typeface.typefaceStyle === "italic"
                                    ? "italic"
                                    : "normal",
                        }
                    );

                    try {
                        await fontFace.load();

                        // @ts-ignore
                        document.fonts.add(fontFace);
                        console.log(
                            `%c>>> [new] ${typeface.typefaceFullName} - ${typeface.typefaceStyle} - ${typeface.typefaceWeight}.`,
                            `color: #ff00ff;`
                        );
                    } catch (error) {}

                    return new Promise<any>((resolve) => resolve(typeface));
                })
        );
    }

    public generateOpenType(urls: Array<FileReaderOutput>) {
        return Promise.all(
            urls.map(async (item) => {
                const font = await load(item.fileUrl);

                const typefaceVariable = this.generateVariableFont(font);
                const typefaceFamily = this.generateFamily(font);
                const typefaceFullName = this.generateFullName(font);
                const typefaceFeatures = this.generateFontFeatures(font);
                const typefaceInfo = this.generateFontInfo(font);

                const typefaceStyle = this.checkItalic(font)
                    ? "italic"
                    : "roman";
                const typefaceWeight = font.tables.os2.usWeightClass;

                return new Promise((resolve) => {
                    resolve({
                        typefaceFamily,
                        typefaceFullName,
                        typefaceVariable,
                        typefaceStyle,
                        typefaceWeight,
                        typefaceFeatures,
                        typefaceInfo,
                        fileUrl: item.fileUrl,
                    });
                });
            })
        );
    }
}
