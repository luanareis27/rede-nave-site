import {
  useStoryblok,
  StoryblokComponent,
  storyblokEditable,
} from "@storyblok/react";

import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Home() {

  const story = useStoryblok("home", {
    version: "draft",
  });

  if (!story || !story.content) {
    return <LoadingSpinner />;
  }

  const { body } = story.content;

  return (
    <>
      <Navbar />

      {/* Conteúdo gerenciado pelo CMS */}
      {body?.map((blok: any) => (
        <div key={blok._uid} {...storyblokEditable(blok)}>
          <StoryblokComponent blok={blok} />
        </div>
      ))}

      <Footer />
    </>
  );
}
