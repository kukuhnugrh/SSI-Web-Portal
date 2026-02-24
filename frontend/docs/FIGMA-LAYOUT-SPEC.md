# FIGMA Layout & Component Specification — ERGO Seating

This document provides everything needed to recreate the ERGO seating e-commerce frontend in Figma. Use alongside `figma-tokens.json` (import via Tokens Studio plugin).

---

## 1. Design System Summary

### 1.1 Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `background` | `#FAF8F5` | Page background |
| `foreground` | `#1A1816` | Default text |
| `card` | `#FFFFFF` | Card/panel bg |
| `card-foreground` | `#1A1816` | Card text |
| `popover` | `#FFFFFF` | Dropdowns/popovers bg |
| `muted` | `#F2F0EC` | Subtle background |
| `muted-foreground` | `#737068` | Secondary text |
| `primary` | `#292624` | Primary surfaces (footer, testimonials) |
| `primary-foreground` | `#FAF8F5` | Text on primary |
| `secondary` | `#F2EFE8` | Secondary surfaces/hover states |
| `secondary-foreground` | `#2A2620` | Text on secondary |
| `accent` | `#8C5A35` | CTA, links, focus ring — brand accent (warm brown) |
| `accent-foreground` | `#FAF8F5` | Text on accent |
| `destructive` | `#D22B2B` | Error/danger |
| `success` | `#33885A` | Success state |
| `warning` | `#F5A623` | Warning state |
| `border` | `#E6E1DC` | Default borders |
| `premium-gold` | `#C69C39` | Star ratings, gold highlights |
| `premium-bronze` | `#7D5135` | Bronze accent |
| `walnut` | `#7D4A28` | Wood tone |
| `warm-cream` | `#F6F4EE` | Warm neutral surface |
| `charcoal-deep` | `#171512` | Deepest dark |
| `chart-1` | `#8C5A35` | Chart series 1 |
| `chart-2` | `#C69C39` | Chart series 2 |
| `chart-3` | `#33885A` | Chart series 3 |
| `chart-4` | `#2484AD` | Chart series 4 |
| `chart-5` | `#4A4035` | Chart series 5 |

### 1.2 Gradients

| Name | CSS | Usage |
|------|-----|-------|
| Hero | `135deg, rgba(23,21,18,0.95) → rgba(89,65,33,0.9)` | Hero section overlay |
| Subtle | `180deg, #F6F4EE → #F2EFE8` | Section backgrounds |
| Card Hover | `180deg, #FFFFFF → #F7F5F0` | Card hover state fill |
| Premium | `135deg, #8C5A35 → #C69C39` | CTA buttons, gradient text, dividers |

### 1.3 Typography

| Style | Font | Weight | Size | Use |
|-------|------|--------|------|-----|
| H1 | Playfair Display | Bold (700) | 60px (lg) / 48px (sm) | Hero heading |
| H2 | Playfair Display | Bold (700) | 36px (lg) / 30px (sm) | Section headings |
| H3 | Playfair Display | Bold (700) | 30px | Sub-section headings |
| H4 | Playfair Display | Bold (700) | 24px | Card/panel headings |
| H5 | Playfair Display | Bold (700) | 20px | Minor headings |
| H6 | Playfair Display | SemiBold (600) | 18px | Small headings |
| Body Large | Inter | Regular (400) | 18px / 1.6 lh | Hero descriptions |
| Body | Inter | Regular (400) | 16px / 1.5 lh | Default body text |
| Body Small | Inter | Regular (400) | 14px / 1.5 lh | UI text, descriptions |
| Caption | Inter | Regular (400) | 12px | Labels, metadata |
| Overline | Inter | Medium (500) | 12px, uppercase, 0.1em tracking | Section labels, badges |
| Button | Inter | Medium (500) | 14px | Standard buttons |
| Button Hero | Inter | SemiBold (600) | 18px, uppercase, wider tracking | Hero/Elegant buttons |

### 1.4 Spacing & Layout

- **Container**: `max-width` with `mx-auto px-4 lg:px-8` (16px mobile, 32px desktop padding)
- **Section vertical padding**: `py-24` (96px) for main sections, `py-16` (64px) for lighter sections
- **Card gap**: 24px (`gap-6`) in grids
- **Component internal padding**: 20–24px (`p-5` to `p-6`)
- **Border radius**: 8px (base), 6px (md), 4px (sm)

### 1.5 Shadows

