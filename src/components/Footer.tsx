import { Link } from 'react-router-dom';
import { siteConfig } from '@/lib/data';

const elsewhere = [
  { label: 'LinkedIn', href: siteConfig.social.linkedin },
  { label: 'GitHub', href: siteConfig.social.github },
  { label: 'Medium', href: 'https://medium.com/@selfishprimate' },
  { label: 'Instagram', href: 'https://instagram.com/selfishprimate' },
  { label: 'Patreon', href: siteConfig.social.patreon },
];

const projects = [
  { label: 'Sketchize', href: 'https://sketchize.com' },
  { label: 'Gerillass', href: 'https://gerillass.com' },
  { label: 'Plainify', href: 'https://plainify.app/' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mx-auto w-full max-w-[860px] px-5 pt-28 pb-16 md:pt-40">
      <h2 className="sr-only">Footer</h2>

      {/* The whole contact section is one sentence and one link. */}
      <p className="jonas-lede text-2xl md:text-[2rem] max-w-[22ch]">
        Want to build something durable?{' '}
        <span className="jonas-fade">Drop me an email.</span>
      </p>
      <p className="mt-5">
        <a href={`mailto:${siteConfig.email}`} className="jonas-link text-lg">
          → {siteConfig.email}
        </a>
      </p>

      <div className="mt-24 grid gap-10 border-t border-border pt-8 sm:grid-cols-3">
        <nav aria-label="Elsewhere">
          <h3 className="jonas-label mb-3">Elsewhere</h3>
          <ul className="flex flex-col gap-1.5 list-none">
            {elsewhere.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.9375rem] text-text-secondary transition-colors hover:text-text-primary"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Open source projects">
          <h3 className="jonas-label mb-3">Open source</h3>
          <ul className="flex flex-col gap-1.5 list-none">
            {projects.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.9375rem] text-text-secondary transition-colors hover:text-text-primary"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="jonas-label mb-3">Site</h3>
          <ul className="flex flex-col gap-1.5 list-none">
            <li>
              <Link
                to="/works"
                className="text-[0.9375rem] text-text-secondary transition-colors hover:text-text-primary"
              >
                Work
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-[0.9375rem] text-text-secondary transition-colors hover:text-text-primary"
              >
                About
              </Link>
            </li>
            <li className="mt-3 text-[0.9375rem] text-text-tertiary">
              © {currentYear} {siteConfig.handle}
            </li>
            <li className="text-[0.9375rem] text-text-tertiary">{siteConfig.location}</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
