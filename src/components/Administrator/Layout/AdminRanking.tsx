import React from "react";
import "/src/styles/admin.css";

const AdminRanking: React.FC = () => {
  return (
    <section className="admin-ranking">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">Ranking</h2>
          <p className="text-muted mb-0">
            Classificação das participantes com base no desempenho
          </p>
        </div>
      </div>

      {/* Filtros */}
      <div className="card mb-4">
        <div className="card-body d-flex gap-3 flex-wrap">
          <select className="form-select" style={{ maxWidth: "220px" }}>
            <option>Ranking Geral</option>
            <option>Últimos 30 dias</option>
            <option>Últimos 7 dias</option>
          </select>
        </div>
      </div>

      {/* Ranking Table */}
      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Usuária</th>
                  <th>Trilhas Concluídas</th>
                  <th>Eventos</th>
                  <th>Pontuação</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>
                    <span className="badge bg-warning text-dark">🥇 1</span>
                  </td>
                  <td>Ana Souza</td>
                  <td>8</td>
                  <td>4</td>
                  <td>
                    <strong>980</strong>
                  </td>
                </tr>

                <tr>
                  <td>
                    <span className="badge bg-secondary">🥈 2</span>
                  </td>
                  <td>Maria Lima</td>
                  <td>7</td>
                  <td>3</td>
                  <td>
                    <strong>910</strong>
                  </td>
                </tr>

                <tr>
                  <td>
                    <span className="badge bg-bronze">🥉 3</span>
                  </td>
                  <td>Juliana Rocha</td>
                  <td>6</td>
                  <td>2</td>
                  <td>
                    <strong>860</strong>
                  </td>
                </tr>

                <tr>
                  <td>4</td>
                  <td>Patrícia Alves</td>
                  <td>5</td>
                  <td>1</td>
                  <td>740</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </section>
  );
};

export default AdminRanking;
