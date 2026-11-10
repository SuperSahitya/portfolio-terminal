import { stack } from '../data/content'
import { Section } from './Section'

export function Stack({ index }: { index: number }) {
  return (
    <Section id="stack" index={index} title="Stack">
      <dl className="grid grid-cols-[5.5rem_1fr] gap-x-4 gap-y-3 sm:grid-cols-[11.5rem_1fr] sm:gap-x-8">
        {stack.map((group) => (
          <div key={group.key} className="col-span-2 grid grid-cols-subgrid">
            <dt className="text-sm text-dim uppercase sm:pt-[0.15rem]">{group.key}</dt>
            <dd>{group.items.join(' · ')}</dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}
