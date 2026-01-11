# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a multilingual portfolio website built with Next.js 15, TypeScript, and PostgreSQL. The site supports three languages (French, English, and Spanish) with dynamic content translation managed through Prisma.

## Development Commands

```bash
# Start development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Prisma commands
npx prisma generate          # Generate Prisma Client after schema changes
npx prisma migrate dev       # Create and apply new migration
npx prisma migrate deploy    # Apply migrations in production
npx prisma studio            # Open Prisma Studio to view/edit database
npx prisma db push           # Push schema changes without creating migration (dev only)
```

## Architecture

### Internationalization (i18n)

The project uses `next-intl` for internationalization with the following setup:

- **Supported locales**: `en` (English), `fr` (French - default), `es` (Spanish)
- **Translation files**: Located in `/messages` directory as `en.json`, `fr.json`, `es.json`
- **Routing**: Locale-based routing via `[locale]` dynamic segment in app directory
- **Middleware**: Automatically handles locale detection and routing at [src/middleware.ts](src/middleware.ts)
- **Configuration**:
  - Routing config: [src/i18n/routing.ts](src/i18n/routing.ts)
  - Request config: [src/i18n/request.ts](src/i18n/request.ts)
- **Navigation**: Use i18n-aware navigation helpers from `src/i18n/routing.ts` (Link, redirect, usePathname, useRouter)

### Database Structure

The database uses PostgreSQL with Prisma ORM. Multi-language content is handled through separate translation tables:

**Core Models**:
- `Project` - Portfolio projects with images, technologies, and roles
- `Passion` - User passions/interests
- `Skills` - Timeline of skills and experiences
- `Technology` - Tech stack items (many-to-many with Projects)
- `Role` - Project roles (many-to-many with Projects)
- `Image` - Project images (one-to-many with Projects)

**Translation Tables**:
- `ProjectTranslation` - Translations for project descriptions and process details
- `PassionTranslation` - Translations for passion names
- `SkillsTranslation` - Translations for skill descriptions and locations

Each translation table has:
- `language` field (en/fr/es)
- Unique constraint on `[entityId, language]` to ensure one translation per language
- Foreign key relationship to parent model

**Prisma Client**: Singleton pattern implemented in [src/prisma.ts](src/prisma.ts) to prevent multiple instances in development.

### Directory Structure

```
src/
├── app/
│   ├── [locale]/           # Locale-based routing
│   │   ├── page.tsx       # Home page
│   │   ├── layout.tsx     # Root layout with i18n
│   │   ├── selectedWork/[id]/  # Dynamic project detail pages
│   │   └── design-system/ # Design system showcase
│   └── api/
│       ├── send/          # Contact form email endpoint (Resend)
│       └── download/      # File download endpoint
├── ui/
│   ├── components/        # React components
│   │   ├── navigation/   # NavBar, SideBar, etc.
│   │   └── projects/     # Project-related components
│   └── design-system/    # Reusable design system components
├── i18n/
│   ├── routing.ts        # i18n routing configuration
│   └── request.ts        # i18n request configuration
├── middleware.ts         # Next.js middleware for i18n
└── prisma.ts            # Prisma client singleton

messages/                 # Translation JSON files
├── en.json
├── fr.json
└── es.json

prisma/
└── schema.prisma        # Database schema
```

### Component Patterns

**Client/Server Split**: Components that use browser-only features or React hooks are suffixed with `Client` (e.g., `MyWorkClient.tsx`, `PassionSliderClient.tsx`) while their server counterparts handle data fetching and are rendered on the server.

**Animation Libraries**:
- **GSAP** (`@gsap/react`, `gsap`) - Advanced animations and scroll-triggered effects
- **Lenis** (`@studio-freight/lenis`) - Smooth scrolling
- **AOS** (`aos`) - Animate on scroll effects

### API Routes

**POST /api/send** - Contact form submission
- Uses Resend API for email sending
- Requires: `name`, `email`, `message`
- Optional: `business`, `phone`
- Environment variable: `RESEND_API_KEY`

**GET /api/download** - Download files from public directory
- Query param: `?file=filename.ext`
- Supports: PDF, PNG, JPG, SVG, ICO
- Returns file with appropriate Content-Type and Content-Disposition headers

## Key Considerations

### When Adding New Translatable Content

1. Add the base model to [prisma/schema.prisma](prisma/schema.prisma)
2. Create corresponding translation table with `language`, foreign key, and unique constraint
3. Run `npx prisma migrate dev --name describe_changes`
4. Update translation JSON files in [messages/](messages/) directory for UI strings
5. Query translations by joining with the translation table and filtering by locale

### When Working with Images

- Next.js Image component is configured to allow all remote image sources ([next.config.ts:9-15](next.config.ts#L9-L15))
- Project images are stored as URLs in the `Image` model, not as files

### Environment Variables

Required in `.env`:
- `DATABASE_URL` - PostgreSQL connection string
- `RESEND_API_KEY` - Resend API key for contact form emails

### Next.js Configuration

- **next-intl plugin** is applied in [next.config.ts](next.config.ts)
- **Turbopack** is enabled in development for faster builds
- Remote image patterns allow loading from any HTTPS host
