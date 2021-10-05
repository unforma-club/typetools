import { Typetools } from "@unforma-club/typetools";
import { fonts as libFonts } from "libs/fonts";
import { createContext, FC, useContext, useEffect, useState } from "react";

interface ContextFontAttr {
    fonts: Array<any>;
}

const init: ContextFontAttr = {
    fonts: [],
};

const ContextFont = createContext<ContextFontAttr>(init);
export const useFonts = () => useContext(ContextFont);
export const ProviderFonts: FC = ({ children }) => {
    const readOpentype = async () => {
        const tt = new Typetools();
        const mantep = await tt.generateOpenType(libFonts);
        const fontFace = await tt.generateFontface(mantep);
        return fontFace;
    };
    const [fonts, setFonts] = useState<unknown[]>([]);

    useEffect(() => {
        readOpentype().then((res) => setFonts(res));
    }, []);
    return (
        <ContextFont.Provider value={{ fonts }}>
            {children}
        </ContextFont.Provider>
    );
};
