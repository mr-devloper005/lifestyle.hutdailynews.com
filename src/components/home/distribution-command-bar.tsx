'use client'

import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Diamond } from 'lucide-react'

const PLACEHOLDER = 'Ask for a digest, channel mix, or export preview…'

export function DistributionCommandBar() {
  const router = useRouter()
  const [value, setValue] = useState('')

  const runSearch = useCallback(() => {
    const q = value.trim()
    const params = new URLSearchParams()
    params.set('master', '1')
    if (q.length) params.set('q', q)
    router.push(`/search?${params.toString()}`)
  }, [router, value])

  return (
    <div className="mt-5">
      <form
        role="search"
        className="flex w-full items-center gap-3 rounded-full border border-neutral-200/90 bg-neutral-50 px-4 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] transition focus-within:border-neutral-300 focus-within:bg-white focus-within:ring-2 focus-within:ring-neutral-950/10 sm:px-5 sm:py-3"
        onSubmit={(e) => {
          e.preventDefault()
          runSearch()
        }}
      >
        <Diamond className="h-4 w-4 shrink-0 text-neutral-400" strokeWidth={1.75} aria-hidden />
        <label htmlFor="distribution-command" className="sr-only">
          Search articles and posts
        </label>
        <input
          id="distribution-command"
          type="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={PLACEHOLDER}
          autoComplete="off"
          className="min-w-0 flex-1 bg-transparent text-sm text-neutral-900 outline-none placeholder:text-neutral-400"
        />
        <button
          type="submit"
          className="shrink-0 rounded-full bg-neutral-950 px-4 py-2 text-xs font-semibold text-white transition hover:bg-neutral-800 sm:text-sm"
        >
          Search
        </button>
      </form>
      <div className="mt-2 flex flex-wrap gap-2">
        {[
          { label: 'Latest digest', q: 'news update weekly' },
          { label: 'Channel mix', q: 'social newsletter web' },
          { label: 'Export preview', q: 'press release announcement' },
        ].map((chip) => (
          <button
            key={chip.label}
            type="button"
            className="rounded-full border border-neutral-200/90 bg-white px-3 py-1 text-xs font-medium text-neutral-600 shadow-sm transition hover:border-neutral-300 hover:text-neutral-900"
            onClick={() => {
              setValue(chip.q)
              const params = new URLSearchParams()
              params.set('master', '1')
              params.set('q', chip.q)
              router.push(`/search?${params.toString()}`)
            }}
          >
            {chip.label}
          </button>
        ))}
      </div>
    </div>
  )
}
