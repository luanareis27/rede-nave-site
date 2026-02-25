import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";
import ReactMarkdown from "react-markdown";

type NextEventProps = {
  blok: {
    title: string;
    badge: string;
    button_card_event: string;
  };
};

type Evento = {
  titulo: string;
  descricao: string;
  data: string;
  horario: string;
  modalidade: string;
  palestrante: string;
  cargo: string;
  status: string;
  tipo: string;
  vagas: number;
};

type Countdown = {
  dias: number;
  horas: number;
  minutos: number;
};

const NextEvent = ({ blok }: NextEventProps) => {
  const [evento, setEvento] = useState<Evento | null>(null);
  const [countdown, setCountdown] = useState<Countdown | null>(null);

  useEffect(() => {
    const buscarProximoEvento = async () => {
      const q = query(
        collection(db, "eventos"),
        where("status", "==", "Agendado"),
      );

      const snap = await getDocs(q);
      if (snap.empty) return;

      const hoje = new Date();

      const eventosOrdenados = snap.docs
        .map((doc) => doc.data() as Evento)
        .filter((e) => new Date(`${e.data}T${e.horario}`) >= hoje)
        .sort(
          (a, b) =>
            new Date(`${a.data}T${a.horario}`).getTime() -
            new Date(`${b.data}T${b.horario}`).getTime(),
        );

      if (eventosOrdenados.length > 0) {
        setEvento(eventosOrdenados[0]);
      }
    };

    buscarProximoEvento();
  }, []);

  // ⏱️ CONTAGEM REGRESSIVA
  useEffect(() => {
    if (!evento) return;

    const calcularCountdown = () => {
      const agora = new Date().getTime();
      const dataEvento = new Date(`${evento.data}T${evento.horario}`).getTime();

      const diferenca = dataEvento - agora;

      if (diferenca <= 0) {
        setCountdown(null);
        return;
      }

      const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
      const horas = Math.floor(
        (diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));

      setCountdown({ dias, horas, minutos });
    };

    calcularCountdown();
    const interval = setInterval(calcularCountdown, 1000);

    return () => clearInterval(interval);
  }, [evento]);

  if (!evento) {
    return (
      <p className="text-center text-muted">
        Nenhum evento agendado no momento.
      </p>
    );
  }

  return (
    <section className="py-5">
      <div className="container">
        <h2 className="fw-bold mb-4 text-center">{blok.title}</h2>

        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="event-header p-4 rounded-top bg-light">
              <div className="row align-items-center">
                {/* 🔹 INFO DO EVENTO */}
                <div className="col-md-8">
                  <span className="badge bg-warning text-dark mb-2">
                    {evento.tipo.toUpperCase()}
                  </span>

                  <h3 className="fw-bold mb-3">{evento.titulo}</h3>

                  <p className="mb-0 text-white">
                    <i className="bi bi-calendar"></i>{" "}
                    {new Date(evento.data).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                    <br />
                    <i className="bi bi-clock"></i> {evento.horario} (Horário de
                    Brasília)
                    <br />
                    <i className="bi bi-laptop"></i> {evento.modalidade}
                  </p>
                </div>

                {/* 🔹 COUNTDOWN */}
                {countdown && (
                  <div className="countdown-timer col-md-4 text-center mt-4 mt-md-0">
                    <h6 className="mb-3">Começa em:</h6>

                    <div className="d-flex justify-content-center gap-3">
                      <div>
                        <div className="fs-4 fw-bold">{countdown.dias}</div>
                        <small>Dias</small>
                      </div>

                      <div>
                        <div className="fs-4 fw-bold">{countdown.horas}</div>
                        <small>Horas</small>
                      </div>

                      <div>
                        <div className="fs-4 fw-bold">{countdown.minutos}</div>
                        <small>Min</small>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <button className="btn btn-outline-light btn-lg mt-3">
                <i className="bi bi-calendar-plus"></i> {blok.button_card_event}
              </button>
            </div>

            {/* 🔹 BODY */}
            <div
              className="bg-white p-4"
              style={{ borderRadius: "0 0 15px 15px" }}
            >
              <h5 className="fw-bold mb-3">Sobre o Evento</h5>
              <div className="text-muted">
                <ReactMarkdown>{evento.descricao}</ReactMarkdown>
              </div>

              <div className="d-flex align-items-center mt-4">
                <div className="me-3">
                  <div
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "1.5rem",
                    }}
                  >
                    {evento.palestrante.charAt(0).toUpperCase()}
                  </div>
                </div>

                <div>
                  <h6 className="fw-bold mb-0">{evento.palestrante}</h6>
                  <small className="text-muted">{evento.cargo}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NextEvent;
