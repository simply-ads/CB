import { config, fields, collection, singleton } from "@keystatic/core";

const isProd = process.env.NODE_ENV === "production";

const MOOD_OPTIONS = [
  { label: "Villa (azure)", value: "ph-villa" },
  { label: "Petra (sand)", value: "ph-petra" },
  { label: "New York (slate)", value: "ph-nyc" },
  { label: "Caribbean (teal)", value: "ph-carib" },
  { label: "Alps (green)", value: "ph-alps" },
  { label: "Lemon (yellow)", value: "ph-lemon" },
  { label: "Safari (gold)", value: "ph-safari" },
  { label: "Azure (blue)", value: "ph-azure" },
] as const;

const MARQUEE_ICON_OPTIONS = [
  { label: "Lemon", value: "lemon" },
  { label: "Camel", value: "camel" },
  { label: "New York skyline", value: "skyline" },
  { label: "Sailboat", value: "sailboat" },
  { label: "Pagoda", value: "pagoda" },
  { label: "Mountain", value: "mountain" },
  { label: "Palm tree", value: "palm" },
  { label: "Cruise ship", value: "ship" },
  { label: "Hot-air balloon", value: "balloon" },
  { label: "Vespa", value: "vespa" },
  { label: "Classical column", value: "column" },
  { label: "Prop plane", value: "plane" },
  { label: "Teapot", value: "teapot" },
  { label: "Flamingo", value: "flamingo" },
] as const;

