'use client';
import { redirect } from "next/navigation";
import { isLoggedIn } from "@/lib/auth"; 
import Landing from "./components/Landing";

export default function Home() {
  const loggedIn = isLoggedIn();

  if (!loggedIn) {
    redirect("/auth/login");
  }

  return <Landing />;
}
