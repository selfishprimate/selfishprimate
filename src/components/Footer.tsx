import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@/lib/data';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border mt-32">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div>
            <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
              {siteConfig.title} based in {siteConfig.location}.
              Creating intuitive and engaging digital experiences.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-sans text-xs uppercase tracking-wider text-text-tertiary mb-4">
              Navigation
            </h4>
            <nav className="flex flex-col gap-3">
              <Link to="/work" className="text-text-secondary hover:text-text-primary transition-colors text-sm">
                Work
              </Link>
              <Link to="/illustrations" className="text-text-secondary hover:text-text-primary transition-colors text-sm">
                Illustrations
              </Link>
              <Link to="/about" className="text-text-secondary hover:text-text-primary transition-colors text-sm">
                About
              </Link>
              <Link to="/articles" className="text-text-secondary hover:text-text-primary transition-colors text-sm">
                Articles
              </Link>
              <Link to="/contact" className="text-text-secondary hover:text-text-primary transition-colors text-sm">
                Contact
              </Link>
            </nav>
          </div>

          {/* Projects */}
          <div>
            <h4 className="font-sans text-xs uppercase tracking-wider text-text-tertiary mb-4">
              Projects
            </h4>
            <nav className="flex flex-col gap-3">
              <a
                href="https://sketchize.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-text-secondary hover:text-text-primary transition-colors text-sm group"
              >
                Sketchize
                <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href="https://gerillass.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-text-secondary hover:text-text-primary transition-colors text-sm group"
              >
                Gerillass
                <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href="https://github.com/selfishprimate/plain"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-text-secondary hover:text-text-primary transition-colors text-sm group"
              >
                Plain
                <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href="https://plainify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-text-secondary hover:text-text-primary transition-colors text-sm group"
              >
                Plainify
                <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </nav>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-sans text-xs uppercase tracking-wider text-text-tertiary mb-4">
              Connect
            </h4>
            <nav className="flex flex-col gap-3">
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-text-secondary hover:text-text-primary transition-colors text-sm group"
              >
                LinkedIn
                <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-text-secondary hover:text-text-primary transition-colors text-sm group"
              >
                GitHub
                <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href={siteConfig.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-text-secondary hover:text-text-primary transition-colors text-sm group"
              >
                Twitter
                <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </nav>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-text-tertiary text-xs">
            © {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-text-tertiary text-xs">
            Designed & built with care
          </p>
        </div>
      </div>
    </footer>
  );
}
