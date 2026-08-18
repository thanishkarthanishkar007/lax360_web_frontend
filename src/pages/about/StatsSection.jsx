"use client";
import { useEffect, useState } from "react";
import stats from "../../assets/videos/about-stats.mp4";

const StatsSection = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative w-full h-[80vh] min-h-[600px] overflow-hidden">
      {/* ================= VIDEO BACKGROUND ================= */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={stats} type="video/mp4" />
      </video>

      {/* ================= DARK OVERLAY ================= */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 flex flex-col justify-center items-center text-center h-full px-6">
        {/* HEADING */}
        <h2 className="font-['Poppins'] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight max-w-4xl">
          <span className="text-purple-400">✓ Take the right step,</span>
          <br />
          <span className="text-white">do the big things.</span>
        </h2>

        {/* STATS GRID */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-12 w-full max-w-6xl">
          <StatItem number="100+" label="Cases Solved" visible={visible} />
          <StatItem number="20+" label="Trained Experts" visible={visible} />
          <StatItem number="70+" label="Solutions" visible={visible} />
          <StatItem number="100%" label="Satisfied Clients" visible={visible} />
        </div>
      </div>
    </section>
  );
};

const StatItem = ({ number, label, visible }) => {
  return (
    <div
      className={`transition-all duration-1000 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <h3 className="text-white text-4xl sm:text-5xl font-bold">{number}</h3>
      <p className="text-gray-300 mt-2 text-sm sm:text-base">{label}</p>
    </div>
  );
};

export default StatsSection;
