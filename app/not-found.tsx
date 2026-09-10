import { Metadata } from "next";
import css from "./page.module.css";
export const metadata: Metadata = {
  title: "NoteHub",
  description: "Page does not exist",
  openGraph: {
    title: "NoteHub",
    description: "Page does not exist",
    url: `https://notehub.com/not-found`,
    siteName: "NoteHub",
    images: [
      {
        url: "https://i.ibb.co/hRmh19Gt/Note-Hub-green.png",
        width: 1200,
        height: 630,
        alt: "NoteHub Not Found",
      },
    ],
    type: "article",
  },
};
export default function NotFound() {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </>
  );
}