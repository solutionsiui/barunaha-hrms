"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import Loader from "@/components/ui/Loader";

export default function HomePage() {
  const { isAuthed, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      router.replace(isAuthed ? "/dashboard" : "/login");
    }
  }, [isAuthed, loading, router]);

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Loader />
    </div>
  );
}
