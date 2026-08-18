import { useEffect, useRef, useState } from "react";
import web from "../../assets/images/home/service/1.jpeg";
import ai from "../../assets/images/home/service/2.jpeg";
import blockchain from "../../assets/images/home/service/3.jpeg";
import cad from "../../assets/images/home/service/4.jpeg";
import cyber from "../../assets/images/home/service/5.jpeg";
import software from "../../assets/images/home/service/6.jpeg";
import embedded from "../../assets/images/home/service/7.jpeg";
import iot from "../../assets/images/home/service/8.jpeg";
import saas from "../../assets/images/home/service/9.jpeg";
import { useNavigate } from "react-router-dom";

const services = [
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

const ServicesPreview = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(null);
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.3 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  const heading = "Services We Offer";

  const words = heading.split(" ");

  return (
    <section
      ref={sectionRef}
      className="w-full  px-6 sm:px-10 lg:px-16 py-28 services-bg"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="font-['Poppins'] text-4xl sm:text-5xl lg:text-6xl  font-bold leading-tight flex justify-center flex-wrap gap-x-3 pb-10">
          {words.map((word, index) => (
            <span
              key={index}
              className={`inline-block transition-all duration-700 ${visible
                ? "opacity-100 translate-y-0 text-white"
                : "opacity-0 translate-y-6 text-purple-900"
                }`}
              style={{
                transitionDelay: `${index * 120}ms`,
              }}
            >
              {word}
            </span>
          ))}
        </h2>

        {/* MOBILE: Horizontal Scroll */}
        <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory lg:hidden pb-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="min-w-[85%] snap-center relative rounded-xl overflow-hidden cursor-pointer"
              onClick={() =>
                setActiveIndex(activeIndex === index ? null : index)
              }
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-[400px] object-cover"
              />

              <div className="absolute inset-0 bg-black/60"></div>

              <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                {/* Accent Line */}
                <div
                  className={`absolute left-0 bottom-0 h-full w-1 bg-purple-500 
            transition-all duration-500
            ${activeIndex === index ? "translate-y-0" : "translate-y-full"}`}
                ></div>
                <h3 className="text-2xl font-semibold">{service.title}</h3>

                {activeIndex === index && (
                  <div className="mt-4 transition-all duration-500">
                    <p className="text-sm leading-relaxed">
                      {service.description}
                    </p>

                    <button
                      onClick={() => navigate("/services")}
                      className="mt-4 text-sm font-medium"
                    >
                      Expand →
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* DESKTOP: Grid Layout */}
        <div className="hidden lg:grid grid-cols-3 gap-10 ">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative h-[480px] overflow-hidden cursor-pointer 
             hover:-translate-y-2 transition-all duration-500"
            >
              {/* Background Image */}
              <img
                src={service.image}
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover 
               transition-transform duration-700 group-hover:scale-105 group-hover:blur-md"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-all duration-500"></div>

              {/* Accent Line */}
              <div
                className="absolute left-0 top-0 h-full w-1 bg-purple-500 
                  scale-y-0 origin-top 
                  group-hover:scale-y-100 
                  transition-transform duration-500"
              ></div>

              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-between text-white">
                <h3 className="text-2xl font-semibold group-hover:text-4xl">
                  {service.title}
                </h3>

                <div
                  className="translate-y-10 opacity-0 
                    group-hover:translate-y-0 
                    group-hover:opacity-100 
                    transition-all duration-500"
                >
                  <p className="text-sm leading-relaxed group-hover:text-lg">
                    {service.description}
                  </p>

                  <button
                    onClick={() => navigate("/services")}
                    className="mt-6 text-sm font-medium hover:underline-offset-1 cursor-pointer "
                  >
                    Expand →
                    {/* <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-purple-400 transition-all duration-300 group-hover:w-full"></span> */}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
