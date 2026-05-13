import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  BarChart3,
  Bookmark,
  Building2,
  CheckCircle2,
  Compass,
  FileText,
  Globe2,
  Image as ImageIcon,
  Layers,
  LayoutDashboard,
  LayoutGrid,
  Mail,
  MapPin,
  Newspaper,
  Rss,
  Share2,
  ShieldCheck,
  Sparkles,
  Tag,
  User,
  Zap,
} from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { TaskPostCard } from '@/components/shared/task-post-card'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'
import { fetchTaskPosts } from '@/lib/task-data'
import { siteContent } from '@/config/site.content'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind, type ProductKind } from '@/design/factory/get-product-kind'
import type { SitePost } from '@/lib/site-connector'
import { getHomeEditorialMockPosts, mergeEditorialPostsForHome } from '@/lib/home-editorial-mock'
import { HOME_PAGE_OVERRIDE_ENABLED, HomePageOverride } from '@/overrides/home-page'
import { DistributionCommandBar } from '@/components/home/distribution-command-bar'

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/',
    title: siteContent.home.metadata.title,
    description: siteContent.home.metadata.description,
    openGraphTitle: siteContent.home.metadata.openGraphTitle,
    openGraphDescription: siteContent.home.metadata.openGraphDescription,
    image: SITE_CONFIG.defaultOgImage,
    keywords: [...siteContent.home.metadata.keywords],
  })
}

type EnabledTask = (typeof SITE_CONFIG.tasks)[number]
type TaskFeedItem = { task: EnabledTask; posts: SitePost[] }

const taskIcons: Record<TaskKey, any> = {
  article: FileText,
  listing: Building2,
  sbm: Bookmark,
  classified: Tag,
  image: ImageIcon,
  profile: User,
}

function resolveTaskKey(value: unknown, fallback: TaskKey): TaskKey {
  if (
    value === 'listing' ||
    value === 'classified' ||
    value === 'article' ||
    value === 'image' ||
    value === 'profile' ||
    value === 'sbm' ||
    value === 'mediaDistribution'
  )
    return value
  return fallback
}

function getTaskHref(task: TaskKey, slug: string) {
  const route = SITE_CONFIG.tasks.find((item) => item.key === task)?.route || `/${task}`
  return `${route}/${slug}`
}

function getPostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post?.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const contentImage = typeof post?.content === 'object' && post?.content && Array.isArray((post.content as any).images)
    ? (post.content as any).images.find((url: unknown) => typeof url === 'string' && url)
    : null
  const logo = typeof post?.content === 'object' && post?.content && typeof (post.content as any).logo === 'string'
    ? (post.content as any).logo
    : null
  return mediaUrl || contentImage || logo || '/placeholder.svg?height=900&width=1400'
}

function getPostMeta(post?: SitePost | null) {
  if (!post || typeof post.content !== 'object' || !post.content) return { location: '', category: '' }
  const content = post.content as Record<string, unknown>
  return {
    location: typeof content.address === 'string' ? content.address : typeof content.location === 'string' ? content.location : '',
    category: typeof content.category === 'string' ? content.category : typeof post.tags?.[0] === 'string' ? post.tags[0] : '',
  }
}

function getDirectoryTone(brandPack: string) {
  if (brandPack === 'market-utility') {
    return {
      shell: 'bg-[#f5f7f1] text-[#1f2617]',
      hero: 'bg-[linear-gradient(180deg,#eef4e4_0%,#f8faf4_100%)]',
      panel: 'border border-[#d5ddc8] bg-white shadow-[0_24px_64px_rgba(64,76,34,0.08)]',
      soft: 'border border-[#d5ddc8] bg-[#eff3e7]',
      muted: 'text-[#5b664c]',
      title: 'text-[#1f2617]',
      badge: 'bg-[#1f2617] text-[#edf5dc]',
      action: 'bg-[#1f2617] text-[#edf5dc] hover:bg-[#2f3a24]',
      actionAlt: 'border border-[#d5ddc8] bg-white text-[#1f2617] hover:bg-[#eef3e7]',
    }
  }
  return {
    shell: 'bg-[#f8fbff] text-slate-950',
    hero: 'bg-[linear-gradient(180deg,#eef6ff_0%,#ffffff_100%)]',
    panel: 'border border-slate-200 bg-white shadow-[0_24px_64px_rgba(15,23,42,0.08)]',
    soft: 'border border-slate-200 bg-slate-50',
    muted: 'text-slate-600',
    title: 'text-slate-950',
    badge: 'bg-slate-950 text-white',
    action: 'bg-slate-950 text-white hover:bg-slate-800',
    actionAlt: 'border border-slate-200 bg-white text-slate-950 hover:bg-slate-100',
  }
}

