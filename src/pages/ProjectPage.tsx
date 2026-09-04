import { useState, useMemo, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, ArrowRight, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { getProjectBySlug, getProjects, resolveProjectImagePath } from '@/lib/projects';
import { siteConfig } from '@/lib/data';
import { useSEO, generateTitle, schemas } from '@/hooks/useSEO';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';
import { TableOfContents } from '@/components/TableOfContents';
import { generateSlug } from '@/lib/slug';

// Image data collected from <gallery> blocks for the lightbox
interface ImageData {
  src: string;
  alt: string;
  caption: string;
}

// Walk every <gallery> block in a case study and collect its <figure> entries
// in document order, which is also the lightbox order.
function collectGalleryImages(content: string, slug: string, fallbackAlt: string): ImageData[] {
  const images: ImageData[] = [];
  const galleryRegex = /<gallery[^>]*>([\s\S]*?)<\/gallery>/g;
  const figureRegex = /<figure\s+src="([^"]+)"(?:\s+alt="([^"]*)")?\s*>([^<]*)<\/figure>/g;

  let galleryMatch;
  while ((galleryMatch = galleryRegex.exec(content)) !== null) {
    const galleryContent = galleryMatch[1];
    let figureMatch;
    while ((figureMatch = figureRegex.exec(galleryContent)) !== null) {
      const [, src, alt = '', caption = ''] = figureMatch;
      images.push({
        src: resolveProjectImagePath(src, slug),
        alt: alt || fallbackAlt,
        caption: caption.trim(),
      });
    }
  }

  return images;
}

