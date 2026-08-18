"use client";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import heroImage from "../../assets/images/contact/contact-hero.jpg"; // your image
import Button from "../../ui/Button";

const ContactHero = () => {
    const sectionRef = useRef(null);
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);

    const heading =
        "Let’s Connect and Build the Future Together";

    const words = heading.split(" ");

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                } else {
                    setVisible(false); // re-trigger when revisiting
                }
            },
            { threshold: 0.4 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full min-h-screen overflow-hidden flex items-center"
        >
            {/* BACKGROUND IMAGE */}
            <img
                src={heroImage}
                alt="Contact Hero"
                className="absolute inset-0 w-full h-full object-cover object-center"
            />

            {/* RIGHT SIDE CONTENT CONTAINER */}
            <div className="relative z-10 w-full flex justify-end">
                <div className="max-w-3xl px-6 md:px-16 lg:px-24 text-left">

                    {/* TAG */}
                    <p className="text-purple-300 font-['Poppins'] tracking-widest text-sm mb-6">
                        • CONTACT LAX360 •
                    </p>

                    {/* HEADING WITH REVEAL */}
                    <h1 className="font-['Poppins'] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight">

                        {words.map((word, index) => (
                            <span
                                key={index}
                                className={`inline-block mr-3 transition-all duration-700 ${visible
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-10"
                                    }`}
                                style={{ transitionDelay: `${index * 80}ms` }}
                            >
                                {word}
                            </span>
                        ))}

                    </h1>

                    {/* SUBTEXT */}
                    <p className="mt-8 mb-8 text-gray-200 text-sm sm:text-base md:text-lg font-['Poppins']">
                        Whether you have a project in mind or need expert digital solutions,
                        our team is ready to collaborate and bring your vision to life.
                    </p>

                    {/* CTA */}
                    <Button onClick={() => navigate("/about")}>Know More</Button>

                </div>
            </div>
        </section>
    );
};

export default ContactHero;