import { CircularCarousel, type CarouselItem } from "@/components/ui/circular-carousel";

const items: CarouselItem[] = [
  {
    id: "1",
    title: "Anvar Karimov",
    tag: "Founder, Abu's Coffee",
    rating: 5,
    description:
      "He took a rough idea about a small coffee shop and turned it into a site people mention when they walk in. Fast, calm, and it actually looks like us.",
  },
  {
    id: "2",
    title: "Ekaterina Volkova",
    tag: "Marketing Lead, Moscow",
    rating: 4,
    description:
      "Good eye and quick hands. We went back and forth on the hero a few times, but the final build loads fast and the team can update it without me.",
  },
  {
    id: "3",
    title: "Michael Reeves",
    tag: "Startup CTO, Austin",
    rating: 4,
    description:
      "Clean components, sane state, no mystery dependencies. I inherited the codebase and understood it in an afternoon. Docs could have been thicker.",
  },
  {
    id: "4",
    title: "Daler Sharipov",
    tag: "Product Lead, Dushanbe",
    rating: 5,
    description:
      "Shipped the Gravity concept in days, not weeks. The motion work is restrained in a way that makes the product feel expensive.",
  },
  {
    id: "5",
    title: "Dmitry Sokolov",
    tag: "Agency Owner",
    rating: 3,
    description:
      "Solid work and honest about timelines. Our scope changed midway and a couple of deadlines slipped, but the delivered site does the job well.",
  },
  {
    id: "6",
    title: "Sarah Whitfield",
    tag: "Freelance Designer, NYC",
    rating: 4,
    description:
      "Nothing got lost between the mockup and the deploy. He pushes back when an idea will hurt the user, which is the part I value most.",
  },
  {
    id: "7",
    title: "Farrukh Nazarov",
    tag: "Small Business Owner",
    rating: 4,
    description:
      "I am not a technical person and he never made me feel stupid. Explained the choices, showed me the site on my phone, done in two weeks.",
  },
];

export function Feedback() {
  return (
    <section id="feedback" className="border-t border-border bg-background py-24 md:py-36">
      <div className="mx-auto w-full max-w-6xl px-6">
        <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground">FEEDBACK</p>
        <h2 className="mt-4 max-w-2xl font-display text-4xl leading-[0.95] uppercase tracking-tight text-foreground md:text-6xl">
          What people say
        </h2>
        <div className="mt-16">
          <CircularCarousel items={items} />
        </div>
      </div>
    </section>
  );
}
