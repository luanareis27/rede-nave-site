import React from "react";

type AdditionalResourcesProps = {
  blok: {
    title: string;
    title_card01: string,
    description_card01: string,
    button_card01: string,
    title_card02: string,
    description_card02: string,
    button_card02: string,
    title_card03: string,
    description_card03: string,
    button_card03: string,
  };
};

export default function AdditionalResources({ blok }: AdditionalResourcesProps) {
  return (
    <section className="py-5">
      <div className="container">
        <h2 className="text-center mb-5 fw-bold">
          <i className="bi bi-book"></i> {blok.title}
        </h2>

        <div className="row g-4">

          {/* Card 1 */}
          <div className="col-md-4">
            <div className="card h-100 shadow-sm hover-card bg-card">
              <div className="card-body text-center p-4">
                <i
                  className="bi bi-journal-text mb-3 bg-doc"
                  style={{ fontSize: "3rem" }}
                ></i>
                <h5 className="card-title fw-bold">{blok.title_card01}</h5>
                <p className="card-text">
                  {blok.description_card01}
                </p>
                <a href="#" className="btn">
                  {blok.button_card01}
                </a>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="col-md-4">
            <div className="card h-100 shadow-sm hover-card bg-card">
              <div className="card-body text-center p-4">
                <i
                  className="bi bi-play-circle mb-3 bg-video"
                  style={{ fontSize: "3rem" }}
                ></i>
                <h5 className="card-title fw-bold">{blok.title_card02}</h5>
                <p className="card-text">
                  {blok.description_card02}
                </p>
                <a href="#" className="btn">
                  {blok.button_card02}
                </a>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="col-md-4">
            <div className="card h-100 shadow-sm hover-card bg-card">
              <div className="card-body text-center p-4">
                <i
                  className="bi bi-people mb-3 bg-community"
                  style={{ fontSize: "3rem" }}
                ></i>
                <h5 className="card-title fw-bold">{blok.title_card03}</h5>
                <p className="card-text">
                  {blok.description_card03}
                </p>
                <a href="#" className="btn">
                  {blok.button_card03}
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
