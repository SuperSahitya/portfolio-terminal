import { CommandLine } from './CommandLine'
import { Contact } from './Contact'
import { Experience } from './Experience'
import { Footer } from './Footer'
import { Hero } from './Hero'
import { Projects } from './Projects'
import { Stack } from './Stack'
import { TopBar } from './TopBar'

/** The portfolio itself: everything shown once the machine has booted. */
export function Terminal({ onReboot }: { onReboot: () => void }) {
  return (
    <div className="power-on mx-auto w-full max-w-[78ch] px-5 pt-6 sm:px-8 sm:pt-8">
      <TopBar />
      <Hero />
      <main>
        <Experience index={1} />
        <Projects index={2} />
        <Stack index={3} />
        <Contact index={4} />
      </main>
      <CommandLine onReboot={onReboot} />
      <Footer onReboot={onReboot} />
    </div>
  )
}
