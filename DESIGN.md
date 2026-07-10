---
name: Technical Editorial
colors:
  surface: '#fff9eb'
  surface-dim: '#dfdacc'
  surface-bright: '#fff9eb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f9f3e5'
  surface-container: '#f3eddf'
  surface-container-high: '#eee8da'
  surface-container-highest: '#e8e2d4'
  on-surface: '#1d1c13'
  on-surface-variant: '#444748'
  inverse-surface: '#333027'
  inverse-on-surface: '#f6f0e2'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#858383'
  inverse-primary: '#c8c6c5'
  secondary: '#b02f0b'
  on-secondary: '#ffffff'
  secondary-container: '#fc653f'
  on-secondary-container: '#5e1100'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1d1b15'
  on-tertiary-container: '#87837a'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474646'
  secondary-fixed: '#ffdbd2'
  secondary-fixed-dim: '#ffb4a2'
  on-secondary-fixed: '#3c0800'
  on-secondary-fixed-variant: '#891d00'
  tertiary-fixed: '#e8e2d7'
  tertiary-fixed-dim: '#cbc6bc'
  on-tertiary-fixed: '#1d1b15'
  on-tertiary-fixed-variant: '#49473f'
  background: '#fff9eb'
  on-background: '#1d1c13'
  surface-variant: '#e8e2d4'
typography:
  display-xl:
    fontFamily: Barlow Condensed
    fontSize: 120px
    fontWeight: '700'
    lineHeight: 100px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Barlow Condensed
    fontSize: 64px
    fontWeight: '600'
    lineHeight: 72px
  headline-lg-mobile:
    fontFamily: Barlow Condensed
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 52px
  section-header:
    fontFamily: IBM Plex Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.1em
  body-lg:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '400'
    lineHeight: 32px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  technical-label:
    fontFamily: IBM Plex Mono
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  mono-data:
    fontFamily: IBM Plex Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
spacing:
  baseline: 4px
  gutter: 24px
  margin-mobile: 20px
  margin-desktop: 64px
  section-gap: 128px
---

## Brand & Style
This design system establishes a high-end, print-inspired aesthetic tailored for an engineering portfolio. It merges the tactile quality of a physical broadsheet with the precision of technical documentation. The visual language is authoritative yet warm, striking a balance between intellectual rigor and human craftsmanship.

The design style is **Minimalist / Brutalist hybrid**, utilizing heavy whitespace, thin 1px rules, and a strict grid. It avoids modern UI tropes like gradients or rounded corners, instead leaning into high-contrast typography, section numbering (e.g., 01 / INDEX), and functional technical markings to convey a "work-in-progress" architectural feel.

## Colors
The palette is rooted in a **Warm Paper** (#F1EBDD) base to reduce digital eye strain and evoke the feel of premium stationary. **Ink Black** (#111111) is used for primary text and structural lines to provide maximum legibility and a stark, editorial contrast.

**Signal Orange** (#E4542F) is the sole accent color, reserved strictly for interactive states, call-to-actions, and critical technical highlights. **Muted Grey** (#B9B4AA) handles secondary information and hair-line dividers. The system utilizes a thematic "Dark Footer" (#181817) with **Off-white text** (#F7F3EA) to ground the page and signal the conclusion of content.

## Typography
Typography is the primary driver of hierarchy. **Barlow Condensed** is used for high-impact display moments, emphasizing a vertical, architectural rhythm. **Inter** provides a neutral, highly readable canvas for long-form engineering case studies. **IBM Plex Mono** is employed for "meta" information, such as timestamps, file sizes, git hashes, or bracketed labels `{ TYPE }`, reinforcing the engineering narrative.

All display headlines should use tight tracking and uppercase styling. Body copy should maintain generous line heights to preserve the "breathable" editorial feel.

## Layout & Spacing
The layout follows a **Fixed 12-column grid** on desktop (max-width: 1440px) and a **4-column grid** on mobile. Elements are aligned strictly to grid lines, often separated by visible 1px rules.

Whitespace is used intentionally as a structural element rather than a void. Large "editorial" gaps (128px+) separate major content blocks. Content should feel "hung" from the top of the grid, with technical metadata often pushed to the far margins or aligned to the baseline of headlines. 

**Breakpoints:**
- Mobile: < 768px (Fluid width, 20px margins)
- Tablet: 768px - 1024px (Fixed 720px / 960px container)
- Desktop: > 1024px (12 columns, 64px margins)

## Elevation & Depth
This design system is **strictly flat**. Depth is conveyed through **Tonal Layering** and **Structural Outlines** rather than shadows or blurs.

- **Surface Tiers:** Backgrounds are primary paper (#F1EBDD). Overlays or "cards" should not have backgrounds; instead, they are defined by 1px solid Ink Black or Muted Grey borders.
- **Rules:** Use thin 1px horizontal and vertical lines to sequester content.
- **Interaction:** Depth is signaled by "filling" a container with color (Signal Orange) rather than lifting it off the page. 
- **Z-Index:** Only used for navigation menus, which should appear as a stark, full-page overlay with zero transparency.

## Shapes
The shape language is **Sharp (0px)**. Every element—buttons, input fields, images, and container borders—must have 90-degree corners. This reinforces the "blueprint" and "print" aesthetic, distancing the UI from generic "app-like" roundedness. 

Images should be treated like newspaper plates: crisp edges, occasionally framed with a 1px border or offset by a technical label at the bottom-right corner.

## Components
- **Buttons:** Sharp rectangles with a 1px Ink Black border. On hover, the background fills with Signal Orange and text switches to Ink Black. Labels are set in IBM Plex Mono.
- **Brackets:** Technical labels or categories should be wrapped in monospace brackets: `{ ENGINEERING }` or `[ 2024 ]`.
- **Section Dividers:** 1px horizontal rules spanning the full width of the container, topped with a section number and title in IBM Plex Mono (e.g., 01 / INTRODUCTION).
- **Input Fields:** Bottom-border only (1px Ink Black). Labels sit above the line in technical-label style.
- **Chips/Tags:** Minimalist IBM Plex Mono text separated by a pipe `|` or slash `/`, rather than enclosed in bubbles.
- **Lists:** Unordered lists should use a dash `—` or a small square instead of a standard bullet.
- **Cards:** No background or shadow. A card is defined by a 1px border and a header rule that separates the title from the image/description.