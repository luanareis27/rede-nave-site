import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Badge, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { getTracks, TrackWithId } from "../../services/trackService";
import LoadingSpinner from "../LoadingSpinner";

import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

import "/src/styles/coursedetail.css";

const levelColorMap: Record<string, string> = {
  Iniciante: "success",
  Intermediário: "primary",
  Avançado: "warning",
};

export default function CourseDetail() {
  const { id } = useParams<{ id: string }>();

  const [loading, setLoading] = useState(true);
  const [trilha, setTrilha] = useState<TrackWithId | null>(null);

  const [isLogged, setIsLogged] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [userUid, setUserUid] = useState<string | null>(null);

  /* ================= AUTH ================= */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsLogged(true);
        setUserUid(user.uid);

        if (id) {
          const ref = doc(db, "users", user.uid, "inscricoes", id);
          const snap = await getDoc(ref);
          setIsEnrolled(snap.exists());
        }
      } else {
        setIsLogged(false);
        setUserUid(null);
        setIsEnrolled(false);
      }
    });

    return () => unsubscribe();
  }, [id]);

  /* ================= LOAD TRILHA ================= */
  useEffect(() => {
    carregarTrilha();
  }, [id]);

  const carregarTrilha = async () => {
    try {
      setLoading(true);
      const data = await getTracks();
      const encontrada = data.find((t) => t.id === id);
      setTrilha(encontrada ?? null);
    } catch (error) {
      console.error("Erro ao carregar trilha:", error);
      setTrilha(null);
    } finally {
      setLoading(false);
    }
  };

  /* ================= INSCRIÇÃO ================= */
  const handleEnroll = async () => {
    if (!userUid || !trilha) return;

    try {
      await setDoc(doc(db, "users", userUid, "inscricoes", trilha.id), {
        trilhaId: trilha.id,
        title: trilha.title,
        enrolledAt: new Date(),
      });

      setIsEnrolled(true);
    } catch (error) {
      console.error("Erro ao inscrever:", error);
      alert("Erro ao realizar inscrição");
    }
  };

  if (loading) return <LoadingSpinner />;

  if (!trilha) {
    return (
      <Container className="py-5 text-center">
        <h3>Trilha não encontrada</h3>
        <Link to="/trilhas" className="btn btn-primary mt-3">
          Voltar para trilhas
        </Link>
      </Container>
    );
  }

  return (
    <>
      {/* HERO */}
      <section className="course-hero py-5">
        <Container>
          <Row className="align-items-center gy-4">
            <Col lg={6}>
              <Badge bg={levelColorMap[trilha.level]} className="mb-3">
                {trilha.level}
              </Badge>

              <h1 className="fw-bold mb-3">{trilha.title}</h1>
              <p className="text-muted mb-4">{trilha.description}</p>

              <div className="d-flex flex-wrap gap-4 mb-4 text-muted">
                <span>
                  <i className="bi bi-clock"></i> {trilha.workload}h
                </span>
                <span>
                  <i className="bi bi-folder"></i> {trilha.category}
                </span>
              </div>

              {/* BOTÕES */}
              <div className="d-flex gap-3 flex-wrap">
                {!isLogged && (
                  <Link to="/login" className="btn btn-primary btn-lg">
                    Faça login para se inscrever
                  </Link>
                )}

                {isLogged && !isEnrolled && (
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleEnroll}
                  >
                    Inscrever-se
                  </Button>
                )}

                {isLogged && isEnrolled && (
                  <Link
                    to={`/trilhas/${trilha.id}/conteudo`}
                    className="btn btn-success btn-lg"
                  >
                    Acessar trilha
                  </Link>
                )}

                <Link
                  to="/trilhas"
                  className="btn btn-outline-secondary btn-lg"
                >
                  Voltar
                </Link>
              </div>
            </Col>

            <Col lg={6} className="text-center">
              <div
                className="rounded shadow-sm d-flex align-items-center justify-content-center"
                style={{
                  height: "300px",
                  background: "linear-gradient(135deg, #667eea, #764ba2)",
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: "1.2rem",
                }}
              >
                Banner da Trilha
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CONTEÚDO */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="gy-4">
            <Col lg={6}>
              <h3 className="fw-bold mb-3">O que você vai aprender</h3>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  Conteúdo prático e direto ao ponto
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  Aplicação real no mercado
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  Desenvolvimento profissional contínuo
                </li>
              </ul>
            </Col>

            <Col lg={6}>
              <h3 className="fw-bold mb-3">Estrutura da trilha</h3>
              <div className="accordion accordion-flush">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div className="accordion-item" key={index}>
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#modulo-${index}`}
                      >
                        Módulo {index + 1}
                      </button>
                    </h2>
                    <div
                      id={`modulo-${index}`}
                      className="accordion-collapse collapse"
                    >
                      <div className="accordion-body">
                        Conteúdo detalhado do módulo.
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
