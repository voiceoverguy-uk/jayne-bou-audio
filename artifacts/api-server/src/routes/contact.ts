import { Router, type Request, type Response } from "express";
import { Resend } from "resend";
import { z } from "zod";

const router = Router();

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(2),
  message: z.string().min(10),
});

router.post("/contact", async (req: Request, res: Response) => {
  const parsed = contactSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request", details: parsed.error.flatten() });
    return;
  }

  const { name, email, subject, message } = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    res.status(503).json({ error: "Email service not configured" });
    return;
  }

  const resend = new Resend(apiKey);
  const toEmail = process.env.RESEND_TO_EMAIL ?? "jayne@jaynebou.com";
  const fromEmail = process.env.RESEND_FROM_EMAIL ?? "contact@jaynebou.com";

  const { error } = await resend.emails.send({
    from: `Jayne Bou Audio <${fromEmail}>`,
    to: [toEmail],
    replyTo: email,
    subject: `[JayneBou.com] ${subject}`,
    html: `
      <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <hr />
      <p style="white-space:pre-wrap">${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
    `,
    text: `From: ${name} <${email}>\nSubject: ${subject}\n\n${message}`,
  });

  if (error) {
    console.error("Resend error:", error);
    res.status(500).json({ error: "Failed to send email" });
    return;
  }

  res.json({ ok: true });
});

export default router;
