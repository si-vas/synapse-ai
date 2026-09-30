import { type CSSProperties, type FormEvent, type ReactNode, useEffect, useRef, useState } from 'react';
import {
  ArrowUpRight,
  Check,
  ChevronRight,
  Code2,
  Command,
  Copy,
  FileCode2,
  Github,
  Globe2,
  Layers3,
  Menu,
  MessageSquareText,
  Moon,
  Palette,
  Play,
  Plus,
  Send,
  Sparkles,
  Sun,
  SlidersHorizontal,
  X,
  Zap,
} from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';

const queryClient = new QueryClient();

const features = [
  {
    number: '01',
    icon: Sparkles,
    title: 'AI Theme Generation',
    text: 'Describe the feeling you want. Synapse maps intent to a complete token system your team can shape in seconds.',
  },
  {
    number: '02',
    icon: Layers3,
    title: 'Multi-Platform Export',
    text: 'Ship the same source of truth to React, Vue, Figma, and Tailwind without rebuilding the system four times.',
  },
  {
    number: '03',
    icon: FileCode2,
    title: 'Automatic Documentation',
    text: 'Every generated primitive arrives with usage notes, accessibility states, and examples your team can trust.',
  },
];

const faqs = [
  {
    question: 'Can Synapse generate production-ready components?',
    answer:
      'Yes. Generated components include typed props, responsive states, accessible interaction patterns, design tokens, and documentation. Your team stays in control of the final review and merge.',
  },
  {
    question: 'Can I import an existing design system?',
    answer:
      'Yes. Import tokens from CSS, JSON, Figma, or your existing component library. Synapse learns your naming conventions and extends the system instead of asking you to start over.',
  },
  {
    question: 'Which frameworks does Synapse support?',
    answer:
      'Synapse v2.0 supports React and Vue out of the box, with export paths for Figma, Tailwind tokens, CSS variables, and framework-neutral documentation.',
  },
  {
    question: 'How does pricing work?',
    answer:
      'Start free with one active system, then move to Pro when your team needs more systems and collaboration. Enterprise plans include custom permissions, SSO, and dedicated support.',
  },
];

function scrollToId(id: string, setOpen?: (open: boolean) => void) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  setOpen?.(false);
}

function Reveal({ children, className = '', delay = '' }: { children: ReactNode; className?: string; delay?: string }) {
  const node = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = node.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.12 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return <div ref={node} className={`reveal ${visible ? 'visible' : ''} ${delay} ${className}`}>{children}</div>;
}

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <nav className="nav container-wide" aria-label="Primary navigation">
        <button className="brand" onClick={() => scrollToId('top', setMobileOpen)} data-testid="button-logo">
          <span className="brand-mark" aria-hidden="true" />
          <span>synapse</span>
        </button>
        <div className="nav-links">
          <button onClick={() => scrollToId('platform')} data-testid="link-features">Features</button>
          <button onClick={() => scrollToId('demo')} data-testid="link-core-engine">Core Engine</button>
          <button onClick={() => scrollToId('pricing')} data-testid="link-pricing">Pricing</button>
          <button onClick={() => scrollToId('faq')} data-testid="link-faq">FAQ</button>
        </div>
        <div className="nav-actions">
          <button className="nav-login" onClick={() => scrollToId('newsletter')} data-testid="button-login">Log In</button>
          <button className="nav-cta" onClick={() => scrollToId('demo')} data-testid="button-header-cta">Enter App <ArrowUpRight size={13} /></button>
          <button className="menu-button" onClick={() => setMobileOpen((open) => !open)} aria-label="Toggle navigation" data-testid="button-mobile-menu">
            {mobileOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
        {mobileOpen && (
          <div className="mobile-menu">
            <a href="#platform" onClick={() => setMobileOpen(false)} data-testid="link-mobile-features">Features</a>
            <a href="#demo" onClick={() => setMobileOpen(false)} data-testid="link-mobile-core-engine">Core Engine</a>
            <a href="#pricing" onClick={() => setMobileOpen(false)} data-testid="link-mobile-pricing">Pricing</a>
            <a href="#faq" onClick={() => setMobileOpen(false)} data-testid="link-mobile-faq">FAQ</a>
          </div>
        )}
      </nav>
    </header>
  );
}

