# Booking Whale Blog Content Generator

You are writing SEO-optimized Thai blog content for the Booking Whale website — an online queue/booking system for Thai businesses that integrates with LINE OA.

## Objective

Create 1 new high-quality Thai blog post per run (runs twice weekly: Monday and Thursday at 9am), including a hero image from Unsplash. Then git commit and push.

Working directory: `/Users/thisguyissohot/Desktop/labs/landing-page/`
Blog directory: `/Users/thisguyissohot/Desktop/labs/landing-page/src/content/blog/th/`
Image directory: `/Users/thisguyissohot/Desktop/labs/landing-page/public/images/blog/`

---

## Steps

### 1. Research existing posts

Read the directory `src/content/blog/th/` to see all existing blog filenames. Read the frontmatter (first 10 lines) of each post to understand what topics have already been covered. **Never duplicate an existing topic.**

Existing posts as of 2026-04-03 (check for new ones):
- beauty-salon-queue-management (salon case study)
- best-booking-systems-thailand (comparison/review)
- clinic-appointment-system (clinic guide)
- fitness-gym-class-booking (fitness/gym)
- increase-repeat-customers-booking (customer retention)
- line-oa-booking-guide (LINE OA setup)
- online-queue-booking-system-guide (general queue guide)
- pet-grooming-booking-system (pet business)
- qr-code-queue-booking (QR code booking)
- reduce-no-show-80-percent (no-show reduction)
- restaurant-queue-management (restaurant queue)
- rich-menu-line-oa-booking (Rich Menu design)
- service-business-digital-trends-2026 (2026 trends)
- sme-digital-transformation-booking (SME digital transformation)
- spa-thai-massage-booking-system (spa/massage)
- staff-scheduling-service-business (staff scheduling)
- tutoring-center-booking-system (education/tutoring)
- walk-in-vs-appointment-business (walk-in vs appointment)

### 2. Choose a new topic

Pick a topic that is:
- Relevant to Booking Whale's target audience (Thai service businesses)
- SEO-valuable with clear search intent
- Complementary to existing content (fills a gap, new keyword cluster, or new industry)

**Untapped topic ideas** (prioritize these):
- Industry verticals: tattoo studio, co-working space, dental clinic, car wash, laundry, photography studio, event venue, barber shop, nail salon, yoga studio, swimming school, driving school, music school, wedding planner
- How-to: setting up automated LINE reminders, pricing strategy for booking-based businesses, managing seasonal demand peaks, multi-branch booking management, how to collect customer reviews automatically
- Business strategy: upselling during booking, cancellation policy best practices, how to handle overbooking, booking data analytics for business growth, converting walk-in customers to recurring bookings
- Comparison: LINE OA vs website booking, manual vs automated booking, free vs paid booking systems
- Trends: AI-powered scheduling, voice booking, social commerce + booking integration

### 3. Download a hero image from Unsplash

For the chosen topic:
1. Search Unsplash for a relevant high-quality photo
2. Download at 1200x630 crop as WebP using the URL pattern:
   `https://images.unsplash.com/photo-{ID}?w=1200&h=630&fit=crop&auto=format&q=80`
3. Save to `public/images/blog/{slug}.webp`
4. Verify the file is valid (size > 10KB)

The hero image must:
- Be relevant to the blog topic
- Be a real photograph (not illustration)
- Be from Unsplash (free for commercial use, no attribution required)

### 4. Write the blog post

Follow this structure and quality standard:

**Frontmatter (YAML) — must match Astro content schema exactly:**

```yaml
---
title: "SEO-optimized Thai title with primary keyword (50-70 chars ideal)"
description: "Compelling meta description in Thai with keyword (120-160 chars)"
pubDate: "YYYY-MM-DD"
category: "Relevant category in Thai"
tags: ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"]
lang: "th"
readingTime: "X นาที"
heroImage: "/images/blog/{slug}.webp"
---
```

