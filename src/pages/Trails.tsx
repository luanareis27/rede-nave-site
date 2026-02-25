
import "../styles/trails.css"
import { StoryblokComponent, storyblokEditable, useStoryblok } from '@storyblok/react'

import Navbar from '../components/NavBar'
import Footer from '../components/Footer'
import LoadingSpinner from '../components/LoadingSpinner'

import ListTrails from '../components/Trails/ListTrails'



function Trails() {
  const story = useStoryblok("trails", {
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

      <ListTrails />
      <Footer />
    </>
  )
}

export default Trails