| Name | Value | Use |
|------|-------|-----|
| sm | `0 1px 2px rgba(26,24,22,0.05)` | Buttons |
| md | `0 4px 12px -2px rgba(26,24,22,0.08), 0 2px 6px -2px rgba(26,24,22,0.04)` | Cards |
| lg | `0 10px 30px -8px rgba(26,24,22,0.12), 0 4px 12px -4px rgba(26,24,22,0.06)` | Modals |
| xl | `0 20px 50px -12px rgba(26,24,22,0.18)` | Hero |
| elegant | `0 8px 32px -8px rgba(140,90,53,0.15)` | Premium card glow |
| hover | `0 16px 40px -12px rgba(26,24,22,0.15)` | Hover lift |

---

## 2. Component Inventory

### 2.1 Button

| Variant | Background | Text | Border | Extra |
|---------|-----------|------|--------|-------|
| default | `primary` | `primary-foreground` | — | shadow-sm, rounded-md |
| destructive | `destructive` | white | — | shadow-sm |
| outline | `background` | `foreground` | `border` | hover → `secondary` bg, accent border |
| secondary | `secondary` | `secondary-foreground` | — | |
| ghost | transparent | — | — | hover → secondary bg |
| link | transparent | `accent` | — | underline on hover |
| **premium** | `accent` | `accent-foreground` | — | shadow-elegant, hover → -translate-y-0.5 + shadow-hover |
| **hero** | `primary` | `primary-foreground` | primary | rounded-none, uppercase, tracking-wider, semibold |
| **elegant** | transparent | `foreground` | 2px foreground | rounded-none, uppercase, tracking-wider; hover → invert fill |
| subtle | `muted` | `muted-foreground` | — | hover → foreground text |

**Sizes**: default (h-10, px-5), sm (h-8, px-3, 12px text), lg (h-12, px-8, 16px text), xl (h-14, px-10, 18px text), icon (40x40)

### 2.2 Card

- **Base**: `bg-card`, `border-border/50`, rounded-lg
- **card-premium class**: hover → `translateY(-4px)` + shadow-hover
- Content padding: `p-5` or `p-6`

### 2.3 Badge

- Variants: default, secondary, outline, destructive
- Small pill shape, `px-2.5 py-0.5`, 12px text, rounded-full

### 2.4 Input

- Height: 40px, `border-border`, `rounded-md`
- Focus: `ring-2 ring-accent`
- Search variant: icon (Search) positioned absolute left, `pl-10`

### 2.5 Select

- Trigger: same height/style as Input with chevron indicator
- Content: dropdown with `bg-popover`, shadow-lg, rounded-md
- Items: hover → `bg-secondary`

### 2.6 Checkbox

- 16x16 square, `border-border`, rounded-sm
- Checked: `bg-accent` with white check mark

### 2.7 Slider

- Track: 4px height, `bg-secondary`, rounded
- Thumb: 20px circle, `bg-accent`, shadow
- Range fill: `bg-accent`

### 2.8 Sheet (Mobile Drawer)

- Slides from left or right, `w-[300px]`
- `bg-background`, full height, shadow-xl
- Has SheetTitle (sr-only or visible)

### 2.9 Dialog (Modal)

- Centered overlay, `bg-background/80` backdrop
- Content: `bg-card`, `max-w-2xl`, rounded-lg, shadow-lg
- Sections: Header (title + description), Body, Footer (action buttons)

### 2.10 Tabs

- TabsList: `bg-muted/50`, rounded container, h-9
- TabsTrigger: text-sm, active → `bg-background` + shadow
- Alternative: underline-style tabs (border-b-2, accent color when active)

### 2.11 Table

- Header: `bg-muted/50`, text-sm, uppercase-like, `text-muted-foreground`
- Rows: `border-b border-border`, hover → subtle bg change
- Cells: `p-4`, aligned text

### 2.12 Switch

- Toggle: 36x20, pill shape
- Off: `bg-muted`, On: `bg-accent`
- Thumb: 16px circle, white

### 2.13 Separator

- 1px line, `bg-border`

### 2.14 Textarea

- Same styling as Input but multi-line

### 2.15 ScrollArea

- Custom scrollbar: 8px wide, `bg-muted` track, `bg-muted-foreground/30` thumb (rounded)

### 2.16 MaterialColorSelector (Custom)

- Card container with header (`bg-secondary/30`)
- Tab switcher: "Visual Selector" | "Color Codes"
- **Visual view**: Expandable accordion per part → grid of color swatches (aspect-square, rounded-lg, border-2); selected → `ring-2 ring-accent ring-offset-2` + check icon
- **List view**: ScrollArea, 2–3 column grid of labeled color items
- **Summary bar** at bottom: `bg-secondary/30`, flex-wrap pills showing selected colors

