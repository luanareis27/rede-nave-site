import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "firebase/auth";

import {
  loginWithEmail,
  loginWithGoogle,
  loginWithFacebook,
  getSocialRedirectResult,
} from "../../services/authService";

import { ADMIN_EMAILS } from "../../config/admin";

/* =========================
   TIPOS
========================= */
type StoryblokAsset = {
  filename: string;
  alt?: string;
};

type LoginUserProps = {
  blok: {
    logo?: StoryblokAsset | null;
    title: string;
    description: string;
    topics01: string;
    topics02: string;
    topics03: string;
    card_title: string;
    card_description: string;
    card_login_google: string;
    card_login_face: string;
    or: string;
    form_email: string;
    placeholder_email: string;
    form_senha: string;
    placeholder_senha: string;
    remind_me: string;
    forgot_your_password: string;
    button_card: string;
    not_count: string;
    cad: string;
    button_section_home: string;
  };
};

export default function LoginUser({ blok }: LoginUserProps) {
  /* =========================
     STATES
  ========================= */
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const image =
    typeof blok.logo === "object" && blok.logo?.filename ? blok.logo : null;

  /* =========================
     REDIRECT POR ROLE
     - Admin -> /admin
     - User  -> /dashboard
  ========================= */
  const redirectByRole = (user: User) => {
    const email = user.email ?? "";

    if (ADMIN_EMAILS.includes(email)) {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }
  };

  /* =========================
     LOGIN SOCIAL (REDIRECT)
  ========================= */
  useEffect(() => {
    setLoading(true);

    getSocialRedirectResult()
      .then((user) => {
        if (!user) return;

        const nomeUsuario =
          user.displayName || user.email?.split("@")[0] || "Usuário";

        localStorage.setItem("nome", nomeUsuario);
        if (user.photoURL) localStorage.setItem("fotoPerfil", user.photoURL);
        if (user.email) localStorage.setItem("email", user.email);

        redirectByRole(user);
      })
      .catch((err) => {
        console.error(err);
        setError("Erro ao finalizar login social.");
      })
      .finally(() => setLoading(false));
  }, []);

  /* =========================
     LOGIN COM EMAIL/SENHA
  ========================= */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !senha.trim()) {
      setError("Preencha todos os campos.");
      return;
    }

    try {
      setLoading(true);

      const user = await loginWithEmail(email, senha);

      const nomeUsuario = user.displayName || email.split("@")[0] || "Usuário";

      localStorage.setItem("nome", nomeUsuario);
      localStorage.setItem("email", email);
      if (user.photoURL) localStorage.setItem("fotoPerfil", user.photoURL);

      redirectByRole(user);
    } catch (err: any) {
      console.error(err);

      if (err.code === "auth/user-not-found")
        setError("Usuário não encontrado.");
      else if (err.code === "auth/wrong-password")
        setError("Senha incorreta.");
      else if (err.code === "auth/invalid-email")
        setError("E-mail inválido.");
      else setError("Erro ao fazer login. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     LOGIN COM GOOGLE
  ========================= */
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError(null);

      const user = await loginWithGoogle();
      if (!user) return;

      const nomeUsuario =
        user.displayName || user.email?.split("@")[0] || "Usuário";

      localStorage.setItem("nome", nomeUsuario);
      if (user.photoURL) localStorage.setItem("fotoPerfil", user.photoURL);
      if (user.email) localStorage.setItem("email", user.email);

      redirectByRole(user);
    } catch (err) {
      console.error(err);
      setError("Erro ao iniciar login com Google.");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     LOGIN COM FACEBOOK
  ========================= */
  const handleFacebookLogin = async () => {
    try {
      setLoading(true);
      setError(null);

      const user = await loginWithFacebook();
      if (!user) return;

      const nomeUsuario =
        user.displayName || user.email?.split("@")[0] || "Usuário";

      localStorage.setItem("nome", nomeUsuario);
      if (user.photoURL) localStorage.setItem("fotoPerfil", user.photoURL);
      if (user.email) localStorage.setItem("email", user.email);

      redirectByRole(user);
    } catch (err) {
      console.error(err);
      setError("Erro ao iniciar login com Facebook.");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     JSX
  ========================= */
  return (
    <div className="login-container">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="login-card">
              <div className="row g-0">
                {/* LADO ESQUERDO */}
                <div className="col-md-5 login-image text-white d-none d-md-flex flex-column">
                  <div className="text-center">
                    {image && (
                      <img
                        src={image.filename}
                        alt={image.alt || "Logo"}
                        style={{ width: "100px" }}
                      />
                    )}

                    <h3 className="mt-4 fw-bold">{blok.title}</h3>
                    <p className="mt-3 px-4 text-white">
                      {blok.description}
                    </p>

                    <div className="mt-5">
                      {[blok.topics01, blok.topics02, blok.topics03].map(
                        (topic, index) => (
                          <div
                            key={index}
                            className="d-flex align-items-center justify-content-center mb-3"
                          >
                            <i className="bi bi-check-circle-fill me-2"></i>
                            <span>{topic}</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>

                {/* FORMULÁRIO */}
                <div className="col-md-7">
                  <div className="login-form">
                    <div className="text-center mb-4">
                      <h2 className="fw-bold">{blok.card_title}</h2>
                      <p className="text-muted">
                        {blok.card_description}
                      </p>
                    </div>

                    {error && (
                      <div className="alert alert-danger">{error}</div>
                    )}

                    {/* LOGIN SOCIAL */}
                    <div className="mb-4">
                      <button
                        type="button"
                        className="social-login-btn bg-text"
                        onClick={handleGoogleLogin}
                        disabled={loading}
                      >
                        <i className="bi bi-google me-2"></i>
                        {blok.card_login_google}
                      </button>

                      <button
                        type="button"
                        className="social-login-btn bg-text"
                        onClick={handleFacebookLogin}
                        disabled={loading}
                      >
                        <i className="bi bi-facebook me-2"></i>
                        {blok.card_login_face}
                      </button>
                    </div>

                    <div className="text-center mb-4">
                      <span className="text-muted">{blok.or}</span>
                    </div>

                    {/* FORM EMAIL/SENHA */}
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label className="form-label">
                          <i className="bi bi-envelope"></i>{" "}
                          {blok.form_email}
                        </label>

                        <input
                          type="email"
                          className="form-control"
                          placeholder={blok.placeholder_email}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          disabled={loading}
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">
                          <i className="bi bi-lock"></i>{" "}
                          {blok.form_senha}
                        </label>

                        <div className="input-group">
                          <input
                            type={showPassword ? "text" : "password"}
                            className="form-control"
                            placeholder={blok.placeholder_senha}
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            disabled={loading}
                            required
                          />

                          <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            <i
                              className={
                                showPassword
                                  ? "bi bi-eye-slash"
                                  : "bi bi-eye"
                              }
                            ></i>
                          </button>
                        </div>
                      </div>

                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="lembrar"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="lembrar"
                          >
                            {blok.remind_me}
                          </label>
                        </div>

                        <Link
                          to="/forgot"
                          className="text-decoration-none bg-text"
                        >
                          {blok.forgot_your_password}
                        </Link>
                      </div>

                      <button
                        type="submit"
                        className="btn btn-primary w-100 mb-3"
                        disabled={loading}
                      >
                        {loading ? "Entrando..." : blok.button_card}
                      </button>

                      <div className="text-center">
                        <span className="text-muted">
                          {blok.not_count}{" "}
                        </span>
                        <Link
                          to="/cadastro"
                          className="fw-bold text-decoration-none bg-text"
                        >
                          {blok.cad}
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-4">
              <Link to="/" className="btn">
                <i className="bi bi-arrow-left"></i>{" "}
                {blok.button_section_home}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
