import { FileReaderOutput } from "./file";
import { NewGlyph } from "../typetools";

export interface VariableAxes {
    defaultValue: number;
    max: number;
    min: number;
    name: string;
    step: number;
    tag: string;
    value: number;
}
export interface VariableInstance {
    coordinates: {
        [key: string]: string;
    };
    name: string;
}
export interface VariableFont {
    axes: Array<VariableAxes>;
    instances: Array<VariableInstance> | null;
}

export type FontStyle = "roman" | "italic";
export type FontFamily = string;
export type FontSubFamily = string;

interface FontInfoNesting {
    value: string;
    url: string;
}
export interface FontInfo {
    copyright: string;
    trademark: string;
    version: string;
    designer: FontInfoNesting;
    license: FontInfoNesting;
    manufacturer: FontInfoNesting;
}

export interface FontMedia {
    cover: Array<string>;
    speciment: {
        name: string;
        url: string;
    };
}

export interface FontAnatomy {
    ascender: number;
    baseline: number;
    capheight: number;
    descender: number;
    xheight: number;
}

export interface FontPrice {
    priceBase: number;
    priceCut: number;
}

export interface TypefaceMetrics {
    unitsPerEm: number;
    usWinAscent: any;
    usWinDescent: any;
    sTypoAscender: any;
    sTypoDescender: any;
    descender: any;
    ascender: any;
    xHeight: any;
    capHeight: any;
    baseLine: number;
    xMax: number;
    xMin: number;
    yMax: number;
    yMin: number;
}

interface TypefaceFeature {
    tag: string;
    features: Array<unknown>;
}

export interface BaseTypeface extends FileReaderOutput {
    typefaceFamily: FontFamily;
    typefaceSubFamily: FontSubFamily;
    typefaceFullName: string;
    typefaceShortName: string;
    typefaceStyle: FontStyle;
    typefaceWeight: number;
    typefaceFeatures: Array<TypefaceFeature>;
    typefaceVariable: VariableFont | null;
    typefaceInfo: FontInfo;
    typefaceTables: Array<string>;
    typefaceMetrics: TypefaceMetrics;
    glyphs: Array<NewGlyph>;
}

export interface Typeface extends BaseTypeface {
    typefaceAnatomy: FontAnatomy;
    typefacePrice: FontPrice;
    typefaceDefault: boolean;
    typefaceCategory: string;
    sampleText: string;
}
