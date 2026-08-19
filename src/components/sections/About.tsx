import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";

const stats = [
  { value: "4+", label: "Years Experience" },
  { value: "Full", label: "Stack & UI Design" },
  { value: "100%", label: "Bespoke Digital Works" },
];

const principles = [
  {
    no: "01",
    title: "Creative Design",
    body: "Every project starts on a blank canvas with precision aesthetics, typography, weight, and layout tailored specifically to your brand.",
  },
  {
    no: "02",
    title: "Seamless Tech",
    body: "Transforming ambitious ideas into clean, fast, and scalable web solutions using modern frontend frameworks and robust backends.",
  },
  {
    no: "03",
    title: "End-to-End Delivery",
    body: "From wireframes to final production launch with relentless attention to speed, motion, and pixel perfection.",
  },
];

export function About() {
  return (
    <section id="about" className="relative border-t border-border bg-background py-24 md:py-36">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="grid gap-14 md:grid-cols-12 md:gap-16">
          {/* Left Column Sticky Bio */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-5"
          >
            <div className="md:sticky md:top-28">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground backdrop-blur">
                <Sparkles className="h-3 w-3 text-accent" />
                <span>ABOUT</span>
              </div>

              <h2 className="mt-5 font-display text-4xl leading-[0.85] uppercase tracking-tight text-foreground sm:text-5xl md:text-7xl">
                Abubakr Mirzozoda,
                <br />
                <span className="text-muted-foreground">Your Designer</span>
              </h2>

              <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                Brief initial presentation of myself and my previous experiences.
              </p>

              <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground md:text-base">
                I'm Abubakr Mirzozoda, a dedicated Web Designer &amp; Developer. I specialize in
                creative design with seamless technical execution to craft exceptional digital
                experiences.
              </p>

              <a
                href="#feedback"
                className="group mt-8 inline-flex items-center gap-2 border-b border-foreground/30 pb-1 text-sm uppercase tracking-[0.2em] text-foreground transition-colors hover:border-foreground"
              >
                What people say
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </motion.div>

          {/* Right Column Principles & Stats */}
          <div className="md:col-span-7">
            <ul className="border-t border-border">
              {principles.map((p, idx) => (
                <motion.li
                  key={p.no}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group grid grid-cols-[auto_1fr] gap-6 border-b border-border py-8 transition-colors hover:bg-card md:gap-10 md:py-10"
                >
                  <span className="font-mono text-xs tracking-[0.3em] text-muted-foreground transition-colors group-hover:text-accent">
                    {p.no}
                  </span>
                  <div>
                    <h3 className="font-display text-3xl uppercase tracking-tight text-foreground transition-colors group-hover:text-accent md:text-4xl">
                      {p.title}
                    </h3>
                    <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground md:text-base">
                      {p.body}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>

            <dl className="mt-12 grid grid-cols-3 gap-2.5 sm:gap-4">
              {stats.map((s, idx) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="rounded-xl border border-border bg-card p-3.5 sm:p-5 transition-all hover:border-accent/40 hover:shadow-lg"
                >
                  <dt className="font-display text-2xl uppercase tracking-tight text-foreground sm:text-3xl md:text-4xl">
                    {s.value}
                  </dt>
                  <dd className="mt-1.5 font-mono text-[9px] sm:text-[10px] uppercase leading-relaxed tracking-[0.15em] sm:tracking-[0.2em] text-muted-foreground">
                    {s.label}
                  </dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
