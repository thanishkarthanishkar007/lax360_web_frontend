"use client";
import { useEffect, useRef, useState } from "react";
import ai from "../../assets/images/about/about-overview.png";
import arch from "../../assets/images/about/arch.jpeg";
import artificial from "../../assets/images/about/artificial.jpeg";
import cloud from "../../assets/images/about/cloud-service.jpeg";
import modern from "../../assets/images/about/modern.jpeg";

const OverviewSection = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  const [visible, setVisible] = useState(false);
  const [img, setImg] = useState({
    src: null,
    alt: "",
    opacity: 0,
  });

  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Smooth cursor follow animation
  useEffect(() => {
    const animate = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.15;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.15;

      if (imageRef.current) {
        imageRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  const handleMove = (e) => {
    if (!containerRef.current || !imageRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();

    mouse.current.x =
      e.clientX - rect.left - imageRef.current.offsetWidth / 2;

    mouse.current.y =
      e.clientY - rect.top - imageRef.current.offsetHeight / 2;
  };

  const features = [
    {
      img: arch,
      title: "Scalable Architecture",
      desc: "Systems designed to scale with your business growth.",
    },
    {
      img: artificial,
      title: "AI & Intelligent Automation",
      desc: "Automation powered by smart data-driven insights.",
    },
    {
      img: cloud,
      title: "Secure Cloud Infrastructure",
      desc: "Enterprise-grade digital protection and cloud systems.",
    },
    {
      img: modern,
      title: "Modern Web Platforms",
      desc: "High-performance web applications built for speed.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden py-20 lg:py-28 about-overviewBg"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 grid lg:grid-cols-2 gap-12 items-start">

        {/* LEFT CONTENT */}
        <div
          ref={containerRef}
          onMouseMove={handleMove}
          className="relative text-white"
        >
          <h2 className="font-['Poppins'] text-purple-500 text-3xl sm:text-4xl lg:text-8xl font-bold mb-10">
            Overview
          </h2>

          <h3 className="text-xl text-purple-300 sm:text-2xl font-semibold mb-6">
            At LAX360 Pvt Ltd
          </h3>

          <p className="text-gray-200 leading-relaxed text-sm sm:text-base max-w-xl mb-12">
            LAX360 is a technology-focused IT solutions company dedicated to
            delivering innovative, scalable, and reliable digital services.
            We specialize in building modern web and mobile applications,
            cloud-based solutions, and intelligent systems that help
            businesses grow and adapt in today’s digital landscape.
          </p>

          {/* Features */}
          <div className="space-y-10">
            {features.map((item) => (
              <div
                key={item.title}
                onMouseEnter={() =>
                  setImg({ src: item.img, alt: item.title, opacity: 1 })
                }
                onMouseLeave={() =>
                  setImg({ src: null, alt: "", opacity: 0 })
                }
                className="group cursor-pointer border-b border-white/20"
              >
                <h4 className="font-['Poppins'] text-2xl sm:text-3xl font-semibold group-hover:text-purple-300 transition">
                  {item.title}
                </h4>

                <p className="text-gray-200 mt-3 text-sm sm:text-base max-w-xl group-hover:text-gray-100 transition">
                  {item.desc}
                </p>

                <div className="h-[2px] w-0 bg-gradient-to-r from-purple-900 to-blue-400 mt-4 transition-all duration-500 group-hover:w-full" />
              </div>
            ))}
          </div>

          {/* Floating Image */}
          {img.src && (
            <img
              ref={imageRef}
              src={img.src}
              alt={img.alt}
              className="hidden lg:block w-[320px] h-[220px] rounded-xl object-cover absolute top-0 left-0 pointer-events-none shadow-2xl transition-opacity duration-300"
              style={{ opacity: img.opacity }}
            />
          )}
        </div>

        {/* RIGHT IMAGE */}
        <div
          className={`relative flex justify-center lg:justify-end transition-all duration-1000 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-16"
            }`}
        >
          <img
            src={ai}
            alt="AI Overview"
            className="w-[320px] sm:w-[420px] lg:w-[520px] object-contain lg:absolute"
          />
        </div>

      </div>
    </section>
  );
};

export default OverviewSection;