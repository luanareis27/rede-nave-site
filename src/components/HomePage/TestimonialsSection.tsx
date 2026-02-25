import React from "react";


type StoryblokAsset = {
  filename: string;
  alt?: string;
};

type TestimonialsSectionProps = {
  blok: {
    title: string;
    description: string;
    user_depoimento01: string;
    user_asset01?: StoryblokAsset | string | null;
    user01: string;
    user_profi01: string;
    user_depoimento02: string;
    user_asset02?: StoryblokAsset | string | null;
    user02: string;
    user_profi02: string;
    user_depoimento03: string;
    user_asset03?: StoryblokAsset | string | null;
    user03: string;
    user_profi03: string;
  };
};

/* -------------------- HELPER -------------------- */

function resolveImage(
  asset?: StoryblokAsset | string | null
): StoryblokAsset | null {
  if (typeof asset === "object" && asset?.filename) {
    return asset;
  }
  return null;
}


export default function TestimonialsSection({
  blok,
}: TestimonialsSectionProps) {
  const image01 = resolveImage(blok.user_asset01);
  const image02 = resolveImage(blok.user_asset02);
  const image03 = resolveImage(blok.user_asset03);

  return (
    <section className="py-5">
      <div className="container">

        {/* TÍTULO */}
        <div className="text-center mb-5">
          <h2 className="fw-bold mb-3">{blok.title}</h2>
          <p>{blok.description}</p>
        </div>

        <div className="row g-4">

          {/* -------------------- Depoimento 1 -------------------- */}
          <div className="col-md-4">
            <div className="testimonial-card p-4 h-100">
              <div className="rating mb-3">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className="bi bi-star-fill text-warning"></i>
                ))}
              </div>

              <p className="mb-3">{blok.user_depoimento01}</p>

              <div className="d-flex align-items-center">
                <div
                  className="avatar rounded-circle me-3 overflow-hidden"
                  style={{ width: "48px", height: "48px", flexShrink: 0 }}
                >
                  {image01 ? (
                    <img
                      src={`${image01.filename}/m/96x96`}
                      alt={image01.alt || blok.user01}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      loading="lazy"
                    />
                  ) : (
                    <div className="bg-secondary text-white d-flex align-items-center justify-content-center h-100">
                      {blok.user01.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>

                <div>
                  <h6 className="mb-0 fw-bold">{blok.user01}</h6>
                  <small>{blok.user_profi01}</small>
                </div>
              </div>
            </div>
          </div>

          {/* -------------------- Depoimento 2 -------------------- */}
          <div className="col-md-4">
            <div className="testimonial-card p-4 h-100">
              <div className="rating mb-3">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className="bi bi-star-fill text-warning"></i>
                ))}
              </div>

              <p className="mb-3">{blok.user_depoimento02}</p>

              <div className="d-flex align-items-center">
                <div
                  className="avatar rounded-circle me-3 overflow-hidden"
                  style={{ width: "48px", height: "48px", flexShrink: 0 }}
                >
                  {image02 ? (
                    <img
                      src={`${image02.filename}/m/96x96`}
                      alt={image02.alt || blok.user02}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      loading="lazy"
                    />
                  ) : (
                    <div className="bg-secondary text-white d-flex align-items-center justify-content-center h-100">
                      {blok.user02.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>

                <div>
                  <h6 className="mb-0 fw-bold">{blok.user02}</h6>
                  <small>{blok.user_profi02}</small>
                </div>
              </div>
            </div>
          </div>

          {/* -------------------- Depoimento 3 -------------------- */}
          <div className="col-md-4">
            <div className="testimonial-card p-4 h-100">
              <div className="rating mb-3">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className="bi bi-star-fill text-warning"></i>
                ))}
              </div>

              <p className="mb-3">{blok.user_depoimento03}</p>

              <div className="d-flex align-items-center">
                <div
                  className="avatar rounded-circle me-3 overflow-hidden"
                  style={{ width: "48px", height: "48px", flexShrink: 0 }}
                >
                  {image03 ? (
                    <img
                      src={`${image03.filename}/m/96x96`}
                      alt={image03.alt || blok.user03}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      loading="lazy"
                    />
                  ) : (
                    <div className="bg-secondary text-white d-flex align-items-center justify-content-center h-100">
                      {blok.user03.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>

                <div>
                  <h6 className="mb-0 fw-bold">{blok.user03}</h6>
                  <small>{blok.user_profi03}</small>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
