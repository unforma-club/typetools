import { Typetools, NewGlyph } from "@unforma-club/typetools";
import {
    createContext,
    FC,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import { useFonts } from "./ContextFonts";

interface ContextGlyphsAttr {
    glyphs: Array<NewGlyph>;
    selectedGlyph: NewGlyph | null;
    glyphsLength: number;
    charLength: number;
    chooseGlyph: (glyph: NewGlyph | null) => void;
}

// @ts-ignore
const init: ContextGlyphsAttr = {
    glyphs: [],
};

const ContextGlyphs = createContext<ContextGlyphsAttr>(init);
export const useGlyphs = () => useContext(ContextGlyphs);
export const ConsumerGlyph = ContextGlyphs.Consumer;

export const ProviderGlyphs: FC = (props) => {
    const { children } = props;
    const { selectedFont } = useFonts();

    const [glyphs, setGlyphs] = useState<Array<NewGlyph>>([]);
    const [selectedGlyph, setSelectedGlyph] = useState<NewGlyph | null>(null);
    const [glyphsLength, setGlyphsLength] = useState(0);
    const [charLength, setCharLength] = useState(0);

    const readOpentype = async (url: string) => {
        const tt = new Typetools();
        const glyphs = await tt.generateGlyphs(url);
        return glyphs;
    };

    const chooseGlyph = useCallback(
        (glyph: NewGlyph | null) => {
            if (!glyph) return;
            setSelectedGlyph(glyph);
        },
        [glyphs]
    );

    useEffect(() => {
        const fileUrl = selectedFont.fileUrl;
        readOpentype(fileUrl).then((glyphs) => {
            setGlyphs(glyphs);
            setSelectedGlyph(glyphs.find((item) => item.name === "A")!);
            setGlyphsLength(glyphs.length);
            setCharLength(() => glyphs.filter((item) => item.character).length);
        });
    }, [selectedFont]);

    return (
        <ContextGlyphs.Provider
            value={{
                glyphs,
                selectedGlyph,
                chooseGlyph,
                glyphsLength,
                charLength,
            }}
        >
            {children}
        </ContextGlyphs.Provider>
    );
};
