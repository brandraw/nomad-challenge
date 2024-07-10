"use client";

import { FormBtn } from "@/components/form-btn";
import { FormInput } from "@/components/form-input";
import { useFormState } from "react-dom";
import { handleAccount } from "./actions";

export default function CreateAccount() {
  const [state, action] = useFormState(handleAccount, null);

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="text-4xl font-semibold">Create Account 🔥</div>
      <form action={action} className="w-full space-y-3">
        <FormInput
          name="email"
          type="email"
          required
          placeholder="E-mail"
          errors={state?.fieldErrors.email}
        />
        <FormInput
          name="username"
          type="text"
          required
          placeholder="Username"
          errors={state?.fieldErrors.username}
        />
        <FormInput
          name="password"
          type="password"
          required
          placeholder="Password"
          errors={state?.fieldErrors.password}
        />
        <FormInput
          name="password_confirm"
          type="password"
          required
          placeholder="Password Confirm"
          errors={state?.fieldErrors.password_confirm}
        />
        <FormBtn label="Create Account!" />
      </form>
    </div>
  );
}
