import { useCallback, useState } from 'react'
import { BootSequence } from './components/BootSequence'
import { CrtOverlay } from './components/CrtOverlay'
import { Cursor } from './components/Cursor'
import { Terminal } from './components/Terminal'
import { useReducedMotion } from './hooks/useReducedMotion'

export default function App() {
  const reducedMotion = useReducedMotion()
  // Visitors who ask for less motion go straight to the content.
  const [booted, setBooted] = useState(reducedMotion)

  const finishBoot = useCallback(() => setBooted(true), [])
  const reboot = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    setBooted(false)
  }, [])

  return (
    <>
      {booted ? <Terminal onReboot={reboot} /> : <BootSequence onDone={finishBoot} />}
      <CrtOverlay />
      <Cursor />
    </>
  )
}
