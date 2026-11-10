import { projects } from '../data/content'
import { Section } from './Section'

export function Projects({ index }: { index: number }) {
  return (
    <Section id="projects" index={index} title="Projects">
      <div className="space-y-14">
        {projects.map((project) => (
          <article key={project.name}>
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="font-display text-4xl leading-none font-normal uppercase">
                {project.name}
              </h3>
              <a
                className="lnk text-sm uppercase"
                href={project.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.name} source code on GitHub`}
              >
                [ source ]
              </a>
            </div>
            <p className="mt-2 text-dim">{project.blurb}</p>

            {/* Readouts: the measured number first, what it measures second. */}
            <dl className="mt-5 grid grid-cols-[auto_1fr] items-baseline gap-x-5 gap-y-2">
              {project.stats.map((stat) => (
                <div key={stat.label} className="col-span-2 grid grid-cols-subgrid items-baseline">
                  <dt className="order-2 text-sm text-dim sm:text-base">{stat.label}</dt>
                  <dd className="order-1 font-display text-3xl leading-none">{stat.value}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-5 text-xs tracking-[0.08em] text-dim uppercase">
              {project.tech.join(' · ')}
            </p>
          </article>
        ))}
      </div>
    </Section>
  )
}
