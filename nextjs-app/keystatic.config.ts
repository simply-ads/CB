import { config, fields, collection, singleton } from "@keystatic/core";

const isProd = process.env.NODE_ENV === "production";

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
        heroHeadline: fields.text({
          label: "Hero Headline",
          defaultValue: "Words that make people pack a bag.",
        }),
        heroSubtext: fields.text({
          label: "Hero Subtext",
        }),
        introBody: fields.text({
          label: "Intro Body",
          multiline: true,
        }),
        introCTA: fields.text({
          label: "Intro CTA Text",
          defaultValue: "See the work \u2192",
        }),
        testimonialQuote: fields.text({
          label: "Testimonial Quote",
          multiline: true,
        }),
        testimonialAuthor: fields.text({
          label: "Testimonial Author",
        }),
        testimonialRole: fields.text({
          label: "Testimonial Role",
        }),
        footerCTA: fields.text({
          label: "Footer CTA",
        }),
        footerEmail: fields.text({
          label: "Footer Email",
        }),
        marqueeItems: fields.array(
          fields.text({ label: "Marquee Item" }),
          {
            label: "Marquee Items",
            itemLabel: (props) => props.value || "Item",
          }
        ),
      },
    }),
    about: singleton({
      label: "About",
      path: "content/about",
      schema: {
        pageTitle: fields.text({
          label: "Page Title",
          defaultValue: "The Writer",
        }),
        portraitImage: fields.image({
          label: "Portrait Image",
          directory: "public/images",
          publicPath: "/images",
        }),
        bio: fields.mdx({
          label: "Bio",
        }),
        philosophyHeading: fields.text({
          label: "Philosophy Heading",
          defaultValue: "How I Write",
        }),
        principles: fields.array(
          fields.object({
            title: fields.text({ label: "Title" }),
            description: fields.text({ label: "Description" }),
          }),
          {
            label: "Principles",
            itemLabel: (props) => props.fields.title.value || "Principle",
          }
        ),
        clients: fields.array(
          fields.object({
            name: fields.text({ label: "Client Name" }),
          }),
          {
            label: "Clients",
            itemLabel: (props) => props.fields.name.value || "Client",
          }
        ),
        ctaText: fields.text({ label: "CTA Text" }),
        ctaEmail: fields.text({ label: "CTA Email" }),
      },
    }),
    contact: singleton({
      label: "Contact",
      path: "content/contact",
      schema: {
        headline: fields.text({ label: "Headline" }),
        body: fields.text({ label: "Body", multiline: true }),
        email: fields.text({ label: "Email" }),
        linkedinUrl: fields.text({ label: "LinkedIn URL" }),
      },
    }),
    brandStrategy: singleton({
      label: "Brand Strategy",
      path: "content/brand-strategy",
      schema: {
        subtitleLabel: fields.text({
          label: "Subtitle Label",
          defaultValue: "Core Foundations",
        }),
        description: fields.text({
          label: "Description",
          multiline: true,
        }),
        projects: fields.array(
          fields.object({
            title: fields.text({ label: "Title" }),
            category: fields.text({ label: "Category" }),
            description: fields.text({ label: "Description" }),
            image: fields.image({
              label: "Image",
              directory: "public/images/projects",
              publicPath: "/images/projects",
            }),
            imageUrl: fields.text({
              label: "Image URL (fallback)",
              description: "External image URL if no uploaded image",
            }),
            slug: fields.text({ label: "Slug" }),
          }),
          {
            label: "Projects",
            itemLabel: (props) => props.fields.title.value || "Project",
          }
        ),
        quote: fields.text({ label: "Quote", multiline: true }),
        ctaHeading: fields.text({ label: "CTA Heading" }),
        ctaSubheading: fields.text({ label: "CTA Subheading (italic)" }),
        ctaLinkText: fields.text({ label: "CTA Link Text" }),
      },
    }),
    websiteCopy: singleton({
      label: "Website Copy",
      path: "content/website-copy",
      schema: {
        subtitleLabel: fields.text({
          label: "Subtitle Label",
          defaultValue: "Digital Narratives",
        }),
        description: fields.text({
          label: "Description",
          multiline: true,
        }),
        projects: fields.array(
          fields.object({
            title: fields.text({ label: "Title" }),
            category: fields.text({ label: "Category" }),
            description: fields.text({ label: "Description" }),
            image: fields.image({
              label: "Image",
              directory: "public/images/projects",
              publicPath: "/images/projects",
            }),
            imageUrl: fields.text({
              label: "Image URL (fallback)",
              description: "External image URL if no uploaded image",
            }),
            slug: fields.text({ label: "Slug" }),
          }),
          {
            label: "Projects",
            itemLabel: (props) => props.fields.title.value || "Project",
          }
        ),
        quote: fields.text({ label: "Quote", multiline: true }),
        ctaHeading: fields.text({ label: "CTA Heading" }),
        ctaSubheading: fields.text({ label: "CTA Subheading (italic)" }),
        ctaLinkText: fields.text({ label: "CTA Link Text" }),
      },
    }),
    editorialCampaigns: singleton({
      label: "Editorial Campaigns",
      path: "content/editorial-campaigns",
      schema: {
        subtitleLabel: fields.text({
          label: "Subtitle Label",
          defaultValue: "Storytelling in Motion",
        }),
        description: fields.text({
          label: "Description",
          multiline: true,
        }),
        projects: fields.array(
          fields.object({
            title: fields.text({ label: "Title" }),
            category: fields.text({ label: "Category" }),
            description: fields.text({ label: "Description" }),
            image: fields.image({
              label: "Image",
              directory: "public/images/projects",
              publicPath: "/images/projects",
            }),
            imageUrl: fields.text({
              label: "Image URL (fallback)",
              description: "External image URL if no uploaded image",
            }),
            slug: fields.text({ label: "Slug" }),
          }),
          {
            label: "Projects",
            itemLabel: (props) => props.fields.title.value || "Project",
          }
        ),
        quote: fields.text({ label: "Quote", multiline: true }),
        quoteStyle: fields.select({
          label: "Quote Style",
          options: [
            { label: "Centered text", value: "centered" },
            { label: "Dark box", value: "dark-box" },
          ],
          defaultValue: "centered",
        }),
        ctaHeading: fields.text({ label: "CTA Heading" }),
        ctaSubheading: fields.text({ label: "CTA Subheading (italic)" }),
        ctaLinkText: fields.text({ label: "CTA Link Text" }),
      },
    }),
    siteSettings: singleton({
      label: "Site Settings",
      path: "content/site-settings",
      schema: {
        siteName: fields.text({
          label: "Site Name",
          defaultValue: "Adam Blackwell",
        }),
        siteUrl: fields.text({ label: "Site URL" }),
        email: fields.text({ label: "Email" }),
        linkedinUrl: fields.text({ label: "LinkedIn URL" }),
        instagramUrl: fields.text({ label: "Instagram URL" }),
        copyrightText: fields.text({ label: "Copyright Text" }),
      },
    }),
  },
  collections: {
    projects: collection({
      label: "Projects",
      slugField: "title",
      path: "content/projects/*",
      schema: {
        title: fields.slug({
          name: { label: "Title" },
        }),
        number: fields.text({
          label: "Number",
          description: 'e.g. "01"',
        }),
        client: fields.text({
          label: "Client",
        }),
        category: fields.text({
          label: "Category",
        }),
        categories: fields.array(
          fields.text({ label: "Category Tag" }),
          {
            label: "Categories (for filtering)",
            itemLabel: (props) => props.value || "Category",
          }
        ),
        featuredImage: fields.image({
          label: "Featured Image",
          directory: "public/images/projects",
          publicPath: "/images/projects",
        }),
        featured: fields.checkbox({
          label: "Featured on Homepage",
          defaultValue: false,
        }),
        featuredSize: fields.select({
          label: "Featured Size",
          options: [
            { label: "Large", value: "large" },
            { label: "Small", value: "small" },
          ],
          defaultValue: "large",
        }),
        summary: fields.text({
          label: "Summary",
          multiline: true,
        }),
        scope: fields.text({
          label: "Scope",
        }),
        brief: fields.mdx({
          label: "The Brief",
        }),
        approach: fields.mdx({
          label: "The Approach",
        }),
        sampleWork: fields.array(
          fields.object({
            locationLabel: fields.text({
              label: "Location Label",
              description: 'e.g. "KEFALONIA, GREECE"',
            }),
            propertyName: fields.text({
              label: "Property Name",
              description: 'e.g. "Villa Elara"',
            }),
            image: fields.image({
              label: "Image",
              directory: "public/images/projects",
              publicPath: "/images/projects",
            }),
            copy: fields.text({
              label: "Copy",
              multiline: true,
            }),
            imagePosition: fields.select({
              label: "Image Position",
              options: [
                { label: "Left", value: "left" },
                { label: "Right", value: "right" },
              ],
              defaultValue: "left",
            }),
          }),
          {
            label: "Sample Work",
            itemLabel: (props) =>
              props.fields.propertyName.value || "Sample",
          }
        ),
        documents: fields.array(
          fields.object({
            label: fields.text({
              label: "Label",
              description: 'e.g. "Brand Guidelines", "Writing Sample"',
            }),
            file: fields.file({
              label: "PDF File",
              directory: "public/documents",
              publicPath: "/documents",
            }),
          }),
          {
            label: "Documents",
            itemLabel: (props) => props.fields.label.value || "Document",
          }
        ),
        stats: fields.array(
          fields.object({
            number: fields.text({
              label: "Number",
              description: 'e.g. "45+"',
            }),
            label: fields.text({
              label: "Label",
              description: 'e.g. "Villa Descriptions"',
            }),
          }),
          {
            label: "Stats",
            itemLabel: (props) =>
              `${props.fields.number.value} ${props.fields.label.value}` ||
              "Stat",
          }
        ),
        testimonialQuote: fields.text({
          label: "Testimonial Quote",
          multiline: true,
        }),
        testimonialAuthor: fields.text({
          label: "Testimonial Author",
        }),
        testimonialRole: fields.text({
          label: "Testimonial Role",
        }),
        previousProject: fields.relationship({
          label: "Previous Project",
          collection: "projects",
        }),
        nextProject: fields.relationship({
          label: "Next Project",
          collection: "projects",
        }),
        sortOrder: fields.number({
          label: "Sort Order",
          defaultValue: 0,
        }),
      },
    }),
    testimonials: collection({
      label: "Testimonials",
      slugField: "author",
      path: "content/testimonials/*",
      schema: {
        quote: fields.text({ label: "Quote", multiline: true }),
        author: fields.slug({
          name: { label: "Author" },
        }),
        role: fields.text({ label: "Role" }),
        company: fields.text({ label: "Company" }),
      },
    }),
  },
});
