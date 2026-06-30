import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Building2,
  DraftingCompass,
  HardHat,
  Lightbulb,
  MapPin,
  Megaphone,
  PenTool,
  Rocket,
} from 'lucide-react';
import './KenshoOne.css';

gsap.registerPlugin(ScrollTrigger);

const journey = [
  {
    title: 'Concept',
    copy: 'Strategy, research, positioning, naming, and the first commercial shape of the brand.',
    icon: Lightbulb,
  },
  {
    title: 'Identity',
    copy: 'Logo, visuals, guidelines, tone, brand world, and the materials needed to look credible from day one.',
    icon: PenTool,
  },
  {
    title: 'Location',
    copy: 'Scouting, finding, comparison, planning, and location decisions built around the customer experience.',
    icon: MapPin,
  },
  {
    title: 'Planning',
    copy: 'Design direction, operational flow, approvals, fire and safety planning, and launch-readiness structure.',
    icon: DraftingCompass,
  },
  {
    title: 'Fit-Out',
    copy: 'Support, implementation, vendor coordination, signage, and the practical details that turn plans into space.',
    icon: HardHat,
  },
  {
    title: 'Interior',
    copy: 'Design concept, customer journey, consultation, visual mood, and brand-led spatial experience.',
    icon: Building2,
  },
  {
    title: 'Launch',
    copy: 'Execution, opening plan, content capture, events, offers, and the moment your brand enters the market.',
    icon: Rocket,
  },
  {
    title: 'Marketing',
    copy: 'Three-month post-launch push: ads, leads, content, reporting, social media, and customer acquisition.',
    icon: Megaphone,
  },
  {
    title: 'Growth',
    copy: 'Scaling roadmap, strategy, optimization, campaign refreshes, and the next phase after launch momentum.',
    icon: BarChart3,
  },
];

const deliverables = [
  'Brand launch roadmap',
  'Identity and visual system',
  'Location and setup support',
  'Interior and fit-out consultation',
  'Launch campaign and event plan',
  'Three-month marketing engine',
];

const KenshoOne = () => {
  const titleRefs = useRef([]);

  useEffect(() => {
    document.title = 'Kensho One | Concept to Launch Brand Pitstop - Kensho Media';

    gsap.to(titleRefs.current, {
      y: 0,
      duration: 1.4,
      stagger: 0.08,
      ease: 'expo.out',
      delay: 0.2,
    });

    gsap.fromTo(
      '.ko-reveal',
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.ko-roadmap',
          start: 'top 75%',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="kensho-one-page">
      <div className="grain-overlay"></div>

      <section className="ko-hero">
        <div className="ko-hero-bg" aria-hidden="true">
          <div className="ko-orbit ko-orbit-one"></div>
          <div className="ko-orbit ko-orbit-two"></div>
        </div>
        <div className="ko-hero-content">
          <p className="ko-kicker">New launch / Kensho Media</p>
          <h1>
            <span className="clip-text">
              <span className="ko-title-line" ref={(el) => (titleRefs.current[0] = el)}>Kensho</span>
            </span>
            <span className="clip-text">
              <span className="ko-title-line ko-title-accent" ref={(el) => (titleRefs.current[1] = el)}>One</span>
            </span>
          </h1>
          <p className="ko-hero-copy">
            From concept to reality. From setup to scale. A single pitstop for founders and teams who want one
            partner to build the brand, space, launch, and growth engine together.
          </p>
          <div className="ko-hero-actions">
            <Link to="/contact" className="ko-primary-cta hover-target" data-cursor-text="START">
              Start a Kensho One brief <ArrowRight size={16} />
            </Link>
            <a href="#roadmap" className="ko-secondary-cta hover-target" data-cursor-text="VIEW">
              See the roadmap
            </a>
          </div>
        </div>
        <aside className="ko-launch-card" aria-label="Kensho One core message">
          <span>Core Message</span>
          <p>One partner for everything your brand needs, from location to launch to long-term growth.</p>
        </aside>
      </section>

      <section className="ko-intro">
        <div>
          <p className="ko-section-label">The idea</p>
          <h2>A launch pitstop for brands that need more than marketing.</h2>
        </div>
        <p>
          Kensho One packages the messy middle of building a brand into one guided journey. Instead of managing
          separate teams for naming, design, location, interiors, launch content, ads, and growth, you get one
          coordinated partner keeping the whole project moving.
        </p>
      </section>

      <section className="ko-roadmap" id="roadmap">
        <div className="ko-roadmap-header">
          <p className="ko-section-label">Concept to growth</p>
          <h2>The Kensho One roadmap</h2>
        </div>

        <div className="ko-steps">
          {journey.map((step, index) => {
            const Icon = step.icon;
            return (
              <article className="ko-step ko-reveal" key={step.title}>
                <div className="ko-step-top">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <Icon size={28} strokeWidth={1.5} />
                </div>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="ko-package">
        <div className="ko-package-copy">
          <p className="ko-section-label">What makes it different</p>
          <h2>Built like a launch desk, not a service menu.</h2>
          <p>
            The offer can be positioned as a newly launching flagship program: limited onboarding, founder-led
            discovery, and one clear route from idea to operating brand.
          </p>
        </div>
        <div className="ko-deliverables">
          {deliverables.map((item) => (
            <div className="ko-deliverable" key={item}>
              <BadgeCheck size={18} />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="ko-ideas">
        <p className="ko-section-label">Launch ideas</p>
        <div className="ko-ideas-grid">
          <article>
            <h3>Founding Batch</h3>
            <p>Offer the first few clients a launch-circle package with priority strategy, filming, and monthly review.</p>
          </article>
          <article>
            <h3>Brand Audit Day</h3>
            <p>Create a paid or invite-only session where prospects leave with a mini roadmap for concept, setup, and growth.</p>
          </article>
          <article>
            <h3>Launch Meter</h3>
            <p>Turn the roadmap into a scorecard: each brand gets a readiness score across identity, space, content, and leads.</p>
          </article>
        </div>
      </section>

      <section className="ko-final-cta">
        <p>Ready to build from zero to launch?</p>
        <Link to="/contact" className="ko-primary-cta hover-target" data-cursor-text="BRIEF">
          Book the Kensho One brief <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  );
};

export default KenshoOne;
