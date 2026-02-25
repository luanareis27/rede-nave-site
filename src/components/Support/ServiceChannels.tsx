import React from "react";

type ServiceChannelsProps = {
  blok: {
    title: string;
    card_wpp: string;
    card_description01: string;
    card_contact_wpp: string,
    button_wpp: string,
    term01: string,
    card_email: string;
    card_description02: string;
    card_contact_email: string,
    button_email: string,
    term02: string,
    card_phone: string;
    card_description03: string;
    card_contact_phone: string,
    button_phone: string,
    term03: string,
  };
};



export default function ServiceChannels({ blok }: ServiceChannelsProps) {
  return (
    <section className="py-5">
      <div className="container">
        <h2 className="text-center mb-5 fw-bold">
          <i className="bi bi-chat-dots"></i>{blok.title}
        </h2>

        <div className="row g-4">

          {/* WhatsApp */}
          <div className="col-md-4">
            <div className="card h-100 shadow-sm hover-card bg-card">
              <div className="card-body text-center p-4">
                <div className="mb-3">
                  <i className="bi bi-whatsapp bg-wpp" style={{ fontSize: "3rem" }}></i>
                </div>
                <h5 className="fw-bold">{blok.card_wpp}</h5>
                <p className="card-text">{blok.card_description01}</p>
                <p className="fw-bold">{blok.card_contact_wpp}</p>
                <a
                  href="https://wa.me/5511987654321"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-success"
                >
                  <i className="bi bi-whatsapp"></i> {blok.button_wpp}
                </a>
                <small className="d-block mt-2">Seg-Sex: 9h às 18h</small>
              </div>
            </div>
          </div>

          {/* E-mail */}
          <div className="col-md-4">
            <div className="card h-100 shadow-sm hover-card bg-card">
              <div className="card-body text-center p-4">
                <div className="mb-3">
                  <i className="bi bi-envelope bg-email" style={{ fontSize: "3rem" }}></i>
                </div>
                <h5 className="fw-bold">{blok.card_email}</h5>
                <p className="card-text">{blok.card_description02}</p>
                <p className="fw-bold">{blok.card_contact_email}</p>
                <a href="mailto:contato@redenave.org" className="btn btn-primary">
                  <i className="bi bi-envelope"></i> {blok.button_email}
                </a>
                <small className="d-block mt-2">{blok.term02}</small>
              </div>
            </div>
          </div>

          {/* Telefone */}
          <div className="col-md-4">
            <div className="card h-100 shadow-sm hover-card bg-card">
              <div className="card-body text-center p-4">
                <div className="mb-3">
                  <i className="bi bi-telephone bg-phone" style={{ fontSize: "3rem" }}></i>
                </div>
                <h5 className="fw-bold">{blok.card_phone}</h5>
                <p className="card-text">{blok.card_description03}</p>
                <p className="fw-bold">{blok.card_contact_phone}</p>
                <a href="tel:+551134567890" className="btn btn-primary">
                  <i className="bi bi-telephone"></i> {blok.button_phone}
                </a>
                <small className="d-block mt-2">{blok.term03}</small>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
