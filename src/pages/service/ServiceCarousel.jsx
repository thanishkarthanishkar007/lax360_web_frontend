"use client";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config/api";
import web from "../../assets/images/home/service/1.jpeg";
import ai from "../../assets/images/home/service/2.jpeg";
import blockchain from "../../assets/images/home/service/3.jpeg";
import cad from "../../assets/images/home/service/4.jpeg";
import cyber from "../../assets/images/home/service/5.jpeg";
import software from "../../assets/images/home/service/6.jpeg";
import embedded from "../../assets/images/home/service/7.jpeg";
import iot from "../../assets/images/home/service/8.jpeg";
import saas from "../../assets/images/home/service/9.jpeg";

const fallbackImageMap = {
  "Web 3.0": web,
  "AI Solutions": ai,
  "Blockchain": blockchain,
  "CAD Design": cad,
  "Cyber Security": cyber,
  "Software Services": software,
  "Embedded Systems": embedded,
  "IoT Solutions": iot,
  "SaaS Solutions": saas,
};

const initialServices = [
  {
    title: "Web 3.0",
    description:
      "End-to-end digital solutions designed to enhance business efficiency, scalability, and online presence.",
    image: web,
  },
  {
    title: "AI Solutions",
    description:
      "Result-driven AI-powered solutions that automate processes, analyze data, and enhance intelligent decision-making for modern businesses.",
    image: ai,
  },
  {
    title: "Blockchain",
    description:
      "Secure and transparent blockchain solutions for decentralized applications, smart contracts, and enterprise-grade digital systems.",
    image: blockchain,
  },
  {
    title: "CAD Design",
    description:
      "Precision-driven CAD design and product modeling services for manufacturing, engineering, and prototyping needs.",
    image: cad,
  },
  {
    title: "Cyber Security",
    description:
      "Advanced cybersecurity solutions that protect businesses from digital threats, cyber attacks, and data breaches.",
    image: cyber,
  },
  {
    title: "Software Services",
    description:
      "Custom software development solutions tailored to meet business requirements, improve productivity, and streamline operations.",
    image: software,
  },
  {
    title: "Embedded Systems",
    description:
      "Development of embedded systems for smart devices, industrial automation, and hardware-integrated applications.",
    image: embedded,
  },
  {
    title: "IoT Solutions",
    description:
      "Internet of Things (IoT) solutions that connect devices, enable real-time monitoring, and automate smart business operations.",
    image: iot,
  },
  {
    title: "SaaS Solutions",
    description:
      "Scalable Software-as-a-Service (SaaS) platforms that deliver cloud-based applications, subscription services, and enterprise software solutions.",
    image: saas,
  },
];

export default function ServicesCarousel() {
  const trackRef = useRef(null);
  const animationRef = useRef(null);

  const [services, setServices] = useState(initialServices);
  const [isHovered, setIsHovered] = useState(false);
  const [speed, setSpeed] = useState(0.5); //SPEED CONTROL
  const [position, setPosition] = useState(0);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const dragStartPos = useRef(0);

  // Fetch dynamic services from backend
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/services`);
        const data = response.data?.services;
        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.map((s, index) => ({
            title: s.title,
            description: s.description,
            image:
              s.image ||
              fallbackImageMap[s.title] ||
              initialServices[index % initialServices.length]?.image ||
              web,
          }));
          setServices(mapped);
        }
      } catch (err) {
        console.warn("Using default services:", err.message);
      }
    };

    fetchServices();
  }, []);

  // duplicate for infinite scrolling
  const duplicated = [...services, ...services];

  // AUTO SCROLL ENGINE (no lag)
  useEffect(() => {
    const animate = () => {
      if (!isHovered && !isDragging.current) {
        setPosition((prev) => prev - speed);
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [isHovered, speed]);

  // LOOP RESET
  useEffect(() => {
    if (!trackRef.current) return;
    const width = trackRef.current.scrollWidth / 2;
    if (Math.abs(position) >= width) {
      setPosition(0);
    }
  }, [position]);

  // DRAG SUPPORT
  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.clientX;
    dragStartPos.current = position;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const delta = e.clientX - startX.current;
    setPosition(dragStartPos.current + delta);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  return (
    <section className="w-full software-services py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-6">
          <h2 className="text-white font-['Poppins'] text-3xl sm:text-4xl lg:text-5xl font-semibold">
            Our Software Services
          </h2>

          {/* SPEED CONTROL */}
          <div className="flex items-center gap-3 text-white text-sm">
            <span>Speed</span>
            <input
              type="range"
              min="0.2"
              max="2"
              step="0.1"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-32 bg-purple-800"
            />
          </div>
        </div>

        {/* CAROUSEL */}
        <div
          className="relative cursor-grab active:cursor-grabbing"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <div
            ref={trackRef}
            className="flex gap-8 select-none"
            style={{
              transform: `translateX(${position}px)`,
              transition: isDragging.current ? "none" : "transform 0.1s linear",
            }}
          >
            {duplicated.map((service, index) => (
              <div
                key={index}
                className="w-[280px] sm:w-[320px] lg:w-[360px] flex-shrink-0 group"
              >
                <div className="relative h-[420px] rounded-3xl overflow-hidden bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 group-hover:border-purple-900 transition-all duration-500">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = web;
                    }}
                  />

                  <div className="p-6">
                    <h3 className="text-white font-semibold text-xl mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
