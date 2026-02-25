
import {
  useStoryblok,
  StoryblokComponent,
  storyblokEditable,
} from "@storyblok/react";

import "../index.css"
import "../styles/support.css"

import Navbar from '../components/NavBar'
import Footer from '../components/Footer'
import Chatbot from '../components/Chatbot/Chatbot'
import LoadingSpinner from '../components/LoadingSpinner';




function Support() {

  const story = useStoryblok("support", {
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

      <Chatbot />
      <Footer />
    </>
  )
}

export default Support