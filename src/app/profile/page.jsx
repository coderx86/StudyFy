"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FaCloudUploadAlt, FaSpinner, FaUser, FaEnvelope, FaIdBadge, FaImage } from "react-icons/fa";

const ProfilePage = () => {
  const { data: session, update, status } = useSession();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  const [name, setName] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [thumbnailPreview, setThumbnailPreview] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (session?.user) {
      setName(session.user.name || "");
      setThumbnailUrl(session.user.image || "");
      setThumbnailPreview(session.user.image || "");
    }
  }, [session, status, router]);

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
        toast.success("Image uploaded to server successfully!");
      } else {
        toast.error("Image upload failed. Please try again.");
        // Revert to old image
        setThumbnailPreview(session?.user?.image || "");
      }
    } catch (error) {
      toast.error("Image upload failed. Please try again.");
      setThumbnailPreview(session?.user?.image || "");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = { name, image: thumbnailUrl };

      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Profile saved successfully!");
        
        // Update local NextAuth Session
        await update({ name: payload.name, image: payload.image });

      } else {
        toast.error(data.error || "Failed to update profile.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <FaSpinner size={40} className="animate-spin text-accent-primary" />
      </div>
    );
  }

  if (!session?.user) return null;

  return (
    <div className="py-10 pb-20">
      <div className="site-container-sm">
        <div className="mb-9">
          <h1 className="text-4xl md:text-[2.25rem] font-bold mb-2 bg-linear-to-br from-text-primary to-accent-primary bg-clip-text text-transparent">
            My Profile
          </h1>
          <p className="text-text-secondary text-base">
            Update your personal profile details below.
          </p>
        </div>

        <div className="bg-bg-card border border-border-color rounded-2xl p-9 shadow-shadow-card">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            
            {/* Read-Only Info Section (Email & Role) */}
            <div className="grid md:grid-cols-2 gap-5 mb-2">
              <div className="p-4 bg-[rgba(108,99,255,0.05)] border border-[rgba(108,99,255,0.1)] rounded-[var(--radius-md)] flex items-center gap-3">
                 <FaEnvelope className="text-accent-primary" size={20} />
                 <div>
                   <p className="text-[0.8rem] text-text-muted uppercase tracking-wider font-semibold">Email</p>
                   <p className="text-text-primary font-medium">{session.user.email}</p>
                 </div>
              </div>

              <div className="p-4 bg-[rgba(0,212,170,0.05)] border border-[rgba(0,212,170,0.1)] rounded-[var(--radius-md)] flex items-center gap-3">
                 <FaIdBadge className="text-accent-secondary" size={20} />
                 <div>
                   <p className="text-[0.8rem] text-text-muted uppercase tracking-wider font-semibold">Role</p>
                   <p className="text-text-primary font-medium capitalize">{session.user.role || "User"}</p>
                 </div>
              </div>
            </div>

            {/* Profile Picture Upload */}
            <div>
              <label className="block mb-2 text-text-secondary font-medium text-[0.95rem]">Profile Picture</label>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                
                {/* Image Preview / Avatar */}
                <div className="relative w-32 h-32 shrink-0 rounded-full border-4 border-[rgba(108,99,255,0.2)] overflow-hidden bg-bg-primary flex items-center justify-center shadow-shadow-glow transition-all">
                  {thumbnailPreview ? (
                     <img
                       src={thumbnailPreview}
                       alt="Profile Preview"
                       className="w-full h-full object-cover"
                     />
                  ) : (
                    <FaUser size={48} className="text-text-muted opacity-50" />
                  )}
                  {uploading && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <FaSpinner size={24} color="#fff" className="animate-spin" />
                    </div>
                  )}
                </div>

                {/* Upload Action Area */}
                <div className="flex-1 w-full">
                  <div className={`border-2 border-dashed border-border-color rounded-[var(--radius-md)] p-5 text-center cursor-pointer transition-all duration-200 relative bg-[rgba(108,99,255,0.02)] hover:bg-[rgba(108,99,255,0.05)] hover:border-accent-primary`}>
                    <FaCloudUploadAlt size={28} color="var(--accent-primary)" className="mb-2 mx-auto disabled:opacity-50" />
                    <p className="text-text-primary text-[0.9rem] font-medium">Click or drag a new image</p>
                    <p className="text-text-muted text-[0.75rem] mt-1">Supported: JPG, PNG, WEBP</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploading || loading}
                      className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Editable Info: Name */}
            <div>
              <label className="block mb-1.5 text-text-secondary font-medium text-[0.9rem]">Full Name *</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required
                className="w-full px-4 py-3 bg-bg-input text-text-primary border border-border-color rounded-[var(--radius-md)] text-[0.95rem] transition-all duration-300 outline-none focus:border-accent-primary focus:ring-[3px] focus:ring-[rgba(108,99,255,0.15)] placeholder:text-text-muted"
              />
            </div>

            {/* Actions */}
            <div className="mt-4 pt-6 border-t border-border-color flex gap-4">
               <button
                  type="submit"
                  className="btn-primary flex-1 py-3 text-base justify-center"
                  disabled={loading || uploading || !name}
                >
                  {loading ? (
                    <>
                      <FaSpinner className="animate-spin" /> Saving Changes...
                    </>
                  ) : (
                    "Save Changes"
                  )}
               </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
