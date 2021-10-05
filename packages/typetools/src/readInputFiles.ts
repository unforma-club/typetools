import { FileReaderOutput } from "./types/file";

export function readInputFile(files: Array<File>) {
    return Promise.all(
        files.map((file) => {
            const fileReader = new FileReader();
            return new Promise<FileReaderOutput>((resolve, reject) => {
                fileReader.onload = (e) => {
                    resolve({
                        fileName: file.name,
                        fileSize: file.size,
                        fileType: file.type,
                        fileUrl: e.target!.result!.toString(),
                        fileDestination: "",
                    });
                };
                fileReader.onerror = () =>
                    reject("Error while reading font file");
                fileReader.readAsDataURL(file);
            });
        })
    );
}
