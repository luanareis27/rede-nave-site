import React from "react";

type SupportHeaderProps = {
  blok: {
    title: string;
    description: string;
  };
};


export default function SupportHeader({ blok }: SupportHeaderProps) {
  return (
    <section className="section-header text-white text-center py-4">
      <div className="container">
        <h1 className="display-5 fw-bold mb-2">
          <i className="bi bi-headset"></i>{blok.title}
        </h1>
        <p className="mb-0">
          {blok.description}
        </p>
      </div>
    </section>
  );
}