### 2.17 Divider Elegant

- `w-16 h-px`, centered, filled with `gradient-premium`

### 2.18 Text Gradient Premium

- Text with `gradient-premium` as fill (background-clip: text)

---

## 3. Shared Layout Components

### 3.1 Header

- **Position**: Fixed, top-0, full-width, z-50
- **Default state**: `bg-transparent`, py-20px
- **Scrolled state**: `bg-background/95`, backdrop-blur, shadow-md, py-12px
- **Structure** (desktop — lg: 1024px+):
  ```
  ┌─────────────────────────────────────────────────────────────────┐
  │  [ERGO Logo + "Seating"]    [Home  Products  About  Contact]   │
  │                              [Search] [User] [Cart:0] [B2B btn]│
  └─────────────────────────────────────────────────────────────────┘
  ```
  - Logo: Playfair Display 24px bold + "Seating" in 12px uppercase tracking-widest muted
  - Nav links: 14px medium, `link-underline` effect (animated accent underline on hover)
  - Active link: `text-accent`
  - Action icons: ghost buttons, 20px icons
  - Cart badge: 16px circle, `bg-accent`, 10px bold white text
  - B2B Portal: `variant="premium"` size="sm"
- **Mobile** (< 1024px):
  - Only logo + cart icon + hamburger menu
  - Sheet slides from right, w-300px
  - Nav links: full-width buttons, active → `bg-accent text-accent-foreground`
  - B2B Portal button at bottom

### 3.2 Footer

- **Background**: `bg-primary` (dark), `text-primary-foreground`
- **Structure**:
  ```
  ┌────────────────────────────────────────────────────────────────┐
  │  py-16 (64px)                                                  │
  │  ┌──────────────┬──────────┬──────────┬──────────┐             │
  │  │  Brand (2col) │ Products │ Company  │ Support  │             │
  │  │  Logo + desc  │ 4 links  │ 4 links  │ 4 links  │             │
  │  │  Social icons │          │          │          │             │
  │  └──────────────┴──────────┴──────────┴──────────┘             │
  │  ─────────── border-t (primary-foreground/10) ──────────       │
  │  Newsletter: [heading + desc]     [email input] [arrow btn]    │
  ├────────────────────────────────────────────────────────────────┤
  │  Bottom bar: © 2024 ERGO    Privacy | Terms | Cookie           │
  └────────────────────────────────────────────────────────────────┘
  ```
  - Grid: 1 col mobile → 2 col md → 5 col lg (brand spans 2)
  - Logo: Playfair 30px bold + subtitle 12px uppercase
  - Social icons: 40px circles, `bg-primary-foreground/10`, hover → /20
  - Link columns: title in uppercase 12px tracking-wider semibold, links in 14px `/70` opacity
  - Newsletter input: `bg-primary-foreground/10`, border `/20`, accent arrow button
  - Bottom bar: `border-t`, flex row, 14px `/60` opacity

---

## 4. Page Layouts

### 4.1 HomePage (7 Sections)

#### Section 1: Hero
- **Min-height**: 100vh
- **Background**: Full-bleed image with `bg-gradient-to-r from-background via-background/95 to-background/70` overlay
- **Layout**: 2-column grid (lg), left content + right product image
- **Left column**:
  - Badge: secondary variant, "Premium B2B Seating Solutions" with accent dot
  - H1: 60px serif bold, "Elevate Your" + gradient-premium text "Workspace Experience"
  - Body: 18px muted-foreground, max-w-xl
  - 2 buttons: `variant="hero"` size="xl" + `variant="elegant"` size="xl"
  - Stats row: 3 items, border-t, gap-32px — serif 30px bold values + 14px muted labels
- **Right column** (hidden on mobile):
  - Large product image with drop-shadow-2xl
  - Floating badge card: absolute positioned, `bg-card`, shadow-lg, award icon + "12 Year Warranty"

#### Section 2: Trusted By
- `py-16`, `bg-secondary/50`, `border-y border-border`
- Center text: 12px uppercase tracking-widest muted
- Flex-wrap row of client logos: grayscale, opacity-40, hover → opacity-70 + color

#### Section 3: Featured Products
- `py-24`, `bg-background`
- Header: Badge outline "Featured Collection" + H2 + "View All" link with arrow
- Grid: `sm:grid-cols-2 lg:grid-cols-4`, gap-24px
- Each product card (card-premium):
  - Image area: aspect-4/5, `bg-muted/30`, p-16px, image-zoom effect
  - Badges: absolute top-left (New = accent bg, Best Seller = secondary)
  - Content: star rating row (gold fill) + product name (hover → accent) + description (2-line clamp) + price + arrow circle
  - Arrow circle: 32px, `bg-secondary`, hover → `bg-accent`

