import React from "react";
import { renderRichText } from "@storyblok/react";

type FAQProps = {
  blok: {
    title: string;
    title_topico01: string,
    description_topico01: any,
    title_topico02: string,
    description_topico02: any,
    title_topico03: string,
    description_topico03: any,
    title_topico04: string,
    description_topico04: any,
    title_topico05: string,
    description_topico05: any,
    title_topico06: string,
    description_topico06: any,
    title_topico07: string,
    description_topico07: any,
    title_topico08: string,
    description_topico08: any,

  };
};

export default function FAQ({ blok }: FAQProps) {
  return (
    <section className="py-5" id="faq">
      <div className="container">
        <h2 className="text-center mb-5 fw-bold">
          <i className="bi bi-question-circle"></i> {blok.title}
        </h2>

        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="accordion" id="accordionFAQ">

              {/* FAQ 1 */}
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button fw-bold"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#faq1"
                  >
                    {blok.title_topico01}
                  </button>
                </h2>
                <div
                  id="faq1"
                  className="accordion-collapse collapse show"
                  data-bs-parent="#accordionFAQ"
                >
                  <div className="accordion-body bg-accordion"
                    dangerouslySetInnerHTML={{
                      __html: renderRichText(blok.description_topico01),
                    }}
                  >
                  </div>
                </div>
              </div>

              {/* FAQ 2 */}
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button accordion-button-secondary collapsed fw-bold"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#faq2"
                  >
                    {blok.title_topico02}
                  </button>
                </h2>
                <div
                  id="faq2"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFAQ"
                >
                  <div className="accordion-body bg-accordion"
                    dangerouslySetInnerHTML={{
                      __html: renderRichText(blok.description_topico02),
                    }}>
                  </div>
                </div>
              </div>

              {/* FAQ 3 */}
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button accordion-button-secondary collapsed fw-bold"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#faq3"
                  >
                    {blok.title_topico03}
                  </button>
                </h2>
                <div
                  id="faq3"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFAQ"
                >
                  <div className="accordion-body bg-accordion"
                    dangerouslySetInnerHTML={{
                      __html: renderRichText(blok.description_topico03),
                    }}
                  >
                  </div>
                </div>
              </div>

              {/* FAQ 4 */}
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button accordion-button-secondary collapsed fw-bold"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#faq4"
                  >
                    {blok.title_topico04}
                  </button>
                </h2>
                <div
                  id="faq4"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFAQ"
                >
                  <div className="accordion-body bg-accordion"
                    dangerouslySetInnerHTML={{
                      __html: renderRichText(blok.description_topico04),
                    }}
                  >
                  </div>
                </div>
              </div>

              {/* FAQ 5 */}
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button accordion-button-secondary collapsed fw-bold"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#faq5"
                  >
                    {blok.title_topico05}
                  </button>
                </h2>
                <div
                  id="faq5"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFAQ"
                >
                  <div className="accordion-body bg-accordion"
                    dangerouslySetInnerHTML={{
                      __html: renderRichText(blok.description_topico05),
                    }}
                  >
                  </div>
                </div>
              </div>

              {/* FAQ 6 */}
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button accordion-button-secondary collapsed fw-bold"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#faq6"
                  >
                    {blok.title_topico06}
                  </button>
                </h2>
                <div
                  id="faq6"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFAQ"
                >
                  <div className="accordion-body bg-accordion"
                    dangerouslySetInnerHTML={{
                      __html: renderRichText(blok.description_topico06),
                    }}
                  >
                  </div>
                </div>
              </div>

              {/* FAQ 7 */}
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button accordion-button-secondary collapsed fw-bold"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#faq7"
                  >{blok.title_topico07}
                  </button>
                </h2>
                <div
                  id="faq7"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFAQ"
                >
                  <div className="accordion-body bg-accordion"
                    dangerouslySetInnerHTML={{
                      __html: renderRichText(blok.description_topico07),
                    }}
                  >
                  </div>
                </div>
              </div>

              {/* FAQ 8 */}
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button accordion-button-secondary collapsed fw-bold"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#faq8"
                  >
                    {blok.title_topico08}
                  </button>
                </h2>
                <div
                  id="faq8"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFAQ"
                >
                  <div className="accordion-body bg-accordion"
                    dangerouslySetInnerHTML={{
                      __html: renderRichText(blok.description_topico08),
                    }}
                  >
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}