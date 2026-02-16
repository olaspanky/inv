"use client";
import { redirect } from "next/navigation";
import { isLoggedIn } from "@/lib/auth";
import Image from "next/image";
import { motion } from "framer-motion"; // For animations
import constructionIcon from "../../../public/assets/construction.jpg"; // Replace with your icon/image path

export default function Construction() {
  const loggedIn = isLoggedIn();

  if (!loggedIn) {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <motion.div
        className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-6">
          <Image
            src={constructionIcon}
            alt="Under Construction"
            width={80}
            height={80}
            className="mx-auto"
          />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Under Construction
        </h1>
        <p className="text-gray-600 mb-6">
          We're working hard to bring you this feature. Please check back later for updates.
        </p>
        <a
          href="/ "
          className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
        >
          Return to Home
        </a>
      </motion.div>
    </div>
  );
}