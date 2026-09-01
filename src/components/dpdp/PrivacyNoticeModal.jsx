import React, { useEffect } from "react";
import { X, Shield, CheckCircle2, Mail, Phone } from "lucide-react";

const PrivacyNoticeModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/85 backdrop-blur-md z-[10000] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#0e0e22] border border-white/15 rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col max-h-[88vh] animate-in fade-in zoom-in-95 duration-200 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-[#12122a] sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
              <Shield size={20} />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white font-['Poppins']">
                Privacy Notice
              </h2>
              <p className="text-[11px] text-gray-400">
                Digital Personal Data Protection (DPDP) Act, 2023 Compliant
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
            title="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Body Content */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6 text-gray-300 text-xs sm:text-sm leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-2 bg-[#080816] p-4 rounded-xl border border-white/5">
            <h3 className="font-semibold text-white text-sm font-['Poppins'] flex items-center gap-2">
              <span className="text-purple-400">1.</span> Introduction & Scope
            </h3>
            <p>
              LAX360 Pvt Ltd ("LAX360", "we", "our", or "us") is dedicated to protecting your personal data in strict accordance with the **Digital Personal Data Protection (DPDP) Act, 2023** of India. This Privacy Notice governs the collection, processing, and storage of digital personal data collected via <span className="text-purple-300">www.lax360.in</span>, our inquiry forms, career applications, and associated digital services.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-2 bg-[#080816] p-4 rounded-xl border border-white/5">
            <h3 className="font-semibold text-white text-sm font-['Poppins'] flex items-center gap-2">
              <span className="text-purple-400">2.</span> Categories of Data We Collect
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-xs text-gray-300">
              <li><strong>Contact Information:</strong> Name, email address, phone number, and physical address provided during inquiry or job application.</li>
              <li><strong>Career Application Data:</strong> Resume/CV, work experience, education, and portfolio submitted for recruitment.</li>
              <li><strong>Technical Data:</strong> Browser type, IP address, device telemetry, and interaction logs collected via essential or analytical cookies.</li>
              <li><strong>Inquiry Content:</strong> Project requirements, messages, and consultation notes.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-2 bg-[#080816] p-4 rounded-xl border border-white/5">
            <h3 className="font-semibold text-white text-sm font-['Poppins'] flex items-center gap-2">
              <span className="text-purple-400">3.</span> Purpose of Processing & Legal Basis
            </h3>
            <p>
              Under the DPDP Act, personal data is processed solely on the basis of **explicit consent** provided by you (the "Data Principal") or for legitimate uses:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs">
              <div className="p-2.5 bg-white/5 rounded-lg border border-white/5">
                <span className="font-semibold text-purple-300 block mb-0.5">Service Delivery</span>
                Providing software engineering, AI, and digital solutions.
              </div>
              <div className="p-2.5 bg-white/5 rounded-lg border border-white/5">
                <span className="font-semibold text-purple-300 block mb-0.5">Client Inquiries</span>
                Responding to consultations and quote requests.
              </div>
              <div className="p-2.5 bg-white/5 rounded-lg border border-white/5">
                <span className="font-semibold text-purple-300 block mb-0.5">Hiring & Careers</span>
                Reviewing candidate applications and scheduling interviews.
              </div>
              <div className="p-2.5 bg-white/5 rounded-lg border border-white/5">
                <span className="font-semibold text-purple-300 block mb-0.5">Security & Compliance</span>
                Protecting against cyber threats and maintaining records.
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-2 bg-[#080816] p-4 rounded-xl border border-white/5">
            <h3 className="font-semibold text-white text-sm font-['Poppins'] flex items-center gap-2">
              <span className="text-purple-400">4.</span> Your Rights as a Data Principal
            </h3>
            <div className="space-y-1.5 pt-1 text-xs">
              <div className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-purple-400 flex-shrink-0 mt-0.5" />
                <span><strong>Right to Access / View Data:</strong> Request details of personal data processed.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-purple-400 flex-shrink-0 mt-0.5" />
                <span><strong>Right to Correction:</strong> Request correction of inaccurate or outdated data.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-purple-400 flex-shrink-0 mt-0.5" />
                <span><strong>Right to Erasure:</strong> Request deletion when data is no longer needed.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-purple-400 flex-shrink-0 mt-0.5" />
                <span><strong>Right to Withdraw Consent:</strong> Revoke previously granted consent at any time.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-purple-400 flex-shrink-0 mt-0.5" />
                <span><strong>Right of Grievance Redressal:</strong> Submit complaints to our Grievance Officer.</span>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section className="space-y-2 bg-gradient-to-r from-purple-950/40 via-[#080816] to-[#080816] p-4 rounded-xl border border-purple-500/20">
            <h3 className="font-semibold text-white text-sm font-['Poppins'] flex items-center gap-2">
              <span className="text-purple-400">5.</span> Grievance Redressal Officer
            </h3>
            <div className="text-xs space-y-1 pt-1">
              <p><strong>Designation:</strong> Data Protection Grievance Officer &bull; LAX360 Pvt Ltd</p>
              <p className="flex items-center gap-2">
                <Mail size={13} className="text-purple-400" />
                <a href="mailto:lax360tech@gmail.com" className="text-purple-400 underline">lax360tech@gmail.com</a>
                <span className="text-gray-500">|</span>
                <Phone size={13} className="text-emerald-400" />
                <a href="tel:9566679928" className="text-emerald-400 underline">+91 95666 79928</a>
              </p>
              <p className="text-gray-400">1st Floor, 16, CPS Tower, Advaitha Ashram Rd, Fairlands, Salem, Tamil Nadu 636007, India</p>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-white/10 bg-[#12122a] flex items-center justify-between">
          <span className="text-[11px] text-gray-500">
            © 2026 LAX360 Pvt Ltd. All rights reserved.
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-lg shadow-purple-600/30 transition cursor-pointer"
          >
            I Understand & Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyNoticeModal;
