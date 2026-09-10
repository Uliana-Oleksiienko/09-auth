"use client";

import Image from "next/image";
import css from "./page.module.css";
import { useEffect, useState } from "react";
import { getMe, updateMe } from "@/lib/api/clientApi";
import { User } from "@/types/user";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ApiError } from "@/types/error";
import { useAuthStore } from "@/lib/store/authStore";

const EditProfile = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const setUser = useAuthStore((state) => state.setUser);
  const [userName, setUserName] = useState<string>("");
  const [error, setError] = useState("");

  const router = useRouter();
  const goToProfile = () => router.push("/profile");

  useEffect(() => {
    getMe().then((user) => {
      setUserData(user);
      setUserName(user.username);
      setUser(user);
    });
  }, [setUser]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setUserName(event.target.value);

  const handleSaveUser = async (formData: FormData) => {
    const username = (formData.get("username") as string | null)?.trim() ?? "";
    setUserName(username);

    try {
      await updateMe({ username });

      if (userData) {
        setUser({ ...userData, username });
      }

      toast.success("Profile updated successfully");
      goToProfile();
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
      setError(
        (error as ApiError).response?.data.error ??
          (error as ApiError).message ??
          "Oops... some error"
      );
    }
  };

  return (
    <section className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>
        {userData?.avatar && (
          <Image
            src={userData?.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        )}

        <form action={handleSaveUser} className={css.profileInfo}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              name="username"
              type="text"
              className={css.input}
              defaultValue={userName || ""}
              onChange={handleChange}
              required
            />
          </div>
          <p>Email: {userData?.email}</p>
          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={goToProfile}
            >
              Cancel
            </button>
          </div>
          {error && <p className={css.error}>{error}</p>}
        </form>
      </div>
    </section>
  );
};

export default EditProfile;