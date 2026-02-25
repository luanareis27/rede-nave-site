

import '../index.css'
import '../styles/events.css'

import {
  useStoryblok,
  StoryblokComponent,
  storyblokEditable,
} from "@storyblok/react";

import Navbar from '../components/NavBar'
import Footer from '../components/Footer'
import LoadingSpinner from '../components/LoadingSpinner';


function Events() {

  const story = useStoryblok("events", {
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
  )
}

export default Events
