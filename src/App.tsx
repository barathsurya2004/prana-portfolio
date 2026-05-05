import React, { useEffect, useRef, useState } from 'react';

const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);

  // Custom Cursor Logic
  useEffect(() => {
    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!dot || !ring) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      dot.style.left = `${x}px`;
      dot.style.top = `${y}px`;
      ring.style.left = `${x}px`;
      ring.style.top = `${y}px`;
    };

    const handleMouseEnter = () => document.body.classList.add('cursor-hover');
    const handleMouseLeave = () => document.body.classList.remove('cursor-hover');

    if (window.matchMedia('(pointer: fine)').matches) {
      window.addEventListener('mousemove', handleMouseMove);
      const hoverables = document.querySelectorAll('a, button, .work-card, .capability-block');
      hoverables.forEach(el => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        hoverables.forEach(el => {
          el.removeEventListener('mouseenter', handleMouseEnter);
          el.removeEventListener('mouseleave', handleMouseLeave);
        });
      };
    } else {
      dot.style.display = 'none';
      ring.style.display = 'none';
      document.body.style.cursor = 'auto';
    }
  }, []);

  // Scroll and Intersection Observer
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial hero animations
    setTimeout(() => {
      document.querySelectorAll('.hero-name-line').forEach(el => el.classList.add('visible'));
    }, 100);
    setTimeout(() => {
      document.querySelectorAll('#hero .fade-up').forEach(el => el.classList.add('visible'));
    }, 300);

    // Observe all fade-up elements except hero (handled above)
    document.querySelectorAll('.fade-up:not(#hero .fade-up)').forEach(el => observer.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="grain">
      {/* Custom Cursor */}
      <div ref={cursorDotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={cursorRingRef} className="cursor-ring" aria-hidden="true" />

      {/* Nav */}
      <nav id="mainNav" className={`fixed top-0 w-full z-[100] px-6 py-10 flex justify-between items-center transition-all duration-400 ${isScrolled ? 'bg-cream/85 backdrop-blur-xl border-b border-ink/8' : ''}`} aria-label="Main navigation">
        <a href="#hero" className="font-display text-2xl font-normal tracking-wider text-ink no-underline" aria-label="Pranahita Reddy — Home">P·R</a>
        <ul className="hidden md:flex gap-10 list-none" role="list">
          {['Work', 'About', 'Skills', 'Experience', 'Contact'].map((item) => (
            <li key={item}>
              <a href={`#${item.toLowerCase()}`} className="text-[0.72rem] font-normal tracking-[0.2em] uppercase text-ink no-underline relative group transition-colors duration-200 hover:text-terra">
                {item}
                <span className="absolute bottom-[-3px] left-0 w-0 h-[1px] bg-terra transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
          ))}
        </ul>
        <button 
          className={`md:hidden flex flex-col gap-[5px] cursor-pointer bg-none border-none p-1 z-[101] ${isMobileMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span className={`block w-6 h-[1px] bg-ink transition-all duration-300 ${isMobileMenuOpen ? 'translate-y-[6px] rotate-45' : ''}`}></span>
          <span className={`block w-6 h-[1px] bg-ink transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-[1px] bg-ink transition-all duration-300 ${isMobileMenuOpen ? '-translate-y-[6px] -rotate-45' : ''}`}></span>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-[99] bg-cream flex flex-col justify-center items-center gap-10 transition-transform duration-500 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`} role="navigation" aria-label="Mobile navigation">
        {['Work', 'About', 'Skills', 'Experience', 'Contact'].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsMobileMenuOpen(false)} className="font-display text-[2.5rem] font-light text-ink no-underline transition-colors duration-200 hover:text-terra">
            {item}
          </a>
        ))}
      </div>

      {/* Hero Section */}
      <section id="hero" className="min-h-svh px-6 md:px-10 grid grid-rows-[1fr_auto] relative overflow-hidden" aria-labelledby="heroHeading">
        <div className="absolute w-[clamp(300px,40vw,600px)] h-[clamp(300px,40vw,600px)] rounded-full border border-terra/15 right-[-10%] top-1/2 -translate-y-1/2 animate-rotate-slow before:content-[''] before:absolute before:inset-[20px] before:rounded-full before:border before:border-gold/10" aria-hidden="true"></div>
        
        <div className="flex flex-col justify-end pb-16 pt-32">
          <div className="hero-eyebrow fade-up flex items-center gap-4 mb-8">
            <div className="w-12 h-[1px] bg-terra" aria-hidden="true"></div>
            <span className="label-caps">Luxury Brand Strategist & Designer</span>
          </div>

          <h1 id="heroHeading" className="display-xl" aria-label="Pranahita Reddy">
            <div className="overflow-hidden">
              <span className="hero-name-line block translate-y-[110%] transition-transform duration-1000 cubic-bezier-[0.16,1,0.3,1]">Pranahita</span>
            </div>
            <div className="overflow-hidden">
              <span className="hero-name-line block translate-y-[110%] transition-transform duration-1000 cubic-bezier-[0.16,1,0.3,1] delay-[0.12s]">Reddy</span>
            </div>
          </h1>

          <p className="font-display font-light italic mt-8 max-w-lg fade-up delay-3 text-[clamp(1.1rem,2vw,1.5rem)] text-ink-mid leading-[1.5]">
            Culturally driven brand storytelling — where Indian craft heritage<br className="hidden md:block" /> meets global luxury positioning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 items-end pb-10 gap-8 border-t border-ink/12 pt-6 fade-up delay-4">
          <div>
            <div className="label-caps mb-1">Currently</div>
            <div className="text-[0.82rem] text-ink-mid">MA Luxury & Brand Management</div>
            <div className="text-[0.78rem] text-sage italic">SCAD, Savannah GA · 2027</div>
          </div>
          <div className="flex items-center gap-3 justify-center" aria-hidden="true">
            <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-ink animate-scroll-pulse"></div>
            <span className="label-caps writing-mode-vertical-rl">Scroll</span>
          </div>
          <div className="text-right">
            <div className="label-caps mb-1">Based in</div>
            <div className="text-[0.82rem] text-ink-mid">Savannah, Georgia</div>
            <div className="text-[0.78rem] text-sage italic">Open to global roles</div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="overflow-hidden bg-ink py-4 flex" aria-hidden="true">
        <div className="flex whitespace-nowrap animate-marquee group-hover:pause" id="marquee">
          {[1, 2].map((i) => (
            <React.Fragment key={i}>
              {['Brand Positioning', 'Consumer Insights', 'Luxury Marketing Strategy', 'Cultural Storytelling', 'Textile Design', 'Visual Identity', 'Trend Forecasting', 'Campaign Strategy'].map((item) => (
                <span key={item} className="font-display text-[1.1rem] font-light italic text-cream px-12 tracking-wider">
                  {item} <span className="text-terra italic-normal">✦</span>
                </span>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Work Section */}
      <section id="work" className="py-28 px-6 md:px-10 bg-cream" aria-labelledby="workHeading">
        <div className="flex justify-between items-end mb-16 pb-6 border-b border-ink/10">
          <div>
            <div className="label-caps mb-2">Selected Work</div>
            <h2 id="workHeading" className="display-md fade-up">Academic Case Studies</h2>
          </div>
          <div className="font-display text-[5rem] font-light text-ink/5 leading-none" aria-hidden="true">01</div>
        </div>

        <div className="grid grid-cols-1 gap-0" role="list">
          <WorkCard 
            index="01"
            title="Miu Miu — Experiential Retail & App Concept"
            subtitle="SCAD · Brand Strategy Studio · 2026"
            tags={['Retail Strategy', 'UX Concept', 'Brand Identity']}
            description="Designed an immersive phygital retail strategy and companion app that translates Miu Miu's intellectually playful identity into a narrative-driven in-store experience. Bridged physical tactility with digital personalization to deepen consumer engagement across both touchpoints."
            outcome="Phygital ecosystem concept enhancing dwell time & brand loyalty loops"
            lensText="Phygital Retail Experience Design"
          />
          <WorkCard 
            index="02"
            title='Guerlain "Shalimar" — Campaign Relaunch'
            subtitle="SCAD · Luxury Marketing · 2026"
            tags={['Campaign Strategy', 'Brand Repositioning', 'Storytelling']}
            description="Repositioned an iconic 1925 heritage fragrance for Gen Z and Millennial audiences through cinematic storytelling and a digital-first content strategy. Preserved Shalimar's mythological essence while reframing its cultural narrative for contemporary relevance — without alienating legacy consumers."
            outcome="Dual-audience strategy balancing legacy prestige with generational accessibility"
            lensText="Heritage Meets Digital-First Gen Z"
            delay="delay-1"
          />
          <WorkCard 
            index="03"
            title="Loro Piana — Fragrance Brand Extension"
            subtitle="SCAD · Strategic Brand Management · 2025"
            tags={['Brand Extension', 'Fragrance', 'Market Strategy']}
            description="Conceptualized a fragrance line extending Loro Piana's 'quiet luxury' philosophy into a new sensory category. Developed a coherent brand architecture that honors the house's material heritage — vicuña, cashmere, rare fibres — while opening a credible pathway into the prestige fragrance market."
            outcome="Category-coherent extension strategy preserving brand equity while expanding TAM"
            lensText="Quiet Luxury Brand Extension"
            delay="delay-2"
          />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-28 px-6 md:px-10 bg-ink text-cream" aria-labelledby="aboutHeading">
        <div className="flex justify-between items-end mb-16 pb-6 border-b border-cream/10">
          <div>
            <div className="label-caps !text-cream/40 mb-2">About</div>
            <h2 id="aboutHeading" className="display-md text-cream fade-up">Philosophy</h2>
          </div>
          <div className="font-display text-[5rem] font-light text-cream/5 leading-none" aria-hidden="true">02</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
          <div className="relative fade-up hidden md:block">
            <img 
              src="https://placehold.co/480x640/1A1A1A/B8965A?text=Pranahita+Reddy" 
              alt="Portrait of Pranahita Reddy"
              className="w-full aspect-[3/4] object-cover sepia-[15%] contrast-[1.05]"
              loading="lazy"
            />
            <div className="absolute top-6 left-6 right-[-1.5rem] bottom-[-1.5rem] border border-terra/30 -z-10" aria-hidden="true"></div>
            <p className="absolute bottom-[-2.5rem] right-0 font-display text-[0.8rem] italic text-cream/50">SCAD · Savannah, 2026</p>
          </div>

          <div className="fade-up delay-1">
            <p className="font-display text-[clamp(1.6rem,3vw,2.4rem)] font-light italic text-cream leading-[1.35] mb-10 border-l-2 border-terra pl-6">
              "A brand is not what it says — it is what it makes people feel. My work lives in that gap."
            </p>
            <div className="text-[0.95rem] text-cream/75 leading-[1.85] space-y-6">
              <p>I am a Luxury and Brand Management graduate student at SCAD, trained as a textile designer at NIFT Hyderabad. My practice sits at the intersection of cultural intelligence and strategic brand architecture — I build brand identities that are not only visually precise but emotionally resonant.</p>
              <p>Growing up immersed in India's rich craft traditions — hand-embroidery, block-printing, handloom weaving — gave me a foundational understanding of how materials carry meaning. That sensibility now informs how I approach brand strategy: every touchpoint is a texture, every communication is a gesture toward a deeper heritage narrative.</p>
              <p>I have worked across fashion weeks, luxury design houses, and children's apparel brands — always asking the same question: <em>what story does this want to tell, and who needs to feel it?</em></p>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-12 pt-8 border-t border-cream/10">
              {[
                { value: '5+', label: 'Brand Projects' },
                { value: '3', label: 'Luxury Houses Studied' },
                { value: '2', label: 'Countries Worked In' },
                { value: '4+', label: 'Industry Certifications' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-[3rem] font-light text-terra leading-none mb-1">{stat.value}</div>
                  <div className="text-[0.7rem] tracking-[0.15em] uppercase text-cream/40">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex gap-4 flex-wrap">
              <a href="mailto:pranahitareddy1411@gmail.com" className="btn-outline border-terra text-terra hover:bg-terra hover:text-cream">Start a Conversation</a>
              <a href="https://linkedin.com/in/pranahita-reddy" target="_blank" rel="noopener noreferrer" className="btn-outline border-cream/30 text-cream/70">LinkedIn →</a>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section id="skills" className="py-28 px-6 md:px-10 bg-mist" aria-labelledby="capabilitiesHeading">
        <div className="flex justify-between items-end mb-16 pb-6 border-b border-ink/10">
          <div>
            <div className="label-caps mb-2">Capabilities</div>
            <h2 id="capabilitiesHeading" className="display-md fade-up">The Toolkit</h2>
          </div>
          <div className="font-display text-[5rem] font-light text-ink/5 leading-none" aria-hidden="true">03</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-ink/10 border border-ink/10">
          <CapabilityBlock 
            title="Brand Strategy"
            skills={['Brand Positioning & Architecture', 'Consumer Insights & Behaviour Analysis', 'Luxury Marketing Strategy', 'Market Research & Competitive Analysis', 'Trend Forecasting', 'Strategic Storytelling']}
          >
            <svg className="w-10 h-10 mb-6 text-terra" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1"><circle cx="20" cy="20" r="18"/><path d="M20 8v24M8 20h24M12 12l16 16M28 12L12 28"/></svg>
          </CapabilityBlock>
          <CapabilityBlock 
            title="Creative & Visual Design"
            delay="delay-1"
            skills={['Visual Storytelling & Art Direction', 'Textile Design & Surface Pattern', 'Graphic Design & Brand Collateral', 'Experiential Retail Concept', 'Fashion Styling & Curation', 'Concept Development']}
          >
            <svg className="w-10 h-10 mb-6 text-terra" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1"><rect x="4" y="4" width="32" height="32" rx="1"/><path d="M4 16h32M16 4v32"/><circle cx="27" cy="27" r="4"/></svg>
          </CapabilityBlock>
          <CapabilityBlock 
            title="Tools & Software"
            delay="delay-2"
            skills={['Adobe Illustrator & Photoshop', 'Adobe InDesign & Premiere Pro', 'Adobe XD', 'Procreate', 'Microsoft Office Suite', 'CAD (Textile & Pattern)']}
          >
            <svg className="w-10 h-10 mb-6 text-terra" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1"><path d="M8 32V12l12-8 12 8v20H8z"/><path d="M16 32v-10h8v10"/><circle cx="20" cy="16" r="2"/></svg>
          </CapabilityBlock>
          <CapabilityBlock 
            title="Campaign & Communication"
            delay="delay-3"
            skills={['Digital-First Campaign Strategy', 'Heritage Brand Repositioning', 'Cross-Platform Brand Storytelling', 'Retail Experience Design']}
          >
            <svg className="w-10 h-10 mb-6 text-terra" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1"><path d="M6 34l8-18 6 10 6-14 8 22"/><circle cx="6" cy="34" r="2" fill="currentColor" stroke="none"/></svg>
          </CapabilityBlock>
          <CapabilityBlock 
            title="Cultural Intelligence"
            delay="delay-4"
            skills={['India–Global Luxury Market Bridge', 'Craft Heritage & Material Narratives', 'Emerging Market Consumer Insights', 'Cross-Cultural Brand Translation']}
          >
            <svg className="w-10 h-10 mb-6 text-terra" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1"><circle cx="20" cy="20" r="4"/><circle cx="8" cy="10" r="3"/><circle cx="32" cy="10" r="3"/><circle cx="8" cy="30" r="3"/><circle cx="32" cy="30" r="3"/><path d="M11 12l6 5M29 12l-6 5M11 28l6-5M29 28l-6-5"/></svg>
          </CapabilityBlock>
          <div className="bg-ink p-10 fade-up delay-3">
            <div className="label-caps !text-terra mb-3">Certified</div>
            <p className="font-display font-light italic text-[1.2rem] text-cream leading-[1.4] mb-3">INSIDE LVMH — Creation & Branding, Retail & Client Experience</p>
            <p className="text-[0.75rem] text-cream/40 leading-[1.6]">+ Università Bocconi Fashion & Luxury Management<br/>+ Copenhagen Business School Sustainable Fashion</p>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-28 px-6 md:px-10 bg-cream" aria-labelledby="experienceHeading">
        <div className="flex justify-between items-end mb-16 pb-6 border-b border-ink/10">
          <div>
            <div className="label-caps mb-2">Experience</div>
            <h2 id="experienceHeading" className="display-md fade-up">The Journey</h2>
          </div>
          <div className="font-display text-[5rem] font-light text-ink/5 leading-none" aria-hidden="true">04</div>
        </div>

        <div className="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[1px] before:bg-gradient-to-b before:from-terra before:to-transparent" role="list">
          <ExperienceItem 
            date="2025 — Present"
            role="Master of Arts — Luxury & Brand Management"
            badge="Education"
            org="Savannah College of Art and Design (SCAD) · Savannah, GA · Expected 2027"
            bullets={[
              'Coursework in Brand Strategy, Consumer Behaviour, Fashion & Luxury Marketing, and Strategic Communication',
              'Academic projects with Miu Miu, Guerlain, and Loro Piana — developing brand strategy, campaign repositioning, and fragrance brand extension'
            ]}
          />
          <ExperienceItem 
            date="Sept 2024 — April 2025"
            role="Freelance Print Designer & Visual Strategist"
            badge="Professional"
            org="Aisha Rao · India"
            delay="delay-1"
            bullets={[
              'Developed cohesive branding and marketing materials across print and digital platforms to strengthen client brand identity',
              'Collaborated directly with clients to refine visual direction and ensure alignment with brand goals',
              'Executed end-to-end design workflows from concept to production, improving turnaround efficiency and consistency'
            ]}
          />
          <ExperienceItem 
            date="Oct 2024 — Nov 2024"
            role="Freelance Textile Designer"
            badge="Professional"
            org="Hopscotch Pvt. Ltd. · India"
            delay="delay-2"
            bullets={[
              'Designed original prints and surface patterns for children\'s wear collections grounded in seasonal trend forecasting and colour direction',
              'Partnered with production teams to translate concepts into commercially scalable garments while maintaining design integrity through manufacturing',
              'Utilized CAD tools to visualize designs and accelerate approval timelines'
            ]}
          />
          <ExperienceItem 
            date="Aug 2024"
            role="Fashion Stylist"
            badge="Professional"
            org="Ganesh Nallari · Bangalore Fashion Week · India"
            delay="delay-3"
            bullets={[
              'Curated complete runway looks integrating cultural references with a refined contemporary sensibility',
              'Directed fittings and backstage coordination to deliver editorial-quality presentation',
              'Reinforced designer narrative through deliberate styling decisions sustaining visual and thematic consistency across all looks'
            ]}
          />
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-20 px-6 md:px-10 bg-cream-dark" aria-labelledby="certHeading">
        <div className="flex justify-between items-end mb-16 pb-6 border-b border-ink/8">
          <div>
            <div className="label-caps mb-2">Certifications</div>
            <h2 id="certHeading" className="display-md fade-up">Credentials</h2>
          </div>
          <div className="font-display text-[5rem] font-light text-ink/5 leading-none" aria-hidden="true">05</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-[1px] bg-ink/8 border border-ink/8">
          <CertCard institution="LVMH" name="INSIDE LVMH — Creation & Branding, Retail & Client Experience" year="2025" />
          <CertCard institution="Università Bocconi" name="Management of Fashion and Luxury Companies" year="Sept – Oct 2024" delay="delay-1" />
          <CertCard institution="Copenhagen Business School" name="Sustainable Fashion" year="Nov 2024 – Jan 2025" delay="delay-2" />
          <CertCard institution="Adobe / LinkedIn Learning" name="Adobe InDesign & Premiere Pro 2025 Essential Training" year="Jan 2026" delay="delay-3" />
          <CertCard institution="LinkedIn Learning" name="Microsoft Office Suite — Excel, PowerPoint, Word" year="2025" delay="delay-4" />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-28 px-6 md:px-10 bg-ink text-cream text-center relative overflow-hidden" aria-labelledby="contactHeading">
        <div className="absolute w-[600px] h-[600px] rounded-full border border-terra/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-rotate-slow-reverse" aria-hidden="true"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-terra/40 mb-8 fade-up">
            <div className="w-[6px] h-[6px] bg-terra rounded-full animate-pulse-dot" aria-hidden="true"></div>
            <span className="label-caps !text-cream/60">Available for internships & collaborations — 2026/27</span>
          </div>

          <h2 id="contactHeading" className="display-lg text-cream mb-4 fade-up delay-1">
            Let's build<br />
            <em>something remarkable.</em>
          </h2>

          <p className="fade-up delay-2 mb-8 text-[0.9rem] text-cream/50 max-w-[40ch] mx-auto">
            Seeking internships in brand strategy, luxury marketing, and creative direction — bridging global luxury with emerging market intelligence.
          </p>

          <a href="mailto:pranahitareddy1411@gmail.com" className="font-display text-[clamp(1.5rem,4vw,3.5rem)] font-light text-cream no-underline border-b border-cream/30 pb-1 transition-all duration-200 hover:text-terra hover:border-terra fade-up delay-3 block md:inline-block">
            pranahitareddy1411@gmail.com
          </a>

          <div className="flex justify-center gap-10 mt-12 fade-up delay-4">
            <ContactLink href="https://linkedin.com/in/pranahita-reddy" label="LinkedIn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
            </ContactLink>
            <ContactLink href="tel:+19122268844" label="+1 (912) 226-8844">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.7 10.8a19.79 19.79 0 01-3.07-8.68A2 2 0 012.61 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l.95-.95a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
            </ContactLink>
            <ContactLink href="https://behance.net" label="Behance">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 3h7a4 4 0 010 8H3V3zM3 11h8a4 4 0 010 8H3v-8zM15 8h6M17.5 12a4 4 0 100-8 4 4 0 000 8z"/></svg>
            </ContactLink>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-ink text-cream/30 px-6 md:px-10 py-6 flex flex-col md:flex-row justify-between items-center border-t border-cream/5 text-[0.65rem] tracking-[0.1em]" role="contentinfo">
        <span>© 2026 Pranahita Reddy — All rights reserved</span>
        <span className="font-display italic text-[0.8rem] text-cream/20 my-4 md:my-0">Brand · Strategy · Design</span>
        <span>Savannah, GA</span>
      </footer>
    </div>
  );
};

// --- Sub-components ---

const WorkCard: React.FC<{
  index: string;
  title: string;
  subtitle: string;
  tags: string[];
  description: string;
  outcome: string;
  lensText: string;
  delay?: string;
}> = ({ index, title, subtitle, tags, description, outcome, lensText, delay = '' }) => {
  const lensRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!lensRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    lensRef.current.style.left = `${x}px`;
    lensRef.current.style.top = `${y}px`;
  };

  return (
    <article 
      className={`relative overflow-hidden border-b border-ink/10 py-12 cursor-none grid grid-cols-[3rem_1fr] md:grid-cols-[6rem_1fr_auto] items-start gap-6 md:gap-10 transition-colors duration-300 hover:bg-mist fade-up ${delay} group`}
      onMouseMove={handleMouseMove}
      role="listitem"
    >
      <div 
        ref={lensRef}
        className="absolute w-[200px] h-[200px] rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(196,98,58,0.12)_0%,transparent_70%)] border border-terra/20 -translate-x-1/2 -translate-y-1/2 scale-0 opacity-0 transition-all duration-400 cubic-bezier-[0.34,1.56,0.64,1] z-[2] flex items-center justify-center group-hover:scale-100 group-hover:opacity-100" 
        aria-hidden="true"
      >
        <span className="font-display text-[0.8rem] italic text-terra text-center p-4">{lensText}</span>
      </div>
      <div className="font-display text-[1rem] font-light text-sage pt-1" aria-hidden="true">{index}</div>
      <div className="min-w-0">
        <div className="flex gap-4 flex-wrap mb-3">
          {tags.map(tag => <span key={tag} className="text-[0.6rem] font-medium tracking-[0.2em] uppercase text-terra border border-terra/30 px-[0.6rem] py-[0.25rem]">{tag}</span>)}
        </div>
        <h3 className="font-display text-[clamp(1.6rem,3.5vw,2.6rem)] font-light text-ink leading-[1.1] mb-3 transition-colors duration-200 group-hover:text-terra">{title}</h3>
        <p className="text-[0.85rem] text-sage font-light mb-4">{subtitle}</p>
        <p className="text-[0.9rem] text-ink-mid max-w-[55ch] leading-[1.7]">{description}</p>
        <div className="mt-4 flex items-center gap-2">
          <span className="text-[0.6rem] tracking-[0.2em] uppercase text-sage">Outcome —</span>
          <span className="font-display text-[0.95rem] italic text-ink">{outcome}</span>
        </div>
      </div>
      <a href="#" className="w-12 h-12 border border-ink/20 rounded-full flex items-center justify-center self-center shrink-0 transition-all duration-300 hover:border-terra hover:bg-terra hover:rotate-[-45deg] group/arrow" aria-label={`View ${title} case study`}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="transition-colors duration-200 group-hover/arrow:stroke-white">
          <path d="M3 13L13 3M13 3H6M13 3v7"/>
        </svg>
      </a>
    </article>
  );
};

const CapabilityBlock: React.FC<{ title: string; skills: string[]; delay?: string; children: React.ReactNode }> = ({ title, skills, delay = '', children }) => (
  <div className={`bg-mist p-10 transition-colors duration-300 hover:bg-cream-dark fade-up ${delay}`}>
    {children}
    <h3 className="font-display text-[1.4rem] font-normal text-ink mb-4">{title}</h3>
    <ul className="list-none flex flex-col gap-2" role="list">
      {skills.map(skill => (
        <li key={skill} className="text-[0.82rem] text-ink-mid flex items-center gap-[0.6rem]">
          <span className="w-1 h-1 bg-terra rounded-full shrink-0"></span>
          {skill}
        </li>
      ))}
    </ul>
  </div>
);

const ExperienceItem: React.FC<{ date: string; role: string; badge: string; org: string; bullets: string[]; delay?: string }> = ({ date, role, badge, org, bullets, delay = '' }) => (
  <article className={`relative py-10 pl-12 border-b border-ink/[0.07] fade-up ${delay} before:content-[''] before:absolute before:left-[-4px] before:top-12 before:w-2 before:h-2 before:rounded-full before:bg-cream before:border-[1.5px] before:border-terra before:transition-all before:duration-200 hover:before:bg-terra hover:before:scale-150`} role="listitem">
    <div className="text-[0.65rem] tracking-[0.2em] uppercase text-terra mb-2">{date}</div>
    <h3 className="font-display text-2xl font-normal text-ink mb-1">
      {role}
      <span className="inline-block text-[0.55rem] tracking-[0.2em] uppercase px-[0.6rem] py-[0.2rem] border border-sage/30 text-sage ml-4 align-middle">{badge}</span>
    </h3>
    <div className="text-[0.8rem] text-sage mb-4 italic">{org}</div>
    <ul className="list-none flex flex-col gap-[0.4rem]">
      {bullets.map((bullet, i) => (
        <li key={i} className="text-[0.88rem] text-ink-mid leading-[1.6] pl-5 relative before:content-['—'] before:absolute before:left-0 before:text-terra before:text-[0.7rem]">
          {bullet}
        </li>
      ))}
    </ul>
  </article>
);

const CertCard: React.FC<{ institution: string; name: string; year: string; delay?: string }> = ({ institution, name, year, delay = '' }) => (
  <div className={`bg-cream-dark p-8 transition-colors duration-200 hover:bg-cream fade-up ${delay}`}>
    <div className="text-[0.6rem] tracking-[0.2em] uppercase text-terra mb-2">{institution}</div>
    <div className="font-display text-[1.1rem] font-normal text-ink leading-[1.3] mb-2">{name}</div>
    <div className="text-[0.7rem] text-sage">{year}</div>
  </div>
);

const ContactLink: React.FC<{ href: string; label: string; children: React.ReactNode }> = ({ href, label, children }) => (
  <a href={href} className="text-[0.65rem] tracking-[0.2em] uppercase text-cream/50 no-underline transition-colors duration-200 hover:text-terra flex items-center gap-2" aria-label={label}>
    {children}
    {label}
  </a>
);

export default App;
