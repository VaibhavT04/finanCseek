'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { ArrowRight, BarChart3, BookOpen, BriefcaseBusiness, Check, ChevronDown, Clock3, FileText, Landmark, Menu, MessageCircle, Phone, Mail, ShieldCheck, Sparkles, Target, TrendingUp, X, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'

const CONTACTS = {
  whatsapp: 'https://wa.me/918452960702',
  email: 'mailto:financseek@gmail.com',
  phone: 'tel:918452960702',
}

const BRAND = {
  name: 'finanCseek',
  tagline: 'SEEK CLARITY. FIND GROWTH.',
  logo: '/brand/logo-final.jpeg',
}

const SKIPPED_SERVICES = new Set([
  'estate planning', 'debt management', 'credit score improvement', 'payroll processing', 'bank reconciliation', 'budget preparation',
  'cost accounting', 'management accounting', 'international tax consulting', 'tax audits', 'tax dispute support', 'operational audit',
  'compliance audit', 'fraud investigation', 'risk assessment', 'alternative investments', 'retirement investment planning', 'bond investments', 'etf advisory',
  'mortgage consulting', 'loan restructuring', 'trade finance', 'treasury management', 'credit analysis', 'financial restructuring',
])

const RAW_CATEGORIES = [
  { name: 'Personal Financial Services', slug: 'personal-financial-services', icon: TrendingUp, description: 'Clear guidance for personal goals, protection, and long-term financial decisions.', services: ['Financial Planning', 'Budgeting & Cash Flow Management', 'Retirement Planning', 'Wealth Management', 'Investment Advisory', 'Tax Planning', 'Estate Planning', 'Insurance Planning', 'Debt Management', 'Credit Score Improvement'] },
  { name: 'Accounting & Bookkeeping', slug: 'accounting-bookkeeping', icon: BookOpen, description: 'Reliable financial records and reporting that help businesses operate with confidence.', services: ['Bookkeeping', 'Financial Statement Preparation', 'Payroll Processing', 'Bank Reconciliation', 'Accounts Payable & Receivable', 'Budget Preparation', 'Cost Accounting', 'Management Accounting'] },
  { name: 'Tax Services', slug: 'tax-services', icon: FileText, description: 'Organized tax support focused on compliance, planning, and accurate documentation.', services: ['Income Tax Return Preparation', 'GST Filing', 'Corporate Tax Planning', 'International Tax Consulting', 'Tax Audits', 'Tax Compliance', 'Tax Dispute Support'] },
  { name: 'Audit & Assurance', slug: 'audit-assurance', icon: ShieldCheck, description: 'Structured assurance work that strengthens reporting, controls, and accountability.', services: ['Internal Audit', 'External Audit', 'Statutory Audit', 'Compliance Audit', 'Operational Audit', 'Risk Assessment', 'Internal Controls Review', 'Fraud Investigation'] },
  { name: 'Investment Services', slug: 'investment-services', icon: BarChart3, description: 'Educational, risk-aware investment guidance built around your objectives.', services: ['Portfolio Management', 'Stock Market Advisory', 'Mutual Fund Advisory', 'Bond Investments', 'ETF Advisory', 'Alternative Investments', 'Retirement Investment Planning', 'Asset Allocation'] },
  { name: 'Banking & Lending', slug: 'banking-lending', icon: Landmark, description: 'Practical support for lending decisions, financing options, and credit preparation.', services: ['Loan Advisory', 'Mortgage Consulting', 'Business Financing', 'Credit Analysis', 'Loan Restructuring', 'Trade Finance', 'Treasury Management'] },
  { name: 'Business Advisory', slug: 'business-advisory', icon: BriefcaseBusiness, description: 'Financial perspective for better planning, performance, and business decisions.', services: ['Business Planning', 'Startup Financial Consulting', 'Budget Forecasting', 'Profitability Analysis', 'Cost Reduction Strategies', 'Performance Improvement', 'Strategic Planning', 'Financial Restructuring'] },
]

