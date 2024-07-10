"use server";

import { db } from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt";
import { UserLogin } from "@/lib/user-login";

const accountSchema = z
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

        return !Boolean(user);
      }, "Email Already Exists"),
    username: z
      .string()
      .trim()
      .toLowerCase()
      .min(3)
      .max(12)
      .refine(async (username) => {
        const user = await db.user.findUnique({
          where: {
            username,
          },
          select: {
            id: true,
          },
        });

        return !Boolean(user);
      }, "Username Already Exists"),
    password: z.string(),
    password_confirm: z.string(),
  })
  .refine(({ password, password_confirm }) => password === password_confirm, {
    message: "Password Not Same",
    path: ["password_confirm"],
  });

export async function handleAccount(_: any, formData: FormData) {
  await new Promise((r) => setTimeout(r, 500));

  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
    password_confirm: formData.get("password_confirm"),
  };

  const result = await accountSchema.safeParseAsync(data);

  if (!result.success) {
    return result.error.flatten();
  }

  const hashedPassword = await bcrypt.hash(result.data.password, 12);
  const user = await db.user.create({
    data: {
      username: result.data.username,
      email: result.data.email,
      password: hashedPassword,
    },
    select: {
      id: true,
    },
  });

  await UserLogin(user.id);
}
