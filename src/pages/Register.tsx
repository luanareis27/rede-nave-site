
import {
  useStoryblok,
  StoryblokComponent,
  storyblokEditable,
} from "@storyblok/react";

import '../index.css'
import '../styles/register.css'

import CadUser from '../components/Register/CadUser'
import LoadingSpinner from '../components/LoadingSpinner';


function Register() {

  const story = useStoryblok("register", {
    version: "draft",
  });

  if (!story || !story.content) {
    return <LoadingSpinner />;
  }

  const { body } = story.content;
  return (
    <>
      {/* Conteúdo gerenciado pelo CMS */}
      {body?.map((blok: any) => (
        <div key={blok._uid} {...storyblokEditable(blok)}>
          <StoryblokComponent blok={blok} />
        </div>
      ))}
    </>
  )
}

export default Register
