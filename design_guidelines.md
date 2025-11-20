# Live News App - Design Guidelines

## Design Approach
**System-Based Design** with inspiration from modern news platforms (Medium, Flipboard, The Guardian). Emphasizes content hierarchy, readability, and efficient information scanning. The design balances visual appeal with utility, creating a polished news consumption experience.

## Core Design Principles
1. **Content-First**: News articles are the hero - everything serves content discovery
2. **Scannable Hierarchy**: Clear visual distinction between headlines, metadata, and body text
3. **Information Density**: Maximize content visibility without overwhelming users
4. **Dual Theme Mastery**: Both light and dark modes feel native, not afterthoughts

---

## Typography System

**Primary Font**: Inter or Roboto (Google Fonts CDN)
**Secondary Font**: Georgia or Merriweather for article preview text (readability)

**Hierarchy**:
- Hero Headlines: `text-4xl lg:text-5xl font-bold` (landing/featured)
- Article Titles: `text-xl lg:text-2xl font-semibold` (cards)
- Category Labels: `text-sm font-medium uppercase tracking-wide`
- Body/Descriptions: `text-base font-normal leading-relaxed`
- Metadata (source/date): `text-sm font-normal opacity-70`
- Button Text: `text-sm font-medium`

**Line Heights**: Generous spacing for readability (`leading-relaxed` for body text)

---

## Layout System

**Spacing Units**: Use Tailwind units of **2, 4, 6, 8, 12, 16, 20, 24** for consistency
- Component padding: `p-4` to `p-6`
- Section spacing: `py-12` to `py-20`
- Card gaps: `gap-6` to `gap-8`
- Element margins: `mb-2`, `mb-4`, `mb-6`

**Container Strategy**:
- Max width: `max-w-7xl mx-auto px-4 lg:px-8`
- Full-width navbar and footer
- Contained content sections

**Grid Layouts**:
- Desktop: 3-column article grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`)
- Featured section: 2-column with larger featured card
- Mobile: Single column stack

---

## Component Library

### 1. Navbar
**Structure**: Fixed top, full-width with shadow/border-bottom
- Logo/Brand: Left-aligned, `text-2xl font-bold`
- Category navigation: Horizontal scroll on mobile, full navigation on desktop
- Search bar: Right-aligned on desktop, expandable on mobile
- Theme toggle: Icon button (moon/sun) in top-right corner

**Categories Display**: 
- Desktop: Inline flex with hover underline animation
- Mobile: Horizontal scroll container with snap points
- Active category: Bold font weight and underline indicator

### 2. Search Bar
**Placement**: Integrated into navbar
**Design**: 
- Input field: `rounded-full` with subtle border, `px-6 py-2`
- Icon: Heroicons search icon, positioned left inside input
- Submit: Implicit on enter, or small icon button on right

### 3. News Article Cards
**Layout**: Vertical card with consistent aspect ratio
- Image container: `aspect-video` or `aspect-[4/3]`, rounded corners `rounded-lg`
- Image: Object-cover with lazy loading
- Content padding: `p-6`
- Hover state: Subtle lift effect with shadow

**Card Content Structure** (top to bottom):
1. Category badge: Small pill badge, `text-xs px-3 py-1 rounded-full`
2. Article image: Full-width, `mb-4`
3. Title: `text-xl font-semibold mb-3`, 2-line clamp
4. Description: `text-base mb-4`, 3-line clamp, secondary font
5. Metadata row: Flex layout with source and date
   - Source icon + name: `flex items-center gap-2`
   - Separator dot: `mx-2`
   - Published date: Relative time (e.g., "2 hours ago")
6. "Read More" link: `text-sm font-medium` with arrow icon (Heroicons arrow-right)

**Card Variants**:
- **Featured Card**: Double width on desktop, larger image, `text-2xl` title
- **Standard Card**: Grid item
- **Compact Card**: Horizontal layout for sidebar/related articles

### 4. Loading Skeleton
**Design**: Animated shimmer effect using gradients
- Card skeleton: Match article card dimensions exactly
- Pulse animation: Subtle, not distracting
- Elements: Rectangle blocks for image, title, description with spacing matching actual cards
- Quantity: Show 6-9 skeleton cards during load

### 5. Error State
**Display**: Centered message with icon
- Error icon: Heroicons exclamation-circle, large size
- Message: `text-lg font-medium mb-2`
- Sub-message: `text-base opacity-70`
- Retry button: Primary button style

### 6. Category Page/View
**Header Section**: 
- Category title: `text-3xl lg:text-4xl font-bold mb-2`
- Subtitle: Article count or category description
- Spacing: `py-8 mb-8` with bottom border

**Article Grid**: 
- First article: Featured card (larger)
- Remaining: Standard grid (3 columns desktop)
- Infinite scroll or "Load More" button at bottom

### 7. Featured/Hero Section (Homepage)
**Layout**: Top of homepage, before category content
- Large featured article: Left side, 2/3 width
- Secondary articles: Right side, stacked, 1/3 width
- Height: Auto-height based on content, `min-h-[500px]`
- Spacing: `py-16 mb-12`

### 8. Theme Toggle
**Component**: Icon button with smooth transition
- Position: Navbar top-right
- Size: `w-10 h-10` circular button
- Icons: Heroicons moon/sun
- Animation: Rotate transition on theme change

### 9. Footer
**Content**:
- App branding and description
- Category quick links
- Social media icons (placeholder comments)
- Copyright notice
- Layout: Multi-column on desktop, stacked on mobile
- Spacing: `py-12`

---

## Responsive Breakpoints
- Mobile: `< 768px` - Single column, stacked navigation
- Tablet: `768px - 1024px` - 2 column grid
- Desktop: `> 1024px` - 3 column grid, full navigation

**Mobile Optimizations**:
- Hamburger menu for categories (drawer/dropdown)
- Expandable search bar
- Larger touch targets (min `h-12`)
- Reduced padding (`p-4` instead of `p-6`)

---

## Interactions & Animations

**Minimize animations** - use sparingly:
- Hover effects: Subtle scale (1.02) and shadow on cards
- Category underline: Slide-in animation on hover
- Theme transition: Smooth fade (200ms)
- Loading skeletons: Gentle pulse only

**No animations**:
- Page transitions (instant navigation)
- Scroll effects
- Elaborate micro-interactions

---

## Images

### Hero Section
**Yes, include a large hero image** on homepage:
- Full-width featured article image
- Aspect ratio: `16:9` or `21:9` for cinematic feel
- Overlay: Subtle gradient for text readability
- Text overlay: Article title, category, and "Read Article" button with blurred background (`backdrop-blur-md`)

### Article Cards
- Each card requires an image placeholder
- Fallback: Solid background with category icon if image fails
- Images: Use placeholder service like Unsplash Source with relevant keywords (news, technology, business, etc.)
- Dimensions: Consistent aspect ratio across all cards

**Image Placement**:
1. **Featured hero article**: Top of homepage, large image with text overlay
2. **Article cards**: Each card includes thumbnail image at top
3. **No images needed**: Navbar, footer, loading states, error states

---

## Layout Specifications

**Navbar**: `h-16` fixed, full-width, blur background in dark mode
**Content area**: `pt-20` (to clear fixed navbar)
**Article grid gap**: `gap-8` desktop, `gap-6` mobile
**Card border-radius**: `rounded-lg` (8px) for modern feel
**Container padding**: `px-4 lg:px-8` consistent throughout

This design creates a professional, content-focused news application that prioritizes readability and efficient information consumption while maintaining modern visual appeal.