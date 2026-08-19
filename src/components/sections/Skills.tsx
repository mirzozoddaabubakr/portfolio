"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Palette,
  Database,
  Sparkles,
  Layers,
  Terminal,
  Zap,
  Cpu,
  Boxes,
  Workflow,
} from "lucide-react";
import OrbitingCirclesGlobe from "@/components/ui/orbiting-circles-02";

interface SkillItem {
  name: string;
  level: string;
  tag: string;
  iconName?: string;
  description: string;
}

interface SkillCategory {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  skills: SkillItem[];
}

const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    label: "Frontend & UI",
    icon: Palette,
    description: "Crafting fluid, pixel-perfect interfaces with high-end micro-interactions.",
    skills: [
      {
        name: "React 19 / Next.js",
        level: "95%",
        tag: "Core",
        description: "Modern React architecture, Server Components & suspense",
      },
      {
        name: "TypeScript",
        level: "92%",
        tag: "Language",
        description: "Strictly typed scalable design systems and fullstack apps",
      },
      {
        name: "Tailwind CSS v4",
        level: "98%",
        tag: "Styling",
        description: "Design tokens, fluid typography & utility architecture",
      },
      {
        name: "Motion & GSAP",
        level: "90%",
        tag: "Animation",
        description: "60fps physics-based animations, timeline control & scroll triggers",
      },
      {
        name: "TanStack Ecosystem",
        level: "88%",
        tag: "State/Router",
        description: "TanStack Start, Router, Table & Query data caching",
      },
    ],
  },
  {
    id: "backend",
    label: "Backend & Systems",
    icon: Database,
    description: "Robust data flow, resilient APIs, and lightning-fast edge computing.",
    skills: [
      {
        name: "Node.js / Express",
        level: "90%",
        tag: "Runtime",
        description: "Event-driven microservices and high-throughput REST APIs",
      },
      {
        name: "Supabase & Postgres",
        level: "88%",
        tag: "Database",
        description: "Relational modeling, RLS policies & real-time sockets",
      },
      {
        name: "Python / FastAPI",
        level: "82%",
        tag: "Services",
        description: "Async endpoints, AI integration pipelines & data scraping",
      },
      {
        name: "REST & GraphQL",
        level: "92%",
        tag: "API",
        description: "Contract-first schemas, type generation & low-latency queries",
      },
      {
        name: "Serverless & Edge",
        level: "85%",
        tag: "Cloud",
        description: "Vercel Edge Functions, Cloudflare Workers & SSR hydration",
      },
    ],
  },
  {
    id: "design",
    label: "Design & Product",
    icon: Sparkles,
    description: "Holistic product vision from low-fidelity wireframe to design token systems.",
    skills: [
      {
        name: "Figma UI/UX",
        level: "95%",
        tag: "Design Tool",
        description: "Design systems, auto-layout variants, interactive prototyping",
      },
      {
        name: "Design Systems",
        level: "94%",
        tag: "Architecture",
        description: "Radix UI primitives, shadcn architecture & atomic tokens",
      },
      {
        name: "Creative Direction",
        level: "90%",
        tag: "Aesthetics",
        description: "Editorial typography, color theory & bespoke brand identities",
      },
      {
        name: "Responsive Layouts",
        level: "98%",
        tag: "UX",
        description: "Fluid scaling, clamp math & flawless multi-device adaptation",
      },
      {
        name: "Rapid Prototyping",
        level: "92%",
        tag: "Process",
        description: "From initial napkin idea to testable clickable prototypes in hours",
      },
    ],
  },
];

const highlightMetrics = [
  { icon: Terminal, label: "Code Quality", value: "Strict TS & ESLint" },
  { icon: Zap, label: "Performance", value: "98+ Lighthouse" },
  { icon: Boxes, label: "Component Systems", value: "Modular & Reusable" },
  { icon: Workflow, label: "Workflow", value: "Git, CI/CD & Edge" },
];