export function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const project = slug ? getProjectBySlug(slug) : undefined;
  const allProjects = getProjects();

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  useSEO({
    title: generateTitle('Works', project?.title),
    description: project?.description || 'UI/UX Design case study',
    keywords: project?.tags || ['UI/UX Design', 'Case Study'],
    // Purpose built 1200x630 card from scripts/generate-og-images.ts, served
    // from public/ at a stable path rather than a hashed Vite asset URL
    ogImage: slug ? `/og/works/${slug}.jpg` : undefined,
    jsonLd: project && slug ? schemas.project({
      title: project.title,
      description: project.description,
      slug,
      year: project.year,
      coverImage: project.coverImage,
    }) : undefined,
  });

  // Collect all images from content for lightbox. Memoized on plain strings so
  // the parse only re-runs when the case study itself changes.
  const allImages = useMemo(() => {
    if (!slug) return [];
    const current = getProjectBySlug(slug);
    return current ? collectGalleryImages(current.content, slug, current.title) : [];
  }, [slug]);

  // Lock body scroll when lightbox is open
  useBodyScrollLock(lightboxIndex !== null);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsZoomed(false);
  };
  const closeLightbox = () => {
    setLightboxIndex(null);
    setIsZoomed(false);
  };

  const goToPrevious = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(lightboxIndex === 0 ? allImages.length - 1 : lightboxIndex - 1);
      setIsZoomed(false);
    }
  };

  const goToNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(lightboxIndex === allImages.length - 1 ? 0 : lightboxIndex + 1);
      setIsZoomed(false);
    }
  };

  // The tint belongs to the whole page, not to the 1280px column, so it goes
  // on the body and comes off again on the way out.
  useEffect(() => {
    document.body.classList.add('page-paper');
    return () => document.body.classList.remove('page-paper');
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null);
        setIsZoomed(false);
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex(lightboxIndex === 0 ? allImages.length - 1 : lightboxIndex - 1);
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex(lightboxIndex === allImages.length - 1 ? 0 : lightboxIndex + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, allImages.length]);

  if (!project) {
    return (
      <div className="mx-auto w-full max-w-[1280px] px-6 pt-24 md:px-10 md:pt-44">
        <h2 className="j-heading">Project not found.</h2>
        <p className="mt-6">
          <Link to="/works" className="j-item underline decoration-border underline-offset-[6px] transition-colors hover:decoration-text-primary">
            → Back to the Work
          </Link>
        </p>
      </div>
    );
  }

  // Get next and previous projects
  const currentIndex = allProjects.findIndex(p => p.slug === slug);
  const nextProject = allProjects[currentIndex + 1] || allProjects[0];
  const prevProject = allProjects[currentIndex - 1] || allProjects[allProjects.length - 1];

  // Helper to resolve image path
  const resolveImagePath = (relativePath: string): string => {
    return resolveProjectImagePath(relativePath, slug!);
  };

  // Get lightbox index for an image path
  const getLightboxIndex = (relativePath: string): number => {
    const resolved = resolveImagePath(relativePath);
    return allImages.findIndex(img => img.src === resolved);
  };

  // Parse content and render with galleries
  const renderContentWithGalleries = () => {
    const content = project.content;

    // Split content by gallery blocks, figma embeds, and youtube embeds
    const parts = content.split(/(<gallery[^>]*>[\s\S]*?<\/gallery>|<figma[^>]*\/>|<youtube[^>]*\/>)/g);

    return parts.map((part, index) => {
      // Check if this is a gallery block
      const galleryMatch = part.match(/<gallery\s+cols="(\d+)">([\s\S]*?)<\/gallery>/);

      // Check if this is a figma embed
      const figmaMatch = part.match(/<figma\s+src="([^"]+)"(?:\s+height="(\d+)")?(?:\s+title="([^"]*)")?\s*\/>/);

      if (figmaMatch) {
        const [, src, height = '600', title = 'Figma Design'] = figmaMatch;
        return (
          <div key={index} className="my-12">
            <div className="relative w-full overflow-hidden border border-border" style={{ height: `${height}px` }}>
              <iframe
                src={src}
                title={title}
                className="absolute inset-0 w-full h-full"
                style={{ border: 'none' }}
                allowFullScreen
              />
            </div>
          </div>
        );
      }

      // Check if this is a youtube embed
      const youtubeMatch = part.match(/<youtube\s+src="([^"]+)"(?:\s+title="([^"]*)")?\s*\/>/);

      if (youtubeMatch) {
        const [, videoId, title = 'YouTube Video'] = youtubeMatch;
        return (
          <div key={index} className="my-12">
            <div className="relative w-full overflow-hidden" style={{ paddingBottom: '56.25%' }}>
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                title={title}
                className="absolute inset-0 w-full h-full"
                style={{ border: 'none' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        );
      }

      if (galleryMatch) {
        const cols = parseInt(galleryMatch[1]);
        const galleryContent = galleryMatch[2];

        // Parse figure elements
        const figures: { src: string; alt: string; caption: string }[] = [];
        let figureMatch;
        const localFigureRegex = /<figure\s+src="([^"]+)"(?:\s+alt="([^"]*)")?\s*>([^<]*)<\/figure>/g;
        while ((figureMatch = localFigureRegex.exec(galleryContent)) !== null) {
          const [, src, alt = '', caption = ''] = figureMatch;
          figures.push({ src, alt: alt || project.title, caption: caption.trim() });
        }

        let gridClass = 'grid-cols-1';
        if (cols === 2) gridClass = 'grid-cols-1 md:grid-cols-2';
        if (cols === 3) gridClass = 'grid-cols-1 md:grid-cols-3';
        if (cols === 4) gridClass = 'grid-cols-2 md:grid-cols-4';

        return (
          <div key={index} className={`grid ${gridClass} my-10 gap-6`}>
            {figures.map((figure, figIndex) => {
              const resolvedPath = resolveImagePath(figure.src);
              const lightboxIdx = getLightboxIndex(figure.src);
              return (
                <figure key={figIndex} className="m-0">
                  <button
                    type="button"
                    onClick={() => openLightbox(lightboxIdx)}
                    aria-label={`View ${figure.alt} in full size`}
                    className="w-full cursor-zoom-in overflow-hidden bg-surface"
                  >
                    <img
                      src={resolvedPath}
                      alt={figure.alt}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-auto"
                    />
                  </button>
                  {figure.caption && (
                    <figcaption className="j-meta mt-4">
                      <ReactMarkdown
                        components={{
                          p: ({ children }) => <>{children}</>,
                          a: ({ href, children }) => (
                            <a
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-text-tertiary underline hover:text-text-secondary transition-colors"
                            >
                              {children}
                            </a>
                          )
                        }}
                      >
                        {figure.caption}
                      </ReactMarkdown>
                    </figcaption>
                  )}
                </figure>
              );
            })}
          </div>
        );
      }

      if (part.trim()) {
        return (
          <div key={index} className="prose">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({ children }) => {
                  const text = String(children);
                  const id = generateSlug(text);
                  return <h2 id={id}>{children}</h2>;
                },
                h3: ({ children }) => {
                  const text = String(children);
                  const id = generateSlug(text);
                  return <h3 id={id}>{children}</h3>;
                },
                h4: ({ children }) => {
                  const text = String(children);
                  const id = generateSlug(text);
                  return <h4 id={id}>{children}</h4>;
                },
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-primary underline hover:opacity-60 transition-opacity"
                  >
                    {children}
                  </a>
                ),
                // Wide tables scroll inside their own container so the page body never does
                table: ({ children }) => (
                  <div className="overflow-x-auto">
                    <table>{children}</table>
                  </div>
                )
              }}
            >
              {part}
            </ReactMarkdown>
          </div>
        );
      }

      return null;
    });
  };

  return (
    <div className="mx-auto w-full max-w-[1280px] px-6 md:px-10">
      {/* Back */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pt-8"
      >
        <button
          onClick={() => navigate(-1)}
          className="j-nav inline-flex items-center gap-2"
        >
          <ArrowLeft size={14} />
          Back
        </button>
      </motion.p>

      {/* Header */}
      <section className="pt-16 pb-12 md:pt-24 md:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="j-display max-w-[22ch]">
            {project.title}
          </h2>
          <p className="j-body j-fade mt-8 max-w-[42ch] md:mt-10">{project.description}</p>
        </motion.div>
      </section>

      {/* Cover, wider than the column it sits in. The width is capped against
          the viewport as well as the content, so the overhang closes to
          nothing on a phone rather than pushing the page sideways. */}
      {project.coverImage && (
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="relative left-1/2 w-[min(100vw-2rem,calc(100%+12rem))] -translate-x-1/2"
        >
          <img
            src={project.coverImage}
            alt={project.title}
            loading="eager"
            decoding="async"
            className="w-full"
          />
        </motion.section>
      )}

      {/* The facts sit under the cover, where they read as its caption. */}
      <motion.dl
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.6 }}
        className="mt-12 grid gap-4 border-t border-border pt-6 sm:grid-cols-3 md:mt-16 md:gap-10"
      >
        <div>
          <dt className="j-meta">Client</dt>
          <dd className="j-item">{project.company}</dd>
        </div>
        <div>
          <dt className="j-meta">Year</dt>
          <dd className="j-item">{project.year}</dd>
        </div>
        <div>
          <dt className="j-meta">Discipline</dt>
          <dd className="j-item">{project.tags.slice(0, 2).join(', ')}</dd>
        </div>
      </motion.dl>

      {/* Content with TOC */}
      <section className="py-24 md:py-36">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-24">
          <aside className="hidden lg:block lg:w-52 lg:shrink-0">
            <div className="sticky top-10">
              <TableOfContents content={project.content} />
            </div>
          </aside>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="min-w-0 flex-1 lg:max-w-[760px]"
          >
            {renderContentWithGalleries()}
          </motion.div>
        </div>
      </section>

      {/* Tags */}
      <section className="pb-20">
        <p className="j-meta">{project.tags.join(', ')}</p>
      </section>

      {/* Previous / next */}
      <section className="grid gap-8 border-t border-border pt-8 sm:grid-cols-2">
        <Link to={`/works/${prevProject.slug}`} className="group">
          <span className="j-meta inline-flex items-center gap-2">
            <ArrowLeft size={14} />
            Previous
          </span>
          <h3 className="j-item mt-2 underline decoration-border underline-offset-[6px] transition-colors group-hover:decoration-text-primary">
            {prevProject.title}
          </h3>
        </Link>

        <Link to={`/works/${nextProject.slug}`} className="group sm:text-right">
          <span className="j-meta inline-flex items-center gap-2">
            Next
            <ArrowRight size={14} />
          </span>
          <h3 className="j-item mt-2 underline decoration-border underline-offset-[6px] transition-colors group-hover:decoration-text-primary">
            {nextProject.title}
          </h3>
        </Link>
      </section>

      {/* Contact */}
      <section className="pt-28 md:pt-44">
        <p className="j-display max-w-[18ch]">
          Working on something similar?{' '}
          <span className="j-fade">Tell me about it.</span>
        </p>
        <p className="mt-10">
          <a
            href={siteConfig.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="j-item underline decoration-border underline-offset-[6px] transition-colors hover:decoration-text-primary"
          >
            → Get in touch
          </a>
        </p>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex flex-col bg-neutral-950/96"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-10 flex h-11 w-11 items-center justify-center text-neutral-400 transition-colors hover:text-white"
              aria-label="Close lightbox"
            >
              <X size={28} />
            </button>

            {/* Image Area */}
            <div
              className={`flex-1 ${isZoomed ? 'overflow-auto scrollbar-hide' : 'flex items-center justify-center overflow-hidden'}`}
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  if (isZoomed) setIsZoomed(false);
                  else closeLightbox();
                }
              }}
            >
              {isZoomed ? (
                <div className="inline-block p-4">
                  <img
                    src={allImages[lightboxIndex]?.src}
                    alt={allImages[lightboxIndex]?.alt || `${project.title} - Image ${lightboxIndex + 1}`}
                    className="w-[130vw] h-auto cursor-zoom-out"
                    onClick={(e) => { e.stopPropagation(); setIsZoomed(false); }}
                    draggable={false}
                  />
                </div>
              ) : (
                <img
                  src={allImages[lightboxIndex]?.src}
                  alt={allImages[lightboxIndex]?.alt || `${project.title} - Image ${lightboxIndex + 1}`}
                  className={`max-w-[92vw] max-h-[calc(100vh-8rem)] object-contain ${!isTouchDevice ? 'cursor-zoom-in' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isTouchDevice) setIsZoomed(true);
                  }}
                  draggable={false}
                />
              )}
            </div>

            {/* Bottom Navigation - Sticky */}
            {allImages.length > 1 && (
              <div
                className="sticky bottom-0 left-0 right-0 flex items-center justify-center py-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-4">
                  <button
                    onClick={goToPrevious}
                    className="flex h-10 w-10 items-center justify-center text-neutral-400 transition-colors hover:text-white"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <span className="min-w-[3rem] text-center text-base text-neutral-400">
                    {lightboxIndex + 1} / {allImages.length}
                  </span>
                  <button
                    onClick={goToNext}
                    className="flex h-10 w-10 items-center justify-center text-neutral-400 transition-colors hover:text-white"
                    aria-label="Next image"
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
