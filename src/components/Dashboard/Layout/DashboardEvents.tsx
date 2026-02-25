import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  arrayRemove,
  increment,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../../config/firebase";

interface Evento {
  id?: string;
  titulo: string;
  tipo: string;
  data: string;
  horario: string;
  duracao?: string;
  vagas: number;
  inscricoes?: number;
  inscritos?: string[];
  modalidade: string;
  instrutor?: string;
  local?: string;
}

// 🔒 mesma função usada no CalendarEvents
function parseDateLocal(dateStr: string) {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
}

const DashboardEvents: React.FC = () => {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const auth = getAuth();
  const user = auth.currentUser;

  // ================= LOAD EVENTS =================
  useEffect(() => {
    const carregarEventos = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const snapshot = await getDocs(collection(db, "eventos"));

        const lista = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...(doc.data() as Evento),
          }))
          .filter((evento) =>
            evento.inscritos?.includes(user.uid)
          );

        setEventos(lista);
      } catch (error) {
        console.error("Erro ao carregar eventos:", error);
      } finally {
        setLoading(false);
      }
    };

    carregarEventos();
  }, [user]);

  // ================= TOGGLE INSCRIÇÃO =================
  async function toggleInscricao(evento: Evento) {
    if (!user) return;

    try {
      const ref = doc(db, "eventos", evento.id!);

      await updateDoc(ref, {
        inscritos: arrayRemove(user.uid),
        inscricoes: increment(-1),
      });

      setEventos((prev) =>
        prev.filter((ev) => ev.id !== evento.id)
      );
    } catch (error) {
      console.error("Erro ao cancelar inscrição:", error);
    }
  }

  // ================= FILTRO =================
  const eventosFiltrados = eventos.filter((evento) =>
    evento.titulo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard-courses container-fluid">
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0">Meus Eventos</h2>
      </div>

      {/* BUSCA */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control search-input"
          placeholder="Buscar eventos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* CONTEÚDO */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" />
        </div>
      ) : eventosFiltrados.length === 0 ? (
        <div className="alert alert-light text-center">
          <i className="bi bi-info-circle me-2"></i>
          Você ainda não está inscrito em nenhum evento
        </div>
      ) : (
        <div className="row g-4">
          {eventosFiltrados.map((evento) => {
            const jaInscrito = true;

            // ✅ VARIÁVEIS QUE ESTAVAM FALTANDO
            const dataEvento = parseDateLocal(evento.data);
            const inscricoes = evento.inscricoes || 0;
            const percentual = (inscricoes / evento.vagas) * 100;

            return (
              <div
                key={evento.id}
                className="col-12 col-md-6 col-lg-4"
              >
                <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">

                  {/* DATA */}
                  <div className="bg-calendar text-white p-3 text-center">
                    <div style={{ fontSize: 28, fontWeight: "bold" }}>
                      {dataEvento.getDate()}
                    </div>
                    <div>
                      {dataEvento
                        .toLocaleString("pt-BR", { month: "short" })
                        .replace(".", "")
                        .toUpperCase()}
                    </div>
                  </div>

                  {/* CONTEÚDO */}
                  <div className="card-body d-flex flex-column">
                    <h5 className="fw-bold mb-1">{evento.titulo}</h5>

                    <p className="text-muted mb-2 small">
                      <i className="bi bi-clock"></i> {evento.horario || "-"}{" "}
                      {evento.duracao || "-"} |{" "}
                      <i className="bi bi-laptop"></i>{" "}
                      {evento.modalidade || "-"}
                    </p>

                    <div className="progress mb-2" style={{ height: 5 }}>
                      <div
                        className="progress-bar bg-success"
                        style={{ width: `${percentual}%` }}
                      />
                    </div>

                    <small className="text-muted">
                      {inscricoes}/{evento.vagas} inscritos
                    </small>

                    <div className="mt-auto">
                      <button
                        className={`btn btn-sm w-100 event-action-btn ${jaInscrito ? "is-cancel" : "is-subscribe"
                          }`}
                        onClick={() => toggleInscricao(evento)}
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DashboardEvents;
