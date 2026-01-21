import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { siteConfig } from '@/lib/data';
import { ThemeToggle } from './ThemeToggle';

const navItems = [
  { label: 'Work', path: '/work' },
  { label: 'Illustrations', path: '/illustrations' },
  { label: 'About', path: '/about' },
  { label: 'Articles', path: '/articles' },
  { label: 'Contact', path: '/contact' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-surface/80 backdrop-blur-lg' : ''
        }`}
      >
        <nav className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="group">
              <div className="flex flex-col items-start">
                <div className="flex items-baseline">
                  <span className="font-sans font-medium text-2xl tracking-tight text-text-primary">
                    Selfish
                  </span>
                  <span className="font-serif italic font-semibold text-3xl text-accent">
                    primate
                  </span>
                </div>
                <span className="hidden sm:block text-xs text-text-secondary/60 mt-0.5">
                  Portfolio of a technological caveman.
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative font-sans text-sm transition-colors hover:text-text-primary ${
                    location.pathname === item.path || location.pathname.startsWith(item.path + '/')
                      ? 'text-text-primary'
                      : 'text-text-secondary'
                  }`}
                >
                  {item.label}
                  {(location.pathname === item.path || location.pathname.startsWith(item.path + '/')) && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-px bg-text-primary"
                    />
                  )}
                </Link>
              ))}
              <ThemeToggle />
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => setIsMenuOpen(true)}
                className="p-2 rounded-full text-text-secondary hover:text-text-primary transition-colors"
                aria-label="Open menu"
              >
                <div className="w-5 h-5 flex flex-col justify-center gap-[5px]">
                  <span className="block w-full h-[1px] bg-current"></span>
                  <span className="block w-full h-[1px] bg-current"></span>
                </div>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu - Outside header for proper z-index stacking */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 bg-background z-[100]"
          >
            {/* Close button */}
            <button
              onClick={closeMenu}
              className="absolute top-6 right-6 p-2 rounded-full text-text-secondary hover:text-text-primary transition-colors"
              aria-label="Close menu"
            >
              <X size={20} strokeWidth={1.5} />
            </button>

            <div className="flex flex-col items-center justify-center h-full gap-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={item.path}
                    onClick={closeMenu}
                    className={`font-serif text-3xl transition-colors hover:text-text-primary ${
                      location.pathname === item.path
                        ? 'text-text-primary'
                        : 'text-text-secondary'
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
