import React from "react";

interface Certificado {
  title: string;
  date: string;
  hours: number;
  bg: string;
}

const DashboardCertificates: React.FC = () => {
  const certificados: Certificado[] = [
    {
      title: "Gestão Financeira Básica",
      date: "15 de Outubro de 2025",
      hours: 40,
      bg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    {
      title: "Fundamentos de Vendas",
      date: "28 de Setembro de 2025",
      hours: 32,
      bg: "linear-gradient(135deg, #198754 0%, #20c997 100%)",
    },
  ];

  return (
    <div className="dashboard-section">
      <h2 className="fw-bold mb-4">Meus Certificados 🎓</h2>

      <div className="row g-4">
        {certificados.map((cert, idx) => (
          <div key={idx} className="col-md-6">
            <div className="card h-100">
              <div
                className="card-body d-flex flex-column justify-content-between p-4 text-white"
                style={{
                  background: cert.bg,
                  borderRadius: "15px",
                  minHeight: "100%",
                }}
              >
                {/* Conteúdo */}
                <div className="text-center">
                  <i className="bi bi-award mb-3" style={{ fontSize: "3.5rem" }} />

                  <h5 className="fw-bold mb-2">{cert.title}</h5>

                  <p className="mb-1">
                    <small>Concluído em {cert.date}</small>
                  </p>

                  <p className="small mb-4">
                    Carga horária: {cert.hours} horas
                  </p>
                </div>

                {/* Ações */}
                <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mt-3">
                  <button className="btn btn-light px-4">
                    <i className="bi bi-download me-1" />
                    Baixar
                  </button>

                  <button className="btn btn-outline-light px-4">
                    <i className="bi bi-share me-1" />
                    Compartilhar
                  </button>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardCertificates;
