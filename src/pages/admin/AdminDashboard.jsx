import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../config/api";
import {
  Layers,
  Briefcase,
  Users,
  MessageSquare,
  ArrowRight,
  TrendingUp,
  PlusCircle,
  Clock,
  CheckCircle2,
  FileText,
  Mail,
} from "lucide-react";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalJobs: 0,
    totalServices: 0,
    totalApplications: 0,
    totalContacts: 0,
    recentApplications: [],
    recentContacts: [],
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/admin/stats");
      if (res.data?.success) {
        setStats(res.data.stats);
      }
    } catch (err) {
      console.error("Error loading dashboard stats:", err);
      // Fallback local fetch
      try {
        const [jobsRes, servicesRes, appsRes, contactsRes] = await Promise.allSettled([
          api.get("/api/jobs/getJob"),
          api.get("/api/services/getServices"),
          api.get("/api/careers/applications"),
          api.get("/api/contacts/getContacts"),
        ]);

        const jobsCount =
          jobsRes.status === "fulfilled" && Array.isArray(jobsRes.value.data?.jobs)
            ? jobsRes.value.data.jobs.length
            : 0;

        const servicesCount =
          servicesRes.status === "fulfilled" && Array.isArray(servicesRes.value.data?.services)
            ? servicesRes.value.data.services.length
            : 9;

        const apps =
          appsRes.status === "fulfilled" && Array.isArray(appsRes.value.data?.applications)
            ? appsRes.value.data.applications
            : [];

        const contacts =
          contactsRes.status === "fulfilled" && Array.isArray(contactsRes.value.data?.contacts)
            ? contactsRes.value.data.contacts
            : [];

        setStats({
          totalJobs: jobsCount,
          totalServices: servicesCount,
          totalApplications: apps.length,
          totalContacts: contacts.length,
          recentApplications: apps.slice(0, 5),
          recentContacts: contacts.slice(0, 5),
        });
      } catch (fallbackErr) {
        console.error("Fallback error:", fallbackErr);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Active Services",
      count: stats.totalServices,
      icon: Layers,
      color: "from-blue-500/20 to-cyan-500/20",
      borderColor: "border-blue-500/30",
      iconColor: "text-cyan-400",
      link: "/admin/services",
      linkText: "Manage Services",
    },
    {
      title: "Job Openings",
      count: stats.totalJobs,
      icon: Briefcase,
      color: "from-purple-500/20 to-pink-500/20",
      borderColor: "border-purple-500/30",
      iconColor: "text-purple-400",
      link: "/admin/jobs",
      linkText: "Manage Careers",
    },
    {
      title: "Job Applications",
      count: stats.totalApplications,
      icon: Users,
      color: "from-emerald-500/20 to-teal-500/20",
      borderColor: "border-emerald-500/30",
      iconColor: "text-emerald-400",
      link: "/admin/applications",
      linkText: "View Candidates",
    },
    {
      title: "Client Inquiries",
      count: stats.totalContacts,
      icon: MessageSquare,
      color: "from-amber-500/20 to-orange-500/20",
      borderColor: "border-amber-500/30",
      iconColor: "text-amber-400",
      link: "/admin/contacts",
      linkText: "View Messages",
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-900/40 via-indigo-900/30 to-[#12122b] border border-purple-500/20 p-6 sm:p-8">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <CheckCircle2 size={13} />
              <span>Live Website Connected</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-['Poppins'] text-white">
              Welcome to LAX360 Admin Portal
            </h2>
            <p className="text-gray-300 text-sm mt-2 max-w-2xl">
              Add, edit, and manage services, publish job vacancies to the public Careers page, and track inbound client inquiries and job applications.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/admin/services"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs shadow-lg shadow-purple-600/30 transition"
            >
              <PlusCircle size={15} />
              <span>Add New Service</span>
            </Link>
            <Link
              to="/admin/jobs"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs border border-white/10 transition"
            >
              <PlusCircle size={15} />
              <span>Post Job Opening</span>
            </Link>
          </div>
        </div>

        {/* Background glow */}
        <div className="absolute right-0 bottom-0 translate-x-10 translate-y-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className={`rounded-2xl p-6 bg-gradient-to-br ${card.color} bg-[#0e0e22] border ${card.borderColor} flex flex-col justify-between shadow-xl transition hover:border-white/30`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                  {card.title}
                </span>
                <div className={`p-2.5 rounded-xl bg-white/5 ${card.iconColor}`}>
                  <Icon size={20} />
                </div>
              </div>

              <div className="my-4">
                <span className="text-3xl sm:text-4xl font-bold font-['Poppins'] text-white">
                  {loading ? "..." : card.count}
                </span>
              </div>

              <Link
                to={card.link}
                className="inline-flex items-center gap-1 text-xs font-medium text-gray-300 hover:text-white group pt-3 border-t border-white/10 transition"
              >
                <span>{card.linkText}</span>
                <ArrowRight size={13} className="transition group-hover:translate-x-1" />
              </Link>
            </div>
          );
        })}
      </div>

      {/* Two Columns: Recent Applications & Recent Inquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Applications */}
        <div className="bg-[#0e0e22] border border-white/10 rounded-2xl p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                <Users size={18} />
              </div>
              <h3 className="text-lg font-bold text-white font-['Poppins']">
                Recent Job Applications
              </h3>
            </div>
            <Link
              to="/admin/applications"
              className="text-xs text-purple-400 hover:text-purple-300 font-medium"
            >
              View All →
            </Link>
          </div>

          {loading ? (
            <div className="py-12 text-center text-gray-500 text-sm">Loading applications...</div>
          ) : stats.recentApplications && stats.recentApplications.length > 0 ? (
            <div className="space-y-3 flex-1">
              {stats.recentApplications.map((app) => (
                <div
                  key={app._id}
                  className="p-3.5 rounded-xl bg-white/5 border border-white/5 hover:border-white/15 transition flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white truncate">
                      {app.firstName} {app.lastName || ""}
                    </p>
                    <p className="text-xs text-purple-300 truncate">
                      Applying for: <span className="text-gray-300 font-medium">{app.jobTitle || "Open Role"}</span>
                    </p>
                    <p className="text-[11px] text-gray-400 truncate">{app.email}</p>
                  </div>
                  {app.resume && (
                    <a
                      href={app.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold hover:bg-emerald-500/30 transition flex items-center gap-1 flex-shrink-0"
                    >
                      <FileText size={12} />
                      <span>Resume</span>
                    </a>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-gray-500 text-sm flex flex-col items-center gap-2">
              <Users size={28} className="text-gray-600" />
              <span>No applications received yet.</span>
            </div>
          )}
        </div>

        {/* Recent Inquiries */}
        <div className="bg-[#0e0e22] border border-white/10 rounded-2xl p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
                <MessageSquare size={18} />
              </div>
              <h3 className="text-lg font-bold text-white font-['Poppins']">
                Recent Contact Inquiries
              </h3>
            </div>
            <Link
              to="/admin/contacts"
              className="text-xs text-purple-400 hover:text-purple-300 font-medium"
            >
              View All →
            </Link>
          </div>

          {loading ? (
            <div className="py-12 text-center text-gray-500 text-sm">Loading inquiries...</div>
          ) : stats.recentContacts && stats.recentContacts.length > 0 ? (
            <div className="space-y-3 flex-1">
              {stats.recentContacts.map((contact) => (
                <div
                  key={contact._id}
                  className="p-3.5 rounded-xl bg-white/5 border border-white/5 hover:border-white/15 transition flex flex-col gap-1.5"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-white truncate">
                      {contact.Name}
                    </p>
                    {contact.service && (
                      <span className="text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded-full font-medium">
                        {contact.service}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 truncate">
                    <Mail size={12} className="inline mr-1 text-gray-500" />
                    {contact.email} {contact.phone ? `• ${contact.phone}` : ""}
                  </p>
                  <p className="text-xs text-gray-300 line-clamp-2 italic bg-black/30 p-2 rounded-lg mt-1">
                    "{contact.message}"
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-gray-500 text-sm flex flex-col items-center gap-2">
              <MessageSquare size={28} className="text-gray-600" />
              <span>No client messages received yet.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
