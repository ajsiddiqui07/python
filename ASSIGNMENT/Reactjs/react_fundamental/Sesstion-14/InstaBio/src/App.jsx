import ProfileCard from "./components/ProfileCard";
import SocialLinks from "./components/SocialLinks";
import ProjectCard from "./components/ProjectCard";
import "./App.css";

function App() {
  const socialLinks = [
    {
      name: "Instagram",
      url: "https://www.instagram.com/",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/",
    },
    {
      name: "GitHub",
      url: "https://github.com/",
    },
  ];

  return (
    <main className="app">
      <h1>InstaBio</h1>

      <ProfileCard
        name="Arbaz Siddiqui"
        imageUrl="https://placehold.co/150x150"
        bio="React learner | Aspiring Web Developer"
      />

      <SocialLinks links={socialLinks} theme="light" />

      <section className="projects">
        <h2>My Projects</h2>

        <ProjectCard
          title="InstaBio"
          description="A reusable React profile card application."
          imageUrl="https://placehold.co/300x160"
          projectUrl="https://github.com/"
        />
      </section>
    </main>
  );
}

export default App;