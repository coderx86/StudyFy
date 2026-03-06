import Link from "next/link";
import Image from "next/image";
import { FaGraduationCap, FaBookOpen, FaUsers, FaClock, FaChalkboardTeacher, FaLaptopCode, FaCertificate, FaGlobe, FaArrowRight, FaStar, FaPlay } from "react-icons/fa";
import { dbConnect } from "@/lib/dbConnect";

async function getFeaturedCourses() {
  try {
    const courses = await dbConnect("courses").find({}).limit(3).toArray();
    return JSON.parse(JSON.stringify(courses));
  } catch (error) {
    return [];
  }
}

export default async function Home() {
  const featuredCourses = await getFeaturedCourses();

  return (
    <div>
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[calc(100vh-72px)] flex items-center overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute -top-[20%] -right-[10%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(108,99,255,0.15)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(0,212,170,0.1)_0%,transparent_70%)] pointer-events-none" />

        <div className="site-container grid grid-cols-1 md:grid-cols-2 gap-[60px] items-center relative z-[1]">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-1 px-3 py-1 text-[0.75rem] font-semibold rounded-full bg-[rgba(108,99,255,0.15)] text-accent-primary uppercase tracking-[0.5px] mb-5">
              <FaStar size={10} /> #1 Learning Platform
            </div>
            <h1 className="text-[clamp(2.2rem,5vw,3.5rem)] font-bold leading-[1.15] mb-5">
              Unlock Your{" "}
              <span className="bg-linear-to-br from-[#6c63ff] to-[#00d4aa] bg-clip-text text-transparent">Potential</span>{" "}
              with Expert-Led Courses
            </h1>
            <p className="text-text-secondary text-[1.1rem] leading-[1.8] mb-8 max-w-[520px]">
              Discover thousands of courses taught by industry experts. Learn at your own pace, gain practical skills, and advance your career with StudyFy.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link href="/courses" className="btn-primary text-base py-3.5 px-8">
                Explore Courses <FaArrowRight size={14} />
              </Link>
              <Link href="/#about" className="btn-secondary text-base py-3.5 px-8">
                <FaPlay size={12} /> Learn More
              </Link>
            </div>

            {/* Stats mini */}
            <div className="flex gap-10 mt-12">
              {[
                { num: "10K+", label: "Students" },
                { num: "200+", label: "Courses" },
                { num: "50+", label: "Instructors" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-bold text-accent-primary">{s.num}</p>
                  <p className="text-[0.85rem] text-text-muted">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hero SVG Illustration */}
          <div className="animate-float hidden md:flex justify-center">
            <svg viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[480px]">
              {/* Background shapes */}
              <circle cx="250" cy="200" r="160" fill="url(#heroGrad1)" opacity="0.1"/>
              <circle cx="320" cy="140" r="80" fill="url(#heroGrad2)" opacity="0.08"/>
              {/* Laptop */}
              <rect x="120" y="140" width="220" height="150" rx="10" fill="#1a1a2e" stroke="#6c63ff" strokeWidth="2"/>
              <rect x="130" y="150" width="200" height="120" rx="4" fill="#0f0f1a"/>
              {/* Screen content */}
              <rect x="145" y="165" width="80" height="8" rx="4" fill="#6c63ff" opacity="0.6"/>
              <rect x="145" y="180" width="120" height="6" rx="3" fill="#2a2a40"/>
              <rect x="145" y="192" width="100" height="6" rx="3" fill="#2a2a40"/>
              <rect x="145" y="210" width="60" height="20" rx="6" fill="#00d4aa" opacity="0.8"/>
              <rect x="145" y="240" width="170" height="4" rx="2" fill="#2a2a40"/>
              <rect x="145" y="250" width="140" height="4" rx="2" fill="#2a2a40"/>
              {/* Circling elements */}
              <circle cx="330" cy="170" r="5" fill="#6c63ff"/>
              <circle cx="310" cy="195" r="4" fill="#00d4aa"/>
              <circle cx="325" cy="225" r="3" fill="#ffb347"/>
              {/* Laptop base */}
              <path d="M100 290 L120 290 L130 300 L330 300 L340 290 L360 290 L350 310 L110 310 Z" fill="#1a1a2e" stroke="#6c63ff" strokeWidth="1.5"/>
              {/* Floating book */}
              <g transform="translate(370, 100) rotate(15)">
                <rect width="60" height="80" rx="4" fill="#6c63ff" opacity="0.9"/>
                <rect x="5" y="5" width="50" height="70" rx="2" fill="#0f0f1a"/>
                <rect x="12" y="15" width="30" height="4" rx="2" fill="#6c63ff" opacity="0.5"/>
                <rect x="12" y="24" width="36" height="3" rx="1.5" fill="#2a2a40"/>
                <rect x="12" y="32" width="28" height="3" rx="1.5" fill="#2a2a40"/>
              </g>
              {/* Floating graduation cap */}
              <g transform="translate(80, 80)">
                <polygon points="40,10 80,30 40,50 0,30" fill="#6c63ff"/>
                <polygon points="40,50 80,30 80,35 40,55" fill="#4a42cc"/>
                <polygon points="40,50 0,30 0,35 40,55" fill="#5a52dd"/>
                <line x1="40" y1="50" x2="40" y2="70" stroke="#00d4aa" strokeWidth="2"/>
                <circle cx="40" cy="72" r="4" fill="#00d4aa"/>
              </g>
              {/* Sparkles */}
              <circle cx="400" cy="260" r="3" fill="#ffb347" opacity="0.8"/>
              <circle cx="90" cy="250" r="2" fill="#6c63ff" opacity="0.6"/>
              <circle cx="380" cy="80" r="2.5" fill="#00d4aa" opacity="0.7"/>
              <defs>
                <radialGradient id="heroGrad1"><stop stopColor="#6c63ff" offset="0%"/><stop stopColor="transparent" offset="100%"/></radialGradient>
                <radialGradient id="heroGrad2"><stop stopColor="#00d4aa" offset="0%"/><stop stopColor="transparent" offset="100%"/></radialGradient>
              </defs>
            </svg>
          </div>
        </div>
      </section>

      {/* ===== FEATURED COURSES ===== */}
      <section className="py-20 bg-bg-secondary">
        <div className="site-container">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-[2.25rem] font-bold mb-2 bg-linear-to-br from-text-primary to-accent-primary bg-clip-text text-transparent">Featured Courses</h2>
            <p className="text-text-secondary text-[1.1rem] max-w-[600px] mx-auto mt-2">
              Hand-picked courses to aAccelerate your learning journey
            </p>
          </div>

          <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6">
            {featuredCourses.map((course) => (
              <div key={course._id} className="bg-bg-card border border-border-color rounded-2xl overflow-hidden transition-all shadow-shadow-card hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(108,99,255,0.15)] hover:border-[var(--glass-border)] flex flex-col">
                <div className="relative h-[200px] bg-bg-primary">
                  {course.thumbnail ? (
                    <Image
                      src={course.thumbnail}
                      alt={course.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FaBookOpen size={48} color="var(--accent-primary)" className="opacity-30" />
                    </div>
                  )}
                  <div className="inline-flex items-center gap-1 px-3 py-1 text-[0.75rem] font-semibold rounded-full bg-[rgba(108,99,255,0.15)] text-accent-primary uppercase tracking-[0.5px] absolute top-3 left-3">
                    {course.category || "Course"}
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-[1.1rem] font-semibold mb-2 text-text-primary">
                    {course.title}
                  </h3>
                  <p className="text-text-muted text-[0.9rem] mb-4 flex-1 line-clamp-2">
                    {course.shortDescription}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-[1.2rem] font-bold text-accent-primary">${course.price}</span>
                    <Link href={`/courses/${course._id}`} className="btn-primary btn-sm">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {featuredCourses.length > 0 && (
            <div className="text-center mt-10">
              <Link href="/courses" className="btn-secondary">
                View All Courses <FaArrowRight size={14} />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ===== ABOUT US ===== */}
      <section id="about" className="py-20">
        <div className="site-container grid grid-cols-1 md:grid-cols-2 gap-[60px] items-center text-center md:text-left">
          {/* Illustration */}
          <div className="order-2 md:order-1 animate-fade-in-up">
            <Image
              src="/about-us.svg"
              alt="About StudyFy"
              width={460}
              height={400}
              className="w-full max-w-[500px] h-auto"
              priority
            />
          </div>

          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-1 px-3 py-1 text-[0.75rem] font-semibold rounded-full bg-[rgba(108,99,255,0.15)] text-accent-primary uppercase tracking-[0.5px] mb-4">About Us</div>
            <h2 className="text-4xl md:text-[2.25rem] font-bold mb-2 bg-linear-to-br from-text-primary to-accent-primary bg-clip-text text-transparent">Empowering the Next Generation of Learners</h2>
            <p className="text-text-secondary text-base leading-[1.8] mb-6">
              At StudyFy, we believe education should be accessible, engaging, and effective. Our platform connects passionate learners with world-class instructors, providing a seamless learning experience that fits your schedule and goals.
            </p>
            <p className="text-text-muted text-[0.95rem] leading-[1.8] mb-8">
              Whether you are starting a new career, advancing in your current role, or exploring a passion project, our curated courses and supportive community will help you succeed. Join thousands of learners who have transformed their lives through education.
            </p>
            <Link href="/courses" className="btn-primary">
              Start Learning Today <FaArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== BENEFITS ===== */}
      <section id="benefits" className="py-20 bg-bg-secondary">
        <div className="site-container">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-[2.25rem] font-bold mb-2 bg-linear-to-br from-text-primary to-accent-primary bg-clip-text text-transparent">Why Choose StudyFy?</h2>
            <p className="text-text-secondary text-[1.1rem] max-w-[600px] mx-auto mt-2">
              Everything you need for a transformative learning experience
            </p>
          </div>

          <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-6">
            {[
              {
                icon: FaChalkboardTeacher,
                title: "Expert Instructors",
                desc: "Learn from industry professionals with years of real-world experience and proven teaching methods.",
                iconColor: "text-[#6c63ff]",
                iconBg: "bg-[rgba(108,99,255,0.08)]",
              },
              {
                icon: FaLaptopCode,
                title: "Hands-on Projects",
                desc: "Apply your knowledge with practical projects that build your portfolio and demonstrate skills to employers.",
                iconColor: "text-[#00d4aa]",
                iconBg: "bg-[rgba(0,212,170,0.08)]",
              },
              {
                icon: FaCertificate,
                title: "Certificates",
                desc: "Earn recognized certificates upon completion to validate your skills and enhance your professional profile.",
                iconColor: "text-[#ffb347]",
                iconBg: "bg-[rgba(255,179,71,0.08)]",
              },
              {
                icon: FaGlobe,
                title: "Learn Anywhere",
                desc: "Access courses on any device, anytime. Learn at your own pace with lifetime access to course materials.",
                iconColor: "text-[#ff4d6a]",
                iconBg: "bg-[rgba(255,77,106,0.08)]",
              },
            ].map(({ icon: Icon, title, desc, iconColor, iconBg }) => (
              <div
                key={title}
                className="bg-bg-card border border-border-color rounded-2xl overflow-hidden transition-all shadow-shadow-card hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(108,99,255,0.15)] hover:border-[var(--glass-border)] p-8 text-center"
              >
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 ${iconBg}`}
                >
                  <Icon size={28} className={iconColor} />
                </div>
                <h3 className="text-[1.1rem] font-semibold mb-2.5 text-text-primary">
                  {title}
                </h3>
                <p className="text-text-muted text-[0.9rem] leading-[1.7]">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== INSTRUCTORS / TESTIMONIALS ===== */}
      <section className="py-20">
        <div className="site-container">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-[2.25rem] font-bold mb-2 bg-linear-to-br from-text-primary to-accent-primary bg-clip-text text-transparent">Meet Our Instructors</h2>
            <p className="text-text-secondary text-[1.1rem] max-w-[600px] mx-auto mt-2">
              Learn from the best in the industry
            </p>
          </div>

          <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-6">
            {[
              { name: "Dr. Sarah Mitchell", role: "Full-Stack Developer", courses: 12, students: "3.2K", avatarBg: "bg-[linear-gradient(135deg,#6c63ff,#6c63ff88)]" },
              { name: "Prof. James Anderson", role: "Data Scientist", courses: 8, students: "2.8K", avatarBg: "bg-[linear-gradient(135deg,#00d4aa,#00d4aa88)]" },
              { name: "Emily Chen", role: "UI/UX Designer", courses: 6, students: "1.9K", avatarBg: "bg-[linear-gradient(135deg,#ffb347,#ffb34788)]" },
              { name: "Alex Rivera", role: "React Specialist", courses: 10, students: "4.1K", avatarBg: "bg-[linear-gradient(135deg,#ff4d6a,#ff4d6a88)]" },
            ].map((instructor) => (
              <div
                key={instructor.name}
                className="bg-bg-card border border-border-color rounded-2xl overflow-hidden transition-all shadow-shadow-card hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(108,99,255,0.15)] hover:border-[var(--glass-border)] p-8 text-center"
              >
                <div
                  className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-[1.8rem] font-bold text-white ${instructor.avatarBg}`}
                >
                  {instructor.name.charAt(0)}
                </div>
                <h3 className="text-[1.05rem] font-semibold mb-1 text-text-primary">
                  {instructor.name}
                </h3>
                <p className="text-accent-primary text-[0.85rem] mb-4">
                  {instructor.role}
                </p>
                <div className="flex justify-center gap-6">
                  <div>
                    <p className="font-semibold text-text-primary">{instructor.courses}</p>
                    <p className="text-[0.8rem] text-text-muted">Courses</p>
                  </div>
                  <div>
                    <p className="font-semibold text-text-primary">{instructor.students}</p>
                    <p className="text-[0.8rem] text-text-muted">Students</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STATS + CTA ===== */}
      <section className="py-20 bg-[linear-gradient(135deg,rgba(108,99,255,0.08),rgba(0,212,170,0.05))]">
        <div className="site-container">
          {/* Stats */}
          <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-8 mb-16">
            {[
              { icon: FaUsers, num: "10,000+", label: "Active Students", color: "#6c63ff" },
              { icon: FaBookOpen, num: "200+", label: "Quality Courses", color: "#00d4aa" },
              { icon: FaChalkboardTeacher, num: "50+", label: "Expert Instructors", color: "#ffb347" },
              { icon: FaClock, num: "5,000+", label: "Hours of Content", color: "#ff4d6a" },
            ].map(({ icon: Icon, num, label, color }) => (
              <div
                key={label}
                className="text-center p-8 bg-bg-card rounded-2xl border border-border-color"
              >
                <Icon size={32} color={color} className="mb-3 mx-auto" />
                <p className="text-[2rem] font-bold text-text-primary mb-1">{num}</p>
                <p className="text-text-muted text-[0.9rem]">{label}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center p-[60px_40px] bg-bg-card rounded-3xl border border-border-color relative overflow-hidden">
            <div className="absolute -top-1/2 -right-[20%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(108,99,255,0.08)_0%,transparent_70%)] pointer-events-none" />
            <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-bold mb-4 text-text-primary relative">
              Ready to Start Your{" "}
              <span className="bg-linear-to-br from-[#6c63ff] to-[#00d4aa] bg-clip-text text-transparent">Learning Journey?</span>
            </h2>
            <p className="text-text-secondary text-[1.05rem] max-w-[560px] mx-auto mb-8 relative">
              Join our community of learners and get access to hundreds of expert-led courses. Start learning today!
            </p>
            <div className="flex gap-4 justify-center flex-wrap relative">
              <Link href="/courses" className="btn-primary text-base py-3.5 px-9">
                Browse Courses <FaArrowRight size={14} />
              </Link>
              <Link href="/register" className="btn-secondary text-base py-3.5 px-9">
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
