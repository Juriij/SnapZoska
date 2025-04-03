"use server";

import { prisma } from "@/app/api/auth/[...nextauth]/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";

export async function toggleLike(postId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Error("Must be logged in to like posts");
  }

  try {
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId: session.user.id,
          postId: postId,
        },
      },
    });

    if (existingLike) {
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });
      return false;
    } else {
      await prisma.like.create({
        data: {
          userId: session.user.id,
          postId: postId,
        },
      });
      return true;
    }
  } catch (error) {
    console.error("Error toggling like:", error);
    throw new Error("Failed to toggle like");
  }
} 