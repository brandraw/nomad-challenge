"use server";

import { db } from "@/lib/db";
import { z } from "zod";

const loginSchema = z
  .object({
    email: z
      .string()
      .email()
      .toLowerCase()
      .refine(async (email) => {
        const user = await db.user.findUnique({
          where: {
            email,
          },
          select: {
            id: true,
          },
        });

        return Boolean(user);
      }, "Email Not Exists"),
    username: z.string().min(3).max(10).trim().toLowerCase(),
    password: z.string(),
  })
  .superRefine(async ({ username, password }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        username,
      },
      select: {
        username: true,
        password: true,
      },
    });

    if (!user) {
      ctx.addIssue({
        code: "custom",
        message: "No Username",
        path: ["username"],
        fatal: true,
      });
      return z.NEVER;
    }

    const passwordCheck = password === user.password;

    if (!passwordCheck) {
      ctx.addIssue({
        code: "custom",
        message: "Invalid password.",
        path: ["password"],
        fatal: true,
      });

      return z.NEVER;
    }

    return true;
  });

export async function handleLogin(_: any, formData: FormData) {
  await new Promise((r) => setTimeout(r, 500));

  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  };
  const result = await loginSchema.safeParseAsync(data);

  if (!result.success) {
    return {
      errors: result.error.flatten(),
    };
  } else {
    return {
      success: true,
    };
  }
}
