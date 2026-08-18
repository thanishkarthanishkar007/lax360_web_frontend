"use client";
import { useEffect, useRef, useState } from "react";
import robot from "../../assets/images/services/center.png";

export default function WorkflowSection() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  const text =
    "At LAX360, we follow a proven methodology for every project to ensure innovation, precision, scalability, and exceptional results.";

  const words = text.split(" ");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        } else {
          setVisible(false); 
        }
      },
      { threshold: 0.3 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden" 
    >
      {/* Background */}
      <img
        src={robot}
        alt="Workflow"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Content */}
      <div className="relative z-10 w-full h-full flex items-start justify-end px-6 md:px-24">
        <div className="mt-20 max-w-2xl">
          <p className="text-purple-400 tracking-widest text-xs sm:text-sm mb-6">
            • OUR WORKFLOW PROCESS 
          </p>

          <h2 className="text-xl sm:text-3xl md:text-4xl font-semibold text-white leading-relaxed">
            {words.map((word, index) => (
              <span
                key={index}
                className={`inline-block mr-2 transition-all duration-700 ease-out ${
                  visible
                    ? "opacity-100 translate-y-0 blur-0"
                    : "opacity-0 translate-y-8 blur-sm"
                }`}
                style={{ transitionDelay: `${index * 70}ms` }}
              >
                {word}
              </span>
            ))}
          </h2>
        </div>
      </div>
    </section>
  );
}
