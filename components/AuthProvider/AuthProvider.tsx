"use client";

import { checkSession, getMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "../Loader/Loader";
import { ApiError } from "@/types/error";

interface Props {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated
  );

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const isAuthenticated = await checkSession();

        if (isAuthenticated) {
          const user = await getMe();
          if (user) setUser(user);
          setIsAuthorized(true);
        } else {
          clearIsAuthenticated();
          setIsAuthorized(false);
        }
      } catch (error) {
        const apiError = error as ApiError;
        const errorMsg =
          apiError.response?.data?.error ??
          apiError.message ??
          "Oops... something went wrong.";
        setIsAuthorized(false);
        console.error(errorMsg);
      } finally {
        setIsChecking(false);
      }
    };

    fetchUser();
  }, [setUser, clearIsAuthenticated]);

  useEffect(() => {
    if (isAuthorized === false && !isChecking) {
      router.replace("/sign-in");
    }
  }, [isAuthorized, isChecking, router]);

  if (isChecking) return <Loader isFullScreen />;

  return children;
};

export default AuthProvider;