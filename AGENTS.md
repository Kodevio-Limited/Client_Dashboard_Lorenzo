# AGENTS.md

## Stack
- **Framework:** Next.js 16 (App Router) + TypeScript
- **Styling:** Tailwind CSS v4
- **State:** Zustand (`store/uiStore.ts`)
- **Forms:** react-hook-form + zod + @hookform/resolvers (available for Phase 2)
- **Icons:** Placeholder SVGs in `public/assets/icons/`
- **Images:** Placeholder SVGs in `public/assets/`

## Project Structure
```
client_dashboard/
├── app/
│   ├── globals.css          # Dark theme tokens
│   ├── layout.tsx           # Root layout (Inter font, dark bg)
│   ├── page.tsx             # Redirect / → /login
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   ├── reset-login/page.tsx
│   │   └── set-new-pass/page.tsx
│   └── dashboard/
│       ├── layout.tsx       # Sidebar + Toast
│       ├── page.tsx         # Redirect → /dashboard/property
│       ├── property/page.tsx
│       ├── property/history/page.tsx
│       ├── property/media/page.tsx
│       ├── photos/page.tsx
│       ├── account/profile/page.tsx
│       ├── account/update-pass/page.tsx
│       └── reports/page.tsx
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
│   │   └── Toast.tsx
│   └── shared/
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Select.tsx
│       ├── Modal.tsx
│       └── DataTable.tsx
├── lib/
│   ├── constants.ts         # NAV_ITEMS, PROPERTY_TABS, PROFILE_TABS
│   ├── design-tokens.ts     # Color/spacing/typography tokens
│   └── utils.ts             # formatDate, generateId, classNames
├── store/
│   └── uiStore.ts           # Zustand: toasts + sidebar
├── types/
│   ├── property.ts
│   ├── photo.ts
│   └── report.ts
└── public/
    ├── assets/
    │   ├── icons/           # property-icon, photos-icon, reports-icon, profile-icon
    │   ├── images/          # (empty, ready for real images)
    │   ├── sidebar-logo.png
    │   ├── avatar.png
    │   ├── property-hero.jpg
    │   ├── auth-side-image.jpg
    │   ├── photo-1..8.jpg
    │   └── media-1..6.jpg
    └── (placeholder SVGs for all image paths)
```

## Build
```
npm run build    # Compiles with Turbopack
npm run dev      # Dev server
```

## Phase 1 Complete (UI-only)
- All pages built with mock data
- Dark theme matching admin dashboard
- No API integration yet (no TanStack Query, no Axios client)
- Placeholder images prevent 404s; ready to replace with real assets
