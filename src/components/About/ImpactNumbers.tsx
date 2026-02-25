import React, { useEffect, useRef } from "react";

type ImpactNumbersProps = {
  blok: {
    title: string;
    stats01: string,
    txt_stats01: string,
    stats02: string,
    txt_stats02: string,
    stats03: string,
    txt_stats03: string,
    stats04: string,
    txt_stats04: string,

  };
};


export default function ImpactNumbers({ blok }: ImpactNumbersProps) {
  const refs = useRef<(HTMLHeadingElement | null)[]>([]);

  useEffect(() => {
    const elements = refs.current.filter((el): el is HTMLHeadingElement => el !== null);

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLHeadingElement;

          if (entry.isIntersecting && !el.dataset.animated) {
            el.dataset.animated = "true";
            animateNumber(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const animateNumber = (element: HTMLHeadingElement) => {
    const finalNumber = parseInt(element.getAttribute("data-count") || "");
    if (isNaN(finalNumber)) return;

    const duration = 2000; // 2s
    const increment = finalNumber / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;

      if (current >= finalNumber) {
        element.textContent = finalNumber.toString();
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current).toString();
      }
    }, 16);
  };

  return (
    <section className="py-5">
      <div className="container">
        <h2 className="fw-bold text-center mb-5">{blok.title}</h2>

        <div className="row g-4 text-center">

          <div className="col-md-3 col-6">
            <div className="p-4">
              <h2
                className="display-3 fw-bold stats mb-0"
                data-count={blok.stats01}
                ref={(el) => { refs.current[0] = el; }}
              >
                0
              </h2>
              <p className="stats mb-0">
                {blok.txt_stats01}
              </p>
            </div>
          </div>

          <div className="col-md-3 col-6">
            <div className="p-4">
              <h2
                className="display-3 fw-bold stats-one mb-0"
                data-count={blok.stats02}
                ref={(el) => { refs.current[1] = el; }}
              >
                0
              </h2>
              <p className="stats-one mb-0">
                {blok.txt_stats02}
              </p>
            </div>
          </div>

          <div className="col-md-3 col-6">
            <div className="p-4">
              <h2
                className="display-3 fw-bold stats-three mb-0"
                data-count={blok.stats03}
                ref={(el) => { refs.current[2] = el; }}
              >
                0
              </h2>
              <p className="stats-three mb-0">
                {blok.txt_stats03}
              </p>
            </div>
          </div>

          <div className="col-md-3 col-6">
            <div className=" p-4">
              <h2
                className="display-3 fw-bold stats-for mb-0"
                data-count={blok.stats04}
                ref={(el) => { refs.current[3] = el; }}
              >
                0
              </h2>
              <p className="stats-for mb-0">
                {blok.txt_stats04}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}