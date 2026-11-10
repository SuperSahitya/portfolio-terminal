import { useCallback, useEffect, useRef, useState } from 'react'

type Line = {
  text: string
  /** Right-aligned result, joined to the text by a dotted leader. */
  status?: string
  /** Milliseconds to wait before this line prints. */
  delay: number
}

const LINES: Line[] = [
  { text: 'SKC TERMLINK BIOS v2.26', delay: 60 },
  { text: 'MEMORY CHECK', status: '640K OK', delay: 170 },
  { text: 'PHOSPHOR WARM-UP', status: 'OK', delay: 130 },
  { text: 'VISITOR', status: 'DETECTED', delay: 150 },
  { text: ' ', delay: 60 },
  { text: '$ boot --profile sahitya', delay: 190 },
  { text: 'mounting /home/sahitya', delay: 170 },
  { text: '+ experience.log', status: 'ok', delay: 120 },
  { text: '+ projects/', status: 'ok', delay: 75 },
  { text: '+ contact.card', status: 'ok', delay: 95 },
  { text: '+ resume.pdf', status: 'ok', delay: 85 },
  { text: '4 entries · 0 errors · 1 engineer', delay: 190 },
]

type Props = { onDone: () => void }

export function BootSequence({ onDone }: Props) {
  const [printed, setPrinted] = useState(0)
  const [progress, setProgress] = useState(0)
  const finished = useRef(false)

  const finish = useCallback(() => {
    if (finished.current) return
    finished.current = true
    onDone()
  }, [onDone])

  // Print the log one line at a time.
  useEffect(() => {
    if (printed >= LINES.length) return
    const timer = window.setTimeout(() => setPrinted((n) => n + 1), LINES[printed].delay)
    return () => window.clearTimeout(timer)
  }, [printed])

  // Then fill the bar in uneven steps, the way real loaders stutter.
  const loading = printed >= LINES.length
  useEffect(() => {
    if (!loading) return
    const timer =
      progress >= 100
        ? window.setTimeout(finish, 240)
        : window.setTimeout(
            () => setProgress((p) => Math.min(100, p + 5 + Math.random() * 16)),
            48,
          )
    return () => window.clearTimeout(timer)
  }, [loading, progress, finish])

  // Any key or click skips straight to the site.
  useEffect(() => {
    window.addEventListener('keydown', finish)
    window.addEventListener('pointerdown', finish)
    return () => {
      window.removeEventListener('keydown', finish)
      window.removeEventListener('pointerdown', finish)
    }
  }, [finish])

  return (
    <div
      role="status"
      aria-label="Loading portfolio"
      className="mx-auto flex min-h-dvh w-full max-w-[78ch] flex-col px-5 py-8 text-sm sm:px-8 sm:text-base"
    >
      <div aria-hidden="true" className="max-w-[46ch]">
        {LINES.slice(0, printed).map((line, i) => (
          <div key={i} className="flex items-baseline">
            <span className={line.status ? 'pl-[2ch]' : undefined}>{line.text}</span>
            {line.status && (
              <>
                <span className="leader" />
                <span>{line.status}</span>
              </>
            )}
          </div>
        ))}

        {loading ? (
          <div className="mt-6">
            <div className="flex justify-between text-dim">
              <span>PLEASE STAND BY</span>
              <span>{Math.floor(progress)}%</span>
            </div>
            <div className="mt-2 border border-faint p-[3px]">
              <div className="boot-bar" style={{ width: `${progress}%` }} />
            </div>
          </div>
        ) : (
          <span className="caret" />
        )}
      </div>

      <p aria-hidden="true" className="mt-auto pt-8 text-xs text-dim">
        press any key to skip
      </p>
    </div>
  )
}
