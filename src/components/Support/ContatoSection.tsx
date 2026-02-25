import React, { useState } from "react";
import emailjs from "@emailjs/browser";

type ContatoSectionProps = {
  blok: {
    title: string;
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    placeholder: string;
    agreement: string;
    button_card_form: string;
  };
};

// ======= CONFIGURAÇÃO EMAILJS =======
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const USER_ID = import.meta.env.VITE_EMAILJS_USER_ID;


const Toast = ({ data }: { data: { title: string; message: string; type: string } | null }) => {
  if (!data) return null;

  return (
    <div
      className="toast-container position-fixed top-0 end-0 p-3"
      style={{ zIndex: 2000 }}
    >
      <div
        className={`toast show text-white bg-${data.type === "success" ? "success" : "danger"}`}
      >
        <div className="toast-header bg-transparent border-0 text-white">
          <strong className="me-auto">{data.title}</strong>
        </div>
        <div className="toast-body">{data.message}</div>
      </div>
    </div>
  );
};

const LoadingOverlay = ({ active, text }: { active: boolean; text?: string }) => {
  if (!active) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        zIndex: 1500,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        flexDirection: "column",
      }}
    >
      <div className="spinner-border text-light mb-3" role="status"></div>
      <p className="fw-bold">{text || "Carregando..."}</p>
    </div>
  );
};

export default function ContatoSection({ blok }: ContatoSectionProps) {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    assunto: "",
    mensagem: "",
    concordo: false,
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<null | { title: string; message: string; type: string }>(null);

  // ======== HANDLE CHANGE ========
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = e.target;
    const { id, value } = target;

    if (target.type === "checkbox") {
      setForm((prev) => ({ ...prev, [id]: (target as HTMLInputElement).checked }));
      return;
    }

    // Nome: só letras e espaços, máximo 50 caracteres
    if (id === "nome") {
      const nomeFiltrado = value.replace(/[^A-Za-zÀ-ÿ\s]/g, "").slice(0, 50);
      setForm((prev) => ({ ...prev, nome: nomeFiltrado }));
      return;
    }

    // Mensagem: máximo 500 caracteres
    if (id === "mensagem") {
      setForm((prev) => ({ ...prev, mensagem: value.slice(0, 500) }));
      return;
    }

    // Email: máximo 100 caracteres
    if (id === "email") {
      setForm((prev) => ({ ...prev, email: value.slice(0, 100) }));
      return;
    }

    // Telefone: máscara (XX) XXXXX-XXXX
    if (id === "telefone") {
      const telNumbers = value.replace(/\D/g, "").slice(0, 11);
      let formatted = telNumbers;
      if (telNumbers.length > 2) {
        formatted = `(${telNumbers.slice(0, 2)}) ${telNumbers.slice(2)}`;
      }
      if (telNumbers.length > 7) {
        formatted = `(${telNumbers.slice(0, 2)}) ${telNumbers.slice(2, 7)}-${telNumbers.slice(7)}`;
      }
      setForm((prev) => ({ ...prev, telefone: formatted }));
      return;
    }

    setForm((prev) => ({ ...prev, [id]: value }));
  };

  // ======== VALIDAÇÃO DO FORM ========
  const validateForm = () => {
    if (form.nome.trim().length < 2) return "Por favor, insira um nome válido (mínimo 2 caracteres).";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) return "Por favor, insira um e-mail válido.";

    if (form.telefone && !/^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(form.telefone))
      return "Por favor, insira um telefone válido (ex: (11) 98765-4321).";

    if (!form.assunto) return "Por favor, selecione um assunto.";

    if (form.mensagem.trim().length < 10)
      return "A mensagem deve ter no mínimo 10 caracteres.";

    if (!form.concordo) return "Você precisa concordar com os termos para enviar a mensagem.";

    return null;
  };

  // ======== HANDLE SUBMIT COM EMAILJS ========
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const error = validateForm();
    if (error) {
      setToast({ title: "Erro", message: error, type: "error" });
      setTimeout(() => setToast(null), 5000);
      return;
    }

    setLoading(true);

    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, form, USER_ID)
      .then(
        () => {
          setLoading(false);
          setToast({
            title: "Mensagem Enviada!",
            message: "Sua mensagem foi enviada com sucesso.",
            type: "success",
          });
          setForm({
            nome: "",
            email: "",
            telefone: "",
            assunto: "",
            mensagem: "",
            concordo: false,
          });
          setTimeout(() => setToast(null), 5000);
        },
        (error) => {
          setLoading(false);
          setToast({
            title: "Erro",
            message: "Falha ao enviar a mensagem. Tente novamente.",
            type: "error",
          });
          console.error("EmailJS error:", error);
          setTimeout(() => setToast(null), 5000);
        }
      );
  };

  // ======== RENDER ========
  return (
    <>
      <LoadingOverlay active={loading} text="Enviando sua mensagem..." />
      <Toast data={toast} />

      <section className="py-5" id="contato">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold">
            <i className="bi bi-send"></i> {blok.title}
          </h2>

          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card shadow-lg border-0">
                <div className="card-body p-5 bg-card">
                  <form id="formularioContato" onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="nome" className="form-label fw-bold">
                          {blok.name}
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="nome"
                          value={form.nome}
                          onChange={handleChange}
                          required
                        />
                        <small className="text-muted">Máx. 50 caracteres</small>
                      </div>

                      <div className="col-md-6 mb-3">
                        <label htmlFor="email" className="form-label fw-bold">
                          {blok.email}
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                        />
                        <small className="text-muted">Máx. 100 caracteres</small>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="telefone" className="form-label fw-bold">
                          {blok.phone}
                        </label>
                        <input
                          type="tel"
                          className="form-control"
                          id="telefone"
                          placeholder="(11) 98765-4321"
                          value={form.telefone}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label htmlFor="assunto" className="form-label fw-bold">
                          {blok.subject}
                        </label>
                        <select
                          className="form-select"
                          id="assunto"
                          value={form.assunto}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Selecione...</option>
                          <option value="duvida">Dúvida sobre Trilhas</option>
                          <option value="evento">Dúvida sobre Eventos</option>
                          <option value="certificado">Problema com Certificado</option>
                          <option value="tecnico">Problema Técnico</option>
                          <option value="sugestao">Sugestão</option>
                          <option value="outro">Outro</option>
                        </select>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="mensagem" className="form-label fw-bold">
                        {blok.message}
                      </label>
                      <textarea
                        className="form-control"
                        id="mensagem"
                        rows={5}
                        required
                        placeholder={blok.placeholder}
                        value={form.mensagem}
                        onChange={handleChange}
                      ></textarea>
                      <small className="text-muted">10 a 500 caracteres</small>
                    </div>

                    <div className="form-check mb-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="concordo"
                        checked={form.concordo}
                        onChange={handleChange}
                        required
                      />
                      <label className="form-check-label" htmlFor="concordo">
                        {blok.agreement}
                      </label>
                    </div>

                    <div className="d-grid">
                      <button type="submit" className="btn btn-primary btn-lg">
                        <i className="bi bi-send"></i> {blok.button_card_form}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
