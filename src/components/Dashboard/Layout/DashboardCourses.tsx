import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../../config/firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

type Course = {
  id: string;
  title: string;
  module: string;
  progress: number;
  lastAccess: string;
  status: "in-progress" | "completed";
};

export default function DashboardCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  /* ================= LOAD USER COURSES ================= */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setCourses([]);
        setFilteredCourses([]);
        setLoading(false);
        return;
      }

      setUserId(user.uid);

      try {
        const ref = collection(db, "users", user.uid, "inscricoes");
        const snapshot = await getDocs(ref);

        const data: Course[] = snapshot.docs.map((docItem) => {
          const curso = docItem.data();

          return {
            id: docItem.id,
            title: curso.title,
            module: "Módulo 1 de 10",
            progress: 0,
            lastAccess: "Ainda não iniciado",
            status: "in-progress",
          };
        });

        setCourses(data);
        setFilteredCourses(data);
      } catch (error) {
        console.error("Erro ao carregar cursos:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  /* ================= SEARCH ================= */
  useEffect(() => {
    const filtered = courses.filter((course) =>
      course.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredCourses(filtered);
  }, [search, courses]);

  /* ================= ABANDON COURSE ================= */
  const handleAbandonCourse = async (courseId: string) => {
    if (!userId) return;

    const confirm = window.confirm(
      "Tem certeza que deseja abandonar esta trilha?"
    );

    if (!confirm) return;

    try {
      await deleteDoc(
        doc(db, "users", userId, "inscricoes", courseId)
      );

      const updatedCourses = courses.filter(
        (course) => course.id !== courseId
      );

      setCourses(updatedCourses);
      setFilteredCourses(updatedCourses);
    } catch (error) {
      console.error("Erro ao abandonar trilha:", error);
      alert("Erro ao abandonar a trilha. Tente novamente.");
    }
  };

  return (
    <div className="dashboard-courses container-fluid">
      {/* Header */}
      <div className="courses-header d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Meus Cursos</h2>
        {/* 
        <select className="form-select order-select">
          <option>Último acesso</option>
          <option>Nome do curso</option>
          <option>Progresso</option>
        </select> */}
      </div>

      {/* Filtros */}
      <div className="courses-filters mb-4">
        <button className="filter-btn active">Todos</button>
        <button className="filter-btn">
          Em Progresso{" "}
          <span className="badge">{courses.length}</span>
        </button>
        <button className="filter-btn">Concluídos</button>
      </div>

      {/* Busca */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control search-input"
          placeholder="Buscar cursos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Cards */}
      <div className="row g-4">
        {loading ? (
          <p className="text-muted">Carregando cursos...</p>
        ) : filteredCourses.length === 0 ? (
          <p className="text-muted">
            Nenhuma trilha encontrada.
          </p>
        ) : (
          filteredCourses.map((course) => (
            <div key={course.id} className="col-xl-4 col-lg-6">
              <div className="course-card shadow-sm">
                <div className="course-image" />

                <div className="course-content">
                  <h5 className="fw-semibold">{course.title}</h5>
                  <p className="text-muted small mb-2">
                    {course.module}
                  </p>

                  {/* Progress */}
                  <div className="progress mb-2">
                    <div
                      className={`progress-bar ${course.status === "completed"
                        ? "bg-success"
                        : "bg-primary"
                        }`}
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>

                  <div className="course-footer d-flex justify-content-between align-items-center mt-3">
                    <span className="text-muted small">
                      {course.lastAccess}
                    </span>

                    <div className="d-flex align-items-center gap-3">
                      {course.status === "completed" ? (
                        <button className="btn btn-outline-success btn-sm px-3">
                          📜 Certificado
                        </button>
                      ) : (
                        <button className="btn btn-primary btn-sm px-4">
                          Continuar →
                        </button>
                      )}
                      {/* 
                      <button
                        type="button"
                        className="btn btn-link btn-sm text-danger p-0"
                        onClick={() => handleAbandonCourse(course.id)}
                      >
                        Abandonar
                      </button> */}
                    </div>
                  </div>

                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
