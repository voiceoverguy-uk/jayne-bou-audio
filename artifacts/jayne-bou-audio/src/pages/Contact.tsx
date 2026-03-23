import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { SmartImage } from '@/components/ui/smart-image';
import { jayne } from '@/lib/assets';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { CheckCircle } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(2, 'Please add a subject'),
  message: z.string().min(10, 'Please write at least 10 characters'),
});

type ContactForm = z.infer<typeof contactSchema>;

const faqs = [
  { q: 'Do you ship internationally?', a: 'Yes, we ship worldwide. Shipping costs and timescales vary by destination — please contact us before purchasing if you\'re outside the UK and want a quote.' },
  { q: 'What condition grades do you use?', a: 'We use Near Mint, Excellent, Very Good, Good, and Fair. Each grade is clearly defined in the listing, with photos of any marks or flaws.' },
  { q: 'Can I collect in person?', a: 'In some cases, yes. Get in touch to discuss — we\'re flexible where it makes sense.' },
  { q: 'What if something arrives damaged?', a: 'Contact us immediately with photos. We photograph our packaging before dispatch and will work with you to resolve any issues quickly.' },
  { q: 'Do you take part-exchange?', a: 'Occasionally, depending on what you have. Drop us a message with details of what you\'re looking to trade and what you\'re interested in.' },
];

const API_URL = (import.meta.env.VITE_API_URL as string | undefined) ?? '';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', subject: '', message: '' },
  });

  async function onSubmit(data: ContactForm) {
    setSubmitError(null);
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error((json as { error?: string }).error ?? 'Something went wrong. Please try again.');
      }
      setSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  }

  return (
    <div className="w-full pt-20">
      <section className="py-14 md:py-20 bg-background" data-testid="section-contact">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

            {/* FORM */}
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">Get in Touch</p>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Let's Talk Hi-Fi</h1>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Whether you have a question about a listing, want advice on what to buy, or just want to chat about audio — I'm genuinely happy to hear from you. I aim to reply within one business day.
              </p>

              {submitted ? (
                <div className="p-8 rounded-md bg-card border border-border flex flex-col items-center text-center gap-4" data-testid="contact-success">
                  <CheckCircle className="w-12 h-12 text-primary" />
                  <h2 className="text-xl font-bold text-foreground">Message Received</h2>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                    Thank you for getting in touch. I'll be back to you within one business day.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); form.reset(); }}
                    className="text-sm text-primary font-semibold hover:opacity-80 transition-opacity"
                    data-testid="button-send-another"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" data-testid="form-contact">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Jane Smith" data-testid="input-name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="jane@example.com" data-testid="input-email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Input placeholder="Question about a listing..." data-testid="input-subject" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea
                              rows={6}
                              placeholder="Tell me what you're looking for or what you'd like to know..."
                              data-testid="input-message"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {submitError && (
                      <p className="text-sm text-red-600 font-medium" data-testid="contact-error">{submitError}</p>
                    )}
                    <Button
                      type="submit"
                      data-testid="button-contact-submit"
                      className="w-full sm:w-auto"
                      disabled={form.formState.isSubmitting}
                    >
                      {form.formState.isSubmitting ? 'Sending…' : 'Send Message'}
                    </Button>
                  </form>
                </Form>
              )}
            </div>

            {/* RIGHT COLUMN */}
            <div className="flex flex-col gap-10">
              <div className="flex justify-center">
                <div className="w-full max-w-xs">
                  <SmartImage
                    src={jayne.contact}
                    fallbackLabel="Jayne Contact Placeholder"
                    alt="Jayne welcoming you to get in touch"
                    aspectRatio="4/5"
                    objectFit="contain"
                    className="w-full"
                  />
                </div>
              </div>

              {/* FAQs */}
              <div>
                <h2 className="text-xl font-bold text-foreground mb-5">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {faqs.map((faq) => (
                    <div key={faq.q} className="border-b border-border pb-4" data-testid="faq-item">
                      <h3 className="font-semibold text-foreground text-sm mb-1.5">{faq.q}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
