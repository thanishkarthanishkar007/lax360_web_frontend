"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function AiBreakthroughSection() {
    const sectionRef = useRef(null);
    const [visible, setVisible] = useState(false);

    const text =
        "Your next digital breakthrough powered by AI solutions";
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
            className="relative w-full overflow-hidden rounded-b-full bg-white/10 text-white py-24 sm:py-32"
        >
            {/* Radial Glow Background */}
            <div className="absolute inset-0 flex justify-center pointer-events-none">
                <div
                    className="
            w-[1200px] h-[1200px]
            bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15),transparent_70%)]
            rounded-full
            translate-y-[30%]
          "
                />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">

                {/* Small Top Text */}
                <p className="text-sm sm:text-base text-gray-400 mb-6 tracking-wide">
                    Empowering your brand with AI-driven digital transformation
                </p>

                {/* Word Reveal H2 */}
                <h2
                    className="
            font-['Poppins']
            font-semibold
            leading-tight
            mb-8
            text-[clamp(1.8rem,5vw,3.5rem)]
          "
                >
                    {words.map((word, index) => (
                        <span
                            key={index}
                            className={`inline-block mr-3 transition-all duration-700 ease-out  text-purple-500 ${visible
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-8"
                                }`}
                            style={{
                                transitionDelay: `${index * 70}ms`,
                            }}
                        >
                            {word}
                        </span>
                    ))}
                </h2>

                {/* Supporting Text */}
                <p className="text-gray-300 max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed mb-12">
                    Ready to scale your business? Partner with LAX360 and unlock
                    intelligent, secure and performance-driven solutions that accelerate
                    innovation and measurable growth.
                </p>

                {/* CTA */}
                <Link to="/contact" className="
          group
          inline-flex
          items-center
          gap-3
          px-10
          py-4
          rounded-full
          font-semibold
          text-white
          text-base
          bg-gradient-to-r from-purple-700 via-fuchsia-600 to-purple-500
          hover:scale-105
          transition-all duration-300
          shadow-lg shadow-purple-800/40
        ">
                    Get Started
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>

            </div>
        </section>
    );
}