import React from "react";
import { Link } from "react-router-dom";
import { FileText, Shield, ArrowRight } from "lucide-react";

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-[#070712] text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Header */}
        <div className="space-y-4 border-b border-white/10 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold uppercase tracking-wider">
            <FileText size={14} />
            <span>Terms of Service</span>
          </div>
          <h1 className="font-['Poppins'] text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Terms & Conditions
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm">
            Effective Date: September 1, 2026 &bull; LAX360 Pvt Ltd
          </p>
        </div>

        {/* Terms Content */}
        <div className="space-y-8 text-gray-300 text-sm leading-relaxed">
          <section className="space-y-3 bg-[#0d0d20] border border-white/10 p-6 rounded-2xl">
            <h2 className="text-lg font-bold text-white font-['Poppins']">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using this website (<a href="https://www.lax360.in" className="text-purple-400 underline">www.lax360.in</a>) and the software engineering, AI, cloud, and digital services offered by LAX360 Pvt Ltd ("LAX360"), you agree to be bound by these Terms & Conditions and our Privacy Notice. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section className="space-y-3 bg-[#0d0d20] border border-white/10 p-6 rounded-2xl">
            <h2 className="text-lg font-bold text-white font-['Poppins']">
              2. Intellectual Property Rights
            </h2>
            <p>
              All content, brand assets, source code, designs, algorithms, text, graphics, and trademarks featured on this website are the proprietary property of LAX360 Pvt Ltd or its licensors and are protected under Indian and international intellectual property laws.
            </p>
          </section>

          <section className="space-y-3 bg-[#0d0d20] border border-white/10 p-6 rounded-2xl">
            <h2 className="text-lg font-bold text-white font-['Poppins']">
              3. Use of Services & Dynamic Content
            </h2>
            <p>
              You agree to use our website and services only for lawful purposes. You shall not engage in any activity that disrupts or interferes with our services, servers, or networks, nor attempt unauthorized access to administrative portals or user databases.
            </p>
          </section>

          <section className="space-y-3 bg-[#0d0d20] border border-white/10 p-6 rounded-2xl">
            <h2 className="text-lg font-bold text-white font-['Poppins']">
              4. Data Protection & Privacy Compliance
            </h2>
            <p>
              Our handling of digital personal data adheres strictly to the Digital Personal Data Protection (DPDP) Act, 2023. For details on how we collect and process personal data and how you can exercise your Data Principal rights, please review our{" "}
              <Link to="/privacy" className="text-purple-400 underline">
                Privacy Notice
              </Link>{" "}
              or visit our{" "}
              <Link to="/privacy-centre" className="text-purple-400 underline">
                Privacy Centre
              </Link>
              .
            </p>
          </section>

          <section className="space-y-3 bg-[#0d0d20] border border-white/10 p-6 rounded-2xl">
            <h2 className="text-lg font-bold text-white font-['Poppins']">
              5. Limitation of Liability
            </h2>
            <p>
              LAX360 provides this website and its information on an "as is" and "as available" basis. To the maximum extent permitted by applicable law, LAX360 shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from the use of or inability to use the website.
            </p>
          </section>

          <section className="space-y-3 bg-[#0d0d20] border border-white/10 p-6 rounded-2xl">
            <h2 className="text-lg font-bold text-white font-['Poppins']">
              6. Governing Law & Jurisdiction
            </h2>
            <p>
              These Terms & Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising hereunder shall be subject to the exclusive jurisdiction of the competent courts in Salem, Tamil Nadu, India.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
