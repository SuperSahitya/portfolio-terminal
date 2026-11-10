import { useRef } from 'react'
import { profile } from '../data/content'
import { useNow } from '../hooks/useNow'
import { PHOSPHORS, setPhosphor, usePhosphor } from '../lib/phosphor'

function formatUptime(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000))
  const part = (n: number) => String(n).padStart(2, '0')
  return `${part(Math.floor(total / 3600))}:${part(Math.floor(total / 60) % 60)}:${part(total % 60)}`
}

function Uptime() {
  const startedAt = useRef(Date.now())
  const now = useNow(1000)
  return <span className="tabular-nums">{formatUptime(now - startedAt.current)}</span>
}

export function Footer({ onReboot }: { onReboot: () => void }) {
  const phosphor = usePhosphor()

  return (
    <footer className="mt-10 pb-10 text-xs tracking-[0.08em] text-dim uppercase">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3">
        <div role="group" aria-label="Display colour" className="flex items-baseline gap-x-4">
          <span>Display</span>
          {PHOSPHORS.map((name) => (
            <button
              key={name}
              type="button"
              aria-pressed={phosphor === name}
              onClick={() => setPhosphor(name)}
              className={`lnk uppercase ${phosphor === name ? 'text-phosphor' : ''}`}
            >
              {phosphor === name ? `[${name}]` : name}
            </button>
          ))}
        </div>
        <button type="button" onClick={onReboot} className="lnk uppercase">
          [ reboot ]
        </button>
      </div>

      <p className="mt-5 flex flex-wrap gap-x-6 gap-y-1 normal-case">
        <span className="uppercase">
          Uptime <Uptime />
        </span>
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <span>No trackers. No cookies.</span>
      </p>
    </footer>
  )
}
