"use client";
import { useEffect, useRef, useState } from "react";
import careersBg from "../../assets/images/careers/careers-hero.jpg";

export default function CareersHero() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  const heading =
    "Build the future with us and grow your career at LAX360.";

  const words = heading.split(" ");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center overflow-hidden"
    >
      {/* Background */}
      <img
        src={careersBg}
        alt="Careers"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="max-w-2xl">

          <p className="text-white font-['Poppins'] tracking-widest text-xs sm:text-sm mb-6">
            • CAREERS AT LAX360
          </p>

          <h1 className="font-['Poppins'] font-semibold text-white leading-tight text-[clamp(1.8rem,5vw,3.5rem)] mb-8">
            {words.map((word, index) => (
              <span
                key={index}
                className={`inline-block mr-3 transition-all duration-700 ease-out ${
                  visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 70}ms` }}
              >
                {word}
              </span>
            ))}
          </h1>

          <p className="text-white/90 text-sm sm:text-base md:text-lg leading-relaxed">
            Join a team of innovators shaping the future of digital
            transformation.
          </p>

        </div>
      </div>
    </section>
  );
}