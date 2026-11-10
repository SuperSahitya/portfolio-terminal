import { useEffect, useState } from 'react'
import { profile } from '../data/content'
import { Section } from './Section'

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = window.setTimeout(() => setCopied(false), 1600)
    return () => window.clearTimeout(timer)
  }, [copied])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
    } catch {
      // Clipboard blocked: the address is on screen and the mailto link still works.
    }
  }

  return (
    <button type="button" className="lnk text-sm text-dim uppercase" onClick={copy}>
      <span aria-live="polite">[ {copied ? 'copied' : 'copy'} ]</span>
    </button>
  )
}

export function Contact({ index }: { index: number }) {
  const rows = [
    {
      key: 'Mail',
      value: (
        <span className="flex flex-wrap items-baseline gap-x-4">
          <a className="lnk" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          <CopyButton text={profile.email} />
        </span>
      ),
    },
    {
      key: 'GitHub',
      value: (
        <a className="lnk" href={profile.github.href} target="_blank" rel="noreferrer">
          {profile.github.label}
        </a>
      ),
    },
    {
      key: 'LinkedIn',
      value: (
        <a className="lnk" href={profile.linkedin.href} target="_blank" rel="noreferrer">
          {profile.linkedin.label}
        </a>
      ),
    },
    {
      key: 'Resume',
      value: (
        <a className="lnk" href={profile.resume.href} download={profile.resume.file}>
          download PDF <span className="text-dim">· {profile.resume.size}</span>
        </a>
      ),
    },
  ]

  return (
    <Section id="contact" index={index} title="Contact">
      <p className="max-w-[58ch]">Email is the fastest way to reach me.</p>
      <dl className="mt-6 grid grid-cols-1 gap-y-3 sm:grid-cols-[11.5rem_1fr] sm:gap-x-8">
        {rows.map((row) => (
          <div key={row.key} className="grid sm:col-span-2 sm:grid-cols-subgrid">
            <dt className="text-sm text-dim uppercase sm:pt-[0.15rem]">{row.key}</dt>
            <dd className="min-w-0">{row.value}</dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}
