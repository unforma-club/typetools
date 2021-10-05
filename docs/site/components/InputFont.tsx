import { ChangeEvent, useRef } from "react";
import { readInputFile } from "@unforma-club/typetools";
import { useFonts } from "libs/context/ContextFonts";

export const InputFont = () => {
    const { addFontFiles } = useFonts();
    const refInput = useRef<HTMLInputElement>(null);

    const onInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;
        if (files.length === 0) return;

        const arrFiles = Array.from(files);
        const fileList = await readInputFile(arrFiles);
        addFontFiles(fileList);
        setTimeout(() => {
            if (!refInput.current) return;
            refInput.current.value = "";
        }, 1000);
    };

    return (
        <form>
            <input
                ref={refInput}
                type="file"
                multiple
                accept=".otf, .ttf"
                onChange={onInputChange}
            />
        </form>
    );
};
