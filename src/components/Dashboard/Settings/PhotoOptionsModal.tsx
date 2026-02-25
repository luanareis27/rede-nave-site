type Props = {
  onChoose: () => void;
  onRemove: () => void;
  onClose: () => void;
};

export default function PhotoOptionsModal({
  onChoose,
  onRemove,
  onClose,
}: Props) {
  return (
    <div className="crop-overlay" onClick={onClose}>
      <div className="crop-modal" onClick={(e) => e.stopPropagation()}>
        <h5 className="mb-3">Foto de perfil</h5>

        <div className="d-grid gap-2">
          <button className="btn btn-primary" onClick={onChoose}>
            Escolher foto
          </button>

          <button className="btn btn-outline-danger" onClick={onRemove}>
            Remover foto
          </button>

          <button className="btn btn-light" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
