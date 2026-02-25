import React, { useEffect, useState } from "react";
import { getTracks, TrackWithId } from "../../services/trackService";
import TrailsFilter from "./TrailsFilter";
import { Link } from "react-router-dom";

const ITEMS_PER_PAGE = 6;

const levelColorMap: Record<string, string> = {
  Iniciante: "success",
  Intermediário: "primary",
  Avançado: "warning",
};

const ListTrails: React.FC = () => {
  const [trilhas, setTrilhas] = useState<TrackWithId[]>([]);
  const [trilhasFiltradas, setTrilhasFiltradas] = useState<TrackWithId[]>([]);
  const [loading, setLoading] = useState(true);

  const [busca, setBusca] = useState("");
  const [nivel, setNivel] = useState("");
  const [area, setArea] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  // ================= LOAD =================
  useEffect(() => {
    loadTracks();
  }, []);

  const loadTracks = async () => {
    try {
      setLoading(true);
      const data = await getTracks();
      setTrilhas(data);
      setTrilhasFiltradas(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // ================= FILTER =================
  useEffect(() => {
    let resultado = trilhas;

    if (busca) {
      resultado = resultado.filter(
        (t) =>
          t.title.toLowerCase().includes(busca.toLowerCase()) ||
          t.description.toLowerCase().includes(busca.toLowerCase())
      );
    }

    if (nivel) {
      resultado = resultado.filter((t) => t.level === nivel);
    }

    if (area) {
      resultado = resultado.filter((t) => t.category === area);
    }

    setTrilhasFiltradas(resultado);
    setCurrentPage(1);
  }, [busca, nivel, area, trilhas]);

  // ================= PAGINATION =================
  const totalPages = Math.ceil(trilhasFiltradas.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedTracks = trilhasFiltradas.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const resetarFiltros = () => {
    setBusca("");
    setNivel("");
    setArea("");
    setTrilhasFiltradas(trilhas);
  };

  return (
    <section className="py-5">
      <div className="container">

        {/* FILTRO CONECTADO */}
        <TrailsFilter
          blok={{ button_section_filter: "Limpar filtros" }}
          onFilter={({ busca, nivel, area }) => {
            setBusca(busca);
            setNivel(nivel);
            setArea(area);
          }}
        />

        {/* LISTA */}
        <div className="row g-4">
          {loading && (
            <div className="col-12 text-center py-5 text-muted">
              Carregando trilhas...
            </div>
          )}

          {!loading && paginatedTracks.length === 0 && (
            <div className="col-12 text-center py-5">
              <h4 className="text-muted">Nenhuma trilha encontrada</h4>
              <button className="btn btn-primary mt-3" onClick={resetarFiltros}>
                Limpar filtros
              </button>
            </div>
          )}

          {!loading &&
            paginatedTracks.map((trilha) => (
              <div key={trilha.id} className="col-md-6 col-lg-4">
                <div className="card trilha-card h-100 position-relative">

                  <span
                    className={`badge bg-${levelColorMap[trilha.level]} position-absolute`}
                    style={{ top: "15px", right: "15px", zIndex: 1 }}
                  >
                    {trilha.level}
                  </span>

                  <div
                    style={{
                      height: "180px",
                      background: "linear-gradient(135deg, #667eea, #764ba2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontWeight: 600,
                    }}
                  >
                    Banner da Trilha
                  </div>

                  <div className="card-body">
                    <div className="d-flex align-items-center mb-3">
                      <i className="bi bi-book text-primary fs-3 me-2"></i>
                      <h5 className="card-title mb-0">{trilha.title}</h5>
                    </div>

                    <p className="card-text text-muted">
                      {trilha.description}
                    </p>

                    <div className="d-flex justify-content-between text-muted small mb-3">
                      <span>
                        <i className="bi bi-clock"></i> {trilha.workload}h
                      </span>
                      <span>
                        <i className="bi bi-folder"></i> {trilha.category}
                      </span>
                    </div>

                    <div className="d-flex justify-content-end">
                      <Link to={`/cursos/${trilha.id}`} className="btn btn-sm btn-primary">
                        Ver Detalhes <i className="bi bi-arrow-right"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* PAGINAÇÃO */}
        {!loading && totalPages > 1 && (
          <div className="pagination-container mt-4">
            <div className="d-flex flex-column align-items-center gap-3">

              <nav aria-label="Paginação">
                <ul className="pagination justify-content-center mb-0">

                  {/* ANTERIOR */}
                  <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                    <button
                      className="page-link px-4 py-2"
                      onClick={() => setCurrentPage((p) => p - 1)}
                      disabled={currentPage === 1}
                    >
                      ‹ Anterior
                    </button>
                  </li>

                  {/* PÁGINAS — SOMENTE DESKTOP */}
                  <div className="d-none d-md-flex">
                    {Array.from({ length: totalPages }).map((_, index) => (
                      <li
                        key={index}
                        className={`page-item ${currentPage === index + 1 ? "active" : ""
                          }`}
                      >
                        <button
                          className="page-link px-3 py-2"
                          onClick={() => setCurrentPage(index + 1)}
                        >
                          {index + 1}
                        </button>
                      </li>
                    ))}
                  </div>

                  {/* PRÓXIMA */}
                  <li
                    className={`page-item ${currentPage === totalPages ? "disabled" : ""
                      }`}
                  >
                    <button
                      className="page-link px-4 py-2"
                      onClick={() => setCurrentPage((p) => p + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Próxima ›
                    </button>
                  </li>
                </ul>
              </nav>

              {/* STATUS */}
              <small className="text-muted">
                Página <strong>{currentPage}</strong> de{" "}
                <strong>{totalPages}</strong>
              </small>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ListTrails;
