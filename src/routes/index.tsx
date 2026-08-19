import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";
import { TextMorph } from "@/components/ui/text-morph";
import { Designs } from "@/components/sections/Designs";
import { Process } from "@/components/sections/Process";
import { Comparison } from "@/components/sections/Comparison";
import { Skills } from "@/components/sections/Skills";
import { About } from "@/components/sections/About";
import { Feedback } from "@/components/sections/Feedback";
import { Contact } from "@/components/sections/Contact";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { ParallaxComponent } from "@/components/ui/parallax-scrolling";
import portraitImg from "@/assets/portrait.png";
import deskImg from "@/assets/desk.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Abubakr Mirzozoda — Web Designer & Developer" },
      {
        name: "description",
        content:
          "I'm a versatile designer specializing in UI/UX, web, and product design to help grow your business. Let's build something great!",
      },
      { property: "og:title", content: "Abubakr Mirzozoda — Web Designer & Developer" },
      {
        property: "og:description",
        content:
          "I'm a versatile designer specializing in UI/UX, web, and product design to help grow your business. Let's build something great!",
      },
    ],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    window.scrollTo(0, 0);
    window.dispatchEvent(new Event("resetSection"));
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <SiteNav />
      <ScrollExpandMedia
        mediaType="image"
        mediaSrc={portraitImg}
        bgImageSrc={deskImg}
        title="Abubakr Mirzozoda"
        date="Welcome"
        scrollToExpand="Scroll to step inside"
        textBlend
      >
        <div className="mx-auto max-w-4xl text-center">
          <p className="flex flex-wrap items-center justify-center gap-3 text-center font-display text-3xl uppercase tracking-tight text-foreground sm:text-5xl">
            <span>I am a</span>
            <TextMorph
              words={["designer", "developer", "builder", "creator"]}
              interval={2500}
              className="text-accent"
            />
          </p>
          <p className="mt-6 max-w-2xl mx-auto font-mono text-xs sm:text-sm tracking-wide text-muted-foreground leading-relaxed">
            I'm a versatile designer specializing in UI/UX, web, and product design to help grow
            your business. Let's build something great!
          </p>
        </div>
      </ScrollExpandMedia>

      <Designs />
      <Process />
      <Comparison />
      <Skills />
      <About />
      <Feedback />
      <Contact />
      <ParallaxComponent />
      <SiteFooter />
    </main>
  );
}
