import React from "react";

export type DashboardSection =
  | "overview"
  | "cursos"
  | "eventos"
  | "certificados"
  | "perfil"
  | "configuracoes";

interface DashboardSidebarProps {
  section: DashboardSection;
  onChangeSection: (section: DashboardSection) => void;
  fotoPerfil: string | null;
  onUploadFoto: (novaFoto: string) => void;
  nomeCompleto: string; // ✅ vem do cadastro (Firestore)
  email: string;
  nivel: number;
  membroDesde: string;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  section,
  onChangeSection,
  fotoPerfil,
  onUploadFoto,
  nomeCompleto,
  email,
  nivel,
  membroDesde,
}) => {
  const menuItems: { key: DashboardSection; label: string; icon: string }[] = [
    { key: "overview", label: "Visão Geral", icon: "bi-house-door" },
    { key: "cursos", label: "Meus Cursos", icon: "bi-book" },
    { key: "eventos", label: "Meus Eventos", icon: "bi-calendar-event" },
    { key: "certificados", label: "Certificados", icon: "bi-award" },
  ];

  const iniciais =
    nomeCompleto?.trim()
      ? nomeCompleto
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
      : "US";

  return (
    <aside className="dashboard-sidebar">
      {/* FOTO DE PERFIL */}
      <div className="profile-img-container">
        {fotoPerfil ? (
          <img src={fotoPerfil} alt="Foto de perfil" className="profile-img" />
        ) : (
          <div className="profile-img initials">
            {iniciais}
          </div>
        )}
      </div>

      {/* INFO USUÁRIO */}
      <h5 className="text-center fw-bold mt-3">
        {nomeCompleto || "Usuário"}
      </h5>
      <p className="text-center text-muted small">{email}</p>

      <div className="text-center mb-4">
        <span className="badge bg-warning text-dark px-3 py-2">
          <i className="bi bi-trophy me-1"></i> Nível {nivel}
        </span>
      </div>

      <hr />

      {/* MENU */}
      <nav>
        {menuItems.map((item) => (
          <div
            key={item.key}
            className={`menu-item ${section === item.key ? "active" : ""}`}
            onClick={() => onChangeSection(item.key)}
          >
            <i className={`bi ${item.icon}`}></i>
            <span>{item.label}</span>
          </div>
        ))}
      </nav>

      <hr />

      {/* FOOTER */}
      <div className="text-center">
        <small className="text-muted">Membro desde</small>
        <p className="fw-bold mb-0">{membroDesde}</p>
      </div>
    </aside>
  );
};

export default DashboardSidebar;