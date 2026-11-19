/* ==========================================================================
   TENX INK - CINEMATIC ANIMATIONS & INTERACTIONS (script.js)
   Every block below has simple English comments explaining what it does.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Turn on GSAP's ScrollTrigger plugin so our animations react to scrolling
  gsap.registerPlugin(ScrollTrigger);

  /* ------------------------------------------------------------------------
     0. BUTTERY SMOOTH SCROLLING (LENIS + GSAP TICKER SYNC)
     This gives mouse-wheel and touch scrolling a weighted, liquid cinema feel
     just like Casa Momo (casamomo.at), removing jerky scroll wheel steps.
     ------------------------------------------------------------------------ */
  let lenis = null;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.0,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
  }

  /* ------------------------------------------------------------------------
     1. OPENING MOVIE TRAILER ANIMATION (HERO SECTION - UNTOUCHED)
     Plays automatically when the page opens so the Hero feels like a Greek
     movie trailer coming to life.
     ------------------------------------------------------------------------ */
  const introTimeline = gsap.timeline({
    defaults: { ease: 'power3.out' },
  });

  introTimeline.fromTo(
    '#hero-portrait',
    { opacity: 0, scale: 1.16, filter: 'brightness(0.2) contrast(1.3) blur(6px)' },
    {
      opacity: 1,
      scale: 1.05,
      filter: 'brightness(0.78) contrast(1.18) blur(0px)',
      duration: 2.2,
    },
    0
  );

  // Keep all left & right vortex containers vertically centered at all times
  gsap.set('#spiral-left, #spiral-right, #portfolio-spiral-left, #portfolio-spiral-right', {
    yPercent: -50,
  });

  introTimeline.fromTo(
    '#spiral-left',
    { opacity: 0, x: -40 },
    { opacity: 1, x: 0, duration: 1.8 },
    0.3
  );

  introTimeline.fromTo(
    '#spiral-right',
    { opacity: 0, x: 40 },
    { opacity: 1, x: 0, duration: 1.8 },
    0.3
  );

  // Spin both left and right vortex wheels in symmetrically on load
  introTimeline.fromTo(
    '.vortex-wheel-left, .vortex-wheel-right',
    { rotation: -28, scale: 0.88, svgOrigin: '0 0' },
    { rotation: 0, scale: 1, svgOrigin: '0 0', duration: 2.0, ease: 'power3.out' },
    0.25
  );

  introTimeline.to(
    '#hero-section .ink-stroke-path, #main-navbar .ink-stroke-path',
    {
      strokeDashoffset: 0,
      duration: 2.4,
      stagger: 0.08,
      ease: 'power2.inOut',
    },
    0.4
  );

  introTimeline.fromTo(
    '#trailer-chapter-tag',
    { opacity: 0, y: 12 },
    { opacity: 1, y: 0, duration: 1 },
    0.6
  );

  introTimeline.fromTo(
    '.char-reveal',
    { opacity: 0, y: 36, filter: 'blur(8px)' },
    {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1.2,
      stagger: 0.12,
    },
    0.75
  );

  introTimeline.fromTo(
    '.sub-word',
    { opacity: 0, y: 20, filter: 'blur(4px)' },
    {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1.1,
      stagger: 0.14,
    },
    1.15
  );

  introTimeline.fromTo(
    '#hero-cta-row',
    { opacity: 0, y: 24, scale: 0.95 },
    { opacity: 1, y: 0, scale: 1, duration: 1 },
    1.45
  );

  /* ------------------------------------------------------------------------
     2. SYMMETRIC BREATHING & SCROLL ROTATION ON LEFT & RIGHT VORTEX ARCS
     Because the right arc is inside a mirrored SVG group scale(-1, 1),
     giving both .vortex-wheel-left and .vortex-wheel-right the exact same
     rotation makes the right arc behave identically to the left arc!
     ------------------------------------------------------------------------ */
  gsap.to('.vortex-wheel-left, .vortex-wheel-right', {
    rotation: 14,
    svgOrigin: '0 0',
    duration: 7,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });

  /* ------------------------------------------------------------------------
     3. HERO NATURAL PARALLAX SCROLL (NO RIPPLES, NO SCROLL BLOCKING)
     As soon as you scroll down on the Hero, the background portrait zooms
     and glides with deep parallax while the page flows seamlessly into the
     pinned Portfolio Story below.
     ------------------------------------------------------------------------ */
  const heroScrollTl = gsap.timeline({
    scrollTrigger: {
      trigger: '#hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  });

  heroScrollTl.fromTo(
    '#hero-bg-wrapper',
    { scale: 1, yPercent: 0 },
    {
      scale: 1.18,
      yPercent: 18,
      ease: 'none',
      immediateRender: false,
    },
    0
  );

  heroScrollTl.fromTo(
    '#scroll-trailer-quote',
    { opacity: 0, y: 14 },
    {
      opacity: 1,
      y: 0,
      duration: 0.35,
      ease: 'power1.out',
      immediateRender: false,
    },
    0.05
  );

  heroScrollTl.fromTo(
    '#hero-center-stage',
    { y: 0 },
    {
      y: -45,
      ease: 'none',
      immediateRender: false,
    },
    0
  );

  /* ------------------------------------------------------------------------
     4. CURATED 8 MASTERPIECE PHOTOGRAPHS FOR SESSION 02 (THE PORTFOLIO)
     Selected from ./works for their chiaroscuro lighting, composition, and
     how they connect as one continuous visual story.
     ------------------------------------------------------------------------ */
  const curatedWorks = [
    {
      id: 'curated-01',
      scene: 'Scene I • The First Impression',
      title: 'Nocturne Spine & Sacred Owl',
      styleLabel: 'Chiaroscuro Botanical & Spine Blackwork',
      image: 'works/xyz-shoot-A3U8bb4Uebg-unsplash.jpg',
      desc: 'Emerging from pure obsidian shadow, organic botanicals and a sacred owl flow along the natural curve of the spine.',
    },
    {
      id: 'curated-02',
      scene: 'Scene II • The Details',
      title: "The Needle's Ritual",
      styleLabel: 'Single-Needle Stippling in Action',
      image: 'works/haberdoedas-SQlGRQutkOg-unsplash.jpg',
      desc: 'Every shade is built dot by dot—where surgical precision meets ancient sacred geometry.',
    },
    {
      id: 'curated-03',
      scene: 'Scene II • The Details',
      title: 'The All-Seeing Eye',
      styleLabel: 'Macro Dotwork & Mandala Realism',
      image: 'works/haberdoedas-D2y8vWUm0LA-unsplash.jpg',
      desc: 'Thousands of microscopic ink stipples converge to form a hyper-realistic iris framed by sacred mandala petals.',
    },
    {
      id: 'curated-04',
      scene: 'Scene II • The Details',
      title: 'Somnium Tuum',
      styleLabel: 'Fine-Line Engraving & Latin Script',
      image: 'works/onur-senay-WYKX7bLH0Is-unsplash.jpg',
      desc: 'Delicate winged architecture paired with typewriter-engraved Latin verse across the shoulder blade.',
    },
    {
      id: 'curated-05',
      scene: 'Scene III • The Masterpiece',
      title: 'The Fallen Seraph',
      styleLabel: 'Monumental Full-Back Chiaroscuro Realism',
      image: 'works/darren-nunis-ftoD84_RRdM-unsplash.jpg',
      desc: 'A breathtaking full-back collector piece sculpted in deep sepia-black ink, capturing raw human emotion between sweeping wings.',
    },
    {
      id: 'curated-06',
      scene: 'Scene IV • The Collection',
      title: 'The Golden Hour Inscription',
      styleLabel: 'Classical Roman Numerals & Filigree',
      image: 'works/allef-vinicius-hxNiXP498UI-unsplash.jpg',
      desc: 'Carved in warm studio light, timeless Roman numerals weave through baroque acanthus shading along the forearm.',
    },
    {
      id: 'curated-07',
      scene: 'Scene IV • The Collection',
      title: 'The Vitruvian Awakening',
      styleLabel: 'Full-Torso Surrealist Black & Grey',
      image: 'works/dylan-sauerwein-j4n6xTkVjyY-unsplash.jpg',
      desc: 'A multi-armed transcendent figure and sacred lotus mandala spanning the entire chest, throat, and torso.',
    },
    {
      id: 'curated-08',
      scene: 'Scene IV • The Collection',
      title: 'Sovereign of the Golden Dragon',
      styleLabel: 'Obsidian & Gold Collector Backpiece',
      image: 'works/martin-podsiad-BP7vxOeFd04-unsplash.jpg',
      desc: 'Fierce golden scales erupt from a jagged black-ink vortex across the upper back.',
    },
  ];

  /* ------------------------------------------------------------------------
     5. PINNED 5-SCENE CONTINUOUS PORTFOLIO TIMELINE (CASA MOMO INSPIRED)
     - Every image physically peels out from behind the previous scene, tilts
       with subtle 3D perspective, and stays visible as the next scene forms.
     - Includes soft magnetic scene settling (snap) so each scroll lands with
       a satisfying, tactile lock.
     ------------------------------------------------------------------------ */
  const sceneNumEl = document.getElementById('scene-counter-num');
  const sceneLabelEl = document.getElementById('scene-counter-label');
  const progressBarEl = document.getElementById('story-progress-bar');

  const sceneTitles = [
    { num: '01', label: 'THE FIRST IMPRESSION' },
    { num: '02', label: 'THE DETAILS' },
    { num: '03', label: 'THE MASTERPIECE' },
    { num: '04', label: 'THE COLLECTION' },
  ];

  function updateSceneIndicator(progress) {
    if (window.innerWidth >= 640) {
      gsap.set(progressBarEl, { scaleY: progress, scaleX: 1 });
    } else {
      gsap.set(progressBarEl, { scaleX: progress, scaleY: 1 });
    }

    let idx = 0;
    if (progress >= 0.72) idx = 3;
    else if (progress >= 0.48) idx = 2;
    else if (progress >= 0.22) idx = 1;

    if (sceneNumEl.textContent !== sceneTitles[idx].num) {
      sceneNumEl.textContent = sceneTitles[idx].num;
      sceneLabelEl.textContent = sceneTitles[idx].label;
    }
  }

  const isPhone = window.innerWidth < 768;

  const portfolioStoryTl = gsap.timeline({
    scrollTrigger: {
      trigger: '#portfolio-section',
      start: 'top top',
      end: '+=360%', // Balanced pace (~90vh per scene) so scenes never rush past
      scrub: true,   // Direct 1:1 tracking with Lenis (zero double-lag!)
      pin: true,
      anticipatePin: 1,
      onUpdate: (self) => updateSceneIndicator(self.progress),
    },
  });

  // ========================================================================
  // SCENE 1 — THE FIRST IMPRESSION (Timeline: 0.0 -> 1.6)
  // #art-scene-1 stays solid and visible as you enter the section, gently
  // expanding without clip-path flicker while its inner photo zooms out.
  // ========================================================================
  portfolioStoryTl.fromTo(
    '#art-scene-1',
    {
      scale: 0.92,
      opacity: 1,
      xPercent: 0,
      yPercent: 2,
      rotation: 0,
    },
    {
      scale: 1.04,
      opacity: 1,
      xPercent: 0,
      yPercent: 0,
      rotation: 0,
      duration: 1.4,
      ease: 'power2.out',
    },
    0
  );

  portfolioStoryTl.fromTo(
    '#img-scene-1',
    { scale: 1.26 },
    { scale: 1.0, duration: 1.6, ease: 'power2.out' },
    0
  );

  portfolioStoryTl.fromTo(
    '#caption-scene-1',
    { opacity: 0, y: 18 },
    { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
    0.35
  );
  portfolioStoryTl.to(
    '#line-scene-1',
    { strokeDashoffset: 0, duration: 0.9, ease: 'power2.out' },
    0.45
  );

  // ========================================================================
  // SCENE 2 — THE DETAILS (Timeline: 1.6 -> 3.8)
  // CONTINUITY: Scene 1 tilts and slides to the left background, physically
  // uncovering Scene 2A, 2B, and 2C fanning out from behind it!
  // ========================================================================
  portfolioStoryTl.to(
    '#caption-scene-1',
    { opacity: 0, y: -14, duration: 0.45 },
    1.55
  );

  // Scene 1 glides out cleanly so all 3 Scene 2 works open clearly on phone
  portfolioStoryTl.to(
    '#art-scene-1',
    {
      xPercent: isPhone ? -85 : -76,
      yPercent: isPhone ? -35 : -6,
      scale: isPhone ? 0.48 : 0.7,
      rotation: -3,
      opacity: isPhone ? 0 : 0.38,
      duration: 1.5,
      ease: 'power2.inOut',
    },
    1.6
  );

  // Scene 2A peels out to Upper-Left (clearly visible alongside 2B & 2C on phone)
  portfolioStoryTl.fromTo(
    '#art-scene-2a',
    {
      opacity: 0,
      scale: 0.78,
      xPercent: 0,
      yPercent: 0,
      rotation: 2,
    },
    {
      opacity: 0.96,
      scale: isPhone ? 0.96 : 1,
      xPercent: isPhone ? -52 : -24,
      yPercent: isPhone ? -62 : -10,
      rotation: -2,
      duration: 1.45,
      ease: 'power3.out',
    },
    1.65
  );

  // Scene 2B (The All-Seeing Eye) opens in Lower-Center on phone (Upper/Lower-Right on PC)
  portfolioStoryTl.fromTo(
    '#art-scene-2b',
    {
      opacity: 0,
      scale: 0.78,
      xPercent: 0,
      yPercent: 10,
      rotation: -3,
    },
    {
      opacity: 1,
      scale: isPhone ? 1.0 : 1.05,
      xPercent: isPhone ? 0 : 16,
      yPercent: isPhone ? 46 : 12,
      rotation: 1.5,
      duration: 1.5,
      ease: 'power3.out',
    },
    1.8
  );

  portfolioStoryTl.fromTo(
    '#img-scene-2b',
    { scale: 1.18 },
    { scale: 1.0, duration: 1.5, ease: 'power2.out' },
    1.8
  );

  // Scene 2C opens in Upper-Right (all 3 pieces clearly separated on phone!)
  portfolioStoryTl.fromTo(
    '#art-scene-2c',
    {
      opacity: 0,
      scale: 0.75,
      xPercent: 0,
      yPercent: 0,
      rotation: -2,
    },
    {
      opacity: 0.94,
      scale: isPhone ? 0.94 : 0.95,
      xPercent: isPhone ? 52 : 76,
      yPercent: isPhone ? -48 : -15,
      rotation: 3,
      duration: 1.45,
      ease: 'power3.out',
    },
    1.95
  );

  portfolioStoryTl.fromTo(
    '#caption-scene-2',
    { opacity: 0, y: 18 },
    { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
    2.25
  );
  portfolioStoryTl.to(
    '#line-scene-2',
    { strokeDashoffset: 0, duration: 0.9, ease: 'power2.out' },
    2.35
  );

  // ========================================================================
  // SCENE 3 — THE MASTERPIECE (Timeline: 3.8 -> 6.0)
  // CONTINUITY: Scene 2A, 2B, and 2C fan outward like theatre curtains to
  // the left and right edges, uncovering "The Fallen Seraph" (#art-scene-3)
  // rising from directly behind them to dominate the stage!
  // ========================================================================
  portfolioStoryTl.to(
    '#caption-scene-2',
    { opacity: 0, y: 14, duration: 0.45 },
    3.7
  );

  portfolioStoryTl.to(
    '#art-scene-1',
    { opacity: 0, xPercent: -115, scale: 0.48, duration: 1.0 },
    3.75
  );

  // Part Scene 2A & 2B outward to the left edge (pure GPU transform + opacity)
  portfolioStoryTl.to(
    '#art-scene-2a',
    {
      xPercent: isPhone ? -110 : -110,
      yPercent: -16,
      scale: 0.66,
      rotation: -5,
      opacity: isPhone ? 0 : 0.22,
      duration: 1.5,
      ease: 'power2.inOut',
    },
    3.8
  );

  portfolioStoryTl.to(
    '#art-scene-2b',
    {
      xPercent: isPhone ? -105 : -92,
      yPercent: 20,
      scale: 0.68,
      rotation: -3,
      opacity: isPhone ? 0 : 0.25,
      duration: 1.5,
      ease: 'power2.inOut',
    },
    3.85
  );

  // Part Scene 2C outward to the right edge
  portfolioStoryTl.to(
    '#art-scene-2c',
    {
      xPercent: isPhone ? 110 : 110,
      yPercent: -12,
      scale: 0.68,
      rotation: 5,
      opacity: isPhone ? 0 : 0.22,
      duration: 1.5,
      ease: 'power2.inOut',
    },
    3.85
  );

  // THE MASTERPIECE (#art-scene-3) pushes forward from behind Scene 2 (no clipPath repaint!)
  portfolioStoryTl.fromTo(
    '#art-scene-3',
    {
      opacity: 0,
      scale: 0.7,
      xPercent: 0,
      yPercent: 6,
      rotation: 0,
    },
    {
      opacity: 1,
      scale: isPhone ? 1.02 : 1.07,
      xPercent: 0,
      yPercent: -2,
      rotation: 0,
      duration: 1.65,
      ease: 'power3.out',
    },
    3.85
  );

  portfolioStoryTl.fromTo(
    '#img-scene-3',
    { scale: 1.22 },
    { scale: 1.0, duration: 1.7, ease: 'power2.out' },
    3.85
  );

  portfolioStoryTl.fromTo(
    '#caption-scene-3',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.75, ease: 'power2.out' },
    4.5
  );
  portfolioStoryTl.to(
    '#line-scene-3',
    { strokeDashoffset: 0, duration: 1.0, ease: 'power2.out' },
    4.65
  );

  // ========================================================================
  // SCENE 4 — THE COLLECTION (Timeline: 6.0 -> 8.2)
  // CONTINUITY: The Masterpiece (#art-scene-3) contracts into the upper-left
  // anchor spot while 4A, 4B, and 4C peel out from behind it into an
  // asymmetric, layered editorial arrangement.
  // ========================================================================
  portfolioStoryTl.to(
    '#caption-scene-3',
    { opacity: 0, y: 14, duration: 0.45 },
    5.9
  );

  portfolioStoryTl.to(
    '#art-scene-2a, #art-scene-2b, #art-scene-2c',
    { opacity: 0, duration: 0.8 },
    5.9
  );

  // The Masterpiece (#art-scene-3) glides to the upper-left anchor position
  portfolioStoryTl.to(
    '#art-scene-3',
    {
      xPercent: isPhone ? -46 : -40,
      yPercent: isPhone ? -54 : -10,
      scale: isPhone ? 0.54 : 0.7,
      rotation: -2,
      opacity: 0.94,
      duration: 1.5,
      ease: 'power2.inOut',
    },
    6.0
  );

  // Scene 4A peels out to the bottom-left
  portfolioStoryTl.fromTo(
    '#art-scene-4a',
    {
      opacity: 0,
      scale: 0.68,
      xPercent: -15,
      yPercent: 0,
      rotation: 0,
    },
    {
      opacity: 0.96,
      scale: isPhone ? 0.9 : 0.96,
      xPercent: isPhone ? -48 : -80,
      yPercent: isPhone ? 52 : 22,
      rotation: 2.5,
      duration: 1.45,
      ease: 'power3.out',
    },
    6.1
  );

  // Scene 4B peels out to the lower-right (no clipPath repaint!)
  portfolioStoryTl.fromTo(
    '#art-scene-4b',
    {
      opacity: 0,
      scale: 0.72,
      xPercent: 0,
      yPercent: 6,
      rotation: 2,
    },
    {
      opacity: 1,
      scale: isPhone ? 0.9 : 1.03,
      xPercent: isPhone ? 46 : 26,
      yPercent: isPhone ? 46 : 8,
      rotation: -1.5,
      duration: 1.5,
      ease: 'power3.out',
    },
    6.2
  );

  // Scene 4C peels out to the upper-right
  portfolioStoryTl.fromTo(
    '#art-scene-4c',
    {
      opacity: 0,
      scale: 0.7,
      xPercent: 10,
      yPercent: -6,
      rotation: -2,
    },
    {
      opacity: 0.94,
      scale: isPhone ? 0.9 : 0.95,
      xPercent: isPhone ? 48 : 80,
      yPercent: isPhone ? -52 : -18,
      rotation: 2,
      duration: 1.45,
      ease: 'power3.out',
    },
    6.3
  );

  portfolioStoryTl.fromTo(
    '#caption-scene-4',
    { opacity: 0, y: -14 },
    { opacity: 1, y: 0, duration: 0.75, ease: 'power2.out' },
    6.55
  );

  // Footer section ready (Finale block removed per user request)

  /* ------------------------------------------------------------------------
     6. "SEE ALL" SCALABLE BENTO GRID GALLERY (ALL PHOTOS & VIDEOS IN ./works)
     - Fetches /api/works so whenever the owner drops new photos or videos
       into ./works/, they automatically appear in the Bento Grid.
     - Clicking any tile opens the Bold Screen Spotlight View with blurred
       background, and "+ Attach" adds it to the WhatsApp/Email dock.
     ------------------------------------------------------------------------ */
  const attachedDesigns = new Map();
  const attachedDock = document.getElementById('attached-designs-dock');
  const attachedCountEl = document.getElementById('attached-count');
  const attachedThumbsEl = document.getElementById('attached-thumbs');
  const whatsappLinkEl = document.getElementById('whatsapp-attached-link');
  const emailLinkEl = document.getElementById('email-attached-link');
  const clearAttachedBtn = document.getElementById('clear-attached-btn');

  const bentoGrid = document.getElementById('bento-gallery-grid');
  const vaultModal = document.getElementById('curated-archive-modal');
  const openArchiveBtn = document.getElementById('open-archive-btn');
  const vaultTeaserBtn = document.getElementById('vault-teaser-btn');
  const closeArchiveBtn = document.getElementById('close-archive-btn');
  const vaultBackBtn = document.getElementById('vault-back-btn');
  const vaultLiveCounter = document.getElementById('vault-live-counter');

  // Fallback list in case the page is opened directly without Node server
  const fallbackWorksFiles = [
    'xyz-shoot-A3U8bb4Uebg-unsplash.jpg',
    'haberdoedas-SQlGRQutkOg-unsplash.jpg',
    'haberdoedas-D2y8vWUm0LA-unsplash.jpg',
    'onur-senay-WYKX7bLH0Is-unsplash.jpg',
    'darren-nunis-ftoD84_RRdM-unsplash.jpg',
    'allef-vinicius-hxNiXP498UI-unsplash.jpg',
    'dylan-sauerwein-j4n6xTkVjyY-unsplash.jpg',
    'martin-podsiad-BP7vxOeFd04-unsplash.jpg',
    'aron-visuals-MP61Mn7ejBk-unsplash.jpg',
    'collins-lesulie-PWK6CeCJtJw-unsplash.jpg',
    'haberdoedas-yfchG-JlloI-unsplash.jpg',
    'jose-pinto-zgQnM2ghzXU-unsplash.jpg',
    'yurii-stupen-lpKEUtBIQZY-unsplash.jpg',
  ];

  // Holds all discovered photos and videos (curated + any newly uploaded files)
  let allStudioWorks = [...curatedWorks.map((w) => ({ ...w, type: 'image' }))];
  let currentVaultFilter = 'all';

  function formatFilenameTitle(filename) {
    return filename
      .replace(/\.[^/.]+$/, '')
      .replace(/[-_]+/g, ' ')
      .replace(/\bunsplash\b/gi, '')
      .trim()
      .replace(/\b\w/g, (c) => c.toUpperCase()) || 'Studio Masterwork';
  }

  async function loadAllStudioWorks() {
    let discovered = [];
    try {
      const res = await fetch('/api/works');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.files) && data.files.length > 0) {
          discovered = data.files;
        }
      }
    } catch {
      // Offline / file:// fallback
    }

    if (discovered.length === 0) {
      discovered = fallbackWorksFiles.map((f) => ({
        filename: f,
        src: `works/${f}`,
        type: 'image',
      }));
    }

    const curatedBySrc = new Map(curatedWorks.map((w) => [w.image, w]));
    const merged = [];

    curatedWorks.forEach((cw) => {
      merged.push({ ...cw, type: 'image' });
    });

    let extraIdx = 1;
    discovered.forEach((fileObj) => {
      if (!curatedBySrc.has(fileObj.src)) {
        merged.push({
          id: `vault-extra-${extraIdx++}`,
          scene: fileObj.type === 'video' ? 'Studio Video Reel' : 'Studio Archive',
          title: formatFilenameTitle(fileObj.filename),
          styleLabel:
            fileObj.type === 'video'
              ? 'Live Session Motion • TenX Ink'
              : 'Custom Tattoo Work • TenX Ink',
          image: fileObj.src,
          type: fileObj.type,
          desc: 'Uploaded directly from the TenX Ink studio portfolio. Tap "+ Attach Design" to include this piece in your WhatsApp or Email inquiry.',
        });
      }
    });

    allStudioWorks = merged;
    renderBentoGallery();
  }

  // Rhythmic Bento Grid tile pattern so any number of uploads looks curated
  const bentoPattern = [
    'bento-featured', // 2x2 hero tile
    'bento-tall',     // 1x2 portrait tile
    'bento-standard', // 1x1
    'bento-standard', // 1x1
    'bento-wide',     // 2x1 landscape tile
    'bento-tall',     // 1x2 portrait tile
    'bento-standard', // 1x1
    'bento-wide',     // 2x1
    'bento-featured', // 2x2
    'bento-standard', // 1x1
    'bento-standard', // 1x1
    'bento-wide',     // 2x1
    'bento-standard', // 1x1
  ];

  function renderBentoGallery() {
    if (!bentoGrid) return;
    bentoGrid.innerHTML = '';

    const items =
      currentVaultFilter === 'all'
        ? allStudioWorks
        : allStudioWorks.filter((w) => w.type === currentVaultFilter);

    if (vaultLiveCounter) {
      vaultLiveCounter.textContent = `${items.length} Work${items.length === 1 ? '' : 's'}`;
    }

    if (items.length === 0) {
      bentoGrid.innerHTML = `
        <div class="col-span-full min-h-[50vh] flex flex-col items-center justify-center text-center px-4">
          <p class="font-calligraphy text-3xl text-gold mb-2">No ${currentVaultFilter}s uploaded yet</p>
          <p class="text-ivory/65 font-cormorant text-lg max-w-md">
            Drop any ${currentVaultFilter === 'video' ? '.mp4 / .mov / .webm video' : 'photo'} inside the <code class="text-gold">works</code> folder and refresh—it will appear in the Bento Grid automatically.
          </p>
        </div>
      `;
      return;
    }

    items.forEach((work, index) => {
      const isAttached = attachedDesigns.has(work.id);
      const sizeClass = bentoPattern[index % bentoPattern.length];

      const tile = document.createElement('article');
      tile.className = `bento-tile ${sizeClass} group`;
      tile.dataset.inspectId = work.id;

      const mediaHtml =
        work.type === 'video'
          ? `<video
               src="${work.image}"
               muted
               loop
               playsinline
               autoplay
               preload="metadata"
               class="w-full h-full object-cover transition duration-700 group-hover:scale-105"
             ></video>
             <span class="absolute top-3 left-3 z-20 px-2.5 py-1 rounded-full bg-obsidian/80 border border-gold/40 text-[9px] font-cinzel tracking-[0.2em] uppercase text-gold-light">
               ▶ Video
             </span>`
          : `<img
               src="${work.image}"
               alt="${work.title}"
               loading="lazy"
               decoding="async"
               class="w-full h-full object-cover transition duration-500 group-hover:scale-105"
             />`;

      tile.innerHTML = `
        ${mediaHtml}
        <div class="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-transparent opacity-85 group-hover:opacity-95 transition-opacity"></div>

        <!-- Top-right quick Book a Session button -->
        <button
          type="button"
          data-toggle-attach="${work.id}"
          class="btn-outline-gold ${isAttached ? 'is-attached' : ''} absolute top-3 right-3 z-20 px-3 py-1 text-[9px] sm:text-[10px] font-cinzel tracking-[0.16em] uppercase text-ivory"
        >
          ${isAttached ? '✓ Selected for Session' : 'Book a Session'}
        </button>

        <!-- Bottom Title & Style -->
        <div class="absolute bottom-0 left-0 right-0 z-20 p-3.5 sm:p-4 pointer-events-none">
          <span class="font-cinzel text-[8px] sm:text-[9px] tracking-[0.22em] uppercase text-gold block truncate">
            ${work.styleLabel}
          </span>
          <h4 class="font-decorative text-sm sm:text-lg text-ivory tracking-wide truncate">
            ${work.title}
          </h4>
        </div>
      `;

      bentoGrid.appendChild(tile);
    });
  }

  function findWorkById(workId) {
    return (
      allStudioWorks.find((w) => w.id === workId) ||
      curatedWorks.find((w) => w.id === workId)
    );
  }

  function toggleAttachDesign(workId) {
    const work = findWorkById(workId);
    if (!work) return;

    if (attachedDesigns.has(workId)) {
      attachedDesigns.delete(workId);
    } else {
      attachedDesigns.set(workId, work);
    }

    updateAttachmentUI();
    if (bentoGrid) {
      bentoGrid.querySelectorAll(`[data-toggle-attach="${workId}"]`).forEach((btn) => {
        const attached = attachedDesigns.has(workId);
        btn.classList.toggle('is-attached', attached);
        btn.textContent = attached ? '✓ Selected for Session' : 'Book a Session';
      });
    }
  }

  function updateAttachmentUI() {
    const count = attachedDesigns.size;
    attachedCountEl.textContent = count;

    if (count > 0) {
      attachedDock.classList.remove('translate-y-36', 'opacity-0', 'pointer-events-none');
      attachedDock.classList.add('translate-y-0', 'opacity-100', 'pointer-events-auto');
    } else {
      attachedDock.classList.add('translate-y-36', 'opacity-0', 'pointer-events-none');
      attachedDock.classList.remove('translate-y-0', 'opacity-100', 'pointer-events-auto');
    }

    attachedThumbsEl.innerHTML = '';
    const selectedList = Array.from(attachedDesigns.values());
    selectedList.slice(0, 4).forEach((item) => {
      if (item.type === 'video') {
        const badge = document.createElement('div');
        badge.className = 'w-9 h-9 rounded-full bg-charcoal border-2 border-gold flex items-center justify-center text-[10px] text-gold shadow-md';
        badge.textContent = '▶';
        attachedThumbsEl.appendChild(badge);
      } else {
        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.title;
        img.className = 'w-9 h-9 rounded-full object-cover border-2 border-gold shadow-md';
        attachedThumbsEl.appendChild(img);
      }
    });

    const originUrl = window.location.origin;
    const designLines = selectedList
      .map(
        (item, idx) =>
          `${idx + 1}. ${item.title} (${item.styleLabel}) - Reference: ${originUrl}/${encodeURI(item.image)}`
      )
      .join('\n');

    const messageText = `Hello TenX Ink! I would love to book a session inspired by the following attached design(s) from your portfolio:\n\n${designLines}\n\nPlease let me know your availability!`;

    whatsappLinkEl.href = `https://wa.me/?text=${encodeURIComponent(messageText)}`;
    emailLinkEl.href = `mailto:booking@tenxink.com?subject=${encodeURIComponent(
      `TenX Ink Booking Inquiry (${count} Attached Design${count > 1 ? 's' : ''})`
    )}&body=${encodeURIComponent(messageText)}`;

    // Sync attached reference design(s) inside the Book an Appointment form
    const bookingPreview = document.getElementById('booking-attached-preview');
    const bookingList = document.getElementById('booking-attached-list');
    if (bookingPreview && bookingList) {
      if (count > 0) {
        bookingPreview.classList.remove('hidden');
        bookingList.innerHTML = '';
        selectedList.forEach((item) => {
          const pill = document.createElement('div');
          pill.className =
            'flex items-center gap-2 rounded-full bg-charcoal border border-gold/40 pr-3 pl-1 py-1 text-xs font-cormorant text-ivory';
          pill.innerHTML = `
            ${
              item.type === 'video'
                ? '<span class="w-6 h-6 rounded-full bg-obsidian border border-gold/40 flex items-center justify-center text-[9px] text-gold">▶</span>'
                : `<img src="${item.image}" alt="${item.title}" class="w-6 h-6 rounded-full object-cover border border-gold/40" />`
            }
            <span class="truncate max-w-[160px]">${item.title}</span>
          `;
          bookingList.appendChild(pill);
        });
      } else {
        bookingPreview.classList.add('hidden');
        bookingList.innerHTML = '';
      }
    }
  }

  function bookWithDesign(workId) {
    const work = findWorkById(workId);
    if (work && !attachedDesigns.has(workId)) {
      attachedDesigns.set(workId, work);
    }
    updateAttachmentUI();
    if (bentoGrid) {
      bentoGrid.querySelectorAll(`[data-toggle-attach="${workId}"]`).forEach((btn) => {
        btn.classList.add('is-attached');
        btn.textContent = '✓ Selected for Session';
      });
    }

    // Close lightbox and See All modal so we jump cleanly to the booking form
    if (typeof closeLightbox === 'function') closeLightbox();
    if (vaultModal && vaultModal.classList.contains('opacity-100')) {
      closeStudioVault();
    }

    const bookingTarget = document.getElementById('booking-section');
    if (bookingTarget) {
      setTimeout(() => {
        if (lenis) {
          lenis.scrollTo(bookingTarget, { duration: 1.0 });
        } else {
          bookingTarget.scrollIntoView({ behavior: 'smooth' });
        }
      }, 120);
    }
  }

  const bookingClearAttachedBtn = document.getElementById('booking-clear-attached');
  if (bookingClearAttachedBtn) {
    bookingClearAttachedBtn.addEventListener('click', () => {
      attachedDesigns.clear();
      updateAttachmentUI();
      renderBentoGallery();
    });
  }

  clearAttachedBtn.addEventListener('click', () => {
    attachedDesigns.clear();
    updateAttachmentUI();
    renderBentoGallery();
  });

  function openStudioVault() {
    if (lenis) lenis.stop();
    vaultModal.scrollTop = 0;
    renderBentoGallery();
    vaultModal.classList.remove('opacity-0', 'pointer-events-none');
    vaultModal.classList.add('opacity-100', 'pointer-events-auto');
  }

  function closeStudioVault() {
    vaultModal.classList.add('opacity-0', 'pointer-events-none');
    vaultModal.classList.remove('opacity-100', 'pointer-events-auto');
    vaultModal.querySelectorAll('video').forEach((v) => v.pause());
    if (lenis) lenis.start();
  }

  if (openArchiveBtn) openArchiveBtn.addEventListener('click', openStudioVault);
  if (vaultTeaserBtn) vaultTeaserBtn.addEventListener('click', openStudioVault);
  if (closeArchiveBtn) closeArchiveBtn.addEventListener('click', closeStudioVault);
  if (vaultBackBtn) vaultBackBtn.addEventListener('click', closeStudioVault);

  const menuSeeAllBtn = document.getElementById('menu-see-all-btn');
  if (menuSeeAllBtn) menuSeeAllBtn.addEventListener('click', openStudioVault);

  document.querySelectorAll('.vault-filter-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      currentVaultFilter = btn.dataset.vaultFilter;
      document.querySelectorAll('.vault-filter-btn').forEach((b) => {
        b.classList.remove('btn-gold-rounded', 'font-bold');
        b.classList.add('btn-outline-gold', 'text-ivory/80');
      });
      btn.classList.remove('btn-outline-gold', 'text-ivory/80');
      btn.classList.add('btn-gold-rounded', 'font-bold');
      vaultModal.scrollTop = 0;
      renderBentoGallery();
    });
  });

  bentoGrid.addEventListener('click', (e) => {
    const attachBtn = e.target.closest('[data-toggle-attach]');
    if (attachBtn) {
      e.stopPropagation();
      bookWithDesign(attachBtn.dataset.toggleAttach);
      return;
    }
    const tile = e.target.closest('[data-inspect-id]');
    if (tile) {
      openLightbox(tile.dataset.inspectId);
    }
  });

  // Load all photos & videos from ./works/ automatically on startup
  loadAllStudioWorks();

  /* ------------------------------------------------------------------------
     7. FULLSCREEN TATTOO CLOSE-UP LIGHTBOX (SUPPORTS BOTH PHOTOS & VIDEOS)
     ------------------------------------------------------------------------ */
  const lightbox = document.getElementById('tattoo-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxVideo = document.getElementById('lightbox-video');
  const lightboxNum = document.getElementById('lightbox-num');
  const lightboxStyle = document.getElementById('lightbox-style');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const lightboxAttachBtn = document.getElementById('lightbox-attach-btn');
  const closeLightboxBtn = document.getElementById('close-lightbox-btn');
  let currentLightboxWorkId = null;

  function openLightbox(workId) {
    const work = findWorkById(workId);
    if (!work) return;
    currentLightboxWorkId = workId;

    if (work.type === 'video') {
      lightboxImg.classList.add('hidden');
      lightboxVideo.classList.remove('hidden');
      lightboxVideo.src = work.image;
      lightboxVideo.play().catch(() => {});
    } else {
      lightboxVideo.pause();
      lightboxVideo.classList.add('hidden');
      lightboxImg.classList.remove('hidden');
      lightboxImg.src = work.image;
    }

    lightboxNum.textContent = work.scene;
    lightboxStyle.textContent = work.styleLabel;
    lightboxTitle.textContent = work.title;
    lightboxDesc.textContent = work.desc;

    syncLightboxAttachBtn();

    lightbox.classList.remove('opacity-0', 'pointer-events-none');
    lightbox.classList.add('opacity-100', 'pointer-events-auto');
  }

  function syncLightboxAttachBtn() {
    if (!currentLightboxWorkId) return;
    const attached = attachedDesigns.has(currentLightboxWorkId);
    lightboxAttachBtn.textContent = attached
      ? '✓ Added to Session Booking'
      : 'Book a Session';
  }

  function closeLightbox() {
    if (lightboxVideo) lightboxVideo.pause();
    lightbox.classList.add('opacity-0', 'pointer-events-none');
    lightbox.classList.remove('opacity-100', 'pointer-events-auto');
  }

  // Bring clicked/tapped overlapping image on top of the rest;
  // tapping an already-on-top image (or clicking on desktop) enters Bold Spotlight View!
  const cinemaItems = document.querySelectorAll('.cinema-art-item');
  cinemaItems.forEach((item) => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      const clickedPill = e.target.closest('.art-hover-pill');
      const isAlreadyOnTop = item.classList.contains('is-on-top');
      const isDesktopHover = window.matchMedia('(hover: hover)').matches;

      // Clear previous on-top state from siblings and bring this one on top
      cinemaItems.forEach((el) => {
        if (el !== item) el.classList.remove('is-on-top');
      });
      item.classList.add('is-on-top');

      // On desktop (already hovered) or second tap / pill tap on touch: enter Bold Spotlight View
      if (isDesktopHover || isAlreadyOnTop || clickedPill) {
        openLightbox(item.dataset.workId);
      }
    });
  });

  // Tapping empty stage space clears the on-top highlight
  const cinemaStageEl = document.getElementById('cinema-stage');
  if (cinemaStageEl) {
    cinemaStageEl.addEventListener('click', () => {
      cinemaItems.forEach((el) => el.classList.remove('is-on-top'));
    });
  }

  lightboxAttachBtn.addEventListener('click', () => {
    if (currentLightboxWorkId) {
      bookWithDesign(currentLightboxWorkId);
    }
  });

  closeLightboxBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  /* ------------------------------------------------------------------------
     8. INTERACTIVE 3D DEPTH FOR HERO (BOTH PC MOUSE & PHONE TOUCH)
     ------------------------------------------------------------------------ */
  const heroSection = document.getElementById('hero-section');

  function applyDepthShift(normX, normY) {
    gsap.to('#hero-portrait', {
      x: normX * -14,
      y: normY * -10,
      duration: 1.1,
      ease: 'power2.out',
      overwrite: 'auto',
    });

    gsap.to('#spiral-left', {
      x: normX * 10,
      y: normY * 8,
      duration: 1.1,
      ease: 'power2.out',
      overwrite: 'auto',
    });

    gsap.to('#spiral-right', {
      x: normX * -10,
      y: normY * 8,
      duration: 1.1,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  }

  heroSection.addEventListener('mousemove', (e) => {
    const normX = e.clientX / window.innerWidth - 0.5;
    const normY = e.clientY / window.innerHeight - 0.5;
    applyDepthShift(normX, normY);
  });

  heroSection.addEventListener(
    'touchmove',
    (e) => {
      if (!e.touches || !e.touches[0]) return;
      const normX = e.touches[0].clientX / window.innerWidth - 0.5;
      const normY = e.touches[0].clientY / window.innerHeight - 0.5;
      applyDepthShift(normX * 0.8, normY * 0.8);
    },
    { passive: true }
  );

  /* ------------------------------------------------------------------------
     9. FLOATING GOLD EMBER PARTICLES (HTML5 CANVAS)
     ------------------------------------------------------------------------ */
  const canvas = document.getElementById('gold-particles-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  const isMobile = window.innerWidth < 768;
  const particleCount = isMobile ? 28 : 55;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.8 + 0.4,
      speedY: Math.random() * 0.35 + 0.1,
      speedX: (Math.random() - 0.5) * 0.25,
      alpha: Math.random() * 0.65 + 0.15,
    });
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p) => {
      p.y -= p.speedY;
      p.x += p.speedX;

      if (p.y < -10) {
        p.y = canvas.height + 10;
        p.x = Math.random() * canvas.width;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(218, 175, 102, ${p.alpha})`;
      ctx.fill();
    });

    requestAnimationFrame(animateParticles);
  }

  animateParticles();

  /* ------------------------------------------------------------------------
     10. MENU OVERLAY CONTROLS
     ------------------------------------------------------------------------ */
  const menuOverlay = document.getElementById('cinematic-menu');
  const openMenuBtn = document.getElementById('open-menu-btn');
  const closeMenuBtn = document.getElementById('close-menu-btn');
  const menuLinks = document.querySelectorAll('.menu-link');

  function toggleMenu(show, keepStopped = false) {
    if (show) {
      if (lenis) lenis.stop();
      menuOverlay.classList.remove('opacity-0', 'pointer-events-none');
      menuOverlay.classList.add('opacity-100', 'pointer-events-auto');
    } else {
      menuOverlay.classList.add('opacity-0', 'pointer-events-none');
      menuOverlay.classList.remove('opacity-100', 'pointer-events-auto');
      if (lenis && !keepStopped) lenis.start();
    }
  }

  openMenuBtn.addEventListener('click', () => toggleMenu(true));
  closeMenuBtn.addEventListener('click', () => toggleMenu(false));
  menuLinks.forEach((link) => {
    link.addEventListener('click', () => {
      const isVaultTrigger = link.id === 'menu-see-all-btn';
      toggleMenu(false, isVaultTrigger);
    });
  });

  // Seamless anchor navigation synced with Lenis & GSAP ScrollTrigger pins
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const hash = anchor.getAttribute('href');
      if (!hash || hash === '#') return;
      const targetEl = document.querySelector(hash);
      if (!targetEl) return;

      e.preventDefault();
      if (lenis) {
        lenis.start();
        lenis.scrollTo(targetEl, { duration: 1.0 });
      } else {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ------------------------------------------------------------------------
     11. SESSION 03 — MEET THE ARTIST & "WANT TO BECOME A TATTOO ARTIST?"
     Respects prefers-reduced-motion while delivering Spyker-inspired
     progressive scroll storytelling on both Phone and PC.
     ------------------------------------------------------------------------ */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // PART 01: MEET THE ARTIST (Pinned Progressive Reveal)
  if (!prefersReducedMotion) {
    const artistTl = gsap.timeline({
      scrollTrigger: {
        trigger: '#artist-section',
        start: 'top top',
        end: '+=200%',
        scrub: 0.25,
        pin: true,
        anticipatePin: 1,
      },
    });

    // Portrait subtle zoom + settle
    artistTl.fromTo(
      '#artist-portrait-img',
      { scale: 1.15 },
      { scale: 1, duration: 1.2, ease: 'power2.out' },
      0
    );

    // Engrave the heading underline
    artistTl.to(
      '#artist-heading-line',
      { strokeDashoffset: 0, duration: 0.8, ease: 'power2.out' },
      0.1
    );

    // Reveal signature & identity
    artistTl.to(
      '#artist-signature',
      { opacity: 1, duration: 0.6 },
      0.25
    );
    artistTl.to(
      '#artist-identity-block',
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
      0.3
    );

    // Progressively reveal background & achievements
    artistTl.to(
      '#artist-bio-block',
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      0.85
    );

    // Reveal philosophy & specialties
    artistTl.to(
      '#artist-philosophy-block',
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      1.4
    );

    // PART 02: "WANT TO BECOME A TATTOO ARTIST?" (Pinned Progressive Intro)
    const mentorTl = gsap.timeline({
      scrollTrigger: {
        trigger: '#mentorship-intro-stage',
        start: 'top top',
        end: '+=175%',
        scrub: 0.25,
        pin: true,
        anticipatePin: 1,
      },
    });

    mentorTl.to(
      '#mentor-bg-1',
      { scale: 1, opacity: 0.55, duration: 1.5, ease: 'none' },
      0
    );

    mentorTl.to(
      '#mentor-eyebrow',
      { opacity: 1, y: 0, duration: 0.6 },
      0.1
    );

    mentorTl.fromTo(
      '#mentor-main-headline',
      { opacity: 0, y: 26 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' },
      0.2
    );

    mentorTl.to(
      '#mentor-headline-line',
      { strokeDashoffset: 0, duration: 0.9, ease: 'power2.out' },
      0.45
    );

    mentorTl.fromTo(
      '#mentor-subcopy',
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      0.7
    );

    mentorTl.fromTo(
      '#mentor-cta-wrap',
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
      0.95
    );

    mentorTl.fromTo(
      '#mentor-float-left',
      { opacity: 0, y: 40 },
      { opacity: 0.85, y: -15, duration: 1.1, ease: 'power2.out' },
      0.4
    );

    mentorTl.fromTo(
      '#mentor-float-right',
      { opacity: 0, y: -35 },
      { opacity: 0.85, y: 15, duration: 1.1, ease: 'power2.out' },
      0.55
    );
  } else {
    // Immediate visibility for reduced-motion preference
    gsap.set(
      '#artist-signature, #artist-identity-block, #artist-bio-block, #artist-philosophy-block, #mentor-eyebrow, #mentor-main-headline, #mentor-subcopy, #mentor-cta-wrap, #mentor-float-left, #mentor-float-right',
      { opacity: 1, y: 0 }
    );
    gsap.set('#artist-heading-line, #mentor-headline-line', {
      strokeDashoffset: 0,
    });
  }

  /* ------------------------------------------------------------------------
     12. PICTORIAL TRAINING CRAFT SELECTOR (INSPIRED BY "OUR SERVICES")
     ------------------------------------------------------------------------ */
  const craftStages = [
    {
      tag: 'STAGE 01 • FOUNDATION',
      title: 'Machine & Needle Control',
      desc: 'Understand rotary & coil mechanics, needle depth, voltage calibration, and steady hand posture.',
      image: 'works/collins-lesulie-PWK6CeCJtJw-unsplash.jpg',
    },
    {
      tag: 'STAGE 02 • PRECISION',
      title: 'Stippling & Sacred Linework',
      desc: 'Build clean, confident contours and dotwork gradients without overworking the skin.',
      image: 'works/haberdoedas-SQlGRQutkOg-unsplash.jpg',
    },
    {
      tag: 'STAGE 03 • STUDIO WORKFLOW',
      title: 'Pigments, Stencils & Hygiene',
      desc: 'Master sterile station setup, ink dilution ratios, and anatomical stencil placement.',
      image: 'works/jose-pinto-zgQnM2ghzXU-unsplash.jpg',
    },
    {
      tag: 'STAGE 04 • REALISM & SHADING',
      title: 'Chiaroscuro & Contrast',
      desc: 'Sculpt three-dimensional depth, soft greywash transitions, and timeless black-and-grey work.',
      image: 'works/allef-vinicius-hxNiXP498UI-unsplash.jpg',
    },
  ];

  const pictorialThumbsRow = document.getElementById('pictorial-thumbs-row');
  const pictorialActiveImg = document.getElementById('pictorial-active-img');
  const pictorialActiveTag = document.getElementById('pictorial-active-tag');
  const pictorialActiveTitle = document.getElementById('pictorial-active-title');
  const pictorialActiveDesc = document.getElementById('pictorial-active-desc');
  const pictorialPrevBtn = document.getElementById('pictorial-prev-btn');
  const pictorialNextBtn = document.getElementById('pictorial-next-btn');
  let activeCraftIndex = 0;

  function renderPictorialCraft(index) {
    activeCraftIndex = (index + craftStages.length) % craftStages.length;
    const stage = craftStages[activeCraftIndex];

    if (pictorialThumbsRow) {
      pictorialThumbsRow.innerHTML = '';
      craftStages.forEach((item, idx) => {
        const isActive = idx === activeCraftIndex;
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `pictorial-thumb-btn ${isActive ? 'is-active' : ''} text-left`;
        btn.innerHTML = `
          <div class="aspect-[16/10] overflow-hidden">
            <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover" loading="lazy" />
          </div>
          <div class="px-2.5 py-2 bg-charcoal/95">
            <span class="font-cinzel text-[9px] sm:text-[10px] tracking-[0.14em] uppercase ${isActive ? 'text-gold-light font-bold' : 'text-ivory/70'} block truncate">
              ${item.title}
            </span>
          </div>
        `;
        btn.addEventListener('click', () => renderPictorialCraft(idx));
        pictorialThumbsRow.appendChild(btn);
      });
    }

    if (pictorialActiveImg) pictorialActiveImg.src = stage.image;
    if (pictorialActiveTag) pictorialActiveTag.textContent = stage.tag;
    if (pictorialActiveTitle) pictorialActiveTitle.textContent = stage.title;
    if (pictorialActiveDesc) pictorialActiveDesc.textContent = stage.desc;
  }

  if (pictorialPrevBtn) {
    pictorialPrevBtn.addEventListener('click', () => renderPictorialCraft(activeCraftIndex - 1));
  }
  if (pictorialNextBtn) {
    pictorialNextBtn.addEventListener('click', () => renderPictorialCraft(activeCraftIndex + 1));
  }
  renderPictorialCraft(0);

  /* ------------------------------------------------------------------------
     12B. MENTORSHIP DETAILS MODAL ("LEARN MORE" -> PROCESS + PLANS)
     ------------------------------------------------------------------------ */
  const mentorshipDetailsModal = document.getElementById('mentorship-details-modal');
  const mentorLearnMoreBtn = document.getElementById('mentor-learn-more-btn');
  const closeMentorshipModalBtn = document.getElementById('close-mentorship-modal-btn');
  const mentorshipBackBtn = document.getElementById('mentorship-back-btn');

  function openMentorshipDetailsModal() {
    if (lenis) lenis.stop();
    if (mentorshipDetailsModal) {
      mentorshipDetailsModal.scrollTop = 0;
      mentorshipDetailsModal.classList.remove('opacity-0', 'pointer-events-none');
      mentorshipDetailsModal.classList.add('opacity-100', 'pointer-events-auto');
    }
  }

  function closeMentorshipDetailsModal() {
    if (mentorshipDetailsModal) {
      mentorshipDetailsModal.classList.add('opacity-0', 'pointer-events-none');
      mentorshipDetailsModal.classList.remove('opacity-100', 'pointer-events-auto');
    }
    if (lenis) lenis.start();
  }

  if (mentorLearnMoreBtn) mentorLearnMoreBtn.addEventListener('click', openMentorshipDetailsModal);
  if (closeMentorshipModalBtn) closeMentorshipModalBtn.addEventListener('click', closeMentorshipDetailsModal);
  if (mentorshipBackBtn) mentorshipBackBtn.addEventListener('click', closeMentorshipDetailsModal);

  /* ------------------------------------------------------------------------
     13. HIDDEN ENROLLMENT APPLICATION MODAL (OPENS ONLY ON ENROLL CLICK)
     ------------------------------------------------------------------------ */
  const enrollmentModal = document.getElementById('enrollment-modal');
  const closeEnrollBtn = document.getElementById('close-enroll-btn');
  const enrollForm = document.getElementById('enrollment-form');
  const enrollPlanSelect = document.getElementById('enroll-plan');
  const enrollErrorMsg = document.getElementById('enroll-error-msg');
  const enrollConfirmation = document.getElementById('enroll-confirmation');
  const enrollConfirmSummary = document.getElementById('enroll-confirm-summary');
  const enrollResetBtn = document.getElementById('enroll-reset-btn');

  function openEnrollmentModal(preselectedPlan) {
    if (lenis) lenis.stop();
    if (enrollForm && enrollConfirmation) {
      enrollForm.classList.remove('hidden');
      enrollConfirmation.classList.add('hidden');
    }
    if (enrollErrorMsg) enrollErrorMsg.classList.add('hidden');
    if (enrollPlanSelect && preselectedPlan) {
      enrollPlanSelect.value = preselectedPlan;
    }
    enrollmentModal.scrollTop = 0;
    enrollmentModal.classList.remove('opacity-0', 'pointer-events-none');
    enrollmentModal.classList.add('opacity-100', 'pointer-events-auto');
  }

  function closeEnrollmentModal() {
    enrollmentModal.classList.add('opacity-0', 'pointer-events-none');
    enrollmentModal.classList.remove('opacity-100', 'pointer-events-auto');
    const isMentorshipOpen =
      mentorshipDetailsModal && mentorshipDetailsModal.classList.contains('opacity-100');
    if (lenis && !isMentorshipOpen) lenis.start();
  }

  document.querySelectorAll('.enroll-trigger-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      openEnrollmentModal(btn.dataset.enrollPlan || '');
    });
  });

  if (closeEnrollBtn) closeEnrollBtn.addEventListener('click', closeEnrollmentModal);
  if (enrollResetBtn) enrollResetBtn.addEventListener('click', closeEnrollmentModal);
  if (enrollmentModal) {
    enrollmentModal.addEventListener('click', (e) => {
      if (e.target === enrollmentModal) closeEnrollmentModal();
    });
  }

  if (enrollForm) {
    enrollForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!enrollForm.checkValidity()) {
        if (enrollErrorMsg) enrollErrorMsg.classList.remove('hidden');
        enrollForm.reportValidity();
        return;
      }

      if (enrollErrorMsg) enrollErrorMsg.classList.add('hidden');
      const data = new FormData(enrollForm);
      const name = data.get('fullName');
      const plan = data.get('plan');
      const date = data.get('preferredDate');

      if (enrollConfirmSummary) {
        enrollConfirmSummary.textContent = `Thank you, ${name}. Your application preview for ${plan} (preferred start: ${date}) has been validated.`;
      }

      enrollForm.classList.add('hidden');
      if (enrollConfirmation) enrollConfirmation.classList.remove('hidden');
      enrollForm.reset();
    });
  }

  /* ------------------------------------------------------------------------
     14. FINAL SESSION — CLIENT TESTIMONIALS SLIDER & PARALLAX
     Uses clearly marked placeholders until actual client reviews are added.
     ------------------------------------------------------------------------ */
  const testimonials = [
    {
      quote:
        '“[Client Review Placeholder 1 — Actual verified client testimonial about the studio atmosphere, line precision, and healing experience will appear here.]”',
      author: '[CLIENT NAME PLACEHOLDER 1]',
      role: '[Optional Designation / Piece Type]',
    },
    {
      quote:
        '“[Client Review Placeholder 2 — Actual verified client testimonial about custom design collaboration and detail work will appear here.]”',
      author: '[CLIENT NAME PLACEHOLDER 2]',
      role: '[Optional Designation / Piece Type]',
    },
    {
      quote:
        '“[Client Review Placeholder 3 — Actual verified client testimonial about professionalism, comfort, and final result will appear here.]”',
      author: '[CLIENT NAME PLACEHOLDER 3]',
      role: '[Optional Designation / Piece Type]',
    },
  ];

  const testimonialQuoteEl = document.getElementById('testimonial-quote');
  const testimonialAuthorEl = document.getElementById('testimonial-author');
  const testimonialRoleEl = document.getElementById('testimonial-role');
  const testimonialSlideBody = document.getElementById('testimonial-slide-body');
  const testimonialDotsEl = document.getElementById('testimonial-dots');
  const testimonialPrevBtn = document.getElementById('testimonial-prev-btn');
  const testimonialNextBtn = document.getElementById('testimonial-next-btn');
  let activeTestimonialIdx = 0;

  function renderTestimonial(index) {
    activeTestimonialIdx = (index + testimonials.length) % testimonials.length;
    const item = testimonials[activeTestimonialIdx];

    if (testimonialSlideBody) {
      testimonialSlideBody.style.opacity = '0';
      testimonialSlideBody.style.transform = 'translateY(8px)';
      setTimeout(() => {
        if (testimonialQuoteEl) testimonialQuoteEl.textContent = item.quote;
        if (testimonialAuthorEl) testimonialAuthorEl.textContent = item.author;
        if (testimonialRoleEl) testimonialRoleEl.textContent = item.role;
        testimonialSlideBody.style.opacity = '1';
        testimonialSlideBody.style.transform = 'translateY(0)';
      }, 180);
    }

    if (testimonialDotsEl) {
      testimonialDotsEl.innerHTML = '';
      testimonials.forEach((_, idx) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.ariaLabel = `View testimonial ${idx + 1}`;
        dot.className = `h-2 rounded-full transition-all duration-300 ${
          idx === activeTestimonialIdx ? 'w-7 bg-gold' : 'w-2 bg-gold/30 hover:bg-gold/60'
        }`;
        dot.addEventListener('click', () => renderTestimonial(idx));
        testimonialDotsEl.appendChild(dot);
      });
    }
  }

  if (testimonialPrevBtn) {
    testimonialPrevBtn.addEventListener('click', () => renderTestimonial(activeTestimonialIdx - 1));
  }
  if (testimonialNextBtn) {
    testimonialNextBtn.addEventListener('click', () => renderTestimonial(activeTestimonialIdx + 1));
  }
  renderTestimonial(0);

  if (!prefersReducedMotion) {
    // Client Testimonials Content + Parallax
    gsap.to('#testimonial-bg-img', {
      yPercent: -12,
      ease: 'none',
      scrollTrigger: {
        trigger: '#testimonials-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    gsap.fromTo(
      '#testimonials-content',
      { opacity: 0, y: 34 },
      {
        opacity: 1,
        y: 0,
        duration: 0.95,
        ease: 'power3.out',
        scrollTrigger: { trigger: '#testimonials-section', start: 'top 76%' },
      }
    );

    gsap.to('#testimonial-flourish-line', {
      strokeDashoffset: 0,
      duration: 1.4,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#testimonials-section',
        start: 'top 75%',
      },
    });

    // FAQ Heading + Staggered Accordion Rows
    gsap.fromTo(
      '#faq-section .text-center',
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: '#faq-section', start: 'top 82%' },
      }
    );

    gsap.fromTo(
      '.faq-item',
      { opacity: 0, y: 18 },
      {
        opacity: 1,
        y: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: { trigger: '#faq-accordion', start: 'top 84%' },
      }
    );

    // Book an Appointment Stage
    gsap.fromTo(
      '#booking-form-wrap',
      { opacity: 0, y: 32 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: '#booking-section', start: 'top 78%' },
      }
    );

    gsap.fromTo(
      '#booking-section img',
      { scale: 1.1 },
      {
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '#booking-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    );

    // Footer Columns Stagger
    gsap.fromTo(
      '#footer-section .grid > div',
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: { trigger: '#footer-section', start: 'top 85%' },
      }
    );
  } else {
    gsap.set('#testimonial-flourish-line', { strokeDashoffset: 0 });
  }

  /* ------------------------------------------------------------------------
     15. FINAL SESSION — CONTROLLED FAQ ACCORDION
     Only one question stays expanded at a time for clean navigation.
     ------------------------------------------------------------------------ */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const trigger = item.querySelector('.faq-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const wasOpen = item.classList.contains('is-open');

      faqItems.forEach((other) => {
        other.classList.remove('is-open');
        const otherBtn = other.querySelector('.faq-trigger');
        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
      });

      if (!wasOpen) {
        item.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ------------------------------------------------------------------------
     16. FINAL SESSION — APPOINTMENT BOOKING FORM (INDEPENDENT FROM TRAINING)
     Validates all required fields + data consent and clearly notes that
     studio confirmation is required (no live booking backend connected).
     ------------------------------------------------------------------------ */
  const bookingForm = document.getElementById('appointment-booking-form');
  const bookingErrorMsg = document.getElementById('book-error-msg');
  const bookingConfirmation = document.getElementById('book-confirmation');
  const bookingConfirmSummary = document.getElementById('book-confirm-summary');
  const bookAnotherBtn = document.getElementById('book-another-btn');

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!bookingForm.checkValidity()) {
        if (bookingErrorMsg) bookingErrorMsg.classList.remove('hidden');
        bookingForm.reportValidity();
        return;
      }

      if (bookingErrorMsg) bookingErrorMsg.classList.add('hidden');
      const data = new FormData(bookingForm);
      const name = data.get('fullName');
      const style = data.get('style');
      const artist = data.get('artist');
      const dateTime = data.get('dateTime');

      if (bookingConfirmSummary) {
        const attachedNames = Array.from(attachedDesigns.values())
          .map((d) => d.title)
          .join(', ');
        const designNote = attachedNames ? ` with attached reference(s): ${attachedNames}` : '';
        bookingConfirmSummary.textContent = `Thank you, ${name}. Your request for ${style} with ${artist} (${dateTime})${designNote} has been recorded locally.`;
      }

      bookingForm.classList.add('hidden');
      if (bookingConfirmation) bookingConfirmation.classList.remove('hidden');
      bookingForm.reset();
    });
  }

  if (bookAnotherBtn && bookingForm && bookingConfirmation) {
    bookAnotherBtn.addEventListener('click', () => {
      bookingConfirmation.classList.add('hidden');
      bookingForm.classList.remove('hidden');
    });
  }

  // Recalculate all ScrollTrigger pin positions once all images finish loading
  window.addEventListener('load', () => {
    ScrollTrigger.refresh();
  });
});
