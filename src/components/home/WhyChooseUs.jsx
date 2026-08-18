import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import first from "../../assets/images/home/whyChooseUs/1.jpeg";
import second from "../../assets/images/home/whyChooseUs/2.jpeg";
import third from "../../assets/images/home/whyChooseUs/3.jpeg";

const WhyChooseUs = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const cardRefs = useRef([]);
  const sectionRef = useRef(null);

  const heading = "Why Choose Us";
  const words = heading.split(" ");

  const steps = [
    {
      title: "Proven Performance–Driven Approach",
      description:
        "Our data-driven strategies are backed by measurable results, delivering consistent growth and ROI.",
      image: first,
    },
    {
      title: "Client-Centric Execution",
      description:
        "We align technology with business objectives to create scalable and high-impact solutions.",
      image: second,
    },
    {
      title: "Innovative & Scalable Systems",
      description:
        "We build future-ready platforms designed to evolve with your business needs.",
      image: third,
    },
  ];

  // Section heading reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.3 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Active card detection
  useEffect(() => {
    const observers = cardRefs.current.map((ref, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveIndex(index);
          }
        },
        { threshold: 0.5 },
      );

      if (ref) observer.observe(ref);
      return observer;
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full  sm:py-24 px-6 sm:px-10 lg:px-20 relative overflow-hidden whyChooseUs-bg "
    >
      {/* Section Heading */}
      <div className="max-w-7xl mx-auto mb-16 flex flex-col items-center  sm:mb-20">
        <h2 className=" font-['poppins'] text-4xl sm:text-4xl md:text-5xl font-bold flex flex-wrap gap-x-3 ">
          {words.map((word, index) => (
            <span
              key={index}
              className={`transition-all duration-700 ${
                visible
                  ? "opacity-100 translate-y-0 text-white"
                  : "opacity-0 translate-y-6 text-purple-600"
              }`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              {word}
            </span>
          ))}
        </h2>
      </div>

      {/* Step Cards */}
      <div className="max-w-7xl mx-auto space-y-16 sm:space-y-24">
        {steps.map((step, index) => (
          <div
            key={index}
            ref={(el) => (cardRefs.current[index] = el)}
            className="relative bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300"
          >
            {/* Step Number */}
            <div className="absolute top-6 right-6 sm:right-8 text-[60px] sm:text-[100px] font-bold text-gray-100 select-none">
              {`0${index + 1}`}
            </div>

            <div className="p-6 sm:p-8 lg:p-14">
              <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
                {/* IMAGE */}
                <div>
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-[220px] sm:h-[250px] lg:h-[280px] object-cover rounded-lg"
                  />
                </div>

                {/* CONTENT */}
                <div>
                  <h3
                    className={` font-['poppins'] text-xl sm:text-2xl lg:text-3xl font-semibold transition-colors duration-300 ${
                      activeIndex === index
                        ? "text-purple-700"
                        : "text-gray-900"
                    }`}
                  >
                    {step.title}
                  </h3>

                  <div
                    className={`w-full h-[2px] my-4 sm:my-6 transition-all duration-300 ${
                      activeIndex === index ? "bg-purple-600" : "bg-gray-300"
                    }`}
                  ></div>

                  <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Corner Arrow */}
              <div className="absolute bottom-0 right-0 w-14 h-14 sm:w-16 sm:h-16 bg-purple-600 flex items-center justify-center">
                <ArrowUpRight
                  className={`text-white w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${
                    activeIndex === index ? "rotate-45" : "rotate-0"
                  }`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
