import React, { useState } from "react";
import logo from "../../assets/icons/logo.svg";
import {
  FaInstagram,
  FaLinkedin,
  FaFacebook,
  FaEnvelope,
  FaPhone,
  FaArrowRight,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaArrowUp,
  FaShieldAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import CookiePreferencesModal from "../dpdp/CookiePreferencesModal";

const servicesList = [
  "Web Development",
  "AI Solutions",
  "Blockchain",
  "Digital Marketing",
  "Enterprise Software",
  "Cloud Solutions",
  "Cyber Security",
];

const Footer = () => {
  const [cookieModalOpen, setCookieModalOpen] = useState(false);

  return (
    <footer className="relative footer-bg text-white overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-20 pt-20">
        {/* ================= GRID ================= */}
        <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-4">
          {/* LOGO + ABOUT */}
          <div>
            <div className="flex items-center mb-4">
              <img src={logo} alt="Logo" />
              <h3 className="text-2xl font-bold tracking-wide">
                <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-400 bg-clip-text text-transparent animate-pulse">
                  LAX360
                </span>
              </h3>
            </div>

            <p className="text-sm text-gray-300 leading-relaxed">
              Delivering scalable digital solutions, intelligent systems, and
              enterprise-grade infrastructure for modern businesses.
            </p>
          </div>

          {/* NAVIGATION */}
          <div>
            <h4 className="font-semibold mb-6 text-lg">Navigation</h4>
            <ul className="space-y-3 text-sm">
              {["About", "Services", "Careers", "Contact"].map(
                (item, index) => (
                  <li key={index}>
                    <Link
                      to={`/${item.toLowerCase().replace(" ", "")}`}
                      className="group relative inline-flex items-center gap-2 text-gray-300 hover:text-white transition"
                    >
                      <span className="w-2 h-2 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition" />
                      <span className="group-hover:translate-x-2 transition-transform duration-300 hover:bg-gray-400 hover:px-3 py-1 hover:text-purple-800">
                        {item}
                      </span>
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* SERVICES LIST */}
          <div>
            <h4 className="font-semibold mb-6 text-lg">Services</h4>
            <ul className="space-y-3 text-sm">
              {servicesList.map((service, index) => (
                <li key={index}>
                  <Link
                    to="/services"
                    className="group relative inline-flex items-center gap-2 text-gray-300 hover:text-white transition"
                  >
                    <span className="w-2 h-2 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition" />
                    <span className="group-hover:translate-x-2 transition-transform duration-300 hover:bg-gray-400 hover:px-3 py-1 hover:text-purple-800">
                      {service}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT + ADDRESS */}
          <div>
            <h4 className="font-semibold mb-6 text-lg">Contact</h4>

            <div className="space-y-4 text-sm text-gray-300">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-purple-400 mt-1 w-10" />
                <p>
                  Lax360 Pvt Ltd, 1st Floor, 16, CPS Tower, Advaitha Ashram Rd,
                  Fairlands, Salem, Tamil Nadu 636007 , Bangalore
                </p>
              </div>

              <div className="flex items-center gap-3">
                <FaEnvelope className="text-purple-400" />
                <a
                  href="mailto:lax360tech@gmail.com"
                  className="hover:text-white"
                >
                  lax360tech@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-3">
                <FaPhone className="text-purple-400" />
                <a href="tel:9566679928" className="hover:text-white">
                  9566679928
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FaPhone className="text-purple-400" />
                <a href="tel:+919566679958" className="hover:text-white">
                  9566679958
                </a>
              </div>
            </div>

            <div className="flex gap-4 mt-6 text-lg">
              <a
                href="https://www.instagram.com/lax360pvtltd"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full hover:bg-pink-500 transition"
              >
                <FaInstagram />
              </a>

              <a
                href="https://www.linkedin.com/company/lax360-pvt-ltd/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full hover:bg-blue-500 transition"
              >
                <FaLinkedin />
              </a>

              <a
                href="https://www.facebook.com/profile.php?id=61578145848005"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full hover:bg-blue-600 transition"
              >
                <FaFacebook />
              </a>

              <a
                href="https://wa.me/919566679958"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full hover:bg-green-500 transition"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>
        </div>

        {/* ================= MARQUEE ================= */}
        <div className="border-t border-white/20 mt-20 py-6 overflow-hidden">
          <Link
            to="/contact"
            className="whitespace-nowrap flex animate-marquee gap-12 text-2xl font-semibold"
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <span
                key={i}
                className="font-['Poppins'] flex items-center gap-4 text-6xl"
              >
                LAX 360 {" "}
                <FaArrowUp className="text-purple-400 rotate-60 hover:text-white" />
              </span>
            ))}
          </Link>
        </div>

        {/* ================= PRIVACY & LEGAL BAR ================= */}
        <div className="border-t border-white/20 pt-6 pb-10 flex flex-col md:flex-row justify-between items-center text-xs sm:text-sm text-gray-400 gap-4">
          <p>
            © 2026 LAX360 Pvt Ltd. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-gray-400">
            <Link to="/privacy" className="hover:text-purple-300 transition">
              Privacy Notice
            </Link>
            <span>&bull;</span>
            <button
              onClick={() => setCookieModalOpen(true)}
              className="hover:text-purple-300 transition cursor-pointer underline-offset-2"
            >
              Cookie Preferences
            </button>
            <span>&bull;</span>
            <Link to="/privacy-centre" className="hover:text-purple-300 transition text-purple-400 font-medium">
              Privacy Centre
            </Link>
            <span>&bull;</span>
            <Link to="/terms" className="hover:text-purple-300 transition">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>

      {/* Cookie Preferences Modal */}
      <CookiePreferencesModal
        isOpen={cookieModalOpen}
        onClose={() => setCookieModalOpen(false)}
      />

      {/* MARQUEE ANIMATION */}
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 15s linear infinite;
        }
      `}</style>
    </footer>
  );
};

export default Footer;