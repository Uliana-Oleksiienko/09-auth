"use client";
import css from "./NotePreview.module.css";
import Modal from "@/components/Modal/Modal";

import { fetchNoteById } from "@/lib/api";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function NotePreviewClient() {
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
  const router = useRouter();
  const closePreviewModal = () => {
    router.back();
  };

  return (
    <Modal onClose={closePreviewModal}>
      {
        <div className={css.container}>
          {isLoading && <p>Loading, please wait...</p>}
          {isError && !note && <p>Something went wrong.</p>}
          {isSuccess && (
            <div className={css.item}>
              <button className={css.backBtn} onClick={closePreviewModal}>
                Back
              </button>
              <div className={css.header}>
                <h2>{note.title}</h2>
              </div>
              <p className={css.content}>{note.content}</p>
              <p className={css.tag}>{note.tag}</p>
              <p className={css.date}>{note.createdAt}</p>
            </div>
          )}
        </div>
      }
    </Modal>
  );
}