import React, { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";

type InputBoxProps = {
  onSend: (text: string) => void;
  disabled?: boolean;
};

const InputBox: React.FC<InputBoxProps> = ({ onSend, disabled = false }) => {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (disabled || !value.trim()) return;
    onSend(value.trim());
    setValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-end gap-2 p-3 bg-white"
    >
      <textarea
        ref={textareaRef}
        rows={1}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={
          disabled ? "Select a conversation to start…" : "Type a message…"
        }
        disabled={disabled}
        className="flex-1 resize-none overflow-hidden rounded-md border px-3 py-2 outline-none disabled:bg-gray-100"
      />
      <button
        type="submit"
        disabled={disabled || !value.trim()}
        className="p-2 rounded-md bg-purple-600 text-white disabled:opacity-50"
        aria-label="Send message"
      >
        <Send size={18} />
      </button>
    </form>
  );
};

export default InputBox;
