import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  increment,
  arrayUnion,
  arrayRemove
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../../config/firebase";

type NextEventsHomeProps = {
  blok: {
    title: string;
    description: string;
    button_section_events: string;
  };
};

interface Evento {
  id: string;
  titulo: string;
  data: string;
  horario: string;
  tipo: "Online" | "Presencial" | "Live";
  vagas: number;
  inscricoes?: number;
  inscritos?: string[];
}

declare global {
  interface Window {
    NAVE_ADVANCED?: {
      toast?: {
        show: (
          message: string,
          type: "success" | "error" | "warning" | "info"
        ) => void;
      };
    };
  }
}

export default function NextEventsHome({ blok }: NextEventsHomeProps) {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [user, setUser] = useState<any>(null);

  const navigate = useNavigate();
  const auth = getAuth();

  // ================= AUTH =================
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, usuario => {
      setUser(usuario);
    });
    return () => unsub();
  }, []);

  // ================= LOAD EVENTS =================
  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const snapshot = await getDocs(collection(db, "eventos"));

        const data: Evento[] = snapshot.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as Evento)
        }));

        const hoje = new Date();

        const eventosOrdenados = data
          .filter(ev => new Date(ev.data) >= hoje)
          .sort(
            (a, b) =>
              new Date(a.data).getTime() - new Date(b.data).getTime()
          )
          .slice(0, 3);

        setEventos(eventosOrdenados);
      } catch (error) {
        console.error("Erro ao carregar eventos:", error);
      }
    };

    fetchEventos();
  }, []);

  // ================= INSCRIÇÃO / DESINSCRIÇÃO =================
  async function toggleInscricao(evento: Evento) {
    if (!user) {
      navigate("/login");
      return;
    }

    const ref = doc(db, "eventos", evento.id);
    const jaInscrito = evento.inscritos?.includes(user.uid);

    try {
      if (jaInscrito) {
        // 🔴 DESINSCREVER
        await updateDoc(ref, {
          inscritos: arrayRemove(user.uid),
          inscricoes: increment(-1)
        });

        setEventos(prev =>
          prev.map(ev =>
            ev.id === evento.id
              ? {
                ...ev,
                inscritos: ev.inscritos?.filter(
                  uid => uid !== user.uid
                ),
                inscricoes: Math.max((ev.inscricoes || 1) - 1, 0)
              }
              : ev
          )
        );

        window.NAVE_ADVANCED?.toast?.show(
          "Inscrição cancelada",
          "info"
        );
      } else {
        // 🟢 INSCREVER
        await updateDoc(ref, {
          inscritos: arrayUnion(user.uid),
          inscricoes: increment(1)
        });

        setEventos(prev =>
          prev.map(ev =>
            ev.id === evento.id
              ? {
                ...ev,
                inscritos: [...(ev.inscritos || []), user.uid],
                inscricoes: (ev.inscricoes || 0) + 1
              }
              : ev
          )
        );

        window.NAVE_ADVANCED?.toast?.show(
          "Inscrição realizada com sucesso!",
          "success"
        );
      }
    } catch (error) {
      console.error("Erro ao atualizar inscrição:", error);
    }
  }

  // ================= JSX =================
  return (
    <section className="py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold mb-3">{blok.title}</h2>
          <p>{blok.description}</p>
        </div>

        <div className="row g-4" id="eventosContainer">
          {eventos.map(evento => {
            const dataEvento = new Date(evento.data);
            const dia = dataEvento.getDate();
            const mes = dataEvento
              .toLocaleString("pt-BR", { month: "short" })
              .replace(".", "")
              .toUpperCase();

            const jaInscrito = evento.inscritos?.includes(user?.uid);

            return (
              <div key={evento.id} className="col">
                <div className="card event-card">
                  <div className="row g-0">
                    <div className="col-auto">
                      <div className="event-date avacolor">
                        <span className="day">{dia}</span>
                        <span className="month">{mes}</span>
                      </div>
                    </div>

                    <div className="col">
                      <div className="card-body">
                        <span className="badge mb-2 bg-badge">
                          {evento.tipo}
                        </span>

                        <h6 className="card-title fw-bold title-color">
                          {evento.titulo}
                        </h6>

                        <div className="d-flex justify-content-between align-items-center">
                          <span className="text-muted small">
                            <i className="bi bi-clock"></i> {evento.horario}
                          </span>
                          <span className="text-muted small">
                            <i className="bi bi-people"></i>{" "}
                            {evento.inscricoes || 0}/{evento.vagas}
                          </span>
                        </div>

                        <button
                          className={`btn btn-sm mt-3 w-100 event-action-btn ${jaInscrito ? "is-cancel" : "is-subscribe"
                            }`}
                          onClick={() => toggleInscricao(evento)}
                        >
                          {user
                            ? jaInscrito
                              ? "Cancelar Inscrição"
                              : "Inscrever-se"
                            : "Faça login para se inscrever"}
                        </button>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-4">
          <Link to="/eventos" className="btn btn-lg">
            {blok.button_section_events}{" "}
            <i className="bi bi-calendar-event"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}