#### Section 4: About
- `py-24`, `bg-secondary/30`
- 2-column grid (lg), gap-64px
- Left: aspect-4/3 image, rounded-xl, shadow-xl + stats overlay card (absolute -bottom-8 -right-8)
- Right: Badge + H2 + 2 paragraphs + feature checklist (2-col grid, accent circles with checks) + premium button

#### Section 5: Features (Why Choose ERGO)
- `py-24`, `bg-background`
- Centered header: Badge + H2 + subtitle, max-w-2xl
- Grid: `md:grid-cols-2 lg:grid-cols-4`, gap-32px
- Feature cards: icon box (48px, `bg-accent/10`, hover → `bg-accent` + white icon) + title + description

#### Section 6: Testimonials
- `py-24`, `bg-primary text-primary-foreground` (dark section)
- Centered header with light badge
- Grid: `md:grid-cols-3`, gap-32px
- Cards: `bg-primary-foreground/5`, `border-primary-foreground/10`, backdrop-blur
  - Quote icon (accent) + quote text + avatar (48px circle) + name + role

#### Section 7: CTA
- `py-24`, `bg-background`
- Rounded-2xl container with background image + `bg-gradient-to-r from-primary/95 to-primary/80` overlay
- Content: max-w-2xl, H2 + body + 2 buttons (accent solid + outline with primary-foreground border)

---

### 4.2 ProductsPage (Sidebar + Grid)

#### Hero Banner
- `pt-24 pb-12`, `bg-secondary/30`
- H1 + subtitle paragraph

#### Main Content (`py-12`)
- **Layout**: Flex row (lg), sidebar + content

##### Desktop Sidebar (hidden < 1024px)
- Width: 256px, `sticky top-28`
- **Categories**: Vertical button list, active → `bg-accent text-accent-foreground`, inactive → muted, each with count badge
- **Price Range**: Slider (0–6000) + min/max labels
- **Availability**: Checkbox "In Stock Only"
- **Clear Filters**: outline button, full-width

##### Mobile Filters
- Sheet trigger button (outline, `lg:hidden`)
- Sheet from left, w-300px, same FilterContent

##### Toolbar Row
- Search input (icon left, clearable)
- Sort select (w-192px): Featured, Price Low→High, Price High→Low, Rating, Newest
- View toggle: 2 icon buttons in bordered pill (Grid3x3 / LayoutList), active → `bg-secondary`

##### Results
- Count: "Showing X products"
- **Grid mode**: `sm:grid-cols-2 xl:grid-cols-3`, gap-24px — same card style as HomePage featured
- **List mode**: horizontal card — 192px image left + content right, "View Details" premium button

##### Empty State
- Centered: 64px muted circle + search icon + "No products found" + "Clear Filters" button

---

### 4.3 ProductDetailPage (5 Tabs)

#### Breadcrumb Bar
- `pt-24 pb-4`, `border-b`, `bg-muted/30`
- Home > Products > [Product Name], chevron separators

#### Tab Navigation (Sticky)
- `sticky top-[72px]`, `bg-background`, `border-b`
- Tabs: Overview | Specs | Design Story | Pro Resources | Product Images
- Active: `border-b-2 border-accent text-accent`

#### Tab: Overview
**Hero section** (2-col grid, lg):
- **Left — Gallery**:
  - Main image: aspect-square, `bg-muted/30`, rounded-xl, click → lightbox
  - Thumbnail row: 5-col grid, gap-12px, selected → `ring-2 ring-accent`
  - Quick links: icon + label row below
- **Right — Info**:
  - Designer credit (14px muted)
  - H1: serif 36px bold
  - Star rating row (gold, 16px) + review count
  - Description paragraph
  - Price: 30px bold + original (strikethrough) + save badge
  - Color selector: text buttons, selected → `border-accent bg-accent/10 text-accent`
  - MaterialColorSelector component (see 2.16)
  - Quantity: -/+ stepper with bordered container + stock status
  - Action buttons: premium "Add to Cart" (flex-1) + outline heart + outline share
  - "Contact a Dealer" outline button full-width
  - Benefits row: 3-col grid, icon boxes (40px secondary bg) + label + sublabel

**Features Grid**: 2-col, icon box (80px muted/50) + title + description

**Specs Preview**: `bg-secondary/30`, rounded-2xl, p-32px, 4-col stats grid

