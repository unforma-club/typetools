import { NewGlyph } from "@unforma-club/typetools";
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

    const [glyphs, setGlyphs] = useState<Array<NewGlyph>>(selectedFont.glyphs);
    const [selectedGlyph, setSelectedGlyph] = useState<NewGlyph | null>(null);
    const [glyphsLength, setGlyphsLength] = useState(0);
    const [charLength, setCharLength] = useState(0);

    const chooseGlyph = useCallback(
        (glyph: NewGlyph | null) => {
            if (!glyph) return;
            setSelectedGlyph(glyph);
        },
        [glyphs]
    );

    useEffect(() => {
        const baseGlyphs = selectedFont.glyphs;
        setGlyphs(baseGlyphs);
        setSelectedGlyph(baseGlyphs.find((item) => item.name === "A")!);
        setGlyphsLength(baseGlyphs.length);
        setCharLength(() => baseGlyphs.filter((item) => item.character).length);
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
