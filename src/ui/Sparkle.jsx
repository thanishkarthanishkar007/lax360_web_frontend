"use client";
import { useEffect, useId, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export function Sparkles({
  className,
  size = 3.2,
  minSize = null,
  density = 800,
  speed = 4.5,
  minSpeed = null,
  opacity = 1,
  direction = "",
  opacitySpeed = 3,
  minOpacity = null,
  color = "#ffffff",
  mousemove = false,
  hover = false,
  background = "transparent",
  options = {},
}) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setIsReady(true);
    });
  }, []);

  const id = useId();

  const defaultOptions = {
    background: {
      color: { value: background },
    },
    fullScreen: { enable: false, zIndex: 1 },
    fpsLimit: 120, // reduce for stability
    interactivity: {
      events: {
        onClick: { enable: true, mode: "push" },
        onHover: {
          enable: hover,
          mode: "grab",
          parallax: {
            enable: mousemove,
            force: 40,
            smooth: 10,
          },
        },
        resize: true,
      },
      modes: {
        push: { quantity: 6 },
        repulse: { distance: 150, duration: 0.3 },
      },
    },
    particles: {
      number: {
        value: 1200, // 🔥 more quantity
        density: { enable: true, area: 1000 },
      },
      color: {
        value: ["#a855f7", "#c084fc", "#d8b4fe"], // multiple purple shades
      },
      size: {
        value: { min: 1.5, max: 4 }, // clearer size
        animation: {
          enable: true,
          speed: 2,
          minimumValue: 1,
        },
      },
      opacity: {
        value: { min: 0.5, max: 1 },
        animation: {
          enable: true,
          speed: 1.5,
        },
      },
      move: {
        enable: true,
        direction: "top",
        speed: 1.2, // smoother (reduce from 4.5)
        straight: false,
        outModes: { default: "out" },
      },
      links: {
        enable: false,
      },
    },
    detectRetina: true,
  };

  return (
    isReady && (
      <Particles id={id} options={defaultOptions} className={className} />
    )
  );
}
