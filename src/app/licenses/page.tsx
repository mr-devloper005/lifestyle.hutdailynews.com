import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { MarketingSiteShell } from '@/components/shared/marketing-site-shell'

const stack = [
  { name: 'Next.js', license: 'MIT', href: 'https://github.com/vercel/next.js/blob/canary/license.md' },
  { name: 'React', license: 'MIT', href: 'https://github.com/facebook/react/blob/main/LICENSE' },
  { name: 'Tailwind CSS', license: 'MIT', href: 'https://github.com/tailwindlabs/tailwindcss/blob/master/LICENSE' },
  { name: 'Radix UI', license: 'MIT', href: 'https://github.com/radix-ui/primitives/blob/main/LICENSE' },
  { name: 'Lucide (icons)', license: 'ISC', href: 'https://github.com/lucide-icons/lucide/blob/main/LICENSE' },
  { name: 'date-fns', license: 'MIT', href: 'https://github.com/date-fns/date-fns/blob/master/LICENSE.md' },
  { name: 'Zod', license: 'MIT', href: 'https://github.com/colinhacks/zod/blob/master/LICENSE' },
  { name: 'Framer Motion', license: 'MIT', href: 'https://github.com/framer/motion/blob/main/LICENSE.md' },
]

export default function LicensesPage() {
  return (
    <MarketingSiteShell
      eyebrow="Resources"
      title="Open source & licenses"
      description="This site is assembled from high-quality open tools. We list core dependencies and their licenses as a courtesy to contributors and auditors."
      actions={
        <Link
          href="/help"
          className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-950 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-950"
        >
          Help center →
        </Link>
      }
    >
      <div className="rounded-[1.35rem] border border-neutral-200/80 bg-gradient-to-br from-sky-50/60 via-white to-amber-50/50 p-8 shadow-[0_12px_40px_rgba(15,23,42,0.06)]">
        <h2 className="text-lg font-semibold text-neutral-950">Attribution</h2>
        <p className="mt-3 text-sm leading-relaxed text-neutral-700">
          Thank you to the maintainers of the projects below. License texts are maintained by each upstream repository; the links open the canonical source.
        </p>
      </div>

      <ul className="mt-10 divide-y divide-neutral-200/80 rounded-[1.35rem] border border-neutral-200/80 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.06)]">
        {stack.map((item) => (
          <li key={item.name} className="flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold text-neutral-950">{item.name}</p>
              <p className="text-sm text-neutral-600">{item.license} License</p>
            </div>
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-950 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-950"
            >
              View license
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </li>
        ))}
      </ul>

      <p className="mt-10 text-center text-sm text-neutral-600">
        Missing a package?{' '}
        <Link href="/contact" className="font-semibold text-neutral-950 underline underline-offset-2">
          Let us know
        </Link>{' '}
        and we will add it to the acknowledgements list.
      </p>
    </MarketingSiteShell>
  )
}
