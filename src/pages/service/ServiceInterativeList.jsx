"use client";
import { ArrowUpRight } from "lucide-react";
import React, { useState } from "react";
import discovery from "../../assets/images/services/discovery.jpeg";
import design from "../../assets/images/services/design.jpeg";
import development from "../../assets/images/services/development.jpeg";
import deployment from "../../assets/images/services/deployment.jpeg";
const services = [
  {
    id: 1,
    title: "Discovery & Planning",
    desc: "We analyze your business requirements, define strategy, and create a structured roadmap to ensure project clarity and success from the start.",
    img: discovery,
  },
  {
    id: 2, 
    title: "Design & Prototyping",
    desc: "Our design team creates intuitive UI/UX prototypes that align with your brand and user expectations, ensuring a seamless experience.",
    img: design,
  },
  {
    id: 3,
    title: "Development & Testing",
    desc: "We develop scalable, secure, and optimized solutions with rigorous testing to guarantee reliability and performance.",
    img: development,
  },
  {
    id: 4,
    title: "Deployment & Support",
    desc: "We ensure smooth deployment and provide continuous monitoring, maintenance, and support to keep your systems running efficiently.",
    img: deployment,
  },
];

export default function ServiceInteractiveList() {
  const [activeId, setActiveId] = useState(null);

  const toggleAccordion = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section className="bg-[#0e0e0e] w-full py-16 md:py-24 workflow-process">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {services.map((item) => {
          const isActive = activeId === item.id;

          return (
            <div key={item.id} className="border-b border-white/20">

              {/* CLICKABLE ROW */}
              <div
                onClick={() => toggleAccordion(item.id)}
                className={`
                  flex items-center justify-between p-8
                  py-6 md:py-10
                  cursor-pointer
                  transition-all duration-300
                  hover:bg-white
                  hover:text-black
                  ${isActive ? "text-white" : "text-white"}
                `}
              >
                <div className="flex items-center gap-4 md:gap-6">

                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-20 h-14 md:w-28 md:h-18 object-cover rounded-md"
                  />

                  <h2
                    className={`
                      font-['Poppins']
                      uppercase
                      text-base sm:text-xl md:text-3xl
                      tracking-wide
                      transition-colors duration-300
                    `}
                  >
                    {item.title}
                  </h2>
                </div>

                <div
                  className={`
                    transition-all duration-300 
                    ${isActive ? "bg-purple-500 text-white rotate-180" : "text-white"}
                    rounded-full p-3
                  `}
                >
                  <ArrowUpRight className="w-5 h-5 md:w-7 md:h-7 " />
                </div>
              </div>

              {/* COLLAPSIBLE CONTENT */}
              <div
                className={`
                  overflow-hidden
                  transition-all duration-500 ease-in-out
                  ${isActive ? "max-h-40 opacity-100 py-4" : "max-h-0 opacity-0"}
                `}
              >
                <p className="text-white bg-purple-500 py-5 text-sm md:text-xl leading-relaxed px-2 md:px-4 pb-4">
                  {item.desc}
                </p>
              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
}