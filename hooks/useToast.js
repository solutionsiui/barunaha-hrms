"use client";

import { useState, useCallback } from "react";
import Toast from "@/components/ui/Toast";

export function useToast() {
  const [toast, setToast] = useState(null);

  const showToast = useCallback((msg, type = "success") => {
    setToast({ msg, type, id: Date.now() });
  }, []);

  const node = toast ? (
    <Toast
      key={toast.id}
      msg={toast.msg}
      type={toast.type}
      onDone={() => setToast(null)}
    />
  ) : null;

  return [showToast, node];
}
