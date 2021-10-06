import {
    Typetools,
    BaseTypeface,
    FileReaderOutput,
} from "@unforma-club/typetools";
import {
    createContext,
    FC,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import { fonts as libFonts } from "libs/fonts";

interface ContextFontAttr {
    fonts: Array<BaseTypeface>;
    addFontFiles: (files: Array<FileReaderOutput>) => void;
    chooseFont: (fullName: string) => void;
    selectedFont: BaseTypeface | null;
}

const init: ContextFontAttr = {
    fonts: [],
    addFontFiles: () => ({}),
    chooseFont: () => ({}),
    selectedFont: null,
};

const ContextFont = createContext<ContextFontAttr>(init);
export const useFonts = () => useContext(ContextFont);
export const ProviderFonts: FC = ({ children }) => {
    const [fonts, setFonts] = useState<Array<BaseTypeface>>([]);
    const [selectedFont, setSelectedFont] = useState<BaseTypeface | null>(
        fonts.length !== 0 ? fonts[0] : null
    );

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
            setSelectedFont(newFonts[0]);
        });
    };

    const chooseFont = useCallback(
        (fullName: string) => {
            const sele = fonts.find(
                (item) => item.typefaceFullName === fullName
            );
            if (!sele) {
                setSelectedFont(null);
            } else {
                setSelectedFont(sele);
            }
        },
        [fonts]
    );

    useEffect(() => {
        readOpentype(libFonts).then((res) => {
            console.log(res);
            setFonts(res.sort((a, b) => a.typefaceWeight - b.typefaceWeight));
            setSelectedFont(res[0]);
        });
    }, []);
    return (
        <ContextFont.Provider
            value={{ fonts, addFontFiles, chooseFont, selectedFont }}
        >
            {children}
        </ContextFont.Provider>
    );
};
