
type StoryblokAsset = {
  filename: string;
  alt?: string;
};


type OurTeamProps = {
  blok: {
    title: string;
    perfil_image01?: StoryblokAsset | null;
    user01: string,
    cargo01: string,
    description01: string,
    perfil_image02?: StoryblokAsset | null;
    user02: string,
    cargo02: string,
    description02: string,
    perfil_image03?: StoryblokAsset | null;
    user03: string,
    cargo03: string,
    description03: string,
  };
};


export default function OurTeam({ blok }: OurTeamProps) {
  const image01 = blok.perfil_image01?.filename ? blok.perfil_image01 : null;
  const image02 = blok.perfil_image02?.filename ? blok.perfil_image02 : null;
  const image03 = blok.perfil_image03?.filename ? blok.perfil_image03 : null;



  return (
    <section className="py-5">
      <div className="container">
        <h2 className="fw-bold text-center mb-5">{blok.title}</h2>

        <div className="row g-4">

          {/* membro 1 */}
          <div className="col-md-4">
            <div className="team-member">
              <div className="team-photo">
                {image01 && (
                  <img
                    src={`${image01.filename}/m/300x300`}
                    alt={image01.alt || blok.user01}
                    className="rounded-circle img-fluid"
                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                  />
                )}
              </div>

              <h5 className="fw-bold mb-1">{blok.user01}</h5>
              <p className="mb-3">{blok.cargo01}</p>

              <p className="small">
                {blok.description01}
              </p>

              <div className="social-links">
                <a href="#" className="icon-bg me-2">
                  <i className="bi bi-linkedin fs-5"></i>
                </a>
                <a href="#" className="icon-bg">
                  <i className="bi bi-envelope fs-5"></i>
                </a>
              </div>
            </div>
          </div>

          {/* membro 2 */}
          <div className="col-md-4">
            <div className="team-member">
              <div className="team-photo">
                {image02 && (
                  <img
                    src={`${image02.filename}/m/300x300`}
                    alt={image02.alt || blok.user02}
                    className="rounded-circle img-fluid"
                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                  />
                )}
              </div>

              <h5 className="fw-bold mb-1">{blok.user02}</h5>
              <p className="mb-3">{blok.cargo02}</p>

              <p className="small">
                {blok.description02}
              </p>

              <div className="social-links">
                <a href="#" className="icon-bg me-2">
                  <i className="bi bi-linkedin fs-5"></i>
                </a>
                <a href="#" className="icon-bg">
                  <i className="bi bi-envelope fs-5"></i>
                </a>
              </div>
            </div>
          </div>

          {/* membro 3 */}
          <div className="col-md-4">
            <div className="team-member">
              <div className="team-photo">
                {image03 && (
                  <img
                    src={`${image03.filename}/m/300x300`}
                    alt={image03.alt || blok.user03}
                    className="rounded-circle img-fluid"
                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                  />
                )}
              </div>

              <h5 className="fw-bold mb-1">{blok.user03}</h5>
              <p className="mb-3">{blok.cargo03}</p>

              <p className="small">
                {blok.description03}
              </p>

              <div className="social-links">
                <a href="#" className="icon-bg me-2">
                  <i className="bi bi-linkedin fs-5"></i>
                </a>
                <a href="#" className="icon-bg">
                  <i className="bi bi-envelope fs-5"></i>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
