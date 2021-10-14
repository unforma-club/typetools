import { Typetools, NewGlyph } from "@unforma-club/typetools";
import { createContext, FC, useContext, useEffect, useState } from "react";
import { useFonts } from "./ContextFonts";

interface ContextGlyphsAttr {
    glyphs: Array<NewGlyph>;
}

const init: ContextGlyphsAttr = {
    glyphs: [],
};

const ContextGlyphs = createContext<ContextGlyphsAttr>(init);
export const useGlyphs = () => useContext(ContextGlyphs);

export const ProviderGlyphs: FC = (props) => {
    const { children } = props;
    const { selectedFont } = useFonts();

    const [glyphs, setGlyphs] = useState<Array<NewGlyph>>([]);

    const readOpentype = async (url: string) => {
        const tt = new Typetools();
        const glyphs = await tt.generateGlyphs(url);
        setGlyphs(glyphs);
    };

    useEffect(() => {
        const fileUrl = selectedFont.fileUrl;
        readOpentype(fileUrl);
    }, [selectedFont]);
    return (
        <ContextGlyphs.Provider value={{ glyphs }}>
            {children}
        </ContextGlyphs.Provider>
    );
};
