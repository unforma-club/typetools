import { FileReaderOutput } from "./file";

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

export interface Typeface extends FileReaderOutput {
    typefaceAnatomy: FontAnatomy;
    typefaceFamily: FontFamily;
    typefaceSubFamily: FontSubFamily;
    typefaceFullName: string;
    typefaceWeight: number;
    typefaceStyle: FontStyle;
    typefacePrice: FontPrice;
    typefaceFeatures: Array<string>;
    typefaceDefault: boolean;
    typefaceCategory: string;
    typefaceVariable: VariableFont | null;
    sampleText: string;
}
