import { useEffect, useRef, useState } from "react";
import finance from "../../assets/images/home/project/1.jpeg";
import enterprise from "../../assets/images/home/project/3.jpeg";
import ai from "../../assets/images/home/project/5.jpeg";
import industrial from "../../assets/images/home/project/6.jpeg";
import cyberSecurity from "../../assets/images/home/project/7.jpeg";
import healthcare from "../../assets/images/home/project/8.jpeg";
import { useNavigate } from "react-router-dom";
const projects = [
  {
    title: "Digital Asset Investment Platform",
    category: "Finance",
    description:
      "A secure and scalable financial technology platform enabling digital asset management, real-time market integration, portfolio analytics, and seamless transaction processing.",
    image: finance,
  },
  {
    title: "Enterprise Operations Management System",
    category: "Operations",
    description:
      "Integrated business operations platform designed to streamline workflows, automate processes, and provide data-driven insights for large-scale organizations.",
    image: enterprise,
  },
  {
    title: "AI-Powered Business Intelligence Suite",
    category: "Analytics",
    description:
      "Advanced analytics and AI solution delivering predictive insights, automation capabilities, and strategic decision-making tools for modern enterprises.",
    image: ai,
  },
  {
    title: "Industrial Engineering & Design Platform",
    category: "Manufacturing",
    description:
      "Comprehensive CAD and product modeling solution supporting precision engineering, manufacturing workflows, and scalable design architecture.",
    image: industrial,
  },
  {
    title: "Cybersecurity & Infrastructure Framework",
    category: "Security",
    description:
      "Robust digital security framework focused on threat detection, data protection, secure authentication, and enterprise-grade infrastructure resilience.",
    image: cyberSecurity,
  },
  {
    title: "Healthcare & Service Management Portal",
    category: "Healthcare",
    description:
      "Modern service management platform enabling appointment scheduling, digital records management, operational dashboards, and user-centric accessibility.",
    image: healthcare,
  },
];

const ProjectsStack = () => {
  const navigate = useNavigate();
  const headingRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.4 },
    );

    if (headingRef.current) observer.observe(headingRef.current);
    return () => observer.disconnect();
  }, []);

  const heading = "Future-Proof Your Digital Growth Strategy";
  const words = heading.split(" ");

  return (
    <section className="w-full  text-black project-bg pt-20 ">
      {/* SLOGAN HEADING */}
      <div className=" flex items-center justify-center text-center px-6">
        <h2
          ref={headingRef}
          className="font-['Poppins'] text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight flex flex-wrap gap-x-3 pb-10"
        >
          {words.map((word, index) => (
            <span
              key={index}
              className={`inline-block transition-all duration-700 ${
                visible
                  ? "opacity-100 translate-y-0 text-white"
                  : "opacity-0 translate-y-6 text-purple-600"
              }`}
              style={{
                transitionDelay: `${index * 120}ms`,
              }}
            >
              {word}
            </span>
          ))}
        </h2>
      </div>

      {/* STACKING CARDS */}
      <div className="relative">
        {projects.map((project, index) => (
          <div
            key={index}
            className="sticky top-0 h-screen flex items-center justify-center"
            style={{ zIndex: index + 1 }}
          >
            <div
              className="relative w-[95%] lg:w-[90%] h-[80vh] rounded-3xl overflow-hidden shadow-2xl"
              style={{
                marginTop: `${index + 0}px`,
              }}
            >
              {/* Background Image */}
              <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30"></div>

              {/* Floating Content Card */}
              <div
                className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2
                        md:left-16 md:translate-x-0
                        bg-white text-black rounded-2xl p-8 
                        w-[90%] sm:w-[70%] md:w-[45%] 
                        shadow-xl
                        "
              >
                {/* Category Tag */}
                <span className="text-xs uppercase tracking-wide bg-neutral-200 px-3 py-1 rounded-md">
                  {project.category}
                </span>

                {/* Project Title */}
                <h3 className=" font-['Poppins'] mt-6 text-2xl md:text-3xl font-semibold leading-snug">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="mt-4 text-sm md:text-base text-neutral-600 leading-relaxed">
                  {project.description}
                </p>

                {/* CTA */}
                <button
                  className="mt-6 flex items-center gap-3 text-black font-medium group"
                  onClick={() => navigate("/contact")}
                >
                  <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white text-xl transition-all duration-300 group-hover:scale-110">
                    +
                  </div>
                  <span className="relative top-1">Contact Us</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="h-[50vh]"></div>
    </section>
  );
};

export default ProjectsStack;
