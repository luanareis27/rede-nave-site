import { useEffect, useState } from "react";

type TrilhasFilterProps = {
  blok: {
    button_section_filter: string;
  };
  onFilter: (filters: {
    busca: string;
    nivel: string;
    area: string;
  }) => void;
};

const TrailsFilter = ({ blok, onFilter }: TrilhasFilterProps) => {
  const [busca, setBusca] = useState("");
  const [nivel, setNivel] = useState("");
  const [area, setArea] = useState("");

  // aplica filtros automaticamente
  useEffect(() => {
    onFilter({ busca, nivel, area });
  }, [busca, nivel, area]);

  const limparFiltros = () => {
    setBusca("");
    setNivel("");
    setArea("");
  };

  const filtrosAtivos = busca || nivel || area;

  return (
    <section className="py-4">
      <div className="container">

        {/* FORMULÁRIO */}
        <div className="row g-3">

          {/* BUSCA */}
          <div className="col-md-4">
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Buscar trilha..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
            </div>
          </div>

          {/* NÍVEL */}
          <div className="col-md-3">
            <select
              className="form-select"
              value={nivel}
              onChange={(e) => setNivel(e.target.value)}
            >
              <option value="">Todos os Níveis</option>
              <option value="Iniciante">Iniciante</option>
              <option value="Intermediário">Intermediário</option>
              <option value="Avançado">Avançado</option>
            </select>
          </div>

          {/* ÁREA */}
          <div className="col-md-3">
            <select
              className="form-select"
              value={area}
              onChange={(e) => setArea(e.target.value)}
            >
              <option value="">Todas as Áreas</option>
              <option value="Gestão">Gestão</option>
              <option value="Marketing">Marketing</option>
              <option value="Vendas">Vendas</option>
              <option value="Liderança">Liderança</option>
            </select>
          </div>

          {/* LIMPAR */}
          <div className="col-md-2">
            <button
              className="btn w-100"
              onClick={limparFiltros}
              disabled={!filtrosAtivos}
            >
              <i className="bi bi-x-circle me-1"></i>
              {blok.button_section_filter}
            </button>
          </div>

        </div>

        {/* FILTROS ATIVOS */}
        {filtrosAtivos && (
          <div className="row mt-3">
            <div className="col-12 d-flex flex-wrap gap-2">

              {busca && (
                <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2">
                  <i className="bi bi-search me-1"></i>
                  "{busca}"
                  <i
                    className="bi bi-x ms-2 cursor-pointer"
                    onClick={() => setBusca("")}
                  ></i>
                </span>
              )}

              {nivel && (
                <span className="badge bg-success bg-opacity-10 text-success px-3 py-2">
                  <i className="bi bi-bar-chart me-1"></i>
                  {nivel}
                  <i
                    className="bi bi-x ms-2 cursor-pointer"
                    onClick={() => setNivel("")}
                  ></i>
                </span>
              )}

              {area && (
                <span className="badge bg-warning bg-opacity-10 text-warning px-3 py-2">
                  <i className="bi bi-folder me-1"></i>
                  {area}
                  <i
                    className="bi bi-x ms-2 cursor-pointer"
                    onClick={() => setArea("")}
                  ></i>
                </span>
              )}

            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default TrailsFilter;
