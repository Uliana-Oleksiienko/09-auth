"use client";
import css from "./NoteDetails.module.css";
import { fetchNoteById } from "@/lib/api/api";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

export default function NoteDetailsClient() {
  const { id } = useParams<{ id: string }>();
  const {
    data: note,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });
  return (
    <div className={css.container}>
      {isLoading && <p>Loading, please wait...</p>}
      {isError && !note && <p>Something went wrong.</p>}
      {isSuccess && (
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>{note.createdAt}</p>
        </div>
      )}
    </div>
  );
}