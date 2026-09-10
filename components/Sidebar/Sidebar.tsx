"use client";

import clsx from "clsx";
import { useParams } from "next/navigation";
import css from "./Sidebar.module.css";
import Link from "next/link";
import { NOTE_TAGS } from "@/constants";

const Sidebar = () => {
  const { slug } = useParams<{ slug: string[] }>();
  const tag = slug?.[0];

  return (
    <ul className={css.menuList}>
      <li className={css.menuItem}>
        <Link
          href={`/notes/filter/all`}
          className={clsx(css.menuLink, tag === "all" && css.menuLinkActive)}
        >
          All notes
        </Link>
      </li>
      {NOTE_TAGS.map((noteTag) => (
        <li className={css.menuItem} key={noteTag}>
          <Link
            href={`/notes/filter/${noteTag}`}
            className={clsx(
              css.menuLink,
              tag === noteTag && css.menuLinkActive
            )}
          >
            {noteTag}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Sidebar;