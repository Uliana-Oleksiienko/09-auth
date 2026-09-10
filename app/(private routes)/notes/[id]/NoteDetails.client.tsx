"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import css from "./page.module.css";
import Link from "next/link";
import { fetchNoteById } from "@/lib/api/clientApi";

const NoteDetailsClient = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !note) return <p>Something went wrong.</p>;

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleString();
  };

  const formattedDate = note.updatedAt
    ? `Updated at: ${formatDate(note.updatedAt)}`
    : `Created at: ${formatDate(note.createdAt)}`;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{formattedDate}</p>
        <Link href="/notes/filter/all">&#8701; View all notes</Link>
      </div>
    </div>
  );
};

export default NoteDetailsClient;