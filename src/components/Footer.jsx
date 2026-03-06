"use client";

import Link from "next/link";
import { FaGraduationCap, FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-bg-secondary border-t border-border-color pt-[60px] pb-6">
      <div className="site-container">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-10 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-[10px] no-underline mb-4">
              <FaGraduationCap size={28} color="var(--accent-primary)" />
              <span className="text-[1.3rem] font-bold bg-linear-to-br from-[#6c63ff] to-[#00d4aa] bg-clip-text text-transparent">
                StudyFy
              </span>
            </Link>
            <p className="text-text-muted text-[0.9rem] leading-[1.7] max-w-[280px]">
              Empowering learners worldwide with curated courses and expert instructors. Start your learning journey today.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-text-primary text-base font-semibold mb-4">
              Quick Links
            </h4>
            <div className="flex flex-col gap-[10px]">
              {[
                { href: "/", label: "Home" },
                { href: "/courses", label: "Courses" },
                { href: "/#about", label: "About Us" },
                { href: "/#benefits", label: "Benefits" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-text-muted no-underline text-[0.9rem] transition-colors duration-200 hover:text-accent-primary"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-text-primary text-base font-semibold mb-4">
              Support
            </h4>
            <div className="flex flex-col gap-[10px]">
              {["Help Center", "Privacy Policy", "Terms of Service", "FAQ"].map((text) => (
                <span
                  key={text}
                  className="text-text-muted text-[0.9rem] cursor-pointer transition-colors duration-200 hover:text-accent-primary"
                >
                  {text}
                </span>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-text-primary text-base font-semibold mb-4">
              Contact Us
            </h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-[10px] text-text-muted text-[0.9rem]">
                <FaEnvelope size={14} color="var(--accent-primary)" />
                support@studyfy.com
              </div>
              <div className="flex items-center gap-[10px] text-text-muted text-[0.9rem]">
                <FaPhoneAlt size={14} color="var(--accent-primary)" />
                +1 (555) 123-4567
              </div>
              <div className="flex items-center gap-[10px] text-text-muted text-[0.9rem]">
                <FaMapMarkerAlt size={14} color="var(--accent-primary)" />
                San Francisco, CA
              </div>
            </div>
          </div>
        </div>

        {/* Divider + Bottom */}
        <div className="border-t border-border-color pt-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-text-muted text-[0.85rem]">
            &copy; {new Date().getFullYear()} StudyFy. All rights reserved.
          </p>
          <div className="flex gap-3">
            {[
              { icon: FaFacebookF, href: "#" },
              { icon: FaTwitter, href: "#" },
              { icon: FaLinkedinIn, href: "#" },
              { icon: FaGithub, href: "#" },
            ].map(({ icon: Icon, href }, i) => (
              <a
                key={i}
                href={href}
                className="w-9 h-9 rounded-full bg-[rgba(108,99,255,0.1)] border border-[rgba(108,99,255,0.2)] flex items-center justify-center text-accent-primary transition-all duration-200 no-underline hover:bg-accent-primary hover:text-white"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
