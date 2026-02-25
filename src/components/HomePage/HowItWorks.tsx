import React from "react";

type HowItWorksProps = {
  blok: {
    title: string;
    description: string;
    number_card01: string;
    card_title01: string;
    card_description01: string;
    number_card02: string;
    card_title02: string;
    card_description02: string;
    number_card03: string;
    card_title03: string;
    card_description03: string;
    number_card04: string;
    card_title04: string;
    card_description04: string;
  };
};

export default function HowItWorks({ blok }: HowItWorksProps) {
  return (
    <section className="py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold mb-3">{blok.title}</h2>
          <p>{blok.description}</p>
        </div>

        <div className="row g-4">
          {/* Passo 1 */}
          <div className="col-md-6 col-lg-3">
            <div className="step-card text-center p-4 h-100">
              <div className="step-number heroincolor">{blok.number_card01}</div>
              <i className="bi bi-person-plus-fill display-4 mb-3 iconcolor"></i>
              <h5 className="fw-bold mb-3">{blok.card_title01}</h5>
              <p>{blok.card_description01}</p>
            </div>
          </div>

          {/* Passo 2 */}
          <div className="col-md-6 col-lg-3">
            <div className="step-card text-center p-4 h-100">
              <div className="step-number heroincolor">{blok.number_card02}</div>
              <i className="bi bi-map-fill display-4 mb-3 iconcolor"></i>
              <h5 className="fw-bold mb-3">{blok.card_title02}</h5>
              <p>{blok.card_description02}</p>
            </div>
          </div>

          {/* Passo 3 */}
          <div className="col-md-6 col-lg-3">
            <div className="step-card text-center p-4 h-100">
              <div className="step-number heroincolor">{blok.number_card03}</div>
              <i className="bi bi-book-fill display-4 mb-3 iconcolor"></i>
              <h5 className="fw-bold mb-3">{blok.card_title03}</h5>
              <p>{blok.card_description03}</p>
            </div>
          </div>

          {/* Passo 4 */}
          <div className="col-md-6 col-lg-3">
            <div className="step-card text-center p-4 h-100">
              <div className="step-number heroincolor">{blok.number_card04}</div>
              <i className="bi bi-trophy-fill display-4 mb-3 iconcolor"></i>
              <h5 className="fw-bold mb-3">{blok.card_title04}</h5>
              <p>{blok.card_description04}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
