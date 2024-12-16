// src/sections/AuthHomeView.tsx


import Typography from "@mui/material/Typography";
import { Session } from "next-auth";
import { redirect } from "next/navigation"; 

export default function AuthHomeView({ session }: { session: Session | null }) {
  if (!session) {
    return <Typography>Loading...</Typography>;
  }

  redirect("/prispevok");

}