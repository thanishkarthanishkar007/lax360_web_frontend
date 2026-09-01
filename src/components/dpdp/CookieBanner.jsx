import React, { useState, useEffect } from "react";
import { Cookie, ArrowRight, X } from "lucide-react";
import CookiePreferencesModal from "./CookiePreferencesModal";

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("lax360_dpdp_cookie_consent_v2");
    if (!consent) {
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = { essential: true, analytics: true, marketing: true };
    localStorage.setItem("lax360_cookie_preferences", JSON.stringify(allAccepted));
    localStorage.setItem("lax360_dpdp_cookie_consent_v2", "all");
    setShowBanner(false);
  };

  const handlePreferencesSaved = () => {
    localStorage.setItem("lax360_dpdp_cookie_consent_v2", "custom");
    setShowBanner(false);
  };

  const handleCloseDismiss = () => {
    localStorage.setItem("lax360_dpdp_cookie_consent_v2", "dismissed");
    setShowBanner(false);
  };

  return (
    <>
      {showBanner && (
        <div className="fixed bottom-0 left-0 right-0 w-full z-50 animate-in fade-in slide-in-from-bottom duration-300">
          <div className="bg-[#0b0b1c]/98 backdrop-blur-2xl border-t border-purple-500/25 shadow-[0_-12px_40px_rgba(0,0,0,0.7)] px-4 sm:px-8 lg:px-12 py-3">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-3 lg:gap-8">
              {/* Left Side: Icon, Title & Description */}
              <div className="flex items-center gap-3.5 min-w-0 flex-1">
                <div className="w-9 h-9 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 flex-shrink-0">
                  <Cookie size={18} />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 min-w-0">
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="font-['Poppins'] font-bold text-xs sm:text-sm tracking-wider uppercase text-white">
                      Your Privacy
                    </span>
                  </div>

                  <p className="text-[11px] sm:text-xs text-gray-300 leading-snug line-clamp-2 sm:line-clamp-none">
                    We use cookies and similar technologies for secure digital services, traffic telemetry, and performance. You can manage your granular preferences at any time.
                  </p>
                </div>
              </div>

              {/* Right Side: Manage Preferences, Accept All, Close */}
              <div className="flex items-center justify-end gap-2.5 sm:gap-3 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setShowModal(true)}
                  className="px-4 sm:px-5 py-2 rounded-full bg-white/10 hover:bg-white/15 text-gray-200 hover:text-white text-xs font-semibold uppercase tracking-wider border border-white/15 transition cursor-pointer"
                >
                  Manage Preferences
                </button>

                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="px-5 sm:px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg shadow-purple-600/30 transition cursor-pointer"
                >
                  <span>Accept All</span>
                  <ArrowRight size={14} />
                </button>

                <button
                  type="button"
                  onClick={handleCloseDismiss}
                  className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
                  title="Dismiss"
                >
                  <X size={17} />
                </button>
              </div>
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
