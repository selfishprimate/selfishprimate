import { getProjects } from '@/lib/projects';
import { ProjectCard } from '@/components/ProjectCard';
import { SectionHeading } from '@/components/SectionHeading';
import { useSEO, generateTitle } from '@/hooks/useSEO';

export function WorksPage() {
  const allProjects = getProjects();

  useSEO({
    title: generateTitle('Works'),
    description: 'A collection of UI/UX design projects showcasing expertise across mobile apps, web applications, design systems, and more.',
    keywords: ['UI/UX Design', 'Portfolio', 'Mobile App Design', 'Web Design', 'Design System', 'Case Studies'],
  });

  return (
    <div className="min-h-screen">
      {/* Projects */}
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <SectionHeading
          label="Portfolio"
          title="Selected Works"
          description="A collection of projects I've worked on, showcasing my expertise in UI/UX design across various industries and platforms."
        />

        <div className="grid md:grid-cols-2 gap-16 mt-16 md:mt-24">
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