function ProductWindow() {
  return (
    <div className="product-window" data-testid="product-preview">
      <div className="window-top">
        <span className="window-dot" /><span className="window-dot" /><span className="window-dot" />
        <span className="window-title">synapse / orbit-system</span>
      </div>
      <div className="window-body">
        <aside className="window-side">
          <div className="side-heading">Workspace</div>
          <div className="side-item active"><Sparkles size={11} /> Prompt</div>
          <div className="side-item"><Palette size={11} /> Tokens</div>
          <div className="side-item"><Layers3 size={11} /> Components</div>
          <div className="side-item"><FileCode2 size={11} /> Docs</div>
          <div className="side-heading" style={{ marginTop: 25 }}>Projects</div>
          <div className="side-item">orbit-web</div>
          <div className="side-item">mobile-kit</div>
        </aside>
        <div className="preview">
          <div className="preview-top"><span>New system</span><span className="mono">v2.0.4 · synced</span></div>
          <div className="prompt-box"><Command size={12} /> Make a focused dashboard for monitoring model latency <ChevronRight size={12} style={{ marginLeft: 'auto' }} /></div>
          <div className="generated">
            <div className="generated-panel">
              <div className="generated-label">Color tokens</div>
              <div className="color-row"><span className="swatch" style={{ background: '#3fe8cf' }} /><span className="swatch" style={{ background: '#ffbd61' }} /><span className="swatch" style={{ background: '#5d7594' }} /><span className="swatch" style={{ background: '#18283d' }} /></div>
              <div className="wireframe"><span className="wire-line long" /><span className="wire-line mid" /><span className="wire-line short" /><span className="wire-button" /></div>
            </div>
            <div className="generated-panel">
              <div className="generated-label">Core tokens</div>
              <div className="token-row"><span><i className="token-dot" style={{ background: '#3fe8cf' }} />primary</span><b>#3FE8CF</b></div>
              <div className="token-row"><span><i className="token-dot" style={{ background: '#ffbd61' }} />signal</span><b>#FFBD61</b></div>
              <div className="token-row"><span><i className="token-dot" style={{ background: '#5d7594' }} />muted</span><b>#5D7594</b></div>
              <div className="window-status">12 decisions resolved</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container-wide hero-grid">
        <div className="hero-copy">
          <Reveal>
            <div className="release-pill"><span /> ✨ Introducing Synapse v2.0 — Driven by AI</div>
          </Reveal>
          <Reveal delay="delay-1">
            <h1 className="display">Design Systems, <em>Automated</em> by AI</h1>
          </Reveal>
          <Reveal delay="delay-2">
            <p className="hero-description">Generate, sync, and deploy production-ready UI tokens and components straight from your natural language prompts. Bridge the gap between canvas and code instantly.</p>
          </Reveal>
          <Reveal delay="delay-3">
            <div className="hero-actions">
              <button className="btn-primary" onClick={() => scrollToId('demo')} data-testid="button-hero-start">Start Free Trial <ArrowUpRight size={14} /></button>
              <button className="hero-secondary" onClick={() => scrollToId('demo')} data-testid="button-hero-demo"><Play size={14} /> Watch Demo</button>
            </div>
            <div className="hero-proof">
              <div className="avatar-stack"><span className="avatar">AL</span><span className="avatar">MK</span><span className="avatar">JR</span><span className="avatar">+4k</span></div>
              <span>Trusted by the teams shaping what’s next</span>
            </div>
          </Reveal>
        </div>
        <Reveal className="hero-visual" delay="delay-2">
          <div className="orbit" aria-hidden="true" />
          <div className="scan-line" aria-hidden="true" />
          <ProductWindow />
          <div className="float-tag tag-one"><strong>Generated in 4.2s</strong>12 tokens · 3 components</div>
          <div className="float-tag tag-two"><strong>Intent preserved</strong>From canvas to code</div>
        </Reveal>
      </div>
    </section>
  );
}

