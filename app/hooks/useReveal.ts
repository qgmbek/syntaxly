"use client";

import { useEffect, useRef } from "react";

export default function useReveal<T extends HTMLElement>(
  threshold = 0.15,
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const els = root.querySelectorAll("[data-reveal]");
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.setAttribute("data-in", "");
            io.unobserve(e.target);
          }
        }),
      { threshold },
    );

    els.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, [threshold]);

  return ref;
}
