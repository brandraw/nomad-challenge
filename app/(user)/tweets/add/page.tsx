"use client";

import { FormBtn } from "@/components/form-btn";
import { FormInput } from "@/components/form-input";
import { useFormState } from "react-dom";
import { handleTweet } from "./actions";

export default function AddTweet() {
  const [state, action] = useFormState(handleTweet, null);

  return (
    <div className="p-2">
      <div className="p-5 border rounded-lg">
        <form action={action} className="space-y-4">
          <FormInput
            name="tweet"
            type="text"
            required
            placeholder="Write Your Tweet!"
          />
          <FormBtn label="Tweet!!" />
        </form>
      </div>
    </div>
  );
}
