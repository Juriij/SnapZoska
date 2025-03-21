// src/app/actions/posts.ts

"use server";

// Import Prisma client
import { prisma } from "@/app/api/auth/[...nextauth]/prisma";



export const likePost = async (userId: string, postId: string) => {
  try {
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_postId: { userId, postId },
      },
    });

    if (existingLike) {
      return { message: "You already liked this post" };
    }

    const like = await prisma.like.create({
      data: {
        userId,
        postId,
      },
    });

    return like;
  } catch (error) {
    console.error("Error liking post:", error);
    throw new Error("Could not like post");
  }
};





export const unlikePost = async (userId: string, postId: string) => {
  try {
    const like = await prisma.like.findUnique({
      where: {
        userId_postId: { userId, postId },
      },
    });

    if (!like) {
      return { message: "You haven't liked this post yet" };
    }

    await prisma.like.delete({
      where: {
        userId_postId: { userId, postId },
      },
    });

    return { message: "Post unliked successfully" };
  } catch (error) {
    console.error("Error unliking post:", error);
    throw new Error("Could not unlike post");
  }
};





export const fetchPosts = async () => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      include: { 
        user: true,
        _count: {
          select: { likes: true }, // Get the number of likes for each post
        },
      },
    });

    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Could not fetch posts");
  }
};





// Fetch posts by a specific user ID
export const fetchPostsByUserId = async (userId: string) => {
  try {
    const posts = await prisma.post.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return posts;
  } catch (error) {
    console.error("Error fetching posts by userId:", error);
    throw new Error("Could not fetch posts");
  }
};

// Create a new post
export const createPost = async (userId: string, imageUrl: string, caption?: string) => {
  try {
    const newPost = await prisma.post.create({
      data: {
        userId,
        imageUrl,
        caption,
      },
    });

    return newPost;
  } catch (error) {
    console.error("Error creating post:", error);
    throw new Error("Could not create post");
  }
};