import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import'./Services.css';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    document.title = "Our Services | Branding, SEO & Digital Marketing Doha – Kensho Media";
    
    // Entrance animations for the hero (Matching About page style)
    gsap.fromTo('.clip-text-inner-about', 
      { y: '110%' },
      { y: '0%', duration: 1.5, stagger: 0.1, ease: 'expo.out', delay: 0.2 }
    );

    // Subtle line reveal for each section
    const lines = gsap.utils.toArray('.service-border-line');
    lines.forEach((line) => {
      gsap.fromTo(line, 
        { scaleX: 0 },
        { 
          scaleX: 1, 
          duration: 1.5, 
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: line,
            start: 'top 90%',
          }
        }
      );
    });

    // Content reveal
    const reveals = gsap.utils.toArray('.reveal-text');
    reveals.forEach((text) => {
      gsap.fromTo(text, 
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: text,
            start: 'top 85%',
          }
        }
      );
    });

  }, []);

  const services = [
    {
      id: 'branding',
      num: '01',
      title: 'BRANDING & MEDIA PRODUCTION',
      subtitle: 'THE VISUAL IDENTITY SYSTEM',
      desc: 'We define the visual and emotional vocabulary of your brand. From cinema-grade production to architectural brand systems, we ensure your identity is not just seen, but felt.',
      features: ['Video Production', 'Visual Strategy', 'Brand Architecture', 'Art Direction']
    },
    {
      id: 'web',
      num: '02',
      title: 'WEB DEVELOPMENT & SEO',
      subtitle: 'THE DIGITAL ECOSYSTEM',
      desc: 'High-performance digital storefronts engineered for the luxury sector. We combine custom code with advanced technical SEO to ensure your brand dominates the search landscape.',
      features: ['UI/UX Design', 'Next.js Systems', 'Technical SEO', 'Performance Tuning']
    },
    {
      id: 'marketing',
      num: '03',
      title: 'DIGITAL MARKETING & ADS',
      subtitle: 'THE ACQUISITION ENGINE',
      desc: 'Surgical growth through data-driven precision. We manage high-scale ad spends with a focus on maximum ROI and brand-aligned customer acquisition.',
      features: ['Paid Media', 'Lead Generation', 'Conversion Strategy', 'ROI Analysis']
    },
    {
      id: 'social',
      num: '04',
      title: 'SOCIAL MEDIA MARKETING',
      subtitle: 'THE ATTENTION ECONOMY',
      desc: 'Turning attention into brand equity. We manage your social presence with a blend of viral content strategy and high-touch community building.',
      features: ['Content Pillars', 'Growth Strategy', 'Management', 'Influence']
    }
  ];

  useEffect(() => {
    // Parallax numbers effect
    const rows = gsap.utils.toArray('.service-row');
    rows.forEach((row) => {
      const num = row.querySelector('.bg-parallax-num');
      gsap.to(num, {
        y: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: row,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });
  }, []);

  return (
    <div className="services-page" ref={containerRef}>
      <div className="grain-overlay"></div>
      <div className="aura-glow"></div>
      
      <section className="about-hero">
        <h1 className="about-title">
          <div className="clip-text"><span className="clip-text-inner-about">OUR</span></div><br/>
          <div className="clip-text"><span className="clip-text-inner-about text-accent" style={{fontFamily: 'Playfair Display', fontStyle: 'italic', textTransform: 'lowercase'}}>services.</span></div>
        </h1>
        <p className="about-manifesto">
          We provide a full-spectrum digital ecosystem designed to scale your brand with surgical precision. From cinematic storytelling to advanced technical engineering, we build the tools that turn <span className="text-accent">market ambition</span> into category dominance.
        </p>
      </section>

      <section className="services-list-modern">
        {services.map((service) => (
          <div key={service.id} className="service-row">
            <div className="bg-parallax-num">{service.num}</div>
            <div className="container">
               <div className="service-border-line"></div>
               <div className="service-grid-minimal">
                  <div className="service-meta">
                    <span className="reveal-text">{service.num} //</span>
                    <span className="service-sub-tag reveal-text">{service.subtitle}</span>
                  </div>
                  
                  <div className="service-main-content">
                    <h2 className="reveal-text">{service.title}</h2>
                    <p className="reveal-text">{service.desc}</p>
                    
                    <div className="service-footer-meta reveal-text">
                       <div className="feature-tags">
                        {service.features.map(f => <span key={f}>{f}</span>)}
                       </div>
                       <a href="/contact" className="service-cta-link">INITIATE INQUIRY →</a>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        ))}
        <div className="service-border-line"></div>
      </section>

      <section className="methodology-minimal">
        <div className="container">
          <div className="method-grid">
            <div className="method-header">
              <span className="section-label">METHODOLOGY</span>
              <h2>THE SURGICAL <br/><span className="text-accent italic-playfair">method.</span></h2>
            </div>
            <div className="method-steps-list">
              <div className="m-step reveal-text">
                <h4>DISCOVERY</h4>
                <p>Auditing the landscape and extracting hidden value.</p>
              </div>
              <div className="m-step reveal-text">
                <h4>STRATEGY</h4>
                <p>Developing the blueprint for expansion.</p>
              </div>
              <div className="m-step reveal-text">
                <h4>EXECUTION</h4>
                <p>Deploying world-class assets with precision.</p>
              </div>
              <div className="m-step reveal-text">
                <h4>OPTIMIZATION</h4>
                <p>Aggressive scaling through data-driven refinement.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="service-full-image">
        <div className="full-image-wrapper">
          <img src="/kenshomediaservice.webp" alt="Kensho Media Quality Service" />
        </div>
      </section>
    </div>
  );
};

export default Services;
