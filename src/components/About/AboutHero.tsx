import React from "react";
import { renderRichText } from "@storyblok/react";

type StoryblokAsset = {
  filename: string;
  alt?: string;
};

type AboutHeroProps = {
  blok: {
    title: string;
    subtitle: string;
    description: any;
    aboutImage?: StoryblokAsset | null;
  };
};

export default function AboutHero({ blok }: AboutHeroProps) {
  const image = blok.aboutImage?.filename ? blok.aboutImage : null;

  return (
    <section className="hero-section text-white py-5">
      <div className="container py-5">
        <div className="row align-items-center">

          {/* TEXTO */}
          <div className="col-lg-6 text-start">
            <h1 className="display-3 fw-bold text-center text-md-start mb-4">{blok.title}</h1>
            <p className="lead text-center text-md-start mb-4">{blok.subtitle}</p>

            <div
              className="text-center text-md-start fs-5"
              dangerouslySetInnerHTML={{
                __html: renderRichText(blok.description),
              }}
            />
          </div>

          {/* IMAGEM */}
          <div className="col-lg-6 d-flex justify-content-center mt-4 mt-lg-0">
            {image && (
              <img
                src={`${image.filename}/m/800x0`}
                alt={image.alt || "Ilustração mulheres empreendedoras"}
                className="img-fluid hero-image"
                style={{ maxWidth: "75%", height: "auto" }}
              />
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
