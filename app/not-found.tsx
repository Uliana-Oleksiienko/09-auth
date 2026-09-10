import type { Metadata } from "next";
import css from "./page.module.css";
import { HOME_PAGE_URL, OG_IMAGE, SITE_NAME } from "@/constants";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Page Not Found | NoteHub",
  description:
    "The page you're looking for doesn't exist. Return to NoteHub to continue creating and managing your notes.",
  openGraph: {
    title: "404 — Page Not Found | NoteHub",
    description:
      "Oops! The page you tried to reach doesn't exist. Go back to NoteHub and keep your notes organized.",
    url: `${HOME_PAGE_URL}/404`,
    siteName: SITE_NAME,
    images: [OG_IMAGE],
  },
};

const NotFound = () => {
  return (
    <section className={`${css.container} ${css.notFound}`}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Image
        className={css.notFoundImg}
        src="/404-error.svg"
        alt="Not Found image"
        width={300}
        height={300}
        priority
      />
    </section>
  );
};

export default NotFound;