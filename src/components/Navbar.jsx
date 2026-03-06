"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import { FaGraduationCap, FaBars, FaTimes, FaChevronDown, FaPlus, FaCog, FaSignOutAlt, FaUser, FaSun, FaMoon } from "react-icons/fa";
import Image from "next/image";
import { useTheme } from "@/provider/ThemeProvider";

const Navbar = () => {
  const { data: session, status } = useSession();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/courses", label: "Courses" },
    { href: "/#about", label: "About Us" },
    { href: "/#benefits", label: "Benefits" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[1000] bg-[var(--nav-bg,var(--glass-bg))] backdrop-blur-[16px] border-b border-[var(--glass-border)]">
      <div className="site-container flex items-center justify-between h-[72px]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-[10px] no-underline text-text-primary">
          <FaGraduationCap size={28} color="var(--accent-primary)" />
          <span className="text-[1.4rem] font-bold bg-linear-to-br from-[#6c63ff] to-[#00d4aa] bg-clip-text text-transparent">
            StudyFy
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-text-secondary no-underline text-[0.95rem] font-medium transition-colors duration-200 relative hover:text-accent-primary"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Auth + Theme Toggle */}
        <div className="hidden md:flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="flex items-center justify-center w-[38px] h-[38px] rounded-full bg-[rgba(108,99,255,0.1)] border border-[rgba(108,99,255,0.2)] text-accent-primary cursor-pointer transition-all duration-300"
          >
            {theme === "dark" ? <FaSun size={16} /> : <FaMoon size={16} />}
          </button>

          {status === "authenticated" && session?.user ? (
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 bg-[rgba(108,99,255,0.1)] border border-[rgba(108,99,255,0.2)] rounded-full py-1.5 pl-1.5 pr-3.5 cursor-pointer text-text-primary transition-all duration-200"
              >
                {session.user.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || "User"}
                    width={32}
                    height={32}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-linear-to-br from-[#6c63ff] to-[#00d4aa] flex items-center justify-center text-[0.85rem] font-semibold text-white">
                    {(session.user.name || "U").charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="text-[0.9rem] font-medium max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap">
                  {session.user.name || "User"}
                </span>
                <FaChevronDown size={12} className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : "rotate-0"}`} />
              </button>

              {dropdownOpen && (
                <div className="absolute top-[calc(100%+8px)] right-0 min-w-[220px] bg-bg-card border border-border-color rounded-[var(--radius-md)] shadow-[0_8px_32px_rgba(0,0,0,0.4)] z-[100] overflow-hidden animate-fade-in">
                  <div className="p-4 border-b border-border-color">
                    <p className="text-[0.9rem] font-semibold text-text-primary mb-0.5">
                      {session.user.name || "User"}
                    </p>
                    <p className="text-[0.8rem] text-text-muted">
                      {session.user.email}
                    </p>
                  </div>
                  <Link
                    href="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-[10px] py-3 px-4 text-text-secondary no-underline text-[0.9rem] transition-colors duration-200 hover:bg-[rgba(108,99,255,0.08)]"
                  >
                    <FaUser size={14} color="var(--accent-primary)" /> Profile
                  </Link>
                  <Link
                    href="/add-course"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-[10px] py-3 px-4 text-text-secondary no-underline text-[0.9rem] transition-colors duration-200 hover:bg-[rgba(108,99,255,0.08)]"
                  >
                    <FaPlus size={14} color="var(--accent-primary)" /> Add Course
                  </Link>
                  <Link
                    href="/manage-courses"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-[10px] py-3 px-4 text-text-secondary no-underline text-[0.9rem] transition-colors duration-200 hover:bg-[rgba(108,99,255,0.08)]"
                  >
                    <FaCog size={14} color="var(--accent-primary)" /> Manage Courses
                  </Link>
                  <button
                    onClick={() => { setDropdownOpen(false); signOut(); }}
                    className="flex items-center gap-[10px] py-3 px-4 text-danger bg-transparent border-none border-t border-border-color text-[0.9rem] cursor-pointer w-full transition-colors duration-200 hover:bg-[rgba(255,77,106,0.08)]"
                  >
                    <FaSignOutAlt size={14} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/login" className="btn-secondary btn-sm">
                Login
              </Link>
              <Link href="/register" className="btn-primary btn-sm">
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-[rgba(108,99,255,0.1)] border border-[rgba(108,99,255,0.2)] text-accent-primary cursor-pointer"
          >
            {theme === "dark" ? <FaSun size={14} /> : <FaMoon size={14} />}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="bg-transparent border-none text-text-primary cursor-pointer p-2"
          >
            {mobileOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="bg-bg-card border-t border-border-color px-6 pt-4 pb-6 animate-fade-in">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-3 text-text-secondary no-underline text-base border-b border-border-color hover:text-accent-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
          {status === "authenticated" && session?.user ? (
            <>
              <div className="py-4 pb-2 flex items-center gap-[10px]">
                <FaUser size={14} color="var(--accent-primary)" />
                <span className="text-[0.9rem] text-text-primary">{session.user.name || session.user.email}</span>
              </div>
              <Link href="/profile" onClick={() => setMobileOpen(false)} className="block py-2.5 text-text-secondary no-underline hover:text-accent-primary transition-colors">
                <FaUser size={12} className="mr-2 inline" /> Profile
              </Link>
              <Link href="/add-course" onClick={() => setMobileOpen(false)} className="block py-2.5 text-text-secondary no-underline hover:text-accent-primary transition-colors">
                <FaPlus size={12} className="mr-2 inline" /> Add Course
              </Link>
              <Link href="/manage-courses" onClick={() => setMobileOpen(false)} className="block py-2.5 text-text-secondary no-underline hover:text-accent-primary transition-colors">
                <FaCog size={12} className="mr-2 inline" /> Manage Courses
              </Link>
              <button
                onClick={() => { setMobileOpen(false); signOut(); }}
                className="flex items-center gap-2 mt-3 py-2.5 px-5 bg-danger text-white border-none rounded-[var(--radius-sm)] cursor-pointer text-[0.9rem]"
              >
                <FaSignOutAlt size={14} /> Sign Out
              </button>
            </>
          ) : (
            <div className="flex gap-3 mt-4">
              <Link href="/login" onClick={() => setMobileOpen(false)} className="btn-secondary btn-sm flex-1 text-center">
                Login
              </Link>
              <Link href="/register" onClick={() => setMobileOpen(false)} className="btn-primary btn-sm flex-1 text-center">
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
