import React, { useState, useEffect, useRef } from 'react'
import './App.css'

function useInView(threshold = 0.12) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, visible]
}

function Particles() {
  const pts = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 12}s`,
    duration: `${10 + Math.random() * 14}s`,
    size: `${2 + Math.random() * 3}px`,
    color: ['#22c55e','#06b6d4','#f59e0b','#86efac'][Math.floor(Math.random() * 4)],
  }))
  return (
    <div className="particles" aria-hidden="true">
      {pts.map(p => (
        <div key={p.id} className="particle" style={{
          left: p.left, width: p.size, height: p.size,
          background: p.color, animationDelay: p.delay, animationDuration: p.duration,
        }} />
      ))}
    </div>
  )
}

/* ── NAVBAR ── */
function Navbar({ active, setActive }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])
  const links = ['Home', 'About', 'FAQ', 'Contact']
  const handleNav = (page) => { setActive(page); setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-brand" onClick={() => handleNav('Home')}>
        <img src="/logo.png" alt="NextGen Power Solutions logo" className="nav-logo-img" />
        <div className="nav-brand-text">
          <span className="brand-main">NextGen Power</span>
          <span className="brand-sub">Solutions</span>
        </div>
      </div>
      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        {links.map(l => (
          <li key={l}>
            <button className={`nav-link ${active === l ? 'active' : ''}`} onClick={() => handleNav(l)}>{l}</button>
          </li>
        ))}
      </ul>
      <button className="nav-cta" onClick={() => handleNav('Contact')}>Get Free Quote</button>
      <button className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
        <span /><span /><span />
      </button>
    </nav>
  )
}

/* ── HOME ── */
function Home({ setActive }) {
  const [statsRef, statsVisible] = useInView()
  const [servicesRef, servicesVisible] = useInView()
  const [whyRef, whyVisible] = useInView()

  const stats = [
    { value: '500+', label: 'Installations Done' },
    { value: '15+', label: 'Years Experience' },
    { value: '98%', label: 'Client Satisfaction' },
    { value: '50MW+', label: 'Power Generated' },
  ]
  const services = [
    { icon: '🏠', title: 'Residential Solar', desc: 'Custom rooftop systems for homes. Cut electricity bills by up to 90%.', color: 'var(--green)' },
    { icon: '🏭', title: 'Commercial Solar', desc: 'Large-scale installations for businesses and commercial complexes.', color: 'var(--cyan)' },
    { icon: '🔋', title: 'Battery Storage', desc: 'Advanced battery solutions for 24/7 energy independence.', color: 'var(--amber)' },
    { icon: '🔧', title: 'Maintenance & AMC', desc: 'Annual contracts to keep your system at peak performance.', color: 'var(--green)' },
    { icon: '📊', title: 'Energy Audit', desc: 'Free assessment to recommend the right solar solution for you.', color: 'var(--cyan)' },
    { icon: '⚡', title: 'Grid Tie Systems', desc: 'Feed excess power to the grid and earn credits via net metering.', color: 'var(--amber)' },
  ]
  const whyUs = [
    { icon: '✅', title: 'MNRE Certified', desc: 'Government-approved and certified installation team.' },
    { icon: '💰', title: 'Best Price Guarantee', desc: 'Competitive pricing with flexible EMI options.' },
    { icon: '🛡️', title: '25-Year Warranty', desc: 'Industry-leading warranty on panels and workmanship.' },
    { icon: '📞', title: '24/7 Support', desc: 'Round-the-clock customer support and monitoring.' },
  ]

  return (
    <div className="page">
      {/* HERO */}
      <section className="hero">
        <Particles />
        <div className="aurora-orb orb-green" />
        <div className="aurora-orb orb-cyan" />
        <div className="aurora-orb orb-amber" />
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot" />
            India's Trusted Solar Partner
          </div>
          <h1 className="hero-title">
            Power Your Future<br />
            <span className="gradient-text">With Solar Energy</span>
          </h1>
          <p className="hero-desc">
            NextGen Power Solutions delivers premium solar installations for homes and businesses.
            Cut your electricity bills, go green, and achieve energy independence.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => setActive('Contact')}>Get Free Quote →</button>
            <button className="btn-glass" onClick={() => setActive('About')}>Learn More</button>
          </div>
          <div className="hero-trust">
            <span>⭐⭐⭐⭐⭐</span>
            <span>Rated 4.9/5 by 500+ customers</span>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-ring ring1" />
          <div className="hero-ring ring2" />
          <img src="/logo.png" alt="NextGen Power Solutions" className="hero-logo" />
        </div>
      </section>

      {/* STATS */}
      <section className={`stats-bar ${statsVisible ? 'visible' : ''}`} ref={statsRef}>
        {stats.map((s, i) => (
          <div className="stat-item glass-card" key={s.label} style={{ animationDelay: `${i * 0.1}s` }}>
            <span className="stat-value">{s.value}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </section>

      {/* SERVICES */}
      <section className={`services-section section ${servicesVisible ? 'visible' : ''}`} ref={servicesRef}>
        <div className="section-tag">// what we offer</div>
        <h2 className="section-title">Our Solar <span className="gradient-text">Services</span></h2>
        <p className="section-sub">End-to-end solar solutions tailored to your energy needs and budget.</p>
        <div className="services-grid">
          {services.map((s, i) => (
            <div className="service-card glass-card" key={s.title} style={{ animationDelay: `${i * 0.08}s`, '--accent': s.color }}>
              <div className="service-accent" />
              <div className="service-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section className={`why-section section ${whyVisible ? 'visible' : ''}`} ref={whyRef}>
        <div className="why-inner">
          <div className="why-text">
            <div className="section-tag">// why choose us</div>
            <h2 className="section-title">The NextGen <span className="gradient-text">Advantage</span></h2>
            <p className="section-sub">We don't just install solar panels — we deliver a complete energy transformation backed by expertise and trust.</p>
            <button className="btn-primary" onClick={() => setActive('Contact')}>Talk to an Expert →</button>
          </div>
          <div className="why-cards">
            {whyUs.map((w, i) => (
              <div className="why-card glass-card" key={w.title} style={{ animationDelay: `${i * 0.1}s` }}>
                <span className="why-icon">{w.icon}</span>
                <div>
                  <h4>{w.title}</h4>
                  <p>{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="cta-banner">
        <div className="aurora-orb orb-cta" />
        <div className="cta-banner-inner glass-card">
          <div>
            <h2>Ready to Switch to Solar?</h2>
            <p>Get a free site assessment and customized quote within 24 hours.</p>
          </div>
          <button className="btn-primary" onClick={() => setActive('Contact')}>Get Free Quote Today</button>
        </div>
      </section>
    </div>
  )
}

/* ── ABOUT ── */
function About() {
  const [missionRef, missionVisible] = useInView()
  const [teamRef, teamVisible] = useInView()

  const team = [
    { name: 'Rajesh Kumar', role: 'Founder & CEO', exp: '20+ years in renewable energy' },
    { name: 'Priya Sharma', role: 'Head of Engineering', exp: 'MNRE certified solar engineer' },
    { name: 'Amit Patel', role: 'Sales Director', exp: '500+ successful installations' },
  ]
  const milestones = [
    { year: '2009', event: 'Founded in Pune with a vision for clean energy' },
    { year: '2013', event: 'Crossed 100 residential installations' },
    { year: '2017', event: 'Expanded to commercial & industrial segment' },
    { year: '2020', event: 'Launched battery storage solutions' },
    { year: '2024', event: '500+ installations, 50MW+ power generated' },
  ]

  return (
    <div className="page">
      <section className="page-hero">
        <div className="aurora-orb orb-page-green" />
        <div className="aurora-orb orb-page-cyan" />
        <div className="page-hero-content">
          <div className="section-tag">// about us</div>
          <h1>Powering India's <span className="gradient-text">Clean Energy</span> Future</h1>
          <p>NextGen Power Solutions has been at the forefront of India's solar revolution since 2009. We believe every home and business deserves affordable, reliable, and clean energy.</p>
        </div>
      </section>

      <section className={`mission-section section ${missionVisible ? 'visible' : ''}`} ref={missionRef}>
        <div className="mission-grid">
          {[
            { icon: '🎯', title: 'Our Mission', desc: 'To accelerate India\'s transition to solar energy by making it accessible, affordable, and hassle-free for every household and business.', color: 'var(--green)' },
            { icon: '👁️', title: 'Our Vision', desc: 'A future where every rooftop generates clean energy — reducing carbon footprints and empowering communities with energy independence.', color: 'var(--cyan)' },
            { icon: '💡', title: 'Our Values', desc: 'Integrity, quality, and customer-first approach. We stand behind every installation with industry-leading warranties and support.', color: 'var(--amber)' },
          ].map((m, i) => (
            <div className="mission-card glass-card" key={m.title} style={{ animationDelay: `${i * 0.12}s`, '--accent': m.color }}>
              <div className="mission-accent" />
              <div className="mission-icon">{m.icon}</div>
              <h3 style={{ color: m.color }}>{m.title}</h3>
              <p>{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="timeline-section section">
        <div className="section-tag">// our journey</div>
        <h2 className="section-title">15+ Years of <span className="gradient-text">Excellence</span></h2>
        <div className="timeline">
          <div className="timeline-line" />
          {milestones.map((m, i) => (
            <div className={`timeline-item ${i % 2 === 0 ? 'left' : 'right'}`} key={m.year}>
              <div className="timeline-dot" />
              <div className="timeline-card glass-card">
                <span className="timeline-year">{m.year}</span>
                <p>{m.event}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={`team-section section ${teamVisible ? 'visible' : ''}`} ref={teamRef}>
        <div className="section-tag">// leadership</div>
        <h2 className="section-title">Meet the <span className="gradient-text">Team</span></h2>
        <div className="team-grid">
          {team.map((m, i) => (
            <div className="team-card glass-card" key={m.name} style={{ animationDelay: `${i * 0.12}s` }}>
              <div className="team-avatar">{m.name.charAt(0)}</div>
              <h4>{m.name}</h4>
              <span className="team-role">{m.role}</span>
              <p>{m.exp}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="certs-section section">
        <div className="section-tag">// credentials</div>
        <h2 className="section-title">Certified & <span className="gradient-text">Trusted</span></h2>
        <div className="certs-grid">
          {['MNRE Approved', 'ISO 9001:2015', 'BIS Certified', 'DISCOM Empanelled', 'NABCB Accredited'].map(c => (
            <div className="cert-badge glass-card" key={c}><span>🏆</span> {c}</div>
          ))}
        </div>
      </section>
    </div>
  )
}

/* ── FAQ ── */
function FAQ() {
  const [open, setOpen] = useState(null)
  const faqs = [
    { q: 'How much does a solar system cost?', a: 'A typical residential solar system (3–5 kW) costs between ₹1.5–3 lakhs after government subsidies. The exact cost depends on your energy consumption, roof area, and system size. We offer free site assessments and customized quotes.' },
    { q: 'What government subsidies are available?', a: 'Under PM Surya Ghar Muft Bijli Yojana, you can get up to ₹78,000 subsidy for a 3 kW system. Additional state subsidies may also apply. Our team handles all subsidy paperwork on your behalf.' },
    { q: 'How long does installation take?', a: 'A standard residential installation takes 1–3 days. Commercial projects may take 1–2 weeks depending on scale. We handle everything from permits to grid connection.' },
    { q: 'What is the payback period?', a: 'Most residential systems pay back in 4–6 years. With rising electricity tariffs, many customers see payback in under 4 years. After that, you enjoy virtually free electricity for 20+ years.' },
    { q: 'Do solar panels work on cloudy days?', a: 'Yes. Solar panels generate electricity from daylight, not direct sunlight. They produce 10–25% of their rated capacity on overcast days. With battery storage, you can power your home even at night.' },
    { q: 'What maintenance is required?', a: 'Solar panels require minimal maintenance — just periodic cleaning every 2–3 months. We offer Annual Maintenance Contracts (AMC) that include cleaning, inspection, and performance monitoring.' },
    { q: 'What warranty do you provide?', a: 'We provide 25-year performance warranty on solar panels, 10-year product warranty on inverters, and 5-year workmanship warranty on installation. All warranties are backed by manufacturers.' },
    { q: 'Can I sell excess electricity back to the grid?', a: 'Yes, through net metering. Excess units generated are fed to the grid and credited to your electricity bill, further reducing your costs and improving ROI.' },
    { q: 'How do I know what system size I need?', a: 'We analyze your last 12 months of electricity bills, roof area, and shading to recommend the optimal system size. Our free energy audit covers all of this at no cost.' },
    { q: 'Do you handle all the paperwork?', a: 'Absolutely. We manage everything — DISCOM approvals, net metering applications, subsidy claims, and grid connection. You just sit back and enjoy the savings.' },
  ]

  return (
    <div className="page">
      <section className="page-hero">
        <div className="aurora-orb orb-page-green" />
        <div className="page-hero-content">
          <div className="section-tag">// faq</div>
          <h1>Frequently Asked <span className="gradient-text">Questions</span></h1>
          <p>Everything you need to know about going solar with NextGen Power Solutions.</p>
        </div>
      </section>
      <section className="faq-section section">
        <div className="faq-list">
          {faqs.map((f, i) => (
            <div className={`faq-item ${open === i ? 'open' : ''}`} key={i} onClick={() => setOpen(open === i ? null : i)}>
              <div className="faq-question">
                <span>{f.q}</span>
                <span className="faq-icon">{open === i ? '−' : '+'}</span>
              </div>
              <div className="faq-answer"><p>{f.a}</p></div>
            </div>
          ))}
        </div>
        <div className="faq-cta glass-card">
          <h3>Still have questions?</h3>
          <p>Our solar experts are available Mon–Sat, 9 AM – 6 PM</p>
          <div className="faq-contact-options">
            <a href="tel:+911800123456" className="contact-chip">📞 1800-123-456</a>
            <a href="mailto:info@nextgenpowersolutions.in" className="contact-chip">✉️ info@nextgenpowersolutions.in</a>
          </div>
        </div>
      </section>
    </div>
  )
}

/* ── CONTACT ── */
function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', city: '', type: 'Residential', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })
  const handleSubmit = e => { e.preventDefault(); setSubmitted(true) }

  return (
    <div className="page">
      <section className="page-hero">
        <div className="aurora-orb orb-page-cyan" />
        <div className="page-hero-content">
          <div className="section-tag">// contact us</div>
          <h1>Let's Start Your <span className="gradient-text">Solar Journey</span></h1>
          <p>Get a free site assessment and customized quote. No obligations, no pressure.</p>
        </div>
      </section>
      <section className="contact-section section">
        <div className="contact-grid">
          <div className="contact-info">
            <h3>Get in Touch</h3>
            <p className="contact-intro">Our solar consultants are ready to help you find the perfect solution.</p>
            <div className="contact-details">
              {[
                { icon: '📞', title: 'Phone / WhatsApp', lines: ['1800-123-456 (Toll Free)', '+91 98765 43210'] },
                { icon: '✉️', title: 'Email', lines: ['info@nextgenpowersolutions.in', 'sales@nextgenpowersolutions.in'] },
                { icon: '📍', title: 'Office', lines: ['NextGen Power Solutions', 'Baner Road, Pune – 411045', 'Maharashtra, India'] },
                { icon: '🕐', title: 'Working Hours', lines: ['Monday – Saturday: 9 AM – 6 PM', 'Sunday: Closed'] },
              ].map(item => (
                <div className="contact-item" key={item.title}>
                  <span className="contact-icon">{item.icon}</span>
                  <div>
                    <strong>{item.title}</strong>
                    {item.lines.map(l => <p key={l}>{l}</p>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="contact-form-wrap glass-card">
            {submitted ? (
              <div className="form-success">
                <div className="success-icon">✅</div>
                <h3>Thank You!</h3>
                <p>We've received your enquiry. Our team will contact you within 24 hours.</p>
                <button className="btn-primary" onClick={() => setSubmitted(false)}>Submit Another</button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <h3>Request a Free Quote</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input id="name" name="name" type="text" placeholder="Your name" value={form.name} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input id="phone" name="phone" type="tel" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={handleChange} required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input id="email" name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="city">City *</label>
                    <input id="city" name="city" type="text" placeholder="Your city" value={form.city} onChange={handleChange} required />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="type">Installation Type</label>
                  <select id="type" name="type" value={form.type} onChange={handleChange}>
                    <option>Residential</option>
                    <option>Commercial</option>
                    <option>Industrial</option>
                    <option>Agricultural</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message / Requirements</label>
                  <textarea id="message" name="message" rows="4" placeholder="Tell us about your energy needs, roof size, monthly bill, etc." value={form.message} onChange={handleChange} />
                </div>
                <button type="submit" className="btn-primary full-width">Submit Enquiry →</button>
                <p className="form-note">🔒 Your information is safe with us. No spam, ever.</p>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

/* ── FOOTER ── */
function Footer({ setActive }) {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <img src="/logo.png" alt="NextGen Power Solutions" className="footer-logo-img" />
          <div>
            <div className="footer-brand-name">NextGen Power Solutions</div>
            <p className="footer-tagline">Powering a cleaner, greener tomorrow.</p>
          </div>
        </div>
        <div className="footer-links-group">
          <strong>Quick Links</strong>
          {['Home', 'About', 'FAQ', 'Contact'].map(l => (
            <button key={l} className="footer-link" onClick={() => { setActive(l); window.scrollTo({ top: 0 }) }}>{l}</button>
          ))}
        </div>
        <div className="footer-links-group">
          <strong>Services</strong>
          {['Residential Solar', 'Commercial Solar', 'Battery Storage', 'AMC & Maintenance'].map(s => <span key={s}>{s}</span>)}
        </div>
        <div className="footer-links-group">
          <strong>Contact</strong>
          <span>📞 1800-123-456</span>
          <span>✉️ info@nextgenpowersolutions.in</span>
          <span>📍 Pune, Maharashtra</span>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 NextGen Power Solutions. All rights reserved.</p>
        <p>MNRE Approved · ISO 9001:2015 Certified</p>
      </div>
    </footer>
  )
}

/* ── ROOT ── */
export default function App() {
  const [active, setActive] = useState('Home')
  const pages = { Home, About, FAQ, Contact }
  const PageComponent = pages[active]
  return (
    <>
      <Navbar active={active} setActive={setActive} />
      <main><PageComponent setActive={setActive} /></main>
      <Footer setActive={setActive} />
    </>
  )
}
