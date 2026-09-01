import React, { useState, useEffect } from "react";
import api from "../../config/api";
import {
  Users,
  Search,
  FileText,
  Trash2,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  Calendar,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { toast } from "react-toastify";

const AdminApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/careers/applications");
      if (res.data?.applications) {
        setApplications(res.data.applications);
      }
    } catch (err) {
      console.error("Error fetching applications:", err);
      toast.error("Failed to load candidate applications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleDelete = async (id) => {
    try {
      setDeleting(true);
      const res = await api.delete(`/api/careers/applications/${id}`);
      if (res.data?.success) {
        toast.success("Application removed successfully!");
        setDeleteConfirmId(null);
        fetchApplications();
      }
    } catch (err) {
      console.error("Delete application error:", err);
      toast.error(err.response?.data?.message || "Failed to delete application.");
    } finally {
      setDeleting(false);
    }
  };

  const filteredApplications = applications.filter((app) => {
    const term = search.toLowerCase();
    const fullName = `${app.firstName || ""} ${app.lastName || ""}`.toLowerCase();
    return (
      fullName.includes(term) ||
      app.email?.toLowerCase().includes(term) ||
      app.phone?.toLowerCase().includes(term) ||
      app.jobTitle?.toLowerCase().includes(term) ||
      app.city?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0e0e22] border border-white/10 p-6 rounded-2xl">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
              <Users size={20} />
            </div>
            <h2 className="text-xl font-bold font-['Poppins'] text-white">
              Candidate Applications
            </h2>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Total {applications.length} applications received &bull; Review submitted resumes and contact candidates
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchApplications}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition"
            title="Refresh list"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search applicants by name, email, job title, or city..."
          className="w-full pl-11 pr-4 py-3 bg-[#0e0e22] border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500 transition"
        />
      </div>

      {/* Applications Cards */}
      {loading ? (
        <div className="py-20 text-center flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400 text-sm">Loading applications...</p>
        </div>
      ) : filteredApplications.length === 0 ? (
        <div className="bg-[#0e0e22] border border-white/10 rounded-2xl p-12 text-center flex flex-col items-center gap-3">
          <Users size={40} className="text-gray-600" />
          <p className="text-gray-300 font-semibold text-lg">No applications found</p>
          <p className="text-gray-500 text-xs max-w-sm">
            {search ? "No applicants match your search query." : "Candidate applications submitted on the Careers page will appear here."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {filteredApplications.map((app) => (
            <div
              key={app._id}
              className="bg-[#0e0e22] border border-white/10 hover:border-emerald-500/40 rounded-2xl p-6 flex flex-col justify-between transition shadow-lg"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white font-['Poppins']">
                      {app.firstName} {app.lastName || ""}
                    </h3>
                    <div className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-semibold">
                      Applied for: {app.jobTitle || "Open Application"}
                    </div>
                  </div>

                  <span className="text-[11px] text-gray-500 flex items-center gap-1">
                    <Calendar size={12} />
                    {app.createdAt ? new Date(app.createdAt).toLocaleDateString() : "Recent"}
                  </span>
                </div>

                <div className="space-y-2 text-xs text-gray-300 bg-[#070714] p-4 rounded-xl border border-white/5">
                  <div className="flex items-center gap-2 truncate">
                    <Mail size={14} className="text-purple-400 flex-shrink-0" />
                    <a href={`mailto:${app.email}`} className="hover:text-purple-300 transition truncate">
                      {app.email}
                    </a>
                  </div>

                  {app.phone && (
                    <div className="flex items-center gap-2">
                      <Phone size={14} className="text-emerald-400 flex-shrink-0" />
                      <a href={`tel:${app.phone}`} className="hover:text-emerald-300 transition">
                        {app.phone}
                      </a>
                    </div>
                  )}

                  {(app.city || app.state || app.address) && (
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-indigo-400 flex-shrink-0" />
                      <span>
                        {[app.address, app.city, app.state, app.zip].filter(Boolean).join(", ")}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                {app.resume ? (
                  <a
                    href={app.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold transition"
                  >
                    <FileText size={14} />
                    <span>View Resume</span>
                    <ExternalLink size={12} />
                  </a>
                ) : (
                  <span className="text-xs text-gray-500">No resume attached</span>
                )}

                <button
                  onClick={() => setDeleteConfirmId(app._id)}
                  className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition text-xs flex items-center gap-1 font-medium"
                  title="Delete Application"
                >
                  <Trash2 size={13} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
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
                Delete Candidate Application?
              </h3>
            </div>
            <p className="text-gray-300 text-sm mb-6 leading-relaxed">
              Are you sure you want to remove this applicant entry? This action cannot be undone.
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

export default AdminApplications;
