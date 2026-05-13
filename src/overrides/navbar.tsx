'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, Search, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'

export const NAVBAR_OVERRIDE_ENABLED = true

const navLinks = [
  { label: 'Articles', href: '/updates' },
  { label: 'About', href: '/about' },
  { label: 'Help', href: '/help' },
  { label: 'Contact', href: '/contact' },
]

export function NavbarOverride() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200/80 bg-white/90 text-neutral-900 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:h-[4.25rem] sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 shrink-0 items-center gap-3">
          <span
            className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white shadow-[0_8px_24px_rgba(15,23,42,0.08)] ring-2 ring-transparent [background:linear-gradient(white,white)_padding-box,conic-gradient(from_200deg,#fde68a,#93c5fd,#6ee7b7,#fde68a)_border-box]"
            aria-hidden
          >
            <img src="/favicon.png?v=20260401" alt="" className="h-7 w-7 object-contain" width={28} height={28} />
          </span>
          <span className="truncate text-lg font-semibold tracking-tight sm:text-xl">{SITE_CONFIG.name}</span>
        </Link>

        <div className="hidden items-center justify-center gap-8 md:flex">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-950"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Link
            href="/search"
            className="hidden rounded-full p-2.5 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900 sm:inline-flex"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </Link>
          <button
            type="button"
            className="inline-flex rounded-full p-2.5 text-neutral-700 hover:bg-neutral-100 md:hidden"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-neutral-100 bg-white px-4 py-4 md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-3 py-3 text-sm font-semibold text-neutral-800 hover:bg-neutral-50"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/search" className="rounded-xl px-3 py-3 text-sm font-semibold text-neutral-800 hover:bg-neutral-50" onClick={() => setOpen(false)}>
              Search
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  )
}
