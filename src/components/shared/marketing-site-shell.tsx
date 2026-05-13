import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'

type MarketingSiteShellProps = {
  eyebrow?: string
  title: string
  description?: string
  actions?: ReactNode
  children: ReactNode
}

/**
 * Static / marketing pages: same visual language as the homepage
 * (neutral type, soft pastel wash, rounded cards, no factory palette branching).
 */
export function MarketingSiteShell({ eyebrow, title, description, actions, children }: MarketingSiteShellProps) {
  return (
    <div className="min-h-screen bg-white text-neutral-950">
      <NavbarShell />
      <header className="relative overflow-hidden border-b border-neutral-200/80">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_-10%,rgba(253,224,71,0.18),transparent_55%),radial-gradient(circle_at_0%_30%,rgba(147,197,253,0.14),transparent_40%),radial-gradient(circle_at_100%_20%,rgba(167,243,208,0.12),transparent_38%)]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-4 pb-12 pt-10 sm:px-6 sm:pb-16 sm:pt-14 lg:px-8">
          {eyebrow ? (
            <span className="inline-flex rounded-full border border-neutral-200/80 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500 shadow-sm">
              {eyebrow}
            </span>
          ) : null}
          <h1
            className={cn(
              'text-4xl font-semibold tracking-[-0.04em] text-neutral-950 sm:text-5xl',
              eyebrow ? 'mt-5' : 'mt-2',
            )}
          >
            {title}
          </h1>
          {description ? (
            <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-neutral-600 sm:text-lg">{description}</p>
          ) : null}
          {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">{children}</div>
      <Footer />
    </div>
  )
}
