import { useRef } from "react";

type Props = {
  id: string;
  accept?: string;
  onFile: (file: File | null) => void;
  button: React.ReactNode; // your styled button element
  disabled?: boolean;
};

const FileInputButton: React.FC<Props> = ({ id, accept, onFile, button, disabled }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const openPicker = () => {
    if (disabled) return;
    inputRef.current?.click();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    onFile(f);
  };

  return (
    <>
      <input
        id={id}
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={onChange}
        className="hidden"
      />
      <div onClick={openPicker} role="button" aria-controls={id}>
        {button}
      </div>
    </>
  );
};

export default FileInputButton;
