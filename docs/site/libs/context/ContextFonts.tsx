import {
    Typetools,
    BaseTypeface,
    FileReaderOutput,
} from "@unforma-club/typetools";
import { createContext, FC, useContext, useEffect, useState } from "react";
import { fonts as libFonts } from "libs/fonts";

interface ContextFontAttr {
    fonts: Array<BaseTypeface>;
    addFontFiles: (files: Array<FileReaderOutput>) => void;
}

const init: ContextFontAttr = {
    fonts: [],
    addFontFiles: () => ({}),
};

const ContextFont = createContext<ContextFontAttr>(init);
export const useFonts = () => useContext(ContextFont);
export const ProviderFonts: FC = ({ children }) => {
    const [fonts, setFonts] = useState<Array<BaseTypeface>>([]);

    const readOpentype = async (files: FileReaderOutput[]) => {
        const tt = new Typetools();
        const baseTypeface = await tt.generateOpenType(files);
        const fontFace = await tt.generateFontface(baseTypeface);
        return fontFace;
    };

    const addFontFiles = (files: Array<FileReaderOutput>) => {
        readOpentype(files).then((res) => {
            const newFonts = res.sort(
                (a, b) => a.typefaceWeight - b.typefaceWeight
            );
            setFonts((prev) => [...prev, ...newFonts]);
        });
    };

    useEffect(() => {
        readOpentype(libFonts).then((res) =>
            setFonts(res.sort((a, b) => a.typefaceWeight - b.typefaceWeight))
        );
    }, []);
    return (
        <ContextFont.Provider value={{ fonts, addFontFiles }}>
            {children}
        </ContextFont.Provider>
    );
};
