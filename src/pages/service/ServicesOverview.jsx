"use client";
import { useEffect, useState } from "react";
import ai from "../../assets/images/services/ai.jpeg";
import web from "../../assets/images/services/web.jpeg";
import cyber from "../../assets/images/services/cyber.jpeg";
import cloud from "../../assets/images/services/cloud.jpeg";

const services = [
  {
    img: ai,
    title: "AI & Intelligent Systems",
    desc: "Advanced AI-driven automation and intelligent business solutions.",
  },
  {
    img: web,
    title: "Web & App Development",
    desc: "Scalable web platforms and modern mobile applications.",
  },
  {
    img: cyber,
    title: "Cybersecurity Solutions",
    desc: "Enterprise-grade protection systems securing infrastructure.",
  },
  {
    img: cloud,
    title: "Cloud & DevOps",
    desc: "Cloud-native architecture and DevOps automation.",
  },
];
export default function ServicesOverview() {
  const [active, setActive] = useState(0);
  const [progressKey, setProgressKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => {
        const next = (prev + 1) % services.length;
        setProgressKey((k) => k + 1); // reset animation
        return next;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full services-overview py-24 px-6 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-white font-['Poppins'] text-3xl sm:text-4xl lg:text-5xl font-semibold mb-16">
          Overview of Our Services
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT SIDE NAV */}
          <div className="space-y-6">
            {services.map((service, index) => (
              <div
                key={index}
                onClick={() => {
                  setActive(index);
                  setProgressKey((k) => k + 1);
                }}
                className={`relative p-6 border cursor-pointer transition-all duration-300 overflow-hidden ${
                  active === index
                    ? "border-purple-900 bg-white/5"
                    : "border-white/10"
                }`}
              >
                {/* Animated Indicator */}
                {active === index && (
                  <div
                    key={progressKey}
                    className="absolute left-0 top-0 h-full w-1 bg-purple-900 animate-progress-vertical"
                  />
                )}

                <h3 className="text-white font-semibold text-lg mb-2 pl-3">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm pl-3">{service.desc}</p>
              </div>
            ))}
          </div>

          {/* RIGHT SIDE IMAGE */}
          <div className="relative h-[450px] overflow-hidden rounded-lg">
            {services.map((service, index) => (
              <img
                key={index}
                src={service.img}
                alt={service.title}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                  active === index ? "opacity-100" : "opacity-0"
                }`}
                loading="lazy"
              />
            ))}

            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent"></div>

            <div className="absolute bottom-10 left-10 max-w-md">
              <h3 className="text-white font-['Poppins'] text-2xl sm:text-3xl font-semibold">
                {services[active].title}
              </h3>
              <p className="text-gray-300 mt-3">{services[active].desc}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
