import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { U8Array } from "../../helpers";
import { useSaveStore } from "../../stores/saveStore";

const HEADER = [0x47, 0x56, 0x41, 0x53]; // GVAS

export const useFileUpload = ({ onLoad }: { onLoad?: () => void }) => {
  const fr = new FileReader();
  const { setSave, setName } = useSaveStore();

  fr.onloadend = () => {
    const data = fr.result;
    if (!data || typeof data === "string") return;

    const magic = new Uint8Array(data, 0, 4);

    if (!magic.every((v, i) => v === HEADER[i])) {
      alert("Invalid save file");
      return;
    }

    setSave(new U8Array(data));
    onLoad && onLoad();
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
    acceptedFiles.forEach((file) => {
      setName(file.name);
      fr.readAsArrayBuffer(file);
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      "application/octet-stream": [".sav"],
    },
  });

  return { getRootProps, getInputProps };
};
