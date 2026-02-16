"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthLayout from "../../components/Auth/AuthLayout";
import Input from "../../components/Auth/Input";
import Button from "../../components/Button/Button";
import Link from "next/link";
import fetchWrapper from "../../utils/fetchWrapper"; // Make sure this exists and wraps fetch with base URL, headers, etc.

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!email) {
      setError("Email is required");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetchWrapper.post(
        "https://invisio.pbr.com.ng/api/V1/forgot-password",
        { email }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Request failed");
      }

      const data = await response.json();
      console.log(data)
      setSuccessMessage(`A PIN has been sent to ${email} to reset your password.`);
      setIsSubmitted(true);
  router.push(`/auth/enter-pin?email=${encodeURIComponent(email)}`);
      setTimeout(() => {
        router.push(`/auth/enter-pin?email=${encodeURIComponent(email)}`);
      }, 1000);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Reset Password
      </h2>

      {isSubmitted ? (
        <div className="text-center">
          <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg">
            {successMessage}
          </div>
          <Link href="/auth/login" className="text-blue-600 hover:underline">
            Back to Sign In
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-gray-600 mb-4">
            Enter your email address and we&apos;ll send you a pin to reset your
            password.
          </p>

          <Input
            label="Email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            error={error}
          />

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Reset Link"}
          </Button>

          <div className="text-center text-sm text-gray-500 mt-4">
            Remember your password?{" "}
            <Link href="/auth/login" className="text-blue-600 hover:underline">
              Sign In
            </Link>
          </div>
        </form>
      )}
    </AuthLayout>
  );
}
