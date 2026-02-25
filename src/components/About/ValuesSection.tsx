
type ValuesSectionProps = {
  blok: {
    title01: string;
    description01: string;
    title02: string;
    description02: string;
    title03: string;
    description03: string;
  };
};


export default function ValuesSection({ blok }: ValuesSectionProps) {
  return (
    <section className="py-5">
      <div className="container">
        <div className="row g-4">

          <div className="col-md-4">
            <div className="value-card text-center">
              <div className="value-icon">
                <i className="bi bi-bullseye"></i>
              </div>
              <h4 className="fw-bold mb-3">{blok.title01}</h4>
              <p>
                {blok.description01}
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="value-card text-center">
              <div className="value-icon">
                <i className="bi bi-eye"></i>
              </div>
              <h4 className="fw-bold mb-3">{blok.title02}</h4>
              <p>
                {blok.description02}
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="value-card text-center">
              <div className="value-icon">
                <i className="bi bi-heart"></i>
              </div>
              <h4 className="fw-bold mb-3">{blok.title03}</h4>
              <p>
                {blok.description03}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
