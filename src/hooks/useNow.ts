import { useEffect, useState } from 'react'

/** Current time, refreshed every `intervalMs`. Pauses while the tab is hidden. */
export function useNow(intervalMs: number): number {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    let timer: number | undefined

    const start = () => {
      setNow(Date.now())
      timer = window.setInterval(() => setNow(Date.now()), intervalMs)
    }
    const stop = () => window.clearInterval(timer)
    const onVisibility = () => {
      stop()
      if (!document.hidden) start()
    }

    start()
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      stop()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [intervalMs])

  return now
}
