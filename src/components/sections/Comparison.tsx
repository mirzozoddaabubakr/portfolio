import { motion } from "framer-motion";
import { Check, X, ShieldCheck } from "lucide-react";

const comparisonRows = [
  {
    positive: {
      title: "Skilled Professional",
      desc: "Gain access to top-tier talent with years of experience, ensuring flawless execution",
    },
    negative: {
      title: "Amateur Designer",
      desc: "Lack of experience may result in design inconsistencies and overlooked details",
    },
  },
  {
    positive: {
      title: "Future-Ready Designs",
      desc: "Crafting modern, scalable designs that grow with your business and stay ahead of trends.",
    },
    negative: {
      title: "Outdated Concepts",
      desc: "Stale designs that don’t reflect current trends or your evolving brand narrative.",
    },
  },
  {
    positive: {
      title: "Client-Centric Collaboration",
      desc: "Your vision leads the way — I work closely with you to bring ideas to life with precision and creativity.",
    },
    negative: {
      title: "Detached Communication",
      desc: "Lack of collaboration and poor feedback loops can result in misaligned outcomes.",
    },
  },
  {
    positive: {
      title: "Timely Project Tracking",
      desc: "Stay informed with regular progress updates and timely deliverables",
    },
    negative: {
      title: "Unstructured & Unreliable Work",
      desc: "Inconsistent timelines and last-minute changes can compromise quality",
    },
  },
];

export function Comparison() {
  return (
    <section
      id="comparison"
      className="relative overflow-hidden border-t border-border bg-background py-24 md:py-36"
    >
      {/* Background glow motion */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.03, 0.07, 0.03],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -bottom-40 right-10 h-[500px] w-[500px] rounded-full bg-accent/20 blur-[130px]"
      />

      <div className="mx-auto w-full max-w-6xl px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground backdrop-blur">
              <ShieldCheck className="h-3 w-3 text-accent" />
              <span>Why Choose Me</span>
            </div>
            <h2 className="mt-4 font-display text-4xl leading-[0.9] uppercase tracking-tight text-foreground sm:text-5xl md:text-7xl">
              Elevate Your
              <br />
              <span className="text-muted-foreground">Standard</span>
            </h2>
          </div>
          <p className="max-w-md font-mono text-xs leading-relaxed tracking-[0.15em] text-muted-foreground uppercase">
            A clear comparison of working with dedicated high-end design craftsmanship versus
            ordinary alternatives.
          </p>
        </motion.div>

        {/* Comparison Grid */}
        <div className="mt-16 space-y-4">
          {comparisonRows.map((row, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.1 }}
              className="grid gap-4 md:grid-cols-2"
            >
              {/* Positive Card (With me) */}
              <motion.div
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group relative overflow-hidden rounded-2xl border border-border/80 bg-card/50 p-6 md:p-8 backdrop-blur transition-all duration-300 hover:border-foreground/40 hover:bg-card hover:shadow-xl hover:shadow-accent/5"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-foreground/10 text-foreground transition-all duration-300 group-hover:scale-110 group-hover:bg-foreground group-hover:text-background">
                    <Check className="h-4 w-4 stroke-[2.5]" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl uppercase tracking-tight text-foreground sm:text-3xl transition-colors group-hover:text-accent">
                      {row.positive.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                      {row.positive.desc}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Negative Card (Amateur / Other) */}
              <motion.div
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
                className="group relative overflow-hidden rounded-2xl border border-border/40 bg-card/20 p-6 md:p-8 backdrop-blur transition-all duration-300 hover:border-border hover:bg-card/30"
              >
                <div className="flex items-start gap-4 opacity-75 group-hover:opacity-100 transition-opacity">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border/60 bg-muted/40 text-muted-foreground transition-all duration-300 group-hover:scale-105">
                    <X className="h-4 w-4 stroke-[2.5]" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl uppercase tracking-tight text-foreground/80 sm:text-3xl">
                      {row.negative.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground/80">
                      {row.negative.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Comparison;
