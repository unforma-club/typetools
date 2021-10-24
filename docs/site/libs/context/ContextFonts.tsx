import type { FC } from "react";
import { createContext, useCallback, useContext, useState } from "react";
import nProgress from "nprogress";
import {
    Typetools,
    BaseTypeface,
    FileReaderOutput,
} from "@unforma-club/typetools";
import dummyFonts from "libs/fonts.json";

interface ContextFontAttr {
    fonts: Array<BaseTypeface>;
    addFontFiles: (files: Array<FileReaderOutput>) => void;
    chooseFont: (fullName: string) => void;
    selectedFont: BaseTypeface;
}
const unknownFonts = dummyFonts as unknown;
const initFonts = unknownFonts as Array<BaseTypeface>;

const sortedInitFonts = initFonts.sort((a, b) => {
    if (a.typefaceFullName < b.typefaceFullName) return 1;
    if (a.typefaceFullName > b.typefaceFullName) return -1;
    return 0;
});

const init: ContextFontAttr = {
    fonts: sortedInitFonts,
    selectedFont: sortedInitFonts[0],
    addFontFiles: () => ({}),
    chooseFont: () => ({}),
};

const readOpentype = async (files: FileReaderOutput[]) => {
    const tt = new Typetools();
    const baseTypeface = await tt.generateOpenType(files);
    const fontFace = await tt.generateFontface(baseTypeface);
    return fontFace;
};

const ContextFont = createContext<ContextFontAttr>(init);
export const useFonts = () => useContext(ContextFont);

export const ProviderFonts: FC = ({ children }) => {
    const [fonts, setFonts] = useState<Array<BaseTypeface>>(init.fonts);
    const [selectedFont, setSelectedFont] = useState<BaseTypeface>(
        init.selectedFont
    );

    const addFontFiles = (files: Array<FileReaderOutput>) => {
        readOpentype(files)
            .then((res) => {
                nProgress.start();
                return res;
            })
            .then((res) => {
                const newFonts = res.sort(
                    (a, b) => a.typefaceWeight - b.typefaceWeight
                );
                setFonts((prev) => [...prev, ...newFonts]);
                setSelectedFont(newFonts[0]);
            })
            .then(() => nProgress.done())
            .catch((err) => console.log(err));
    };

    const chooseFont = useCallback(
        (fullName: string) => {
            nProgress.start();
            const newSelected = fonts.find(
                (item) => item.typefaceFullName === fullName
            );
            setSelectedFont((prev) => {
                if (!newSelected) return prev;
                return newSelected;
            });
            nProgress.done();
        },
        [fonts]
    );

    return (
        <ContextFont.Provider
            value={{ fonts, addFontFiles, chooseFont, selectedFont }}
        >
            {children}
        </ContextFont.Provider>
    );
};
