/** True when a key press is headed for a text field rather than the page. */
export function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false
  return target.isContentEditable || target.matches('input, textarea, select')
}

/** Scroll a section into view. Smoothness comes from CSS (and respects reduced motion). */
export function jumpTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ block: 'start' })
}

/** Start a file download without navigating away. */
export function download(href: string, filename: string) {
  const a = document.createElement('a')
  a.href = href
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
}
