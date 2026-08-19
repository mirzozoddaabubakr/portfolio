import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  message: z.string().trim().min(1, "Message is required").max(2000),
});

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export const sendContactMessage = createServerFn({ method: "POST" })
  .validator((input: unknown) => contactSchema.parse(input))
  .handler(async ({ data }) => {
    const apiKey = process.env["RESEND_API_KEY"];
    const to = process.env["CONTACT_EMAIL"];
    if (!apiKey || !to) {
      return { ok: false as const, error: "Email is not configured yet." };
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: [to],
        reply_to: data.email,
        subject: `New message from ${data.name}`,
        html: `<p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
<p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
<p><strong>Message:</strong></p>
<p>${escapeHtml(data.message).replace(/\n/g, "<br/>")}</p>`,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error(`Resend request failed [${res.status}]: ${body}`);
      return { ok: false as const, error: `Could not send message (${res.status}).` };
    }

    return { ok: true as const };
  });
