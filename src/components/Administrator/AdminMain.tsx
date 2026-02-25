import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";

import logo from "/src/assets/logoRedeNave.png"

import "/src/styles/admin.css";

import AdminOverview from "./Layout/AdminOverview";
import AdminUsers from "./Layout/AdminUsers";
import AdminTracks from "./Layout/AdminTracks";
import AdminProgress from "./Layout/AdminProgress";
import AdminCertificates from "./Layout/AdminCertificates";
import AdminEvents from "./Layout/AdminEvents";
import AdminRanking from "./Layout/AdminRanking";
import AdminSettings from "./Layout/AdminSettings";

type AdminPage =
  | "overview"
  | "users"
  | "tracks"
  | "progress"
  | "certificates"
  | "events"
  | "ranking"
  | "settings";

const AdminMain: React.FC = () => {
  const [activePage, setActivePage] = useState<AdminPage>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Erro ao sair:", error);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <div
            className="sidebar-logo"
            style={{ cursor: 'pointer' }}
            onClick={() => window.location.href = '/'}
          >
            <img src={logo} alt="Rede Nave" />
          </div>
        </div>

        <nav className="sidebar-nav">
          <ul>
            {[
              ["overview", "Visão Geral", "speedometer2"],
              ["users", "Usuárias", "people"],
              ["tracks", "Trilhas", "diagram-3"],
              ["progress", "Progresso", "bar-chart"],
              ["certificates", "Certificados", "award"],
              ["events", "Eventos", "calendar-event"],
              ["ranking", "Ranking", "trophy"],
              ["settings", "Administração", "gear"],
            ].map(([key, label, icon]) => (
              <li
                key={key}
                className={activePage === key ? "active" : ""}
                onClick={() => {
                  setActivePage(key as AdminPage);
                  setSidebarOpen(false);
                }}
              >
                <i className={`bi bi-${icon}`} />
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </nav>

        {/* FOOTER DO SIDEBAR */}
        <footer className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right" />
            <span>Sair</span>
          </button>
        </footer>
      </aside>

      {/* SETA FLUTUANTE (MOBILE) */}
      <button
        className={`sidebar-toggle ${sidebarOpen ? "open" : ""}`}
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle sidebar"
      >
        <i className={`bi bi-chevron-${sidebarOpen ? "left" : "right"}`} />
      </button>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Conteúdo */}
      <main className="main-content">
        {activePage === "overview" && <AdminOverview />}
        {activePage === "users" && <AdminUsers />}
        {activePage === "tracks" && <AdminTracks />}
        {activePage === "progress" && <AdminProgress />}
        {activePage === "certificates" && <AdminCertificates />}
        {activePage === "events" && <AdminEvents />}
        {activePage === "ranking" && <AdminRanking />}
        {activePage === "settings" && <AdminSettings />}
      </main>
    </div>
  );
};

export default AdminMain;
