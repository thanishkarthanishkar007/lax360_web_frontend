import React, { useState, useEffect } from "react";
import api from "../../config/api";
import {
  Briefcase,
  Plus,
  Edit2,
  Trash2,
  Search,
  X,
  Check,
  MapPin,
  Clock,
  AlertCircle,
  RefreshCw,
  Eye,
} from "lucide-react";
import { toast } from "react-toastify";

const AdminJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // View Details Modal
  const [viewJob, setViewJob] = useState(null);

  // Delete Confirmation State
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    location: "Salem / Remote",
    type: "Full Time",
    description: "",
  });

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/jobs/getJob");
      if (res.data?.jobs) {
        setJobs(res.data.jobs);
      } else if (Array.isArray(res.data)) {
        setJobs(res.data);
      }
    } catch (err) {
      console.error("Error fetching jobs:", err);
      toast.error("Failed to load jobs from backend.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const openAddModal = () => {
    setIsEditing(false);
    setSelectedJob(null);
    setFormData({
      title: "",
      location: "Salem / Hybrid",
      type: "Full Time",
      description: "",
    });
    setModalOpen(true);
  };

  const openEditModal = (job) => {
    setIsEditing(true);
    setSelectedJob(job);
    setFormData({
      title: job.title || "",
      location: job.location || "",
      type: job.type || "Full Time",
      description: job.description || "",
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.location.trim() || !formData.description.trim()) {
      toast.error("Please fill all required fields.");
      return;
    }

    try {
      setSubmitting(true);
      const jobId = selectedJob?._id || selectedJob?.id;

      if (isEditing && jobId) {
        const res = await api.put(`/api/jobs/${jobId}`, formData);
        if (res.data?.success) {
          toast.success("Job updated successfully!");
          setModalOpen(false);
          fetchJobs();
        }
      } else {
        const res = await api.post("/api/jobs/createJob", formData);
        if (res.data?.success || res.status === 201) {
          toast.success("Job opening published successfully!");
          setModalOpen(false);
          fetchJobs();
        }
      }
    } catch (err) {
      console.error("Save job error:", err);
      toast.error(err.response?.data?.message || "Failed to save job opening.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setDeleting(true);
      const res = await api.delete(`/api/jobs/${id}`);
      if (res.data?.success) {
        toast.success("Job removed successfully!");
        setDeleteConfirmId(null);
        fetchJobs();
      }
    } catch (err) {
      console.error("Delete job error:", err);
      toast.error(err.response?.data?.message || "Failed to delete job.");
    } finally {
      setDeleting(false);
    }
  };

  const filteredJobs = jobs.filter((j) => {
    const term = search.toLowerCase();
    return (
      j.title?.toLowerCase().includes(term) ||
      j.location?.toLowerCase().includes(term) ||
      j.type?.toLowerCase().includes(term) ||
      j.description?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0e0e22] border border-white/10 p-6 rounded-2xl">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
              <Briefcase size={20} />
            </div>
            <h2 className="text-xl font-bold font-['Poppins'] text-white">
              Jobs & Careers Management
            </h2>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Total {jobs.length} open positions &bull; Published jobs are automatically displayed on the public Careers page
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchJobs}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition"
            title="Refresh list"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          </button>
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-lg shadow-purple-600/30 transition"
          >
            <Plus size={16} />
            <span>Post New Job</span>
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search jobs by title, location, or type..."
          className="w-full pl-11 pr-4 py-3 bg-[#0e0e22] border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500 transition"
        />
      </div>

      {/* Jobs List */}
      {loading ? (
        <div className="py-20 text-center flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400 text-sm">Loading jobs from database...</p>
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="bg-[#0e0e22] border border-white/10 rounded-2xl p-12 text-center flex flex-col items-center gap-3">
          <Briefcase size={40} className="text-gray-600" />
          <p className="text-gray-300 font-semibold text-lg">No job openings found</p>
          <p className="text-gray-500 text-xs max-w-sm">
            {search ? "No openings match your search criteria." : "Create your first job listing to display it on the Careers page."}
          </p>
          {!search && (
            <button
              onClick={openAddModal}
              className="mt-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-xl text-white text-xs font-semibold transition"
            >
              Post First Job
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredJobs.map((job, idx) => {
            const jobId = job._id || job.id || `job-${idx}`;
            return (
              <div
                key={jobId}
                className="bg-[#0e0e22] border border-white/10 hover:border-purple-500/40 rounded-2xl p-6 flex flex-col justify-between transition-all duration-200 shadow-lg group"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-white font-['Poppins'] group-hover:text-purple-300 transition-colors">
                        {job.title}
                      </h3>
                      <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <MapPin size={13} className="text-purple-400" />
                          {job.location || "Remote / Salem"}
                        </span>
                        <span>&bull;</span>
                        <span className="flex items-center gap-1">
                          <Clock size={13} className="text-indigo-400" />
                          {job.type || "Full Time"}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${
                        job.type === "Full Time"
                          ? "bg-purple-500/20 text-purple-300 border-purple-500/30"
                          : job.type === "Part Time"
                          ? "bg-blue-500/20 text-blue-300 border-blue-500/30"
                          : job.type === "Internship"
                          ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                          : "bg-amber-500/20 text-amber-300 border-amber-500/30"
                      }`}
                    >
                      {job.type || "Full Time"}
                    </span>
                  </div>

                  <p className="text-gray-400 text-xs line-clamp-3 leading-relaxed mt-3">
                    {job.description}
                  </p>
                </div>

                {/* Card Footer Actions */}
                <div className="pt-4 mt-5 border-t border-white/10 flex items-center justify-between">
                  <button
                    onClick={() => setViewJob(job)}
                    className="text-xs text-gray-400 hover:text-purple-300 flex items-center gap-1 transition"
                  >
                    <Eye size={13} />
                    <span>View Details</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(job)}
                      className="p-2 rounded-lg bg-white/5 hover:bg-purple-600/20 hover:text-purple-300 text-gray-300 border border-white/10 hover:border-purple-500/30 transition text-xs flex items-center gap-1 font-medium"
                      title="Edit Job"
                    >
                      <Edit2 size={13} />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => setDeleteConfirmId(jobId)}
                      className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition text-xs flex items-center gap-1 font-medium"
                      title="Delete Job"
                    >
                      <Trash2 size={13} />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add / Edit Job Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#121226] border border-white/15 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6 border-b border-white/10 flex items-center justify-between sticky top-0 bg-[#121226] z-10">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
                  <Briefcase size={18} />
                </div>
                <h3 className="text-lg font-bold text-white font-['Poppins']">
                  {isEditing ? "Edit Job Opening" : "Post New Job Opening"}
                </h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                  Job Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Senior Full Stack Developer"
                  required
                  className="w-full px-4 py-3 bg-[#090915] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Salem / Bangalore / Hybrid"
                    required
                    className="w-full px-4 py-3 bg-[#090915] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                    Employment Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-4 py-3 bg-[#090915] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-purple-500"
                  >
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                  Job Description & Requirements *
                </label>
                <textarea
                  rows="6"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe role responsibilities, required skills, and qualifications..."
                  required
                  className="w-full px-4 py-3 bg-[#090915] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-purple-500 resize-none"
                />
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-purple-600/30 transition disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Check size={14} />
                      <span>{isEditing ? "Save Changes" : "Publish Job Opening"}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Job Modal */}
      {viewJob && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#121226] border border-white/15 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl p-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h3 className="text-xl font-bold text-white font-['Poppins']">{viewJob.title}</h3>
              <button
                onClick={() => setViewJob(null)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>
            <div className="my-4 flex items-center gap-3 text-xs text-gray-300">
              <span className="px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                {viewJob.type}
              </span>
              <span>&bull;</span>
              <span>{viewJob.location}</span>
            </div>
            <div className="bg-[#090915] p-4 rounded-xl border border-white/10 text-gray-300 text-sm whitespace-pre-line leading-relaxed">
              {viewJob.description}
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setViewJob(null)}
                className="px-5 py-2 bg-white/10 hover:bg-white/15 text-white text-xs font-semibold rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#121226] border border-red-500/30 rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <div className="flex items-center gap-3 text-red-400 mb-4">
              <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20">
                <AlertCircle size={22} />
              </div>
              <h3 className="text-lg font-bold text-white font-['Poppins']">
                Delete Job Opening?
              </h3>
            </div>
            <p className="text-gray-300 text-sm mb-6 leading-relaxed">
              Are you sure you want to remove this job opening? It will immediately disappear from the public Careers page.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDelete(deleteConfirmId)}
                disabled={deleting}
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold transition flex items-center gap-2 disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminJobs;
