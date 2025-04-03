"use server";

import { prisma } from "@/app/api/auth/[...nextauth]/prisma";

export async function resetAllLikes() {
  try {
    await prisma.like.deleteMany({});
    console.log("All likes have been reset");
  } catch (error) {
    console.error("Error resetting likes:", error);
    throw new Error("Could not reset likes");
  }
} 