function getVisualTone() {
  return {
    shell: 'bg-[#07101f] text-white',
    panel: 'border border-white/10 bg-[rgba(11,18,31,0.78)] shadow-[0_28px_80px_rgba(0,0,0,0.35)]',
    soft: 'border border-white/10 bg-white/6',
    muted: 'text-slate-300',
    title: 'text-white',
    badge: 'bg-[#8df0c8] text-[#07111f]',
    action: 'bg-[#8df0c8] text-[#07111f] hover:bg-[#77dfb8]',
    actionAlt: 'border border-white/10 bg-white/6 text-white hover:bg-white/10',
  }
}

function getCurationTone() {
  return {
    shell: 'bg-[#f7f1ea] text-[#261811]',
    panel: 'border border-[#ddcdbd] bg-[#fffaf4] shadow-[0_24px_60px_rgba(91,56,37,0.08)]',
    soft: 'border border-[#e8dbce] bg-[#f3e8db]',
    muted: 'text-[#71574a]',
    title: 'text-[#261811]',
    badge: 'bg-[#5b2b3b] text-[#fff0f5]',
    action: 'bg-[#5b2b3b] text-[#fff0f5] hover:bg-[#74364b]',
    actionAlt: 'border border-[#ddcdbd] bg-transparent text-[#261811] hover:bg-[#efe3d6]',
  }
}

