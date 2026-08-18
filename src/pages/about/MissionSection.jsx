"use client";
import { useEffect, useRef, useState } from "react";
import missionImg from "../../assets/images/about/our mission.png";
import targetImg from "../../assets/images/about/mission-arrow.png";

const MissionSection = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target); // run only once
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
      className="relative w-full mission-section py-28 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <h2 className="text-center text-purple-500 text-3xl sm:text-8xl font-['Poppins'] font-semibold mb-16">
          Our Mission
        </h2>

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT SIDE IMAGE */}
          <div
            className={`relative flex justify-center lg:justify-start transition-all duration-1000 ${
              visible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-24"
            }`}
          >
            <img
              src={missionImg}
              alt="Mission Visual"
              className="relative z-10 w-[360px] lg:w-[420px]"
            />
          </div>

          {/* RIGHT SIDE CONTENT */}
          <div className="relative">

            {/* Target Icon */}
            <div className="absolute -left-50 top-35 hidden lg:block">
              <img src={targetImg} alt="Target Icon" className="w-50" />
            </div>

            <div className="space-y-12">

              <div className="relative bg-white p-6 shadow-lg">
                <h4 className="font-semibold text-lg">
                  🚀 Innovation & Technology
                </h4>
                <p className="text-sm mt-3 text-gray-700">
                  We aim to deliver innovative digital solutions by leveraging
                  modern technologies to solve real-world business challenges
                  efficiently.
                </p>
                <div className="absolute bottom-0 right-0 w-full h-2 bg-purple-500"></div>
              </div>

              <div className="relative bg-purple-700 text-white p-6 shadow-lg ml-6">
                <h4 className="font-semibold text-lg">
                  🔒 Quality & Reliability
                </h4>
                <p className="text-sm mt-3">
                  We are committed to maintaining the highest standards of
                  quality, security, and performance across every project we
                  deliver.
                </p>
                <div className="absolute bottom-0 right-0 w-full h-2 bg-white"></div>
              </div>

              <div className="relative bg-white p-6 shadow-lg">
                <h4 className="font-semibold text-lg">
                  🎯 Client-Focused Delivery
                </h4>
                <p className="text-sm mt-3 text-gray-700">
                  Our mission is to understand client needs clearly and provide
                  customized, high-quality solutions that add real business
                  value.
                </p>
                <div className="absolute bottom-0 right-0 w-full h-2 bg-purple-500"></div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;