"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import fetchWrapper from '../../utils/fetchWrapper';
import invi from "../../../../public/invi.png"
export default function LoginPage() {
  const [form, setForm] = useState({
    identifier: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const isValidPhone = (value) => /^\+?\d{10,15}$/.test(value);

  const validate = () => {
    const newErrors = {};
    if (!form.identifier) {
      newErrors.identifier = 'Email or phone number is required';
    } else if (!isValidEmail(form.identifier) && !isValidPhone(form.identifier)) {
      newErrors.identifier = 'Enter a valid email or phone number';
    }
    if (!form.password) newErrors.password = 'Password is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    if (!validate()) return;

    setLoading(true);

    try {
      const res = await fetchWrapper.post(
        'https://invisio.pbr.com.ng/api/v1/login',
        form
      );
      const data = await res.json();

      if (!res.ok) {
        setServerError(data.error || 'Login failed. Please try again.');
      } else {
        const token = data?.data?.token;
        const user = data?.data?.user;

        if (!token) {
          setServerError('No token received. Please contact support.');
          return;
        }

        localStorage.setItem('token', token);
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
        }

        router.push('/');
      }
    } catch (error) {
      setServerError(error.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
<div className="min-h-screen flex flex-col p-12 isidora" style={{
  background: 'linear-gradient(to bottom, #000A48 0%, #000A48 50%, #ffffff 50%, #ffffff 100%)'
}}>
        <div>
            <img
              src="/assets/pbg-logo-white.png"
              alt="PBR Logo"
              className="h-16 w-auto mb-8"
            />
          </div>

<div className='2xl:px-32  flex flex-col items-center justify-center px-5 md:px-10' >
  <div className="w-full  grid md:grid-cols-2 2xl:gap-64 lg:gap-20 items-center ">
        {/* Left - Illustration / Welcome area */}
        <div className="hidden md:flex flex-col justify-between text-white space-y-8 h-[80vh] ">
        
<div className='flex flex-col gap-5 isidora4'>
  <h1 className="text-[36px] 2xl:text-[41px]  leading-tight isidora ">
           Sign in to <span className="font-bold">INVISIO™</span>
          </h1>

          <p className="text-lg text-gray-300 max-w-lg">
            Unlock access to real-world diagnosis and prescription data that uncover unprecedented insight into the life-science landscape
          </p>

</div>

          {/* Placeholder for the visual illustration – replace with your actual image or SVG */}
          <div className="relative mt-6">
            <div className="absolute inset-0  rounded-2xl" />
            <img
              src="/invi.png" // ← Replace with your scientist + charts image
              alt="Scientists with data visualization"
              className="relative z-10 w-full max-w-sm 2xl:max-w-md  rounded-xl "
            />
            {/* You can also use SVG icons / animated bars here if preferred */}
          </div>
        </div>

        {/* Right - Login Form */}
        <div className="bg-white backdrop-blur-md border border-white/10 rounded-[40px] shadow-2xl w-full px-12 py-18">
          <div className="md:hidden mb-8 text-center text-black">
            <img
              src="/invi.png"
              alt="PBR Logo"
              className="h-14 w-auto mx-auto mb-6"
            />
            <h1 className="text-[21px] font-bold text-black mb-3">
             Sign in 
            </h1>
            <p className="text-black  ">
              Unlock access to real-world diagnosis and prescription data
            </p>
          </div>

          <div className='flex flex-col'>
            <p className='text-[21px]'>Welcome to <span className="text-[#0089ED] font-bold">INVISIO™</span></p>
            <p className='text-[55px]'>Sign in</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 my-12">
            <div>
              <label className="block mb-2 text-sm font-medium text-black">
               Enter your username or email address
              </label>
              <input
                type="text"
                value={form.identifier}
                onChange={(e) => setForm({ ...form, identifier: e.target.value })}
                placeholder="Username or email address"
                className="w-full px-4 py-3.5 bg-white/10 border border-[#ADADAD] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              />
              {errors.identifier && (
                <p className="mt-1.5 text-sm text-red-400">{errors.identifier}</p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
              <label className="block mb-2 text-sm font-medium text-black">
                 Enter your Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-sm text-blue-400 hover:text-blue-300 transition"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Password"
                className="w-full px-4 py-3.5 bg-white/10 border border-[#ADADAD] rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              />
              {errors.password && (
                <p className="mt-1.5 text-sm text-red-400">{errors.password}</p>
              )}
            </div>

            {/* Optional hint / terms */}
            <div className="text-xs text-gray-400">
              Use 8 or more characters with a mix of letters, numbers & symbols
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                className="w-4 h-4 rounded border-gray-500 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-300">
                Agree to Terms of Use
              </label>
            </div>

            {serverError && (
              <p className="text-center text-red-400 text-sm">{serverError}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#000A48] hover:bg-blue-700 text-white font-semibold rounded-xl transition disabled:opacity-60 disabled:cursor-not-allowed shadow-lg"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-400">
            Forgot password?{' '}
            <a
              href="/auth/forgot-password"
              className="text-blue-400 hover:text-blue-300 underline transition"
            >
              Reset it here
            </a>
          </p>
        </div>
      </div>
</div>

    
    </div>
  );
}