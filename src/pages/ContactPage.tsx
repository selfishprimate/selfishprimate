import { motion } from 'framer-motion';
import { Mail, MapPin, ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@/lib/data';
import { SectionHeading } from '@/components/SectionHeading';
import { useSEO, generateTitle } from '@/hooks/useSEO';

export function ContactPage() {
  useSEO({
    title: generateTitle('Contact'),
    description: 'Get in touch with Halil Ibrahim Cakiroglu for UI/UX design projects, collaborations, or just to say hello.',
    keywords: ['Contact', 'Hire', 'UI/UX Designer', 'Freelance', 'Collaboration'],
  });

  return (
    <div className="min-h-screen">
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="max-w-3xl">
          <SectionHeading
            label="Contact"
            title="Let's Work Together"
            description="Have a project in mind? I'd love to hear about it."
          />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-border flex items-center justify-center">
                    <Mail size={18} className="text-text-secondary" />
                  </div>
                  <span className="text-xs font-sans uppercase tracking-widest text-text-tertiary">Email</span>
                </div>
                <a href={`mailto:${siteConfig.email}`} className="font-serif text-2xl md:text-3xl text-text-primary hover:text-text-secondary transition-colors">
                  {siteConfig.email}
                </a>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-border flex items-center justify-center">
                    <MapPin size={18} className="text-text-secondary" />
                  </div>
                  <span className="text-xs font-sans uppercase tracking-widest text-text-tertiary">Location</span>
                </div>
                <p className="font-serif text-2xl md:text-3xl text-text-primary">{siteConfig.location}</p>
              </div>
            </div>

            <div className="mt-12 pt-12 border-t border-border">
              <h3 className="font-serif text-xl text-text-primary mb-6">Connect with me</h3>
              <div className="flex flex-wrap gap-3">
                {Object.entries(siteConfig.social).map(([name, url]) => (
                  <a key={name} href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-text-secondary font-sans text-sm rounded-full hover:bg-border/50 hover:text-text-primary transition-colors">
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                    <ArrowUpRight size={14} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="bg-surface border border-border rounded-2xl p-8 md:p-10">
            <h3 className="font-serif text-2xl text-text-primary mb-6">Send a message</h3>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-sans text-text-secondary mb-2">Name</label>
                <input type="text" id="name" name="name" className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-text-tertiary transition-colors" placeholder="Your name" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-sans text-text-secondary mb-2">Email</label>
                <input type="email" id="email" name="email" className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-text-tertiary transition-colors" placeholder="your@email.com" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-sans text-text-secondary mb-2">Message</label>
                <textarea id="message" name="message" rows={5} className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-text-tertiary transition-colors resize-none" placeholder="Tell me about your project..." />
              </div>
              <button type="submit" className="w-full px-6 py-3 bg-text-primary text-surface font-sans text-sm rounded-lg hover:bg-text-secondary transition-colors">
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
