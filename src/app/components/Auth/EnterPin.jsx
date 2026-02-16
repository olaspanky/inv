"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AuthLayout from "./AuthLayout";
import Button from "../Button/Button";
import Link from "next/link";

export default function EnterPinPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [pin, setPin] = useState(["", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendDisabled, setResendDisabled] = useState(true);
  const [countdown, setCountdown] = useState(60);

  // Handle PIN input changes
  const handlePinChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // Only allow numbers

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    // Auto-focus next input
    if (value && index < 3) {
      document.getElementById(`pin-${index + 1}`).focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      document.getElementById(`pin-${index - 1}`).focus();
    }
  };

  // Resend countdown timer
  useEffect(() => {
    let timer;
    if (countdown > 0 && resendDisabled) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      setResendDisabled(false);
    }
    return () => clearTimeout(timer);
  }, [countdown, resendDisabled]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Email is required");
      return;
    }

    const fullPin = pin.join("");
    if (fullPin.length !== 4) {
      setError("Please enter a 4-digit PIN");
      return;
    }

    setIsLoading(true);
    router.push(
        `/auth/enter-new-password?email=${encodeURIComponent(email)}&pin=${fullPin}`
      );

    // try {
    //   // Verify the PIN with your backend
    //   const response = await fetch(
    //     `http://172.20.10.4:5000/api/V1/verify-pin`,
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({ email, pin: fullPin }),
    //     }
    //   );

    //   const data = await response.json();

    //   if (!response.ok) {
    //     throw new Error(data.error || "Invalid PIN");
    //   }

    //   // Redirect to new password page with email and pin
    //   router.push(
    //     `/enter-new-password?email=${encodeURIComponent(email)}&pin=${fullPin}`
    //   );
    // } catch (err) {
    //   setError(err.message || "Failed to verify PIN");
    // } finally {
    //   setIsLoading(false);
    // }
  };

  const handleResendPin = async () => {
    setError("");
    setResendDisabled(true);
    setCountdown(60);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to resend PIN");
      }

      setError(""); // Clear any previous errors
    } catch (err) {
      setError(err.message || "Failed to resend PIN");
      setResendDisabled(false);
    }
  };

  return (
    <AuthLayout>
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Enter Verification PIN
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <p className="text-gray-600 mb-4">
          We've sent a 4-digit verification code to {email || "your email"}
        </p>

        {error && (
          <div className="p-4 bg-red-100 text-red-700 rounded-lg mb-4">
            {error}
          </div>
        )}

        <div className="flex justify-center space-x-4 mb-6">
          {[0, 1, 2, 3].map((index) => (
            <input
              key={index}
              id={`pin-${index}`}
              type="text"
              maxLength={1}
              value={pin[index]}
              onChange={(e) => handlePinChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-16 h-16 text-center text-2xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              inputMode="numeric"
              pattern="[0-9]*"
            />
          ))}
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading || pin.join("").length !== 4}
        >
          {isLoading ? "Verifying..." : "Verify PIN"}
        </Button>

        <div className="text-center text-sm text-gray-500 mt-4">
          Didn't receive the code?{" "}
          <button
            type="button"
            onClick={handleResendPin}
            disabled={resendDisabled}
            className={`${resendDisabled ? "text-gray-400" : "text-blue-600 hover:underline"}`}
          >
            {resendDisabled ? `Resend in ${countdown}s` : "Resend PIN"}
          </button>
        </div>

        <div className="text-center text-sm text-gray-500 mt-4">
          Remember your password?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Sign In
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
