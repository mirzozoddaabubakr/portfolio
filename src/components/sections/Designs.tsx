import { CoverflowCarousel, type CoverflowSlide } from "@/components/ui/coverflow-carousel";
import coffeeImg from "@/assets/coffee.png";
import gravityImg from "@/assets/gravity.png";

const slides: CoverflowSlide[] = [
  {
    src: coffeeImg,
    alt: "Abu's Coffee project preview",
    title: "Abu's Coffee",
    subtitle: "Coffee Shop Experience",
    href: "https://abuscoffee.vercel.app",
    meta: [
      { label: "Category", value: "Coffee Shop" },
      { label: "Design Style", value: "Warm Paper & Editorial" },
      { label: "Live Demo", value: "abuscoffee.vercel.app" },
    ],
  },
  {
    src: gravityImg,
    alt: "Nike Gravity sneaker drop preview",
    title: "Nike Gravity",
    subtitle: "Sneaker Drop Experience",
    href: "https://nikegravity.vercel.app",
    meta: [
      { label: "Category", value: "Sneakers" },
      { label: "Design Style", value: "Heavy Type & Acid Accent" },
      { label: "Live Demo", value: "nikegravity.vercel.app" },
    ],
  },
];

export function Designs() {
  return (
    <section
      id="designs"
      className="relative border-t border-border bg-background py-24 md:py-36 overflow-hidden"
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        <header className="mb-10 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <h2 className="font-display text-6xl leading-[0.85] uppercase tracking-tight text-foreground md:text-8xl">
            ABUW
            <br />
            <span className="text-muted-foreground">Designs</span>
          </h2>
          <p className="max-w-sm font-mono text-xs leading-relaxed tracking-[0.2em] text-muted-foreground uppercase">
            Drag to explore — two signature sites, designed and built front to back.
          </p>
        </header>

        <CoverflowCarousel
          slides={slides}
          showCaption={true}
          showNavigation={true}
          showPagination={true}
          cardWidth="clamp(280px, 35vw, 420px)"
          rotate={36}
          depth={0.5}
          gap={0.08}
        />
      </div>
    </section>
  );
}

export default Designs;
