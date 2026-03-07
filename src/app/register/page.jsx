"use client";

import { postUser } from "@/actions/server/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { FaGraduationCap, FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const formData = {
      name: form.name.value,
      email: form.email.value,
      password: form.password.value,
    };

    try {
      const result = await postUser(formData);
      if (result.success) {
        toast.success("Account created successfully! Please sign in.");
        router.push("/login");
      } else {
        toast.error(result.message || "Registration failed");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-72px)] flex items-center justify-center p-[40px_24px] relative">
      <div className="absolute top-[10%] right-[5%] w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(108,99,255,0.08)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[5%] w-[250px] h-[250px] rounded-full bg-[radial-gradient(circle,rgba(0,212,170,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="w-full max-w-[440px] bg-bg-card border border-border-color rounded-3xl p-[40px_32px] shadow-shadow-card relative z-[1]">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <FaGraduationCap size={40} color="var(--accent-primary)" />
          </div>
          <h1 className="text-[1.6rem] font-bold text-text-primary mb-2">
            Create Account
          </h1>
          <p className="text-text-muted text-[0.9rem]">
            Join StudyFy and start learning today
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block mb-1.5 text-text-secondary font-medium text-[0.9rem]">Full Name</label>
            <div className="relative">
              <FaUser
                size={14}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted"
              />
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                required
                className="w-full px-4 py-3 pl-10 bg-bg-input text-text-primary border border-border-color rounded-[var(--radius-md)] text-[0.95rem] transition-all duration-300 outline-none focus:border-accent-primary focus:ring-[3px] focus:ring-[rgba(108,99,255,0.15)] placeholder:text-text-muted"
              />
            </div>
          </div>

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
                placeholder="Create a strong password"
                required
                minLength={6}
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
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center mt-6 text-text-muted text-[0.9rem]">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-accent-primary no-underline font-semibold"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
