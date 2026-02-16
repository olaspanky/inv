"use client";

import { useState } from "react";
import AuthLayout from "./AuthLayout";
import Input from "./Input";
import Button from "../Button/Button";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function NewPasswordPage() {
  const [form, setForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [resendSuccess, setResendSuccess] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  const email = searchParams.get("email");
  const pin = searchParams.get("pin");

  const validate = () => {
    const newErrors = {};

    if (!form.newPassword) {
      newErrors.newPassword = "Password is required";
    } else if (form.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    }

    if (form.newPassword !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    if (!validate()) return;

    if (!email || !pin) {
      setServerError("Invalid or missing reset credentials.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("https://invisio.pbr.com.ng/api/v1/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          pin,
          newPassword: form.newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (
          data.error === "Invalid or expired PIN" ||
          data.error === "Reset PIN not requested or expired"
        ) {
          setServerError(data.error);
          return;
        }

        setServerError(data.error || "Failed to reset password");
        return;
      }
router.push('/auth/login')
      setIsSuccess(true);
    } catch (err) {
      setServerError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendPin = async () => {
    if (!email) {
      setServerError("Missing email to resend PIN.");
      return;
    }

    try {
      setLoading(true);
      setServerError("");
      setResendSuccess(false);

      const res = await fetch("http://192.168.8.159:5000/api/v1/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setServerError(data.error || "Failed to resend PIN");
        return;
      }

      setResendSuccess(true);
      router.push(`/enter-pin?email=${email}`);
    } catch (err) {
      setServerError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <AuthLayout>
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Create New Password
      </h2>

      {isSuccess ? (
        <div className="text-center">
          <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg">
            Your password has been successfully updated.
          </div>
          <Link
            href="/login"
            className="inline-block px-6 py-3 rounded-lg text-white font-medium"
            style={{
              background:
                "linear-gradient(198deg, rgba(55, 62, 231, 1) 0%, rgba(58, 96, 234, 1) 24%, rgba(59, 106, 235, 1) 31%, rgba(61, 132, 237, 1) 50%)",
            }}
          >
            Return to Sign In
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-gray-600 mb-4">
            Create a new password for your INVISIO™ account.
          </p>

          {serverError && (
            <div className="text-red-600 text-sm bg-red-100 p-2 rounded">
              {serverError}
            </div>
          )}

          <Input
            label="New Password"
            name="newPassword"
            type={showPassword ? "text" : "password"}
            value={form.newPassword}
            onChange={(e) =>
              setForm({ ...form, newPassword: e.target.value })
            }
            error={errors.newPassword}
            placeholder="At least 8 characters"
          />

          <Input
            label="Confirm Password"
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            value={form.confirmPassword}
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
            error={errors.confirmPassword}
            placeholder="Re-enter your password"
          />

          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="showPassword"
              className="mr-2"
              checked={showPassword}
              onChange={togglePasswordVisibility}
            />
            <label htmlFor="showPassword" className="text-sm text-gray-600">
              Show passwords
            </label>
          </div>

          {(serverError === "Invalid or expired PIN" ||
            serverError === "Reset PIN not requested or expired") && (
            <div className="mt-2 text-center">
              <button
                type="button"
                onClick={handleResendPin}
                className="text-blue-600 cursor-pointer text-sm underline hover:text-blue-800"
              >
                Resend PIN
              </button>
            </div>
          )}

          <Button type="submit" className="w-full cursor-pointer" disabled={loading}>
            {loading ? "Updating..." : "Update Password"}
          </Button>

          <div className="text-center text-sm text-gray-500 mt-4">
            Remember your password?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Sign In
            </Link>
          </div>
        </form>
      )}
    </AuthLayout>
  );
}
