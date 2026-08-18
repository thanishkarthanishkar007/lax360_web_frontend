import { useEffect, useRef, useState } from "react";
import heroVideo from "../../assets/videos/hero.mp4";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.4 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const paragraphText =
    "LAX 360 is a full-service product design and development company offering Graphic Design & Branding, App Development, Software Development, CAD Design & Product Modeling.";

  const paragraphWords = paragraphText.split(" ");

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Background Video */}
      <video
        src={heroVideo}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover -z-20"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 -z-10"></div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full text-center px-6 text-white">
        <div className="max-w-4xl">
          <span
            className={`transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            } font-['Inter'] text-xs sm:text-sm tracking-[0.25em] uppercase text-purple-300 mb-4 block`}
          >
            Empowering Ideas
          </span>

          <h1
            className={`transition-all duration-700 delay-150 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            } font-['Poppins'] font-bold leading-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl`}
          >
            Our Vision <br />
            <span className="glow-text">360°</span>
            Execution
          </h1>

          <p className="mt-6 font-['Inter'] text-gray-300 text-base md:text-lg leading-relaxed flex flex-wrap justify-center gap-x-2">
            {paragraphWords.map((word, index) => (
              <span
                key={index}
                className={`transition-all duration-500 ${
                  visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
                style={{
                  transitionDelay: `${index * 60}ms`,
                }}
              >
                {word}
              </span>
            ))}
          </p>

          <div
            className={`transition-all duration-700 delay-500 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            } mt-8 flex flex-wrap justify-center gap-4`}
            onClick={() => navigate("/services")}
          >
            <Button>Discover Now</Button>
          </div>
        </div>
      </div>

      {/* Glow Animation */}
      <style>
        {`
          .glow-text {
            background: linear-gradient(90deg, #38bdf8, #a855f7, #6366f1);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-size: 200% auto;
            animation: gradientMove 4s linear infinite;
            text-shadow: 0 0 18px rgba(168,85,247,0.6);
          }

          @keyframes gradientMove {
            0% { background-position: 0% center; }
            100% { background-position: 200% center; }
          }
        `}
      </style>
    </section>
  );
};

export default Hero;
