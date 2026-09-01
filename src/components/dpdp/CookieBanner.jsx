import React, { useState, useEffect } from "react";
import { Cookie, Settings, Check } from "lucide-react";
import CookiePreferencesModal from "./CookiePreferencesModal";

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("lax360_cookie_consent");
    if (!consent) {
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = { essential: true, analytics: true, marketing: true };
    localStorage.setItem("lax360_cookie_preferences", JSON.stringify(allAccepted));
    localStorage.setItem("lax360_cookie_consent", "all");
    setShowBanner(false);
  };

  const handlePreferencesSaved = () => {
    setShowBanner(false);
  };

  return (
    <>
      {showBanner && (
        <div className="fixed bottom-3 sm:bottom-4 left-3 right-3 sm:left-6 sm:right-6 lg:left-10 lg:right-10 max-w-6xl mx-auto z-50 animate-in fade-in slide-in-from-bottom duration-500">
          <div className="bg-[#101024]/95 backdrop-blur-xl border border-purple-500/30 rounded-xl sm:rounded-2xl px-4 py-3 sm:px-6 sm:py-3.5 shadow-2xl shadow-black/80 flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-6">
            {/* Left side: Icon & Text */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2 rounded-xl bg-purple-600/20 text-purple-400 flex-shrink-0">
                <Cookie size={18} />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-gray-200 leading-snug">
                  <strong className="text-white font-semibold mr-1 font-['Poppins']">
                    Your Privacy:
                  </strong>
                  We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and support our digital services in accordance with the DPDP Act.
                </p>
              </div>
            </div>

            {/* Right side: Action Buttons */}
            <div className="flex items-center justify-end gap-2.5 flex-shrink-0">
              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="px-3.5 py-1.5 sm:py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition border border-white/10 cursor-pointer"
              >
                <Settings size={13} />
                <span>Manage Preferences</span>
              </button>

              <button
                type="button"
                onClick={handleAcceptAll}
                className="px-4 py-1.5 sm:py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-purple-600/30 transition cursor-pointer"
              >
                <Check size={14} />
                <span>Accept</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preferences Modal */}
      <CookiePreferencesModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={handlePreferencesSaved}
      />
    </>
  );
};

export default CookieBanner;
