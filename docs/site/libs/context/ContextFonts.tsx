import {
    Typetools,
    BaseTypeface,
    FileReaderOutput,
} from "@unforma-club/typetools";
import { FC } from "react";
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import dummyFonts from "libs/fonts.json";

interface ContextFontAttr {
    fonts: Array<BaseTypeface>;
    addFontFiles: (files: Array<FileReaderOutput>) => void;
    chooseFont: (fullName: string) => void;
    selectedFont: BaseTypeface;
}

const init: ContextFontAttr = {
    fonts: [],
    addFontFiles: () => ({}),
    chooseFont: () => ({}),
    // @ts-ignore
    selectedFont: {},
};

const ContextFont = createContext<ContextFontAttr>(init);
export const useFonts = () => useContext(ContextFont);

const readOpentype = async (files: FileReaderOutput[]) => {
    const tt = new Typetools();
    const baseTypeface = await tt.generateOpenType(files);
    const fontFace = await tt.generateFontface(baseTypeface);
    return fontFace;
};

export const ProviderFonts: FC = ({ children }) => {
    const unknownFonts = dummyFonts as unknown;
    const initFonts = unknownFonts as Array<BaseTypeface>;

    const [fonts, setFonts] = useState<Array<BaseTypeface>>(initFonts);
    const [selectedFont, setSelectedFont] = useState<BaseTypeface>(
        initFonts[0]
    );

    const generateInitFonts = (files: Array<FileReaderOutput>) => {
        readOpentype(files).then((res) => {
            setFonts(res);
            setSelectedFont(res[0]);
        });
    };

    const addFontFiles = (files: Array<FileReaderOutput>) => {
        readOpentype(files).then((res) => {
            const newFonts = res.sort(
                (a, b) => a.typefaceWeight - b.typefaceWeight
            );
            setFonts((prev) => [...prev, ...newFonts]);
            setSelectedFont(newFonts[0]);
        });
    };

    const chooseFont = useCallback(
        (fullName: string) => {
            const newSelected = fonts.find(
                (item) => item.typefaceFullName === fullName
            );
            setSelectedFont((prev) => {
                if (!newSelected) return prev;
                return newSelected;
            });
        },
        [fonts]
    );

    useEffect(() => {
        /**
         * Update `fonts state` once on the browser, so we have the `opentype` object.
         */
        const newFiles: Array<FileReaderOutput> = initFonts.map((item) => ({
            fileName: item.fileName,
            fileSize: item.fileSize,
            fileDestination: item.fileDestination,
            fileUrl: item.fileUrl,
            fileType: item.fileType,
        }));
        generateInitFonts(newFiles);
    }, []);

    return (
        <ContextFont.Provider
            value={{ fonts, addFontFiles, chooseFont, selectedFont }}
        >
            {children}
        </ContextFont.Provider>
    );
};
