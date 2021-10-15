import { Typetools, NewGlyph } from "@unforma-club/typetools";
import { useElementSize } from "libs/hooks";
import {
    createContext,
    FC,
    RefObject,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import { useFonts } from "./ContextFonts";

interface ContextGlyphsAttr {
    glyphs: Array<NewGlyph>;
    refParent: RefObject<HTMLElement>;
    parentWidth: number;
    selectedGlyph: NewGlyph | null;
    chooseGlyph: (glyph: NewGlyph | null) => void;
}

const init: ContextGlyphsAttr = {
    glyphs: [],
    parentWidth: 0,
    // @ts-ignore
    refParent: <div></div>,
};

const ContextGlyphs = createContext<ContextGlyphsAttr>(init);
export const useGlyphs = () => useContext(ContextGlyphs);
export const ConsumerGlyph = ContextGlyphs.Consumer;

export const ProviderGlyphs: FC = (props) => {
    const { children } = props;
    const { selectedFont } = useFonts();
    const {
        ref,
        bounds: { width },
    } = useElementSize();

    const [glyphs, setGlyphs] = useState<Array<NewGlyph>>([]);
    const [selectedGlyph, setSelectedGlyph] = useState<NewGlyph | null>(null);

    const readOpentype = async (url: string) => {
        const tt = new Typetools();
        const glyphs = await tt.generateGlyphs(url);
        setGlyphs(glyphs);
        setSelectedGlyph(glyphs.find((item) => item.name === "H")!);
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
        readOpentype(fileUrl);
    }, [selectedFont]);

    return (
        <ContextGlyphs.Provider
            value={{
                glyphs,
                refParent: ref,
                parentWidth: width,
                selectedGlyph,
                chooseGlyph,
            }}
        >
            {children}
        </ContextGlyphs.Provider>
    );
};
