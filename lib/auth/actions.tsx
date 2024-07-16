"use server";

import { db } from "@/lib/db";
import { FormState, LoginFormSchema, SignupFormSchema } from "@/lib/definitions";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { createSession, deleteSession } from "./sessions";

const signup = async (
  state: FormState,
  formData: FormData
): Promise<FormState | undefined> => {
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = validatedFields.data;

  const exsistingUser = await db.user.findUnique({
    where: {
      email: email,
    },
  });

  if (exsistingUser) {
    return {
      message: "Email already exists, please use a different email or login.",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const data = await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  if (!data) {
    return { message: "An error occured while Signing up." };
  }
  await createSession(data.id);
};

export async function login(
  state: FormState,
  formData: FormData
): Promise<FormState | undefined> {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  const errorMessage = { message: "Invalid login credentials." };

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const user = await db.user.findUnique({
    where: {
      email:validatedFields.data.email
    }
  });

  if (!user) {
    return errorMessage;
  }
  const passwordMatch = await bcrypt.compare(
    validatedFields.data.password,
    user.password
  );

  if (!passwordMatch) {
    return errorMessage;
  }

  const userId = user.id;
  await createSession(userId);
}

export async function logout() {
  deleteSession();
}

export default signup;
