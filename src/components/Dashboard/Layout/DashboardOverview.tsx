import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../../config/firebase";

const DashboardOverview = () => {
  const [nomeCompleto, setNome] = useState<string>("");

  const [activeCourses, setActiveCourses] = useState(0);
  const [completedCourses] = useState(0);
  const [certificates] = useState(0);
  const [streak, setStreak] = useState(0);

  /* ================= USER NAME ================= */
  useEffect(() => {
    const nomeSalvo = localStorage.getItem("nomeCompleto");

    if (nomeSalvo) {
      const nomeFormatado = nomeSalvo
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .join(" ");

      setNome(nomeFormatado);
    }
  }, []);


  /* ================= LOAD COURSES ================= */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setActiveCourses(0);
        return;
      }

      try {
        const ref = collection(db, "users", user.uid, "inscricoes");
        const snapshot = await getDocs(ref);
        setActiveCourses(snapshot.size);
      } catch (error) {
        console.error("Erro ao carregar cursos ativos:", error);
      }
    });

    return () => unsubscribe();
  }, []);

  /* ================= STREAK ================= */
  useEffect(() => {
    const today = new Date().toDateString();

    const lastLogin = localStorage.getItem("lastLoginDate");
    let currentStreak = Number(localStorage.getItem("loginStreak")) || 0;

    if (!lastLogin) {
      currentStreak = 1;
    } else {
      const lastDate = new Date(lastLogin);
      const diffDays =
        (new Date(today).getTime() - lastDate.getTime()) /
        (1000 * 60 * 60 * 24);

      if (diffDays === 1) {
        currentStreak += 1;
      } else if (diffDays > 1) {
        currentStreak = 1;
      }
    }

    localStorage.setItem("lastLoginDate", today);
    localStorage.setItem("loginStreak", String(currentStreak));
    setStreak(currentStreak);
  }, []);

  return (
    <div className="dashboard-section">
      <h2 className="fw-bold mb-4">
        Olá, {nomeCompleto || "Usuário"}! 👋
      </h2>

      <p className="text-muted mb-4">
        Bem-vinda de volta! Aqui está um resumo do seu progresso.
      </p>

      {/* Estatísticas */}
      <div className="row g-4 mb-4">
        {[
          {
            icon: "bi-mortarboard-fill text-primary",
            number: activeCourses,
            label: "Cursos Ativos",
          },
          {
            icon: "bi-award-fill text-success",
            number: completedCourses,
            label: "Concluídos",
          },
          {
            icon: "bi-patch-check-fill text-warning",
            number: certificates,
            label: "Certificados",
          },
          {
            icon: "bi-lightning-fill text-danger",
            number: streak,
            label: "Dias de Streak",
          },
        ].map((stat, idx) => (
          <div key={idx} className="col-md-3 col-sm-6">
            <div className="stat-box text-center">
              <i
                className={`bi ${stat.icon}`}
                style={{ fontSize: "2.5rem" }}
              ></i>
              <h3 className="fw-bold mt-3 mb-0">{stat.number}</h3>
              <p className="text-muted mb-0">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Continue Aprendendo */}
      <h4 className="fw-bold mb-3">Continue de onde parou</h4>
      <div className="row g-4 mb-4">
        {[
          {
            title: "Marketing Digital",
            progress: 40,
            module: "Módulo 4 de 10",
            remaining: "48% restantes",
            color: "#3b82f6",
          },
          {
            title: "Gestão Financeira",
            progress: 67,
            module: "Módulo 6 de 10",
            remaining: "29% restantes",
            color: "#10b981",
          },
        ].map((course, idx) => (
          <div key={idx} className="col-md-6">
            <div className="continue-card">
              <div className="continue-left">
                <h5 className="fw-bold mb-1">{course.title}</h5>
                <small className="text-muted">{course.module}</small>

                <div className="progress continue-progress">
                  <div
                    className="progress-bar"
                    style={{
                      width: `${course.progress}%`,
                      backgroundColor: course.color,
                    }}
                  />
                </div>

                <small className="text-muted">{course.remaining}</small>
              </div>

              <div className="continue-right">
                <div
                  className="progress-circle"
                  style={{
                    background: `conic-gradient(${course.color} ${course.progress * 3.6}deg, #e5e7eb 0deg)`,
                  }}
                >
                  <span>{course.progress}%</span>
                </div>

                <button className="btn">
                  Continuar →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Certificados */}
      <h4 className="fw-bold mb-3">Certificados</h4>
      <div className="row g-4">
        {[
          {
            title: "Marketing Digital",
            issuedAt: "10 Jan 2026",
            status: "Disponível",
            color: "success",
          },
          {
            title: "Gestão Financeira",
            issuedAt: "02 Dez 2025",
            status: "Disponível",
            color: "success",
          },
        ].map((certificate, idx) => (
          <div key={idx} className="col-md-4">
            <div className="certificate-card">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <h6 className="fw-bold mb-1">{certificate.title}</h6>
                  <small className="text-muted">
                    Emitido em {certificate.issuedAt}
                  </small>
                </div>

                <span className={`badge bg-${certificate.color}`}>
                  {certificate.status}
                </span>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <small className="text-muted">
                  <i className="bi bi-patch-check-fill text-success me-1"></i>
                  Certificado válido
                </small>

                <button className="btn btn-sm btn-outline-primary">
                  <i className="bi bi-download"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardOverview;
