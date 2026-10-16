export const worlds = [
  {
    id: 'technology', number: '01', title: 'Technology', label: 'Systems that work',
    descriptor: 'Precise, useful, engineered for change.',
    description: 'We shape reliable digital products and the systems behind them — with the interface, architecture, and operating context considered together.',
    services: ['web-development', 'web-applications', 'mobile-apps', 'desktop-software', 'game-development', 'ai-solutions', 'saas-products', 'automation-systems'],
    process: [
      ['Map the system', 'Clarify users, constraints, existing tools, and the outcome the product must support.'],
      ['Shape the experience', 'Turn the brief into flows, interaction models, and an architecture that can grow.'],
      ['Build in the open', 'Develop in reviewable increments, keeping design decisions close to implementation.'],
      ['Verify and evolve', 'Test the real journeys, prepare the handover, and identify the next useful improvement.']
    ]
  },
  {
    id: 'creative', number: '02', title: 'Creative', label: 'Ideas with form',
    descriptor: 'Expressive, editorial, made to be remembered.',
    description: 'We give a point of view a visual language — from the first strategic idea to the details people see, use, and keep.',
    services: ['graphic-design', 'brand-identity', 'logo-design', 'uiux-design', 'motion-graphics', '3d-modeling', '3d-animation', 'product-visualization'],
    process: [
      ['Find the signal', 'Understand the audience, context, and tension the creative work needs to resolve.'],
      ['Set the direction', 'Explore distinct routes, test the strongest one, and define its visual rules.'],
      ['Make the system', 'Create the core work and the practical assets needed to use it consistently.'],
      ['Prepare for real life', 'Deliver clear files, usage guidance, and a system designed to travel across formats.']
    ]
  },
  {
    id: 'media', number: '03', title: 'Media', label: 'Stories in motion',
    descriptor: 'Cinematic, rhythmic, built around a feeling.',
    description: 'We connect image, edit, sound, and sequence into media with a clear emotional point of view — not just a polished timeline.',
    services: ['video-editing', 'commercial-videos', 'music-videos', 'sound-design', 'audio-production', 'song-production', 'podcast-production'],
    process: [
      ['Listen for the story', 'Set the audience, message, format, and feeling before production choices are made.'],
      ['Build the treatment', 'Plan the rhythm, assets, sound, and technical requirements around the idea.'],
      ['Produce and refine', 'Make the work in deliberate passes, with focused review points and clear feedback.'],
      ['Finish for its context', 'Master, export, and package the work for the channels where it will actually live.']
    ]
  },
  {
    id: 'marketing', number: '04', title: 'Marketing', label: 'Attention with intent',
    descriptor: 'Strategic, specific, accountable to the brief.',
    description: 'We help connect a clear offer to the right audience through useful content, considered channel choices, and measurement that is labelled honestly.',
    services: ['social-media', 'content-creation', 'seo', 'advertising-campaigns', 'meta-ads', 'google-ads', 'influencer-marketing'],
    process: [
      ['Understand the context', 'Review the offer, audience, current materials, and available first-party signals.'],
      ['Choose the focus', 'Agree a channel role, content direction, test plan, and a small set of meaningful measures.'],
      ['Make and launch', 'Prepare assets and campaigns with clear naming, review, and budget controls.'],
      ['Learn without spin', 'Read the available evidence, separate observation from assumption, and set the next test.']
    ]
  },
  {
    id: 'legal', number: '05', title: 'Legal support', label: 'Clarity around ownership',
    descriptor: 'Calm, organized, and clear about its limits.',
    description: 'We support the practical organization of creative and intellectual-property work. This is not legal representation; specialist legal advice may be needed.',
    services: ['copyright', 'trademark', 'brand-protection', 'licensing-support'],
    process: [
      ['Organize the facts', 'Identify the work, assets, jurisdictions, owners, and documents already in scope.'],
      ['Clarify the question', 'Separate operational needs from questions that require a qualified legal professional.'],
      ['Prepare the materials', 'Create an orderly record, brief, or handoff package for the next decision-maker.'],
      ['Confirm the next step', 'Document open items and, where needed, direct the matter to independent counsel.']
    ]
  }
];

