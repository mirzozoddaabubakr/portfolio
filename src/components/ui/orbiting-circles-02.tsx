"use client";

import React from "react";
import ParticleSphereAnimation from "@/components/ui/orbiting-circles-02-utils/particalsphear";

const orbits = [
  {
    size: "w-[22rem] h-[22rem] md:w-[34rem] md:h-[34rem]",
    duration: 18,
    icons: [
      {
        src: "https://images.shadcnspace.com/assets/svgs/supabase.svg",
        alt: "Supabase",
        angle: -60,
      },
      { src: "https://images.shadcnspace.com/assets/svgs/gemini.svg", alt: "Gemini", angle: 0 },
      { src: "https://images.shadcnspace.com/assets/svgs/make.svg", alt: "Make", angle: 60 },
    ],
  },
  {
    size: "w-[30rem] h-[30rem] md:w-[44rem] md:h-[44rem]",
    duration: 24,
    icons: [
      { src: "https://images.shadcnspace.com/assets/svgs/figma.svg", alt: "Figma", angle: 0 },
      { src: "https://images.shadcnspace.com/assets/svgs/slack.svg", alt: "Slack", angle: -90 },
    ],
  },
  {
    size: "w-[37rem] h-[37rem] md:w-[54rem] md:h-[54rem]",
    duration: 30,
    icons: [
      { src: "https://images.shadcnspace.com/assets/svgs/clude.svg", alt: "Claude", angle: -60 },
      { src: "https://images.shadcnspace.com/assets/svgs/react.svg", alt: "React", angle: 0 },
      { src: "https://images.shadcnspace.com/assets/svgs/python.svg", alt: "Python", angle: 60 },
    ],
  },
];

export default function OrbitingCirclesGlobe() {
  return (
    <div className="relative flex h-[34rem] w-full justify-center overflow-hidden md:h-[50rem]">
      <style>{`
        @keyframes orbit-cw { from { transform: rotate(var(--start-angle)) } to { transform: rotate(calc(var(--start-angle) + 360deg)) } }
        @keyframes orbit-ccw { from { transform: rotate(var(--start-angle)) } to { transform: rotate(calc(var(--start-angle) - 360deg)) } }
        @keyframes counter-cw { from { transform: rotate(var(--counter-offset, 0deg)) } to { transform: rotate(calc(var(--counter-offset, 0deg) - 360deg)) } }
        @keyframes counter-ccw { from { transform: rotate(var(--counter-offset, 0deg)) } to { transform: rotate(calc(var(--counter-offset, 0deg) + 360deg)) } }
      `}</style>

      {/* Center particle globe */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 z-10 aspect-square w-[22rem] -translate-x-1/2 translate-y-1/2 overflow-hidden rounded-full bg-[radial-gradient(circle_at_50%_35%,var(--glow),transparent_65%)] md:w-[34rem]">
        <ParticleSphereAnimation className="h-full w-full opacity-80" />
      </div>

      {/* Orbiting rings */}
      {orbits.map((orbit, index) => {
        const isCW = index % 2 === 0;
        const orbitAnim = isCW ? "orbit-cw" : "orbit-ccw";
        const counterAnim = isCW ? "counter-cw" : "counter-ccw";

        const allIcons = [
          ...orbit.icons,
          ...orbit.icons.map((ic) => ({
            ...ic,
            angle: ic.angle + 180,
            alt: `${ic.alt}-mirror`,
          })),
        ];

        return (
          <div
            key={index}
            className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-full border border-border ${orbit.size}`}
          >
            {allIcons.map((iconData, iconIndex) => (
              <div
                key={iconIndex}
                className="absolute top-0 left-1/2 flex h-1/2 -ml-9 origin-bottom flex-col items-center justify-start"
                style={
                  {
                    "--start-angle": `${iconData.angle}deg`,
                    animation: `${orbitAnim} ${orbit.duration}s linear infinite`,
                  } as React.CSSProperties
                }
              >
                <div
                  className="relative z-10 -mt-9 rounded-full border border-border bg-card p-3.5 sm:p-5"
                  style={
                    {
                      "--counter-offset": `${-iconData.angle}deg`,
                      animation: `${counterAnim} ${orbit.duration}s linear infinite`,
                    } as React.CSSProperties
                  }
                >
                  <img
                    src={iconData.src}
                    alt={iconData.alt.replace("-mirror", "")}
                    width={32}
                    height={32}
                    className="h-7 w-7 md:h-10 md:w-10"
                  />
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
