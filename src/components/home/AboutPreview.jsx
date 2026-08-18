import { useEffect, useRef, useState } from "react";
import aboutImg from "../../assets/images/home/About.png";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AboutPreview = () => {
  const sectionRef = useRef(null);
  const navigate = useNavigate();
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

  const heading = "Built For Businesses Ready To Break Barriers";

  const words = heading.split(" ");

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-28 px-6 sm:px-10 lg:px-20 about-bg 
             overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        {/* LEFT IMAGE */}
        <div className="relative">
          <img
            src={aboutImg}
            alt="About Preview"
            className="w-full rounded-3xl shadow-2xl object-cover"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div>
          {/* BIG MODERN HEADING */}
          <h2 className="font-['Poppins'] text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight flex flex-wrap gap-x-3">
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

          {/* CONTENT */}
          <p className="mt-10 text-white text-lg leading-relaxed max-w-xl">
            LAX360 is a digital solutions and IT services company based in
            India. It focuses on web development, software solutions, and
            digital marketing services. The company aims to help businesses grow
            using modern technology and smart design. LAX360 works with a
            360-degree approach to deliver end-to-end tech solutions.
          </p>

          {/* CTA */}
          <button className=" mt-10 group cursor-pointer slide-anime px-5 py-3 rounded-full w-[150px] shadow bg-purple-600 text-white flex justify-between items-center font-semibold "
          onClick={()=>navigate("/about")}>
            About Us{" "}
            <div className="group-hover:translate-x-2 transition-all">
              <ArrowRight />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
