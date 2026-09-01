import React from "react";
import { Link } from "react-router-dom";
import { Shield, Mail, Phone, MapPin, ArrowRight, Lock, FileText, CheckCircle2 } from "lucide-react";

const PrivacyNotice = () => {
  return (
    <div className="min-h-screen bg-[#070712] text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Header */}
        <div className="space-y-4 border-b border-white/10 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold uppercase tracking-wider">
            <Shield size={14} />
            <span>DPDP Act 2023 Compliant</span>
          </div>
          <h1 className="font-['Poppins'] text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Privacy Notice
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm">
            Last Updated: September 1, 2026 &bull; Published by LAX360 Pvt Ltd
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-8 text-gray-300 text-sm leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-3 bg-[#0d0d20] border border-white/10 p-6 rounded-2xl">
            <h2 className="text-lg font-bold text-white font-['Poppins'] flex items-center gap-2">
              <span className="text-purple-400">1.</span> Introduction & Scope
            </h2>
            <p>
              LAX360 Pvt Ltd ("LAX360", "we", "our", or "us") is dedicated to safeguarding your personal data and ensuring strict compliance with the **Digital Personal Data Protection (DPDP) Act, 2023** and other applicable data protection regulations in India.
            </p>
            <p>
              This Privacy Notice describes how we collect, process, store, and protect digital personal data collected through our website (<a href="https://www.lax360.in" className="text-purple-400 underline">www.lax360.in</a>), inquiry forms, career applications, and related digital services.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3 bg-[#0d0d20] border border-white/10 p-6 rounded-2xl">
            <h2 className="text-lg font-bold text-white font-['Poppins'] flex items-center gap-2">
              <span className="text-purple-400">2.</span> Categories of Personal Data We Collect
            </h2>
            <p>We only collect personal data that is necessary for specified, legitimate purposes:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-gray-300">
              <li><strong>Contact Information:</strong> Name, email address, phone number, and physical address provided during inquiry or job application.</li>
              <li><strong>Professional & Career Data:</strong> Resume/CV, work history, educational qualifications, and portfolio submitted for employment opportunities.</li>
              <li><strong>Technical & Usage Data:</strong> IP address, browser type, operating system, device information, and interaction logs collected via essential or analytical cookies.</li>
              <li><strong>Inquiry Content:</strong> Project requirements, messages, and communication records submitted via our contact forms.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3 bg-[#0d0d20] border border-white/10 p-6 rounded-2xl">
            <h2 className="text-lg font-bold text-white font-['Poppins'] flex items-center gap-2">
              <span className="text-purple-400">3.</span> Purpose of Processing & Legal Basis
            </h2>
            <p>
              Under the DPDP Act, personal data is processed on the basis of **explicit consent** provided by you (the "Data Principal") or for legitimate uses recognized by law:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-xs">
                <span className="font-semibold text-purple-300 block mb-1">Service Delivery & Inquiries</span>
                Responding to service requests, client consultations, and business communications.
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-xs">
                <span className="font-semibold text-purple-300 block mb-1">Recruitment & Hiring</span>
                Evaluating candidate applications and scheduling interviews.
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-xs">
                <span className="font-semibold text-purple-300 block mb-1">Security & Integrity</span>
                Preventing fraud, cyber threats, and securing infrastructure.
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-xs">
                <span className="font-semibold text-purple-300 block mb-1">Compliance</span>
                Fulfilling statutory legal and regulatory obligations.
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-3 bg-[#0d0d20] border border-white/10 p-6 rounded-2xl">
            <h2 className="text-lg font-bold text-white font-['Poppins'] flex items-center gap-2">
              <span className="text-purple-400">4.</span> Your Rights as a Data Principal
            </h2>
            <p>
              As a Data Principal under the DPDP Act, you have complete sovereignty over your personal data:
            </p>
            <div className="space-y-2 pt-1 text-xs">
              <div className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-purple-400 flex-shrink-0 mt-0.5" />
                <span><strong>Right to Access / View Data:</strong> You may request a summary of personal data held about you and processing activities.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-purple-400 flex-shrink-0 mt-0.5" />
                <span><strong>Right to Correction:</strong> You may request rectification of inaccurate, incomplete, or misleading data.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-purple-400 flex-shrink-0 mt-0.5" />
                <span><strong>Right to Erasure:</strong> You may request deletion of your personal data when no longer required.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-purple-400 flex-shrink-0 mt-0.5" />
                <span><strong>Right to Withdraw Consent:</strong> You may withdraw your consent at any time through our Privacy Centre.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-purple-400 flex-shrink-0 mt-0.5" />
                <span><strong>Right of Grievance Redressal:</strong> You have the right to address grievances to our designated Grievance Officer.</span>
              </div>
            </div>

            <div className="pt-3">
              <Link
                to="/privacy-centre"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold transition"
              >
                <span>Visit Privacy Centre to Exercise Rights</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </section>

          {/* Section 5 */}
          <section className="space-y-3 bg-[#0d0d20] border border-white/10 p-6 rounded-2xl">
            <h2 className="text-lg font-bold text-white font-['Poppins'] flex items-center gap-2">
              <span className="text-purple-400">5.</span> Cookies & Tracking Technologies
            </h2>
            <p>
              We use cookies to maintain user preferences and analyze traffic. You can adjust your consent choices at any time via the <strong>Cookie Preferences</strong> link in the footer or directly inside the Privacy Centre.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3 bg-[#0d0d20] border border-white/10 p-6 rounded-2xl">
            <h2 className="text-lg font-bold text-white font-['Poppins'] flex items-center gap-2">
              <span className="text-purple-400">6.</span> Data Security & Retention
            </h2>
            <p>
              We implement enterprise-grade technical and organizational security measures (including encryption in transit and at rest, access controls, and regular audits) to protect your personal data against unauthorized access, loss, or disclosure. Personal data is retained only as long as necessary to fulfill the purposes for which it was collected or to comply with statutory legal requirements.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-4 bg-gradient-to-r from-purple-950/40 via-[#0d0d20] to-[#0d0d20] border border-purple-500/30 p-6 rounded-2xl">
            <h2 className="text-lg font-bold text-white font-['Poppins'] flex items-center gap-2">
              <span className="text-purple-400">7.</span> Data Protection Grievance Officer
            </h2>
            <p className="text-xs">
              In accordance with Section 6 and Section 13 of the DPDP Act 2023, the details of our designated Data Protection Grievance Officer are as follows:
            </p>
            <div className="bg-black/40 p-4 rounded-xl space-y-2 text-xs border border-white/5">
              <p><strong>Designation:</strong> Data Protection & Grievance Officer</p>
              <p><strong>Company:</strong> LAX360 Pvt Ltd</p>
              <p><strong>Email:</strong> <a href="mailto:lax360tech@gmail.com" className="text-purple-400 underline">lax360tech@gmail.com</a></p>
              <p><strong>Phone:</strong> <a href="tel:9566679928" className="text-emerald-400 underline">+91 95666 79928</a></p>
              <p><strong>Office:</strong> 1st Floor, 16, CPS Tower, Advaitha Ashram Rd, Fairlands, Salem, Tamil Nadu 636007, India</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyNotice;