function LogoStrip() {
  return (
    <div className="logo-strip">
      <div className="container-wide logo-row">
        <span>Built for people who build</span>
        <div className="logo"><span className="logo-mark" /> northstar</div>
        <div className="logo"><Zap size={15} /> lumen</div>
        <div className="logo"><span className="logo-mark" /> arcfield</div>
        <div className="logo"><Globe2 size={15} /> plainview</div>
        <div className="logo"><span className="logo-mark" /> folio</div>
      </div>
    </div>
  );
}

function PlatformSection() {
  const [palette, setPalette] = useState<'signal' | 'violet'>('signal');
  return (
    <section className="section" id="platform">
      <div className="container-wide">
        <Reveal className="story-heading">
          <div className="section-label eyebrow">The intelligent layer</div>
          <h2 className="display">Everything your system<br /><span>needs to move.</span></h2>
          <p>Synapse turns the invisible work behind great products into a living, legible system. Every decision stays connected from prompt to production.</p>
        </Reveal>
        <div className="bento-grid">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Reveal key={feature.number} delay={`delay-${Math.min(index + 1, 3)}`}>
                <div className={`bento-card bento-${feature.number}`} data-testid={`feature-${feature.number}`}>
                  <div className="bento-card-top"><div className="feature-number">{feature.number}</div><Icon size={18} color="hsl(var(--primary))" /></div>
                  <div><h3>{feature.title}</h3></div>
                  <p>{feature.text}</p>
                  {feature.number === '01' && (
                    <div className={`palette-preview ${palette}`}>
                      <div className="palette-top"><span>Theme / generated</span><button onClick={() => setPalette(palette === 'signal' ? 'violet' : 'signal')} aria-label="Toggle generated palette"><Sun size={11} /></button></div>
                      <div className="palette-swatches"><i /><i /><i /><i /></div>
                      <div className="palette-lines"><span /><span /><span /></div>
                    </div>
                  )}
                  {feature.number === '02' && (
                    <div className="platform-badges">
                      {['React', 'Vue', 'Figma', 'Tailwind'].map((platform) => <span key={platform}><Check size={11} /> {platform}</span>)}
                    </div>
                  )}
                  {feature.number === '03' && (
                    <pre className="markdown-preview"><code><span># Button</span>{'\n'}A flexible, accessible button.{'\n'}{'\n'}- `variant`: primary{'\n'}- `size`: md{'\n'}- `loading`: false</code></pre>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function VelocitySection() {
  const [projects, setProjects] = useState(5);
  const savedHours = Math.round(projects * 3.2 + 6);
  const overheadReduced = Math.round(projects * 840 + 2400);
  return (
    <section className="dark-band" id="velocity">
      <div className="container-wide">
        <Reveal className="section-heading">
          <div className="section-label eyebrow">The velocity calculator</div>
          <h2 className="display">More time for<br /><span>the hard parts.</span></h2>
           <p>Estimate the hours your team gets back every week when the handoff stops being a handoff.</p>
        </Reveal>
        <Reveal className="velocity" delay="delay-1">
          <div className="calculator-card">
            <div className="calc-title"><span>TEAM CONFIGURATION</span><SlidersHorizontal size={14} /></div>
            <div className="slider-wrap">
               <div className="slider-label"><span>Projects shipped per month</span><span className="slider-value">{projects}</span></div>
               <input className="range" type="range" min="1" max="50" value={projects} onChange={(event) => setProjects(Number(event.target.value))} style={{ '--progress': `${((projects - 1) / 49) * 100}%` } as CSSProperties} data-testid="input-projects-slider" />
            </div>
            <div className="calc-result">
               <div><small>HOURS SAVED PER WEEK</small><strong>{savedHours}<small style={{ display: 'inline', fontSize: 13 }}>h</small></strong></div>
               <b>DESIGN OVERHEAD REDUCED (${overheadReduced.toLocaleString()})</b>
            </div>
          </div>
          <div className="velocity-copy">
            <blockquote>“The fastest team is not the one that works faster. It’s the one that <em>repeats less.</em>”</blockquote>
            <p>Synapse eliminates the translation tax: fewer status meetings, fewer token audits, fewer “which version is this?” messages.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function DemoSection() {
  const [prompt, setPrompt] = useState('A calmer settings page for a financial product');
  const [submittedPrompt, setSubmittedPrompt] = useState(prompt);
  const [status, setStatus] = useState('Ready to generate');
  const presets = ['A dashboard for model latency', 'A calmer settings page', 'A sharp mobile onboarding'];

  const submit = (event?: FormEvent) => {
    event?.preventDefault();
    setStatus('Synthesizing system…');
    window.setTimeout(() => {
      setSubmittedPrompt(prompt);
      setStatus('Generated 8 decisions');
    }, 650);
  };

  return (
    <section className="demo-section" id="demo">
      <div className="container-wide demo-grid">
        <Reveal className="demo-copy">
          <div className="section-label eyebrow">Try the loop</div>
          <h2 className="display">Give it a sentence.<br /><span>Get a system.</span></h2>
          <p>Describe a direction in plain language. Synapse will return the structure, tokens, and component logic that make it real.</p>
          <form className="demo-input" onSubmit={submit}>
            <MessageSquareText size={14} />
            <input value={prompt} onChange={(event) => setPrompt(event.target.value)} aria-label="Describe your interface" data-testid="input-demo-prompt" />
            <button className="demo-submit" type="submit" data-testid="button-run-demo"><Play size={11} /> Run</button>
          </form>
          <div className="demo-presets">
            {presets.map((preset) => <button className="preset" key={preset} onClick={() => setPrompt(preset)} data-testid={`button-preset-${preset.slice(0, 4)}`}>{preset}</button>)}
          </div>
          <div className="window-status" style={{ marginTop: 17 }} data-testid="status-demo">{status} <span style={{ color: '#718297' }}>· “{submittedPrompt}”</span></div>
        </Reveal>
        <Reveal className="code-preview" delay="delay-2">
          <div className="code-tabs"><span className="selected">Component.tsx</span><span>tokens.css</span><span>README.md</span><Copy size={13} style={{ marginLeft: 'auto' }} /></div>
          <div className="code-content">
            <div className="code-lines">
              <span>01  <span className="gold">export</span> <span className="cyan">function</span> SystemCard() {'{'}</span>{'\n'}
              <span>02    <span className="gold">return</span> (</span>{'\n'}
              <span>03      &lt;Card</span>{'\n'}
              <span>04        tone=<span className="cyan">"quiet"</span></span>{'\n'}
              <span>05        density=<span className="cyan">"comfortable"</span></span>{'\n'}
              <span>06      &gt;</span>{'\n'}
              <span>07        &lt;CardHeader /&gt;</span>{'\n'}
              <span>08        &lt;MetricGrid /&gt;</span>{'\n'}
              <span>09      &lt;/Card&gt;</span>{'\n'}
              <span>10    )</span>{'\n'}
              <span>11  {'}'}</span>
            </div>
            <div className="component-preview">
              <div className="component-label">Live component preview</div>
              <div className="mini-component">
                <div className="mini-component-header"><span>System health</span><span /></div>
                <div className="mini-graph">
                  <svg viewBox="0 0 300 80" preserveAspectRatio="none" aria-hidden="true"><path d="M0 65 C 28 58, 34 28, 68 42 S 103 60, 128 33 S 169 50, 196 26 S 230 46, 260 16 S 283 26, 300 7" fill="none" stroke="#3fe8cf" strokeWidth="2" /><path d="M0 80 L0 65 C 28 58, 34 28, 68 42 S 103 60, 128 33 S 169 50, 196 26 S 230 46, 260 16 S 283 26, 300 7 L300 80" fill="rgba(63,232,207,.09)" stroke="none" /></svg>
                </div>
                <div className="mini-stats"><div className="mini-stat"><small>Latency</small><b>184ms</b></div><div className="mini-stat"><small>Uptime</small><b>99.94%</b></div></div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ThemeSection() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  return (
    <section className="theme-section">
      <div className="container-wide theme-grid">
        <Reveal className="theme-copy">
          <div className="section-label eyebrow">Your language, amplified</div>
          <h2 className="display">A system that<br /><span>sounds like you.</span></h2>
          <p>Synapse learns the grammar of your product: the palette, the rhythm, the restraint. Change one decision and watch the whole system respond.</p>
          <div className="theme-toggle" role="group" aria-label="Preview theme">
            <button className={theme === 'light' ? 'active' : ''} onClick={() => setTheme('light')} data-testid="button-theme-light"><Sun size={12} /> Light</button>
            <button className={theme === 'dark' ? 'active' : ''} onClick={() => setTheme('dark')} data-testid="button-theme-dark"><Moon size={12} /> Dark</button>
          </div>
        </Reveal>
        <Reveal className={`theme-canvas ${theme}`} delay="delay-1">
          <div className="canvas-bar"><span>{theme === 'dark' ? 'DARK MODE / TOKENS' : 'LIGHT MODE / TOKENS'}</span><span className="mono">12:04:18</span></div>
          <div className="canvas-grid">
            <div className="canvas-block tall"><div className="block-title">Coverage</div><div className="block-circle" style={theme === 'light' ? { borderColor: '#3b6d73', borderRightColor: '#d6b15d' } : undefined} /><div className="block-line" /><div className="block-line short" /></div>
            <div className="canvas-block"><div className="block-title">Decisions</div><div className="block-bars"><i /><i /><i /><i /></div></div>
            <div className="canvas-block"><div className="block-title">Active branch</div><div className="block-line" /><div className="block-line short" /><div className="block-line" /></div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function PricingSection() {
  const [yearly, setYearly] = useState(false);
  const [selected, setSelected] = useState('');
  const plans = [
    { name: 'Starter', price: '$0', desc: 'For independent makers finding their first shared language.', features: ['1 active system', 'Unlimited prompts', 'React + CSS export'] },
    { name: 'Pro', price: yearly ? '$39' : '$49', desc: 'For product teams making software at a higher frequency.', features: ['Unlimited systems', 'Figma sync + branches', 'Review-ready diffs'], featured: true },
    { name: 'Enterprise', price: 'Custom', desc: 'For organizations where consistency is a competitive edge.', features: ['Custom permissions', 'SSO + audit history', 'Dedicated system architect'] },
  ];
  return (
    <section className="pricing-section" id="pricing">
      <div className="container-wide">
        <Reveal className="pricing-head">
          <div><div className="section-label eyebrow">Simple by design</div><h2 className="display">Pick your<br /><span>starting point.</span></h2></div>
          <div className="billing-toggle"><span>Monthly</span><button className={yearly ? 'yearly' : ''} onClick={() => setYearly((value) => !value)} aria-label="Toggle yearly billing" data-testid="button-billing-toggle"><i /></button><span>Yearly <b className="billing-save">save 20%</b></span></div>
        </Reveal>
        <div className="price-grid">
          {plans.map((plan, index) => (
            <Reveal key={plan.name} delay={`delay-${index + 1}`}>
              <div className={`price-card ${plan.featured ? 'featured' : ''}`} data-testid={`card-plan-${plan.name.toLowerCase()}`}>
                <div className="price-name">{plan.name}</div>
                <div className="price">{plan.price}{plan.price.startsWith('$') && <small> / mo</small>}</div>
                <div className="price-desc">{plan.desc}</div>
                <div className="price-features">{plan.features.map((feature) => <div key={feature}>{feature}</div>)}</div>
                 <button className="price-button" onClick={() => setSelected(plan.name)} data-testid={`button-plan-${plan.name.toLowerCase()}`}>{selected === plan.name ? 'Request received' : plan.name === 'Enterprise' ? 'Talk to us' : plan.name === 'Starter' ? 'Start free' : 'Start Pro trial'}</button>
              </div>
            </Reveal>
          ))}
        </div>
        {selected && <div className="window-status" style={{ justifyContent: 'center', marginTop: 24 }} data-testid="status-pricing"><Check size={13} /> Thanks — we’ll save a {selected} seat for you.</div>}
      </div>
    </section>
  );
}

function FAQSection() {
  const [open, setOpen] = useState(0);
  return (
    <section className="faq-section" id="faq">
      <div className="container-wide faq-grid">
        <Reveal className="faq-heading"><div className="section-label eyebrow">Questions, answered</div><h2 className="display">Clarity is<br /><span>a feature.</span></h2><p>Still curious? We like that. Send a note to hello@trysynapse.dev and a real person will answer.</p></Reveal>
        <Reveal className="faq-list" delay="delay-1">
          {faqs.map((faq, index) => (
            <div className={`faq-item ${open === index ? 'open' : ''}`} key={faq.question}>
              <button className="faq-question" onClick={() => setOpen(open === index ? -1 : index)} data-testid={`button-faq-${index}`}><span>{faq.question}</span><Plus size={18} /></button>
              {open === index && <div className="faq-answer" data-testid={`answer-faq-${index}`}>{faq.answer}</div>}
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function Newsletter() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (email.trim()) setSent(true);
  };
  return (
    <>
      <section className="newsletter" id="newsletter">
        <div className="container-wide newsletter-inner">
          <div><h2 className="display">Stay close to the signal.</h2><p>Occasional field notes on systems, tools, and the space between.</p></div>
          {sent ? <div className="newsletter-success" data-testid="status-newsletter"><Check size={14} /> You’re on the list. Watch your inbox.</div> : <form className="newsletter-form" onSubmit={submit}><input type="email" required placeholder="you@company.com" value={email} onChange={(event) => setEmail(event.target.value)} aria-label="Email address" data-testid="input-newsletter-email" /><button type="submit" data-testid="button-newsletter-submit">Subscribe <Send size={12} /></button></form>}
        </div>
      </section>
      <footer className="footer">
        <div className="container-wide footer-row">
          <div className="footer-note"><strong>synapse</strong><br />© 2025 Synapse Systems, Inc.<br />Made for the in-between.</div>
          <div className="footer-column"><strong>Product</strong><a href="#platform">Features</a><a href="#demo">Core Engine</a><a href="#pricing">Pricing</a></div>
          <div className="footer-column"><strong>Community</strong><a href="https://github.com" target="_blank" rel="noreferrer" data-testid="link-github"><Github size={13} /> GitHub</a><a href="#newsletter">Newsletter</a><a href="#faq">FAQ</a></div>
          <div className="footer-column"><strong>Legal</strong><a href="#top" data-testid="link-status">System status</a><a href="#top" data-testid="link-privacy">Privacy</a><a href="#top" data-testid="link-terms">Terms</a></div>
        </div>
      </footer>
    </>
  );
}

function Home() {
  return (
    <main className="synapse-page">
      <Header />
      <Hero />
      <LogoStrip />
      <PlatformSection />
      <VelocitySection />
      <DemoSection />
      <ThemeSection />
      <PricingSection />
      <FAQSection />
      <Newsletter />
    </main>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ErrorBoundary>
          <Home />
        </ErrorBoundary>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;