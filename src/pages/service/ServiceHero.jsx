"use client";
import { useEffect, useRef, useState } from "react";
import serviceBg from "../../assets/images/services/service -hero.jpeg"

const ServiceHero = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* BACKGROUND IMAGE */}
      <img
        src={serviceBg}
        alt="Intelligent Digital Services"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* SOFT OVERLAY (LESS DARK) */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* GRADIENT FADE (TOP & BOTTOM FOR DEPTH) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/70"></div>

      {/* CONTENT */}
      <div className="relative z-10 text-center px-6 max-w-4xl">

        <div
          className={`transition-all duration-1000 ${
            visible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="font-['Poppins'] text-3xl sm:text-4xl md:text-5xl lg:text-8xl font-bold text-white leading-tight">
            Intelligent Digital Services
          </h1>

          <p className="mt-6 text-gray-200 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            We deliver scalable, secure and performance-driven technology
            solutions that empower businesses to innovate, transform and grow.
          </p>
        </div>

      </div>
    </section>
  );
};

export default ServiceHero;