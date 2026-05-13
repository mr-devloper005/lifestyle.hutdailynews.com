import Link from 'next/link'
import { MarketingSiteShell } from '@/components/shared/marketing-site-shell'
import { SITE_CONFIG } from '@/lib/site-config'

const sections = [
  {
    title: 'Agreement to these terms',
    body: `By accessing ${SITE_CONFIG.name}, you agree to these Terms of Service and our Privacy Policy. If you do not agree, please stop using the site.`,
  },
  {
    title: 'Nature of the service',
    body: 'We provide a public reading experience for articles, guest posts, and updates. Content is informational. We may change, pause, or discontinue features to keep the site reliable.',
  },
  {
    title: 'Guest & third-party content',
    body: 'Some articles are authored by guests or partners. Views expressed belong to the authors unless clearly marked as official editorial positions. We may edit for clarity, length, or style with author agreement where applicable.',
  },
  {
    title: 'Acceptable use',
    body: 'Do not attempt to disrupt the site, scrape it in a way that degrades performance, or use it to distribute malware, spam, or unlawful material. Automated access must respect robots.txt and reasonable rate limits.',
  },
  {
    title: 'Intellectual property',
    body: 'The site design, branding, and original desk content are protected by applicable intellectual property laws. Guest authors retain rights to their work subject to the license granted for publication and distribution on this domain.',
  },
  {
    title: 'Disclaimer',
    body: 'Materials are provided “as is” without warranties of any kind. We are not liable for indirect or consequential damages arising from your use of the site, to the fullest extent permitted by law.',
  },
  {
    title: 'Links',
    body: 'Outbound links are provided for convenience. We are not responsible for third-party sites, their content, or their privacy practices.',
  },
  {
    title: 'Governing law',
    body: 'These terms are governed by the laws applicable to the operating entity behind this publication, without regard to conflict-of-law rules. Disputes should first be raised through our contact channels.',
  },
]

export default function TermsPage() {
  return (
    <MarketingSiteShell
      eyebrow="Legal"
      title="Terms of Service"
      description={`Rules for using ${SITE_CONFIG.name} as a reader, contributor reference, or distribution partner.`}
      actions={
        <Link href="/privacy" className="text-sm font-semibold text-neutral-950 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-950">
          Privacy policy →
        </Link>
      }
    >
      <p className="text-sm text-neutral-500">Last updated: April 23, 2026</p>

      <ol className="mt-10 space-y-4">
        {sections.map((section, index) => (
          <li
            key={section.title}
            className="rounded-[1.25rem] border border-neutral-200/80 bg-white p-6 shadow-[0_10px_36px_rgba(15,23,42,0.05)] sm:p-7"
          >
            <div className="flex gap-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-neutral-950 text-sm font-bold text-white">
                {index + 1}
              </span>
              <div>
                <h2 className="text-lg font-semibold tracking-tight text-neutral-950">{section.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">{section.body}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>

      <p className="mt-10 text-center text-sm text-neutral-600">
        Questions about these terms?{' '}
        <Link href="/contact" className="font-semibold text-neutral-950 underline underline-offset-2">
          Contact the desk
        </Link>
        .
      </p>
    </MarketingSiteShell>
  )
}
