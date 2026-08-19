const links = [
  { id: "designs", label: "Design" },
  { id: "process", label: "Process" },
  { id: "comparison", label: "Why Me" },
  { id: "skills", label: "Skills" },
  { id: "about", label: "About" },
  { id: "feedback", label: "Feedback" },
  { id: "contact", label: "Contact" },
];

const elsewhere = [
  { label: "Abu's Coffee", href: "https://abuscoffee.vercel.app" },
  { label: "Nike Gravity", href: "https://nikegravity.vercel.app" },
];

export function SiteFooter() {
  const go = (id: string) => {
    window.dispatchEvent(new CustomEvent("nav:goto", { detail: id }));
  };

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="font-display text-3xl uppercase tracking-tight text-foreground">
              Mirzozoda Abubakr
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Full stack web developer. Design and code, front to back.
            </p>
          </div>

          <div className="flex gap-14">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                Pages
              </p>
              <ul className="mt-4 space-y-2">
                {links.map((l) => (
                  <li key={l.id}>
                    <button
                      type="button"
                      onClick={() => go(l.id)}
                      className="text-sm text-foreground/80 transition-colors hover:text-accent"
                    >
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                Work
              </p>
              <ul className="mt-4 space-y-2">
                {elsewhere.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-foreground/80 transition-colors hover:text-accent"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-border pt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Mirzozoda Abubakr. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
