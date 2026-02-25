import spinner from "../assets/spinner.png";

export default function LoadingSpinner() {
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center min-vh-100"
      style={{
        background: `
    linear-gradient(to bottom, #f7f3ff 0%, #e8d9ff 100%),
    linear-gradient(90deg, rgba(255, 255, 255, 0.15) 1px, transparent 1px),
    linear-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)
  `,
        backgroundSize: "100% 100%, 40px 40px, 40px 40px",
        color: "#fff",
      }}
    >
      <div className="spinner-container">
        <img src={spinner} alt="Carregando..." className="spinner-logo" />
      </div>

    </div>
  );
}
