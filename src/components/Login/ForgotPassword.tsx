import React, { useState } from "react";
import { Link } from "react-router-dom";

// Importa a função que já encapsula o Firebase Auth
import { resetPassword } from "../../services/authService";

const ForgotPassword: React.FC = () => {
  /**
   * Guarda o email digitado pelo usuário
   */
  const [email, setEmail] = useState("");

  /**
   * Controla estado de carregamento (UX)
   */
  const [loading, setLoading] = useState(false);

  /**
   * Mensagem de sucesso (ex: email enviado)
   */
  const [successMessage, setSuccessMessage] = useState("");

  /**
   * Mensagem de erro (ex: email inválido ou não encontrado)
   */
  const [errorMessage, setErrorMessage] = useState("");

  /**
   * Função executada ao enviar o formulário
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // evita reload da página

    // Limpa mensagens anteriores
    setSuccessMessage("");
    setErrorMessage("");

    // Ativa loading
    setLoading(true);

    try {
      /**
       * Chama o Firebase para enviar o email de redefinição
       * O Firebase:
       * - valida o email
       * - envia o link
       * - cuida da segurança
       */
      await resetPassword(email);

      // Feedback positivo para o usuário
      setSuccessMessage(
        "Se o e-mail estiver cadastrado, enviamos um link para redefinir sua senha."
      );
    } catch (error) {
      /**
       * Aqui pode cair erro como:
       * - auth/user-not-found
       * - auth/invalid-email
       *
       * Por segurança, não revelamos detalhes
       */
      setErrorMessage(
        "Não foi possível enviar o link. Verifique o e-mail informado."
      );
    } finally {
      // Finaliza loading independente de sucesso ou erro
      setLoading(false);
    }
  };

  return (
    <div className="forgot-container">
      <div className="container">
        <div className="row justify-content-center align-items-center min-vh-100">
          <div className="col-12 col-sm-10 col-md-8 col-lg-5">
            <div className="forgot-card">
              <h2 className="mb-3">Esqueceu sua senha?</h2>

              <p className="mb-4">
                Informe seu e-mail cadastrado e enviaremos um link para redefinir
                sua senha.
              </p>

              {/* Formulário de recuperação */}
              <form onSubmit={handleSubmit}>
                <div className="mb-3 text-start">
                  <label htmlFor="email" className="form-label">
                    E-mail
                  </label>

                  <input
                    type="email"
                    id="email"
                    className="form-control forgot-input"
                    placeholder="seu@email.com"
                    value={email} // input controlado
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn forgot-btn w-100"
                  disabled={loading}
                >
                  {loading ? "Enviando..." : "Enviar link de recuperação"}
                </button>
              </form>

              {/* Mensagem de sucesso */}
              {successMessage && (
                <p className="text-success mt-3">{successMessage}</p>
              )}

              {/* Mensagem de erro */}
              {errorMessage && (
                <p className="text-danger mt-3">{errorMessage}</p>
              )}

              <div className="forgot-footer mt-4">
                <Link to="/login">← Voltar para o login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
