import { NOTE_TAGS } from "@/constants";
import { NewNoteData } from "@/types/note";

type Rule<T> = (value: T) => string | null;

type Schema<T> = {
  [K in keyof T]?: Rule<T[K]>[];
};

const rules = {
  required:
    (message: string): Rule<string> =>
    (value) =>
      value.trim() ? null : message,

  min:
    (length: number, message: string): Rule<string> =>
    (value) =>
      value.trim().length >= length ? null : message,

  max:
    (length: number, message: string): Rule<string> =>
    (value) =>
      value.trim().length <= length ? null : message,

  oneOf:
    <T extends readonly string[]>(
      options: T,
      message: string
    ): Rule<T[number]> =>
    (value) =>
      options.includes(value) ? null : message,
};

export const validationSchema: Schema<NewNoteData> = {
  title: [
    rules.required("Title is required"),
    rules.min(3, "Title must be at least 3 characters"),
    rules.max(50, "Title is too long"),
  ],
  content: [rules.max(500, "Content is too long")],
  tag: [
    rules.required("Tag is required"),
    rules.oneOf(NOTE_TAGS, "Invalid tag"),
  ],
};

export function validateForm<T extends NewNoteData>(
  data: Partial<T>,
  schema: Schema<T>
): Partial<Record<keyof T, string>> {
  const errors: Partial<Record<keyof T, string>> = {};

  (Object.keys(schema) as Array<keyof T>).forEach((key) => {
    const fieldRules = schema[key];
    const value = data[key];
    if (!fieldRules || value === undefined) return;

    for (const rule of fieldRules) {
      const error = rule(value);
      if (error) {
        errors[key] = error;
        break;
      }
    }
  });

  return errors;
}