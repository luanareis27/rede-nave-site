
type StoryblokAsset = {
  filename: string;
  alt?: string;
};

type PartnersProps = {
  blok: {
    title: string;
    partners01?: StoryblokAsset | null;
    partners02?: StoryblokAsset | null;
    partners03?: StoryblokAsset | null;
    partners04?: StoryblokAsset | null;
    subtitle: string;
    description: string;
    button_section_partners: string
  };
};
export default function Partners({ blok }: PartnersProps) {
  const handleClick = () => {
    alert("Entre em contato: parcerias@redenave.org");
  };

  const image01 = blok.partners01?.filename ? blok.partners01 : null;
  const image02 = blok.partners02?.filename ? blok.partners02 : null;
  const image03 = blok.partners03?.filename ? blok.partners03 : null;
  const image04 = blok.partners04?.filename ? blok.partners04 : null;

  return (
    <section className="py-5">
      <div className="container">
        <h2 className="fw-bold text-center mb-5">{blok.title}</h2>

        <div className="d-flex flex-wrap justify-content-center align-items-center">
          {/* <div className="partner-logo">
            {image01 && (
              <img
                src={`${image01.filename}`}
                alt={image01.alt || "Logo parceiro"}
                className="img-fluid"
                style={{ maxHeight: '100px' }}
                loading="lazy"
                title="ENTRELAÇOS"
              />
            )}
          </div> */}
          <div className="partner-logo">
            {image02 && (
              <img
                src={`${image02.filename}`}
                alt={image02.alt}
                className="img-fluid"
                style={{ maxHeight: '100px' }}
                title="REDE MULHERES"
                loading="lazy"
              />
            )}
          </div>
          <div className="partner-logo">
            {image03 && (
              <img
                src={`${image03.filename}`}
                alt={image03.alt}
                className="img-fluid"
                style={{ maxHeight: '100px' }}
                title="SITINHO"
                loading="lazy"
              />
            )}
          </div>
          <div className="partner-logo">
            {image04 && (
              <img
                src={`${image04.filename}`}
                alt={image04.alt}
                className="img-fluid"
                style={{ maxHeight: '100px' }}
                title="TECENDO"
                loading="lazy"
              />
            )}
          </div>
          {/* <div className="partner-logo">
            <h6 className="mb-0">Tech4Good</h6>
          </div> */}
        </div>

        <div className="text-center mt-5">
          <h5 className="fw-bold mb-3">{blok.subtitle}</h5>
          <p className="mb-4">
            {blok.description}
          </p>
          <button
            className="btn btn-primary btn-lg"
            onClick={handleClick}
          >
            <i className="bi bi-handshake"></i> {blok.button_section_partners}
          </button>
        </div>
      </div>
    </section>
  );
}
