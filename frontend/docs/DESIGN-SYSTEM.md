# ERGŌ Seating — Design System

A complete reference for all design tokens, utility classes, and conventions used in the SeatStar/ERGŌ frontend.

---

## Color System

All colors are defined as CSS custom properties in `src/index.css` inside a `@theme` block (Tailwind v4). Dark mode overrides live in the `.dark` selector.

### Background & Surface

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--color-background` | `#FAF8F5` | `#0F0E0D` | Page background |
| `--color-foreground` | `#1A1816` | `#F4F2EF` | Default text |
| `--color-card` | `#FFFFFF` | `#171512` | Card / panel bg |
| `--color-card-foreground` | `#1A1816` | `#F4F2EF` | Card text |
| `--color-popover` | `#FFFFFF` | `#171512` | Popover / dropdown bg |
| `--color-popover-foreground` | `#1A1816` | `#F4F2EF` | Popover text |
| `--color-muted` | `#F2F0EC` | `#292420` | Subtle background |
| `--color-muted-foreground` | `#737068` | `#9E9892` | Secondary text |

### Brand & Semantic

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--color-primary` | `#292624` | `#F4F2EF` | Primary actions |
| `--color-primary-foreground` | `#FAF8F5` | `#0F0E0D` | Text on primary |
| `--color-secondary` | `#F2EFE8` | `#211F1C` | Secondary actions |
| `--color-secondary-foreground` | `#2A2620` | `#F4F2EF` | Text on secondary |
| `--color-accent` | `#8C5A35` | `#CC9D4D` | Accent / links |
| `--color-accent-foreground` | `#FAF8F5` | `#0F0E0D` | Text on accent |

### State

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--color-destructive` | `#D22B2B` | `#D14747` | Error / danger |
| `--color-destructive-foreground` | `#FFFFFF` | `#FFFFFF` | Text on destructive |
| `--color-success` | `#33885A` | `#4DAA77` | Success state |
| `--color-success-foreground` | `#FFFFFF` | `#0F0E0D` | Text on success |
| `--color-warning` | `#F5A623` | `#F5B84D` | Warning state |
| `--color-warning-foreground` | `#1A1816` | `#0F0E0D` | Text on warning |

### Border & Input

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--color-border` | `#E6E1DC` | `#302C29` | Default borders |
| `--color-input` | `#E6E1DC` | `#302C29` | Input borders |
| `--color-ring` | `#8C5A35` | `#CC9D4D` | Focus ring |

---

## Premium Brand Colors

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--color-premium-gold` | `#C69C39` | `#E0B955` | Gold accents |
| `--color-premium-bronze` | `#7D5135` | `#A57650` | Bronze accents |
| `--color-walnut` | `#7D4A28` | `#A86B42` | Walnut wood tone |
| `--color-warm-cream` | `#F6F4EE` | `#2A2620` | Warm neutral surface |
| `--color-charcoal-deep` | `#171512` | `#0A0908` | Deepest dark |

---

## Chart Colors

| Token | Light | Dark |
|-------|-------|------|
| `--color-chart-1` | `#8C5A35` | `#CC9D4D` |
| `--color-chart-2` | `#C69C39` | `#E0B955` |
| `--color-chart-3` | `#33885A` | `#4DAA77` |
| `--color-chart-4` | `#2484AD` | `#3AA0CC` |
| `--color-chart-5` | `#4A4035` | `#8A7D6E` |

---

## Typography

| Token | Value | Usage |
|-------|-------|-------|
| `--font-sans` | `'Inter', system-ui, sans-serif` | Body text, UI elements |
| `--font-serif` | `'Playfair Display', Georgia, serif` | Headings (h1–h6) |

Headings automatically use `font-serif` via a base layer rule.

---

## Border Radius

| Token | Value |
|-------|-------|
| `--radius` | `0.5rem` |
| `--radius-lg` | `var(--radius)` (0.5rem) |
| `--radius-md` | `calc(var(--radius) - 2px)` |
| `--radius-sm` | `calc(var(--radius) - 4px)` |

---

## Shadows

| Token | Light Value | Dark Value | Use Case |
|-------|------------|------------|----------|
| `--shadow-sm` | `0 1px 2px 0 rgb(26 24 22 / 0.05)` | `0 1px 2px 0 rgb(0 0 0 / 0.4)` | Subtle elevation (buttons) |
| `--shadow-md` | `0 4px 12px …/ 0.08` | `… / 0.5` | Cards at rest |
| `--shadow-lg` | `0 10px 30px …/ 0.12` | `… / 0.6` | Modals, dropdowns |
| `--shadow-xl` | `0 20px 50px …/ 0.18` | `… / 0.7` | Hero overlays |
| `--shadow-elegant` | accent-tinted glow | gold-tinted glow | Premium card glow |
| `--shadow-hover` | `0 16px 40px …/ 0.15` | `… / 0.6` | Hover lift effect |

