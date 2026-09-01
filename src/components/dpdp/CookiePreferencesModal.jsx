import React, { useState, useEffect } from "react";
import { X, ShieldCheck, Check } from "lucide-react";
import { toast } from "react-toastify";

const CookiePreferencesModal = ({ isOpen, onClose, onSave }) => {
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const saved = localStorage.getItem("lax360_cookie_preferences");
    if (saved) {
      try {
        setPreferences(JSON.parse(saved));
      } catch {
        // fallback
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    localStorage.setItem("lax360_cookie_preferences", JSON.stringify(preferences));
    localStorage.setItem("lax360_cookie_consent", "custom");
    if (onSave) onSave(preferences);
    toast.success("Cookie preferences saved successfully.");
    onClose();
  };

  const handleAcceptAll = () => {
    const allAccepted = { essential: true, analytics: true, marketing: true };
    localStorage.setItem("lax360_cookie_preferences", JSON.stringify(allAccepted));
    localStorage.setItem("lax360_cookie_consent", "all");
    if (onSave) onSave(allAccepted);
    toast.success("All cookies accepted.");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <div className="bg-[#121226] border border-white/15 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#121226]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
              <ShieldCheck size={20} />
            </div>
            <h3 className="text-lg font-bold text-white font-['Poppins']">
              Cookie Preferences
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          <p className="text-gray-300 text-xs leading-relaxed">
            In compliance with the Digital Personal Data Protection (DPDP) Act, we provide granular control over the cookies and tracking technologies used on our website.
          </p>

          {/* Essential Cookies */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white">Essential Cookies</span>
                <span className="text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded-full font-semibold">
                  Always Active
                </span>
              </div>
              <p className="text-gray-400 text-xs leading-relaxed">
                Necessary for the website to function properly, navigate securely, and store session states. These cannot be disabled.
              </p>
            </div>
            <input
              type="checkbox"
              checked={true}
              disabled={true}
              className="mt-1 h-4 w-4 accent-purple-600 rounded cursor-not-allowed opacity-80"
            />
          </div>

          {/* Analytics Cookies */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white">Analytics Cookies</span>
                <span className="text-[10px] text-gray-400">
                  {preferences.analytics ? "ON" : "OFF"}
                </span>
              </div>
              <p className="text-gray-400 text-xs leading-relaxed">
                Helps us understand how visitors interact with our website to improve performance and user experience.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer mt-1">
              <input
                type="checkbox"
                checked={preferences.analytics}
                onChange={(e) =>
                  setPreferences({ ...preferences, analytics: e.target.checked })
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>

          {/* Marketing Cookies */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white">Marketing Cookies</span>
                <span className="text-[10px] text-gray-400">
                  {preferences.marketing ? "ON" : "OFF"}
                </span>
              </div>
              <p className="text-gray-400 text-xs leading-relaxed">
                Used to deliver relevant communications, personalized updates, and measure advertising campaign effectiveness.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer mt-1">
              <input
                type="checkbox"
                checked={preferences.marketing}
                onChange={(e) =>
                  setPreferences({ ...preferences, marketing: e.target.checked })
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="p-5 border-t border-white/10 bg-[#0c0c1b] flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleAcceptAll}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition"
          >
            Accept All Cookies
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-purple-600/30 transition"
            >
              <Check size={14} />
              <span>Save Preferences</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePreferencesModal;
