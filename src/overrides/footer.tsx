import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/site-config'

export const FOOTER_OVERRIDE_ENABLED = true

const columns = {
  pages: {
    title: 'Pages',
    links: [
      { name: 'Contact us', href: '/contact' },
      { name: 'About us', href: '/about' },
    ],
  },
  account: {
    title: 'Account',
    links: [
      { name: 'Login', href: '/login' },
      { name: 'Sign up', href: '/register' },
      { name: 'Carrer', href: '/careers' },
    ],
  },
  support: {
    title: 'Support',
    links: [
      { name: 'Search', href: '/search' },
      { name: 'Help', href: '/help' },
    ],
  },
  legal: {
    title: 'Legal',
    links: [
      { name: 'Terms', href: '/terms' },
      { name: 'Privacy', href: '/privacy' },
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

        <div className="mt-10 border-t border-neutral-200/80 pt-6 text-sm text-neutral-500">
          <p>&copy; {year} {SITE_CONFIG.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
