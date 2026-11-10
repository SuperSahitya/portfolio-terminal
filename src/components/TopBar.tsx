import { profile } from '../data/content'
import { useNow } from '../hooks/useNow'

const clock = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Kolkata',
  hour: '2-digit',
  minute: '2-digit',
})

export function TopBar() {
  const now = useNow(15_000)

  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-faint pb-3 text-xs tracking-[0.12em] text-dim uppercase">
      <span>SKC Termlink</span>
      <span>
        <span className="hidden sm:inline">{profile.location} · </span>
        <time dateTime={new Date(now).toISOString()}>{clock.format(now)}</time> IST
      </span>
    </div>
  )
}
