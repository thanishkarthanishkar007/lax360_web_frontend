import { useEffect, useState } from "react";

const useInView = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [element, setElement] = useState(null);

  useEffect(() => {
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element); // animate only once
        }
      },
      { threshold: 0.3, ...options }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [element, options]);

  return [setElement, isVisible];
};

export default useInView;