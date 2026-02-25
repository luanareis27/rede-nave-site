import React from "react";
import "/src/styles/admin.css";

const AdminCertificates: React.FC = () => {
  return (
    <section className="admin-certificates">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">Certificados</h2>
          <p className="text-muted mb-0">
            Emissão e controle de certificados por trilha concluída
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

          <select className="form-select" style={{ maxWidth: "260px" }}>
            <option>Todas as trilhas</option>
            <option>Gestão Financeira</option>
            <option>Marketing Digital</option>
          </select>

          <select className="form-select" style={{ maxWidth: "220px" }}>
            <option>Status do certificado</option>
            <option>Emitido</option>
            <option>Pendente</option>
          </select>
        </div>
      </div>

      {/* Tabela de Certificados */}
      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead>
                <tr>
                  <th>Usuária</th>
                  <th>Trilha</th>
                  <th>Conclusão</th>
                  <th>Status</th>
                  <th>Certificado</th>
                  <th>Ações</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>Maria Lima</td>
                  <td>Marketing Digital</td>
                  <td>15/01/2026</td>
                  <td>
                    <span className="badge bg-success">Concluída</span>
                  </td>
                  <td>
                    <span className="badge bg-success">Emitido</span>
                  </td>
                  <td className="d-flex gap-2 flex-wrap">
                    <button className="btn btn-sm btn-outline-primary">
                      Visualizar
                    </button>
                    <button className="btn btn-sm btn-outline-secondary">
                      Reemitir
                    </button>
                  </td>
                </tr>

                <tr>
                  <td>Ana Souza</td>
                  <td>Gestão Financeira</td>
                  <td>—</td>
                  <td>
                    <span className="badge bg-primary">Em andamento</span>
                  </td>
                  <td>
                    <span className="badge bg-secondary">Pendente</span>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-secondary w-100 w-md-auto"
                      disabled
                    >
                      Aguardando conclusão
                    </button>
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

export default AdminCertificates;
