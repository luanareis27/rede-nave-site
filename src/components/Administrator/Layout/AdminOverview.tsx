import React from "react";
import "/src/styles/admin.css";

const AdminOverview: React.FC = () => {
  return (
    <>

      {/* Top Filters */}
      <div className="filters card mb-4">
        <div className="card-body d-flex gap-3">
          <select className="form-select">
            <option>Últimos 7 dias</option>
            <option>Últimos 30 dias</option>
            <option>Este ano</option>
          </select>

          <select className="form-select">
            <option>Todas as regiões</option>
            <option>Nordeste</option>
            <option>Sudeste</option>
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="kpi-card">
            <span>Usuárias Ativas</span>
            <h3>1.248</h3>
            <small className="positive">+12%</small>
          </div>
        </div>

        <div className="col-md-3">
          <div className="kpi-card">
            <span>Trilhas Concluídas</span>
            <h3>842</h3>
            <small className="positive">+8%</small>
          </div>
        </div>

        <div className="col-md-3">
          <div className="kpi-card">
            <span>Certificados Emitidos</span>
            <h3>790</h3>
            <small className="neutral">0%</small>
          </div>
        </div>

        <div className="col-md-3">
          <div className="kpi-card">
            <span>Eventos Ativos</span>
            <h3>12</h3>
            <small className="negative">-5%</small>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="row g-3 mb-4">
        <div className="col-md-8">
          <div className="card chart-card">
            <div className="card-header">Progresso das Trilhas</div>
            <div className="card-body chart-placeholder">
              Gráfico de Linha / Barras
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card chart-card">
            <div className="card-header">Distribuição por Área</div>
            <div className="card-body chart-placeholder">
              Gráfico Pizza
            </div>
          </div>
        </div>
      </div>

      {/* Ranking Table */}
      <div className="card">
        <div className="card-header">Ranking de Participantes</div>
        <div className="card-body">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>Nome</th>
                <th>Trilhas Concluídas</th>
                <th>Pontuação</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Ana Souza</td>
                <td>8</td>
                <td>980</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Maria Lima</td>
                <td>7</td>
                <td>910</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Juliana Rocha</td>
                <td>6</td>
                <td>860</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminOverview;
