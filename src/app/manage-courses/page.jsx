"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import { FaEye, FaTrash, FaPlus, FaBookOpen, FaClock, FaSpinner } from "react-icons/fa";

const ManageCoursesPage = () => {
  const { data: session } = useSession();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  const fetchCourses = async () => {
    try {
      const res = await fetch("/api/courses");
      const data = await res.json();
      setCourses(data);
    } catch (error) {
      toast.error("Failed to fetch courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDelete = async (id, title) => {
    const confirmed = window.confirm(`Are you sure you want to delete "${title}"?`);
    if (!confirmed) return;

    setDeleting(id);
    try {
      const res = await fetch(`/api/courses/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Course deleted successfully");
        setCourses((prev) => prev.filter((c) => c._id !== id));
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to delete course");
      }
    } catch (error) {
      toast.error("Failed to delete course");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="py-10 pb-20">
      <div className="site-container">
        {/* Header */}
        <div className="flex justify-between items-center mb-9 flex-wrap gap-4">
          <div>
            <h1 className="text-4xl md:text-[2.25rem] font-bold mb-2 bg-linear-to-br from-text-primary to-accent-primary bg-clip-text text-transparent">Manage Courses</h1>
            <p className="text-text-secondary text-base">
              View, edit, or remove courses from the platform
            </p>
          </div>
          <Link href="/add-course" className="btn-primary">
            <FaPlus size={14} /> Add New Course
          </Link>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-[60px]">
            <div className="w-12 h-12 border-[3px] border-border-color border-t-accent-primary rounded-full animate-spin mx-auto mb-4" />
            <p className="text-text-muted">Loading courses...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && courses.length === 0 && (
          <div className="text-center py-[60px] px-5 bg-bg-card rounded-2xl border border-border-color">
            <FaBookOpen size={48} color="var(--text-muted)" className="opacity-30 mb-4 mx-auto" />
            <p className="text-text-muted text-[1.1rem] mb-2">No courses yet</p>
            <p className="text-text-muted text-[0.9rem] mb-6">
              Start by adding your first course
            </p>
            <Link href="/add-course" className="btn-primary">
              <FaPlus size={14} /> Add Your First Course
            </Link>
          </div>
        )}

        {/* Desktop Table */}
        {!loading && courses.length > 0 && (
          <>
            <div className="desktop-table bg-bg-card border border-border-color rounded-2xl overflow-hidden">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[rgba(108,99,255,0.08)] border-b border-border-color">
                    <th className="p-3.5 px-5 text-left text-text-secondary text-[0.85rem] font-semibold uppercase tracking-[0.5px]">
                      Course
                    </th>
                    <th className="p-3.5 px-5 text-left text-text-secondary text-[0.85rem] font-semibold uppercase tracking-[0.5px]">
                      Category
                    </th>
                    <th className="p-3.5 px-5 text-left text-text-secondary text-[0.85rem] font-semibold uppercase tracking-[0.5px]">
                      Price
                    </th>
                    <th className="p-3.5 px-5 text-left text-text-secondary text-[0.85rem] font-semibold uppercase tracking-[0.5px]">
                      Duration
                    </th>
                    <th className="p-3.5 px-5 text-right text-text-secondary text-[0.85rem] font-semibold uppercase tracking-[0.5px]">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course, i) => (
                    <tr
                      key={course._id}
                      className={`transition-colors duration-150 hover:bg-[rgba(108,99,255,0.03)] ${i < courses.length - 1 ? "border-b border-border-color" : ""}`}
                    >
                      <td className="p-4 px-5">
                        <div className="flex items-center gap-3.5">
                          <div className="w-14 h-10 rounded-[var(--radius-sm)] overflow-hidden shrink-0 bg-bg-primary relative">
                            {course.thumbnail ? (
                              <Image
                                src={course.thumbnail}
                                alt={course.title}
                                fill
                                className="object-cover"
                                sizes="56px"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <FaBookOpen size={16} color="var(--accent-primary)" className="opacity-30" />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-text-primary text-[0.95rem]">
                              {course.title}
                            </p>
                            <p className="text-text-muted text-[0.8rem] mt-0.5">
                              {course.instructor || "StudyFy Instructor"}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 px-5">
                        <span className="inline-flex items-center gap-1 px-3 py-1 text-[0.75rem] font-semibold rounded-full bg-[rgba(108,99,255,0.15)] text-accent-primary uppercase tracking-[0.5px]">{course.category || "General"}</span>
                      </td>
                      <td className="p-4 px-5 font-semibold text-accent-primary">
                        ${course.price}
                      </td>
                      <td className="p-4 px-5 text-text-muted text-[0.9rem]">
                        <div className="flex items-center gap-1.5">
                          <FaClock size={12} /> {course.duration || "N/A"}
                        </div>
                      </td>
                      <td className="p-4 px-5">
                        <div className="flex gap-2 justify-end">
                          <Link
                            href={`/courses/${course._id}`}
                            className="inline-flex items-center gap-1.5 py-2 px-3.5 bg-[rgba(108,99,255,0.1)] border border-[rgba(108,99,255,0.2)] rounded-[var(--radius-sm)] text-accent-primary no-underline text-[0.85rem] font-medium transition-all duration-200 hover:bg-[rgba(108,99,255,0.2)]"
                          >
                            <FaEye size={12} /> View
                          </Link>
                          <button
                            onClick={() => handleDelete(course._id, course.title)}
                            disabled={deleting === course._id}
                            className={`inline-flex items-center gap-1.5 py-2 px-3.5 bg-[rgba(255,77,106,0.1)] border border-[rgba(255,77,106,0.2)] rounded-[var(--radius-sm)] text-danger text-[0.85rem] font-medium cursor-pointer transition-all duration-200 hover:bg-[rgba(255,77,106,0.2)] ${deleting === course._id ? "opacity-50 cursor-not-allowed" : ""}`}
                          >
                            {deleting === course._id ? <FaSpinner size={12} className="animate-spin" /> : <FaTrash size={12} />}
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="mobile-cards">
              {courses.map((course) => (
                <div
                  key={course._id}
                  className="bg-bg-card border border-border-color rounded-[var(--radius-md)] p-4 mb-3"
                >
                  <div className="flex gap-3 mb-3">
                    <div className="w-[60px] h-[44px] rounded-[var(--radius-sm)] overflow-hidden shrink-0 bg-bg-primary relative">
                      {course.thumbnail ? (
                        <Image src={course.thumbnail} alt={course.title} fill className="object-cover" sizes="60px" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <FaBookOpen size={16} color="var(--accent-primary)" className="opacity-30" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-text-primary text-[0.95rem]">{course.title}</p>
                      <p className="text-text-muted text-[0.8rem]">{course.instructor || "StudyFy Instructor"}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="inline-flex items-center gap-1 px-3 py-1 text-[0.75rem] font-semibold rounded-full bg-[rgba(108,99,255,0.15)] text-accent-primary uppercase tracking-[0.5px]">{course.category || "General"}</span>
                    <span className="font-semibold text-accent-primary">${course.price}</span>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/courses/${course._id}`} className="btn-secondary btn-sm flex-1 text-center text-[0.8rem]">
                      <FaEye size={11} /> View
                    </Link>
                    <button
                      onClick={() => handleDelete(course._id, course.title)}
                      disabled={deleting === course._id}
                      className="btn-danger btn-sm flex-1 text-[0.8rem]"
                    >
                      {deleting === course._id ? <FaSpinner size={11} className="animate-spin" /> : <FaTrash size={11} />} Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <style jsx global>{`
        .mobile-cards { display: none; }
        @media (max-width: 768px) {
          .desktop-table { display: none !important; }
          .mobile-cards { display: block !important; }
        }
      `}</style>
    </div>
  );
};

export default ManageCoursesPage;
