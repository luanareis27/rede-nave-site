import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTracks, TrackWithId } from "../../services/trackService";

type TrailsLearningProps = {
  blok: {
    title: string;
    description: string;
    button_section_trilhas: string;
  };
};

interface TrilhaUI {
  id: string;
  title: string;
  description: string;
  level: "Iniciante" | "Intermediário" | "Avançado";
  category: string;
  workload: number;
}

const levelColorMap: Record<string, string> = {
  Iniciante: "success",
  Intermediário: "primary",
  Avançado: "warning",
};

// ================= CARD (IGUAL AO ListTrails) =================
function TrilhaCard({ trilha }: { trilha: TrilhaUI }) {
  return (
    <div className="col-md-6 col-lg-4">
      <div className="card trilha-card h-100 position-relative">

        {/* BADGE */}
        <span
          className={`badge bg-${levelColorMap[trilha.level]} position-absolute`}
          style={{ top: "15px", right: "15px", zIndex: 1 }}
        >
          {trilha.level}
        </span>

        {/* PLACEHOLDER BANNER */}
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

        <div className="card-body d-flex flex-column">
          <div className="d-flex align-items-center mb-3">
            <i className="bi bi-book text-primary fs-3 me-2"></i>
            <h5 className="card-title mb-0">{trilha.title}</h5>
          </div>

          <p className="card-text text-muted flex-grow-1">
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

          <div className="d-flex justify-content-end mt-auto">
            <Link to={`/cursos/${trilha.id}`} className="btn btn-sm btn-primary">
              Ver Detalhes <i className="bi bi-arrow-right"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ================= MAIN =================
export default function TrailsLearning({ blok }: TrailsLearningProps) {
  const [trilhas, setTrilhas] = useState<TrilhaUI[]>([]);

  useEffect(() => {
    carregarTrilhas();
  }, []);

  const carregarTrilhas = async () => {
    const data: TrackWithId[] = await getTracks();

    // ✅ 3 trilhas mais recentes
    const destaque = data
      .sort(
        (a, b) =>
          new Date(b.createdAt ?? 0).getTime() -
          new Date(a.createdAt ?? 0).getTime()
      )
      .slice(0, 3);

    const adaptadas: TrilhaUI[] = destaque.map((t) => ({
      id: t.id,
      title: t.title,
      description: t.description,
      level: t.level,
      category: t.category,
      workload: t.workload,
    }));

    setTrilhas(adaptadas);
  };

  return (
    <section className="py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold mb-3">{blok.title}</h2>
          <p>{blok.description}</p>
        </div>

        <div className="row g-4">
          {trilhas.map((trilha) => (
            <TrilhaCard key={trilha.id} trilha={trilha} />
          ))}
        </div>

        <div className="text-center mt-4">
          <Link to="/trilhas" className="btn btn-lg btn-primary">
            {blok.button_section_trilhas} <i className="bi bi-arrow-right"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}
