import React from "react";
import "/src/styles/admin.css";

const AdminSettings: React.FC = () => {
  return (
    <section className="admin-settings">
      {/* Header */}
      <div className="mb-4">
        <h2 className="mb-1">Administração</h2>
        <p className="text-muted mb-0">
          Configurações gerais da plataforma Rede NAVE
        </p>
      </div>

      {/* Configurações da Plataforma */}
      <div className="card mb-4">
        <div className="card-header">
          Configurações da Plataforma
        </div>

        <div className="card-body row g-3">
          <div className="col-md-6">
            <label className="form-label">Nome da Plataforma</label>
            <input
              type="text"
              className="form-control"
              value="Rede NAVE"
              readOnly
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Status da Plataforma</label>
            <select className="form-select">
              <option>Ativa</option>
              <option>Em manutenção</option>
            </select>
          </div>
        </div>
      </div>

      {/* Regras do Sistema */}
      <div className="card mb-4">
        <div className="card-header">
          Regras do Sistema
        </div>

        <div className="card-body row g-3">
          <div className="col-md-4">
            <label className="form-label">
              Acesso ao conteúdo (dias)
            </label>
            <input
              type="number"
              className="form-control"
              value={90}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">
              Certificação automática
            </label>
            <select className="form-select">
              <option>Ativada</option>
              <option>Desativada</option>
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label">
              Pontos por trilha concluída
            </label>
            <input
              type="number"
              className="form-control"
              value={100}
            />
          </div>
        </div>
      </div>

      {/* Gestão de Administradores */}
      <div className="card">
        <div className="card-header">
          Administradores da Plataforma
        </div>

        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Perfil</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>Juliana Rocha</td>
                  <td className="text-break">juliana@email.com</td>
                  <td>Admin</td>
                  <td>
                    <span className="badge bg-success">Ativo</span>
                  </td>
                </tr>

                <tr>
                  <td>Equipe Técnica</td>
                  <td className="text-break">tech@redenave.com</td>
                  <td>Equipe</td>
                  <td>
                    <span className="badge bg-primary">Ativo</span>
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

export default AdminSettings;
