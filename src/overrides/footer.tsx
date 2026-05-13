import Link from 'next/link'
import { Github, Linkedin } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'

export const FOOTER_OVERRIDE_ENABLED = true

const columns = {
  distribute: {
    title: 'Distribute',
    links: [
      { name: 'Latest articles', href: '/updates' },
      { name: 'Help center', href: '/help' },
      { name: 'Status', href: '/status' },
    ],
  },
  company: {
    title: 'Company',
    links: [
      { name: 'About', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Community', href: '/community' },
    ],
  },
  resources: {
    title: 'Resources',
    links: [
      { name: 'Developers', href: '/developers' },
      { name: 'Blog', href: '/blog' },
      { name: 'Licenses', href: '/licenses' },
    ],
  },
  legal: {
    title: 'Legal',
    links: [
      { name: 'Privacy', href: '/privacy' },
      { name: 'Terms', href: '/terms' },
      { name: 'Cookies', href: '/cookies' },
    ],
  },
} as const

export function FooterOverride() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-neutral-200/80 bg-neutral-50/80">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.2fr_repeat(4,minmax(0,1fr))] lg:gap-8">
          <div className="lg:pr-6">
            <Link href="/" className="inline-flex items-center gap-2 text-lg font-semibold tracking-tight text-neutral-950">
              <span
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-neutral-200/80"
                aria-hidden
              >
                <img src="/favicon.png?v=20260401" alt="" className="h-6 w-6 object-contain" width={24} height={24} />
              </span>
              {SITE_CONFIG.name}
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-neutral-600">{SITE_CONFIG.description}</p>
          </div>
          {(Object.keys(columns) as (keyof typeof columns)[]).map((key) => (
            <div key={key}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">{columns[key].title}</h3>
              <ul className="mt-4 space-y-3 text-sm text-neutral-600">
                {columns[key].links.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="transition hover:text-neutral-950">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-neutral-200/80 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 transition hover:border-neutral-300 hover:text-neutral-950"
              aria-label="X"
            >
              <span className="text-xs font-bold">𝕏</span>
            </Link>
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 transition hover:border-neutral-300 hover:text-neutral-950"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 transition hover:border-neutral-300 hover:text-neutral-950"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </Link>
          </div>
          <Link
            href="/contact"
            className="inline-flex w-fit items-center justify-center rounded-full border border-neutral-200 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-900 shadow-sm transition hover:bg-neutral-50"
          >
            Contact us
          </Link>
        </div>

        <div className="mt-10 flex flex-col gap-3 text-sm text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/privacy" className="hover:text-neutral-800">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-neutral-800">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
