import { experience } from '../data/content'
import { Section } from './Section'

export function Experience({ index }: { index: number }) {
  return (
    <Section id="experience" index={index} title="Experience">
      <ol className="space-y-9">
        {experience.map((job) => (
          <li key={job.org + job.period} className="grid gap-x-8 gap-y-1 sm:grid-cols-[11.5rem_1fr]">
            <p className="text-sm text-dim uppercase sm:pt-[0.15rem]">{job.period}</p>
            <div>
              <h3 className="font-medium uppercase">{job.org}</h3>
              <p className="text-sm text-dim">
                {job.role}
                {job.place && ` · ${job.place}`}
              </p>
              <p className="mt-2 max-w-[58ch]">{job.summary}</p>
              {job.link && (
                <a
                  className="lnk mt-2 text-sm"
                  href={job.link.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  [ {job.link.label} ]
                </a>
              )}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}
