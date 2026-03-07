"use client";

import { Suspense } from "react";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { FaGraduationCap, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast.error("Invalid email or password");
      } else {
        toast.success("Logged in successfully!");
        router.push(callbackUrl);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl });
  };

  return (
    <div className="w-full max-w-[440px] bg-bg-card border border-border-color rounded-3xl p-[40px_32px] shadow-shadow-card relative z-[1]">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <FaGraduationCap size={40} color="var(--accent-primary)" />
        </div>
        <h1 className="text-[1.6rem] font-bold text-text-primary mb-2">
          Welcome Back
        </h1>
        <p className="text-text-muted text-[0.9rem]">
          Sign in to continue your learning journey
        </p>
      </div>

      {/* Google Sign In */}
      <button
        onClick={handleGoogleSignIn}
        className="inline-flex items-center justify-center gap-[10px] w-full p-3 bg-[var(--btn-google-bg)] text-[var(--btn-google-color)] border border-[var(--btn-google-border)] rounded-[var(--radius-md)] text-[0.95rem] font-medium cursor-pointer transition-all duration-200 hover:shadow-[0_2px_12px_rgba(0,0,0,0.1)] mb-6"
      >
        <FcGoogle size={20} />
        Continue with Google
      </button>

      {/* Divider */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 h-px bg-border-color" />
        <span className="text-text-muted text-[0.85rem]">or</span>
        <div className="flex-1 h-px bg-border-color" />
      </div>

      {/* Credentials Form */}
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label className="block mb-1.5 text-text-secondary font-medium text-[0.9rem]">Email</label>
          <div className="relative">
            <FaEnvelope
              size={14}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted"
            />
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              required
              className="w-full px-4 py-3 pl-10 bg-bg-input text-text-primary border border-border-color rounded-[var(--radius-md)] text-[0.95rem] transition-all duration-300 outline-none focus:border-accent-primary focus:ring-[3px] focus:ring-[rgba(108,99,255,0.15)] placeholder:text-text-muted"
            />
          </div>
        </div>

        <div className="mb-7">
          <label className="block mb-1.5 text-text-secondary font-medium text-[0.9rem]">Password</label>
          <div className="relative">
            <FaLock
              size={14}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted"
            />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              required
              className="w-full px-4 py-3 pl-10 pr-10 bg-bg-input text-text-primary border border-border-color rounded-[var(--radius-md)] text-[0.95rem] transition-all duration-300 outline-none focus:border-accent-primary focus:ring-[3px] focus:ring-[rgba(108,99,255,0.15)] placeholder:text-text-muted"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-text-muted"
            >
              {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="btn-primary w-full py-3.5 text-base"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      {/* Register Link */}
      <p className="text-center mt-6 text-text-muted text-[0.9rem]">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="text-accent-primary no-underline font-semibold"
        >
          Create one
        </Link>
      </p>
    </div>
  );
};

const LoginPage = () => {
  return (
    <div className="min-h-[calc(100vh-72px)] flex items-center justify-center p-[40px_24px] relative">
      {/* Background decoration */}
      <div className="absolute top-[10%] left-[5%] w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(108,99,255,0.08)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[5%] w-[250px] h-[250px] rounded-full bg-[radial-gradient(circle,rgba(0,212,170,0.06)_0%,transparent_70%)] pointer-events-none" />

      <Suspense fallback={
        <div className="text-center text-text-muted">Loading...</div>
      }>
        <LoginForm />
      </Suspense>
    </div>
  );
};

export default LoginPage;
