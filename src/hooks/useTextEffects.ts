import { useEffect, useState } from 'react'
import { useReducedMotion } from './useReducedMotion'

const GLYPHS = '!@#$%^&*<>{}[]()/\\|=+-_?;:'

function randomGlyph() {
  return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
}

/**
 * Resolves `text` out of terminal junk, left to right — the way a password
 * surfaces in a memory dump. Spaces are kept so the line never reflows.
 */
export function useScramble(text: string, { delay = 0, duration = 700 } = {}): string {
  const reduced = useReducedMotion()
  const [output, setOutput] = useState(() =>
    reduced ? text : text.replace(/\S/g, () => randomGlyph()),
  )

  useEffect(() => {
    if (reduced) {
      setOutput(text)
      return
    }

    let frame = 0
    let last = 0
    const startAt = performance.now() + delay

    const tick = (now: number) => {
      const progress = Math.min(1, Math.max(0, (now - startAt) / duration))
      // Re-roll the junk at ~25fps; faster than that just reads as noise.
      if (now - last > 40 || progress === 1) {
        last = now
        const settled = Math.floor(progress * text.length)
        setOutput(
          text
            .split('')
            .map((char, i) => (i < settled || char === ' ' ? char : randomGlyph()))
            .join(''),
        )
      }
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [text, delay, duration, reduced])

  return output
}

/** Number of characters of `text` typed so far. */
export function useTyped(text: string, { delay = 0, speed = 24 } = {}): number {
  const reduced = useReducedMotion()
  const [count, setCount] = useState(reduced ? text.length : 0)

  useEffect(() => {
    if (reduced) {
      setCount(text.length)
      return
    }

    setCount(0)
    let interval: number | undefined
    const timeout = window.setTimeout(() => {
      interval = window.setInterval(() => {
        setCount((c) => {
          if (c >= text.length) {
            window.clearInterval(interval)
            return c
          }
          return c + 1
        })
      }, speed)
    }, delay)

    return () => {
      window.clearTimeout(timeout)
      window.clearInterval(interval)
    }
  }, [text, delay, speed, reduced])

  return count
}
