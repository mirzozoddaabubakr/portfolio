import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, Mail, MoveRight, User } from "lucide-react";
import { toast } from "sonner";

import { sendContactMessage } from "@/lib/contact.functions";

export default function ContactForm() {
  const send = useServerFn(sendContactMessage);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      message: String(fd.get("message") ?? "").trim(),
    };
    if (!payload.name || !payload.email || !payload.message) {
      toast.error("Please fill in every field.");
      return;
    }
    setLoading(true);
    try {
      const res = await send({ data: payload });
      if (res.ok) {
        toast.success("Message sent. I'll get back to you soon.");
        form.reset();
      } else {
        toast.error(res.error);
      }
    } catch {
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto flex w-full max-w-md flex-col items-center text-sm"
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
        Contact
      </p>
      <h2 className="mt-3 text-center font-display text-4xl uppercase tracking-tight text-foreground sm:text-5xl">
        Let&rsquo;s get in touch.
      </h2>
      <p className="mt-3 max-w-md text-center text-muted-foreground">
        Or just reach out manually at{" "}
        <a
          href="mailto:mirzozoddaabubakr@gmail.com"
          className="text-accent underline underline-offset-4"
        >
          mirzozoddaabubakr@gmail.com
        </a>
      </p>

      <div className="mt-10 w-full">
        <label htmlFor="contact-name" className="font-medium text-foreground">
          Full Name
        </label>
        <div className="mt-2 flex h-12 items-center gap-2 overflow-hidden rounded-lg border border-border bg-card pl-3 transition-colors focus-within:border-accent">
          <User className="h-4 w-4 text-muted-foreground" />
          <input
            id="contact-name"
            name="name"
            type="text"
            maxLength={100}
            placeholder="Enter your full name"
            className="h-full w-full bg-transparent text-foreground outline-none placeholder:text-muted-foreground"
            required
          />
        </div>
      </div>

      <div className="mt-5 w-full">
        <label htmlFor="contact-email" className="font-medium text-foreground">
          Email Address
        </label>
        <div className="mt-2 flex h-12 items-center gap-2 overflow-hidden rounded-lg border border-border bg-card pl-3 transition-colors focus-within:border-accent">
          <Mail className="h-4 w-4 text-muted-foreground" />
          <input
            id="contact-email"
            name="email"
            type="email"
            maxLength={255}
            placeholder="Enter your email address"
            className="h-full w-full bg-transparent text-foreground outline-none placeholder:text-muted-foreground"
            required
          />
        </div>
      </div>

      <div className="mt-5 w-full">
        <label htmlFor="contact-message" className="font-medium text-foreground">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          maxLength={2000}
          placeholder="Enter your message"
          className="mt-2 w-full resize-none rounded-lg border border-border bg-card p-3 text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-8 flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {loading ? "Sending" : "Submit form"}
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <MoveRight className="h-4 w-4" />}
      </button>
    </form>
  );
}
