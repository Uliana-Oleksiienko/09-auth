import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Note } from "../../types/note";
import css from "./NoteList.module.css";

import toast from "react-hot-toast";
import { useState } from "react";
import Link from "next/link";
import { deleteNote } from "@/lib/api/clientApi";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();
  const [deletingNoteId, setDeletingNoteId] = useState<string | null>(null);

  const { mutate: deleteMutate, isPending } = useMutation({
    mutationFn: (noteId: string) => deleteNote(noteId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
      toast.success("Note deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete note. Please try again");
    },
    onSettled: () => {
      setDeletingNoteId(null);
    },
  });

  const handleDelete = (noteId: string) => {
    setDeletingNoteId(noteId);
    deleteMutate(noteId);
  };

  return (
    <>
      <ul className={css.list}>
        {notes.map((note) => (
          <li className={css.listItem} key={note.id}>
            <h2 className={css.title}>{note.title}</h2>
            <p className={css.content}>{note.content}</p>
            <div className={css.footer}>
              <span className={css.tag}>{note.tag}</span>
              <Link href={`/notes/${note.id}`}>View details</Link>
              <button
                className={css.button}
                id={note.id}
                onClick={() => handleDelete(note.id)}
              >
                {isPending && deletingNoteId === note.id
                  ? "Deleting"
                  : "Delete"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}