"use client";

import { FormBtn } from "@/components/form-btn";
import { FormInput } from "@/components/form-input";
import { useFormState } from "react-dom";
import { handleLogin } from "./actions";

export default function Login() {
  const [state, action] = useFormState(handleLogin, null);

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="text-5xl">🔥</div>
      <form action={action} className="w-full space-y-3">
        <FormInput
          name="email"
          type="email"
          required
          placeholder="E-mail"
          errors={state?.errors?.fieldErrors.email}
        />
        <FormInput
          name="username"
          type="text"
          required
          placeholder="Username"
          errors={state?.errors?.fieldErrors.username}
        />
        <FormInput
          name="password"
          type="password"
          required
          placeholder="Password"
          errors={state?.errors?.fieldErrors.password}
        />
        <FormBtn label="Log in" />
      </form>

      {state?.success && (
        <div className="rounded-lg bg-green-600 h-12 flex items-center justify-start w-full p-5">
          Success!
        </div>
      )}
    </div>
  );
}
