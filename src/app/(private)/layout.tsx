// src/app/(private)/layout.tsx

import { redirect } from 'next/navigation'; // Import redirect from Next.js
import { getServerSession } from "next-auth"; // NextAuth helper
import { authOptions } from "../api/auth/[...nextauth]/authOptions"; // Path to auth options
import { prisma } from 'prisma/prisma-client'; // Import Prisma client to query the database
import AuthHomeView from "../../sections/AuthHomeView"; // Import AuthHomeView component


export default async function PrivateLayout() {
  const session = await getServerSession(authOptions); // Get session using NextAuth

  if (!session) {
    // If the user is not signed in, redirect to the login page
    redirect('/auth/prihlasenie');
  }

  // Check if the user is registered by looking up the email in the database
  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email, // Use the email from the session to query the User table
    },
  });

  if (!user) {
    // If the user is not registered in the database, redirect to the registration page
    redirect('/auth/registracia');
  }

  // If the user is signed in and registered, render the AuthHomeView
  return <AuthHomeView session={session} />;
}