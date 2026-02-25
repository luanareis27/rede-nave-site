import React from "react";
import { Link } from "react-router-dom";


type CallSectionProps = {
  blok: {
    title: string;
    description: string;
    button_section_call: string;
  };
};


export default function CallSection({ blok }: CallSectionProps) {
  return (
    <section className="cta-section py-5 text-white text-center">
      <div className="container">
        <h2 className="fw-bold mb-3">{blok.title}</h2>

        <p className="lead mb-4">
          {blok.description}
        </p>

        <Link to="/cadastro" className="btn btn-lg px-5">
          {blok.button_section_call} <i className="bi bi-arrow-right"></i>
        </Link>
      </div>
    </section>
  );
}
