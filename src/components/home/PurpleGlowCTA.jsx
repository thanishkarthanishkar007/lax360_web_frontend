import React from "react";
import { Sparkles } from "../../ui/Sparkle";
import logo from "../../assets/icons/logo.svg";

function PurpleSection() {
  return (
    <>
      <div className="min-h-screen w-full overflow-hidden  py-10">
        {/* TOP CURVE SECTION */}
        <div
          className="relative h-[60vh] w-full overflow-hidden
  before:absolute before:inset-0
  before:bg-[radial-gradient(circle_at_bottom_center,#9333ea_0%,#7e22ce_40%,transparent_75%)]
  before:blur-3xl
  before:opacity-90
            after:absolute after:border-2 
            after:-left-1/2 after:top-1/2 
            after:aspect-[1/1.8] after:w-[200%] 
            after:rounded-[50%] 
            after:border-b after:border-[#9333ea66] 
            after:bg-zinc-900"
        >
          {/* GRID */}
          <div
            className="absolute bottom-0 left-0 right-0 top-0 
              bg-[linear-gradient(to_right,#ffffff2c_1px,transparent_1px),
                   linear-gradient(to_bottom,#3a3a3a01_1px,transparent_1px)] 
              bg-size-[70px_80px]"
          />

          {/* SPARKLES */}
          <Sparkles
            density={400}
            size={1.4}
            direction="top"
            color="#c084fc"
            className="absolute inset-x-0 top-0 h-full w-full 
              mask-[radial-gradient(50%_50%,white,transparent_85%)]"
          />
        </div>

        {/* LOGO CIRCLE */}
        <div className="mx-auto -mt-52 w-screen max-w-2xl relative z-10">
          <div
            className="bg-white backdrop-blur-lg border border-neutral-800 
              p-4 w-28 h-28 mx-auto grid place-content-center rounded-full"
          >
            <img
              src={logo}
              alt="Logo"
              className="w-[100%] h-[100%] text-center"
            />
          </div>
        </div>

        {/* CONTENT */}
        <article className="text-white pt-2 w-2/3 mx-auto block text-center z-10 relative text-xl">
          <h1 className="text-center text-5xl text-white font-medium py-2">
            LAX360
          </h1>
          <p className="text-sm md:text-2xl">LAX360 is a modern digital solutions company delivering scalable
          technology, intelligent systems, and enterprise-grade infrastructure.
          We empower businesses with secure digital transformation,
          performance-driven strategies, and innovative solutions built for
          sustainable growth.</p>
        </article>
      </div>
    </>
  );
}

export default PurpleSection;
