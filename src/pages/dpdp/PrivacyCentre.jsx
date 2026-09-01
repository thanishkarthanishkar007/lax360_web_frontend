import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../config/api";
import {
  Shield,
  Eye,
  Edit3,
  Trash2,
  UserX,
  AlertOctagon,
  ArrowRight,
  X,
  CheckCircle2,
  Lock,
  Mail,
  Phone,
  HelpCircle,
} from "lucide-react";
import { toast } from "react-toastify";
import CookiePreferencesModal from "../../components/dpdp/CookiePreferencesModal";
import PrivacyNoticeModal from "../../components/dpdp/PrivacyNoticeModal";

const PrivacyCentre = () => {
  const [selectedType, setSelectedType] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cookieModalOpen, setCookieModalOpen] = useState(false);
  const [privacyNoticeModalOpen, setPrivacyNoticeModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    details: "",
    consent: false,
  });

  const cards = [
    {
      type: "view_data",
      title: "View My Data",
      subtitle: "Request information about your data",
      desc: "Get a summary of the personal data processed by LAX360, categories of data collected, and third-party processors.",
      icon: Eye,
      color: "from-blue-500/20 to-cyan-500/20",
      borderColor: "border-blue-500/30",
      iconColor: "text-cyan-400",
      buttonText: "Request",
    },
    {
      type: "correct_data",
      title: "Correct My Data",
      subtitle: "Request correction of inaccurate data",
      desc: "Request rectification of outdated, inaccurate, or incomplete personal data held in our systems.",
      icon: Edit3,
      color: "from-purple-500/20 to-pink-500/20",
      borderColor: "border-purple-500/30",
      iconColor: "text-purple-400",
      buttonText: "Request",
    },
    {
      type: "erasure",
      title: "Request Erasure",
      subtitle: "Request deletion where applicable",
      desc: "Request the erasure of your personal data when it is no longer necessary for the purpose for which it was collected.",
      icon: Trash2,
      color: "from-red-500/20 to-orange-500/20",
      borderColor: "border-red-500/30",
      iconColor: "text-red-400",
      buttonText: "Request",
    },
    {
      type: "withdraw_consent",
      title: "Withdraw Consent",
      subtitle: "Withdraw consent where processing is based on consent",
      desc: "Revoke your consent previously given for marketing communications, cookies, or specific data processing activities.",
      icon: UserX,
      color: "from-amber-500/20 to-yellow-500/20",
      borderColor: "border-amber-500/30",
      iconColor: "text-amber-400",
      buttonText: "Manage / Request",
    },
    {
      type: "grievance",
      title: "Privacy Grievance",
      subtitle: "Raise a privacy-related complaint",
      desc: "Submit a formal grievance directly to our designated Grievance Officer regarding any data protection concerns.",
      icon: AlertOctagon,
      color: "from-emerald-500/20 to-teal-500/20",
      borderColor: "border-emerald-500/30",
      iconColor: "text-emerald-400",
      buttonText: "Submit Request",
    },
  ];

  const handleOpenModal = (type) => {
    setSelectedType(type);
    setFormData({
      name: "",
      email: "",
      phone: "",
      details: "",
      consent: false,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.details.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (!formData.consent) {
      toast.error("Please agree to the processing of your data to submit this request.");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/api/dpdp/request", {
        requestType: selectedType,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        details: formData.details,
      });

      if (res.data?.success) {
        toast.success(res.data.message || "Privacy request submitted successfully!");
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("DPDP Submission Error:", error);
      toast.error(
        error.response?.data?.message ||
        "Failed to submit privacy request. Please try again or contact us directly."
      );
    } finally {
      setLoading(false);
    }
  };

  const getCardInfo = (type) => {
    return cards.find((c) => c.type === type) || cards[0];
  };

  return (
    <div className="min-h-screen bg-[#070712] text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Top Hero Banner */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider">
            <Shield size={14} />
            <span>DPDP Act 2023 Compliance Portal</span>
          </div>
          <h1 className="font-['Poppins'] text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Privacy Centre
          </h1>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            Manage your personal data and exercise your rights as a Data Principal under the Digital Personal Data Protection (DPDP) Act.
          </p>
        </div>

        {/* Quick Cookie Management Card */}
        <div className="bg-[#0f0f24] border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-xl bg-purple-600/20 text-purple-400">
              <Lock size={22} />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-['Poppins']">
                Cookie Preferences & Tracking
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Customize which cookie categories you permit during your visit.
              </p>
            </div>
          </div>
          <button
            onClick={() => setCookieModalOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/10 transition flex items-center gap-2 flex-shrink-0 cursor-pointer"
          >
            <span>Manage Cookie Settings</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* 5 DPDP Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.type}
                className={`bg-[#0e0e22] border ${card.borderColor} rounded-2xl p-6 flex flex-col justify-between shadow-xl hover:border-white/30 transition-all duration-300 group`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${card.color} ${card.iconColor}`}>
                      <Icon size={22} />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white font-['Poppins'] group-hover:text-purple-300 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs font-medium text-purple-400 mt-1">
                    {card.subtitle}
                  </p>
                  <p className="text-xs text-gray-400 mt-3 leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10">
                  <button
                    onClick={() => handleOpenModal(card.type)}
                    className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-purple-600/20 text-gray-200 hover:text-white border border-white/10 hover:border-purple-500/30 text-xs font-semibold transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{card.buttonText}</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Grievance Redressal Contact Box */}
        <div className="rounded-2xl bg-gradient-to-r from-purple-900/30 via-[#0e0e24] to-[#0e0e24] border border-purple-500/20 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-xl font-bold font-['Poppins'] text-white flex items-center gap-2">
              <HelpCircle size={20} className="text-purple-400" />
              <span>Designated Data Protection Grievance Officer</span>
            </h3>
            <p className="text-xs text-gray-300 max-w-2xl leading-relaxed">
              If you have any questions, unresolved grievances, or complaints regarding how LAX360 processes your personal data, you may reach our designated Grievance Officer.
            </p>
            <div className="flex flex-wrap gap-4 pt-2 text-xs text-gray-300">
              <span className="flex items-center gap-1.5">
                <Mail size={14} className="text-purple-400" />
                <a href="mailto:lax360tech@gmail.com" className="hover:text-white underline">
                  lax360tech@gmail.com
                </a>
              </span>
              <span className="flex items-center gap-1.5">
                <Phone size={14} className="text-emerald-400" />
                <a href="tel:9566679928" className="hover:text-white">
                  +91 95666 79928
                </a>
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <button
              onClick={() => setPrivacyNoticeModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/10 transition text-center cursor-pointer"
            >
              Read Privacy Notice
            </button>
            <Link
              to="/terms"
              className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-lg shadow-purple-600/30 transition text-center"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>

      {/* Submission Modal for DPDP Rights */}
      {isModalOpen && selectedType && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#121226] border border-white/15 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#121226]">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
                  <Shield size={18} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-['Poppins']">
                    {getCardInfo(selectedType).title}
                  </h3>
                  <p className="text-[11px] text-gray-400">
                    {getCardInfo(selectedType).subtitle}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Rahul Sharma"
                  required
                  className="w-full px-4 py-2.5 bg-[#090915] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    required
                    className="w-full px-4 py-2.5 bg-[#090915] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2.5 bg-[#090915] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                  Request Details / Specification *
                </label>
                <textarea
                  rows="4"
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  placeholder="Please specify the details of your request or grievance..."
                  required
                  className="w-full px-4 py-2.5 bg-[#090915] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-purple-500 resize-none"
                />
              </div>

              {/* Consent Checkbox */}
              <div className="flex items-start gap-2.5 pt-2">
                <input
                  type="checkbox"
                  id="dpdp-consent-modal"
                  checked={formData.consent}
                  onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                  required
                  className="mt-1 h-4 w-4 accent-purple-600 rounded cursor-pointer flex-shrink-0"
                />
                <label
                  htmlFor="dpdp-consent-modal"
                  className="text-xs text-gray-300 leading-relaxed"
                >
                  I agree to the processing of my personal data for the purpose described in the{" "}
                  <button
                    type="button"
                    onClick={() => setPrivacyNoticeModalOpen(true)}
                    className="text-purple-400 underline font-semibold cursor-pointer"
                  >
                    Privacy Notice
                  </button>
                  .
                </label>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-lg shadow-purple-600/30 transition disabled:opacity-50 cursor-pointer"
                >
                  {loading ? "Submitting..." : "Submit Request"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Cookie Preferences Modal */}
      <CookiePreferencesModal
        isOpen={cookieModalOpen}
        onClose={() => setCookieModalOpen(false)}
      />

      {/* Privacy Notice Modal */}
      <PrivacyNoticeModal
        isOpen={privacyNoticeModalOpen}
        onClose={() => setPrivacyNoticeModalOpen(false)}
      />
    </div>
  );
};

export default PrivacyCentre;