const CATEGORIES = RAW_CATEGORIES.map((category) => ({ ...category, services: category.services.filter((service) => !SKIPPED_SERVICES.has(service.toLowerCase())) }))
const SERVICES = CATEGORIES.flatMap((category) => category.services.map((name) => ({ name, category: category.name, categorySlug: category.slug, slug: slugify(name) })))

function slugify(value) { return value.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') }
function getService(slug) { return SERVICES.find((service) => service.slug === slug) }
function getCategory(slug) { return CATEGORIES.find((category) => category.slug === slug) }

function Header() {
  const [open, setOpen] = useState(false)
  return <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
    <div className="container flex h-20 items-center justify-between">
      <a href="/" className="flex items-center gap-3" aria-label="finanCseek home"><img src={BRAND.logo} alt="finanCseek logo" className="h-12 w-12 rounded-md object-cover" /><span><strong className="block text-xl tracking-tight text-[#0B1F3A]">finan<span className="text-[#19B6C9]">C</span>seek</strong><span className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#C79A3B]">{BRAND.tagline}</span></span></a>
      <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex"><a href="/" className="hover:text-[#19B6C9]">Home</a><a href="#services" className="hover:text-[#19B6C9]">Services</a><a href="#approach" className="hover:text-[#19B6C9]">Our approach</a><a href="#contact" className="hover:text-[#19B6C9]">Contact</a></nav>
      <div className="hidden items-center gap-3 md:flex"><a href="#contact" className="rounded-md bg-[#C79A3B] px-5 py-3 text-sm font-semibold text-[#0B1F3A] shadow-sm hover:bg-[#19B6C9]">Book consultation <ArrowRight className="ml-2 inline" size={15} /></a></div>
      <button className="rounded-md p-2 text-[#0B1F3A] md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X /> : <Menu />}</button>
    </div>
    {open && <div className="border-t border-slate-200 bg-white px-5 py-5 md:hidden"><div className="container flex flex-col gap-4 text-sm font-medium"><a href="#services" onClick={() => setOpen(false)}>Services</a><a href="#approach" onClick={() => setOpen(false)}>Our approach</a><a href="#contact" onClick={() => setOpen(false)}>Contact</a></div></div>}
  </header>
}

function ContactButtons() { return <div className="flex flex-wrap gap-3"><a href={CONTACTS.whatsapp} className="inline-flex items-center gap-2 rounded-md bg-[#16A34A] px-4 py-3 text-sm font-semibold text-white hover:brightness-95"><MessageCircle size={16} /> WhatsApp</a><a href={CONTACTS.email} className="inline-flex items-center gap-2 rounded-md border border-[#0B1F3A] px-4 py-3 text-sm font-semibold text-[#0B1F3A] hover:border-[#19B6C9] hover:text-[#19B6C9]"><Mail size={16} /> Email</a><a href={CONTACTS.phone} className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 hover:border-[#19B6C9] hover:text-[#19B6C9]"><Phone size={16} /> Call</a></div> }
function Footer() { return <footer className="bg-[#0B1F3A] py-12 text-white"><div className="container grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]"><div><div className="mb-4 flex items-center gap-3"><strong className="tracking-tight">finan<span className="text-[#19B6C9]">C</span>seek</strong></div><p className="max-w-xs text-sm leading-6 text-slate-300">A placeholder brand for a future-ready financial consultancy website. Replace the identity and contact details when ready.</p></div><div><h3 className="mb-4 text-sm font-semibold text-[#C79A3B]">Services</h3>{CATEGORIES.slice(0, 4).map((category) => <a key={category.slug} href={`/services/${category.slug}`} className="mb-2 block text-sm text-slate-300 hover:text-white">{category.name}</a>)}</div><div><h3 className="mb-4 text-sm font-semibold text-[#C79A3B]">Explore</h3><a href="#approach" className="mb-2 block text-sm text-slate-300">Our approach</a><a href="#contact" className="mb-2 block text-sm text-slate-300">Contact</a><a href="#services" className="mb-2 block text-sm text-slate-300">All services</a></div><div><h3 className="mb-4 text-sm font-semibold text-[#C79A3B]">Contact</h3><p className="text-sm leading-6 text-slate-300">Phone, email, and WhatsApp details are placeholders for replacement.</p><div className="mt-4"><ContactButtons /></div></div></div><div className="container mt-10 border-t border-white/15 pt-6 text-xs text-slate-400">© 2025 finanCseek. Placeholder site architecture.</div></footer> }

function HomePage() {
  const [expanded, setExpanded] = useState(null)
  return <><Header /><main><section className="relative overflow-hidden bg-[#0B1F3A] text-white"><div className="absolute -right-20 -top-24 h-80 w-80 rounded-full border border-[#19B6C9]/20" /><div className="container grid min-h-[570px] items-center gap-14 py-20 lg:grid-cols-[1.05fr_.95fr]"><div><div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#C79A3B]/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#C79A3B]"><span className="h-2 w-2 rounded-full bg-[#19B6C9]" /> Financial clarity, made practical</div><h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">Professional guidance for your next financial decision.</h1><p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">A clear, considered approach to personal finance, business advisory, accounting, tax, audit, investment, and lending support.</p><div className="mt-9 flex flex-wrap gap-4"><a href="#contact" className="rounded-md bg-[#C79A3B] px-6 py-3.5 font-semibold text-[#0B1F3A] hover:bg-[#19B6C9]">Book a consultation <ArrowRight className="ml-2 inline" size={16} /></a><a href="#services" className="rounded-md border border-white/30 px-6 py-3.5 font-semibold text-white hover:border-[#19B6C9]">Explore services</a></div><div className="mt-10 grid gap-3 text-sm text-slate-300 sm:grid-cols-2"><span><Check className="mr-2 inline text-[#19B6C9]" size={16} /> Structured advice</span><span><Check className="mr-2 inline text-[#19B6C9]" size={16} /> Transparent next steps</span><span><Check className="mr-2 inline text-[#19B6C9]" size={16} /> Built for individuals</span><span><Check className="mr-2 inline text-[#19B6C9]" size={16} /> Built for businesses</span></div></div><div className="relative"><div className="rounded-2xl border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur"><div className="rounded-xl bg-[#F8FAFC] p-6 text-[#0B1F3A]"><div className="flex items-center justify-between border-b border-slate-200 pb-5"><div><p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Financial outlook</p><p className="mt-2 text-3xl font-semibold">A clearer view</p></div><div className="rounded-lg bg-[#19B6C9]/10 p-3 text-[#19B6C9]"><BarChart3 size={26} /></div></div><div className="mt-8 flex h-40 items-end gap-3">{[35, 50, 42, 64, 58, 78, 90].map((height, index) => <div key={index} className="flex-1 rounded-t bg-gradient-to-t from-[#0B1F3A] to-[#19B6C9]" style={{ height: `${height}%` }} />)}</div><div className="mt-6 flex items-center justify-between text-xs text-slate-500"><span>Plan</span><span>Review</span><span>Grow with intention</span></div></div></div><p className="mt-4 text-center text-xs text-slate-400">Illustration placeholder — replace with your approved artwork.</p></div></div></section><section className="border-b border-slate-200 bg-white"><div className="container grid gap-6 py-8 sm:grid-cols-2 lg:grid-cols-4">{[['12+', 'Years of experience'], ['850+', 'Clients supported'], ['32', 'Services ready'], ['98%', 'Client satisfaction']].map(([number, label]) => <div key={label} className="border-l-2 border-[#C79A3B] pl-5"><p className="text-3xl font-semibold text-[#0B1F3A]">{number}</p><p className="mt-1 text-sm text-slate-500">{label}</p></div>)}</div></section><section id="services" className="bg-[#F8FAFC] py-24"><div className="container"><div className="max-w-2xl"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#19B6C9]">What we can help with</p><h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#0B1F3A] sm:text-4xl">Services organized around real decisions.</h2><p className="mt-4 leading-7 text-slate-600">Explore a category to see the active service pages. The short content is intentionally easy to replace with your own approved copy.</p></div><div className="mt-12 grid gap-5 lg:grid-cols-3">{CATEGORIES.map((category, index) => { const Icon = category.icon; const isOpen = expanded === index; return <div key={category.slug} className={`rounded-xl border bg-white p-6 transition ${isOpen ? 'border-[#19B6C9] shadow-lg' : 'border-slate-200 shadow-sm hover:-translate-y-1 hover:border-[#19B6C9]'}`}><div className="flex items-start justify-between"><span className="rounded-lg bg-[#0B1F3A] p-3 text-[#C79A3B]"><Icon size={22} /></span><button onClick={() => setExpanded(isOpen ? null : index)} className="rounded-full border border-slate-200 p-2 text-slate-500" aria-label={`Expand ${category.name}`}><ChevronDown className={isOpen ? 'rotate-180 transition' : 'transition'} size={18} /></button></div><h3 className="mt-6 text-xl font-semibold text-[#0B1F3A]">{category.name}</h3><p className="mt-3 min-h-14 text-sm leading-6 text-slate-600">{category.description}</p>{isOpen && <div className="mt-5 border-t border-slate-200 pt-4">{category.services.map((service) => <a key={service} href={`/services/${category.slug}/${slugify(service)}`} className="group flex items-center justify-between border-b border-slate-100 py-3 text-sm text-slate-700 last:border-0 hover:text-[#19B6C9]"><span>{service}</span><ArrowRight size={15} className="opacity-0 transition group-hover:opacity-100" /></a>)}<a href={`/services/${category.slug}`} className="mt-4 inline-flex items-center text-sm font-semibold text-[#0B1F3A]">View category <ArrowRight className="ml-2" size={15} /></a></div>}</div>})}</div></div></section><section id="approach" className="bg-white py-24"><div className="container grid gap-14 lg:grid-cols-[.85fr_1.15fr]"><div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#19B6C9]">Our approach</p><h2 className="mt-3 text-3xl font-semibold text-[#0B1F3A] sm:text-4xl">Practical structure before complex answers.</h2><p className="mt-5 leading-7 text-slate-600">Every engagement starts with context. We clarify the objective, review the relevant information, outline options, and agree the next useful step.</p></div><div className="grid gap-4 sm:grid-cols-2">{[['01', 'Listen first', 'Understand the people, business, and decision behind the request.'], ['02', 'Assess clearly', 'Turn available information into an understandable view of the situation.'], ['03', 'Plan deliberately', 'Set out practical choices without promising guaranteed outcomes.'], ['04', 'Support progress', 'Review and refine as circumstances change over time.']].map(([number, title, text]) => <div key={number} className="rounded-xl border border-slate-200 p-6"><span className="text-sm font-semibold text-[#C79A3B]">{number}</span><h3 className="mt-5 text-lg font-semibold text-[#0B1F3A]">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{text}</p></div>)}</div></div></section><section className="bg-[#F8FAFC] py-24"><div className="container"><div className="max-w-2xl"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#19B6C9]">Client perspective</p><h2 className="mt-3 text-3xl font-semibold text-[#0B1F3A] sm:text-4xl">Clear communication is part of good advice.</h2></div><div className="mt-10 grid gap-5 md:grid-cols-3">{[['Asha R.', 'Business owner', 'The process gave me a clear list of decisions instead of another confusing report.'], ['Daniel M.', 'Professional', 'The conversations were practical, measured, and easy to act on.'], ['Priya S.', 'Founder', 'I appreciated having the next step explained without pressure.']].map(([name, role, quote]) => <figure key={name} className="rounded-xl border border-slate-200 bg-white p-6"><div className="flex gap-1 text-[#C79A3B]">★★★★★</div><blockquote className="mt-4 text-sm leading-7 text-slate-600">“{quote}”</blockquote><figcaption className="mt-5 text-sm font-semibold text-[#0B1F3A]">{name}<span className="ml-2 font-normal text-slate-500">{role}</span></figcaption></figure>)}</div></div></section><section className="bg-white py-24"><div className="container grid gap-12 lg:grid-cols-[.8fr_1.2fr]"><div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#19B6C9]">Common questions</p><h2 className="mt-3 text-3xl font-semibold text-[#0B1F3A] sm:text-4xl">A straightforward place to begin.</h2></div><div className="divide-y divide-slate-200 rounded-xl border border-slate-200">{[['How do I get started?', 'Choose a service or contact us directly. We will use the first conversation to understand your context and outline the next useful step.'], ['Which services do you provide?', 'We support personal finance, accounting, tax, audit, investments, lending, and business advisory needs. Active services are listed in the service directory.'], ['Do you work with businesses?', 'Yes. The business advisory, accounting, tax, audit, and lending sections are designed for business requirements.'], ['Will I receive guaranteed investment returns?', 'No. Investment discussions are educational and advisory in nature. Any decision should reflect your objectives, time horizon, and risk profile.']].map(([question, answer]) => <details key={question} className="group p-5"><summary className="cursor-pointer list-none pr-8 font-semibold text-[#0B1F3A]">{question}<ChevronDown className="float-right transition group-open:rotate-180" size={18} /></summary><p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">{answer}</p></details>)}</div></div></section><section className="bg-[#0B1F3A] py-20 text-white"><div className="container flex flex-col items-start justify-between gap-7 rounded-2xl border border-white/10 bg-white/5 p-8 md:p-12 lg:flex-row lg:items-center"><div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#C79A3B]">Ready when you are</p><h2 className="mt-3 text-3xl font-semibold">Bring your next financial question into focus.</h2><p className="mt-3 max-w-xl text-slate-300">Start with a direct conversation or explore the service areas above.</p></div><div className="flex flex-wrap gap-3"><a href="#contact" className="rounded-md bg-[#C79A3B] px-5 py-3 font-semibold text-[#0B1F3A] hover:bg-[#19B6C9]">Book consultation</a><a href="#services" className="rounded-md border border-white/30 px-5 py-3 font-semibold text-white hover:border-[#19B6C9]">Browse services</a></div></div></section><section id="contact" className="bg-white py-20"><div className="container grid gap-10 lg:grid-cols-[1fr_420px] lg:items-center"><div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#19B6C9]">Start a conversation</p><h2 className="mt-3 text-3xl font-semibold text-[#0B1F3A]">Have a financial question to work through?</h2><p className="mt-3 max-w-xl text-slate-600">Choose your preferred contact method or send us your details directly through the consultation form.</p><div className="mt-8"><ContactButtons /></div></div><ConsultationForm serviceName="General Consultation" /></div></section></main><Footer /></>
}

function ConsultationForm({ serviceName = 'General Consultation' }) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: '',
    service: serviceName || 'General Consultation',
  })

  const [status, setStatus] = useState('idle')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (serviceName) {
      setFormData((prev) => ({ ...prev, service: serviceName }))
    }
  }, [serviceName])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (status === 'submitting') return

    setStatus('submitting')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to submit form. Please try again.')
      }

      setStatus('success')
    } catch (err) {
      console.error('Submission error:', err)
      setStatus('error')
      setErrorMessage(err.message || 'Something went wrong. Please try again later.')
    }
  }

  const handleReset = () => {
    setStatus('idle')
    setErrorMessage('')
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      city: '',
      service: serviceName || 'General Consultation',
    })
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-7 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#19B6C9]">Consultation request</p>
      <h2 className="mt-2 text-2xl font-semibold text-[#0B1F3A]">Tell us what you need</h2>
      <p className="mt-3 text-sm leading-6 text-slate-600">
        Fill out the form below to request a consultation with our team.
      </p>

      {status === 'success' ? (
        <div className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50 p-6 text-slate-800">
          <div className="flex items-center gap-3 text-emerald-600 font-semibold text-lg">
            <CheckCircle2 size={24} />
            Request Submitted!
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            Thank you for reaching out to finanCseek. We have received your details and will get in touch with you shortly.
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="mt-5 rounded-md bg-[#0B1F3A] px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#19B6C9]"
          >
            Submit another request
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
          {status === 'error' && (
            <div className="sm:col-span-2 rounded-md border border-rose-200 bg-rose-50 p-4 text-xs leading-5 text-rose-700 flex items-start gap-2">
              <AlertCircle size={18} className="shrink-0 mt-0.5" />
              <div>
                <strong>Submission Error:</strong> {errorMessage}
              </div>
            </div>
          )}

          <label className="text-sm font-medium text-slate-700">
            Full name
            <input
              required
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              disabled={status === 'submitting'}
              placeholder="Your name"
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-3 outline-none focus:border-[#19B6C9] disabled:bg-slate-100 disabled:opacity-70 text-slate-800"
            />
          </label>

          <label className="text-sm font-medium text-slate-700">
            Phone number
            <input
              required
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={status === 'submitting'}
              placeholder="Your phone number"
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-3 outline-none focus:border-[#19B6C9] disabled:bg-slate-100 disabled:opacity-70 text-slate-800"
            />
          </label>

          <label className="text-sm font-medium text-slate-700">
            Email
            <input
              required
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={status === 'submitting'}
              placeholder="Your email address"
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-3 outline-none focus:border-[#19B6C9] disabled:bg-slate-100 disabled:opacity-70 text-slate-800"
            />
          </label>

          <label className="text-sm font-medium text-slate-700">
            City
            <input
              required
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              disabled={status === 'submitting'}
              placeholder="Your city"
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-3 outline-none focus:border-[#19B6C9] disabled:bg-slate-100 disabled:opacity-70 text-slate-800"
            />
          </label>

          <label className="text-sm font-medium text-slate-700 sm:col-span-2">
            Service needed
            <input
              required
              type="text"
              name="service"
              value={formData.service}
              onChange={handleChange}
              disabled={status === 'submitting'}
              placeholder="Selected service"
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-3 outline-none focus:border-[#19B6C9] disabled:bg-slate-100 disabled:opacity-70 text-slate-800"
            />
          </label>

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="rounded-md bg-[#C79A3B] px-5 py-3 font-semibold text-[#0B1F3A] hover:bg-[#19B6C9] disabled:opacity-50 disabled:cursor-not-allowed sm:col-span-2 inline-flex items-center justify-center gap-2"
          >
            {status === 'submitting' ? (
              <>
                <Loader2 className="animate-spin" size={18} /> Submitting request...
              </>
            ) : (
              <>
                Submit consultation request <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>
      )}

      <div className="mt-6 border-t border-slate-200 pt-5">
        <p className="mb-3 text-sm font-medium text-slate-700">Prefer to contact us directly?</p>
        <ContactButtons />
      </div>
    </div>
  )
}


const SERVICE_CONTENT = {
  'financial-planning': 'Financial planning brings income, priorities, protection, and long-term goals into one practical roadmap. Use this page to add your preferred planning scope and client outcomes.',
  'budgeting-and-cash-flow-management': 'Budgeting and cash-flow support helps you understand where money is coming from and where it is going. Add your process for improving visibility, reserves, and monthly decisions.',
  'retirement-planning': 'Retirement planning connects your desired future lifestyle with savings, investments, income needs, and time horizon. Add your approved planning approach and review milestones here.',
  'wealth-management': 'Wealth management supports coordinated decisions around growth, diversification, protection, and family priorities. Add your service scope and review approach in this space.',
  'investment-advisory': 'Investment advisory starts with objectives, risk comfort, time horizon, and suitable options. Add your educational and review process here without making guaranteed-return claims.',
  'tax-planning': 'Tax planning considers current obligations and future decisions in an organized way. Add your permitted scope, documentation guidance, and planning timeline here.',
  'insurance-planning': 'Insurance planning helps identify important risks and consider appropriate protection. Add your coverage review process and client guidance here.',
  'bookkeeping': 'Bookkeeping keeps business transactions organized and easier to review. Add your records, reporting frequency, and handover process here.',
  'financial-statement-preparation': 'Financial statement preparation turns accounting records into useful reports for owners and stakeholders. Add the statements and reporting periods you support here.',
  'accounts-payable-and-receivable': 'Accounts payable and receivable support helps businesses track amounts owed and due. Add your workflow for invoices, collections, and payment visibility here.',
  'income-tax-return-preparation': 'Income tax return preparation organizes relevant income, deductions, and supporting records for filing. Add the client types and documentation you handle here.',
  'gst-filing': 'GST filing support helps keep periodic indirect-tax records and submissions organized. Add your filing frequency, review steps, and document checklist here.',
  'corporate-tax-planning': 'Corporate tax planning helps businesses consider tax obligations alongside commercial decisions. Add your planning scope, timelines, and documentation requirements here.',
  'tax-compliance': 'Tax compliance support helps keep recurring obligations, records, and deadlines visible. Add your compliance calendar and client responsibilities here.',
  'internal-audit': 'Internal audit reviews selected processes and controls to identify practical improvements. Add your audit scope, reporting format, and review cycle here.',
  'external-audit': 'External audit support helps prepare information and coordinate a clear review process. Add your preparation checklist and communication approach here.',
  'statutory-audit': 'Statutory audit work is structured around applicable reporting and compliance requirements. Add your jurisdiction-specific scope and document list here.',
  'internal-controls-review': 'Internal controls review examines how key activities are authorized, recorded, and monitored. Add the control areas and recommendations format you use here.',
  'portfolio-management': 'Portfolio management coordinates investments with objectives, risk, diversification, and review intervals. Add your advisory boundaries and review approach here.',
  'stock-market-advisory': 'Stock market advisory provides structured, risk-aware discussion around listed investments. Add your educational approach and client review process here.',
  'mutual-fund-advisory': 'Mutual fund advisory helps compare options with goals, time horizon, and risk in mind. Add your selection and review framework here.',
  'asset-allocation': 'Asset allocation considers how different investment types fit together for a defined objective. Add your assessment and rebalancing principles here.',
  'loan-advisory': 'Loan advisory helps compare financing needs, eligibility considerations, and repayment implications. Add your lender-neutral process and document list here.',
  'business-financing': 'Business financing support helps clarify capital needs and prepare information for funding discussions. Add your assessment and preparation steps here.',
  'business-planning': 'Business planning organizes commercial goals, operating assumptions, and financial priorities. Add your planning framework and deliverables here.',
  'startup-financial-consulting': 'Startup financial consulting helps founders build an understandable view of runway, costs, pricing, and funding needs. Add your startup-focused scope here.',
  'budget-forecasting': 'Budget forecasting gives teams a forward view of expected income, costs, and cash requirements. Add your forecast period and review process here.',
  'profitability-analysis': 'Profitability analysis helps identify the products, clients, or activities contributing to results. Add your analysis inputs and reporting format here.',
  'cost-reduction-strategies': 'Cost reduction strategy focuses on sustainable efficiency rather than indiscriminate cuts. Add your review areas and implementation support here.',
  'performance-improvement': 'Performance improvement connects financial information with measurable operating decisions. Add your diagnostic and follow-up process here.',
  'strategic-planning': 'Strategic planning turns priorities into practical initiatives, measures, and review points. Add your facilitation scope and outputs here.',
}

function serviceSummary(service) { return SERVICE_CONTENT[service.slug] || `${service.name} provides a structured way to address an important ${service.category.toLowerCase()} requirement. Add your approved two-to-three-line service description, scope, and client outcomes here.` }

function DetailedServicePage({ service, category }) {
  const related = category.services.filter((name) => name !== service.name).slice(0, 4)
  const bullets = ['Scope and priorities clarified before recommendations', 'Practical documentation and review guidance', 'A clear path for the next conversation']
  return <><Header /><main className="bg-[#F8FAFC]"><div className="container py-5 text-sm text-slate-500"><a href="/" className="hover:text-[#19B6C9]">Home</a><span className="mx-2">/</span><a href={`/services/${category.slug}`} className="hover:text-[#19B6C9]">{category.name}</a><span className="mx-2">/</span><span className="text-[#0B1F3A]">{service.name}</span></div><section className="border-y border-slate-200 bg-white"><div className="container grid gap-10 py-12 lg:grid-cols-[1fr_380px]"><div><span className="inline-flex rounded-full bg-[#19B6C9]/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#0B1F3A]">Trusted financial guidance</span><h1 className="mt-5 text-4xl font-semibold leading-tight text-[#0B1F3A] sm:text-5xl">{service.name}</h1><div className="mt-6 rounded-lg border border-slate-200 bg-[#F8FAFC] p-4 text-sm text-slate-600"><strong className="text-[#0B1F3A]">Reviewed by finanCseek team</strong><span className="mx-2 text-slate-300">|</span> Structured guidance <span className="mx-2 text-slate-300">|</span> Clear next steps</div><p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600">{serviceSummary(service)}</p><ul className="mt-7 space-y-4 text-sm text-slate-700">{bullets.map((bullet) => <li key={bullet}><Check className="mr-2 inline text-[#19B6C9]" size={18} /> {bullet}</li>)}</ul><div className="mt-8"><ContactButtons /></div><div className="mt-8 grid gap-5 border-t border-slate-200 pt-6 sm:grid-cols-3">{[['Clear', 'Communication'], ['Practical', 'Next steps'], ['Focused', 'Support']].map(([title, label]) => <div key={title}><strong className="block text-lg text-[#0B1F3A]">{title}</strong><span className="text-xs text-slate-500">{label}</span></div>)}</div></div><ConsultationForm serviceName={service.name} /></div></section><section className="container py-14"><div className="grid gap-5 md:grid-cols-2"><div className="rounded-xl border border-slate-200 bg-white p-7"><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#19B6C9]">Service overview</p><h2 className="mt-3 text-2xl font-semibold text-[#0B1F3A]">A concise starting point</h2><p className="mt-4 text-sm leading-7 text-slate-600">{serviceSummary(service)}</p></div><div className="rounded-xl border border-slate-200 bg-white p-7"><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#19B6C9]">What to prepare</p><h2 className="mt-3 text-2xl font-semibold text-[#0B1F3A]">Documents and information</h2><p className="mt-4 text-sm leading-7 text-slate-600">Add the service-specific documents, dates, records, and questions clients should prepare before contacting finanCseek.</p></div></div><div className="mt-5 rounded-xl border border-slate-200 bg-white p-7"><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#19B6C9]">Frequently asked questions</p><div className="mt-5 grid gap-3 md:grid-cols-2">{['Who is this service for?', 'What information should I prepare?', 'How does the first conversation work?', 'What happens after the initial review?'].map((question) => <details key={question} className="rounded-lg bg-[#F8FAFC] p-4"><summary className="cursor-pointer list-none text-sm font-semibold text-[#0B1F3A]">{question}</summary><p className="mt-3 text-sm leading-6 text-slate-600">Add a concise answer specific to {service.name.toLowerCase()} here.</p></details>)}</div></div><div className="mt-5 rounded-xl border border-slate-200 bg-white p-7"><h2 className="text-xl font-semibold text-[#0B1F3A]">Related services</h2><div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{related.map((name) => <a key={name} href={`/services/${category.slug}/${slugify(name)}`} className="group flex items-center justify-between rounded-lg border border-slate-200 p-4 text-sm font-medium text-slate-700 hover:border-[#19B6C9] hover:text-[#19B6C9]"><span>{name}</span><ArrowRight size={15} /></a>)}</div></div></section></main><Footer /></>
}

function CategoryPage({ category }) { return <><Header /><main className="bg-[#F8FAFC]"><section className="bg-[#0B1F3A] py-20 text-white"><div className="container"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#C79A3B]">Service category</p><h1 className="mt-4 text-4xl font-semibold sm:text-5xl">{category.name}</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">{category.description} Add your category introduction here when the content is ready.</p></div></section><section className="container py-16"><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{category.services.map((name) => <a key={name} href={`/services/${category.slug}/${slugify(name)}`} className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:-translate-y-1 hover:border-[#19B6C9]"><h2 className="font-semibold text-[#0B1F3A]">{name}</h2><p className="mt-3 text-sm leading-6 text-slate-500">Short editable service summary placeholder.</p><span className="mt-5 inline-flex items-center text-sm font-semibold text-[#19B6C9]">View service <ArrowRight className="ml-2" size={15} /></span></a>)}</div></section></main><Footer /></> }

function App() {
  const pathname = usePathname() || '/'
  const parts = pathname.split('/').filter(Boolean)
  const service = parts.length >= 3 ? getService(parts[2]) : null
  const category = parts[0] === 'services' ? getCategory(parts[1] || '') : null
  if (parts[0] === 'services' && service && category) return <DetailedServicePage service={service} category={category} />
  if (parts[0] === 'services' && category) return <CategoryPage category={category} />
  return <HomePage />
}

export default App
