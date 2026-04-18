import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link, useLocation } from 'react-router-dom';
import matter from 'gray-matter';
import { Buffer } from 'buffer';
import './Home.css';

// Fix for gray-matter in some vite environments
if (typeof window !== 'undefined') {
  window.Buffer = Buffer;
}

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [mobileOpenService, setMobileOpenService] = useState(null);
  const videoBgRef = useRef(null);
  const heroTextRefs = useRef([]);
  const statementWordsRef = useRef([]);
  const visualRef = useRef(null);
  const servicesRef = useRef([]);

  useEffect(() => {
    // Elegant Hero Entrance
    gsap.to(heroTextRefs.current, {
      y: 0,
      duration: 2,
      stagger: 0.1,
      ease: 'expo.out',
      delay: 0.5
    });

    // Hero Image Parallax (starts on scroll)
    gsap.to(videoBgRef.current, {
      y: '20%',
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-modern',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    });

    // Statement Words Reveal
    gsap.to(statementWordsRef.current, {
      opacity: 1,
      y: 0,
      stagger: 0.05,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.statement-section',
        start: 'top 80%',
        end: 'center 50%',
        scrub: 1,
      }
    });

    // Huge Visual Block Parallax
    gsap.to(visualRef.current, {
      y: '15%',
      ease: 'none',
      scrollTrigger: {
        trigger: '.visual-block',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    });

    // Services Staggered Reveal
    gsap.fromTo(servicesRef.current, 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        stagger: 0.1, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.services-section',
          start: 'top 80%',
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };

  }, []);

  const handleServiceHover = (imgSrc) => {
    const trailingImg = document.querySelector('.trailing-image-wrapper img');
    if (trailingImg) trailingImg.src = imgSrc;
    gsap.to('.trailing-image-wrapper', { opacity: 1, scale: 1, duration: 0.3 });
  };

  const handleServiceLeave = () => {
    gsap.to('.trailing-image-wrapper', { opacity: 0, scale: 0.8, duration: 0.3 });
  };

  const statementRaw = "we do not adapt to the digital landscape. we define it. combining high-end cinematic production with surgical growth strategy.";
  const statementWords = statementRaw.split(" ");
  const accentWords = ["define", "cinematic", "surgical"];

  const faqData = [
    {
      q: "WHAT SERVICES DOES KENSHO MEDIA SPECIALIZE IN?",
      a: "We are a full-service creative agency. We specialize in Digital Marketing, Social Media Marketing, and Paid Advertising to drive growth. We also provide creative services including Media Production, Branding, Website Development, and SEO to ensure your brand looks great and ranks high."
    },
    {
      q: "HOW CAN YOU HELP GROW MY BRAND ON SOCIAL MEDIA?",
      a: "We don't just post; we strategize. Our team handles everything from content creation (videography/photography) to community management and paid ad campaigns. We focus on engagement and conversion to turn followers into customers."
    },
    {
      q: "DO YOU OFFER WEBSITE DEVELOPMENT AND SEO?",
      a: "Yes. We build responsive, high-performance websites designed to convert visitors. All our websites are built with SEO best practices in mind to ensure your brand is easily discoverable on search engines like Google."
    },
    {
      q: "DO YOU HANDLE MEDIA PRODUCTION AND CONTENT CREATION?",
      a: "Absolutely. We have a dedicated team for Media Production that handles photography, videography, and editing. whether you need social media reels, corporate videos, or product photography, we create high-quality visuals that tell your story."
    },
    {
      q: "HOW DOES YOUR PRICING WORK?",
      a: "Every business has unique needs. We offer tailored packages based on your specific goals—whether you need a one-time branding project or a monthly retainer for Social Media & SEO. Contact us for a custom quote that fits your budget."
    },
    {
      q: "HOW DO WE GET STARTED?",
      a: "It's simple. Reach out to us via our contact page or email. We'll schedule a discovery call to understand your goals, audit your current digital presence, and propose a strategy to drive results."
    }
  ];

  const blogFiles = import.meta.glob('/src/content/blogs/*.md', { query: '?raw', import: 'default', eager: true });
  const newsData = Object.keys(blogFiles).map((path) => {
    const slug = path.split('/').pop().replace('.md', '');
    const { data } = matter(blogFiles[path]);
    return {
      id: slug,
      ...data,
      date: data.date instanceof Date ? data.date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }).toUpperCase() : data.date.toUpperCase()
    };
  }).sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3);

  const servicesData = [
    {
      num: '01',
      title: 'BRANDING & MEDIA PRODUCTION',
      img: '/services/brandingandmedia.webp',
      desc: 'We craft compelling brand identities and high-quality visual content that tells your story. From logo design to professional video production, we ensure your brand stands out visually and connects emotionally with your audience across all platforms.',
      bullets: ['BRAND IDENTITY DESIGN', 'PROFESSIONAL VIDEOGRAPHY', 'COMMERCIAL PHOTOGRAPHY', 'CREATIVE ART DIRECTION', 'VISUAL STORYTELLING']
    },
    {
      num: '02',
      title: 'WEB DEVELOPMENT & SEO',
      img: '/services/webdevelopmentandseo.webp',
      desc: 'Your website is your digital storefront. We build responsive, high-performance websites optimized for both user experience and search engines. Our development process ensures your site looks great, loads fast, and ranks high on Google to capture organic traffic.',
      bullets: ['CUSTOM WEBSITE DESIGN', 'SEO OPTIMIZATION', 'RESPONSIVE MOBILE LAYOUTS', 'UI/UX EXPERIENCE DESIGN', 'SPEED & PERFORMANCE TUNING']
    },
    {
      num: '03',
      title: 'DIGITAL MARKETING & ADS',
      img: '/services/digitalmarketingandads.webp',
      desc: 'Drive targeted traffic and generate real leads with our comprehensive digital marketing solutions. We design high-converting paid advertising campaigns and broader marketing strategies that maximize your reach and deliver a measurable Return on Investment (ROI).',
      bullets: ['PAID AD CAMPAIGNS (PPC)', 'LEAD GENERATION STRATEGIES', 'MARKET & COMPETITOR ANALYSIS', 'CROSS-CHANNEL MARKETING', 'ROI OPTIMIZATION']
    },
    {
      num: '04',
      title: 'SOCIAL MEDIA MARKETING',
      img: '/services/socialmediamarketing.webp',
      desc: 'Accelerate your brand’s presence with expert social media management. We handle everything from content creation to community engagement, using data-driven strategies to turn followers into loyal customers and build a thriving online community.',
      bullets: ['CONTENT STRATEGY & PLANNING', 'COMMUNITY MANAGEMENT', 'REELS & SHORT-FORM VIDEO', 'ANALYTICS & REPORTING', 'TREND ADAPTATION']
    }
  ];

  const clientsData = [
    { name: "Mio Pizzeria", quote: "\"The photography and Reels created were mouth-watering. Direct spike in delivery orders within the first month.\"" },
    { name: "Go Fitness", quote: "\"We were struggling to get leads. Kensho’s strategy changed that completely. Our classes are full, fantastic ROI.\"" },
    { name: "Bin Abad", quote: "\"We needed an identity that felt trustworthy. Kensho revamped our branding completely.\"" },
    { name: "Satguru DMC", quote: "\"Destination reels they filmed captured the pure excitement of our tours perfectly.\"" },
    { name: "Time Rako", quote: "\"A video campaign that truly showcased luxury. Nailed the lighting and mood to perfection.\"" },
    { name: "Ruzari Mandi", quote: "\"Understood our tradition and translated it perfectly for an entirely new crowd of customers.\"" }
  ];

  return (
    <>
      <div className="grain-overlay"></div>
      
      <main>
        <section className="hero-modern">
          <div className="hero-video-bg">
            <video
              ref={videoBgRef}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden="true"
            >
              <source src="/mainvideo.mp4" type="video/mp4" />
            </video>
          </div>
          
          <div className="hero-content">
            <div className="hero-title">
              <h1 className="clip-text">
                <span className="clip-text-inner" ref={el => heroTextRefs.current[0] = el}>We create. We scale.</span>
              </h1>
              <br />
              <h1 className="clip-text">
                <span className="clip-text-inner" ref={el => heroTextRefs.current[1] = el} style={{ color: 'var(--accent-primary)' }}>Brands that stand out.</span>
              </h1>
            </div>
            
            <div className="hero-sub clip-text">
              <span className="clip-text-inner" ref={el => heroTextRefs.current[2] = el}>
                Social Media Marketing<br/>& Digital Agency<br/>Doha, Qatar
              </span>
            </div>
          </div>
        </section>

        <section className="statement-section">
          <h2 className="statement-text">
            {statementWords.map((word, index) => (
              <span 
                key={index} 
                className={`word ${accentWords.includes(word) ? 'italic-accent' : ''}`}
                ref={el => statementWordsRef.current[index] = el}
              >
                {word}
              </span>
            ))}
          </h2>
        </section>

        <section className="who-we-are-wrapper">
          <div className="who-we-are-grid">
            <div className="who-sticky-col">
              <h2>THE CORE<br/><span className="italic-accent">identity.</span></h2>
            </div>
            <div className="who-scroll-col">
              <div className="who-block">
                <h3>01 / WHO WE ARE</h3>
                <p>Kensho Media is the premier social media marketing and digital agency based in Qatar. Since 2024, we have been committed to empowering brands with innovative social media management, SEO, and results-driven digital solutions tailored for the Doha market. In a world where attention is currency, we foster genuine community growth through cinematic storytelling.</p>
              </div>
              <div className="who-block">
                <h3>02 / BEHIND THE BRAND</h3>
                <p>Great marketing is built on profound understanding, not mere algorithms. Our approach is deeply personal; we seamlessly align with your vision to construct strategies that resonate structurally and emotionally with your consumers. The bridge between creative chaos and strategic precision.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="visual-block-wrapper">
          <div className="container">
            <h3 className="section-subtitle animate-fade-in">OUR SQUAD / THE ARCHITECTS</h3>
          </div>
          <div className="visual-block">
            <img 
              ref={visualRef} 
              src="/kenshogroup.webp" 
              alt="Our Team" 
              className="visual-image" 
              loading="lazy"
              decoding="async"
              width="1400"
              height="800"
            />
          </div>
        </section>

        <section className="services-section">
          <div className="container" style={{ marginBottom: '4rem' }}>
            <h3 className="section-subtitle">OUR SPECIALIZATIONS / <br className="mobile-br" /> WHAT WE DO</h3>
          </div>
          <div className="services-list">
            {servicesData.map((service, index) => (
              <div 
                key={index} 
                className="service-item hover-target"
                data-cursor-text="VIEW"
                ref={el => servicesRef.current[index] = el}
              >
                <div className="service-number">{service.num} /</div>
                <div>
                  <h3 className="service-name">{service.title}</h3>
                  <div className="service-content">
                    <div className="service-content-inner">
                      <p className="service-desc">{service.desc}</p>
                      <ul className="service-bullets">
                        {service.bullets.map((bullet, i) => (
                          <li key={i}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                {/* Integrated Static Image - Always Visible */}
                <img 
                  src={service.img} 
                  alt={service.title} 
                  className="service-inline-img" 
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          
          <div style={{ marginTop: '5rem', textAlign: 'right' }}>
            <Link to="/contact" className="btn-sleek">INITIATE PROJECT →</Link>
          </div>
        </section>

        <section className="clients-section">
          <div className="clients-header">
            <h3>WHAT CLIENTS SAY</h3>
          </div>
          <div className="clients-marquee-container">
            {[...clientsData, ...clientsData].map((client, idx) => (
              <div key={idx} className="client-card">
                <p className="client-quote">{client.quote}</p>
                <p className="client-name">— {client.name}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="news-section">
          <div className="news-header">
            <h3>LATEST BLOGS</h3>
            <Link to="/blogs" className="btn-sleek">VIEW ALL NEWS →</Link>
          </div>
          <div className="news-grid">
            {newsData.map((news, idx) => (
              <Link to={`/blogs/${news.id}`} key={idx} className="news-card">
                <div className="news-image-container">
                  <img 
                    src={news.image} 
                    alt={news.title} 
                    loading="lazy"
                    decoding="async"
                    width="600"
                    height="400"
                  />
                </div>
                <div className="news-meta">
                  <span className="category">{news.category}</span>
                  <span>{news.date}</span>
                </div>
                <h4 className="news-title">{news.title}</h4>
                <div className="btn-sleek" style={{ alignSelf: 'flex-start', marginTop: 'auto', padding: '0.5rem 0' }}>READ ARTICLE →</div>
              </Link>
            ))}
          </div>
        </section>

        <section className="faq-section">
          <div className="faq-header">
            <h3>FREQUENTLY ASKED</h3>
          </div>
          <div className="faq-list">
            {faqData.map((faq, index) => {
              const isActive = activeFaq === index;
              return (
                <div key={index} className={`faq-item ${isActive ? 'active' : ''}`} onClick={() => setActiveFaq(isActive ? null : index)}>
                  <div className="faq-question">
                    <h4>{faq.q}</h4>
                    <span className="faq-icon"></span>
                  </div>
                  <div className="faq-answer">
                    <div className="faq-answer-inner">
                      <p>{faq.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <div className="trailing-image-wrapper">
          <img src="" alt="Service Preview" />
        </div>

      </main>
    </>
  );
};

export default Home;
