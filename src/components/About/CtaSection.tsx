import { Link } from "react-router-dom";

type CtaSectionProps = {
  blok: {
    title: string;
    description: string;
    button_section_cad: string,
    button_section_contact: string,
  };
};


export default function CtaSection({ blok }: CtaSectionProps) {
  const handleContato = () => {
    alert("contato@redenave.org");
  };

  return (
    <section className="cta-section py-5 text-white text-center">
      <div className="container">
        <h2 className="fw-bold mb-3">{blok.title}</h2>
        <p className="lead mb-4">
          {blok.description}
        </p>

        <div className="d-flex justify-content-center gap-3">
          <Link to="/cadastro" className="btn btn-lg px-5">
            {blok.button_section_cad}
          </Link>

          <button
            className="btn btn-outline-light btn-lg px-5"
            onClick={handleContato}
          >
            {blok.button_section_contact}
          </button>
        </div>
      </div>
    </section>
  );
}
