import { Link } from 'react-router-dom';
import { siteConfig } from '@/lib/data';

const elsewhere = [
  { label: 'LinkedIn', href: siteConfig.social.linkedin },
  { label: 'GitHub', href: siteConfig.social.github },
  { label: 'Medium', href: 'https://medium.com/@selfishprimate' },
  { label: 'Instagram', href: 'https://instagram.com/selfishprimate' },
];

const projects = [
  { label: 'Sketchize', href: 'https://sketchize.com' },
  { label: 'Gerillass', href: 'https://gerillass.com' },
  { label: 'Plainify', href: 'https://plainify.app/' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  const linkClass =
    'j-item font-normal j-fade transition-colors hover:text-text-primary';

  return (
    <footer className="mx-auto w-full max-w-[1280px] px-6 pt-32 pb-16 md:px-10 md:pt-52">
      <h2 className="sr-only">Footer</h2>

      {/* One sentence, one link, on the page's one inverted panel. `dark`
          flips the palette inside it, so the type below needs no colour of its
          own. */}
      <div className="j-banner dark px-6 py-24 md:px-20 md:py-32">
        <p className="j-display mx-auto max-w-[700px]">
          Want to build something durable?{' '}
          <span className="j-fade">Drop me an email.</span>
        </p>
        <p className="mt-8">
          <a
            href={`mailto:${siteConfig.email}`}
            className="j-heading transition-opacity hover:opacity-70"
          >
            → {siteConfig.email}
          </a>
        </p>
      </div>

      {/* The reference carries exactly one hairline on the whole page, and it
          is this one. */}
      <div className="mt-28 border-t border-border pt-14" />

      <div className="grid gap-10 md:grid-cols-3">
        <nav aria-label="Elsewhere">
          <h3 className="j-item mb-4">Elsewhere</h3>
          <ul className="flex flex-col gap-1.5 list-none">
            {elsewhere.map((item) => (
              <li key={item.href}>
                <a href={item.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Open source projects">
          <h3 className="j-item mb-4">Open Source</h3>
          <ul className="flex flex-col gap-1.5 list-none">
            {projects.map((item) => (
              <li key={item.href}>
                <a href={item.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="j-item mb-4">Site</h3>
          <ul className="flex flex-col gap-1.5 list-none">
            <li>
              <Link to="/works" className={linkClass}>
                Work
              </Link>
            </li>
            <li>
              <Link to="/about" className={linkClass}>
                About
              </Link>
            </li>
            <li className="j-meta mt-4">© {currentYear} selfishprimate</li>
            <li className="j-meta">{siteConfig.location}</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
