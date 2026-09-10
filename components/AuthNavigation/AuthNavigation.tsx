"use client";

import Link from "next/link";
import css from "./AuthNavigation.module.css";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/api/clientApi";

interface Props {
  onCloseNavbar: () => void;
}

const AuthNavigation = ({ onCloseNavbar }: Props) => {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated
  );

  const handleLogout = async () => {
    await logout();
    clearIsAuthenticated();
    router.push("/sign-in");
    onCloseNavbar();
  };

  return isAuthenticated ? (
    <>
      <li className={css.navigationItem}>
        <Link
          href="/profile"
          prefetch={false}
          className={css.navigationLink}
          onClick={onCloseNavbar}
        >
          Profile
        </Link>
      </li>
      <li className={css.navigationItem}>
        <p className={css.userEmail}>{user?.email}</p>
        <button className={css.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </li>
    </>
  ) : (
    <>
      <li className={css.navigationItem}>
        <Link
          href="/sign-in"
          prefetch={false}
          className={css.navigationLink}
          onClick={onCloseNavbar}
        >
          Login
        </Link>
      </li>
      <li className={css.navigationItem}>
        <Link
          href="/sign-up"
          prefetch={false}
          className={css.navigationLink}
          onClick={onCloseNavbar}
        >
          Sign up
        </Link>
      </li>
    </>
  );
};

export default AuthNavigation;