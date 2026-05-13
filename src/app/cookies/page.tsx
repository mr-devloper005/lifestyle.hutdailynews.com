import Link from 'next/link'
import { MarketingSiteShell } from '@/components/shared/marketing-site-shell'

const rows = [
  {
    name: 'Essential',
    purpose: 'Security, load balancing, and basic session stability for the public site.',
    duration: 'Session or short-lived',
  },
  {
    name: 'Preferences',
    purpose: 'Remember choices such as theme where offered, without requiring an account.',
    duration: 'Up to 12 months',
  },
  {
    name: 'Analytics (aggregate)',
    purpose: 'Understand traffic patterns, popular articles, and device types in aggregate.',
    duration: 'Up to 24 months',
  },
]

const sections = [
  {
    title: 'What are cookies?',
    body: 'Cookies are small text files stored on your device. They help the site remember state between pages, measure performance, and keep certain experiences consistent.',
  },
  {
    title: 'How we use them here',
    body: 'Because this is primarily a reading site, we keep tracking light. Essential cookies may be required for security. Analytics cookies, if present, are used in aggregate to improve layout and discover broken pages.',
  },
  {
    title: 'Managing cookies',
    body: 'You can clear or block cookies through your browser settings. Blocking all cookies may affect minor conveniences but should not block public reading of articles.',
  },
  {
    title: 'Updates',
    body: 'When we materially change how cookies are used, we will update this page and adjust the “last updated” date below.',
  },
]

export default function CookiesPage() {
  return (
    <MarketingSiteShell
      eyebrow="Legal"
      title="Cookie Policy"
      description="Transparency about cookies and similar technologies on this media distribution site."
      actions={
        <Link href="/privacy" className="text-sm font-semibold text-neutral-950 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-950">
          Privacy policy →
        </Link>
      }
    >
      <p className="text-sm text-neutral-500">Last updated: April 23, 2026</p>

      <div className="mt-10 overflow-hidden rounded-[1.35rem] border border-neutral-200/80 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.06)]">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-neutral-200 bg-neutral-50/90 text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">
              <th className="px-5 py-3">Category</th>
              <th className="px-5 py-3">Purpose</th>
              <th className="hidden px-5 py-3 sm:table-cell">Typical duration</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.name} className="border-b border-neutral-100 last:border-0">
                <td className="px-5 py-4 font-semibold text-neutral-950">{row.name}</td>
                <td className="px-5 py-4 text-neutral-600">{row.purpose}</td>
                <td className="hidden px-5 py-4 text-neutral-600 sm:table-cell">{row.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-10 space-y-4">
        {sections.map((s) => (
          <section key={s.title} className="rounded-[1.25rem] border border-neutral-200/80 bg-neutral-50/50 p-6 sm:p-7">
            <h2 className="text-lg font-semibold tracking-tight text-neutral-950">{s.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600">{s.body}</p>
          </section>
        ))}
      </div>
    </MarketingSiteShell>
  )
}