export const services = [
  // TECHNOLOGY · 01
  {
    slug: 'web-development', title: 'Web Development', world: 'technology',
    intro: 'A website should do more than look considered. We build fast, accessible web experiences that make the next step feel clear.',
    meta: 'Custom web development for clear, responsive and accessible digital experiences. Explore ETERIOMN’s approach to building for the open web.',
    audience: 'Teams launching a new brand, service, publication, or digital destination that needs a dependable web foundation.',
    challenge: 'A slow, fragile, or hard-to-update site can make a strong offer difficult to understand and even harder to act on.',
    deliverables: ['Responsive page systems and semantic HTML', 'Front-end implementation and interaction states', 'Performance, accessibility, and launch checks'],
    difference: 'We bring content, interface, and implementation into one conversation, so the finished site reads as a coherent product instead of a set of disconnected screens.',
    faqs: [
      ['Can you work with an existing design?', 'Yes. We can implement an established design system or help resolve gaps that surface between design files and a working browser experience.'],
      ['Will the site be editable?', 'That depends on the publishing setup. We agree the handover and content workflow before development; no CMS is assumed without a clear need.']
    ]
  },
  {
    slug: 'web-applications', title: 'Web Applications', world: 'technology',
    intro: 'We design and build browser-based tools around real tasks, from the first useful workflow to a product-ready interface.',
    meta: 'Web application design and development for focused workflows, clear product interfaces, and maintainable browser-based tools.',
    audience: 'Founders and teams turning a repeated task, internal process, or service into a usable browser-based product.',
    challenge: 'A collection of forms and features is not a product until its states, permissions, edge cases, and everyday workflow make sense together.',
    deliverables: ['User flows, interface states, and product structure', 'Responsive front-end implementation', 'A documented handoff for data and backend integration'],
    difference: 'We map the work people need to get done before adding interface complexity, then make system states visible instead of leaving users to guess.',
    faqs: [
      ['Do you provide the backend?', 'The scope is agreed around the product. This static studio site does not include a backend; an application engagement can define and connect the required services explicitly.'],
      ['Can you prototype before building?', 'Yes. A focused prototype can answer questions about navigation, permissions, and task flow before engineering scope is committed.']
    ]
  },
  {
    slug: 'mobile-apps', title: 'Mobile Apps', world: 'technology',
    intro: 'Mobile experiences built around the realities of a small screen: focused tasks, clear feedback, and thoughtful use of device capabilities.',
    meta: 'Mobile app product design and front-end planning for focused iOS and Android experiences, from early flows to implementation handoff.',
    audience: 'Product teams whose users need a dedicated mobile experience rather than a scaled-down desktop interface.',
    challenge: 'Mobile products can become crowded when every desktop feature is carried over without considering context, reach, connectivity, or interruption.',
    deliverables: ['Mobile-first journeys and interaction prototypes', 'Reusable screen patterns and component guidance', 'Platform-aware implementation specifications'],
    difference: 'We prioritize the moment and setting in which an app is used, then make navigation and feedback resilient to real-world interruptions.',
    faqs: [
      ['Do you build native or cross-platform apps?', 'The right approach depends on device needs, team constraints, and the product roadmap. We define those trade-offs before recommending an implementation path.'],
      ['Can you help validate an app idea?', 'Yes. We can make a clickable prototype and test the core journey before a larger build is considered.']
    ]
  },
  {
    slug: 'desktop-software', title: 'Desktop Software', world: 'technology',
    intro: 'Purpose-built desktop tools for work that benefits from screen space, local workflows, dedicated controls, or a focused environment.',
    meta: 'Desktop software experience planning for focused workflows, dependable interface states, and clear cross-platform requirements.',
    audience: 'Teams with specialist, operational, or creative workflows that are difficult to support well in a general-purpose browser interface.',
    challenge: 'Desktop tools often inherit years of complexity. Users need powerful controls without having to learn the system before doing their work.',
    deliverables: ['Workflow maps and desktop interaction models', 'Window, panel, keyboard, and state specifications', 'A technical brief for platform-specific implementation'],
    difference: 'We treat keyboard use, density, window behavior, and failure recovery as first-class parts of the product experience.',
    faqs: [
      ['Which operating systems can a project support?', 'That is decided during technical discovery. We document platform requirements and constraints before the implementation route is chosen.'],
      ['Can you improve an existing desktop tool?', 'Yes. A workflow review can identify unnecessary steps, confusing states, and opportunities to make frequent actions easier to reach.']
    ]
  },
  {
    slug: 'game-development', title: 'Game Development', world: 'technology',
    intro: 'Interactive worlds begin with a playable idea. We help shape mechanics, feedback, and technical direction into a coherent game experience.',
    meta: 'Game development support for playable prototypes, interaction systems, and game experiences shaped around a clear creative premise.',
    audience: 'Creators and teams exploring a game concept, an interactive narrative, or a playable brand experience.',
    challenge: 'A compelling premise still needs rules, feedback, pacing, and a practical scope that can be tested before production expands.',
    deliverables: ['Core-loop definition and interaction prototype', 'Interface, feedback, and progression concepts', 'Technical and production scope recommendations'],
    difference: 'We make the central interaction testable early, so creative ambition is balanced with the realities of input, performance, and production.',
    faqs: [
      ['Do you work on mobile, desktop, or web games?', 'The target platform is part of the first scoping conversation. It affects controls, performance, and how the prototype should be evaluated.'],
      ['Can you help with a prototype only?', 'Yes. A prototype can be a useful way to test one mechanic or interaction before a full game plan is developed.']
    ]
  },
  {
    slug: 'ai-solutions', title: 'AI Solutions', world: 'technology',
    intro: 'We explore where AI can make a workflow more useful — and where a transparent, human-led process is the better answer.',
    meta: 'Practical AI product and workflow exploration focused on clear use cases, human oversight, and responsible technical boundaries.',
    audience: 'Organizations with a specific repetitive, information-heavy, or assistive task to investigate — not a need to add AI for its own sake.',
    challenge: 'Unclear inputs, hidden failure modes, and overconfident automation can create risk without making the underlying work better.',
    deliverables: ['Use-case and data-boundary mapping', 'A scoped proof of concept or interaction prototype', 'Evaluation criteria, fallback paths, and human review points'],
    difference: 'We begin with the job to be done, make uncertainty visible, and define how people can check or override an automated result.',
    faqs: [
      ['Do you train custom models?', 'That is not assumed. Many useful explorations can begin by testing an existing service against clear requirements; model development is scoped only when justified.'],
      ['How do you address privacy?', 'Data handling and vendor choices must be reviewed for each project. We map what information is needed and flag privacy or legal questions for the appropriate specialists.']
    ]
  },
  {
    slug: 'saas-products', title: 'SaaS Products', world: 'technology',
    intro: 'A subscription product is a continuing relationship, not a one-time screen. We shape the journeys that help people understand, adopt, and return.',
    meta: 'SaaS product design and experience planning for onboarding, core workflows, account states, and an evolving product system.',
    audience: 'Teams building or refining a software service that people access repeatedly as part of their work or personal routines.',
    challenge: 'Disconnected onboarding, empty states, and unclear account journeys can obscure the value of an otherwise useful product.',
    deliverables: ['Onboarding and core-task journey maps', 'Product UI patterns for loading, empty, and error states', 'A prioritized design and implementation roadmap'],
    difference: 'We pay attention to the before and after of the main feature — the setup, recovery, and return moments that shape everyday trust.',
    faqs: [
      ['Can you help with an early-stage SaaS idea?', 'Yes. We can define a small, testable first release around one audience and one core workflow before broadening the feature set.'],
      ['Do you advise on pricing or billing?', 'We can map how pricing and account choices appear in the experience, while commercial and payment policies remain the product owner’s decision.']
    ]
  },
  {
    slug: 'automation-systems', title: 'Automation Systems', world: 'technology',
    intro: 'Less repetition, fewer blind spots. We map practical automations that keep people informed and in control when work moves between tools.',
    meta: 'Workflow automation discovery and system design for repeatable handoffs, clear exceptions, and human oversight.',
    audience: 'Teams managing recurring handoffs, structured information, or administrative work across multiple tools.',
    challenge: 'Automating a broken process can make errors travel faster. Unowned exceptions and invisible failures are especially difficult to recover from.',
    deliverables: ['Current-state workflow and dependency map', 'Automation rules, exception paths, and notification plan', 'An integration brief and verification checklist'],
    difference: 'We design the exception and recovery path alongside the happy path, so a workflow remains understandable when something does not match the rule.',
    faqs: [
      ['Can you connect our existing tools?', 'Potential connections depend on the systems, permissions, and APIs involved. We verify those constraints before promising an integration.'],
      ['Will automation remove the need for review?', 'Not by default. We identify which steps can be automated safely and where a person should confirm, correct, or stop the process.']
    ]
  },
  // CREATIVE · 02
  {
    slug: 'graphic-design', title: 'Graphic Design', world: 'creative',
    intro: 'Graphic design gives information a visual order. We create clear, distinctive assets that carry the same idea across print and screen.',
    meta: 'Graphic design for editorial systems, campaigns, presentations, and digital assets with a consistent visual point of view.',
    audience: 'Teams that need communications, campaign assets, or editorial materials to feel more coherent and recognizable.',
    challenge: 'One-off graphics can look polished in isolation but fail to build recognition or adapt to different formats.',
    deliverables: ['Art direction and layout systems', 'Digital and print-ready assets', 'Usage notes and adaptable templates where useful'],
    difference: 'We build from hierarchy and message first, then use typography, composition, and restraint to make each format feel intentional.',
    faqs: [
      ['Can you work within existing brand guidelines?', 'Yes. We can extend an established identity or identify where its rules need clarification for a new set of materials.'],
      ['Which file formats are included?', 'Formats are set by the intended use. Typical handoff can include editable source files and export-ready assets, agreed before production.']
    ]
  },
  {
    slug: 'brand-identity', title: 'Brand Identity', world: 'creative',
    intro: 'A brand identity is a system for making a point of view recognizable. We connect positioning, visual language, and practical use.',
    meta: 'Brand identity strategy and design for teams seeking a recognizable visual system with practical guidance for everyday use.',
    audience: 'New ventures, evolving organizations, or established teams whose current expression no longer reflects their direction.',
    challenge: 'A logo alone cannot resolve unclear positioning, inconsistent touchpoints, or a visual system that is difficult to use.',
    deliverables: ['Identity direction and core visual principles', 'Logo suite, typography, color, and graphic elements', 'A concise brand guide and rollout-ready asset set'],
    difference: 'We design the rules around the mark as carefully as the mark itself, so the identity can flex without losing its character.',
    faqs: [
      ['Is strategy part of identity work?', 'The scope can include positioning and audience alignment. The depth is agreed at the start rather than implied by a visual-only brief.'],
      ['Can you refresh an existing identity rather than replace it?', 'Yes. A considered refresh can preserve valuable recognition while clarifying the parts that no longer serve the brand.']
    ]
  },
  {
    slug: 'logo-design', title: 'Logo Design', world: 'creative',
    intro: 'A strong logo is recognizable at a glance and resilient at every size. We design marks with clear ideas, practical variants, and considered use.',
    meta: 'Custom logo design with considered wordmarks, symbols, responsive variants, and practical delivery guidance.',
    audience: 'Organizations that need a new visual signature or a more useful, legible mark for contemporary touchpoints.',
    challenge: 'Marks that rely on tiny detail, a single layout, or visual trends can be difficult to recognize and apply consistently.',
    deliverables: ['Distinct logo routes and selected refinement', 'Responsive lockups and monochrome versions', 'Vector masters and concise usage guidance'],
    difference: 'We test the mark in the contexts that matter — small screens, constrained spaces, and one-color reproduction — not just on a presentation page.',
    faqs: [
      ['Will the logo be available as vector artwork?', 'The planned handoff includes appropriate vector and raster exports, with the final file list confirmed in the project scope.'],
      ['Does logo design include a full brand identity?', 'Not automatically. A logo engagement can be focused, or expanded into a broader identity system when the project needs it.']
    ]
  },
  {
    slug: 'uiux-design', title: 'UI/UX Design', world: 'creative',
    intro: 'Useful interfaces make complex tasks feel legible. We connect user flows, content, interaction, and visual design into one considered experience.',
    meta: 'UI and UX design for clear user journeys, accessible interface patterns, and digital products grounded in real tasks.',
    audience: 'Product teams improving a digital experience or shaping an idea before committing to a larger build.',
    challenge: 'A beautiful interface can still create friction when navigation, language, accessibility, and system feedback are treated separately.',
    deliverables: ['Journey maps and wireframes', 'High-fidelity screens and interaction prototypes', 'Component and accessibility notes for implementation'],
    difference: 'We treat usability and visual character as partners, checking real task flow while preserving a strong design point of view.',
    faqs: [
      ['Do you conduct user research?', 'Research can be included when access to participants and a clear question are available. Methods are chosen to fit the project, not used as decoration.'],
      ['Can you hand designs to our development team?', 'Yes. We prepare organized files, interaction states, and implementation notes that make design intent easier to carry into code.']
    ]
  },
  {
    slug: 'motion-graphics', title: 'Motion Graphics', world: 'creative',
    intro: 'Motion can clarify a transition, reveal a system, or give a visual idea a pulse. We use it with purpose, not as decoration.',
    meta: 'Motion graphics and animation direction for identity systems, explainers, product moments, and digital campaigns.',
    audience: 'Teams that need a visual system or story to work across animated, cinematic, or interactive formats.',
    challenge: 'Unstructured animation can add noise, weaken legibility, or make a brand feel inconsistent across channels.',
    deliverables: ['Motion direction and timing principles', 'Designed sequences, transitions, or graphic assets', 'Exports and handoff notes for intended platforms'],
    difference: 'We define what movement communicates — pace, hierarchy, continuity — before deciding how much motion a piece needs.',
    faqs: [
      ['Can motion graphics be made accessible?', 'Yes. We consider contrast, readability, captions where relevant, and reduced-motion alternatives for digital placements.'],
      ['Do you deliver editable project files?', 'Editable source and rendered exports can be included when agreed. The appropriate format depends on the software and final destination.']
    ]
  },
  {
    slug: '3d-modeling', title: '3D Modeling', world: 'creative',
    intro: 'We translate a visual idea into a dimensional model with believable proportions, useful topology, and a clear path to its next use.',
    meta: '3D modeling for product concepts, motion, visualization, and digital experiences, scoped to the intended downstream use.',
    audience: 'Designers and teams needing original 3D objects or environments for visualization, animation, or interactive work.',
    challenge: 'A model can look convincing in one still yet fail when it needs to deform, animate, render from another angle, or move between tools.',
    deliverables: ['Reference and modeling direction', 'Clean geometry and material-ready scene', 'Exports prepared for the agreed rendering or production pipeline'],
    difference: 'We shape geometry around its use case from the beginning, balancing visual detail with the practical needs of lighting, motion, and delivery.',
    faqs: [
      ['Which 3D formats can you deliver?', 'The destination workflow determines the format. We confirm compatibility and required scene elements before production begins.'],
      ['Can you create photoreal product models from references?', 'A model can be built from available references, but accuracy depends on the quality and completeness of those source materials.']
    ]
  },
  {
    slug: '3d-animation', title: '3D Animation', world: 'creative',
    intro: 'From a subtle product gesture to a fully staged sequence, we plan movement around form, timing, and the story a shot needs to tell.',
    meta: '3D animation for product sequences, branded films, and digital stories with deliberate timing and production-ready delivery.',
    audience: 'Teams that need a three-dimensional subject to move with clarity, character, or product-specific intent.',
    challenge: 'Motion without a plan can obscure a product, waste render time, or make a sequence feel impressive but difficult to follow.',
    deliverables: ['Storyboard or motion tests', 'Animated scenes and camera direction', 'Rendered outputs or a production-ready handoff'],
    difference: 'We treat camera, lighting, and motion as one composition, testing the key beats before committing to a final render pass.',
    faqs: [
      ['Can a 3D animation be prepared for social formats?', 'Yes. Framing, safe areas, and alternate crops can be planned for the channels included in the brief.'],
      ['How do you manage render scope?', 'We agree duration, resolution, detail, and review stages early, then use previews to surface timing decisions before final output.']
    ]
  },
  {
    slug: 'product-visualization', title: 'Product Visualization', world: 'creative',
    intro: 'Show a product before, between, or beyond the studio shoot. We create visualizations that make material, proportion, and detail feel considered.',
    meta: 'Product visualization for launch imagery, concept reviews, and campaign assets using carefully directed 3D light and materials.',
    audience: 'Product and brand teams that need controlled visual assets before a physical shoot or across changing product configurations.',
    challenge: 'A generic render can flatten material character or misrepresent a product’s shape, scale, and finish.',
    deliverables: ['Look development and lighting studies', 'Product stills or short motion sequences', 'Crops and exports for agreed channels'],
    difference: 'We work from the details that make the object specific — edge behavior, surface response, scale, and the conditions in which it is seen.',
    faqs: [
      ['What references do you need?', 'Product CAD or models are useful, but photography, technical drawings, measurements, and material references may also support a scoped visualization.'],
      ['Can you produce several product variations?', 'Variants can be planned as a shared scene system. The number and complexity of configurations affect the scope and are agreed in advance.']
    ]
  },
  // MEDIA · 03
  {
    slug: 'video-editing', title: 'Video Editing', world: 'media',
    intro: 'A strong edit is made in the choices between shots. We shape pace, structure, and clarity around the story the footage can genuinely support.',
    meta: 'Video editing for branded films, interviews, social content, and campaign assets with deliberate pacing and clear delivery.',
    audience: 'Teams with footage that needs structure, refinement, or adaptation into a useful set of finished edits.',
    challenge: 'Without a clear editorial spine, even good footage can feel long, disjointed, or unsuited to the place it will be watched.',
    deliverables: ['Editorial outline and first assembly', 'Refined picture edit, titles, and sound balance', 'Master files and agreed platform versions'],
    difference: 'We find the strongest story in the material before layering effects, keeping the edit legible and the finishing appropriate to its context.',
    faqs: [
      ['Can you edit footage we already have?', 'Yes. We review the available media, technical formats, and intended outcome before confirming what can be achieved from the source material.'],
      ['Are captions and social cutdowns included?', 'They can be. Captions, aspect ratios, and the number of versions are defined in the delivery plan.']
    ]
  },
  {
    slug: 'commercial-videos', title: 'Commercial Videos', world: 'media',
    intro: 'Commercial work earns attention by making one idea easy to feel and understand. We connect the treatment, production choices, and final cut around that idea.',
    meta: 'Commercial video concepts and production planning for clear, distinctive brand stories across defined media formats.',
    audience: 'Brands and organizations that need a focused film or video campaign to explain an offer, launch a product, or set a tone.',
    challenge: 'A broad brief can produce a film that says many things without giving viewers one reason to remember it.',
    deliverables: ['Creative treatment and production outline', 'Directed or assembled video assets within the agreed scope', 'Channel-ready versions and delivery notes'],
    difference: 'We establish a single creative proposition first, then use format, pacing, and visual detail to make it travel across placements.',
    faqs: [
      ['Do you handle filming as well as post-production?', 'Production needs are scoped around the project and available crew. The plan clearly distinguishes original capture from editing supplied material.'],
      ['Can one concept be adapted to several channels?', 'Yes. We plan the core idea and its cutdown logic together, while keeping each version readable in its actual placement.']
    ]
  },
  {
    slug: 'music-videos', title: 'Music Videos', world: 'media',
    intro: 'A music video gives sound a visual world. We develop imagery and rhythm that respond to the track without losing the artist’s own point of view.',
    meta: 'Music video art direction and production planning for visual worlds shaped around an artist, track, and release context.',
    audience: 'Artists, labels, and collaborators looking to turn a track into a visual piece with a coherent treatment and achievable scope.',
    challenge: 'A strong reference board can still lead to a disconnected video if the visual metaphor, performance, and edit do not share a clear idea.',
    deliverables: ['Visual treatment and sequence direction', 'Production or post-production plan', 'Final video and agreed release-format versions'],
    difference: 'We build the visual language from the track’s texture and intent, then keep the production plan grounded in the available time and resources.',
    faqs: [
      ['Can a video be made with a small production footprint?', 'Yes. A focused location, lighting idea, or repeatable visual device can give a modest production a strong identity.'],
      ['Do you work with existing footage?', 'We can. The footage and release goals are reviewed first so the edit direction responds to what is actually available.']
    ]
  },
  {
    slug: 'sound-design', title: 'Sound Design', world: 'media',
    intro: 'Sound gives an interface, film, or space its physical character. We build sonic details that guide attention and support the feeling of a moment.',
    meta: 'Sound design for moving image, digital products, and immersive work with clear roles for texture, rhythm, and silence.',
    audience: 'Creative teams who want sound to reinforce the world, interaction, or emotional rhythm of a finished experience.',
    challenge: 'Stock effects and default cues can make distinct work feel generic or distract from the information that matters.',
    deliverables: ['Sonic direction and sound palette', 'Designed effects, transitions, or interaction cues', 'Layered and mastered exports for the agreed use'],
    difference: 'We treat silence and hierarchy as part of the soundscape, so designed details support the experience instead of filling every gap.',
    faqs: [
      ['Can you create sound for a digital interface?', 'Yes. We can design a restrained set of cues and discuss where sound is helpful, optional, or better left off by default.'],
      ['Will the files be cleared for commercial use?', 'Licensing depends on the source material and agreement. Original work and any third-party material are documented clearly in the delivery scope.']
    ]
  },
  {
    slug: 'audio-production', title: 'Audio Production', world: 'media',
    intro: 'Clear, well-shaped audio lets a message hold attention. We bring recording, editing, arrangement, and finishing into a considered production process.',
    meta: 'Audio production for spoken-word and creative projects, from source review and editing to balanced, delivery-ready masters.',
    audience: 'Creators and teams producing voice-led, music-led, or mixed audio that needs a consistent and reliable finish.',
    challenge: 'Uneven recording, room noise, or inconsistent levels can make otherwise valuable material tiring to listen to.',
    deliverables: ['Session and source-file review', 'Editing, cleanup, and mix direction', 'Mastered files prepared for agreed playback contexts'],
    difference: 'We preserve the character of the source while addressing the technical distractions that interfere with listening.',
    faqs: [
      ['Can you work with remote recordings?', 'Often, depending on the source quality and recording conditions. A short sample helps establish a realistic cleanup and production scope.'],
      ['Do you deliver broadcast loudness targets?', 'Delivery specifications can be agreed for the intended platform. We do not assume one loudness target is right for every destination.']
    ]
  },
  {
    slug: 'song-production', title: 'Song Production', world: 'media',
    intro: 'A song comes together through arrangement, performance, and detail. We support the production decisions that help an artist’s idea become a finished recording.',
    meta: 'Song production support for arrangement, recording direction, editing, and mix preparation shaped around the artist’s intent.',
    audience: 'Artists who have a song idea, demo, or partially recorded track and want a clearer route to a finished version.',
    challenge: 'A good song can lose its identity when arrangement choices, production references, and technical revisions pull in different directions.',
    deliverables: ['Production conversation and arrangement notes', 'Recording or editing plan within the agreed scope', 'Organized stems or mix-ready session handoff'],
    difference: 'We keep the artist’s intent at the center, making decisions that serve the song instead of chasing a production trend.',
    faqs: [
      ['Do you write or co-write songs?', 'Songwriting and production are separate scopes. Any co-writing, credits, ownership, or splits should be agreed in writing before work begins.'],
      ['Can a production begin from a phone demo?', 'A demo can communicate the core idea. We assess what it conveys and plan what additional recordings or references are needed.']
    ]
  },
  {
    slug: 'podcast-production', title: 'Podcast Production', world: 'media',
    intro: 'A good podcast feels easy to follow and dependable to return to. We shape the format, sound, and repeatable production details behind each episode.',
    meta: 'Podcast production planning, editing, and audio identity for thoughtful, repeatable spoken-word series.',
    audience: 'Independent hosts and organizations developing a new audio series or refining an existing production workflow.',
    challenge: 'Inconsistent recording, unclear episode structure, and laborious editing can make a promising series difficult to sustain.',
    deliverables: ['Format and episode-structure guidance', 'Editing, cleanup, and consistent show elements', 'Master files and a repeatable handoff checklist'],
    difference: 'We make repeatability part of the creative brief, so the production can stay coherent without making every episode sound identical.',
    faqs: [
      ['Can you help define a podcast format?', 'Yes. We can shape episode length, recurring segments, host roles, and an editorial rhythm around the intended audience and production capacity.'],
      ['Do you publish episodes to podcast platforms?', 'Publishing accounts and distribution access are not included by default. We can prepare files and a handoff guide, with platform setup agreed separately.']
    ]
  },
  // MARKETING · 04
  {
    slug: 'social-media', title: 'Social Media', world: 'marketing',
    intro: 'A useful social presence is a recognizable rhythm, not a stream of disconnected posts. We shape its voice, formats, and practical publishing system.',
    meta: 'Social media strategy and content systems for consistent publishing, recognizable creative, and a clear channel role.',
    audience: 'Teams that need a more coherent approach to their social channels, content rhythm, and day-to-day publishing.',
    challenge: 'Posting without a clear role for each channel can consume time while making it difficult to learn what resonates.',
    deliverables: ['Channel and audience review', 'Content pillars, format ideas, and sample calendar', 'Reusable templates and reporting questions'],
    difference: 'We design a system that fits the organization’s actual capacity, rather than a content schedule that only works on paper.',
    faqs: [
      ['Do you manage posting every day?', 'Ongoing publishing is a separate operational scope. The initial work can establish a strategy and toolkit for an internal team or partner to use.'],
      ['Will you guarantee reach or follower growth?', 'No. Platform distribution changes and outcomes depend on many factors. We define useful learning signals without promising a specific result.']
    ]
  },
  {
    slug: 'content-creation', title: 'Content Creation', world: 'marketing',
    intro: 'Good content starts with a useful idea and a real audience. We develop formats and assets that explain, demonstrate, or invite action with clarity.',
    meta: 'Content creation and format development for clear brand stories, useful campaign assets, and channel-aware publishing.',
    audience: 'Organizations with a message, product, or expertise that needs a more engaging and consistent form.',
    challenge: 'Content can become repetitive when each piece starts from a blank page or is created without a defined role.',
    deliverables: ['Editorial themes and content briefs', 'Written, visual, or motion assets within the agreed scope', 'A reusable production and review workflow'],
    difference: 'We connect what a piece says to what it helps someone understand or do, then select a format suited to that purpose.',
    faqs: [
      ['Can you create both copy and visuals?', 'Yes, where the brief calls for a connected creative output. Scope identifies which channels, formats, and review rounds are included.'],
      ['Do you use AI-generated content?', 'Tools are selected transparently for the task. Any use of third-party models, data, or generated material should be agreed and reviewed for the project context.']
    ]
  },
  {
    slug: 'seo', title: 'SEO', world: 'marketing',
    intro: 'Search visibility is built on useful information, accessible structure, and a site that works well. We focus on the foundations people and crawlers can understand.',
    meta: 'Technical and content-focused SEO support for crawlable site structure, useful search pages, and clear measurement boundaries.',
    audience: 'Organizations improving how their pages are structured, discovered, and understood in organic search.',
    challenge: 'Technical issues, unclear page intent, and thin content can make important information hard to find or interpret.',
    deliverables: ['Technical and on-page review', 'Search intent and content-structure recommendations', 'Prioritized fixes and measurement notes'],
    difference: 'We focus on clear, maintainable improvements and avoid ranking guarantees, keyword stuffing, or claims unsupported by the available data.',
    faqs: [
      ['Can you guarantee a ranking?', 'No. Search systems and competition change; no responsible provider can guarantee a position. We can identify issues and improve the quality of the foundations.'],
      ['Do you need analytics access?', 'Not always. Access can help answer specific measurement questions, but we agree data access and privacy boundaries before review.']
    ]
  },
  {
    slug: 'advertising-campaigns', title: 'Advertising Campaigns', world: 'marketing',
    intro: 'A campaign needs a sharp proposition, a channel plan, and a way to learn. We connect the creative and operational pieces before spend begins.',
    meta: 'Advertising campaign strategy and creative planning for focused propositions, channel roles, and transparent testing.',
    audience: 'Teams preparing a launch, promotion, or awareness effort that needs a coordinated campaign plan.',
    challenge: 'Disjointed creative and targeting can spend budget without giving the team a useful answer about audience or message fit.',
    deliverables: ['Campaign brief and message hierarchy', 'Channel, creative, and testing plan', 'Launch checklist and evidence-led review framework'],
    difference: 'We state assumptions before a campaign begins and separate test outcomes from guarantees or sales claims.',
    faqs: [
      ['Do you manage the media budget?', 'Budget ownership and platform permissions are agreed explicitly. Spend should remain visible to the client and within a documented limit.'],
      ['Can you promise a return on ad spend?', 'No. Campaign results depend on product, offer, market, media, and many other factors. We can plan tests and report the data available without inventing an outcome.']
    ]
  },
  {
    slug: 'meta-ads', title: 'Meta Ads', world: 'marketing',
    intro: 'Meta advertising combines audience context, creative variation, and disciplined measurement. We help plan campaigns with clear assumptions and guardrails.',
    meta: 'Meta Ads planning and campaign creative for Facebook and Instagram, with clear scope, budget controls, and honest reporting.',
    audience: 'Teams evaluating paid campaigns across Meta placements with a defined offer and the ability to review results.',
    challenge: 'Changing platform delivery and fragmented creative tests make it easy to confuse activity with meaningful learning.',
    deliverables: ['Campaign structure and audience hypotheses', 'Ad concepts and placement-aware assets', 'Budget, naming, and reporting framework'],
    difference: 'We keep platform assumptions explicit and create a test plan that can distinguish creative questions from targeting questions.',
    faqs: [
      ['Is Meta ad spend included in the service fee?', 'No spend is implied. Media budgets and service fees are separate and should be agreed transparently before launch.'],
      ['Do you guarantee leads or conversions?', 'No. We can set up and review a campaign within the agreed scope, but cannot guarantee a volume or cost outcome.']
    ]
  },
  {
    slug: 'google-ads', title: 'Google Ads', world: 'marketing',
    intro: 'Search and display campaigns work best when the query, offer, landing page, and measurement all agree. We help make those connections visible.',
    meta: 'Google Ads strategy and campaign setup planning aligned to search intent, useful landing pages, and transparent measurement.',
    audience: 'Organizations with a clear offer and landing destination that want to test paid discovery across Google inventory.',
    challenge: 'Poor query fit, unclear landing pages, or unverified conversion tracking can make campaign data hard to interpret.',
    deliverables: ['Keyword and intent structure', 'Campaign and ad-copy plan', 'Landing-page and conversion-tracking review checklist'],
    difference: 'We check the whole path from search intent to next action, so campaign setup does not become a substitute for a clear destination.',
    faqs: [
      ['Can you audit an existing account?', 'Yes, when appropriate access is provided. The review focuses on structure, query intent, landing pages, and the quality of available measurement.'],
      ['Are results guaranteed?', 'No. Auctions, demand, competition, and the offer itself all matter. Reporting should distinguish what the account shows from what can be concluded.']
    ]
  },
  {
    slug: 'influencer-marketing', title: 'Influencer Marketing', world: 'marketing',
    intro: 'Creator partnerships work when the fit is real and the brief leaves room for a human voice. We help structure the relationship and its practical safeguards.',
    meta: 'Influencer marketing planning for thoughtful creator fit, clear collaboration briefs, disclosure, and measurable learning.',
    audience: 'Brands considering creator partnerships and seeking a more considered route from audience fit to campaign brief.',
    challenge: 'Follower counts alone do not establish relevance, audience trust, rights, or a useful measure of campaign quality.',
    deliverables: ['Creator-fit criteria and shortlisting approach', 'Collaboration brief, usage scope, and review points', 'Disclosure and post-campaign learning checklist'],
    difference: 'We prioritize audience relevance and transparent terms over headline reach, while flagging disclosure and rights questions before publication.',
    faqs: [
      ['Do you guarantee access to specific creators?', 'No. Availability and participation depend on the creator and any representative. Introductions or outreach are scoped separately and never assumed.'],
      ['Who owns the content made in a partnership?', 'Ownership and usage rights need explicit written terms agreed with all parties. We can help organize the brief, but legal questions may require independent counsel.']
    ]
  },
  // LEGAL SUPPORT · 05
  {
    slug: 'copyright', title: 'Copyright', world: 'legal',
    intro: 'Creative work deserves a clear record. We help organize authorship, asset sources, permissions, and handoff information so ownership questions are easier to discuss.',
    meta: 'Practical copyright organization for creative assets, source records, permission notes, and informed legal handoff.',
    audience: 'Creators and teams managing original work, commissioned assets, or a growing library of creative materials.',
    challenge: 'Missing source records and unclear permissions can make it difficult to understand how an asset may be used or transferred.',
    deliverables: ['Asset and source-material inventory', 'Permission and attribution record template', 'A concise handoff brief for qualified legal advice when needed'],
    difference: 'We focus on orderly documentation and clear questions. This service is operational support, not legal advice or representation.',
    faqs: [
      ['Can you decide whether an idea is protected by copyright?', 'No. Protection depends on facts and applicable law. We can help organize the work and questions for a qualified intellectual-property lawyer.'],
      ['Can you register copyright on our behalf?', 'No registration service is promised here. Filing requirements vary by jurisdiction and should be confirmed with the relevant authority or legal professional.']
    ]
  },
  {
    slug: 'trademark', title: 'Trademark', world: 'legal',
    intro: 'A name or mark is a business decision with legal context. We help teams prepare a clear inventory and research brief before specialist review.',
    meta: 'Trademark readiness support for name and mark inventories, usage context, and organized briefing for independent legal review.',
    audience: 'Teams considering a new name, mark, or product identity and seeking to organize the next research and review steps.',
    challenge: 'A name can appear available in one search and still create conflicts across categories, markets, or related marks.',
    deliverables: ['Mark and use-case inventory', 'Jurisdiction and category questions to investigate', 'A prepared brief for an appropriately qualified trademark professional'],
    difference: 'We make the scope and uncertainty explicit. No clearance opinion, filing result, or legal representation is implied.',
    faqs: [
      ['Can you guarantee that a name is available?', 'No. Availability requires jurisdiction-specific research and legal judgment. Any name exploration should be reviewed by a qualified trademark professional.'],
      ['Do you file trademark applications?', 'This studio does not claim to provide filing or legal representation. We can help prepare the material a client may take to independent counsel.']
    ]
  },
  {
    slug: 'brand-protection', title: 'Brand Protection', world: 'legal',
    intro: 'Protecting a brand begins with knowing what exists, who controls it, and where it appears. We help make that picture more organized.',
    meta: 'Brand protection operations support for asset inventories, access records, usage guidance, and a clear escalation map.',
    audience: 'Organizations with multiple brand assets, collaborators, or channels that need more clarity around use and stewardship.',
    challenge: 'Untracked files, inconsistent permissions, and unclear points of contact can make brand misuse harder to identify and address.',
    deliverables: ['Asset and channel inventory', 'Access, usage, and version-control notes', 'An escalation workflow for review with the appropriate advisor'],
    difference: 'We focus on practical stewardship and documentation without implying enforcement powers, legal conclusions, or guaranteed monitoring.',
    faqs: [
      ['Do you monitor the web for infringement?', 'Continuous monitoring is not included by default. Available tools, jurisdictions, and review capacity would need to be defined before any monitoring scope.'],
      ['Can you take legal action against misuse?', 'No. Legal action and enforcement require appropriate rights and qualified legal representation. We can help organize records for that discussion.']
    ]
  },
  {
    slug: 'licensing-support', title: 'Licensing Support', world: 'legal',
    intro: 'Licensing is about making permissions understandable in practice. We help organize asset lists, intended uses, and open questions before terms are finalized.',
    meta: 'Licensing support for creative asset inventories, proposed usage scopes, and clear documentation for specialist review.',
    audience: 'Teams working with commissioned, stock, or collaborative creative assets that need a more reliable record of intended use.',
    challenge: 'Vague permission notes can leave teams unsure about territory, duration, format, exclusivity, or whether a new use is covered.',
    deliverables: ['Asset and intended-use schedule', 'A checklist of scope and permission questions', 'Organized documentation for review by the rights holder or legal counsel'],
    difference: 'We translate the operational need into clear questions while leaving legal interpretation and contract advice to qualified professionals.',
    faqs: [
      ['Can you draft or negotiate a license agreement?', 'This service does not include legal drafting or negotiation. Those tasks should be handled by qualified counsel; we can prepare the creative and operational context.'],
      ['What information should an asset schedule include?', 'Useful fields often include asset source, creator or rights holder, planned formats, territory, duration, channels, and any known restrictions. The exact requirements vary.']
    ]
  }
];

export function getWorld(id) {
  return worlds.find((world) => world.id === id);
}

export function getRelatedServices(service, count = 3) {
  const peers = services.filter((candidate) => candidate.world === service.world && candidate.slug !== service.slug);
  const currentIndex = services.filter((candidate) => candidate.world === service.world).findIndex((candidate) => candidate.slug === service.slug);
  const ordered = [
    ...peers.slice(Math.max(0, currentIndex), Math.max(0, currentIndex) + count),
    ...peers.slice(0, Math.max(0, count - peers.slice(Math.max(0, currentIndex), Math.max(0, currentIndex) + count).length))
  ];
  return ordered.slice(0, count);
}
