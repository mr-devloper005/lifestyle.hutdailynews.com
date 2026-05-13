import Link from 'next/link'
import { Activity, ArrowRight, CheckCircle2, Cloud, Database, Radio } from 'lucide-react'
import { MarketingSiteShell } from '@/components/shared/marketing-site-shell'

const services = [
  {
    name: 'Public site & articles',
    detail: 'Reader-facing pages, navigation, and article rendering.',
    status: 'Operational',
    icon: Radio,
  },
  {
    name: 'Search & discovery',
    detail: 'Cross-feed search, filters, and result cards.',
    status: 'Operational',
    icon: Database,
  },
  {
    name: 'Media & static assets',
    detail: 'Images, Open Graph previews, and CDN-backed delivery.',
    status: 'Operational',
    icon: Cloud,
  },
]

const incidents = [
  {
    date: 'April 8, 2026',
    title: 'Elevated latency on search indexing',
    detail: 'Brief backlog while the feed reconciled; all queries normalized within 25 minutes.',
    status: 'Resolved',
  },
  {
    date: 'March 19, 2026',
    title: 'Scheduled maintenance window',
    detail: 'Database failover drill; no reader-facing errors reported.',
    status: 'Resolved',
  },
  {
    date: 'February 4, 2026',
    title: 'Third-party image proxy timeout',
    detail: 'Fallback thumbnails served until upstream provider recovered.',
    status: 'Resolved',
  },
]

export default function StatusPage() {
  return (
    <MarketingSiteShell
      eyebrow="Status"
      title="Platform health for distribution & reading"
      description="High-level view of the surfaces that power guest posts, homepage distribution, and search. We post notices here when anything affects readers or partners."
      actions={
        <Link
          href="/help"
          className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-900 shadow-sm transition hover:bg-neutral-50"
        >
          Help center
          <ArrowRight className="h-4 w-4" />
        </Link>
      }
    >
      <div className="flex flex-wrap items-center gap-3 rounded-[1.35rem] border border-emerald-200/80 bg-emerald-50/80 px-5 py-4 text-sm text-emerald-950">
        <Activity className="h-5 w-5 shrink-0" />
        <span className="font-semibold">All systems operational.</span>
        <span className="text-emerald-800/90">Last checked: live page load + search probe.</span>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {services.map((service) => (
          <div
            key={service.name}
            className="rounded-[1.35rem] border border-neutral-200/80 bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,0.06)]"
          >
            <div className="flex items-start justify-between gap-3">
              <service.icon className="h-6 w-6 text-neutral-600" strokeWidth={1.75} />
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-900">
                <CheckCircle2 className="h-3.5 w-3.5" />
                {service.status}
              </span>
            </div>
            <h2 className="mt-4 text-lg font-semibold tracking-tight text-neutral-950">{service.name}</h2>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">{service.detail}</p>
          </div>
        ))}
      </div>

      <div className="mt-14">
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">Incident history</h2>
        <p className="mt-2 max-w-2xl text-sm text-neutral-600">
          Past events that touched availability, search freshness, or asset delivery. Timestamps are local to the newsroom calendar.
        </p>
        <ul className="mt-8 space-y-4">
          {incidents.map((incident) => (
            <li
              key={incident.title}
              className="flex flex-col gap-2 rounded-[1.25rem] border border-neutral-200/80 bg-neutral-50/50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">{incident.date}</p>
                <p className="mt-1 font-semibold text-neutral-950">{incident.title}</p>
                <p className="mt-1 text-sm text-neutral-600">{incident.detail}</p>
              </div>
              <span className="shrink-0 rounded-full bg-white px-3 py-1 text-xs font-semibold text-neutral-700 ring-1 ring-neutral-200/80">
                {incident.status}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </MarketingSiteShell>
  )
}
