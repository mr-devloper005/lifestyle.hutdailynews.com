import Link from 'next/link'
import { MarketingSiteShell } from '@/components/shared/marketing-site-shell'
import { SITE_CONFIG } from '@/lib/site-config'

const sections = [
  {
    title: 'Who this policy covers',
    body: `This policy describes how ${SITE_CONFIG.name} handles information when you browse our public pages, read guest posts and updates, use search, or contact the editorial desk. We design the site so casual readers do not need an account.`,
  },
  {
    title: 'Information we collect',
    body: 'When you visit, standard server and analytics logs may include browser type, approximate region, pages viewed, and timestamps. If you email us, we retain the content of your message and your address so we can respond and keep a record of the conversation where appropriate.',
  },
  {
    title: 'Cookies & similar technologies',
    body: 'We may use essential cookies required for security or preferences, and limited analytics to understand aggregate traffic. See our Cookie Policy for categories and choices where applicable.',
  },
  {
    title: 'How we use information',
    body: 'We use data to operate and secure the site, fix bugs, understand which stories resonate in aggregate, and communicate with people who contact us. We do not sell personal information as a line of business.',
  },
  {
    title: 'Third-party services',
    body: 'Embedded media, fonts, or analytics providers may process technical data according to their own policies. We select vendors with sensible defaults but encourage you to review their terms if you interact with embedded content.',
  },
  {
    title: 'Retention',
    body: 'Server logs and support correspondence are kept only as long as needed for operations, legal compliance, or dispute resolution, then deleted or aggregated where possible.',
  },
  {
    title: 'Your rights & questions',
    body: 'Depending on where you live, you may have rights to access, correct, or delete personal data we hold about you. Contact us with your jurisdiction and request—we will verify and respond within a reasonable timeframe.',
  },
]

export default function PrivacyPage() {
  return (
    <MarketingSiteShell
      eyebrow="Legal"
      title="Privacy Policy"
      description={`How ${SITE_CONFIG.name} collects, uses, and protects information on this public media distribution site.`}
      actions={
        <Link href="/cookies" className="text-sm font-semibold text-neutral-950 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-950">
          Cookie policy →
        </Link>
      }
    >
      <p className="text-sm text-neutral-500">Last updated: April 23, 2026</p>

      <div className="mt-10 space-y-4">
        {sections.map((section) => (
          <section
            key={section.title}
            className="rounded-[1.25rem] border border-neutral-200/80 bg-white p-6 shadow-[0_10px_36px_rgba(15,23,42,0.05)] sm:p-7"
          >
            <h2 className="text-lg font-semibold tracking-tight text-neutral-950">{section.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600">{section.body}</p>
          </section>
        ))}
      </div>

      <div className="mt-10 rounded-[1.25rem] border border-dashed border-neutral-300 bg-neutral-50/80 p-6 text-sm text-neutral-600">
        This policy is meant to be readable, not a substitute for legal advice. For privacy-specific requests, contact the desk from the{' '}
        <Link href="/contact" className="font-semibold text-neutral-950 underline underline-offset-2">
          Contact
        </Link>{' '}
        page.
      </div>
    </MarketingSiteShell>
  )
}
