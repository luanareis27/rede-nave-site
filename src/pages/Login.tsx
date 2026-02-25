
import {
  useStoryblok,
  StoryblokComponent,
  storyblokEditable,
} from "@storyblok/react";

import "../styles/login.css"
import "../index.css"
import LoginUser from "../components/Login/LoginUser";
import LoadingSpinner from "../components/LoadingSpinner";

function Login() {
  const story = useStoryblok("login", {
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
  );
}

export default Login;
