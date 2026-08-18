"use client";
import { useEffect, useRef, useState } from "react";
import visionRobot from "../../assets/images/about/outvision.png";
import bulbImg from "../../assets/images/about/vision-man.png";

const VisionSection = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target); // run animation once
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full vision-section py-28 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16">

        {/* SECTION TITLE */}
        <h2 className="text-center text-purple-500 text-3xl sm:text-8xl font-['Poppins'] font-semibold mb-20">
          Our Vision
        </h2>

        <div className="relative grid lg:grid-cols-3 gap-12 items-center">

          {/* LEFT CARDS */}
          <div className="space-y-10 z-20">

            <div className="relative bg-gray-200 p-6 shadow-xl">
              <h4 className="font-semibold text-lg">
                🌍 Global Technology Partner
              </h4>
              <p className="text-sm mt-3 text-gray-700">
                We envision LAX 360 as a trusted global IT partner known for
                excellence, innovation, and reliability.
              </p>
              <div className="absolute -right-2 -bottom-2 w-full h-full bg-purple-700 -z-10"></div>
            </div>

            <div className="relative bg-purple-700 text-white p-6 shadow-xl ml-6">
              <h4 className="font-semibold text-lg">
                💡 Driving Digital Transformation
              </h4>
              <p className="text-sm mt-3">
                Our vision is to help businesses embrace digital transformation
                through smart, scalable, and future-ready solutions.
              </p>
              <div className="absolute -right-2 -bottom-2 w-full h-full bg-gray-300 -z-10"></div>
            </div>

            <div className="relative bg-gray-200 p-6 shadow-xl">
              <h4 className="font-semibold text-lg">
                🚀 Sustainable Growth & Impact
              </h4>
              <p className="text-sm mt-3 text-gray-700">
                We strive to create long-term value by building technology
                solutions that support growth, efficiency, and a connected
                digital future.
              </p>
              <div className="absolute -right-2 -bottom-2 w-full h-full bg-purple-700 -z-10"></div>
            </div>

          </div>

          {/* CENTER ICON */}
          <div className="hidden lg:flex justify-center z-20">
            <img src={bulbImg} alt="Bulb Icon" className="w-50" />
          </div>

          {/* RIGHT IMAGE */}
          <div
            className={`relative flex justify-center lg:justify-end transition-all duration-1000 ease-out ${visible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-24"
              }`}
          >
            <img
              src={visionRobot}
              alt="Vision Robot"
              className="relative z-10 w-[360px] lg:w-[520px]"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default VisionSection;