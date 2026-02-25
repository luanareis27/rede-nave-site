import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "/src/assets/logoRedeNave.png";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";

export default function Navbar() {
  const isMobile = window.innerWidth < 992;
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const [scrollProgress, setScrollProgress] = useState(0);

  const { user, loading } = useAuth();

  // ⚠️ DEFINA QUEM É ADMIN AQUI
  const ADMIN_EMAILS = ["admin@redenave.com"]; // ajuste se quiser
  const isAdmin = user && ADMIN_EMAILS.includes(user.email || "");

  const isActive = (path: string) => {
    if (path === "/") return currentPath === "/";
    return currentPath.startsWith(path);
  };

  const closeOffcanvas = () => {
    if (typeof window === "undefined") return;

    const offcanvas = document.getElementById("offcanvasNavbar");
    const bs = (window as any).bootstrap;

    if (offcanvas && bs?.Offcanvas) {
      const instance = bs.Offcanvas.getInstance(offcanvas);
      instance?.hide();
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    closeOffcanvas();
    navigate("/");
  };

  const handleMeuPainel = () => {
    closeOffcanvas();
    navigate(isAdmin ? "/admin" : "/dashboard");
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const navbar = document.querySelector(".navbar") as HTMLElement | null;
    const scrollOffset = 50;

    const onScroll = () => {
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const progress =
        height > 0 ? Math.min((window.scrollY / height) * 100, 100) : 0;

      setScrollProgress(progress);

      if (!navbar) return;

      const scrolled = window.scrollY > scrollOffset;

      navbar.style.padding = scrolled ? "0.5rem 0" : "1rem 0";
      navbar.style.boxShadow = scrolled
        ? "0 4px 15px rgba(0,0,0,0.15)"
        : "0 2px 10px rgba(0,0,0,0.1)";
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (loading) return null;

  return (
    <>
      {/* Barra de progresso */}
      <div
        className="scroll-progress-bar"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "3px",
          width: `${scrollProgress}%`,
          background: "linear-gradient(180deg, #5b119a, #7c19d1)",
          zIndex: 9999,
        }}
      />

      <nav className="navbar navbar-expand-lg navbar-dark sticky-top">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">
            <img src={logo} alt="Rede Nave" style={{ width: "70px" }} />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="offcanvas offcanvas-end menu-mobile" id="offcanvasNavbar">
            <div className="offcanvas-header">
              <Link className="navbar-brand fw-bold" to="/" onClick={closeOffcanvas}>
                <img src={logo} alt="Rede Nave" style={{ width: "70px" }} />
              </Link>
              <button className="btn-close btn-close-white" data-bs-dismiss="offcanvas" />
            </div>

            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                {[
                  { path: "/", label: "Início" },
                  { path: "/trilhas", label: "Trilhas" },
                  { path: "/eventos", label: "Eventos" },
                  { path: "/sobre", label: "Sobre" },
                  { path: "/suporte", label: "Suporte" },
                ].map(item => (
                  <li key={item.path} className="nav-item">
                    <Link
                      className={`nav-link ${isActive(item.path) ? "active" : ""}`}
                      to={item.path}
                      onClick={closeOffcanvas}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}

                {user && (
                  <li className="nav-item">
                    <button
                      className={`nav-link ${isActive("/dashboard") ? "active" : ""}`}

                      onClick={handleMeuPainel}
                    >
                      Meu Painel
                    </button>
                  </li>
                )}

                {!user && (
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${isActive("/login") ? "active" : ""}`}
                      to="/login"
                      onClick={closeOffcanvas}
                    >
                      <i className="bi bi-box-arrow-in-right"></i> Entrar
                    </Link>
                  </li>
                )}
              </ul>

              <div className="d-flex align-items-center mt-3 mt-lg-0">
                {!user && (
                  <Link className="btn btn-sm ms-2" to="/cadastro">
                    Cadastre-se
                  </Link>
                )}

                {user && (
                  <div className="dropdown ms-3">
                    <button
                      className="btn p-0 border-0"
                      data-bs-toggle="dropdown"
                      style={{ background: "transparent" }}
                    >
                      <div
                        className="rounded-circle d-flex justify-content-center align-items-center"
                        style={{
                          width: 38,
                          height: 38,
                          border: "2px solid rgba(255,255,255,0.25)",
                        }}
                      >
                        <span className="text-white fw-semibold">
                          {user.email?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </button>

                    <ul className="dropdown-menu dropdown-menu-end mt-2">
                      <li>
                        <button className="dropdown-item" onClick={handleLogout}>
                          Sair
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
