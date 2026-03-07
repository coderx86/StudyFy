"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FaCloudUploadAlt, FaImage, FaSpinner } from "react-icons/fa";

const AddCoursePage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [thumbnailPreview, setThumbnailPreview] = useState("");

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setThumbnailPreview(URL.createObjectURL(file));

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        { method: "POST", body: formData }
      );
      const data = await res.json();

      if (data.success) {
        setThumbnailUrl(data.data.display_url);
        toast.success("Image uploaded successfully!");
      } else {
        toast.error("Image upload failed. Please try again.");
        setThumbnailPreview("");
      }
    } catch (error) {
      toast.error("Image upload failed. Please try again.");
      setThumbnailPreview("");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const courseData = {
      title: form.title.value,
      shortDescription: form.shortDescription.value,
      fullDescription: form.fullDescription.value,
      price: form.price.value,
      duration: form.duration.value,
      instructor: form.instructor.value || session?.user?.name || "StudyFy Instructor",
      category: form.category.value || "General",
      thumbnail: thumbnailUrl,
    };

    try {
      const res = await fetch("/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(courseData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Course added successfully!");
        form.reset();
        setThumbnailUrl("");
        setThumbnailPreview("");
        router.push("/manage-courses");
      } else {
        toast.error(data.error || "Failed to add course");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-10 pb-20">
      <div className="site-container-sm">
        <div className="mb-9">
          <h1 className="text-4xl md:text-[2.25rem] font-bold mb-2 bg-linear-to-br from-text-primary to-accent-primary bg-clip-text text-transparent">Add New Course</h1>
          <p className="text-text-secondary text-base">
            Fill in the details below to create a new course
          </p>
        </div>

        <div className="bg-bg-card border border-border-color rounded-2xl p-9">
          <form onSubmit={handleSubmit}>
            {/* Title */}
            <div className="mb-5">
              <label className="block mb-1.5 text-text-secondary font-medium text-[0.9rem]">Course Title *</label>
              <input
                type="text"
                name="title"
                placeholder="e.g. Complete Web Development Bootcamp"
                required
                className="w-full px-4 py-3 bg-bg-input text-text-primary border border-border-color rounded-[var(--radius-md)] text-[0.95rem] transition-all duration-300 outline-none focus:border-accent-primary focus:ring-[3px] focus:ring-[rgba(108,99,255,0.15)] placeholder:text-text-muted"
              />
            </div>

            {/* Short Description */}
            <div className="mb-5">
              <label className="block mb-1.5 text-text-secondary font-medium text-[0.9rem]">Short Description *</label>
              <input
                type="text"
                name="shortDescription"
                placeholder="A brief overview of the course (1-2 lines)"
                required
                maxLength={200}
                className="w-full px-4 py-3 bg-bg-input text-text-primary border border-border-color rounded-[var(--radius-md)] text-[0.95rem] transition-all duration-300 outline-none focus:border-accent-primary focus:ring-[3px] focus:ring-[rgba(108,99,255,0.15)] placeholder:text-text-muted"
              />
            </div>

            {/* Full Description */}
            <div className="mb-5">
              <label className="block mb-1.5 text-text-secondary font-medium text-[0.9rem]">Full Description</label>
              <textarea
                name="fullDescription"
                placeholder="Detailed course description with what students will learn..."
                rows={5}
                className="w-full px-4 py-3 bg-bg-input text-text-primary border border-border-color rounded-[var(--radius-md)] text-[0.95rem] transition-all duration-300 outline-none focus:border-accent-primary focus:ring-[3px] focus:ring-[rgba(108,99,255,0.15)] placeholder:text-text-muted resize-y min-h-[100px]"
              />
            </div>

            {/* Price + Duration */}
            <div className="grid grid-cols-2 gap-4 mb-5">
              <div>
                <label className="block mb-1.5 text-text-secondary font-medium text-[0.9rem]">Price ($) *</label>
                <input
                  type="number"
                  name="price"
                  placeholder="49.99"
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-3 bg-bg-input text-text-primary border border-border-color rounded-[var(--radius-md)] text-[0.95rem] transition-all duration-300 outline-none focus:border-accent-primary focus:ring-[3px] focus:ring-[rgba(108,99,255,0.15)] placeholder:text-text-muted"
                />
              </div>
              <div>
                <label className="block mb-1.5 text-text-secondary font-medium text-[0.9rem]">Duration</label>
                <input
                  type="text"
                  name="duration"
                  placeholder="e.g. 24 hours"
                  className="w-full px-4 py-3 bg-bg-input text-text-primary border border-border-color rounded-[var(--radius-md)] text-[0.95rem] transition-all duration-300 outline-none focus:border-accent-primary focus:ring-[3px] focus:ring-[rgba(108,99,255,0.15)] placeholder:text-text-muted"
                />
              </div>
            </div>

            {/* Instructor + Category */}
            <div className="grid grid-cols-2 gap-4 mb-5">
              <div>
                <label className="block mb-1.5 text-text-secondary font-medium text-[0.9rem]">Instructor</label>
                <input
                  type="text"
                  name="instructor"
                  placeholder={session?.user?.name || "Instructor name"}
                  className="w-full px-4 py-3 bg-bg-input text-text-primary border border-border-color rounded-[var(--radius-md)] text-[0.95rem] transition-all duration-300 outline-none focus:border-accent-primary focus:ring-[3px] focus:ring-[rgba(108,99,255,0.15)] placeholder:text-text-muted"
                />
              </div>
              <div>
                <label className="block mb-1.5 text-text-secondary font-medium text-[0.9rem]">Category</label>
                <select name="category" className="w-full px-4 py-3 bg-bg-input text-text-primary border border-border-color rounded-[var(--radius-md)] text-[0.95rem] transition-all duration-300 outline-none focus:border-accent-primary focus:ring-[3px] focus:ring-[rgba(108,99,255,0.15)] cursor-pointer">
                  <option value="General">General</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Design">Design</option>
                  <option value="Mobile Development">Mobile Development</option>
                  <option value="Cloud Computing">Cloud Computing</option>
                  <option value="Cybersecurity">Cybersecurity</option>
                  <option value="Marketing">Marketing</option>
                </select>
              </div>
            </div>

            {/* Image Upload */}
            <div className="mb-7">
              <label className="block mb-1.5 text-text-secondary font-medium text-[0.9rem]">Course Thumbnail</label>
              <div className={`border-2 border-dashed border-border-color rounded-[var(--radius-md)] p-8 text-center cursor-pointer transition-all duration-200 relative overflow-hidden ${thumbnailPreview ? "bg-transparent" : "bg-[rgba(108,99,255,0.03)]"}`}>
                {thumbnailPreview ? (
                  <div className="relative">
                    <img
                      src={thumbnailPreview}
                      alt="Preview"
                      className="max-w-full max-h-[200px] rounded-[var(--radius-sm)] object-cover mx-auto"
                    />
                    {uploading && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-[var(--radius-sm)]">
                        <FaSpinner size={24} color="#fff" className="animate-spin" />
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <FaCloudUploadAlt size={36} color="var(--text-muted)" className="mb-2 mx-auto" />
                    <p className="text-text-muted text-[0.9rem]">
                      Click or drag to upload an image
                    </p>
                    <p className="text-text-muted text-[0.8rem] mt-1">
                      Supported: JPG, PNG, WEBP
                    </p>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
              {thumbnailUrl && (
                <p className="text-success text-[0.85rem] mt-2 flex items-center gap-1.5">
                  <FaImage size={12} /> Image uploaded successfully
                </p>
              )}
            </div>

            <button
              type="submit"
              className="btn-primary w-full py-3.5 text-base"
              disabled={loading || uploading}
            >
              {loading ? "Adding Course..." : "Add Course"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCoursePage;
