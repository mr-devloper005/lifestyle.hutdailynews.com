import Link from 'next/link'
import { ArrowRight, Globe2, Newspaper, Shield } from 'lucide-react'
import { MarketingSiteShell } from '@/components/shared/marketing-site-shell'
import { SITE_CONFIG } from '@/lib/site-config'

const pillars = [
  {
    title: 'Clarity over noise',
    body: 'We publish guest and desk-authored updates in a calm layout—strong typography, obvious hierarchy, and summaries that respect busy readers.',
  },
  {
    title: 'Distribution-first',
    body: 'Stories are built to travel: consistent cards, stable URLs, and metadata that behave when links are shared in newsletters, social, or partner sites.',
  },
  {
    title: 'Editorial integrity',
    body: 'Attribution, corrections, and a visible contact path matter. We aim to make the chain from writer to reader transparent.',
  },
]

const milestones = [
  { year: '2024', label: 'Foundation', text: 'Launched a focused archive for press-style updates and partner announcements.' },
  { year: '2025', label: 'Guest program', text: 'Expanded guest voices alongside desk coverage while keeping a single reading rhythm.' },
  { year: '2026', label: 'Distribution polish', text: 'Refreshed the public experience around search, home surfacing, and cross-channel previews.' },
]

export default function AboutPage() {
  return (
    <MarketingSiteShell
      eyebrow="Company"
      title={`About ${SITE_CONFIG.name}`}
      description={`${SITE_CONFIG.name} is an independent media distribution surface: guest posts, newsroom updates, and readable archives—without turning the site into a generic social feed.`}
      actions={
        <>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-neutral-950 px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_32px_rgba(0,0,0,0.15)] transition hover:bg-neutral-800"
          >
            Work with us
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/updates"
            className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-5 py-3 text-sm font-semibold text-neutral-900 shadow-sm transition hover:bg-neutral-50"
          >
            Read latest updates
          </Link>
        </>
      }
    >
      <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
        <div className="rounded-[1.35rem] border border-neutral-200/80 bg-gradient-to-br from-amber-50/80 via-white to-sky-50/50 p-8 shadow-[0_16px_48px_rgba(15,23,42,0.06)]">
          <Newspaper className="h-8 w-8 text-neutral-800" strokeWidth={1.5} />
          <h2 className="mt-5 text-2xl font-semibold tracking-tight text-neutral-950">What we optimize for</h2>
          <p className="mt-4 text-sm leading-relaxed text-neutral-700">
            {SITE_CONFIG.description}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-neutral-700">
            Our tagline—<span className="font-medium text-neutral-900">{SITE_CONFIG.tagline}</span>—is the bar for what belongs on the homepage and in the archive: timely, factual, and easy to pass along.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/90 px-3 py-1.5 text-xs font-semibold text-neutral-700 shadow-sm">
              <Globe2 className="h-3.5 w-3.5" /> Syndication-ready pages
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/90 px-3 py-1.5 text-xs font-semibold text-neutral-700 shadow-sm">
              <Shield className="h-3.5 w-3.5" /> Corrections-friendly
            </span>
          </div>
        </div>

        <div className="space-y-4">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="rounded-[1.25rem] border border-neutral-200/80 bg-white p-6 shadow-[0_10px_36px_rgba(15,23,42,0.05)]"
            >
              <h3 className="text-lg font-semibold tracking-tight text-neutral-950">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">{p.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">Timeline</h2>
        <p className="mt-2 max-w-2xl text-sm text-neutral-600">
          A lightweight history of how the product direction stayed anchored on readers and distribution partners.
        </p>
        <ol className="mt-8 space-y-6 border-l-2 border-neutral-200 pl-8">
          {milestones.map((m) => (
            <li key={m.year} className="relative">
              <span className="absolute -left-[calc(2rem+5px)] top-1 flex h-3 w-3 rounded-full bg-neutral-950 ring-4 ring-amber-50" aria-hidden />
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">
                {m.year} · {m.label}
              </p>
              <p className="mt-1 text-sm font-medium text-neutral-950">{m.text}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-16 rounded-[1.35rem] border border-neutral-200/80 bg-neutral-50/70 p-8 text-center">
        <p className="text-sm font-semibold text-neutral-950">Team & masthead</p>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-neutral-600">
          Editorial credits appear on individual pieces. For masthead or speaker requests, reach out through{' '}
          <Link href="/contact" className="font-semibold text-neutral-950 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-950">
            Contact
          </Link>
          .
        </p>
      </div>
    </MarketingSiteShell>
  )
}
