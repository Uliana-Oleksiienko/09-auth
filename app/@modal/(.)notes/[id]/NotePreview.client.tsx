"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import css from "./page.module.css";
import Modal from "@/components/Modal/Modal";
import { fetchNoteById } from "@/lib/api/clientApi";

const NotePreviewClient = () => {
  const router = useRouter();

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

  const handlePreviewClose = () => router.back();

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !note) return <p>Something went wrong.</p>;

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleString();
  };

  const formattedDate = note.updatedAt
    ? `Updated at: ${formatDate(note.updatedAt)}`
    : `Created at: ${formatDate(note.createdAt)}`;

  return (
    <Modal isOpen={!!note} onClose={handlePreviewClose}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>{formattedDate}</p>
        </div>
        <button onClick={handlePreviewClose} className={css.backBtn}>
          Go back
        </button>
      </div>
    </Modal>
  );
};

export default NotePreviewClient;