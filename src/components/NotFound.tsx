import { Link } from "react-router-dom";

import logoNotFound from "../assets/logo-not-found.png";

export default function NotFound() {
  return (
    <section
      className="min-vh-100 d-flex align-items-center justify-content-center text-center"
      style={{
        background: `
    linear-gradient(to bottom, #f7f3ff 0%, #e8d9ff 100%),
    linear-gradient(90deg, rgba(255, 255, 255, 0.15) 1px, transparent 1px),
    linear-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)
  `,
        backgroundSize: "100% 100%, 40px 40px, 40px 40px",
        color: "#fff",
      }}
    >
      <div className="container px-4">
        <img
          src={logoNotFound}
          alt="Página não encontrada"
          className="img-fluid mb-4"
          style={{
            maxWidth: "450px",
            width: "100%",
          }}
        />

        <p
          className="lead mb-4"
          style={{ maxWidth: "520px", margin: "0 auto" }}
        >
          O conteúdo que você tentou acessar não existe ou foi movido. Mas fique
          tranquila, você pode continuar sua jornada por aqui 💜
        </p>

        <div className="d-flex gap-3 justify-content-center flex-wrap">
          <Link to="/" className="btn btn-light btn-lg fw-semibold">
            Voltar para o início
          </Link>

          <Link
            to="/trilhas"
            className="btn btn-outline-light btn-lg fw-semibold"
          >
            Ver Trilhas
          </Link>
        </div>
      </div>
    </section>
  );
}
