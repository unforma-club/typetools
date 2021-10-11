import type { FileReaderOutput } from "./types/file";
import type {
    VariableAxes,
    VariableInstance,
    BaseTypeface,
    FontInfo,
} from "./types/typeface";
import { load, Font } from "opentype.js";
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

    private generateFullName(font: Font) {
        const fullName = font.names.fullName.en;
        const typefaceVariable = this.generateVariableFont(font);
        const italic = this.checkItalic(font);

        return typefaceVariable
            ? fullName.includes("Var" || "Variable")
                ? fullName
                : `${fullName} ${
                      italic && !fullName.includes("Italic" || "Ital")
                          ? "Italic Variable"
                          : "Variable"
                  }`
            : fullName;
    }

    private generateShortName(font: Font) {
        const fontFamily = this.generateFamily(font);
        const fullName = font.names.fullName.en;
        const afterReplace = fullName.replace(fontFamily, "");
        return afterReplace.length !== 0 ? afterReplace : "Regular";
    }

    private generateFontInfo(font: Font): FontInfo {
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

    private generateGlyphs(font: Font) {
        return (
            // @ts-ignore
            Object.values(font.glyphs.glyphs!)
                // @ts-ignore
                .filter((g) => g.unicode !== undefined)
                .map((glyph) => {
                    // @ts-ignore
                    const hasUnicode = glyph.unicode;
                    // @ts-ignore
                    const glyphIndex = glyph.index as number;
                    // @ts-ignore
                    const glyphName = glyph.name as string;
                    const cUnicode = `0x${(
                        "0000" + parseInt(hasUnicode).toString(16)
                    ).slice(-4)}`;

                    return {
                        character: hasUnicode
                            ? String.fromCharCode(hasUnicode)
                            : undefined,
                        unicode_dec: hasUnicode ? hasUnicode : undefined,
                        unicode: hasUnicode ? cUnicode : undefined,
                        html_code: hasUnicode ? `&#${hasUnicode};` : undefined,
                        glyph_id: glyphIndex,
                        name: glyphName,
                    };
                })
        );
    }

    /**
     * Method that will install `font` to the `DOM`, it use javascript font constructor.
     * @param typefaces
     * @returns
     */
    public generateFontface(typefaces: Array<BaseTypeface>) {
        return Promise.all(
            typefaces
                // .sort((a, b) => a.typefaceWeight - b.typefaceWeight)
                .map(async (typeface) => {
                    const newName = typeface.typefaceFullName;
                    const weight = typeface.typefaceWeight.toString();
                    const style =
                        typeface.typefaceStyle === "italic"
                            ? "italic"
                            : "normal";

                    const fontFace = new FontFace(
                        newName,
                        `url("${typeface.fileUrl}")`,
                        { weight, style }
                    );

                    try {
                        await fontFace.load();
                        document.fonts.add(fontFace);
                        console.log(
                            `%c>>> [new] ${typeface.typefaceFullName} - [${typeface.typefaceStyle}] - [${typeface.typefaceWeight}].`,
                            `color: #ff00ff;`
                        );
                    } catch (error) {}

                    return new Promise<BaseTypeface>((resolve) =>
                        resolve(typeface)
                    );
                })
        );
    }

    /**
     * This where magic happens
     * @param urls
     * @returns
     */
    public generateOpenType(urls: Array<FileReaderOutput>) {
        return Promise.all(
            urls.map(async (item) => {
                const font = await load(item.fileUrl);

                const typefaceVariable = this.generateVariableFont(font);
                const typefaceFamily = this.generateFamily(font);
                const typefaceFullName = this.generateFullName(font);
                const typefaceShortName = this.generateShortName(font);
                const typefaceFeatures = this.generateFontFeatures(font);
                const typefaceInfo = this.generateFontInfo(font);

                const typefaceStyle = this.checkItalic(font)
                    ? "italic"
                    : "roman";
                const typefaceWeight = font.tables.os2.usWeightClass;

                const typefaceTables = Object.keys(font.tables);

                const typefaceMetrics = {
                    unitsPerEm: font.unitsPerEm,
                    usWinAscent: font.tables.os2.usWinAscent,
                    usWinDescent: font.tables.os2.usWinDescent,
                    sTypoAscender: font.tables.os2.sTypoAscender,
                    sTypoDescender: font.tables.os2.sTypoDescender,
                    descender: font.tables.hhea.descender,
                    ascender: font.tables.hhea.ascender,
                    xHeight: font.tables.os2.sxHeight,
                    capHeight: font.tables.os2.sCapHeight,
                    baseLine: 0,
                };

                // @ts-ignore
                const glyphs = font.glyphs.glyphs;

                return new Promise<BaseTypeface>((resolve) => {
                    resolve({
                        ...item,
                        typefaceFamily,
                        typefaceSubFamily: "",
                        typefaceFullName,
                        typefaceShortName,
                        typefaceVariable,
                        typefaceStyle,
                        typefaceWeight,
                        typefaceFeatures,
                        typefaceInfo,
                        typefaceTables,
                        typefaceMetrics,
                        // @ts-ignore
                        characters: this.generateGlyphs(font),
                        glyphs,
                        tables: font.tables,
                    });
                });
            })
        );
    }
}
