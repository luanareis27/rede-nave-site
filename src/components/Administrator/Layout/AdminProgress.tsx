import React from "react";
import "/src/styles/admin.css";

const AdminProgress: React.FC = () => {
  return (
    <section className="admin-progress">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">Progresso das Usuárias</h2>
          <p className="text-muted mb-0">
            Acompanhamento das trilhas e certificações
          </p>
        </div>
      </div>

      {/* Filtros */}
      <div className="card mb-4">
        <div className="card-body d-flex gap-3 flex-wrap">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar usuária"
            style={{ maxWidth: "260px" }}
          />

          <select className="form-select" style={{ maxWidth: "240px" }}>
            <option>Todas as trilhas</option>
            <option>Gestão Financeira</option>
            <option>Marketing Digital</option>
          </select>

          <select className="form-select" style={{ maxWidth: "220px" }}>
            <option>Status</option>
            <option>Em andamento</option>
            <option>Concluída</option>
          </select>
        </div>
      </div>

      {/* Tabela de Progresso */}
      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead>
                <tr>
                  <th>Usuária</th>
                  <th>Trilha</th>
                  <th>Progresso</th>
                  <th>Status</th>
                  <th>Conclusão</th>
                  <th>Certificado</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>Ana Souza</td>
                  <td>Gestão Financeira</td>
                  <td style={{ minWidth: "160px" }}>
                    <div className="progress" style={{ height: "8px" }}>
                      <div
                        className="progress-bar bg-primary"
                        style={{ width: "75%" }}
                      />
                    </div>
                    <small className="text-muted">75%</small>
                  </td>
                  <td>
                    <span className="badge bg-primary">Em andamento</span>
                  </td>
                  <td>-</td>
                  <td>
                    <span className="badge bg-secondary">Pendente</span>
                  </td>
                </tr>

                <tr>
                  <td>Maria Lima</td>
                  <td>Marketing Digital</td>
                  <td style={{ minWidth: "160px" }}>
                    <div className="progress" style={{ height: "8px" }}>
                      <div
                        className="progress-bar bg-success"
                        style={{ width: "100%" }}
                      />
                    </div>
                    <small className="text-muted">100%</small>
                  </td>
                  <td>
                    <span className="badge bg-success">Concluída</span>
                  </td>
                  <td>15/01/2026</td>
                  <td>
                    <span className="badge bg-success">Emitido</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </section>
  );
};

export default AdminProgress;
