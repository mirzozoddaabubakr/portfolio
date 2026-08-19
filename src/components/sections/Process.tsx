import { motion } from "framer-motion";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

const steps = [
  {
    step: "Step 1",
    num: "01",
    title: "Let's Get In Touch",
    desc: "Start by reaching out through our contact page. Fill out the form or book a call to discuss your project, goals, and ideas.",
  },
  {
    step: "Step 2",
    num: "02",
    title: "Grab Your Designs",
    desc: "Tell me your unique vision, and I’ll create stunning, functional designs that perfectly align with your goals.",
  },
  {
    step: "Step 3",
    num: "03",
    title: "Kickstart Development",
    desc: "I expertly transform your designs into a powerful, scalable solution, fully ready to launch.",
  },
  {
    step: "Step 4",
    num: "04",
    title: "And Hand Over",
    desc: "Receive a fully tested, polished, and high-quality product tailored to your needs with ongoing support.",
  },
];

const experiences = [
  {
    role: "Digital & Web Designer",
    company: "VistaWorks",
    year: "2024",
    tag: "Brand & Web Systems",
  },
  {
    role: "Product Designer",
    company: "PixelCraft Studios",
    year: "2023",
    tag: "Design Systems",
  },
  {
    role: "UX/UI Designer",
    company: "UrbanFit Studio",
    year: "2022",
    tag: "Mobile & Web",
  },
  {
    role: "Freelance Designer",
    company: "GreenLeaf Co",
    year: "2021",
    tag: "Identity & Web",
  },
];

export function Process() {
  return (
    <section
      id="process"
      className="relative overflow-hidden border-t border-border bg-background py-24 md:py-36"
    >
      {/* Background glow motion */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.03, 0.08, 0.03],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-accent/20 blur-[120px]"
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
              <Sparkles className="h-3 w-3 text-accent" />
              <span>Workflow</span>
            </div>
            <h2 className="mt-4 font-display text-4xl leading-[0.9] uppercase tracking-tight text-foreground sm:text-5xl md:text-7xl">
              Process Is
              <br />
              <span className="text-muted-foreground">Everything</span>
            </h2>
          </div>
          <p className="max-w-md font-mono text-xs leading-relaxed tracking-[0.15em] text-muted-foreground uppercase">
            Simple, streamlined process is what gets you results. From concept to launch with no
            friction.
          </p>
        </motion.div>

        {/* 4 Step Cards Grid with Framer Motion */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((item, idx) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              whileHover={{ y: -8, transition: { duration: 0.25 } }}
              className="group relative flex flex-col justify-between rounded-2xl border border-border bg-card/40 p-6 backdrop-blur transition-all duration-300 hover:border-accent/50 hover:bg-card hover:shadow-2xl hover:shadow-accent/10"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center rounded-full border border-border bg-background/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground transition-colors group-hover:border-accent/40 group-hover:text-accent">
                    {item.step}
                  </span>
                  <span className="font-mono text-2xl font-semibold text-muted-foreground/30 transition-all duration-300 group-hover:scale-110 group-hover:text-accent">
                    {item.num}
                  </span>
                </div>

                <h3 className="mt-8 font-display text-2xl uppercase tracking-tight text-foreground transition-colors group-hover:text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{item.desc}</p>
              </div>

              <div className="mt-8 flex items-center gap-2 pt-4 border-t border-border/40 font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 transition-colors group-hover:text-accent">
                <span>Phase {item.num}</span>
                <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1.5" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Experience Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-24 rounded-3xl border border-border bg-card/20 p-8 md:p-12 backdrop-blur relative overflow-hidden"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-8 border-b border-border">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                History & Milestones
              </p>
              <h3 className="mt-2 font-display text-3xl uppercase tracking-tight text-foreground md:text-4xl">
                Experience & Journey
              </h3>
            </div>
            <p className="text-xs text-muted-foreground max-w-xs font-mono uppercase tracking-wider">
              Proven track record across leading digital studios and freelance projects.
            </p>
          </div>

          <div className="mt-8 divide-y divide-border">
            {experiences.map((exp, idx) => (
              <motion.div
                key={exp.year + exp.company}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ x: 6, transition: { duration: 0.2 } }}
                className="group flex flex-col md:flex-row md:items-center justify-between py-6 transition-colors hover:bg-card/60 px-4 rounded-xl -mx-4 cursor-default"
              >
                <div className="flex items-center gap-6">
                  <span className="font-mono text-sm font-bold text-accent tracking-widest">
                    {exp.year}
                  </span>
                  <div>
                    <h4 className="font-display text-xl uppercase tracking-tight text-foreground transition-colors group-hover:text-accent">
                      {exp.role}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-0.5">{exp.company}</p>
                  </div>
                </div>

                <div className="mt-3 md:mt-0 flex items-center gap-3">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground bg-background/80 px-3 py-1 rounded-full border border-border transition-colors group-hover:border-accent/40">
                    {exp.tag}
                  </span>
                  <CheckCircle2 className="h-4 w-4 text-accent hidden md:block opacity-40 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Process;
