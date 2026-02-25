import { Link } from "react-router-dom";
import "/src/styles/home.css";

import { storyblokEditable } from "@storyblok/react";


type StoryblokAsset = {
  filename: string;
  alt?: string;
};

type HomeHeroProps = {
  blok: {
    title: string;
    description: string;
    primary_button_text: string;
    secondary_button_text: string;
    image?: StoryblokAsset | null;
  };
};


export default function HomeHero({ blok }: HomeHeroProps) {
  const image =
    typeof blok.image === "object" && blok.image?.filename
      ? blok.image
      : null;

  return (
    <section
      {...storyblokEditable(blok)}
      className="hero-section text-white text-center py-5"
    >
      <div className="container py-5">
        <div className="row align-items-center">

          {/* Texto */}
          <div className="col-lg-6 text-lg-start">
            <h1 className="display-4 fw-bold mb-4 animate-fade-in">
              {blok.title}
            </h1>

            <p className="lead mb-4">
              {blok.description}
            </p>

            <div className="d-grid d-sm-flex gap-2 justify-content-lg-start justify-content-center">
              <Link to={"/cadastro"} className="btn btn-lg px-4">
                <i className="bi bi-person-plus"></i>{" "}
                {blok.primary_button_text}
              </Link>

              <a href="#sobre" className="btn btn-outline-light btn-lg px-4">
                <i className="bi bi-info-circle"></i>{" "}
                {blok.secondary_button_text}
              </a>
            </div>

          </div>

          {/* Imagem */}
          <div className="col-lg-6 mt-4 mt-lg-0 text-center">
            {image && (
              <img
                src={`${image.filename}/m/800x0`}
                alt={image.alt || "Mulheres empreendedoras"}
                className="img-fluid"
                style={{ maxWidth: "70%", height: "auto" }}
                loading="lazy"
              />
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
