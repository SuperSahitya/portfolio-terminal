import { useEffect } from 'react'
import { profile, sections } from '../data/content'
import { useScramble, useTyped } from '../hooks/useTextEffects'
import { download, isTypingTarget, jumpTo } from '../lib/dom'

// Timings are staged so the name resolves first, then the tagline types.
const NAME_DELAY = 380
const NAME_DURATION = 720
const TAGLINE_DELAY = NAME_DELAY + NAME_DURATION + 120

export function Hero() {
  const name = useScramble(profile.name.toUpperCase(), {
    delay: NAME_DELAY,
    duration: NAME_DURATION,
  })
  const typed = useTyped(profile.tagline, { delay: TAGLINE_DELAY })

  // Number keys work the menu, like a real terminal.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey || isTypingTarget(e.target)) return
      const section = sections[Number(e.key) - 1]
      if (section) jumpTo(section.id)
      else if (e.key.toLowerCase() === 'r') download(profile.resume.href, profile.resume.file)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header className="pt-10 sm:pt-16">
      <p className="text-sm text-dim">&gt; whoami</p>

      <h1
        aria-label={profile.name}
        className="mt-4 font-display text-[clamp(3.25rem,14.5vw,5.25rem)] leading-[0.82] font-normal"
      >
        <span aria-hidden="true">{name}</span>
      </h1>

      <p className="mt-6 text-base sm:text-lg" aria-label={profile.tagline}>
        <span aria-hidden="true">
          {profile.tagline.slice(0, typed)}
          <span className="caret" />
          {/* The untyped remainder holds its space so nothing below shifts. */}
          <span className="invisible">{profile.tagline.slice(typed)}</span>
        </span>
      </p>

      <p className="mt-5 max-w-[62ch] text-dim">{profile.intro}</p>

      <nav aria-label="Sections" className="mt-9">
        <ul className="space-y-2.5 uppercase sm:space-y-1">
          {sections.map((section, i) => (
            <li key={section.id}>
              <a className="lnk" href={`#${section.id}`}>
                <span className="text-dim">[{i + 1}]</span> {section.title}
              </a>
            </li>
          ))}
          <li className="pt-3">
            <a className="lnk" href={profile.resume.href} download={profile.resume.file}>
              <span className="text-dim">[R]</span> Download resume
              <span className="text-dim"> · PDF {profile.resume.size}</span>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
