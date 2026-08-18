import { useEffect, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import logo from "../../assets/icons/logo.svg";
import logo2 from "../../../public/laxLogo.jpg";
import RevealText from "../../ui/RevealText";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = ["Home", "About", "Services", "Careers"];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled
          ? "bg-[#0f0f2d]/80 backdrop-blur-md shadow-lg"
          : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between h-16">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-1 cursor-pointer">
          <img src={logo} alt="Logo" className="w-full h-10" />
          <span className="font-['Poppins'] text-xl font-semibold text-white">
            <RevealText text="LAX 360" />
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, index) => {
            const path = link === "Home" ? "/" : `/${link.toLowerCase()}`;
            const isActive = location.pathname === path;

            return (
              <Link
                key={index}
                to={path}
                className={`relative font-['Inter'] group transition duration-300 ${isActive ? "text-purple-400" : "text-white"
                  }`}
              >
                {link}

                <span
                  className={`absolute left-0 bottom-0 h-[2px] bg-purple-400 transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                ></span>
              </Link>
            );
          })}

          {/* Contact Us Button */}
          <Link
            to="/contact"
            className="group relative cursor-pointer p-2 w-36 border bg-purple-100 rounded-full overflow-hidden text-black text-center font-semibold "
          >
            <span className="translate-x-1 group-hover:translate-x-12 group-hover:opacity-0 transition-all duration-300 inline-block ml-4">
              Contact Us
            </span>

            <div className="flex gap-2 text-white z-10 items-center absolute top-0 h-full w-full justify-center translate-x-12 opacity-0 group-hover:-translate-x-1 group-hover:opacity-100 transition-all duration-300">
              <span>Contact Us</span>
              <ArrowRight size={18} />
            </div>

            <div className="absolute top-[40%] left-[20%] h-2 w-2 group-hover:h-full group-hover:w-full rounded-lg bg-black group-hover:bg-purple-400 group-hover:scale-[1.8] transition-all duration-300 group-hover:top-[0%] group-hover:left-[0%]"></div>
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden text-white">
          <button onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0f0f2d]/95 backdrop-blur-md px-6 py-6 space-y-4 text-center text-white">
          {navLinks.map((link, index) => {
            const path = link === "Home" ? "/" : `/${link.toLowerCase()}`;
            const isActive = location.pathname === path;

            return (
              <Link
                key={index}
                to={path}
                onClick={() => setMobileOpen(false)}
                className={`block font-['Inter'] transition duration-300 ${isActive ? "text-purple-400" : "hover:text-purple-400"
                  }`}
              >
                {link}
              </Link>
            );
          })}

          {/* Mobile Contact Button */}
          <Link
            to="/contact"
            onClick={() => setMobileOpen(false)}
            className="mt-4 inline-block px-6 py-2 rounded-full border border-purple-400 text-white hover:bg-purple-500 transition duration-300"
          >
            Contact Us
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;