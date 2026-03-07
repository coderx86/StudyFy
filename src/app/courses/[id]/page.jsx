"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaBookOpen, FaClock, FaDollarSign, FaChalkboardTeacher, FaLayerGroup, FaArrowLeft, FaPlayCircle } from "react-icons/fa";

const CourseDetailPage = ({ params }) => {
  const { id } = use(params);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`/api/courses/${id}`);
        const data = await res.json();
        setCourse(data);
      } catch (error) {
        console.error("Failed to fetch course details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-[100px]">
        <div className="loading-spinner" />
        <p className="text-text-muted mt-4">Loading course details...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="text-center py-[100px]">
        <h2 className="text-2xl font-bold text-text-primary mb-4">Course Not Found</h2>
        <Link href="/courses" className="btn-primary">
          Back to Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="py-10 pb-20">
      <div className="site-container">
        <Link
          href="/courses"
          className="inline-flex items-center gap-2 text-text-muted no-underline mb-8 hover:text-accent-primary transition-colors text-[0.9rem]"
        >
          <FaArrowLeft size={12} /> Back to Courses
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10">
          {/* Main Content */}
          <div>
            <div className="relative h-[300px] md:h-[450px] bg-bg-card rounded-3xl overflow-hidden mb-8 shadow-shadow-card">
              {course.thumbnail ? (
                <Image
                  src={course.thumbnail}
                  alt={course.title}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <FaBookOpen size={80} color="var(--accent-primary)" className="opacity-20" />
                </div>
              )}
              <div className="absolute inset-0 bg-linear-to-t from-[rgba(0,0,0,0.6)] to-transparent flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <FaPlayCircle size={64} color="white" className="cursor-pointer" />
              </div>
            </div>

            <h1 className="text-[2rem] md:text-[2.5rem] font-bold text-text-primary mb-4 leading-[1.2]">
              {course.title}
            </h1>

            <div className="flex flex-wrap gap-6 mb-8 p-6 bg-bg-card rounded-2xl border border-border-color">
              <div className="flex items-center gap-2 text-text-secondary text-[0.95rem]">
                <FaLayerGroup color="var(--accent-primary)" size={16} />
                <span className="font-medium">{course.category}</span>
              </div>
              <div className="flex items-center gap-2 text-text-secondary text-[0.95rem]">
                <FaClock color="var(--accent-primary)" size={16} />
                <span className="font-medium">{course.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-text-secondary text-[0.95rem]">
                <FaChalkboardTeacher color="var(--accent-primary)" size={16} />
                <span className="font-medium">10+ Lessons</span>
              </div>
            </div>

            <div className="mb-10">
              <h3 className="text-[1.25rem] font-semibold text-text-primary mb-4 border-b border-border-color pb-2 inline-block">
                Course Overview
              </h3>
              <p className="text-text-secondary text-[1.1rem] leading-[1.8] whitespace-pre-line">
                {course.description || course.shortDescription}
              </p>
            </div>
          </div>

          {/* Sidebar / Enrollment */}
          <div className="lg:sticky lg:top-[92px] h-fit">
            <div className="bg-bg-card border border-border-color rounded-3xl p-8 shadow-shadow-card">
              <div className="flex items-center gap-2 text-accent-primary mb-6">
                <FaDollarSign size={24} />
                <span className="text-[2.2rem] font-bold">{course.price}</span>
              </div>

              <div className="flex flex-col gap-4 mb-8">
                <div className="flex items-center justify-between py-3 border-b border-border-color">
                  <span className="text-text-muted text-[0.95rem]">Full Access</span>
                  <span className="text-text-primary font-medium">Lifetime</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-border-color">
                  <span className="text-text-muted text-[0.95rem]">Certificate</span>
                  <span className="text-text-primary font-medium">Included</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-text-muted text-[0.95rem]">Updates</span>
                  <span className="text-text-primary font-medium">Free</span>
                </div>
              </div>

              <button className="btn-primary w-full py-4 text-[1.05rem] font-bold tracking-[0.5px]">
                Enroll in Course
              </button>
              <p className="text-center text-text-muted text-[0.8rem] mt-4">
                30-day money-back guarantee
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
