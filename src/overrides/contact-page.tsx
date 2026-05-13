import Link from 'next/link'
import { ArrowRight, Clock, Mail, MapPin, MessageSquare } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { ContactMessageForm } from '@/components/contact/contact-message-form'

export const CONTACT_PAGE_OVERRIDE_ENABLED = true

const lanes = [
  {
    title: 'Guest posts & pitches',
    body: 'Send a headline, outline, bio, and two links to representative work. We reply when there is a fit—please allow several business days.',
    icon: MessageSquare,
  },
  {
    title: 'Corrections & clarifications',
    body: 'Include the article URL, the sentence or chart in question, and the corrected language. We prioritize factual errors and broken links.',
    icon: Mail,
  },
  {
    title: 'Partnerships & syndication',
    body: 'Newsletters, republishing, and co-branded distribution: outline audience size, territory, and timing so we can evaluate quickly.',
    icon: MapPin,
  },
]

export function ContactPageOverride() {
  return (
    <div className="min-h-screen bg-white text-neutral-950">
      <NavbarShell />
      <header className="relative overflow-hidden border-b border-neutral-200/80">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_-10%,rgba(253,224,71,0.18),transparent_55%),radial-gradient(circle_at_0%_30%,rgba(147,197,253,0.14),transparent_40%),radial-gradient(circle_at_100%_20%,rgba(167,243,208,0.12),transparent_38%)]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-4 pb-12 pt-10 sm:px-6 sm:pb-16 sm:pt-14 lg:px-8">
          <span className="inline-flex rounded-full border border-neutral-200/80 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500 shadow-sm">
            Company
          </span>
          <h1 className="mt-5 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Contact the desk</h1>
          <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-neutral-600 sm:text-lg">
            Editorial questions, guest submissions, corrections, and partnership notes all start here. Choose the lane that best matches your request so the right
            person sees it first.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/help"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-900 shadow-sm transition hover:bg-neutral-50"
            >
              Help center
            </Link>
            <Link
              href="/updates"
              className="inline-flex items-center gap-2 rounded-full bg-neutral-950 px-6 py-2.5 text-sm font-semibold text-white shadow-[0_12px_32px_rgba(0,0,0,0.15)] transition hover:bg-neutral-800"
            >
              Browse updates
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-start">
          <div className="space-y-4">
            {lanes.map((lane) => (
              <div
                key={lane.title}
                className="rounded-[1.35rem] border border-neutral-200/80 bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,0.06)]"
              >
                <lane.icon className="h-6 w-6 text-neutral-700" strokeWidth={1.75} />
                <h2 className="mt-4 text-lg font-semibold tracking-tight text-neutral-950">{lane.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{lane.body}</p>
              </div>
            ))}

            <div className="flex items-start gap-3 rounded-[1.25rem] border border-neutral-200/80 bg-neutral-50/80 p-5 text-sm text-neutral-600">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-neutral-500" />
              <p>
                <span className="font-semibold text-neutral-950">Response windows.</span> We read every message; complex syndication or legal questions may need extra
                time. Urgent corrections in published copy should say “Correction” in the subject line.
              </p>
            </div>
          </div>

          <div className="rounded-[1.35rem] border border-neutral-200/80 bg-gradient-to-b from-white to-neutral-50/80 p-6 shadow-[0_16px_48px_rgba(15,23,42,0.08)] sm:p-8">
            <h2 className="text-xl font-semibold tracking-tight text-neutral-950">Direct lines</h2>
            <p className="mt-2 text-sm text-neutral-600">
              Prefer email? Use the addresses below. Or use the form— it opens your mail app with everything filled in (update the example addresses in code when you go live).
            </p>

            <div className="mt-8 space-y-5">
              <div className="rounded-2xl border border-neutral-100 bg-white/90 p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">Editorial desk</p>
                <a href="mailto:editor@example.com" className="mt-2 block text-lg font-semibold text-neutral-950 hover:underline">
                  editor@example.com
                </a>
                <p className="mt-2 text-xs text-neutral-500">Pitches, guests, corrections tied to a story.</p>
              </div>
              <div className="rounded-2xl border border-neutral-100 bg-white/90 p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">General & partnerships</p>
                <a href="mailto:contact@example.com" className="mt-2 block text-lg font-semibold text-neutral-950 hover:underline">
                  contact@example.com
                </a>
                <p className="mt-2 text-xs text-neutral-500">Press, billing, access, or anything cross-team.</p>
              </div>
            </div>

            <ContactMessageForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
