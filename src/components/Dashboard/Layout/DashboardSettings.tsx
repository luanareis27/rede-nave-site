import { useState } from "react";

const DashboardSettings = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="dashboard-section">
      {/* Header */}
      <div className="mb-4">
        <h2 className="fw-bold">Configurações</h2>
        <p className="text-muted">
          Gerencie suas preferências e personalize sua experiência na plataforma.
        </p>
      </div>

      {/* Card - Preferências */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-4">
          <h5 className="fw-semibold mb-3">Preferências</h5>

          {/* Notificações */}
          <div className="d-flex justify-content-between align-items-center py-3 border-bottom">
            <div>
              <p className="mb-1 fw-medium">Notificações por e-mail</p>
              <small className="text-muted">
                Receba avisos sobre cursos, eventos e atualizações importantes.
              </small>
            </div>

            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="emailNotif"
                checked={emailNotifications}
                onChange={() =>
                  setEmailNotifications(!emailNotifications)
                }
              />
            </div>
          </div>

          {/* Modo escuro */}
          <div className="d-flex justify-content-between align-items-center py-3">
            <div>
              <p className="mb-1 fw-medium">Modo escuro</p>
              <small className="text-muted">
                Reduza o brilho da interface para uma experiência mais confortável.
              </small>
            </div>

            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="darkMode"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Card - Ações */}
      <div className="card border-0 shadow-sm">
        <div className="card-body p-4 d-flex justify-content-between align-items-center">
          <div>
            <p className="mb-1 fw-medium">Salvar alterações</p>
            <small className="text-muted">
              As mudanças serão aplicadas imediatamente.
            </small>
          </div>

          <button className="btn btn-primary px-4 rounded-pill">
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardSettings;
