import React, { useState, useEffect } from "react";
import api from "../../config/api";
import {
  MessageSquare,
  Search,
  Trash2,
  Mail,
  Phone,
  Calendar,
  AlertCircle,
  RefreshCw,
  Layers,
} from "lucide-react";
import { toast } from "react-toastify";

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/contacts/getContacts");
      if (res.data?.contacts) {
        setContacts(res.data.contacts);
      }
    } catch (err) {
      console.error("Error fetching contacts:", err);
      toast.error("Failed to load contact inquiries.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDelete = async (id) => {
    try {
      setDeleting(true);
      const res = await api.delete(`/api/contacts/${id}`);
      if (res.data?.success) {
        toast.success("Inquiry removed successfully!");
        setDeleteConfirmId(null);
        fetchContacts();
      }
    } catch (err) {
      console.error("Delete contact error:", err);
      toast.error(err.response?.data?.message || "Failed to delete inquiry.");
    } finally {
      setDeleting(false);
    }
  };

  const filteredContacts = contacts.filter((c) => {
    const term = search.toLowerCase();
    return (
      c.Name?.toLowerCase().includes(term) ||
      c.email?.toLowerCase().includes(term) ||
      c.phone?.toLowerCase().includes(term) ||
      c.service?.toLowerCase().includes(term) ||
      c.message?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0e0e22] border border-white/10 p-6 rounded-2xl">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
              <MessageSquare size={20} />
            </div>
            <h2 className="text-xl font-bold font-['Poppins'] text-white">
              Contact Inquiries & Leads
            </h2>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Total {contacts.length} client messages &bull; Inquiries submitted via Contact form and popup modal
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchContacts}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition"
            title="Refresh list"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
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
          placeholder="Search inquiries by client name, email, phone, or service..."
          className="w-full pl-11 pr-4 py-3 bg-[#0e0e22] border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500 transition"
        />
      </div>

      {/* Contact Cards */}
      {loading ? (
        <div className="py-20 text-center flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400 text-sm">Loading client inquiries...</p>
        </div>
      ) : filteredContacts.length === 0 ? (
        <div className="bg-[#0e0e22] border border-white/10 rounded-2xl p-12 text-center flex flex-col items-center gap-3">
          <MessageSquare size={40} className="text-gray-600" />
          <p className="text-gray-300 font-semibold text-lg">No inquiries found</p>
          <p className="text-gray-500 text-xs max-w-sm">
            {search ? "No inquiries match your search filter." : "Client messages from the website will appear here in real time."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredContacts.map((contact) => (
            <div
              key={contact._id}
              className="bg-[#0e0e22] border border-white/10 hover:border-amber-500/40 rounded-2xl p-6 flex flex-col justify-between transition shadow-lg"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white font-['Poppins']">
                      {contact.Name}
                    </h3>
                    {contact.service ? (
                      <span className="inline-flex items-center gap-1 mt-1 px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-semibold">
                        <Layers size={11} />
                        {contact.service}
                      </span>
                    ) : (
                      <span className="inline-block mt-1 text-xs text-gray-500">General Inquiry</span>
                    )}
                  </div>

                  <span className="text-[11px] text-gray-500 flex items-center gap-1">
                    <Calendar size={12} />
                    {contact.createdAt ? new Date(contact.createdAt).toLocaleDateString() : "Recent"}
                  </span>
                </div>

                <div className="space-y-2 text-xs text-gray-300 bg-[#070714] p-3.5 rounded-xl border border-white/5 mb-3">
                  <div className="flex items-center gap-2 truncate">
                    <Mail size={14} className="text-amber-400 flex-shrink-0" />
                    <a href={`mailto:${contact.email}`} className="hover:text-amber-300 transition truncate">
                      {contact.email}
                    </a>
                  </div>

                  {contact.phone && (
                    <div className="flex items-center gap-2">
                      <Phone size={14} className="text-emerald-400 flex-shrink-0" />
                      <a href={`tel:${contact.phone}`} className="hover:text-emerald-300 transition">
                        {contact.phone}
                      </a>
                    </div>
                  )}
                </div>

                <div className="bg-[#0b0b1a] p-3.5 rounded-xl border border-white/5 text-gray-300 text-xs leading-relaxed whitespace-pre-line">
                  <p className="text-gray-500 text-[10px] uppercase font-semibold tracking-wider mb-1">
                    Message:
                  </p>
                  "{contact.message}"
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                <a
                  href={`mailto:${contact.email}?subject=RE: Inquiry on LAX360`}
                  className="text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1"
                >
                  <Mail size={13} />
                  <span>Reply via Email</span>
                </a>

                <button
                  onClick={() => setDeleteConfirmId(contact._id)}
                  className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition text-xs flex items-center gap-1 font-medium"
                  title="Delete Inquiry"
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
                Delete Client Inquiry?
              </h3>
            </div>
            <p className="text-gray-300 text-sm mb-6 leading-relaxed">
              Are you sure you want to delete this message? This action cannot be undone.
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

export default AdminContacts;
