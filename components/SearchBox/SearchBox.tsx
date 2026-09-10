"use client";

import { useState } from "react";
import css from "./SearchBox.module.css";

interface SearchBoxProps {
  onChange: (value: string) => void;
  initialValue?: string;
}

export default function SearchBox({ onChange, initialValue = "" }: SearchBoxProps) {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      value={value}
      onChange={handleChange}
    />
  );
}