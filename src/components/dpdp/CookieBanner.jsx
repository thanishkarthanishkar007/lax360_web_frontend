import React, { useState, useEffect } from "react";
import { Cookie, Settings, Check } from "lucide-react";
import CookiePreferencesModal from "./CookiePreferencesModal";

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("lax360_cookie_consent");
    if (!consent) {
      // Delay slightly for smooth entrance
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
        <div className="fixed bottom-4 left-4 right-4 md:left-8 md:right-8 md:max-w-xl z-50 animate-in fade-in slide-in-from-bottom duration-500">
          <div className="bg-[#101024]/95 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-5 md:p-6 shadow-2xl shadow-black/80 flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-purple-600/20 text-purple-400 flex-shrink-0 mt-0.5">
                <Cookie size={20} />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white font-['Poppins']">
                  Your Privacy
                </h4>
                <p className="text-gray-300 text-xs leading-relaxed">
                  We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and support our digital services in accordance with the DPDP Act.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-white/10">
              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition border border-white/10"
              >
                <Settings size={13} />
                <span>Manage Preferences</span>
              </button>

              <button
                type="button"
                onClick={handleAcceptAll}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-purple-600/30 transition"
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
