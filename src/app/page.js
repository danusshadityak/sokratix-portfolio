import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import UXProcess from "@/components/UXProcess";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import UXPrinciples from "@/components/UXPrinciples";
import CaseStudies from "@/components/CaseStudies";
import UXThinking from "@/components/UXThinking";
import Metrics from "@/components/Metrics";
import Contact from "@/components/Contact";
import { getContent } from "@/lib/content";

// Revalidate periodically so admin edits show up without a redeploy.
export const revalidate = 30;

export default async function Home() {
  const { projects, caseStudies, introVideo, introPoster } = await getContent();

  return (
    <main className="relative">
      <Navbar />
      <Hero videoSrc={introVideo} videoPoster={introPoster} />
      <About />
      <UXProcess />
      <Projects projects={projects} />
      <Skills />
      <UXPrinciples />
      <CaseStudies caseStudies={caseStudies} />
      <UXThinking />
      <Metrics />
      <Contact />
    </main>
  );
}
