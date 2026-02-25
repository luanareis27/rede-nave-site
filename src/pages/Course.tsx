import CourseDetail from "../components/Courses/CourseDetail";
import Navbar from "../components/NavBar";

function Course() {
  // const story = useStoryblok("about", {
  //   version: "draft",
  // });

  // if (!story || !story.content) {
  //   return <LoadingSpinner />;
  // }

  // const { body } = story.content;

  return (
    <>
      <Navbar />
      <CourseDetail />
    </>
  );
}

export default Course;