export function Skills() {
  const [activeTab, setActiveTab] = useState<string>("frontend");

  const currentCategory: SkillCategory =
    skillCategories.find((cat) => cat.id === activeTab) ?? skillCategories[0]!;

  return (
    <section
      id="skills"
      className="relative overflow-hidden border-t border-border bg-background pt-24 md:pt-36"
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        {/* Section Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground backdrop-blur">
              <Code2 className="h-3 w-3 text-accent" />
              <span>THE TOOLBOX</span>
            </div>
            <h2 className="mt-4 font-display text-4xl leading-[0.9] uppercase tracking-tight text-foreground sm:text-6xl md:text-7xl">
              Tools I reach for
              <br />
              <span className="text-muted-foreground">without thinking</span>
            </h2>
          </div>
          <p className="max-w-md font-mono text-xs leading-relaxed tracking-[0.15em] text-muted-foreground uppercase">
            Over four years of shipping refined web products from initial concept to high-scale
            production.
          </p>
        </div>

        {/* Highlight Quick Stats Banner */}
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {highlightMetrics.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card/40 p-4 backdrop-blur transition-all duration-300 hover:border-accent/50 hover:bg-card/80 hover:shadow-lg"
              >
                <div className="flex items-center gap-2.5 text-muted-foreground group-hover:text-accent transition-colors">
                  <Icon className="h-4 w-4" />
                  <span className="font-mono text-[10px] uppercase tracking-wider">
                    {metric.label}
                  </span>
                </div>
                <p className="mt-2 font-display text-lg uppercase tracking-tight text-foreground sm:text-xl">
                  {metric.value}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Interactive Skills Explorer */}
        <div className="mt-14 rounded-3xl border border-border/80 bg-card/30 p-6 backdrop-blur-xl sm:p-8 md:p-10 shadow-2xl">
          {/* Category Switcher Tabs */}
          <div className="flex flex-wrap gap-2.5 border-b border-border/60 pb-6">
            {skillCategories.map((category) => {
              const Icon = category.icon;
              const isActive = activeTab === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  className={`group relative flex items-center gap-2.5 rounded-full px-5 py-2.5 font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
                    isActive
                      ? "bg-foreground text-background shadow-md"
                      : "border border-border/70 bg-card/60 text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                  }`}
                >
                  <Icon
                    className={`h-3.5 w-3.5 transition-transform duration-300 group-hover:scale-110 ${isActive ? "text-background" : "text-accent"}`}
                  />
                  <span>{category.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active Category Description & Cards */}
          <div className="mt-6">
            <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
              {currentCategory.description}
            </p>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              >
                {currentCategory.skills.map((skill, idx) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className="group relative flex flex-col justify-between rounded-2xl border border-border/60 bg-background/60 p-5 backdrop-blur-sm transition-all duration-300 hover:border-accent/50 hover:bg-background/90 hover:shadow-xl"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="rounded-full border border-border/80 bg-card px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent">
                          {skill.tag}
                        </span>
                        <span className="font-mono text-xs font-semibold text-muted-foreground group-hover:text-foreground transition-colors">
                          {skill.level}
                        </span>
                      </div>

                      <h4 className="mt-4 font-display text-xl uppercase tracking-tight text-foreground group-hover:text-accent transition-colors">
                        {skill.name}
                      </h4>

                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                        {skill.description}
                      </p>
                    </div>

                    {/* Animated Skill Level Bar */}
                    <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-border/40">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-accent to-foreground"
                        initial={{ width: 0 }}
                        animate={{ width: skill.level }}
                        transition={{ duration: 0.8, delay: 0.1 + idx * 0.05, ease: "easeOut" }}
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Orbiting 3D Particle Globe */}
      <div className="mt-16 border-t border-border/40 pt-10">
        <div className="mx-auto max-w-6xl px-6 text-center mb-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            Interactive Ecosystem
          </p>
        </div>
        <OrbitingCirclesGlobe />
      </div>
    </section>
  );
}

export default Skills;
