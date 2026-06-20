'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ContentImage } from '@/components/shared/content-image'

type SpotlightPost = {
  title: string
  category: string
  image: string
  href: string
  source?: string
}

const PAGE_SIZE = 4

export function SpotlightDispatches({ posts, pageSize = PAGE_SIZE }: { posts: SpotlightPost[]; pageSize?: number }) {
  const [visibleCount, setVisibleCount] = useState(pageSize)
  const visiblePosts = posts.slice(0, visibleCount)
  const hasMore = visibleCount < posts.length

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {visiblePosts.map((post, index) => (
          <Link
            key={`${post.title}-${post.href}-${index}`}
            href={post.href}
            className="group overflow-hidden rounded-[1.35rem] border border-neutral-200/80 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_50px_rgba(15,23,42,0.1)]"
          >
            <div className="relative aspect-[16/10] bg-neutral-100">
              <ContentImage src={post.image} alt={post.title} fill className="object-cover transition duration-500 group-hover:scale-[1.02]" sizes="(max-width:768px) 100vw, 25vw" />
            </div>
            <div className="p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">{post.category}</p>
              <h3 className="mt-2 line-clamp-2 text-lg font-semibold leading-snug tracking-tight text-neutral-950">{post.title}</h3>
              {post.source ? <p className="mt-2 text-sm text-neutral-500">{post.source} · {post.category.toLowerCase()}</p> : null}
            </div>
          </Link>
        ))}
      </div>

      {hasMore ? (
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => setVisibleCount((count) => Math.min(count + pageSize, posts.length))}
            className="inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white px-8 py-3 text-sm font-semibold text-neutral-800 shadow-sm transition hover:bg-neutral-100"
          >
            Load More
          </button>
        </div>
      ) : null}
    </>
  )
}
