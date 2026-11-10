import { useEffect, useRef, useState } from 'react'

/**
 * A text-mode cursor: one inverse-video character cell that follows the mouse.
 *
 * Over anything clickable it stretches to cover the whole target, so the cursor
 * itself becomes the terminal's selection highlight. Over a text field it thins
 * to an insertion bar; left alone it blinks.
 *
 * Only runs with a real mouse — touch and pen keep their native behaviour.
 */

const CLICKABLE = 'a[href], button, [data-cursor="target"]'
const TEXT_FIELD = 'input, textarea'
const CELL = { w: 10, h: 20 }
const IDLE_AFTER_MS = 1600
const EASE_MS = 130

export function Cursor() {
  const ref = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setEnabled(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!enabled || !el) return

    const root = document.documentElement
    root.classList.add('has-cursor')

    let x = -100
    let y = -100
    let target: Element | null = null
    let overText = false
    let frame = 0
    let idleTimer = 0
    let easeTimer = 0

    const draw = () => {
      frame = 0
      if (target && !target.isConnected) target = null

      let left: number, top: number, width: number, height: number
      if (target) {
        const rect = target.getBoundingClientRect()
        ;({ left, top, width, height } = rect)
      } else if (overText) {
        ;[left, top, width, height] = [x - 1, y - CELL.h / 2, 2, CELL.h]
      } else {
        ;[left, top, width, height] = [x - CELL.w / 2, y - CELL.h / 2, CELL.w, CELL.h]
      }

      el.style.transform = `translate3d(${left}px, ${top}px, 0)`
      el.style.width = `${width}px`
      el.style.height = `${height}px`
      el.classList.toggle('is-locked', target !== null)
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(draw)
    }

    // Glide when snapping onto or off a target; track 1:1 otherwise.
    const ease = () => {
      el.classList.add('is-eased')
      window.clearTimeout(easeTimer)
      easeTimer = window.setTimeout(() => {
        if (!target) el.classList.remove('is-eased')
      }, EASE_MS)
    }

    const retarget = (under: Element | null) => {
      const next = under?.closest(CLICKABLE) ?? null
      if (next !== target) {
        target = next
        ease()
      }
      overText = !next && !!under?.closest(TEXT_FIELD)
    }

    const wake = () => {
      el.classList.remove('is-idle')
      window.clearTimeout(idleTimer)
      idleTimer = window.setTimeout(() => {
        if (!target) el.classList.add('is-idle')
      }, IDLE_AFTER_MS)
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      x = e.clientX
      y = e.clientY
      el.classList.add('is-visible')
      retarget(e.target instanceof Element ? e.target : null)
      wake()
      schedule()
    }

    // The page can move under a still mouse.
    const onScroll = () => {
      retarget(document.elementFromPoint(x, y))
      schedule()
    }

    const onDown = () => el.classList.add('is-down')
    const onUp = () => el.classList.remove('is-down')
    const onLeave = () => el.classList.remove('is-visible')

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown, { passive: true })
    window.addEventListener('pointerup', onUp, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true, capture: true })
    window.addEventListener('resize', onScroll, { passive: true })
    root.addEventListener('mouseleave', onLeave)
    window.addEventListener('blur', onLeave)

    return () => {
      root.classList.remove('has-cursor')
      cancelAnimationFrame(frame)
      window.clearTimeout(idleTimer)
      window.clearTimeout(easeTimer)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('scroll', onScroll, { capture: true })
      window.removeEventListener('resize', onScroll)
      root.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('blur', onLeave)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div ref={ref} className="cursor" aria-hidden="true">
      <i />
    </div>
  )
}