export default config({
  storage: isProd
    ? {
        kind: "github",
        repo: "AdamVT85/CB",
        pathPrefix: "nextjs-app",
      }
    : {
        kind: "local",
      },
  singletons: {
    homepage: singleton({
      label: "Homepage",
      path: "content/homepage",
      schema: {
        heroEyebrow: fields.text({
          label: "Hero Eyebrow",
          defaultValue: "Freelance travel content marketing",
        }),
        heroHeadline: fields.text({
          label: "Hero Headline",
          multiline: true,
          defaultValue:
            "Travel content that feels like the good old days of going somewhere — and still gets them to book.",
        }),
        heroAccent: fields.text({
          label: "Hero Accent Phrase (rendered in azure)",
          description: "A phrase inside the headline to colour azure.",
          defaultValue: "good old days",
        }),
        standfirstLeftLabel: fields.text({ label: "Standfirst Left — Label", defaultValue: "By the writer" }),
        standfirstLeft: fields.text({
          label: "Standfirst Left — Body",
          multiline: true,
          defaultValue:
            "I'm a freelance content marketing consultant for travel and tourism brands of every shape — a day-tour operator in Jordan, a New York walking-tour company, a European villa collection, a Caribbean sailing line. I write, plan and produce content for them: website copy, customer magazines, market reports, podcasts, lead magnets.",
        }),
        standfirstRightLabel: fields.text({ label: "Standfirst Right — Label", defaultValue: "The brief, always" }),
        standfirstRight: fields.text({
          label: "Standfirst Right — Body",
          multiline: true,
          defaultValue:
            "Whatever the format or the destination, the brief stays the same. Make the place feel enchanting, glamorous and worth the journey — then make it easy to book. Words that get read, and words that get acted on.",
        }),
        heroPhotos: fields.array(
          fields.object({
            tag: fields.text({ label: "Tag" }),
            name: fields.text({ label: "Caption" }),
            mood: fields.select({ label: "Mood", options: MOOD_OPTIONS, defaultValue: "ph-villa" }),
            image: fields.image({
              label: "Image",
              directory: "public/images/home",
              publicPath: "/images/home",
            }),
          }),
          { label: "Hero Photos", itemLabel: (p) => p.fields.name.value || "Photo" }
        ),
        clientsLabel: fields.text({ label: "Clients Label", defaultValue: "Selected clients, 2014 – 2026" }),
        marqueeItems: fields.array(
          fields.object({
            icon: fields.select({
              label: "Illustration",
              options: MARQUEE_ICON_OPTIONS,
              defaultValue: "plane",
            }),
            label: fields.text({ label: "Label" }),
            accent: fields.text({
              label: "Accent phrase",
              description: "Optional phrase inside the label to render in azure.",
            }),
          }),
          {
            label: "Scrolling Marquee Items",
            itemLabel: (p) => p.fields.label.value || "Marquee item",
          }
        ),
        clients: fields.array(
          fields.object({
            name: fields.text({ label: "Name" }),
            emphasis: fields.checkbox({ label: "Azure emphasis", defaultValue: false }),
          }),
          { label: "Clients", itemLabel: (p) => p.fields.name.value || "Client" }
        ),
        workHeadline: fields.text({
          label: "Work Section Headline",
          multiline: true,
          defaultValue: "Selected work — measured in bookings, enquiries and sign-ups.",
        }),
        workAccent: fields.text({ label: "Work Headline Accent", defaultValue: "measured" }),
        workCount: fields.text({ label: "Work Count Label", defaultValue: "06 of 40+" }),
        testimonialQuote: fields.text({
          label: "Testimonial Quote",
          multiline: true,
          defaultValue:
            "Claire is a one-woman content swiss army knife. She overhauled our advice articles and location guides, producing journalistic-quality pieces that drove a tenfold increase in traffic.",
        }),
        testimonialHighlight: fields.text({
          label: "Testimonial Highlight (limoncello)",
          defaultValue: "tenfold increase in traffic.",
        }),
        testimonialAuthor: fields.text({ label: "Testimonial Author", defaultValue: "Jennifer Down" }),
        testimonialRole: fields.text({ label: "Testimonial Role", defaultValue: "Performance Marketing Manager · Kyero" }),
        servicesTitle: fields.text({ label: "Services Title", defaultValue: "The contents." }),
        servicesMeta: fields.text({
          label: "Services Meta",
          defaultValue: "Five things I'm good at — and a few I won't pretend to be",
        }),
      },
    }),
    featuredCase: singleton({
      label: "Featured Case (Homepage)",
      path: "content/featured-case",
      schema: {
        eyebrow: fields.text({ label: "Eyebrow", defaultValue: "Feature · Plate 01" }),
        title: fields.text({
          label: "Title",
          multiline: true,
          defaultValue: "The villa magazine that brought back 22% more bookings.",
        }),
        titleAccent: fields.text({ label: "Title Accent (azure)", defaultValue: "22% more bookings" }),
        coverTag: fields.text({ label: "Cover Tag", defaultValue: "Vintage Travel · Magazine · 150pp" }),
        coverName: fields.text({ label: "Cover Caption", defaultValue: "Contents spread" }),
        coverMood: fields.select({ label: "Cover Mood", options: MOOD_OPTIONS, defaultValue: "ph-azure" }),
        coverImage: fields.image({
          label: "Cover Image",
          directory: "public/images/featured",
          publicPath: "/images/featured",
        }),
        bodyLeft: fields.text({
          label: "Body — Left column (paragraphs separated by blank lines)",
          multiline: true,
          defaultValue:
            "Vintage Travel asked for a customer magazine that would inspire existing customers to book again — without ever feeling like a sales brochure. Their audience is discerning, well-travelled, and highly allergic to marketing fluff. Every word had to feel measured, credible and confident.\n\nThe magazine ran to 150 pages and covered France, Spain, Italy and Greece — blending practical travel guidance with aspirational storytelling, from destination overviews and cultural highlights to food, family activities, romance, and detailed write-ups of individual villas.\n\nI worked closely with destination specialists and internal experts to make sure every recommendation was accurate, current and genuinely useful. Nothing was included unless it could be verified and confidently endorsed by the business.",
        }),
        pull: fields.text({
          label: "Pull Quote",
          multiline: true,
          defaultValue:
            "The aim was to spark ideas, build trust and gently guide readers towards booking. The magazine did all three — and Vintage saw bookings rise 22% in the months that followed.",
        }),
        bodyRight: fields.text({
          label: "Body — Right column (paragraphs separated by blank lines)",
          multiline: true,
          defaultValue:
            "The tone was deliberately inspirational but grounded. Mailed to 8,000 existing customers, the magazine landed as a printed, beautifully-photographed object that earned its place on the coffee table.\n\nBookings rose 22% in the months that followed, and Vintage subsequently commissioned the website copy rewrite that extended into a multi-year engagement.",
        }),
        numbers: fields.array(
          fields.object({
            number: fields.text({ label: "Number" }),
            label: fields.text({ label: "Label" }),
          }),
          { label: "Numbers", itemLabel: (p) => p.fields.number.value || "Number" }
        ),
      },
    }),
    about: singleton({
      label: "About",
      path: "content/about",
      schema: {
        eyebrow: fields.text({ label: "Eyebrow", defaultValue: "About" }),
        headline: fields.text({
          label: "Headline",
          multiline: true,
          defaultValue: "I get travel, and I can help you sell it.",
        }),
        headlineAccent: fields.text({ label: "Headline Accent (azure)", defaultValue: "sell it" }),
        portraitImage: fields.image({
          label: "Portrait Image",
          directory: "public/images",
          publicPath: "/images",
        }),
        portraitTag: fields.text({ label: "Portrait Tag", defaultValue: "Portrait · The writer" }),
        portraitName: fields.text({ label: "Portrait Caption", defaultValue: "On assignment" }),
        portraitCredit: fields.text({
          label: "Portrait Credit",
          defaultValue: "Somewhere between a speedboat in St Lucia and the races in Hong Kong.",
        }),
        body: fields.text({
          label: "Body (paragraphs separated by blank lines)",
          multiline: true,
          defaultValue:
            "I've planned family holidays with toddlers in tow, raucous girls' weekends, and romantic getaways that actually delivered. I've driven the Pacific Coast Highway, taken a speedboat around St Lucia, been chased by camels in Egypt, and won at the races in Hong Kong.\n\nWhich is to say: I know how people travel, what they're looking for, and what makes them book. I understand what travellers need at each stage — inspiration, reassurance, logistics, trust — and how to balance storytelling with conversion.\n\nBefore going fully freelance I spent five years running content at Kyero, Europe's largest overseas property portal. No buzzwords. No \"wanderlust vibes\". Just smart travel content that does its job.",
        }),
        principles: fields.array(
          fields.object({
            title: fields.text({ label: "Title" }),
            description: fields.text({ label: "Description", multiline: true }),
          }),
          { label: "Principles", itemLabel: (p) => p.fields.title.value || "Principle" }
        ),
      },
    }),
    contact: singleton({
      label: "Contact",
      path: "content/contact",
      schema: {
        eyebrow: fields.text({ label: "Eyebrow", defaultValue: "Start a project" }),
        headline: fields.text({
          label: "Headline",
          multiline: true,
          defaultValue: "A travel content specialist who makes your life significantly easier.",
        }),
        headlineAccent: fields.text({ label: "Headline Accent (azure)", defaultValue: "makes your life significantly easier" }),
        body: fields.text({
          label: "Body",
          multiline: true,
          defaultValue:
            "Tell me roughly what you need. Rough scope is fine — I reply within two working days with whether I can help, a rate, and the next sensible step.",
        }),
        email: fields.text({ label: "Email", defaultValue: "claire@clairewebb.co.uk" }),
        basedIn: fields.text({ label: "Based In", defaultValue: "UK · working worldwide" }),
        response: fields.text({ label: "Response", defaultValue: "Within two working days" }),
        availability: fields.text({ label: "Currently", defaultValue: "Booking Q3 2026" }),
        linkedinUrl: fields.text({ label: "LinkedIn URL" }),
      },
    }),
    siteSettings: singleton({
      label: "Site Settings",
      path: "content/site-settings",
      schema: {
        siteName: fields.text({ label: "Site Name", defaultValue: "Claire Webb" }),
        siteUrl: fields.text({ label: "Site URL", defaultValue: "https://clairewebb.co.uk" }),
        email: fields.text({ label: "Email", defaultValue: "claire@clairewebb.co.uk" }),
        linkedinUrl: fields.text({ label: "LinkedIn URL" }),
        instagramUrl: fields.text({ label: "Instagram URL" }),
        copyrightText: fields.text({ label: "Copyright Text", defaultValue: "© 2026 Claire Webb · Sole trader · UK" }),
      },
    }),
  },
  collections: {
    projects: collection({
      label: "Projects",
      slugField: "title",
      path: "content/projects/*",
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        titleAccent: fields.text({ label: "Title Accent (azure phrase)" }),
        number: fields.text({ label: "Number", description: 'e.g. "01"' }),
        client: fields.text({ label: "Client" }),
        category: fields.text({ label: "Category", description: 'e.g. "Long-form print"' }),
        year: fields.text({ label: "Year", description: 'e.g. "2024"' }),
        plateTag: fields.text({ label: "Plate Tag", description: 'e.g. "Magazine · Print · 150pp"' }),
        plateName: fields.text({ label: "Plate Caption", description: 'e.g. "Vintage Travel cover spread"' }),
        mood: fields.select({ label: "Mood (placeholder gradient)", options: MOOD_OPTIONS, defaultValue: "ph-villa" }),
        featuredImage: fields.image({
          label: "Featured Image",
          directory: "public/images/projects",
          publicPath: "/images/projects",
        }),
        featured: fields.checkbox({ label: "Featured on Homepage", defaultValue: false }),
        featuredSize: fields.select({
          label: "Card Size",
          options: [
            { label: "Large", value: "work--lg" },
            { label: "Medium", value: "work--md" },
            { label: "Small", value: "work--sm" },
            { label: "Wide", value: "work--wide" },
          ],
          defaultValue: "work--md",
        }),
        summary: fields.text({ label: "Summary / Dek", multiline: true }),
        summaryAccent: fields.text({ label: "Summary Accent (azure phrase)" }),
        scope: fields.text({ label: "Scope" }),
        bodyLeft: fields.text({
          label: "Case Body — Left column (paragraphs separated by blank lines)",
          multiline: true,
        }),
        bodyRight: fields.text({
          label: "Case Body — Right column (paragraphs separated by blank lines)",
          multiline: true,
        }),
        documents: fields.array(
          fields.object({
            label: fields.text({ label: "Label" }),
            file: fields.file({ label: "PDF File", directory: "public/documents", publicPath: "/documents" }),
            pagesPath: fields.text({ label: "Pre-rendered Pages Path", description: "Base path for page images, e.g. /images/projects/slug/pages" }),
            pageCount: fields.number({ label: "Page Count", description: "Total number of pre-rendered page images" }),
          }),
          { label: "Documents", itemLabel: (p) => p.fields.label.value || "Document" }
        ),
        stats: fields.array(
          fields.object({
            number: fields.text({ label: "Number" }),
            label: fields.text({ label: "Label" }),
          }),
          { label: "Stats", itemLabel: (p) => `${p.fields.number.value} ${p.fields.label.value}` }
        ),
        pullQuote: fields.text({ label: "Pull Quote", multiline: true }),
        testimonialQuote: fields.text({ label: "Testimonial Quote", multiline: true }),
        testimonialAuthor: fields.text({ label: "Testimonial Author" }),
        testimonialRole: fields.text({ label: "Testimonial Role" }),
        nextProject: fields.relationship({ label: "Next Project", collection: "projects" }),
        sortOrder: fields.number({ label: "Sort Order", defaultValue: 0 }),
      },
    }),
    services: collection({
      label: "Services",
      slugField: "title",
      path: "content/services/*",
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        titleAccent: fields.text({ label: "Title Accent (azure phrase)" }),
        eyebrow: fields.text({ label: "Eyebrow", defaultValue: "Service" }),
        summary: fields.text({
          label: "Summary / Dek",
          description: "Short line shown in the services list.",
          multiline: true,
        }),
        mood: fields.select({ label: "Header Mood", options: MOOD_OPTIONS, defaultValue: "ph-azure" }),
        intro: fields.text({
          label: "Intro (standfirst, paragraphs separated by blank lines)",
          multiline: true,
        }),
        body: fields.text({
          label: "Body (paragraphs separated by blank lines)",
          multiline: true,
        }),
        included: fields.array(
          fields.object({
            title: fields.text({ label: "Title" }),
            detail: fields.text({ label: "Detail (3–4 lines)", multiline: true }),
          }),
          {
            label: "What's included",
            itemLabel: (p) => p.fields.title.value || "Item",
          }
        ),
        relatedProjects: fields.array(
          fields.relationship({ label: "Project", collection: "projects" }),
          { label: "Related Work", itemLabel: (p) => p.value || "Project" }
        ),
        ctaHeading: fields.text({
          label: "CTA Heading",
          defaultValue: "Need this? Let's talk.",
        }),
        sortOrder: fields.number({ label: "Sort Order", defaultValue: 0 }),
      },
    }),
  },
});
