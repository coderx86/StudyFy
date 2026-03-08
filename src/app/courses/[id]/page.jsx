import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft, FaClock, FaDollarSign, FaChalkboardTeacher, FaBookOpen } from "react-icons/fa";
import { dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

async function getCourse(id) {
  try {
    if (!ObjectId.isValid(id)) return null;
    const course = await dbConnect("courses").findOne({ _id: new ObjectId(id) });
    return course ? JSON.parse(JSON.stringify(course)) : null;
  } catch {
    return null;
  }
}

export default async function CourseDetailPage({ params }) {
  const { id } = await params;
  const course = await getCourse(id);

  if (!course) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <FaBookOpen size={64} color="var(--text-muted)" className="opacity-30" />
        <h2 className="text-2xl text-text-primary">Course Not Found</h2>
        <p className="text-text-muted">The course you are looking for does not exist.</p>
        <Link href="/courses" className="btn-primary mt-2">
          <FaArrowLeft size={14} /> Back to Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="py-10 pb-20">
      <div className="site-container-md">
        {/* Back */}
        <Link
          href="/courses"
          className="inline-flex items-center gap-2 text-text-secondary no-underline text-[0.9rem] mb-6 transition-colors duration-200 hover:text-accent-primary"
        >
          <FaArrowLeft size={14} /> Back to Courses
        </Link>

        {/* Banner */}
        <div className="relative h-[360px] rounded-2xl overflow-hidden mb-8 bg-bg-card">
          {course.thumbnail ? (
            <Image
              src={course.thumbnail}
              alt={course.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 900px"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[linear-gradient(135deg,rgba(108,99,255,0.15),rgba(0,212,170,0.1))]">
              <FaBookOpen size={80} color="var(--accent-primary)" className="opacity-30" />
            </div>
          )}
          {course.category && (
            <div className="inline-flex items-center gap-1 px-4 py-1.5 text-[0.8rem] font-semibold rounded-full bg-[rgba(108,99,255,0.15)] text-accent-primary uppercase tracking-[0.5px] absolute top-5 left-5">
              {course.category}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="bg-bg-card border border-border-color rounded-2xl p-9">
          <h1 className="text-[clamp(1.5rem,3vw,2rem)] font-bold text-text-primary mb-5">
            {course.title}
          </h1>

          {/* Meta info */}
          <div className="flex flex-wrap gap-6 mb-7 p-5 bg-[rgba(108,99,255,0.05)] rounded-[var(--radius-md)] border border-[rgba(108,99,255,0.1)]">
            <div className="flex items-center gap-2">
              <FaDollarSign size={16} color="var(--accent-primary)" />
              <div>
                <p className="text-[0.75rem] text-text-muted uppercase tracking-[0.5px]">Price</p>
                <p className="font-bold text-accent-primary text-[1.2rem]">${course.price}</p>
              </div>
            </div>

            {course.duration && (
              <div className="flex items-center gap-2">
                <FaClock size={16} color="var(--accent-secondary)" />
                <div>
                  <p className="text-[0.75rem] text-text-muted uppercase tracking-[0.5px]">Duration</p>
                  <p className="font-semibold text-text-primary">{course.duration}</p>
                </div>
              </div>
            )}

            {course.instructor && (
              <div className="flex items-center gap-2">
                <FaChalkboardTeacher size={16} color="var(--warning)" />
                <div>
                  <p className="text-[0.75rem] text-text-muted uppercase tracking-[0.5px]">Instructor</p>
                  <p className="font-semibold text-text-primary">{course.instructor}</p>
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-[1.2rem] font-semibold text-text-primary mb-3">
              About This Course
            </h2>
            <p className="text-text-secondary leading-[1.8] whitespace-pre-line">
              {course.fullDescription || course.shortDescription}
            </p>
          </div>

          <Link href="/courses" className="btn-secondary">
            <FaArrowLeft size={14} /> Back to Courses
          </Link>
        </div>
      </div>
    </div>
  );
}
