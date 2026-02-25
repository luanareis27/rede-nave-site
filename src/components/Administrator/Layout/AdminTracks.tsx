import React, { useEffect, useState } from "react";
import "/src/styles/admin.css";

import {
  createTrack,
  getTracks,
  updateTrack,
  deleteTrack,
  TrackLevel,
  TrackWithId,
} from "../../../services/trackService";

const AdminTracks: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"list" | "form">("list");

  // ================= FORM STATES =================
  const [title, setTitle] = useState("");
  const [level, setLevel] = useState<TrackLevel>("Iniciante");
  const [category, setCategory] = useState("Todas as Áreas");
  const [description, setDescription] = useState("");
  const [workload, setWorkload] = useState("");
  const [banner, setBanner] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // ================= EDIT =================
  const [editingId, setEditingId] = useState<string | null>(null);

  // ================= LIST =================
  const [tracks, setTracks] = useState<TrackWithId[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  const [search, setSearch] = useState("");

  // ================= LOAD TRACKS =================
  useEffect(() => {
    if (activeTab === "list") {
      fetchTracks();
    }
  }, [activeTab]);

  const fetchTracks = async () => {
    try {
      setLoadingList(true);
      const data = await getTracks();
      setTracks(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingList(false);
    }
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !workload) {
      alert("Preencha todos os campos obrigatórios");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        title,
        level,
        category,
        description,
        workload: Number(workload),
        bannerUrl: banner ? banner.name : "",
      };

      if (editingId) {
        await updateTrack(editingId, payload);
        alert("Trilha atualizada com sucesso!");
      } else {
        await createTrack(payload);
        alert("Trilha cadastrada com sucesso!");
      }

      resetForm();
      setActiveTab("list");
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar trilha");
    } finally {
      setLoading(false);
    }
  };

  // ================= EDIT =================
  const handleEdit = (track: TrackWithId) => {
    setEditingId(track.id);
    setTitle(track.title);
    setLevel(track.level);
    setCategory(track.category);
    setDescription(track.description);
    setWorkload(String(track.workload));
    setBanner(null);
    setActiveTab("form");
  };

  // ================= DELETE =================
  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir esta trilha?")) return;

    try {
      await deleteTrack(id);
      fetchTracks();
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir trilha");
    }
  };

  const resetForm = () => {
    setTitle("");
    setLevel("Iniciante");
    setCategory("Todas as Áreas");
    setDescription("");
    setWorkload("");
    setBanner(null);
    setEditingId(null);
  };

  // ================= FILTER (SOMENTE POR TÍTULO) =================
  const filteredTracks = tracks.filter((track) =>
    track.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="admin-tracks">
      {/* ================= HEADER ================= */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">Trilhas</h2>
          <p className="text-muted mb-0">
            Cadastro e gerenciamento de trilhas de aprendizagem
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => {
            resetForm();
            setActiveTab("form");
          }}
        >
          + Nova Trilha
        </button>
      </div>

      {/* ================= TABS ================= */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "list" ? "active" : ""}`}
            onClick={() => setActiveTab("list")}
          >
            Trilhas Cadastradas
          </button>
        </li>

        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "form" ? "active" : ""}`}
            onClick={() => setActiveTab("form")}
          >
            {editingId ? "Editar Trilha" : "Nova Trilha"}
          </button>
        </li>
      </ul>

      {/* ================= FORM ================= */}
      {activeTab === "form" && (
        <div className="card shadow-sm mb-4">
          <div className="card-header fw-semibold">
            {editingId ? "Editar Trilha" : "Cadastro de Trilha"}
          </div>

          <div className="card-body">
            <form className="row g-4" onSubmit={handleSubmit}>
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Título da Trilha
                </label>
                <input
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="col-md-3">
                <label className="form-label fw-semibold">Nível</label>
                <select
                  className="form-select"
                  value={level}
                  onChange={(e) =>
                    setLevel(e.target.value as TrackLevel)
                  }
                >
                  <option>Iniciante</option>
                  <option>Intermediário</option>
                  <option>Avançado</option>
                </select>
              </div>

              <div className="col-md-3">
                <label className="form-label fw-semibold">Categoria</label>
                <select
                  className="form-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option>Todas as Áreas</option>
                  <option>Gestão</option>
                  <option>Marketing</option>
                  <option>Vendas</option>
                  <option>Liderança</option>
                </select>
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold">Descrição</label>
                <textarea
                  className="form-control"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="col-md-4">
                <label className="form-label fw-semibold">
                  Carga Horária (h)
                </label>
                <input
                  type="number"
                  className="form-control"
                  value={workload}
                  onChange={(e) => setWorkload(e.target.value)}
                />
              </div>

              {/* ================= BANNER / FOTO ================= */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Foto ou Banner da Trilha
                </label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={(e) =>
                    setBanner(e.target.files ? e.target.files[0] : null)
                  }
                />
                <small className="text-muted">
                  Formatos aceitos: JPG, PNG ou WEBP
                </small>
              </div>

              {banner && (
                <div className="col-md-6 d-flex align-items-end">
                  <img
                    src={URL.createObjectURL(banner)}
                    alt="Preview do banner"
                    className="img-fluid rounded shadow-sm"
                    style={{ maxHeight: 150, objectFit: "cover" }}
                  />
                </div>
              )}

              <div className="col-12 d-flex justify-content-end gap-2">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setActiveTab("list")}
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="btn btn-success"
                  disabled={loading}
                >
                  {loading ? "Salvando..." : "Salvar Trilha"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= LIST ================= */}
      {activeTab === "list" && (
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <span>Trilhas Cadastradas</span>

            <input
              type="text"
              className="form-control w-25"
              placeholder="Buscar por título..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead>
                  <tr>
                    <th>Título</th>
                    <th>Categoria</th>
                    <th>Nível</th>
                    <th>Módulos</th>
                    <th>Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredTracks.map((track) => (
                    <tr key={track.id}>
                      <td>{track.title}</td>
                      <td>{track.category}</td>
                      <td>{track.level}</td>
                      <td>—</td>
                      <td className="d-flex gap-2">
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => handleEdit(track)}
                        >
                          Editar
                        </button>

                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(track.id)}
                        >
                          Excluir
                        </button>
                      </td>
                    </tr>
                  ))}

                  {filteredTracks.length === 0 && (
                    <tr>
                      <td colSpan={5} className="text-center text-muted py-4">
                        Nenhuma trilha encontrada
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AdminTracks;
