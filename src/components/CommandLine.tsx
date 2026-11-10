import { useEffect, useRef, useState, type FormEvent } from 'react'
import { profile, sections } from '../data/content'
import { download, isTypingTarget, jumpTo } from '../lib/dom'
import { PHOSPHORS, getPhosphor, isPhosphor, setPhosphor } from '../lib/phosphor'

type Entry = { id: number; command: string; output: string[] }

const HELP = [
  'ls                 list sections',
  'open <section>     jump to a section',
  'resume             download the resume',
  'github | linkedin  open a profile',
  'mail               write to me',
  `color <name>       ${PHOSPHORS.join(' | ')}`,
  'reboot             run the boot sequence again',
  'clear              clear this log',
]

const MAX_ENTRIES = 4

type Context = { onReboot: () => void }

/** Runs one command. Returns the lines to print, or null to wipe the log. */
function run(input: string, { onReboot }: Context): string[] | null {
  const [name, ...args] = input.toLowerCase().split(/\s+/)
  const arg = args.join(' ')

  const section = sections.find((s) => s.id === name || s.id === arg)
  if (section && (section.id === name || ['open', 'cd', 'goto', 'cat'].includes(name))) {
    jumpTo(section.id)
    return [`opening ${section.id}`]
  }

  switch (name) {
    case 'help':
    case '?':
      return HELP
    case 'ls':
      return [[...sections.map((s) => s.id), 'resume.pdf'].join('   ')]
    case 'whoami':
      return [`${profile.name} — ${profile.tagline}`]
    case 'resume':
    case 'resume.pdf':
      download(profile.resume.href, profile.resume.file)
      return [`sending ${profile.resume.file} (${profile.resume.size})`]
    case 'github':
      window.open(profile.github.href, '_blank', 'noopener')
      return [`opening ${profile.github.label}`]
    case 'linkedin':
      window.open(profile.linkedin.href, '_blank', 'noopener')
      return [`opening linkedin.com/${profile.linkedin.label}`]
    case 'mail':
    case 'email':
      window.location.href = `mailto:${profile.email}`
      return [`composing to ${profile.email}`]
    case 'color':
    case 'colour':
      if (isPhosphor(arg)) {
        setPhosphor(arg)
        return [`display set to ${arg}`]
      }
      return [`display is ${getPhosphor()}. options: ${PHOSPHORS.join(', ')}`]
    case 'date':
      return [new Date().toString()]
    case 'reboot':
      onReboot()
      return []
    case 'clear':
      return null
    case 'sudo':
      return ['permission denied. this incident will be reported.']
    case 'open':
    case 'cd':
    case 'cat':
      return [`no such section: ${arg || '(none)'}. try "ls".`]
    default:
      return [`command not found: ${name}. try "help".`]
  }
}

export function CommandLine({ onReboot }: Context) {
  const inputRef = useRef<HTMLInputElement>(null)
  const nextId = useRef(0)
  const [value, setValue] = useState('')
  const [log, setLog] = useState<Entry[]>([])

  // "/" focuses the prompt from anywhere, the way it opens search elsewhere.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== '/' || e.ctrlKey || e.metaKey || isTypingTarget(e.target)) return
      e.preventDefault()
      inputRef.current?.focus()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Output prints above the prompt; keep the prompt on screen as the log grows.
  useEffect(() => {
    if (log.length) inputRef.current?.scrollIntoView({ block: 'nearest' })
  }, [log])

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const command = value.trim()
    setValue('')
    if (!command) return

    const output = run(command, { onReboot })
    setLog((entries) =>
      output === null
        ? []
        : [...entries, { id: nextId.current++, command, output }].slice(-MAX_ENTRIES),
    )
  }

  return (
    <div className="pt-16 sm:pt-24">
      <div aria-live="polite" className="space-y-3 text-sm">
        {log.map((entry) => (
          <div key={entry.id}>
            <p className="text-dim">&gt; {entry.command}</p>
            {entry.output.map((line, i) => (
              <p key={i} className="break-words whitespace-pre-wrap">
                {line}
              </p>
            ))}
          </div>
        ))}
      </div>

      <form
        onSubmit={submit}
        className={`flex items-center gap-[1ch] border-t border-faint pt-4 ${log.length ? 'mt-4' : ''}`}
      >
        <label htmlFor="command" className="select-none">
          &gt;
        </label>
        <input
          id="command"
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder='type "help"'
          aria-label="Command line"
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          enterKeyHint="go"
          className="cmd-input min-w-0 flex-1 bg-transparent text-base outline-none"
        />
        {/* Keyboard hint; pointless on a phone, so it only shows from tablet up. */}
        <kbd className="hidden font-mono text-xs text-dim sm:inline">/ to focus</kbd>
      </form>
    </div>
  )
}
