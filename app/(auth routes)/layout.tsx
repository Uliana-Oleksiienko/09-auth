"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface Props {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [router]);

  return children;
};

export default AuthLayout;