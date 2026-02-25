import { useNavigate } from "react-router-dom";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { registerWithEmail } from "../../services/authService";

type StoryblokAsset = {
  filename: string;
  alt?: string;
};

type CadUserProps = {
  blok: {
    logo?: StoryblokAsset | null;
    title: string;
    description: string;
    title_form: string;
    card_name: string;
    placeholder_name: string;
    card_email: string;
    placeholder_email: string;
    card_phone: string;
    placeholder_phone: string;
    card_data: string;
    card_senha: string;
    placeholder_senha: string;
    card_confirm_senha: string;
    placeholder_confirm_senha: string;
    button_card: string;
    account: string;
    login: string;
    button_section_card: string;
  };
};

interface FormData {
  nome: string;
  email: string;
  telefone: string;
  dataNascimento: string;
  senha: string;
  confirmarSenha: string;
}

interface FormErrors {
  [key: string]: string | undefined;
}

export default function CadUser({ blok }: CadUserProps) {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const image =
    typeof blok.logo === "object" && blok.logo?.filename
      ? blok.logo
      : null;

  const [form, setForm] = useState<FormData>({
    nome: "",
    email: "",
    telefone: "",
    dataNascimento: "",
    senha: "",
    confirmarSenha: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const maskTelefone = (value: string): string => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 2) return digits;
    if (digits.length <= 6)
      return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length <= 10)
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    if (id === "telefone") {
      setForm((prev) => ({ ...prev, telefone: maskTelefone(value) }));
    } else {
      setForm((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const newErrors: FormErrors = {};

    if (!form.nome.trim()) newErrors.nome = "Informe seu nome.";
    if (!form.email.trim()) newErrors.email = "Informe seu e-mail.";
    if (!form.telefone.trim()) newErrors.telefone = "Informe o telefone.";
    if (!form.dataNascimento)
      newErrors.dataNascimento = "Informe a data de nascimento.";
    if (form.senha.length < 6)
      newErrors.senha = "A senha deve ter no mínimo 6 caracteres.";
    if (form.senha !== form.confirmarSenha)
      newErrors.confirmarSenha = "As senhas não coincidem.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      await registerWithEmail(
        form.email.trim().toLowerCase(),
        form.senha,
        {
          nomeCompleto: form.nome,
          telefone: form.telefone,
          dataNascimento: form.dataNascimento,
        }
      );

      setShowSuccessModal(true);

      setTimeout(() => {
        navigate("/login");
      }, 2500);
    } catch (err: any) {
      if (err.code === "auth/email-already-in-use") {
        setErrors({ email: "Este e-mail já está cadastrado." });
      } else if (err.code === "auth/invalid-email") {
        setErrors({ email: "E-mail inválido." });
      } else {
        setErrors({ senha: "Erro ao realizar cadastro." });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const invalidClass = (field: string) =>
    errors[field] ? "is-invalid" : "";

  return (
    <div className="cadastro-container">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">

            {/* Cabeçalho */}
            <div className="cadastro-card bg-card-cad">
              <div className="text-center mb-4">
                <a className="navbar-brand fw-bold" href="/">
                  {image && (
                    <img
                      src={image.filename}
                      alt={image.alt || "Rede Nave"}
                      style={{ width: "120px" }}
                    />
                  )}
                </a>
                <h2 className="fw-bold mt-3 text-white">{blok.title}</h2>
                <p className="text-white">{blok.description}</p>
              </div>
            </div>

            {/* Formulário */}
            <div className="cadastro-card-two">
              <form onSubmit={handleSubmit} noValidate>
                <h5 className="mb-4">
                  <i className="bi bi-person-circle"></i> {blok.title_form}
                </h5>

                {/* Linha 1 */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">{blok.card_name}</label>
                    <input
                      id="nome"
                      className={`form-control ${invalidClass("nome")}`}
                      placeholder={blok.placeholder_name}
                      value={form.nome}
                      onChange={handleChange}
                    />
                    <div className="invalid-feedback">{errors.nome}</div>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">{blok.card_email}</label>
                    <input
                      id="email"
                      type="email"
                      className={`form-control ${invalidClass("email")}`}
                      placeholder={blok.placeholder_email}
                      value={form.email}
                      onChange={handleChange}
                    />
                    <div className="invalid-feedback">{errors.email}</div>
                  </div>
                </div>

                {/* Linha 2 */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">{blok.card_phone}</label>
                    <input
                      id="telefone"
                      className={`form-control ${invalidClass("telefone")}`}
                      placeholder={blok.placeholder_phone}
                      value={form.telefone}
                      onChange={handleChange}
                    />
                    <div className="invalid-feedback">{errors.telefone}</div>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">{blok.card_data}</label>
                    <input
                      id="dataNascimento"
                      type="date"
                      className={`form-control ${invalidClass("dataNascimento")}`}
                      value={form.dataNascimento}
                      onChange={handleChange}
                    />
                    <div className="invalid-feedback">
                      {errors.dataNascimento}
                    </div>
                  </div>
                </div>

                {/* Linha 3 */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">{blok.card_senha}</label>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="senha"
                      className={`form-control ${invalidClass("senha")}`}
                      placeholder={blok.placeholder_senha}
                      value={form.senha}
                      onChange={handleChange}
                    />
                    <div className="invalid-feedback">{errors.senha}</div>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      {blok.card_confirm_senha}
                    </label>

                    <div className="input-group">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="confirmarSenha"
                        className={`form-control ${invalidClass("confirmarSenha")}`}
                        placeholder={blok.placeholder_confirm_senha}
                        value={form.confirmarSenha}
                        onChange={handleChange}
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setShowPassword(!showPassword)}
                        tabIndex={-1}
                      >
                        <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                      </button>
                    </div>

                    <div className="invalid-feedback">
                      {errors.confirmarSenha}
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-success w-100 mt-3"
                  disabled={isSubmitting}
                >
                  <i className="bi bi-check-lg"></i> {blok.button_card}
                </button>
              </form>

              <div className="text-center mt-4">
                <span className="text-muted ">{blok.account} </span>
                <a href="/login" className="fw-bold bg-text text-decoration-none">
                  {blok.login}
                </a>
              </div>
            </div>

            <div className="text-center mt-4">
              <a href="/" className="btn">
                <i className="bi bi-arrow-left"></i> {blok.button_section_card}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL DE SUCESSO */}
      {showSuccessModal && (
        <>
          <div className="modal fade show d-block">
            <div className="modal-dialog modal-dialog-centered">
              <div
                className="modal-content border-0 shadow-lg"
                style={{
                  background: `linear-gradient(to bottom, #f7f3ff 0%, #e8d9ff 100%),
                 linear-gradient(90deg, rgba(255, 255, 255, 0.15) 1px, transparent 1px),
                 linear-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)`,
                  backgroundSize: "100% 100%, 40px 40px, 40px 40px",
                }}
              >
                <div className="modal-body text-center p-5">
                  <div
                    className="mb-4 d-flex align-items-center justify-content-center rounded-circle"
                    style={{
                      width: "70px",
                      height: "70px",
                      background: "linear-gradient(135deg, #22c55e, #16a34a)",
                      margin: "0 auto",
                    }}
                  >
                    <i className="bi bi-check-lg text-white fs-2"></i>
                  </div>

                  <h4 className="fw-bold bg-text mb-2">
                    Cadastro realizado!
                  </h4>

                  <p className="text-muted bg-text mb-4">
                    Sua conta foi criada com sucesso.
                    Você será redirecionado para o login.
                  </p>

                  <div className="spinner-border text-success"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </div>
  );
}