Dark mode uses higher opacities (0.4–0.7) for visibility against dark backgrounds.

---

## Gradients

| Token | Light | Dark | Use Case |
|-------|-------|------|----------|
| `--gradient-hero` | `135deg, #171512/0.95 → #594121/0.9` | `135deg, #0A0908/0.97 → #503A1C/0.92` | Hero section overlay |
| `--gradient-subtle` | `180deg, #F6F4EE → #F2EFE8` | `180deg, #211F1C → #171512` | Section backgrounds |
| `--gradient-card-hover` | `180deg, #FFF → #F7F5F0` | `180deg, #1A1816 → #211F1C` | Card hover fill |
| `--gradient-premium` | `135deg, #8C5A35 → #C69C39` | `135deg, #CC9D4D → #E0B955` | CTA buttons, accents |

---

## Transitions & Animations

### Transitions

| Token | Value | Use Case |
|-------|-------|----------|
| `--transition-fast` | `0.15s cubic-bezier(0.4, 0, 0.2, 1)` | Button presses, toggles |
| `--transition-smooth` | `0.3s cubic-bezier(0.4, 0, 0.2, 1)` | Card hovers, general UI |
| `--transition-elegant` | `0.5s cubic-bezier(0.22, 1, 0.36, 1)` | Image zoom, page elements |

### Animations

| Token | Duration | Use Case |
|-------|----------|----------|
| `--animate-accordion-down` | 0.2s ease-out | Accordion open |
| `--animate-accordion-up` | 0.2s ease-out | Accordion close |
| `--animate-fade-in` | 0.6s ease-out | Entrance fade |
| `--animate-slide-up` | 0.6s ease-out | Entrance from below |
| `--animate-slide-down` | 0.6s ease-out | Entrance from above |
| `--animate-scale-in` | 0.4s ease-out | Entrance scale |

---

## Component Utility Classes

Defined in `@layer components` in `src/index.css`.

### `.card-premium`
Premium card with hover lift and shadow effect.
```html
<div class="card-premium rounded-lg p-6">…</div>
```

### `.text-gradient-premium`
Gradient text using the premium brand gradient.
```html
<span class="text-gradient-premium font-serif text-4xl">Premium</span>
```

### `.glass-subtle`
Subtle frosted-glass backdrop effect.
```html
<div class="glass-subtle rounded-lg p-4">…</div>
```

### `.image-zoom`
Image zoom on hover (wrap around an `<img>`).
```html
<div class="image-zoom rounded-lg">
  <img src="chair.jpg" alt="Chair" />
</div>
```

### `.link-underline`
Animated underline that expands on hover.
```html
<a href="#" class="link-underline">Learn more</a>
```

### `.divider-elegant`
Centered gradient divider line.
```html
<div class="divider-elegant my-8"></div>
```

### `.button-premium`
Premium CTA button with gradient background and hover lift.
```html
<button class="button-premium text-white px-6 py-3 rounded-lg">Shop Now</button>
```

### `.sidebar-item`
Admin sidebar navigation item with active state.
```html
<a href="#" class="sidebar-item">
  <Icon /> Dashboard
</a>
<a href="#" class="sidebar-item active">
  <Icon /> Products
</a>
```

---

## Dark Mode

### How it works

1. **Default:** Dark mode is the default. `<html>` starts with `class="dark"`.
2. **FOUC prevention:** An inline `<script>` in `index.html` reads `localStorage('theme')` and removes `.dark` if the stored theme is `'light'` — before any CSS or React loads.
3. **Toggle:** The `useTheme()` hook (`src/hooks/use-theme.ts`) manages state, toggles the `.dark` class on `<html>`, and persists to `localStorage`.
4. **CSS:** All dark overrides are in a single `.dark { … }` block in `src/index.css`.

### Using in components

```tsx
import { useTheme } from "@/hooks/use-theme";

function MyComponent() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme}>
      {theme === "dark" ? "Switch to Light" : "Switch to Dark"}
    </button>
  );
}
```

### Adding new dark tokens

Add overrides inside the `.dark { … }` block in `src/index.css`:

```css
.dark {
  --color-my-new-token: #value;
}
```

Then reference via Tailwind: `bg-[var(--color-my-new-token)]` or in `@theme` for full class support.
