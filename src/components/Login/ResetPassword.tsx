import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { verifyResetCode, confirmNewPassword } from "../../services/authService";

const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const oobCode = searchParams.get("oobCode");

  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // Valida o link assim que entra na página
  useEffect(() => {
    if (!oobCode) {
      setError("Link inválido ou expirado.");
      return;
    }

    // Verifica se o código é válido
    verifyResetCode(oobCode).catch(() => {
      setError("Link inválido ou expirado.");
    });
  }, [oobCode]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      setError("Preencha todos os campos.");
      return;
    }

    if (password.length < 6) {
      setError("A senha deve ter no mínimo 6 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    if (!oobCode) {
      setError("Código de redefinição inválido.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await confirmNewPassword(oobCode, password);
      setSuccess(true);

      // Redireciona para login após 2 segundos
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err: any) {
      console.error(err);
      // Mostra mensagem específica se existir
      setError(err?.message || "Não foi possível redefinir a senha.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-12 col-sm-10 col-md-8 col-lg-5">
          <div className="new-password-card">
            <h2 className="mb-2">Nova senha</h2>
            <p className="mb-4">Crie uma nova senha para sua conta.</p>

            {success ? (
              <div className="alert alert-success text-center">
                Senha alterada com sucesso! Redirecionando...
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-3 text-start">
                  <label className="form-label">Nova senha</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control new-password-input"
                    placeholder="Digite sua nova senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                  />
                </div>

                <div className="mb-3 text-start">
                  <label className="form-label">Confirmar senha</label>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control new-password-input"
                      placeholder="Confirme sua nova senha"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      disabled={loading}
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setShowPassword(!showPassword)}
                      tabIndex={-1}
                    >
                      <i
                        className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
                      />
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="alert alert-danger py-2">{error}</div>
                )}

                <button
                  type="submit"
                  className="btn new-password-btn w-100"
                  disabled={loading}
                >
                  {loading ? "Salvando..." : "Salvar senha"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
