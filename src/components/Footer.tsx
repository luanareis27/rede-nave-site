import { Link } from "react-router-dom";
import logo from "../assets/logoRedeNave.png";

export default function Footer() {
  return (
    <footer className="text-white py-5">
      <div className="container">
        <div className="row g-4">

          {/* Logo e descrição */}
          <div className="col-md-4">
            <h5 className="fw-bold mb-3 text-center text-md-start">
              <img
                src={logo}
                alt="Rede Nave"
                style={{ width: "100px", height: "auto" }}
              />
            </h5>

            <p style={{ color: "#adb5bd" }} className="text-center text-md-start">
              Empoderando mulheres empreendedoras através da educação e
              capacitação profissional.
            </p>

            <div className="social-links mt-3 text-center text-md-start">
              <a href="#" className="text-white me-3" title="Facebook">
                <i className="bi bi-facebook fs-4"></i>
              </a>
              <a href="#" className="text-white me-3" title="Instagram">
                <i className="bi bi-instagram fs-4"></i>
              </a>
              <a href="#" className="text-white me-3" title="LinkedIn">
                <i className="bi bi-linkedin fs-4"></i>
              </a>
              <a href="#" className="text-white" title="YouTube">
                <i className="bi bi-youtube fs-4"></i>
              </a>
            </div>
          </div>

          {/* Menu */}
          <div className="col-md-2 text-center text-md-start">
            <h6 className="fw-bold mb-3 text-white">Menu</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-decoration-none" style={{ color: "#adb5bd" }}>
                  Início
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/trilhas" className="text-decoration-none" style={{ color: "#adb5bd" }}>
                  Trilhas
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/eventos" className="text-decoration-none" style={{ color: "#adb5bd" }}>
                  Eventos
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/sobre" className="text-decoration-none" style={{ color: "#adb5bd" }}>
                  Sobre
                </Link>
              </li>
            </ul>
          </div>

          {/* Suporte */}
          <div className="col-md-3 text-center text-md-start">
            <h6 className="fw-bold mb-3 text-white">Suporte</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/suporte" className="text-decoration-none" style={{ color: "#adb5bd" }}>
                  Perguntas Frequentes
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/suporte#contato" className="text-decoration-none" style={{ color: "#adb5bd" }}>
                  Contato
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/suporte" className="text-decoration-none" style={{ color: "#adb5bd" }}>
                  Central de Ajuda
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/privacypolicy" className="text-decoration-none" style={{ color: "#adb5bd" }}>
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div className="col-md-3 text-center text-md-start">
            <h6 className="fw-bold mb-3 text-white">Contato</h6>
            <ul className="list-unstyled">
              <li className="mb-2" style={{ color: "#adb5bd" }}>
                <i className="bi bi-envelope"></i> contato@redenave.org
              </li>
              <li className="mb-2" style={{ color: "#adb5bd" }}>
                <i className="bi bi-telephone"></i> (11) 98765-4321
              </li>
              <li className="mb-2">
                <a
                  href="https://wa.me/5511987654321"
                  className="text-decoration-none"
                  style={{ color: "#25d366" }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="bi bi-whatsapp"></i> WhatsApp Suporte
                </a>
              </li>
            </ul>
          </div>

        </div>

        <hr className="my-4" style={{ borderColor: "#495057" }} />

        <div className="text-center">
          <p className="copy mb-0">
            &copy; 2025 Rede NAVE. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
