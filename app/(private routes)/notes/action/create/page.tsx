import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./page.module.css";
import { Metadata } from "next";
import { HOME_PAGE_URL, OG_IMAGE, SITE_NAME } from "@/constants";

export const metadata: Metadata = {
  title: "Create a new note | NoteHub",
  description:
    "Start organizing your thoughts with NoteHub — create a new personal note quickly and efficiently.",
  openGraph: {
    title: "Create a new note | NoteHub",
    description:
      "Start organizing your thoughts with NoteHub — create a new personal note quickly and efficiently.",
    url: `${HOME_PAGE_URL}/notes/action/create`,
    siteName: SITE_NAME,
    images: [OG_IMAGE],
  },
};

const CreateNote = () => {
  return (
    <section className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </section>
  );
};

export default CreateNote;