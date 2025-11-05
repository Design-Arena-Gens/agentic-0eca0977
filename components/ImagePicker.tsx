"use client";
import { useRef } from 'react';

export function ImagePicker({ onPick }: { onPick: (file: File, dataUrl: string) => void }) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      onPick(file, dataUrl);
    };
    reader.readAsDataURL(file);
  };
  return (
    <div>
      <input ref={inputRef} type="file" accept="image/*" onChange={onChange} className="hidden" />
      <button type="button" className="btn-primary" onClick={() => inputRef.current?.click()}>
        Choose Image
      </button>
    </div>
  );
}
