import { useSyncExternalStore } from 'react'

// Display colour, like the colour setting on an old monochrome monitor.
// The <html data-phosphor> attribute is the source of truth; index.html
// restores it from localStorage before first paint.

export const PHOSPHORS = ['ice', 'green', 'amber'] as const
export type Phosphor = (typeof PHOSPHORS)[number]

/** The palette on :root in index.css, used when nothing is saved. */
const DEFAULT: Phosphor = 'ice'
const KEY = 'phosphor'
const listeners = new Set<() => void>()

export function isPhosphor(value: unknown): value is Phosphor {
  return PHOSPHORS.includes(value as Phosphor)
}

export function getPhosphor(): Phosphor {
  const value = document.documentElement.dataset.phosphor
  return isPhosphor(value) ? value : DEFAULT
}

export function setPhosphor(next: Phosphor) {
  const root = document.documentElement
  if (next === DEFAULT) delete root.dataset.phosphor
  else root.dataset.phosphor = next

  try {
    localStorage.setItem(KEY, next)
  } catch {
    // Storage can be unavailable (private mode); the colour still applies.
  }

  const bg = getComputedStyle(root).getPropertyValue('--bg').trim()
  if (bg) document.querySelector('meta[name="theme-color"]')?.setAttribute('content', bg)

  listeners.forEach((notify) => notify())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export function usePhosphor(): Phosphor {
  return useSyncExternalStore(subscribe, getPhosphor)
}
