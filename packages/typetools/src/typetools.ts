import type { FileReaderOutput } from "./types/file";
import type {
    VariableAxes,
    VariableInstance,
    BaseTypeface,
    FontInfo,
} from "./types/typeface";
import { load, Font, Glyph } from "opentype.js";
import VariableTools from "./VariableTools";

export interface NewGlyph {
    id: number;
    name: string;
    unicode: string;
    html: string;
    character: string;
    glyph: Glyph;
}

interface Feature {
    featureParams: number;
    lookupListIndexes: Array<number>;
}

interface SubTable {
    coverage: {
        format: number;
        glyphs: Array<number>;
    };
    substFormat: number;
    substitute: Array<number>;
}

interface Lookup {
    lookupFlag: number;
    lookupType: number;
    markFilteringSet: unknown;
    subtables: Array<SubTable>;
}

interface GSUB {
    features: Array<{
        feature: Feature;
        tag: string;
    }>;
    lookups: Array<Lookup>;
    scripts: Array<unknown>;
}

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

    private generateItalic(font: Font) {
        const italic = this.checkItalic(font);
        return italic ? "italic" : "roman";
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

    public async generateGlyphs(url: string) {
        const font = await load(url);
        const initLength = font.glyphs.length;
        const glyphLength = Array(initLength).fill(0);

        return Promise.all(
            glyphLength.map((_i, i) => {
                const glyph = font.glyphs.get(i);
                const unicode = glyph.unicode;
                const newOBJ = {
                    id: glyph.index,
                    name: glyph.name,
                    unicode: unicode
                        ? `${("0000" + unicode.toString(16)).slice(-4)}`
                        : undefined,
                    html: unicode ? `&#${unicode};` : undefined,
                    character: unicode
                        ? String.fromCharCode(unicode)
                        : undefined,
                    glyph,
                };
                return new Promise<NewGlyph>((resolve) => {
                    resolve(newOBJ);
                });
            })
        );
    }

    public async getGSUB(url: string) {
        const font = await load(url);
        // @ts-ignore
        const mantep = font.tables["gsub"] as GSUB;
        return mantep;
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

                const typefaceStyle = this.generateItalic(font);
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
                    });
                });
            })
        );
    }
}
