import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { SocialLinks } from './SocialLinks';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';

const navItems = [
  { label: 'Work', path: '/works' },
  { label: 'Illustrations', path: '/illustrations' },
  { label: 'Articles', path: '/articles' },
  { label: 'Experience', path: '/experience' },
  { label: 'About', path: '/about' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActivePath = (path: string) =>
    location.pathname === path || location.pathname.startsWith(path + '/');

  useBodyScrollLock(isMenuOpen);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      {/* Not fixed: the header scrolls away and never comes back, which is what
          keeps the page reading as a document. */}
      <header className="mx-auto w-full max-w-[1280px] px-6 pt-14 md:px-10">
        <div className="flex items-center justify-between gap-6">
          <Link to="/">
            <h1 className="j-nav text-text-primary">
              <span className="sr-only">SELFISHPRIMATE</span>
              <span aria-hidden="true" className="font-semibold tracking-[0.01em]">
                SELFISHPRIMATE
              </span>
            </h1>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <h2 className="sr-only">Main Navigation</h2>
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`j-nav ${isActivePath(item.path) ? 'text-text-primary' : ''}`}
              >
                {item.label}
              </Link>
            ))}
            <SocialLinks className="ml-2" />
          </nav>

          <div className="flex items-center gap-4 md:hidden">
            <SocialLinks size={17} />
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              className="j-nav"
              aria-label="Open menu"
              aria-expanded={isMenuOpen}
            >
              Menu
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-background md:hidden"
          >
            <button
              type="button"
              onClick={closeMenu}
              className="absolute top-6 right-6 p-2 text-text-tertiary transition-colors hover:text-text-primary"
              aria-label="Close menu"
            >
              <X size={22} strokeWidth={1.5} />
            </button>

            <nav
              aria-label="Mobile navigation"
              className="flex h-full flex-col items-start justify-center gap-3 px-6"
            >
              {navItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 }}
                >
                  <Link
                    to={item.path}
                    onClick={closeMenu}
                    className={`j-heading ${isActivePath(item.path) ? '' : 'j-fade'}`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <SocialLinks size={22} className="mt-6 gap-6" />
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
