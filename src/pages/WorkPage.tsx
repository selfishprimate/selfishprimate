import { motion } from 'framer-motion';
import { getProjects } from '@/lib/projects';
import { ProjectCard } from '@/components/ProjectCard';
import { SectionHeading } from '@/components/SectionHeading';
import { useSEO, generateTitle } from '@/hooks/useSEO';

export function WorkPage() {
  const allProjects = getProjects();

  useSEO({
    title: generateTitle('Works'),
    description: 'A collection of UI/UX design projects showcasing expertise across mobile apps, web applications, design systems, and more.',
    keywords: ['UI/UX Design', 'Portfolio', 'Mobile App Design', 'Web Design', 'Design System', 'Case Studies'],
  });

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <SectionHeading
          label="Portfolio"
          title="Selected Work"
          description="A collection of projects I've worked on, showcasing my expertise in UI/UX design across various industries and platforms."
        />
      </section>

      {/* Projects Grid */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-2 gap-16">
          {allProjects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
