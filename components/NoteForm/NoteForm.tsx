"use client";
import css from "./NoteForm.module.css";
import { FormEvent, useId, useState } from "react";
import * as Yup from "yup";
import { createNote } from "../../lib/api/api";
import type { NoteFormData } from "../../types/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useNoteDraftStore } from "@/lib/store/noteStore";

const initialValues: NoteFormData = {
  title: "",
  content: "",
  tag: "Todo",
};
const NoteFormSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title is too long")
    .required("Name is required"),
  content: Yup.string().max(500, "Note is too long"),
  tag: Yup.mixed()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
    .required("Tag is required"),
});

export default function NoteForm() {
  const queryClient = useQueryClient();
  const fieldId = useId();
  const { draft, setDraft, clearDraft } = useNoteDraftStore();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: async (NoteFormData: NoteFormData) =>
      await createNote(NoteFormData),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["note"],
      });
      toast("Successfully submitted!");
      setErrors({});
      clearDraft();
      router.push("/notes/filter/all");
    },
    onError: () => toast("Sorry, something went wrong, please try again"),
  });
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setDraft({
      ...draft,
      [e.target.name]: e.target.value,
    });
    const { name, value } = e.target;
    const fieldSchema = Yup.reach(NoteFormSchema, name) as Yup.Schema<unknown>;
    fieldSchema
      .validate(value)
      .then(() => setErrors((prev) => ({ ...prev, [name]: "" })))
      .catch((err: Yup.ValidationError) => {
        setErrors((prev) => ({ ...prev, [name]: err.message }));
      });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await NoteFormSchema.validate(draft, { abortEarly: false });
      setErrors({});
      mutate(draft);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const newErrors: Record<string, string> = {};
        err.inner.forEach((e) => {
          if (e.path) newErrors[e.path] = e.message;
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit} action="#">
      <label htmlFor={`${fieldId}-title`}>Title</label>
      <input
        id={`${fieldId}-title`}
        type="text"
        name="title"
        className={css.input}
        value={draft.title || initialValues.title}
        onChange={handleChange}
      />
      {errors.title && <span className={css.error}>{errors.title}</span>}
      <label htmlFor={`${fieldId}-content`}>Content</label>
      <textarea
        id={`${fieldId}-content`}
        name="content"
        rows={8}
        value={draft.content || initialValues.content}
        onChange={handleChange}
        className={css.textarea}
      />
      {errors.content && <span className={css.error}>{errors.content}</span>}
      <label htmlFor={`${fieldId}-tag`}>Tag</label>
      <select
        id={`${fieldId}-tag`}
        name="tag"
        className={css.select}
        value={draft.tag || initialValues.tag}
        onChange={handleChange}
      >
        <option value="Todo">Todo</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Meeting">Meeting</option>
        <option value="Shopping">Shopping</option>
      </select>
      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={() => router.push("/notes/filter/all")}
        >
          Cancel
        </button>
        <button type="submit" className={css.submitButton} disabled={isPending}>
          {isPending ? "Creating..." : "Create note"}
        </button>
      </div>
    </form>
  );
}
