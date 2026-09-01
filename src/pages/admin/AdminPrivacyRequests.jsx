import React, { useState, useEffect } from "react";
import api from "../../config/api";
import {
  Shield,
  Search,
  Trash2,
  Mail,
  Phone,
  Calendar,
  AlertCircle,
  RefreshCw,
  Eye,
  Edit3,
  UserX,
  AlertOctagon,
  CheckCircle2,
  Clock,
  X,
  Check,
} from "lucide-react";
import { toast } from "react-toastify";

const AdminPrivacyRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Edit / Status modal
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [editStatus, setEditStatus] = useState("Pending");
  const [resolutionNotes, setResolutionNotes] = useState("");
  const [updating, setUpdating] = useState(false);

  // Delete modal
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/dpdp/requests");
      if (res.data?.requests) {
        setRequests(res.data.requests);
      }
    } catch (err) {
      console.error("Error fetching DPDP requests:", err);
      toast.error("Failed to load privacy requests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleOpenStatusModal = (req) => {
    setSelectedRequest(req);
    setEditStatus(req.status || "Pending");
    setResolutionNotes(req.resolutionNotes || "");
  };

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    if (!selectedRequest) return;

    try {
      setUpdating(true);
      const res = await api.put(`/api/dpdp/requests/${selectedRequest._id}`, {
        status: editStatus,
        resolutionNotes,
      });

      if (res.data?.success) {
        toast.success("Request status updated successfully!");
        setSelectedRequest(null);
        fetchRequests();
      }
    } catch (err) {
      console.error("Update request error:", err);
      toast.error(err.response?.data?.message || "Failed to update request.");
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setDeleting(true);
      const res = await api.delete(`/api/dpdp/requests/${id}`);
      if (res.data?.success) {
        toast.success("Privacy request deleted.");
        setDeleteConfirmId(null);
        fetchRequests();
      }
    } catch (err) {
      console.error("Delete request error:", err);
      toast.error(err.response?.data?.message || "Failed to delete request.");
    } finally {
      setDeleting(false);
    }
  };

  const getTypeBadge = (type) => {
    switch (type) {
      case "view_data":
        return { label: "View Data", bg: "bg-blue-500/20 text-blue-300 border-blue-500/30", icon: Eye };
      case "correct_data":
        return { label: "Correct Data", bg: "bg-purple-500/20 text-purple-300 border-purple-500/30", icon: Edit3 };
      case "erasure":
        return { label: "Request Erasure", bg: "bg-red-500/20 text-red-300 border-red-500/30", icon: Trash2 };
      case "withdraw_consent":
        return { label: "Withdraw Consent", bg: "bg-amber-500/20 text-amber-300 border-amber-500/30", icon: UserX };
      case "grievance":
        return { label: "Privacy Grievance", bg: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30", icon: AlertOctagon };
      default:
        return { label: type, bg: "bg-gray-500/20 text-gray-300 border-gray-500/30", icon: Shield };
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Resolved":
        return "bg-green-500/20 text-green-300 border-green-500/30";
      case "In Review":
        return "bg-amber-500/20 text-amber-300 border-amber-500/30";
      default:
        return "bg-purple-500/20 text-purple-300 border-purple-500/30";
    }
  };

  const filteredRequests = requests.filter((r) => {
    const term = search.toLowerCase();
    const matchesSearch =
      r.name?.toLowerCase().includes(term) ||
      r.email?.toLowerCase().includes(term) ||
      r.requestType?.toLowerCase().includes(term) ||
      r.details?.toLowerCase().includes(term);

    const matchesStatus = statusFilter === "all" || r.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0e0e22] border border-white/10 p-6 rounded-2xl">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
              <Shield size={20} />
            </div>
            <h2 className="text-xl font-bold font-['Poppins'] text-white">
              DPDP Privacy Requests & Grievances
            </h2>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Total {requests.length} requests received &bull; Fulfill Data Principal rights within statutory timeframes under DPDP Act 2023
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchRequests}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition"
            title="Refresh list"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by principal name, email, request type, or keyword..."
            className="w-full pl-11 pr-4 py-3 bg-[#0e0e22] border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500 transition"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-3 bg-[#0e0e22] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-purple-500 cursor-pointer"
        >
          <option value="all">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="In Review">In Review</option>
          <option value="Resolved">Resolved</option>
        </select>
      </div>

      {/* Requests Grid */}
      {loading ? (
        <div className="py-20 text-center flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400 text-sm">Loading DPDP privacy requests...</p>
        </div>
      ) : filteredRequests.length === 0 ? (
        <div className="bg-[#0e0e22] border border-white/10 rounded-2xl p-12 text-center flex flex-col items-center gap-3">
          <Shield size={40} className="text-gray-600" />
          <p className="text-gray-300 font-semibold text-lg">No privacy requests found</p>
          <p className="text-gray-500 text-xs max-w-sm">
            {search || statusFilter !== "all"
              ? "No requests match your selected filters."
              : "Data Principal rights requests submitted via the Privacy Centre will appear here."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {filteredRequests.map((req) => {
            const typeInfo = getTypeBadge(req.requestType);
            const TypeIcon = typeInfo.icon;

            return (
              <div
                key={req._id}
                className="bg-[#0e0e22] border border-white/10 hover:border-purple-500/40 rounded-2xl p-6 flex flex-col justify-between transition shadow-lg"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white font-['Poppins']">
                        {req.name}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 mt-1.5">
                        <span
                          className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${typeInfo.bg}`}
                        >
                          <TypeIcon size={12} />
                          {typeInfo.label}
                        </span>

                        <span
                          className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${getStatusBadge(
                            req.status
                          )}`}
                        >
                          {req.status || "Pending"}
                        </span>
                      </div>
                    </div>

                    <span className="text-[11px] text-gray-500 flex items-center gap-1 flex-shrink-0">
                      <Calendar size={12} />
                      {req.createdAt ? new Date(req.createdAt).toLocaleDateString() : "Recent"}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs text-gray-300 bg-[#070714] p-3.5 rounded-xl border border-white/5 mb-3">
                    <div className="flex items-center gap-2 truncate">
                      <Mail size={14} className="text-purple-400 flex-shrink-0" />
                      <a href={`mailto:${req.email}`} className="hover:text-purple-300 transition truncate">
                        {req.email}
                      </a>
                    </div>
                    {req.phone && (
                      <div className="flex items-center gap-2">
                        <Phone size={14} className="text-emerald-400 flex-shrink-0" />
                        <a href={`tel:${req.phone}`} className="hover:text-emerald-300 transition">
                          {req.phone}
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="bg-[#0b0b1a] p-3.5 rounded-xl border border-white/5 text-gray-300 text-xs leading-relaxed whitespace-pre-line">
                    <p className="text-gray-500 text-[10px] uppercase font-semibold tracking-wider mb-1">
                      Request Specification:
                    </p>
                    "{req.details}"
                  </div>

                  {req.resolutionNotes && (
                    <div className="mt-3 p-3 rounded-xl bg-purple-950/30 border border-purple-500/20 text-xs text-purple-200">
                      <p className="text-purple-400 text-[10px] uppercase font-bold tracking-wider mb-0.5">
                        Resolution Notes:
                      </p>
                      {req.resolutionNotes}
                    </div>
                  )}
                </div>

                {/* Card Actions */}
                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                  <button
                    onClick={() => handleOpenStatusModal(req)}
                    className="text-xs px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-200 hover:text-white border border-white/10 transition flex items-center gap-1.5"
                  >
                    <Clock size={13} />
                    <span>Update Status</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <a
                      href={`mailto:${req.email}?subject=RE: DPDP Privacy Request (${typeInfo.label})`}
                      className="p-2 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/20 transition text-xs flex items-center gap-1"
                      title="Reply to Data Principal"
                    >
                      <Mail size={13} />
                    </a>

                    <button
                      onClick={() => setDeleteConfirmId(req._id)}
                      className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition text-xs flex items-center gap-1"
                      title="Delete Request"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Update Status Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#121226] border border-white/15 rounded-2xl w-full max-w-md shadow-2xl p-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <h3 className="text-lg font-bold text-white font-['Poppins']">
                Update Request Status
              </h3>
              <button
                onClick={() => setSelectedRequest(null)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleUpdateStatus} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                  Status
                </label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#090915] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-purple-500"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Review">In Review</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                  Resolution / Officer Notes
                </label>
                <textarea
                  rows="3"
                  value={resolutionNotes}
                  onChange={(e) => setResolutionNotes(e.target.value)}
                  placeholder="Notes on verification or steps taken to resolve this request..."
                  className="w-full px-4 py-2.5 bg-[#090915] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-purple-500 resize-none"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedRequest(null)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-lg shadow-purple-600/30 transition disabled:opacity-50"
                >
                  {updating ? "Saving..." : "Save Status"}
                </button>
              </div>
            </form>
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
                Delete Privacy Request?
              </h3>
            </div>
            <p className="text-gray-300 text-sm mb-6 leading-relaxed">
              Are you sure you want to delete this Data Principal request record? This action cannot be undone.
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

export default AdminPrivacyRequests;
