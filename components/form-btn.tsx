"use client";

import { useFormStatus } from "react-dom";

export function FormBtn({ label }: { label: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="bg-neutral-100 w-full flex items-center justify-center h-12 rounded-full text-neutral-500 font-semibold hover:bg-neutral-200 transition active:scale-95 disabled:text-neutral-400 disabled:cursor-not-allowed"
    >
      {pending ? "Loading..." : label}
    </button>
  );
}
