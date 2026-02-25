import React, { useEffect, useRef } from "react";


type StatsProps = {
  blok: {
    stats01: string;
    txt_stats01: string;
    stats02: string;
    txt_stats02: string;
    stats03: string;
    txt_stats03: string;
    stats04: string;
    txt_stats04: string;
  };
};


export default function StatsSection({ blok }: StatsProps) {
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
    const text = element.textContent?.trim() || "";
    const rawNumber = parseInt(text.replace(/\D/g, ""));
    if (isNaN(rawNumber)) return;

    const suffix = text.replace(/[0-9]/g, "");
    const duration = 2000;
    const increment = rawNumber / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;

      if (current >= rawNumber) {
        element.textContent = rawNumber + suffix;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current) + suffix;
      }
    }, 16);
  };

  return (
    <section className="stats-section py-4 ">
      <div className="container">
        <div className="row text-center">

          <div className="col-md-3 col-6 mb-3 mb-md-0">
            <div className="stat-card-home stats">
              <h3
                ref={(el) => { refs.current[0] = el; }}
                className="fw-bold mb-0"
              >
                {blok.stats01}
              </h3>
              <p className="mb-0 stats">{blok.txt_stats01}</p>
            </div>
          </div>

          <div className="col-md-3 col-6 mb-3 mb-md-0">
            <div className="stat-card-home stats-one">
              <h3
                ref={(el) => { refs.current[1] = el; }}
                className="fw-bold mb-0"
              >
                {blok.stats02}
              </h3>
              <p className="mb-0 stats-one">{blok.txt_stats02}</p>
            </div>
          </div>

          <div className="col-md-3 col-6">
            <div className="stat-card-home stats-three">
              <h3
                ref={(el) => { refs.current[2] = el; }}
                className="fw-bold mb-0"
              >
                {blok.stats03}
              </h3>
              <p className="mb-0 stats-three">{blok.txt_stats03}</p>
            </div>
          </div>

          <div className="col-md-3 col-6">
            <div className="stat-card-home stats-for">
              <h3
                ref={(el) => { refs.current[3] = el; }}
                className="fw-bold mb-0"
              >
                {blok.stats04}
              </h3>
              <p className="mb-0 stats-for">{blok.txt_stats04}</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}