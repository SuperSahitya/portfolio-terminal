import type { CSSProperties, ReactNode } from 'react'
import { useReveal } from '../hooks/useReveal'

type Props = {
  id: string
  /** Position in the page, shown as "01", "02"… */
  index: number
  title: string
  children: ReactNode
}

/** A titled block. The heading types itself in the first time it scrolls into view. */
export function Section({ id, index, title, children }: Props) {
  const [ref, inView] = useReveal<HTMLElement>()
  const label = `${String(index).padStart(2, '0')} / ${title}`

  const typing: CSSProperties = {
    animationDuration: `${label.length * 32}ms`,
    animationTimingFunction: `steps(${label.length})`,
  }

  return (
    <section
      id={id}
      ref={ref}
      data-reveal={inView ? 'in' : 'out'}
      aria-labelledby={`${id}-heading`}
      className="pt-16 sm:pt-24"
    >
      <h2
        id={`${id}-heading`}
        className="flex items-center gap-4 text-sm font-medium tracking-[0.18em] uppercase"
      >
        <span className="type-in" style={typing}>
          {label}
        </span>
        <span aria-hidden="true" className="h-px flex-1 bg-faint" />
      </h2>
      <div className="reveal-body mt-8">{children}</div>
    </section>
  )
}
