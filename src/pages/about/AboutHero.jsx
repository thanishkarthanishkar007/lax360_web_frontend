"use client";
import { useEffect, useRef, useState } from "react";
import hero from "../../assets/images/about/heroAbout.png";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";

const AboutHero = () => {
  const ref = useRef(null);
  const navigate =useNavigate();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setShow(true),
      { threshold: 0.4 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative w-full min-h-screen flex items-center overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url(" + hero + ")",
        }}
      />

      {/* LEFT DARK GRADIENT FOR READABILITY */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
        <div className="max-w-xl text-white">
          {/* Small Tag */}
          <p
            className={`uppercase tracking-widest text-purple-400 text-sm mb-6 transition-all duration-700 ${
              show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            About LAX360
          </p>

          {/* Main Heading */}
          <h1
            className={`font-['Poppins'] text-xl sm:text-2xl lg:text-3xl font-bold leading-tight transition-all duration-1000 ${
              show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Empowering Innovation <br />
            Through Intelligent <br />
            Digital Transformation
          </h1>

          {/* Accent Glow Line */}
          <div
            className={`h-[3px] w-20 bg-gradient-to-r from-purple-500 to-pink-500 mt-6 transition-all duration-1000 ${
              show ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
            } origin-left`}
          />

          {/* Description */}
          <p
            className={`mt-8 text-gray-300 text-base sm:text-lg leading-relaxed transition-all duration-1000 ${
              show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            We merge human creativity with advanced AI precision to build
            scalable, secure, and future-ready digital ecosystems. Our solutions
            are engineered for performance, innovation, and measurable growth.
          </p>

          {/* CTA */}
          <div
            className={`mt-10 transition-all duration-1000 ${
              show ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
            style={{ transitionDelay: "500ms" }}
          >
            <Button onClick={() => navigate("/contact")}>Contact Us</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
