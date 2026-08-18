"use client";
import React from "react";
import {Link } from "react-router-dom";

const ValueSection = () => {
  const cards = [
    {
      color: "bg-red-600",
      title: "We drive reinvention with innovation and human ingenuity.",
      hoverText:
        "We are celebrating our growth and innovation milestones that define our leadership in digital transformation.",
    },
    {
      color: "bg-blue-700",
      title: "We service our clients, customers and employees with excellence.",
      hoverText:
        "Delivering trusted solutions worldwide while building long-term strategic partnerships.",
    },
    {
      color: "bg-purple-800",
      title: "We create exceptional experiences for our people.",
      hoverText:
        "Empowering teams through collaboration, innovation, and a culture of excellence.",
    },
  ];

  return (
    <section className="w-full value-section py-28 px-6 lg:px-16 ">
      <div className="max-w-7xl mx-auto">
        {/* HEADING */}
        <h2 className="text-purple-500 font-['Poppins'] text-3xl sm:text-5xl lg:text-7xl font-semibold mb-16 max-w-4xl">
          We’re recognized for the value we create together
        </h2>

        {/* CARDS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`relative overflow-hidden h-[320px] ${card.color} p-10 group cursor-pointer`}
            >
              {/* INITIAL TEXT */}
              <div className="absolute inset-0 flex items-end p-10 transition-all duration-500 group-hover:-translate-y-full">
                <p className="text-white text-lg sm:text-xl leading-relaxed">
                  {card.title}
                </p>
              </div>

              {/* HOVER TEXT */}
              <div className="absolute inset-0 flex flex-col justify-between p-10 translate-y-full group-hover:translate-y-0 transition-all duration-500">
                <p className="text-white text-base sm:text-lg leading-relaxed">
                  {card.hoverText}
                </p>

                <Link
                  to={"/services"}
                  className="text-white mt-8 font-semibold flex items-center gap-2"
                >
                  Learn more →
                </Link>
              </div>

              {/* Background Decorative Lines */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 400 300"
                  fill="none"
                >
                  <circle
                    cx="300"
                    cy="80"
                    r="120"
                    stroke="white"
                    strokeWidth="1"
                  />
                  <circle
                    cx="100"
                    cy="200"
                    r="150"
                    stroke="white"
                    strokeWidth="1"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueSection;