function DirectoryHome({ primaryTask, enabledTasks, listingPosts, classifiedPosts, profilePosts, brandPack }: {
  primaryTask?: EnabledTask
  enabledTasks: EnabledTask[]
  listingPosts: SitePost[]
  classifiedPosts: SitePost[]
  profilePosts: SitePost[]
  brandPack: string
}) {
  const tone = getDirectoryTone(brandPack)
  const featuredListings = (listingPosts.length ? listingPosts : classifiedPosts).slice(0, 3)
  const featuredTaskKey: TaskKey = listingPosts.length ? 'listing' : 'classified'
  const quickRoutes = enabledTasks.slice(0, 4)

  return (
    <main>
      <section className={tone.hero}>
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
          <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div>
              <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] ${tone.badge}`}>
                <Compass className="h-3.5 w-3.5" />
                Local discovery product
              </span>
              <h1 className={`mt-6 max-w-4xl text-5xl font-semibold tracking-[-0.06em] sm:text-6xl ${tone.title}`}>
                Search businesses, compare options, and act fast without digging through generic feeds.
              </h1>
              <p className={`mt-6 max-w-2xl text-base leading-8 ${tone.muted}`}>{SITE_CONFIG.description}</p>

              <div className={`mt-8 grid gap-3 rounded-[2rem] p-4 ${tone.panel} md:grid-cols-[1.25fr_0.8fr_auto]`}>
                <div className="rounded-full bg-black/5 px-4 py-3 text-sm">What do you need today?</div>
                <div className="rounded-full bg-black/5 px-4 py-3 text-sm">Choose area or city</div>
                <Link href={primaryTask?.route || '/listings'} className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.action}`}>
                  Browse now
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  ['Verified businesses', `${featuredListings.length || 3}+ highlighted surfaces`],
                  ['Fast scan rhythm', 'More utility, less filler'],
                  ['Action first', 'Call, visit, shortlist, compare'],
                ].map(([label, value]) => (
                  <div key={label} className={`rounded-[1.4rem] p-4 ${tone.soft}`}>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] opacity-70">{label}</p>
                    <p className="mt-2 text-lg font-semibold">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              <div className={`rounded-[2rem] p-6 ${tone.panel}`}>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] opacity-70">Primary lane</p>
                    <h2 className="mt-2 text-3xl font-semibold">{primaryTask?.label || 'Listings'}</h2>
                  </div>
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <p className={`mt-4 text-sm leading-7 ${tone.muted}`}>{primaryTask?.description || 'Structured discovery for services, offers, and business surfaces.'}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {quickRoutes.map((task) => {
                  const Icon = taskIcons[task.key as TaskKey] || LayoutGrid
                  return (
                    <Link key={task.key} href={task.route} className={`rounded-[1.6rem] p-5 ${tone.soft}`}>
                      <Icon className="h-5 w-5" />
                      <h3 className="mt-4 text-lg font-semibold">{task.label}</h3>
                      <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>{task.description}</p>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4 border-b border-border pb-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Featured businesses</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Strong listings with clearer trust cues.</h2>
          </div>
          <Link href="/listings" className="text-sm font-semibold text-primary hover:opacity-80">Open listings</Link>
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {featuredListings.map((post) => (
            <TaskPostCard key={post.id} post={post} href={getTaskHref(featuredTaskKey, post.slug)} taskKey={featuredTaskKey} />
          ))}
        </div>
      </section>

      <section className={`${tone.shell}`}>
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
          <div className={`rounded-[2rem] p-7 ${tone.panel}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">What makes this different</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Built like a business directory, not a recolored content site.</h2>
            <ul className={`mt-6 space-y-3 text-sm leading-7 ${tone.muted}`}>
              <li>Search-first hero instead of a magazine headline.</li>
              <li>Action-oriented listing cards with trust metadata.</li>
              <li>Support lanes for offers, businesses, and profiles.</li>
            </ul>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {(profilePosts.length ? profilePosts : classifiedPosts).slice(0, 4).map((post) => {
              const meta = getPostMeta(post)
              const taskKey = resolveTaskKey(post.task, profilePosts.length ? 'profile' : 'classified')
              return (
                <Link key={post.id} href={getTaskHref(taskKey, post.slug)} className={`overflow-hidden rounded-[1.8rem] ${tone.panel}`}>
                  <div className="relative h-44 overflow-hidden">
                    <ContentImage src={getPostImage(post)} alt={post.title} fill className="object-cover" />
                  </div>
                  <div className="p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] opacity-70">{meta.category || post.task || 'Profile'}</p>
                    <h3 className="mt-2 text-xl font-semibold">{post.title}</h3>
                    <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>{post.summary || 'Quick access to local information and related surfaces.'}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}

function splitIntoTwoParagraphs(text: string) {
  const t = text.trim()
  if (!t) return ['', '']
  const splitAt = t.search(/\.\s+[A-Z]/)
  if (splitAt > 80) {
    return [t.slice(0, splitAt + 1).trim(), t.slice(splitAt + 1).trim()]
  }
  const half = Math.floor(t.length / 2)
  const space = t.lastIndexOf(' ', half + 40)
  if (space > 40) return [t.slice(0, space).trim(), t.slice(space).trim()]
  return [t, '']
}

function getPostCategoryLabel(post: SitePost): string {
  const content =
    post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const cat = content.category
  if (typeof cat === 'string' && cat.trim()) return cat.trim()
  const tag = post.tags?.find((t) => typeof t === 'string' && t !== 'mediaDistribution' && t !== 'article')
  if (typeof tag === 'string') return tag
  return 'Update'
}

function EditorialHome({
  primaryTask,
  posts,
  supportTasks,
}: {
  primaryTask?: EnabledTask
  posts: SitePost[]
  supportTasks: EnabledTask[]
}) {
  const defaultEditorialTask: TaskKey =
    primaryTask?.key === 'mediaDistribution' || primaryTask?.key === 'article'
      ? primaryTask.key
      : 'article'

  const postHref = (post: SitePost) =>
    getTaskHref(resolveTaskKey((post as { task?: unknown }).task, defaultEditorialTask), post.slug)

  const lead = posts[0]
  const spotlightPosts = posts.slice(1, 4)
  const deckPosts = posts.slice(10, 16)
  const featuredSecondary = posts[1]

  const headline = lead?.title || SITE_CONFIG.name
  const summarySource = lead?.summary || SITE_CONFIG.description
  const [bodyA, bodyB] = splitIntoTwoParagraphs(summarySource)
  const secondParagraph = bodyB || SITE_CONFIG.tagline

  const primaryRoute = primaryTask?.route || '/news'
  const audienceLabel = posts.length > 2 ? `${posts.length}+ stories in rotation` : 'Built for busy news desks'

  const faqItems = [
    {
      q: 'How does article distribution work?',
      a: 'Publish once in your CMS or dashboard, and we format and route each story to the channels you enable—web archive, partner feeds, and newsletter-ready summaries.',
    },
    {
      q: 'Can we keep our existing editorial workflow?',
      a: 'Yes. The surface is designed to sit alongside your tools: ingest updates, keep approvals in your stack, and let this site act as the public distribution layer.',
    },
    {
      q: 'Is SEO and structured metadata handled?',
      a: 'Article pages ship with readable headings, summaries, and schema-friendly defaults so distribution surfaces stay consistent without manual rework.',
    },
    {
      q: 'How do readers discover new posts?',
      a: 'The homepage highlights the latest lead story, a spotlight queue, and a scan-friendly grid so returning readers can skim without losing context.',
    },
  ]

  return (
    <main className="relative text-neutral-950">
      {/* Hero */}
      <section className="relative px-4 pb-10 pt-10 sm:px-6 sm:pb-14 sm:pt-14 lg:px-8 lg:pb-20 lg:pt-16">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 flex items-center justify-center gap-3">
            <div className="flex -space-x-2.5">
              {posts.slice(0, 3).map((p, i) => (
                <div
                  key={p.id}
                  className="relative z-[3] flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-amber-100 via-sky-100 to-emerald-100 text-[11px] font-bold text-neutral-700 shadow-sm"
                  style={{ zIndex: 3 - i }}
                  aria-hidden
                >
                  {(p.authorName || p.title || '?').slice(0, 1).toUpperCase()}
                </div>
              ))}
              {posts.length === 0 ? (
                <>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-amber-100 text-xs font-semibold shadow-sm" aria-hidden>
                    A
                  </div>
                  <div className="-ml-2 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-sky-100 text-xs font-semibold shadow-sm" aria-hidden>
                    B
                  </div>
                  <div className="-ml-2 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-emerald-100 text-xs font-semibold shadow-sm" aria-hidden>
                    C
                  </div>
                </>
              ) : null}
            </div>
            <span className="text-sm font-medium text-neutral-600">{audienceLabel}</span>
          </div>

          <span className="inline-flex items-center rounded-full border border-neutral-200/80 bg-white/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500 shadow-[0_6px_24px_rgba(15,23,42,0.06)]">
            Media distribution
          </span>

          <h1 className="mt-6 text-balance text-4xl font-semibold tracking-[-0.045em] text-neutral-950 sm:text-5xl lg:text-[3.15rem] lg:leading-[1.08]">
            Distribute your articles across every channel from one calm control room.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-neutral-600 sm:text-lg">
            {SITE_CONFIG.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={primaryRoute}
              className="inline-flex items-center gap-2 rounded-full bg-neutral-950 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_14px_40px_rgba(0,0,0,0.18)] transition hover:bg-neutral-800"
            >
              Browse latest articles
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-6 py-3.5 text-sm font-semibold text-neutral-800 shadow-sm transition hover:bg-neutral-50"
            >
              Schedule a demo
            </Link>
          </div>
        </div>

        {/* Dashboard-style preview card */}
        <div className="mx-auto mt-14 max-w-5xl">
          <div className="rounded-[1.75rem] border border-neutral-200/80 bg-white/90 p-4 shadow-[0_24px_80px_rgba(15,23,42,0.1)] backdrop-blur-sm sm:p-6 lg:p-8">
            <div className="flex gap-4 lg:gap-6">
              <aside className="hidden w-12 shrink-0 flex-col items-center gap-4 rounded-2xl bg-neutral-50 py-5 lg:flex" aria-hidden>
                <LayoutDashboard className="h-5 w-5 text-neutral-400" />
                <Newspaper className="h-5 w-5 text-neutral-900" />
                <Share2 className="h-5 w-5 text-neutral-400" />
                <BarChart3 className="h-5 w-5 text-neutral-400" />
                <Layers className="h-5 w-5 text-neutral-400" />
              </aside>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-neutral-500">
                  Hi there — ready when you are. <span className="font-medium text-neutral-800">Today&apos;s lead:</span>{' '}
                  <span className="text-neutral-700">{headline}</span>
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    { label: 'Import CMS', icon: Rss, tint: 'from-amber-50 to-amber-100/80' },
                    { label: 'SEO audit', icon: Sparkles, tint: 'from-sky-50 to-sky-100/80' },
                    { label: 'Social sync', icon: Share2, tint: 'from-emerald-50 to-emerald-100/80' },
                    { label: 'Analytics', icon: BarChart3, tint: 'from-violet-50 to-violet-100/70' },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className={`flex flex-col gap-2 rounded-2xl border border-neutral-100 bg-gradient-to-br ${item.tint} p-4 shadow-[0_8px_24px_rgba(15,23,42,0.05)]`}
                    >
                      <item.icon className="h-6 w-6 text-neutral-700" />
                      <p className="text-sm font-semibold text-neutral-900">{item.label}</p>
                      <p className="text-xs leading-relaxed text-neutral-600">Route-ready for your distribution stack.</p>
                    </div>
                  ))}
                </div>
                <DistributionCommandBar />
              </div>
            </div>
          </div>
        </div>

        {/* Feature strip */}
        <div className="mx-auto mt-16 grid max-w-5xl gap-4 sm:grid-cols-3">
          {[
            {
              title: 'One-click publishing',
              body: 'Ship updates to your public archive the moment they clear review.',
              icon: Zap,
              swatch: 'bg-amber-100 text-amber-900',
            },
            {
              title: 'Smart formatting',
              body: 'Readable typography, summaries, and cards tuned for scan-first readers.',
              icon: Layers,
              swatch: 'bg-sky-100 text-sky-900',
            },
            {
              title: 'Global reach',
              body: 'Structure stories for syndication, search, and partner surfaces without rework.',
              icon: Globe2,
              swatch: 'bg-emerald-100 text-emerald-900',
            },
          ].map((f) => (
            <div key={f.title} className="rounded-2xl border border-neutral-100 bg-white/90 p-5 shadow-[0_10px_36px_rgba(15,23,42,0.05)]">
              <div className={`inline-flex rounded-xl p-2.5 ${f.swatch}`}>
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight text-neutral-950">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Lead + excerpt (dynamic) */}
      <section className="border-y border-neutral-100 bg-white/60 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <span className="inline-flex rounded-full border border-neutral-200 bg-neutral-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
              Live from the newsroom
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-neutral-950 sm:text-4xl">Featured story</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-neutral-600">
              {lead ? getPostCategoryLabel(lead) : 'Updates'} — pulled from your latest published feed.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7">
              <div className="overflow-hidden rounded-[1.75rem] border border-neutral-200/80 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
                {lead ? (
                  <Link href={postHref(lead)} className="block">
                    <div className="relative aspect-[16/10] w-full bg-neutral-100">
                      <ContentImage src={getPostImage(lead)} alt={lead.title} fill className="object-cover" sizes="(max-width:1024px) 100vw, 55vw" />
                    </div>
                    <div className="p-6 sm:p-8">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">{getPostCategoryLabel(lead)}</p>
                      <h3 className="mt-3 text-2xl font-semibold tracking-tight text-neutral-950 sm:text-3xl">{headline}</h3>
                      <div className="mt-5 space-y-4 text-base leading-relaxed text-neutral-600">
                        {bodyA ? <p>{bodyA}</p> : null}
                        {secondParagraph ? <p>{secondParagraph}</p> : null}
                      </div>
                      <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-neutral-950">
                        Read full article <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                ) : (
                  <div className="p-10 text-center text-neutral-600">
                    <p>Connect your feed to feature the latest article here.</p>
                    <Link href={primaryRoute} className="mt-4 inline-flex rounded-full bg-neutral-950 px-5 py-2.5 text-sm font-semibold text-white">
                      Open archive
                    </Link>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-4 lg:col-span-5">
              <div className="rounded-[1.5rem] border border-neutral-200/80 bg-gradient-to-br from-sky-50 via-white to-amber-50 p-6 shadow-[0_16px_48px_rgba(15,23,42,0.06)]">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">Multi-language ready</p>
                <p className="mt-3 text-lg font-semibold text-neutral-950">Ship localized headlines when you expand.</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {['EN', 'ES', 'FR', 'DE'].map((code) => (
                    <span key={code} className="rounded-full border border-white/80 bg-white/90 px-3 py-1 text-xs font-semibold text-neutral-700 shadow-sm">
                      {code}
                    </span>
                  ))}
                </div>
              </div>
              <div className="rounded-[1.5rem] border border-neutral-200/80 bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,0.06)]">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-950 text-white">
                    <Newspaper className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-3xl font-semibold tabular-nums tracking-tight">{posts.length || '—'}</p>
                    <p className="text-xs font-medium uppercase tracking-[0.14em] text-neutral-500">Indexed articles</p>
                  </div>
                </div>
              </div>
              <div className="rounded-[1.5rem] border border-neutral-200/80 bg-gradient-to-br from-blue-50/90 to-amber-50/80 p-6 shadow-[0_12px_40px_rgba(15,23,42,0.05)]">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-600">SEO & scheduling</p>
                <p className="mt-2 text-lg font-semibold text-neutral-950">Automate metadata and publish windows.</p>
                <p className="mt-2 text-sm text-neutral-600">Keep tone consistent while your team moves faster.</p>
              </div>
              <div className="rounded-[1.5rem] border border-neutral-200/80 bg-neutral-50/80 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">Omni-channel</p>
                <div className="mt-4 flex flex-wrap gap-3 text-neutral-700">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold shadow-sm ring-1 ring-neutral-200/80">
                    <Mail className="h-3.5 w-3.5" /> Newsletter
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold shadow-sm ring-1 ring-neutral-200/80">
                    <Globe2 className="h-3.5 w-3.5" /> Web
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold shadow-sm ring-1 ring-neutral-200/80">
                    <Share2 className="h-3.5 w-3.5" /> Social
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology split */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <span className="inline-flex rounded-full border border-neutral-200 bg-neutral-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
              Technology
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-neutral-950 sm:text-4xl">Lead your media distribution transformation</h2>
            <p className="mx-auto mt-4 max-w-2xl text-neutral-600">
              Pair a polished reader experience with operational clarity—so editors stay in flow and distribution stays measurable.
            </p>
          </div>

          <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:items-center">
            <ul className="space-y-3">
              {[
                { title: 'Editorial workspace', body: 'Lead story, spotlight queue, and archive grid stay in sync with your feed.', highlight: false },
                { title: 'Automated newsletter sync', body: 'Draft-ready excerpts and titles formatted for email surfaces.', highlight: true },
                { title: 'Governance-friendly defaults', body: 'Stable URLs, structured summaries, and predictable card metadata.', highlight: false },
              ].map((row) => (
                <li
                  key={row.title}
                  className={`flex gap-4 rounded-2xl border p-5 transition ${row.highlight ? 'border-amber-200/80 bg-amber-50/90 shadow-[0_12px_40px_rgba(251,191,36,0.15)]' : 'border-neutral-100 bg-white/90 shadow-sm'}`}
                >
                  <CheckCircle2 className={`mt-0.5 h-5 w-5 shrink-0 ${row.highlight ? 'text-amber-700' : 'text-emerald-600'}`} />
                  <div>
                    <p className="font-semibold text-neutral-950">{row.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-neutral-600">{row.body}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="rounded-[1.75rem] border border-neutral-200/80 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.1)] sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">Distribution roster</p>
              <p className="mt-2 text-lg font-semibold text-neutral-950">Who is shipping this week</p>
              <ul className="mt-6 space-y-4">
                {(spotlightPosts.length ? spotlightPosts : posts.slice(0, 3)).map((post) => (
                  <li key={post.id}>
                    <Link href={postHref(post)} className="flex items-center gap-4 rounded-2xl border border-neutral-100 bg-neutral-50/50 p-4 transition hover:border-neutral-200 hover:bg-white">
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-neutral-200">
                        <ContentImage src={getPostImage(post)} alt={post.title} fill className="object-cover" sizes="48px" />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-neutral-950">{post.title}</p>
                        <p className="text-xs text-neutral-500">{post.authorName || 'Editorial'} · {getPostCategoryLabel(post)}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
              {featuredSecondary ? (
                <Link href={postHref(featuredSecondary)} className="mt-6 block rounded-2xl border border-dashed border-neutral-200 bg-neutral-50/80 p-4 text-sm text-neutral-700 transition hover:bg-neutral-100">
                  <span className="font-semibold text-neutral-950">Also this week:</span> {featuredSecondary.title}
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* From the desk — grid */}
      {deckPosts.length ? (
        <section className="border-t border-neutral-100 bg-neutral-50/50 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-semibold tracking-[-0.03em] text-neutral-950 sm:text-4xl">From the desk</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-600">
              Longer summaries stay on the home page for scan-friendly reading. When your CMS feed is connected, these cards fill automatically from published posts.
            </p>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {deckPosts.map((post) => (
                <Link
                  key={post.id}
                  href={postHref(post)}
                  className="group flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-neutral-200/80 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_50px_rgba(15,23,42,0.1)]"
                >
                  <div className="relative aspect-[16/10] bg-neutral-100">
                    <ContentImage src={getPostImage(post)} alt={post.title} fill className="object-cover transition duration-500 group-hover:scale-[1.02]" sizes="(max-width:768px) 100vw, 33vw" />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <span className="w-fit rounded-full bg-neutral-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-600">
                      {getPostCategoryLabel(post)}
                    </span>
                    <h3 className="mt-3 text-lg font-semibold leading-snug tracking-tight text-neutral-950">{post.title}</h3>
                    {post.summary ? <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-neutral-600">{post.summary}</p> : null}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* FAQ */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <h2 className="text-3xl font-semibold tracking-[-0.03em] text-neutral-950 sm:text-4xl">Frequently asked questions</h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-neutral-600">
              Straight answers for teams evaluating a lightweight distribution layer for articles and press-style updates.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex rounded-full bg-neutral-950 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-neutral-800"
            >
              Contact us
            </Link>
          </div>
          <div className="space-y-3">
            {faqItems.map((item) => (
              <details key={item.q} className="group rounded-2xl border border-neutral-200/80 bg-white px-5 shadow-sm open:shadow-md">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left text-sm font-semibold text-neutral-950 [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-lg leading-none text-neutral-500 group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="border-t border-neutral-100 pb-4 pt-2 text-sm leading-relaxed text-neutral-600">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[linear-gradient(165deg,#e0f2fe_0%,#fff7ed_45%,#fef3c7_100%)]" aria-hidden />
        <div className="relative mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold tracking-[-0.03em] text-neutral-950 sm:text-4xl">Join the future of digital journalism</h2>
          <p className="mt-4 text-neutral-600">Get release notes and distribution tips—we respect your inbox.</p>
          <div className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row sm:items-stretch">
            <div className="pointer-events-none flex h-12 flex-1 items-center rounded-full border border-white/80 bg-white/95 px-5 text-left text-sm text-neutral-400 shadow-md">
              you@newsroom.com
            </div>
            <Link
              href="/contact"
              className="inline-flex h-12 shrink-0 items-center justify-center rounded-full bg-neutral-950 px-8 text-sm font-semibold text-white shadow-lg transition hover:bg-neutral-800"
            >
              Notify me
            </Link>
          </div>
          <p className="mt-3 text-xs text-neutral-500">We route interest through the contact desk so your team gets a real reply.</p>
        </div>
      </section>

      {/* Metrics */}
      <section className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.75)_0%,rgba(30,41,59,0.55)_100%)]"
          style={{
            backgroundImage:
              'linear-gradient(180deg,rgba(15,23,42,0.82)_0%,rgba(30,41,59,0.55)_100%), url("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2000&q=60")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl">
          <div className="text-center">
            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur">
              Governance
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">Reliable, safe, and validated</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-white/80">Operational targets teams use when they standardize on a single distribution surface.</p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {[
              { value: '99%', label: 'System uptime target', icon: CheckCircle2 },
              { value: `${Math.max(posts.length, 12)}+`, label: 'Syndication-ready slots', icon: Share2 },
              { value: '95%', label: 'Engagement lift (avg. pilot)', icon: BarChart3 },
            ].map((m) => (
              <div
                key={m.label}
                className="rounded-[1.35rem] border border-white/20 bg-white/10 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.2)] backdrop-blur-md"
              >
                <m.icon className="h-8 w-8 text-white/90" />
                <p className="mt-4 text-4xl font-semibold tabular-nums tracking-tight text-white">{m.value}</p>
                <p className="mt-2 text-sm font-medium text-white/75">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {supportTasks.length ? (
        <section className="border-t border-neutral-100 bg-white px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {supportTasks.slice(0, 3).map((task) => (
              <Link
                key={task.key}
                href={task.route}
                className="rounded-2xl border border-neutral-100 bg-neutral-50/80 px-5 py-5 transition hover:border-neutral-200 hover:bg-white hover:shadow-md"
              >
                <h3 className="text-lg font-semibold text-neutral-950">{task.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{task.description}</p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  )
}

function VisualHome({ primaryTask, imagePosts, profilePosts, articlePosts }: { primaryTask?: EnabledTask; imagePosts: SitePost[]; profilePosts: SitePost[]; articlePosts: SitePost[] }) {
  const tone = getVisualTone()
  const gallery = imagePosts.length ? imagePosts.slice(0, 5) : articlePosts.slice(0, 5)
  const creators = profilePosts.slice(0, 3)

  return (
    <main className={tone.shell}>
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] ${tone.badge}`}>
              <ImageIcon className="h-3.5 w-3.5" />
              Visual publishing system
            </span>
            <h1 className={`mt-6 max-w-4xl text-5xl font-semibold tracking-[-0.06em] sm:text-6xl ${tone.title}`}>
              Image-led discovery with creator profiles and a more gallery-like browsing rhythm.
            </h1>
            <p className={`mt-6 max-w-2xl text-base leading-8 ${tone.muted}`}>{SITE_CONFIG.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={primaryTask?.route || '/images'} className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.action}`}>
                Open gallery
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/profile" className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.actionAlt}`}>
                Meet creators
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {gallery.slice(0, 5).map((post, index) => (
              <Link
                key={post.id}
                href={getTaskHref(resolveTaskKey(post.task, 'image'), post.slug)}
                className={index === 0 ? `col-span-2 row-span-2 overflow-hidden rounded-[2.4rem] ${tone.panel}` : `overflow-hidden rounded-[1.8rem] ${tone.soft}`}
              >
                <div className={index === 0 ? 'relative h-[360px]' : 'relative h-[170px]'}>
                  <ContentImage src={getPostImage(post)} alt={post.title} fill className="object-cover" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className={`rounded-[2rem] p-7 ${tone.panel}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Visual notes</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Larger media surfaces, fewer boxes, stronger pacing.</h2>
            <p className={`mt-4 max-w-2xl text-sm leading-8 ${tone.muted}`}>This product avoids business-directory density and publication framing. The homepage behaves more like a visual board, with profile surfaces and imagery leading the experience.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {creators.map((post) => (
              <Link key={post.id} href={`/profile/${post.slug}`} className={`rounded-[1.8rem] p-5 ${tone.soft}`}>
                <div className="relative h-40 overflow-hidden rounded-[1.2rem]">
                  <ContentImage src={getPostImage(post)} alt={post.title} fill className="object-cover" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{post.title}</h3>
                <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>{post.summary || 'Creator profile and visual identity surface.'}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

function CurationHome({ primaryTask, bookmarkPosts, profilePosts, articlePosts }: { primaryTask?: EnabledTask; bookmarkPosts: SitePost[]; profilePosts: SitePost[]; articlePosts: SitePost[] }) {
  const tone = getCurationTone()
  const collections = bookmarkPosts.length ? bookmarkPosts.slice(0, 4) : articlePosts.slice(0, 4)
  const people = profilePosts.slice(0, 3)

  return (
    <main className={tone.shell}>
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div>
            <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] ${tone.badge}`}>
              <Bookmark className="h-3.5 w-3.5" />
              Curated collections
            </span>
            <h1 className={`mt-6 max-w-4xl text-5xl font-semibold tracking-[-0.06em] sm:text-6xl ${tone.title}`}>
              Save, organize, and revisit resources through shelves, boards, and curated collections.
            </h1>
            <p className={`mt-6 max-w-2xl text-base leading-8 ${tone.muted}`}>{SITE_CONFIG.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={primaryTask?.route || '/sbm'} className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.action}`}>
                Open collections
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/profile" className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.actionAlt}`}>
                Explore curators
              </Link>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {collections.map((post) => (
              <Link key={post.id} href={getTaskHref(resolveTaskKey(post.task, 'sbm'), post.slug)} className={`rounded-[1.8rem] p-6 ${tone.panel}`}>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Collection</p>
                <h3 className="mt-3 text-2xl font-semibold">{post.title}</h3>
                <p className={`mt-3 text-sm leading-8 ${tone.muted}`}>{post.summary || 'A calmer bookmark surface with room for context and grouping.'}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className={`rounded-[2rem] p-7 ${tone.panel}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Why this feels different</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">More like saved boards and reading shelves than a generic post feed.</h2>
            <p className={`mt-4 max-w-2xl text-sm leading-8 ${tone.muted}`}>The structure is calmer, the cards are less noisy, and the page encourages collecting and returning instead of forcing everything into a fast-scrolling list.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {people.map((post) => (
              <Link key={post.id} href={`/profile/${post.slug}`} className={`rounded-[1.8rem] p-5 ${tone.soft}`}>
                <div className="relative h-32 overflow-hidden rounded-[1.2rem]">
                  <ContentImage src={getPostImage(post)} alt={post.title} fill className="object-cover" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{post.title}</h3>
                <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>Curator profile, saved resources, and collection notes.</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default async function HomePage() {
  if (HOME_PAGE_OVERRIDE_ENABLED) {
    return <HomePageOverride />
  }

  const enabledTasks = SITE_CONFIG.tasks.filter((task) => task.enabled)
  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const taskFeed: TaskFeedItem[] = (
    await Promise.all(
      enabledTasks.map(async (task) => ({
        task,
        posts: await fetchTaskPosts(task.key, 6, { allowMockFallback: false, fresh: false, revalidate: 120 }),
      }))
    )
  ).filter(({ posts }) => posts.length)

  const primaryTask = enabledTasks.find((task) => task.key === recipe.primaryTask) || enabledTasks[0]
  const supportTasks = enabledTasks.filter((task) => task.key !== primaryTask?.key)
  const listingPosts = taskFeed.find(({ task }) => task.key === 'listing')?.posts || []
  const classifiedPosts = taskFeed.find(({ task }) => task.key === 'classified')?.posts || []
  const articlePosts = taskFeed.find(({ task }) => task.key === 'article')?.posts || []
  const mediaDistributionPosts =
    taskFeed.find(({ task }) => task.key === 'mediaDistribution')?.posts || []
  const editorialRaw = articlePosts.length ? articlePosts : mediaDistributionPosts
  const editorialPosts =
    editorialRaw.length > 0
      ? editorialRaw.slice(0, 16)
      : mergeEditorialPostsForHome(editorialRaw, getHomeEditorialMockPosts(), 16)
  const imagePosts = taskFeed.find(({ task }) => task.key === 'image')?.posts || []
  const profilePosts = taskFeed.find(({ task }) => task.key === 'profile')?.posts || []
  const bookmarkPosts = taskFeed.find(({ task }) => task.key === 'sbm')?.posts || []

  const schemaData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.baseUrl,
      logo: `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}${SITE_CONFIG.defaultOgImage}`,
      sameAs: [],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.baseUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavbarShell />
      <SchemaJsonLd data={schemaData} />
      {productKind === 'directory' ? (
        <DirectoryHome
          primaryTask={primaryTask}
          enabledTasks={enabledTasks}
          listingPosts={listingPosts}
          classifiedPosts={classifiedPosts}
          profilePosts={profilePosts}
          brandPack={recipe.brandPack}
        />
      ) : null}
      {productKind === 'editorial' ? (
        <EditorialHome primaryTask={primaryTask} posts={editorialPosts} supportTasks={supportTasks} />
      ) : null}
      {productKind === 'visual' ? (
        <VisualHome primaryTask={primaryTask} imagePosts={imagePosts} profilePosts={profilePosts} articlePosts={articlePosts} />
      ) : null}
      {productKind === 'curation' ? (
        <CurationHome primaryTask={primaryTask} bookmarkPosts={bookmarkPosts} profilePosts={profilePosts} articlePosts={articlePosts} />
      ) : null}
      <Footer />
    </div>
  )
}
