import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';

const navItems = [
  { label: 'Work', path: '/works' },
  { label: 'Illustrations', path: '/illustrations' },
  { label: 'Writing', path: '/articles' },
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
      {/* Not fixed: this design lets the header scroll away and never comes
          back, which is what keeps the page feeling like a document. */}
      <header className="mx-auto w-full max-w-[860px] px-5 pt-7 md:pt-9">
        <div className="flex items-center justify-between">
          <Link to="/">
            <h1>
              <span className="sr-only">selfishprimate</span>
              <img
                src="/images/sp-logo-light.png"
                alt="selfishprimate"
                className="h-6 w-auto light-only"
              />
              <img
                src="/images/sp-logo-dark.svg"
                alt="selfishprimate"
                className="h-6 w-auto dark-only"
              />
            </h1>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <h2 className="sr-only">Main Navigation</h2>
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-[0.9375rem] transition-colors hover:text-text-primary ${
                  isActivePath(item.path) ? 'text-text-primary' : 'text-text-secondary'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <ThemeToggle />
          </nav>

          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              className="p-2 text-text-secondary transition-colors hover:text-text-primary"
              aria-label="Open menu"
              aria-expanded={isMenuOpen}
            >
              <span className="flex h-4 w-5 flex-col justify-center gap-[5px]">
                <span className="block h-px w-full bg-current" />
                <span className="block h-px w-full bg-current" />
              </span>
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
              className="absolute top-6 right-5 p-2 text-text-secondary transition-colors hover:text-text-primary"
              aria-label="Close menu"
            >
              <X size={20} strokeWidth={1.5} />
            </button>

            <nav
              aria-label="Mobile navigation"
              className="flex h-full flex-col items-start justify-center gap-4 px-8"
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
                    className={`jonas-lede text-3xl ${
                      isActivePath(item.path) ? '' : 'jonas-fade'
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
