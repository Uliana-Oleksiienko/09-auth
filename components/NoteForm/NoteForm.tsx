"use client";

import css from "./NoteForm.module.css";
import { useId, useState } from "react";
import type { NewNoteData } from "../../types/note";
import toast from "react-hot-toast";
import Loader from "../Loader/Loader";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { validateForm, validationSchema } from "./NoteForm-validation";
import { useRouter } from "next/navigation";
import { useNoteDraftStore } from "@/lib/store/noteStore";
import { createNote } from "@/lib/api/clientApi";
import { NOTE_TAGS } from "@/constants";

interface Errors {
  title?: string;
  content?: string;
  tag?: string;
}

const initialErrors: Errors = {
  title: "",
  content: "",
  tag: "",
};

export default function NoteForm() {
  const [formErrors, setFormErrors] = useState(initialErrors);

  const fieldId = useId();
  const queryClient = useQueryClient();
  const router = useRouter();
  const goBack = () => router.push("/notes/filter/all");

  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const { mutate, isPending } = useMutation({
    mutationFn: (newNote: NewNoteData) => createNote(newNote),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
      toast.success("Note created!");
      clearDraft();
      goBack();
    },
    onError() {
      toast.error("Failed to create note");
    },
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setDraft({ ...draft, [name]: value });

    const fieldSchema = { [name]: validationSchema[name as keyof NewNoteData] };
    const fieldErrors = validateForm({ [name]: value }, fieldSchema);
    setFormErrors((prev) => ({
      ...prev,
      [name]: fieldErrors[name as keyof NewNoteData] || "",
    }));
  };

  const handleSubmit = (formData: FormData) => {
    const values = Object.fromEntries(formData) as unknown as NewNoteData;
    const errors = validateForm(values, validationSchema);
    setFormErrors(errors as Errors);
    if (Object.keys(errors).length > 0) return;

    mutate(values);
  };

  return (
    <form className={css.form} action={handleSubmit}>
      <fieldset className={css.formGroup}>
        <label htmlFor={`${fieldId}-title`}>Title</label>
        <input
          id={`${fieldId}-title`}
          type="text"
          name="title"
          className={css.input}
          defaultValue={draft.title}
          onChange={handleChange}
        />
        {formErrors?.title && (
          <span className={css.error}>{formErrors.title}</span>
        )}
      </fieldset>
      <fieldset className={css.formGroup}>
        <label htmlFor={`${fieldId}-content`}>Content</label>
        <textarea
          id={`${fieldId}-content`}
          name="content"
          rows={8}
          className={css.textarea}
          defaultValue={draft.content}
          onChange={handleChange}
        />
        {formErrors?.content && (
          <span className={css.error}>{formErrors.content}</span>
        )}
      </fieldset>
      <fieldset className={css.formGroup}>
        <label htmlFor={`${fieldId}-tag`}>Tag</label>
        <select
          id={`${fieldId}-tag`}
          name="tag"
          className={css.select}
          defaultValue={draft.tag}
          onChange={handleChange}
        >
          {NOTE_TAGS.map((noteTag) => (
            <option key={noteTag} value={noteTag}>
              {noteTag}
            </option>
          ))}
        </select>
        {formErrors?.tag && <span className={css.error}>{formErrors.tag}</span>}
      </fieldset>
      <div className={css.actions}>
        <button type="button" className={css.cancelButton} onClick={goBack}>
          Cancel
        </button>
        <button type="submit" className={css.submitButton} disabled={isPending}>
          {isPending ? "Creating..." : "Create note"}
        </button>
        {isPending && <Loader isCreating />}
      </div>
    </form>
  );
}