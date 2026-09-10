"use client";

import { useState } from "react";
import css from "./page.module.css";
import { useRouter } from "next/navigation";
import { login, LoginRequest } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import toast from "react-hot-toast";
import { ApiError } from "@/types/error";

export const SignIn = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (formData: FormData) => {
    try {
      const formValues = Object.fromEntries(
        formData
      ) as unknown as LoginRequest;
      const res = await login(formValues);

      if (res) {
        setUser(res);
        toast.success("You have signed in successfully.");
        router.push("/profile");
      } else {
        setError("Invalid email or password");
        toast.error("Invalid email or password. Please try again.");
      }
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
      <h1 className={css.formTitle}>Sign in</h1>
      <form action={handleSubmit} className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>
        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>
        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Log in
          </button>
        </div>
        {error && <p className={css.error}>{error}</p>}
      </form>
    </section>
  );
};

export default SignIn;