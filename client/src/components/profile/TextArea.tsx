type Props = {
  title?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
};

const TextArea: React.FC<Props> = ({ title, placeholder, value, onChange, rows = 5 }) => {
  return (
    <div className="mb-3">
      {title && <label className="font-semibold">{title}</label>}
      <textarea
        className="textarea mt-2 text-sm textarea-sm border border-purple-400 focus:shadow-purple-600 w-full bg-white"
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default TextArea;