**Frontmatter field rules:**
- `title`: string, required — SEO title with primary keyword
- `description`: string, required — meta description for search results
- `pubDate`: date string, required — today's date in YYYY-MM-DD format
- `category`: string, required — use Thai category name
- `tags`: string array, required — 4-6 Thai/English keywords
- `lang`: must be `"th"`
- `readingTime`: string, optional — estimate as "X นาที"
- `heroImage`: string, required — path to the WebP image in /images/blog/

**Content requirements:**
- Write entirely in Thai (natural, professional tone — not overly formal or academic)
- Length: 1,500-2,500 words (10-14 minute read)
- Start with a compelling hook: a relatable pain point, surprising statistic, or a "have you experienced this?" scenario
- Use H2 (`##`) and H3 (`###`) headings with keywords naturally included
- Include at least 1 comparison table using Markdown table syntax (NEVER use code blocks for tables)
- Include practical, actionable advice (not just theory)
- Use bold (`**text**`) for key statistics and important terms
- Include 2-3 internal links to existing blog posts using relative paths like `[text](/blog/slug-name)`
- Include a section mentioning how Booking Whale solves the discussed problem (soft CTA, not salesy)
- End with a concise summary section (`## สรุป`)
- Use `---` horizontal rules between major sections
- Do NOT add comments in the Markdown

**Content structure template:**
```
# {Title matching frontmatter}

{Hook paragraph — pain point, stat, or scenario}

{Brief overview of what the article covers}

## {H2 with primary keyword}

{Content with actionable advice}

### {H3 subtopic}

{Detailed explanation}

---

## {H2 with secondary keyword}

{Content with data/examples}

| Column 1 | Column 2 | Column 3 |
|-----------|----------|----------|
| Data      | Data     | Data     |

---

## {H2 — How Booking Whale helps / solution section}

{Soft CTA — explain how an online booking system addresses the problems discussed}

---

## สรุป

{3-5 bullet point summary of key takeaways}
```

**SEO best practices:**
- Primary keyword in: title, description, first paragraph, and at least 2 H2 headings
- Related/LSI keywords distributed naturally throughout
- Internal links to 2-3 existing blog posts where relevant
- Description must be compelling enough to drive clicks from search results
- Avoid keyword stuffing — write for humans first

### 5. Save the file

Save with a descriptive kebab-case English filename:
`src/content/blog/th/{topic-slug}.md`

### 6. Verify

- Read back the saved file to confirm it was written correctly
- Verify frontmatter has all required fields: title, description, pubDate, category, tags, lang, readingTime, heroImage
- Verify the hero image file exists at `public/images/blog/{slug}.webp`
- Verify no duplicate topic with existing posts

### 7. Git commit and push

After the blog post is verified:

```bash
cd /Users/thisguyissohot/Desktop/labs/landing-page

# Create a new branch
git checkout -b blog/{slug}

# Stage both the blog post and hero image
git add src/content/blog/th/{slug}.md public/images/blog/{slug}.webp

# Commit (do NOT include Co-Authored-By signature)
git commit -m "blog: Add Thai blog post — {short English topic description}"

# Push
git push -u origin blog/{slug}

# Verify
git status
```

**Git rules:**
- Always create a new branch named `blog/{slug}` before committing
- Do NOT include Co-Authored-By line in commits
- Stage only the specific files (blog .md + hero image .webp)
- Do NOT run `git add .` or `git add -A`

---

## Quality Checklist

Before committing, verify:
- [ ] Topic is unique — not covered by any existing post
- [ ] Frontmatter matches Astro schema exactly (all 8 fields present)
- [ ] heroImage file exists and is valid WebP (> 10KB)
- [ ] Content is 1,500+ words
- [ ] At least 1 Markdown table (not code block)
- [ ] At least 2 internal links to existing blog posts
- [ ] Natural Thai language (not machine-translated)
- [ ] H2/H3 headings include keywords
- [ ] Ends with `## สรุป` section
- [ ] Git branch created, committed, and pushed
