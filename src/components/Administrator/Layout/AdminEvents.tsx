import React, { useEffect, useState } from "react";
import "/src/styles/admin.css";
import {
  salvarEvento,
  editarEvento,
  excluirEvento,
} from "../../../services/eventService";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebase";

interface Evento {
  id?: string;
  titulo: string;
  descricao: string;
  tipo: string;
  modalidade: string;
  data: string;
  horario: string;
  vagas: number;
  localOuLink: string;
  status: string;
  palestrante: string;
  cargo: string;
}

const AdminEvents: React.FC = () => {
  // ================= TABS =================
  const [activeTab, setActiveTab] = useState<"list" | "form">("list");

  // ================= FORM STATES =================
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipo, setTipo] = useState("Evento");
  const [modalidade, setModalidade] = useState("Online");
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");
  const [vagas, setVagas] = useState<number>(0);
  const [localOuLink, setLocalOuLink] = useState("");
  const [status, setStatus] = useState("Agendado");
  const [palestrante, setPalestrante] = useState("");
  const [cargo, setCargo] = useState("");
  const [loading, setLoading] = useState(false);

  // ================= EDIT =================
  const [editingId, setEditingId] = useState<string | null>(null);

  // ================= LIST =================
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [loadingList, setLoadingList] = useState(true);

  // ================= LOAD EVENTS =================
  const fetchEventos = async () => {
    try {
      setLoadingList(true);
      const querySnapshot = await getDocs(collection(db, "eventos"));
      const data: Evento[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Evento),
      }));
      setEventos(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    if (activeTab === "list") fetchEventos();
  }, [activeTab]);

  // ================= SUBMIT =================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !titulo ||
      !data ||
      !horario ||
      !localOuLink ||
      !palestrante ||
      !cargo
    ) {
      alert("Preencha todos os campos obrigatórios");
      return;
    }

    const eventoData: Evento = {
      titulo,
      descricao,
      tipo,
      modalidade,
      data,
      horario,
      vagas,
      localOuLink,
      status,
      palestrante,
      cargo,
    };

    try {
      setLoading(true);

      if (editingId) {
        await editarEvento(editingId, eventoData);
        alert("Evento atualizado com sucesso!");
      } else {
        await salvarEvento(eventoData);
        alert("Evento cadastrado com sucesso!");
      }

      resetForm();
      setActiveTab("list");
      fetchEventos();
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar evento");
    } finally {
      setLoading(false);
    }
  };

  // ================= EDIT HANDLER =================
  const handleEdit = (evento: Evento) => {
    setEditingId(evento.id || null);
    setTitulo(evento.titulo);
    setDescricao(evento.descricao);
    setTipo(evento.tipo);
    setModalidade(evento.modalidade);
    setData(evento.data);
    setHorario(evento.horario);
    setVagas(evento.vagas);
    setLocalOuLink(evento.localOuLink);
    setStatus(evento.status);
    setPalestrante(evento.palestrante);
    setCargo(evento.cargo);
    setActiveTab("form");
  };

  // ================= DELETE =================
  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!window.confirm("Tem certeza que deseja excluir este evento?")) return;

    try {
      await excluirEvento(id);
      fetchEventos();
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir evento");
    }
  };

  const resetForm = () => {
    setTitulo("");
    setTipo("Evento");
    setModalidade("Online");
    setData("");
    setHorario("");
    setVagas(0);
    setLocalOuLink("");
    setStatus("Agendado");
    setPalestrante("");
    setCargo("");
    setEditingId(null);
  };

  return (
    <section className="admin-events">
      {/* ================= HEADER ================= */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">Eventos</h2>
          <p className="text-muted mb-0">
            Cadastro e gerenciamento de eventos, mentorias e cursos
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => {
            resetForm();
            setActiveTab("form");
          }}
        >
          + Novo Evento
        </button>
      </div>

      {/* ================= TABS ================= */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "list" ? "active" : ""}`}
            onClick={() => setActiveTab("list")}
          >
            Eventos Cadastrados
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "form" ? "active" : ""}`}
            onClick={() => setActiveTab("form")}
          >
            {editingId ? "Editar Evento" : "Novo Evento"}
          </button>
        </li>
      </ul>

      {/* ================= FORM ================= */}
      {activeTab === "form" && (
        <div className="card shadow-sm mb-4">
          <div className="card-header fw-semibold">
            {editingId ? "Editar Evento" : "Cadastro de Evento"}
          </div>

          <div className="card-body">
            <form className="row g-4" onSubmit={handleSubmit}>
              <div className="col-md-6 d-flex flex-column">
                <label className="form-label fw-semibold">
                  Título do Evento
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                />
              </div>

              <div className="col-md-6 d-flex flex-column">
                <label className="form-label fw-semibold">
                  Descrição do Evento
                </label>
                <textarea
                  className="form-control flex-grow-1"
                  rows={8}
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  placeholder="Descreva brevemente o evento"
                />
              </div>
              <div className="col-md-3">
                <label className="form-label fw-semibold">Tipo</label>
                <select
                  className="form-select"
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                >
                  <option>Evento</option>
                  <option>Workshop</option>
                  <option>Mentoria</option>
                  <option>Live</option>
                  <option>Feira</option>
                </select>
              </div>

              <div className="col-md-3">
                <label className="form-label fw-semibold">Modalidade</label>
                <select
                  className="form-select"
                  value={modalidade}
                  onChange={(e) => setModalidade(e.target.value)}
                >
                  <option>Online</option>
                  <option>Presencial</option>
                  <option>YouTube</option>
                  <option>Híbrido</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Data</label>
                <input
                  type="date"
                  className="form-control"
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                />
              </div>

              <div className="col-md-3">
                <label className="form-label fw-semibold">Horário</label>
                <input
                  type="time"
                  className="form-control"
                  value={horario}
                  onChange={(e) => setHorario(e.target.value)}
                />
              </div>

              <div className="col-md-3">
                <label className="form-label fw-semibold">Vagas</label>
                <input
                  type="number"
                  className="form-control"
                  value={vagas}
                  onChange={(e) => setVagas(Number(e.target.value))}
                />
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold">
                  Local ou Link do Evento
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={localOuLink}
                  onChange={(e) => setLocalOuLink(e.target.value)}
                />
              </div>

              <div className="col-md-4">
                <label className="form-label fw-semibold">Status</label>
                <select
                  className="form-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option>Agendado</option>
                  <option>Encerrado</option>
                  <option>Cancelado</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Nome do Palestrante
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={palestrante}
                  onChange={(e) => setPalestrante(e.target.value)}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Cargo / Função</label>
                <input
                  type="text"
                  className="form-control"
                  value={cargo}
                  onChange={(e) => setCargo(e.target.value)}
                />
              </div>

              <div className="col-12 d-flex justify-content-end gap-2">
                <button
                  type="button"
                  className="btn btn-success px-4"
                  onClick={() => setActiveTab("list")}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn btn-success px-4"
                  disabled={loading}
                >
                  {loading ? "Salvando..." : "Salvar Evento"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= LIST ================= */}
      {activeTab === "list" && (
        <div className="card">
          <div className="card-header">Eventos Cadastrados</div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead>
                  <tr>
                    <th>Título</th>
                    <th>Tipo</th>
                    <th>Data</th>
                    <th>Modalidade</th>
                    <th>Vagas</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {loadingList ? (
                    <tr>
                      <td colSpan={7} className="text-center text-muted">
                        Carregando...
                      </td>
                    </tr>
                  ) : eventos.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center text-muted">
                        Nenhum evento cadastrado.
                      </td>
                    </tr>
                  ) : (
                    eventos.map((evento) => (
                      <tr key={evento.id}>
                        <td>{evento.titulo}</td>
                        <td>{evento.tipo}</td>
                        <td>{evento.data}</td>
                        <td>{evento.modalidade}</td>
                        <td>{evento.vagas}</td>
                        <td>
                          <span
                            className={`badge ${evento.status === "Agendado"
                              ? "bg-primary"
                              : evento.status === "Encerrado"
                                ? "bg-secondary"
                                : "bg-danger"
                              }`}
                          >
                            {evento.status}
                          </span>
                        </td>
                        <td className="d-flex gap-2 flex-wrap">
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => handleEdit(evento)}
                          >
                            Editar
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(evento.id)}
                          >
                            Excluir
                          </button>
                        </td>
                      </tr>
                    ))
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

export default AdminEvents;
