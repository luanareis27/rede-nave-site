import React from "react";


type StoryblokAsset = {
  filename: string;
  alt?: string;
};

type AboutSectionProps = {
  blok: {
    abouthome?: StoryblokAsset | string | null;
    title: string;
    description: string;
    title_featureList01: string;
    description_feature01: string;
    title_featureList02: string;
    description_feature02: string;
    title_featureList03: string;
    description_feature03: string;
  };
};

export default function AboutSection({ blok }: AboutSectionProps) {

  const image =
    typeof blok.abouthome === "object" && blok.abouthome?.filename
      ? blok.abouthome
      : null;

  return (
    <section id="sobre" className="py-5">
      <div className="container">
        <div className="row align-items-center">

          {/* IMAGEM */}
          <div className="col-lg-6 mb-4 mb-lg-0">
            {image && (
              <img
                src={`${image.filename}/m/800x0`}
                alt={image.alt || "Sobre a Rede NAVE"}
                className="img-fluid rounded"
                loading="lazy"
              />
            )}
          </div>


          {/* TEXTO */}
          <div className="col-lg-6">
            <h2 className="fw-bold mb-4 text-center text-md-start">
              {blok.title}
            </h2>
            <p className="mb-3 text-center text-md-start">
              {blok.description}
            </p>

            {/* LISTA DE FEATURES */}
            <div className="feature-list">

              <div className="d-flex mb-3">
                <div className="icon-box rounded me-3 bgbutton">
                  <i className="bi bi-check-lg coloricon"></i>
                </div>
                <div>
                  <h5 className="mb-1 ">{blok.title_featureList01}</h5>
                  <p className="mb-0">
                    {blok.description_feature01}
                  </p>
                </div>
              </div>

              <div className="d-flex mb-3">
                <div className="icon-box rounded me-3 bgbutton">
                  <i className="bi bi-check-lg coloricon"></i>
                </div>
                <div>
                  <h5 className="mb-1">{blok.title_featureList02}</h5>
                  <p className="mb-0">
                    {blok.description_feature02}
                  </p>
                </div>
              </div>

              <div className="d-flex">
                <div className="icon-box rounded me-3 bgbutton">
                  <i className="bi bi-check-lg coloricon"></i>
                </div>
                <div>
                  <h5 className="mb-1">{blok.title_featureList03}</h5>
                  <p className="mb-0">
                    {blok.description_feature03}
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
