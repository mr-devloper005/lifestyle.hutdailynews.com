'use client'

import { useCallback, useState } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

const EDITOR_EMAIL = 'editor@example.com'
const GENERAL_EMAIL = 'contact@example.com'

type Recipient = 'editorial' | 'general'

export function ContactMessageForm() {
  const { toast } = useToast()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [topic, setTopic] = useState('')
  const [message, setMessage] = useState('')
  const [recipient, setRecipient] = useState<Recipient>('editorial')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = useCallback(() => {
    const next: Record<string, string> = {}
    const n = name.trim()
    const em = email.trim()
    const t = topic.trim()
    const m = message.trim()
    if (!n) next.name = 'Please enter your name.'
    if (!em) next.email = 'Please enter your email.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) next.email = 'Enter a valid email address.'
    if (!t) next.topic = 'Add a short topic or subject.'
    if (!m) next.message = 'Tell us how we can help.'
    if (m.length > 6000) next.message = 'Message is too long for a mail link—please shorten or email directly.'
    setErrors(next)
    return Object.keys(next).length === 0
  }, [name, email, topic, message])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) {
      toast({
        title: 'Check the form',
        description: 'Fix the highlighted fields and try again.',
        variant: 'destructive',
      })
      return
    }

    const to = recipient === 'editorial' ? EDITOR_EMAIL : GENERAL_EMAIL
    const subject = `[${recipient === 'editorial' ? 'Editorial' : 'General'}] ${topic.trim()}`
    const body = [
      `Name: ${name.trim()}`,
      `Reply-to: ${email.trim()}`,
      '',
      message.trim(),
    ].join('\n')

    const href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.location.href = href

    toast({
      title: 'Opening your mail app',
      description: 'If nothing opens, copy your message and send it to the address shown in the form.',
    })
  }

  return (
    <div className="mt-8 rounded-[1.25rem] border border-dashed border-neutral-300 bg-neutral-50/90 p-5 sm:p-6">
      <h3 className="text-sm font-semibold text-neutral-950">Message form</h3>
      <p className="mt-2 text-xs leading-relaxed text-neutral-600">
        Submitting opens your default email app with the desk address, subject, and message filled in. Send from your own mailbox so we can reply directly.
      </p>

      <form className="mt-5 grid gap-4" onSubmit={handleSubmit} noValidate>
        <fieldset className="grid gap-2">
          <legend className="text-xs font-medium text-neutral-600">Send to</legend>
          <div className="flex flex-wrap gap-3">
            <label className="flex cursor-pointer items-center gap-2 text-sm text-neutral-800">
              <input
                type="radio"
                name="recipient"
                checked={recipient === 'editorial'}
                onChange={() => setRecipient('editorial')}
                className="accent-neutral-950"
              />
              Editorial desk
            </label>
            <label className="flex cursor-pointer items-center gap-2 text-sm text-neutral-800">
              <input
                type="radio"
                name="recipient"
                checked={recipient === 'general'}
                onChange={() => setRecipient('general')}
                className="accent-neutral-950"
              />
              General & partnerships
            </label>
          </div>
        </fieldset>

        <div className="grid gap-2">
          <Label htmlFor="contact-name" className="sr-only">
            Your name
          </Label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              setErrors((o) => ({ ...o, name: '' }))
            }}
            placeholder="Your name"
            className={cn(
              'h-11 w-full rounded-full border bg-white px-4 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:ring-2 focus:ring-neutral-950/15',
              errors.name ? 'border-red-300' : 'border-neutral-200',
            )}
          />
          {errors.name ? <p className="text-xs text-red-600">{errors.name}</p> : null}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="contact-email" className="sr-only">
            Email address
          </Label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setErrors((o) => ({ ...o, email: '' }))
            }}
            placeholder="Email address"
            className={cn(
              'h-11 w-full rounded-full border bg-white px-4 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:ring-2 focus:ring-neutral-950/15',
              errors.email ? 'border-red-300' : 'border-neutral-200',
            )}
          />
          {errors.email ? <p className="text-xs text-red-600">{errors.email}</p> : null}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="contact-topic" className="sr-only">
            Topic
          </Label>
          <input
            id="contact-topic"
            name="topic"
            type="text"
            value={topic}
            onChange={(e) => {
              setTopic(e.target.value)
              setErrors((o) => ({ ...o, topic: '' }))
            }}
            placeholder="Topic"
            className={cn(
              'h-11 w-full rounded-full border bg-white px-4 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:ring-2 focus:ring-neutral-950/15',
              errors.topic ? 'border-red-300' : 'border-neutral-200',
            )}
          />
          {errors.topic ? <p className="text-xs text-red-600">{errors.topic}</p> : null}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="contact-message" className="sr-only">
            How can we help?
          </Label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value)
              setErrors((o) => ({ ...o, message: '' }))
            }}
            placeholder="How can we help?"
            className={cn(
              'min-h-[120px] w-full resize-y rounded-2xl border bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:ring-2 focus:ring-neutral-950/15',
              errors.message ? 'border-red-300' : 'border-neutral-200',
            )}
          />
          {errors.message ? <p className="text-xs text-red-600">{errors.message}</p> : null}
        </div>

        <button
          type="submit"
          className="inline-flex h-11 w-fit items-center justify-center rounded-full bg-neutral-950 px-8 text-sm font-semibold text-white shadow-sm transition hover:bg-neutral-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950"
        >
          Send message
        </button>
      </form>
    </div>
  )
}
