import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

const testimonials = [
  {
    name: "Hannah Schmitt",
    role: "Lead Designer",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "LAX360 delivered exceptional design precision and scalable digital architecture that elevated our entire platform experience.",
  },
  {
    name: "Daniel Roberts",
    role: "CEO",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "Their performance-driven development strategy helped us improve operational efficiency and accelerate growth.",
  },
  {
    name: "Sophia Miller",
    role: "Product Head",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    text: "We experienced seamless integration, enterprise-grade security, and reliable infrastructure deployment.",
  },
  {
    name: "Arjun Sharma",
    role: "CTO",
    image: "https://randomuser.me/api/portraits/men/76.jpg",
    text: "Highly professional execution with deep technical understanding and strategic clarity.",
  },
  {
    name: "Priya Nair",
    role: "Product Head",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    text: "Their system architecture transformed our digital ecosystem with measurable ROI improvements.",
  },
  {
    name: "James Carter",
    role: "Operations Director",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    text: "Reliable, innovative, and scalable solutions tailored exactly to enterprise needs.",
  },
];

const TestimonialSection = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const headingRef = useRef(null);

  // Heading reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.4 },
    );

    if (headingRef.current) observer.observe(headingRef.current);
    return () => observer.disconnect();
  }, []);

  // Auto loop
  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [paused]);

  const next = () => setIndex((prev) => (prev + 1) % testimonials.length);

  const prev = () =>
    setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));

  const heading = "What Our Clients Say About Us";
  const words = heading.split(" ");

  return (
    <section className="relative w-full py-24 px-6 overflow-hidden">
      {/* Heading */}
      <div ref={headingRef} className="text-center mb-16">
        <h2 className="flex flex-wrap justify-center gap-x-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
          {words.map((word, i) => (
            <span
              key={i}
              className={`transition-all duration-700 ${visible
                  ? "opacity-100 translate-y-0 blur-0"
                  : "opacity-0 translate-y-8 blur-sm"
                }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              {word}
            </span>
          ))}
        </h2>

        <p className="mt-6 text-gray-400 max-w-3xl mx-auto text-sm sm:text-base">
          We focus on delivering performance-driven solutions, scalable
          infrastructure, and measurable results that empower businesses for
          long-term growth and digital excellence.
        </p>
      </div>

      {/* Slider */}
      <div className="relative flex items-center justify-center max-w-6xl mx-auto">
        {/* Left Arrow */}
        <button
          onClick={prev}
          className="
    absolute 
    left-2 sm:left-4 md:-left-6 
    top-1/2 -translate-y-1/2
    z-30 
    p-3 
    bg-purple-600 
    rounded-full 
    text-white 
    hover:bg-purple-700 
    transition
  "
        >
          <ChevronLeft />
        </button>
        {/* Cards */}
        <div className="relative flex justify-center items-center w-full h-[420px]">
          {testimonials.map((item, i) => {
            const offset =
              (i - index + testimonials.length) % testimonials.length;

            const isActive = offset === 0;
            const isNext = offset === 1;
            const isPrev = offset === testimonials.length - 1;

            return (
              <div
                key={i}
                className={`absolute transition-all duration-700 ease-in-out ${isActive
                    ? "scale-100 opacity-100 z-20"
                    : isNext
                      ? "hidden sm:block translate-x-[220px] rotate-6 scale-90 opacity-50"
                      : isPrev
                        ? "hidden sm:block -translate-x-[220px] -rotate-6 scale-90 opacity-50"
                        : "opacity-0 scale-75 hidden"
                  }`}
              >
                {/* Purple Shadow Layer */}
                <div className="absolute inset-0 bg-purple-600 rounded-[40px] rotate-6 -z-10"></div>

                {/* Main Card */}
                <div className="w-[280px] sm:w-[360px] md:w-[420px] bg-black rounded-[40px] p-8 md:p-10 text-white shadow-2xl">
                  <div className="flex flex-col items-center text-center">
                    <img
                      src={item.image}
                      alt=""
                      className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-purple-500 object-cover"
                    />

                    <h3 className="mt-4 text-lg md:text-xl font-semibold">
                      {item.name}
                    </h3>
                    <span className="text-purple-400 text-sm">{item.role}</span>

                    <p className="mt-6 text-gray-300 text-sm md:text-base leading-relaxed">
                      “{item.text}”
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Arrow */}
        <button
          onClick={next}
          className="
    absolute 
    right-2 sm:right-4 md:-right-6 
    top-1/2 -translate-y-1/2
    z-30 
    p-3 
    bg-purple-600 
    rounded-full 
    text-white 
    hover:bg-purple-700 
    transition
  "
        >
          <ChevronRight />
        </button>
      </div>

      {/* Pause Button */}
      <div className="flex justify-center mt-10">
        <button
          onClick={() => setPaused(!paused)}
          className="p-3 bg-purple-600 rounded-full text-white hover:bg-purple-700 transition"
        >
          {paused ? <Play size={18} /> : <Pause size={18} />}
        </button>
      </div>
    </section>
  );
};

export default TestimonialSection;
