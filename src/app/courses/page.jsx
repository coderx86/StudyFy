"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaSearch, FaFilter, FaBookOpen, FaClock, FaDollarSign, FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(6);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("/api/courses");
        const data = await res.json();
        setCourses(data);
        setFilteredCourses(data);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    let result = courses;

    if (search.trim()) {
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(search.toLowerCase()) ||
          c.shortDescription?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== "All") {
      result = result.filter((c) => c.category === category);
    }

    setFilteredCourses(result);
    setCurrentPage(1);
  }, [search, category, courses]);

  const categories = ["All", ...new Set(courses.map((c) => c.category).filter(Boolean))];

  // Pagination
  const totalPages = Math.ceil(filteredCourses.length / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const paginatedCourses = filteredCourses.slice(startIndex, startIndex + perPage);

  const handlePerPageChange = (value) => {
    setPerPage(Number(value));
    setCurrentPage(1);
  };

  return (
    <div className="py-10 pb-20">
      <div className="site-container">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-[2.5rem] font-bold mb-2 bg-linear-to-br from-text-primary to-accent-primary bg-clip-text text-transparent">
            Our Courses
          </h1>
          <p className="text-text-secondary text-[1.1rem] max-w-[600px] mx-auto mt-2">
            Explore our comprehensive collection of expert-led courses designed to help you succeed in your career
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex gap-4 mb-10 flex-wrap">
          <div className="flex-1 min-w-[280px] relative">
            <FaSearch
              size={14}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
            />
            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-3 pl-[42px] bg-bg-input text-text-primary border border-border-color rounded-[var(--radius-md)] text-[0.95rem] transition-all duration-300 outline-none focus:border-accent-primary focus:ring-[3px] focus:ring-[rgba(108,99,255,0.15)] placeholder:text-text-muted"
            />
          </div>
          <div className="relative min-w-[180px]">
            <FaFilter
              size={12}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 pl-[38px] bg-bg-input text-text-primary border border-border-color rounded-[var(--radius-md)] text-[0.95rem] transition-all duration-300 outline-none focus:border-accent-primary focus:ring-[3px] focus:ring-[rgba(108,99,255,0.15)] cursor-pointer appearance-auto"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-[60px]">
            <div className="loading-spinner" />
            <p className="text-text-muted mt-4">Loading courses...</p>
          </div>
        )}

        {/* No Results */}
        {!loading && filteredCourses.length === 0 && (
          <div className="text-center py-[60px]">
            <FaBookOpen size={48} color="var(--text-muted)" className="opacity-30 mb-4 mx-auto" />
            <p className="text-text-muted text-[1.1rem]">No courses found</p>
            <p className="text-text-muted text-[0.9rem] mt-2">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}

        {/* Course Grid */}
        {!loading && paginatedCourses.length > 0 && (
          <>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6">
              {paginatedCourses.map((course) => (
                <div key={course._id} className="bg-bg-card border border-border-color rounded-2xl overflow-hidden transition-all shadow-shadow-card hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(108,99,255,0.15)] hover:border-[var(--glass-border)] flex flex-col">
                  <div className="relative h-[200px] bg-bg-primary">
                    {course.thumbnail ? (
                      <Image
                        src={course.thumbnail}
                        alt={course.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FaBookOpen size={48} color="var(--accent-primary)" className="opacity-30" />
                      </div>
                    )}
                    {course.category && (
                      <div className="inline-flex items-center gap-1 px-3 py-1 text-[0.75rem] font-semibold rounded-full bg-[rgba(108,99,255,0.15)] text-accent-primary uppercase tracking-[0.5px] absolute top-3 left-3">
                        {course.category}
                      </div>
                    )}
                  </div>

                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-[1.1rem] font-semibold mb-2 text-text-primary">
                      {course.title}
                    </h3>
                    <p className="text-text-muted text-[0.9rem] mb-4 flex-1 line-clamp-2">
                      {course.shortDescription}
                    </p>

                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1.5 text-accent-primary">
                        <FaDollarSign size={14} />
                        <span className="font-bold text-[1.15rem]">{course.price}</span>
                      </div>
                      {course.duration && (
                        <div className="flex items-center gap-1.5 text-text-muted text-[0.85rem]">
                          <FaClock size={12} />
                          <span>{course.duration}</span>
                        </div>
                      )}
                    </div>

                    <Link href={`/courses/${course._id}`} className="btn-primary btn-sm text-center">
                      View Details <FaArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {filteredCourses.length > 0 && (
              <div className="flex justify-between items-center mt-10 p-5 px-6 bg-bg-card border border-border-color rounded-[var(--radius-md)] flex-wrap gap-4">
                {/* Per Page Dropdown */}
                <div className="flex items-center gap-[10px]">
                  <span className="text-text-muted text-[0.9rem]">Show</span>
                  <select
                    value={perPage}
                    onChange={(e) => handlePerPageChange(e.target.value)}
                    className="py-1.5 px-2.5 bg-bg-input text-text-primary border border-border-color rounded-[var(--radius-sm)] text-[0.9rem] cursor-pointer"
                  >
                    <option value={6}>6</option>
                    <option value={12}>12</option>
                    <option value={24}>24</option>
                  </select>
                  <span className="text-text-muted text-[0.9rem]">per page</span>
                </div>

                {/* Page Info */}
                <span className="text-text-secondary text-[0.9rem]">
                  Showing {startIndex + 1}–{Math.min(startIndex + perPage, filteredCourses.length)} of {filteredCourses.length}
                </span>

                {/* Prev / Next Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className={`flex items-center gap-1.5 py-2 px-4 border border-[rgba(108,99,255,0.2)] rounded-[var(--radius-sm)] text-[0.85rem] font-medium transition-all duration-200 ${
                      currentPage === 1
                        ? "bg-[rgba(108,99,255,0.05)] text-text-muted cursor-not-allowed"
                        : "bg-[rgba(108,99,255,0.12)] text-accent-primary cursor-pointer"
                    }`}
                  >
                    <FaChevronLeft size={12} /> Prev
                  </button>
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages || totalPages === 0}
                    className={`flex items-center gap-1.5 py-2 px-4 border border-[rgba(108,99,255,0.2)] rounded-[var(--radius-sm)] text-[0.85rem] font-medium transition-all duration-200 ${
                      currentPage === totalPages || totalPages === 0
                        ? "bg-[rgba(108,99,255,0.05)] text-text-muted cursor-not-allowed"
                        : "bg-[rgba(108,99,255,0.12)] text-accent-primary cursor-pointer"
                    }`}
                  >
                    Next <FaChevronRight size={12} />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;
