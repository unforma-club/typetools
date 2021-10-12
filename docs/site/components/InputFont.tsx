import styles from "./input-font.module.scss";
import { DragEvent, useEffect } from "react";
import { useRef, useState } from "react";
import { readInputFile } from "@unforma-club/typetools";
import { useFonts } from "libs/context/ContextFonts";

type DragEventProps = DragEvent<HTMLFormElement>;

export const InputFont = () => {
    const { addFontFiles } = useFonts();
    const refInput = useRef<HTMLInputElement>(null);
    const [isDragOver, setDragOver] = useState<boolean>(false);
    const [isDrop, setDrop] = useState<boolean>(false);

    const handleInput = async (fileList: FileList) => {
        setDrop(true);
        const arrFiles = Array.from(fileList);
        const newFileList = await readInputFile(arrFiles);
        addFontFiles(newFileList);
        setTimeout(() => {
            if (!refInput.current) return;
            refInput.current.value = "";
            setDrop(false);
        }, 1000);
    };

    const onDragOver = (e: DragEventProps) => e.preventDefault();
    const onDragEnter = (e: DragEventProps) => {
        e.preventDefault();
        setDragOver(true);
    };
    const onDragLeave = (e: DragEventProps) => {
        e.preventDefault();
        setDragOver(false);
    };
    const onDrop = (e: DragEventProps) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (!files) throw new Error("Font files must be defined");
        setDragOver(false);
        handleInput(files);
    };

    useEffect(() => {
        if (!refInput.current) return;
        const refCurent = refInput.current;
        return () => {
            refCurent.files = null;
        };
    }, []);

    return (
        <form
            data-drag={isDragOver}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            className={styles.container}
        >
            <label>
                <div>
                    {isDrop ? (
                        <>Reading Opentype...</>
                    ) : (
                        <>
                            Drop (.otf / .ttf)
                            <br /> or Click here...
                        </>
                    )}
                </div>
                <input
                    ref={refInput}
                    type="file"
                    multiple
                    accept=".otf, .ttf"
                    disabled={isDrop}
                    onChange={(e) => {
                        const files = e.target.files;
                        if (!files)
                            throw new Error("Font files must be defined");
                        handleInput(files);
                    }}
                />
            </label>
        </form>
    );
};
