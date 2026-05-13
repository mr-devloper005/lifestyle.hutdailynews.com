import Link from 'next/link'
import { ArrowRight, BookOpen, Mail, Newspaper, Search, Sparkles } from 'lucide-react'
import { MarketingSiteShell } from '@/components/shared/marketing-site-shell'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const guides = [
  {
    title: 'Reading updates & guest posts',
    description:
      'Every story lives on its own page with a clear headline, summary, and body. Use the archive or home spotlight to jump to the newest distribution.',
    icon: Newspaper,
    tint: 'from-amber-50 to-amber-100/70',
  },
  {
    title: 'Search across the newsroom feed',
    description:
      'Open Search from the header and run keywords across titles, summaries, tags, and article text. It is the fastest way to surface a topic or contributor name.',
    icon: Search,
    tint: 'from-sky-50 to-sky-100/70',
  },
  {
    title: 'Syndication & formatting basics',
    description:
      'Posts are structured for consistent cards on the home page and in third-party previews. Headings and excerpts are chosen so link-outs stay readable everywhere.',
    icon: Sparkles,
    tint: 'from-emerald-50 to-emerald-100/70',
  },
  {
    title: 'Corrections & editorial standards',
    description:
      'If you spot an error in a distributed piece, contact the desk with the article URL and the correction. We prioritize factual clarity and attribution.',
    icon: BookOpen,
    tint: 'from-violet-50 to-violet-100/60',
  },
]

const faqs = [
  {
    id: 'faq-1',
    question: 'Do I need an account to read articles?',
    answer:
      'No. This site is built for public reading and guest-published distribution. You can browse updates, run search, and share links without signing in.',
  },
  {
    id: 'faq-2',
    question: 'How do I pitch or submit a guest post?',
    answer:
      'Use the Contact page and choose the editorial lane. Include your proposed headline, a short outline, and links to prior work. The desk reviews fit and timing before scheduling.',
  },
  {
    id: 'faq-3',
    question: 'Where do press or partnership requests go?',
    answer:
      'Send them through Contact as well—label the subject line with “Partnership” or “Press” so the message routes to the right inbox alongside syndication questions.',
  },
  {
    id: 'faq-4',
    question: 'How often is the homepage refreshed?',
    answer:
      'The lead story and grids pull from the live feed. When new posts publish, they can appear on the home page and in search after the next routine refresh.',
  },
  {
    id: 'faq-5',
    question: 'Can I reuse or quote your articles?',
    answer:
      'Reach out for permission before republishing full text. Short quotes with attribution and a link back are usually fine for commentary; we will confirm policy per request.',
  },
]

export default function HelpPage() {
  return (
    <MarketingSiteShell
      eyebrow="Help center"
      title="Help for readers, partners, and contributors"
      description="Practical guidance for navigating guest posts, media distribution updates, and how we keep the public archive easy to scan."
      actions={
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-full bg-neutral-950 px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_32px_rgba(0,0,0,0.15)] transition hover:bg-neutral-800"
        >
          Contact the desk
          <ArrowRight className="h-4 w-4" />
        </Link>
      }
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {guides.map((item) => (
          <div
            key={item.title}
            className={`flex flex-col rounded-[1.35rem] border border-neutral-200/80 bg-gradient-to-br ${item.tint} p-6 shadow-[0_12px_40px_rgba(15,23,42,0.06)]`}
          >
            <item.icon className="h-7 w-7 text-neutral-800" strokeWidth={1.75} />
            <h2 className="mt-4 text-lg font-semibold tracking-tight text-neutral-950">{item.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-neutral-700">{item.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-start">
        <div className="rounded-[1.35rem] border border-neutral-200/80 bg-neutral-50/60 p-6 sm:p-8">
          <h2 className="text-xl font-semibold tracking-tight text-neutral-950">Still stuck?</h2>
          <p className="mt-3 text-sm leading-relaxed text-neutral-600">
            Tell us what you tried and what you expected—we answer editorial navigation, distribution timing, and syndication questions during business hours.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-neutral-700">
            <li className="flex gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-neutral-500" />
              Prefer email? Use the addresses listed on the contact page for the fastest routing.
            </li>
            <li className="flex gap-2">
              <Search className="mt-0.5 h-4 w-4 shrink-0 text-neutral-500" />
              Try the site search with a distinctive phrase from the article you remember.
            </li>
          </ul>
          <Link
            href="/status"
            className="mt-6 inline-flex text-sm font-semibold text-neutral-950 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-950"
          >
            Check system status
          </Link>
        </div>

        <div className="rounded-[1.35rem] border border-neutral-200/80 bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,0.06)] sm:p-8">
          <h2 className="text-xl font-semibold tracking-tight text-neutral-950">Frequently asked questions</h2>
          <Accordion type="single" collapsible className="mt-4 w-full">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id} className="border-neutral-200/80">
                <AccordionTrigger className="text-left text-sm font-semibold text-neutral-950 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-neutral-600">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </MarketingSiteShell>
  )
}
