import css from "./CreateNote.module.css";
import NoteForm from "@/components/NoteForm/NoteForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NoteHub",
  description: "Creating Note",
  openGraph: {
    title: "NoteHub",
    description: "Creating Note",
    url: `https://notehub.com/action/create`,
    siteName: "NoteHub",
    images: [
      {
        url: "https://i.ibb.co/hRmh19Gt/Note-Hub-green.png",
        width: 1200,
        height: 630,
        alt: "NoteHub",
      },
    ],
    type: "article",
  },
};

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}