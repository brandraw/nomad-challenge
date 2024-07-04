"use client";

import { InputHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";

interface FormInputProps {
  name: string;
  errors?: string[];
}

export function FormInput({
  name,
  errors = [],
  ...rest
}: FormInputProps & InputHTMLAttributes<HTMLInputElement>) {
  const { pending } = useFormStatus();
  const isError = Boolean(errors.length !== 0);

  return (
    <div className="flex flex-col gap-1">
      <input
        name={name}
        {...rest}
        disabled={pending}
        className={`border rounded-full outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-400 py-3 px-5 w-full border-neutral-300 disabled:cursor-not-allowed disabled:bg-neutral-50 ${
          isError && "border-red-500"
        }`}
      />
      {errors.map((a, i) => (
        <div key={i} className="text-xs text-red-500">
          {a}
        </div>
      ))}
    </div>
  );
}
