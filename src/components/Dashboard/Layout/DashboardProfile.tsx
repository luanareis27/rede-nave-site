import { useEffect, useRef, useState } from "react";
import CropModal from "../Settings/CropModal";

interface DashboardProfileProps {
  fotoPerfil: string | null;
  onChangeFoto: (novaFoto: string | null) => void;
}

const DashboardProfile: React.FC<DashboardProfileProps> = ({
  fotoPerfil,
  onChangeFoto,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [tempImage, setTempImage] = useState<string | null>(null);
  const [nome, setNome] = useState<string>("");

  useEffect(() => {
    const nomeSalvo = localStorage.getItem("nomeCompleto");
    if (nomeSalvo) {
      const nomeCurto = nomeSalvo
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .join(" ");
      setNome(nomeCurto);
    }
  }, []);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setTempImage(imageUrl);
  };

  const handleRemovePhoto = () => {
    setTempImage(null);
    onChangeFoto(null);
    localStorage.removeItem("fotoPerfil");
  };

  const avatarSrc =
    tempImage ||
    fotoPerfil ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      nome || "Usuário"
    )}&background=6f42c1&color=fff`;

  return (
    <div className="dashboard-section">
      <h2 className="fw-bold mb-4">Meu Perfil 👤</h2>

      <div className="card profile-card p-4">
        {/* HEADER */}
        <div className="profile-header text-center">
          <div
            className="profile-avatar"
            onClick={() => fileInputRef.current?.click()}
          >
            <img src={avatarSrc} alt="Avatar do usuário" />
            <div className="avatar-overlay">
              <i className="bi bi-camera-fill"></i>
              <span>Alterar foto</span>
            </div>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            hidden
            onChange={handleAvatarChange}
          />

          {/* BOTÕES */}
          {(fotoPerfil || tempImage) && (
            <button
              className="btn btn-sm btn-outline-danger mt-3"
              onClick={handleRemovePhoto}
            >
              <i className="bi bi-trash me-1"></i>
              Remover foto
            </button>
          )}

          <h5 className="fw-bold mt-3 mb-1">{nome || "Usuário"}</h5>
          <span className="text-muted">Nível 3 • Plano Premium</span>
        </div>

        <hr className="my-4" />

        {/* DADOS */}
        <div className="row g-4">
          <div className="col-md-6">
            <label className="form-label fw-semibold">Nome</label>
            <input className="form-control" value={nome} disabled />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">Email</label>
            <input
              className="form-control"
              value={localStorage.getItem("email") || ""}
              disabled
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">Membro desde</label>
            <input className="form-control" value="Janeiro 2025" disabled />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">Plano</label>
            <input className="form-control" value="Premium" disabled />
          </div>
        </div>
      </div>

      {/* MODAL DE CROP */}
      {tempImage && (
        <CropModal
          image={tempImage}
          onCancel={() => setTempImage(null)}
          onSave={(croppedImage) => {
            onChangeFoto(croppedImage);
            localStorage.setItem("fotoPerfil", croppedImage);
            setTempImage(null);
          }}
        />
      )}
    </div>
  );
};

export default DashboardProfile;
