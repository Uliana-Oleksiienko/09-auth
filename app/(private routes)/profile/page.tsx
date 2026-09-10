import Link from "next/link";
import css from "./page.module.css";
import Image from "next/image";
import { Metadata } from "next";
import { HOME_PAGE_URL, OG_IMAGE, SITE_NAME } from "@/constants";
import { getMe } from "@/lib/api/serverApi";

export const metadata: Metadata = {
  title: "User Profile | NoteHub",
  description:
    "Manage your personal information, update your details, and customize your NoteHub experience. Keep your profile organized and up to date.",
  openGraph: {
    title: "User Profile | NoteHub",
    description:
      "View and edit your personal profile on NoteHub. Stay organized and manage your account easily.",
    url: `${HOME_PAGE_URL}/profile`,
    siteName: SITE_NAME,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "User Profile | NoteHub",
    description:
      "Access and edit your personal profile on NoteHub — your workspace for managing notes efficiently.",
    images: [OG_IMAGE],
  },
};

const Profile = async () => {
  const user = await getMe();

  return (
    <section className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </section>
  );
};

export default Profile;