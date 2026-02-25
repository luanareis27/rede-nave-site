
type TrajectorySectionProps = {
  blok: {
    title: string;
    card_date01: string,
    card_title01: string,
    card_description01: string,
    card_date02: string,
    card_title02: string,
    card_description02: string,
    card_date03: string,
    card_title03: string,
    card_description03: string,
    card_date04: string,
    card_title04: string,
    card_description04: string,
    card_date05: string,
    card_title05: string,
    card_description05: string,
  };
};

export default function TrajectorySection({ blok }: TrajectorySectionProps) {
  return (
    <section className="py-5">
      <div className="container">
        <h2 className="fw-bold text-center mb-5">{blok.title}</h2>

        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-content">
              <span className="badge bg-color mb-2">{blok.card_date01}</span>
              <h5 className="fw-bold">{blok.card_title01}</h5>
              <p className="mb-0">
                {blok.card_description01}
              </p>
            </div>
            <div className="timeline-icon">
              <i className="bi bi-building"></i>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-content">
              <span className="badge bg-color mb-2">{blok.card_date02}</span>
              <h5 className="fw-bold">{blok.card_title02}</h5>
              <p className="mb-0">
                {blok.card_description02}
              </p>
            </div>
            <div className="timeline-icon">
              <i className="bi bi-graph-up-arrow"></i>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-content">
              <span className="badge bg-color mb-2">{blok.card_date03}</span>
              <h5 className="fw-bold">
                {blok.card_title03}
              </h5>
              <p className="mb-0">
                {blok.card_description03}
              </p>
            </div>
            <div className="timeline-icon">
              <i className="bi bi-people-fill"></i>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-content">
              <span className="badge bg-color mb-2">{blok.card_date04}</span>
              <h5 className="fw-bold">
                {blok.card_title04}
              </h5>
              <p className="mb-0">
                {blok.card_description04}
              </p>
            </div>
            <div className="timeline-icon">
              <i className="bi bi-bank"></i>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-content">
              <span className="badge bg-color mb-2">{blok.card_date05}</span>
              <h5 className="fw-bold">{blok.card_title05}</h5>
              <p className="mb-0">
                {blok.card_description05}
              </p>
            </div>
            <div className="timeline-icon">
              <i className="bi bi-rocket-takeoff"></i>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