**Design Story Preview**: 2-col, image + text + "Read more" link

#### Tab: Specs
- Dimensions: 2-col, image + definition list (key-value, border-b rows)
- Materials: 3-col card grid (image + title + subtitle)
- Features: 3-col cards with aspect-video image + title
- Sustainability & Warranty: 2-col cards with large circle icons (64px)

#### Tab: Design Story
- `max-w-4xl mx-auto`
- H1 + intro → full-width aspect-video image → 2-col content sections → designer card

#### Tab: Pro Resources
- H1 + description
- 3-col card grid: icon header + download item list (secondary/50 bg rows)
- Contact CTA card: `border-accent/20 bg-accent/5`

#### Tab: Product Images
- H1 + description
- 3-col grid of aspect-square images with hover zoom + overlay + zoom icon
- "Download All" button centered

#### Related Products
- `py-16`, `bg-secondary/30`
- H2 + 4-col grid of simplified product cards

#### Bottom CTA
- `py-16`, `border-t`
- 3-col cards: Find a dealer / Find a showroom / Get help (centered icon + text + link)

---

### 4.4 AdminPage (Sidebar + Panels)

#### Layout
- `min-h-screen`, flex row
- **Sidebar** (hidden < 1024px): `w-64`, `bg-card`, `border-r`
  - Logo area: `p-6 border-b` — "ERGO" serif 24px + "Admin" badge
  - Navigation: `sidebar-item` class — flex row, gap-12px, px-16px py-12px, rounded-lg
    - Default: `text-muted-foreground`
    - Hover: `bg-secondary text-foreground`
    - Active: `bg-accent text-accent-foreground`
  - Items: Dashboard, Products, Settings (with Lucide icons)
  - Bottom: `border-t`, "Back to Site" outline button
- **Mobile header** (< 1024px): `bg-card border-b p-4`, logo + back arrow

#### Main Content (`p-6 lg:p-8`)
- **Page header**: H1 (serif 30px) + subtitle + action button (if Products tab)

##### Stats Grid (Dashboard + Products tabs)
- `sm:grid-cols-2 lg:grid-cols-4`, gap-16px
- Stat card: label (14px muted) + value (24px bold) + icon box (40px, accent/10 bg) + change indicator (success/destructive colored)

##### Products Tab
- Card with search + category filter in header
- **Table**: 5 columns — Product (image 48px + name + ID), Category (badge), Price (+ original strikethrough), Status (stock badge + featured badge), Actions (view/edit/delete icon buttons)
- Delete button: `text-destructive`
- Empty state: Package icon + "No products found"

##### Dashboard Tab
- "Recent Activity" card
- List of 5 products: image (40px) + name + price + Active/Inactive badge

##### Settings Tab
- Form card: 2-col grid — Store Name, Contact Email, Currency select, Default Warranty select
- "Save Settings" premium button

#### Dialogs
- **Create/Edit Product**: max-w-2xl, scrollable, form fields (2-col grids for name/category, price/originalPrice, image/material, colors/warranty) + textarea for description/features + 4 switches (In Stock, Featured, Best Seller, New) + Cancel/Submit buttons
- **Delete Confirmation**: simple dialog with destructive button

---

## 5. Responsive Breakpoints

| Breakpoint | Width | Key Changes |
|------------|-------|-------------|
| Default (mobile) | < 640px | Single column, stacked layouts, mobile header/sheet |
| `sm` | >= 640px | 2-column grids, side-by-side buttons |
| `lg` | >= 1024px | Full desktop layout — sidebar, 4-col grids, desktop header |
| `xl` | >= 1280px | 3-col product grid on ProductsPage |

---

## 6. Key Visual Patterns

### Hover Effects
- **card-premium**: `translateY(-4px)` + shadow-hover
- **image-zoom**: inner `<img>` scales to 1.05
- **link-underline**: pseudo-element expands from 0 to full width, accent color
- **button-premium**: `translateY(-1px)` + shadow-elegant
- **Icon boxes**: `bg-accent/10` → `bg-accent` with white icon

### Entrance Animations
- `fade-in`: opacity 0→1, 0.6s
- `slide-up`: opacity 0→1 + translateY(20px→0), 0.6s
- `scale-in`: opacity 0→1 + scale(0.95→1), 0.4s
- `stagger-children`: each child delayed by 0.1s increments

### Glass Effect
- `glass-subtle`: `backdrop-blur-md` + `background: color-mix(background 85%, transparent)`

### Scrolled Header
- Transition from transparent to `bg-background/95 backdrop-blur-md shadow-md`
- Padding reduces from py-20px to py-12px
