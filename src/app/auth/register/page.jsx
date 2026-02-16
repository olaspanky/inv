"use client";

import { useState } from "react";
import AuthLayout from "../../components/Auth/AuthLayout";
import Input from "../../components/Auth/Input";
import Button from "../../components/Button/Button";
import fetchWrapper from '../../utils/fetchWrapper'
import { useRouter, useSearchParams } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone:""
  });

   const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");


  const validate = () => {
    const newErrors = {};
    if (!form.fullName) newErrors.fullName = "Full name is required";
    if (!form.email) newErrors.email = "Email is required";
    if (!form.password) newErrors.password = "Password is required";
    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    console.log()
    e.preventDefault();
    if (!validate()) return;
    
    setIsSubmitting(true);
      console.log({name: form.fullName,
          email: form.email,
          phone: form.phone,
      
            password: form.password})

            const payload = 
            {
            
          name: form.fullName,
          email: form.email,
          phone: form.phone,
            password: form.password
       
            }
    try {
      const response = await fetchWrapper.post('https://invisio.pbr.com.ng/api/V1/register',payload);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Registration failed');
      }

      const data = await response.json();
      setSuccessMessage(`User created successfully!  Password sent to user Email.`);
      
      // Optional: Redirect to another page after delay
      setTimeout(() => {
        router.push('/auth/login');
      }, 1000);

    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <AuthLayout>
      <h2 className="text-2xl font-semibold mb-4">Register</h2>

      {successMessage ? (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {successMessage}
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <Input
            label="Full Name"
            name="fullName"
            value={form.fullName}
              autoComplete="off"
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            error={errors.fullName}
          />
          <Input
            label="Email"
            name="email"
            value={form.email}
              autoComplete="off"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            error={errors.email}
          />
           <Input
            label="Phone Number"
            name="phone"
            type="phone"
            value={form.phone}
              autoComplete="off"
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            error={errors.phone}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            value={form.password}
              autoComplete="off"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            error={errors.password}
          />
          <Input
            label="Confirm Password"
            name="confirmPassword"
            type="password"
              autoComplete="off"
            value={form.confirmPassword}
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
            error={errors.confirmPassword}
          />
          {errors.submit && (
            <div className="text-red-500 text-sm mb-4">{errors.submit}</div>
          )}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating User..." : "Create User"}
          </Button>
        </form>
      )}
    </AuthLayout>
  );
}
