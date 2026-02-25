import React, { useState, useEffect, useMemo } from "react";
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
import { useNavigate } from "react-router-dom";
import { db } from "../../config/firebase";

type CalendarEventsProps = { blok: { title: string } };

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

/** 🔒 FUNÇÃO SEGURA CONTRA FUSO HORÁRIO */
function parseDateLocal(dateStr: string) {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export default function CalendarEvents({ blok }: CalendarEventsProps) {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [user, setUser] = useState<any>(null);

  const navigate = useNavigate();
  const auth = getAuth();

  const hoje = new Date();
  const [mesAtual, setMesAtual] = useState(hoje.getMonth());
  const [anoAtual, setAnoAtual] = useState(hoje.getFullYear());
  const [filtro, setFiltro] = useState("todos");
  const [diasDoMes, setDiasDoMes] = useState<any[]>([]);

  const nomeMes = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

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
        setEventos(data);
      } catch (error) {
        console.error("Erro ao carregar eventos:", error);
      }
    };
    fetchEventos();
  }, []);

  // ================= CALENDAR =================
  useEffect(() => {
    gerarCalendario();
  }, [mesAtual, anoAtual, eventos]);

  function gerarCalendario() {
    const primeiroDia = new Date(anoAtual, mesAtual, 1).getDay();
    const ultimoDia = new Date(anoAtual, mesAtual + 1, 0).getDate();

    const diasEventos = eventos
      .map(ev => parseDateLocal(ev.data))
      .filter(d => d.getMonth() === mesAtual && d.getFullYear() === anoAtual)
      .map(d => d.getDate());

    const dias = [];
    for (let i = 0; i < primeiroDia; i++) dias.push({ dia: null });
    for (let d = 1; d <= ultimoDia; d++) {
      dias.push({ dia: d, evento: diasEventos.includes(d) });
    }
    setDiasDoMes(dias);
  }

  function changeMonth(direction: number) {
    let novoMes = mesAtual + direction;
    let novoAno = anoAtual;

    if (novoMes < 0) {
      novoMes = 11;
      novoAno--;
    } else if (novoMes > 11) {
      novoMes = 0;
      novoAno++;
    }

    setMesAtual(novoMes);
    setAnoAtual(novoAno);
  }

  // ================= ORDENAÇÃO =================
  const eventosOrdenados = useMemo(() => {
    const lista =
      filtro === "todos"
        ? [...eventos]
        : eventos.filter(ev => ev.tipo === filtro);

    return lista.sort(
      (a, b) =>
        parseDateLocal(a.data).getTime() -
        parseDateLocal(b.data).getTime()
    );
  }, [eventos, filtro]);

  // ================= INSCRIÇÃO / DESINSCRIÇÃO =================
  async function toggleInscricao(evento: Evento) {
    if (!user) {
      navigate("/login");
      return;
    }

    const ref = doc(db, "eventos", evento.id!);
    const jaInscrito = evento.inscritos?.includes(user.uid);

    try {
      if (jaInscrito) {
        await updateDoc(ref, {
          inscritos: arrayRemove(user.uid),
          inscricoes: increment(-1)
        });

        setEventos(prev =>
          prev.map(ev =>
            ev.id === evento.id
              ? {
                ...ev,
                inscritos: ev.inscritos?.filter(id => id !== user.uid),
                inscricoes: (ev.inscricoes || 1) - 1
              }
              : ev
          )
        );
      } else {
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
      }
    } catch (error) {
      console.error("Erro ao atualizar inscrição:", error);
    }
  }

  // ================= JSX =================
  return (
    <section className="py-5">
      <div className="container">
        <h2 className="fw-bold mb-4 text-center">{blok.title}</h2>

        <div className="row g-4">
          {/* Calendário */}
          <div className="col-lg-5">
            <div className="calendar-container">
              <div className="calendar-header d-flex justify-content-between mb-2">
                <button className="btn btn-sm btn-outline-primary" onClick={() => changeMonth(-1)}>
                  <i className="bi bi-chevron-left"></i>
                </button>
                <h5 className="fw-bold mb-0">
                  {nomeMes[mesAtual]} {anoAtual}
                </h5>
                <button className="btn btn-sm btn-outline-primary" onClick={() => changeMonth(1)}>
                  <i className="bi bi-chevron-right"></i>
                </button>
              </div>

              <div className="calendar-grid d-grid mb-3" style={{ gridTemplateColumns: "repeat(7,1fr)" }}>
                {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map(d => (
                  <div key={d} className="text-center fw-bold small">{d}</div>
                ))}
              </div>

              <div className="calendar-grid" style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)" }}>
                {diasDoMes.map((item, i) => (
                  <div key={i} className={`calendar-day ${item.evento ? "has-event" : ""}`}>
                    {item.dia}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Lista de eventos */}
          <div className="col-lg-7">
            {eventosOrdenados.map(evento => {
              const inscricoes = evento.inscricoes || 0;
              const percentual = (inscricoes / evento.vagas) * 100;
              const jaInscrito = evento.inscritos?.includes(user?.uid);
              const dataEvento = parseDateLocal(evento.data);

              return (
                <div key={evento.id} className="card mb-3">
                  <div className="card-body row align-items-center">
                    <div className="col-md-2 text-center">
                      <div className="bg-calendar text-white p-3 rounded">
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
                    </div>

                    <div className="col-md-7">
                      <span className="badge bg-calendar mb-2">{evento.tipo}</span>
                      <h5 className="fw-bold">{evento.titulo}</h5>

                      <p className="text-muted mb-2 small">
                        <i className="bi bi-clock"></i> {evento.horario || "-"}{" "}
                        {evento.duracao || "-"} |{" "}
                        <i className="bi bi-laptop"></i>{" "}
                        {evento.modalidade || "-"}
                      </p>

                      <div className="progress" style={{ height: 5 }}>
                        <div
                          className="progress-bar bg-success"
                          style={{ width: `${percentual}%` }}
                        />
                      </div>

                      <small className="text-muted">
                        {inscricoes}/{evento.vagas} inscritos
                      </small>
                    </div>

                    <div className="col-md-3 text-end">
                      <button
                        className={`btn btn-sm w-100 event-action-btn ${jaInscrito ? "is-cancel" : "is-subscribe"}`}
                        onClick={() => toggleInscricao(evento)}
                      >
                        {!user
                          ? "Faça login"
                          : jaInscrito
                            ? "Cancelar"
                            : "Inscrever"}
                      </button>

                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
