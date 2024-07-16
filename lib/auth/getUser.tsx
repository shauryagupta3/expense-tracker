import { cache } from "react";
import { verifySession } from "./sessions";
import { db } from "@/lib/db";

export const getUser = cache(async () => {
  const session = await verifySession();
  if (!session.isAuth) {
    return null;
  }
  console.log(session.userId);
  try {
    const data = await db.user.findUnique({
      where: {
        id: session.userId,
      },
      select: {
        name: true,
        email: true,
        id: true,
      },
    });
    console.log(data?.id + "user found");
    return data;
  } catch (error) {
    console.log("Failed to fetch user.");
    return null;
  }
});
