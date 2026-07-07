---
name: Archive.01 Lab System
colors:
  surface: '#111318'
  surface-dim: '#111318'
  surface-bright: '#37393e'
  surface-container-lowest: '#0c0e12'
  surface-container-low: '#1a1c20'
  surface-container: '#1e2024'
  surface-container-high: '#282a2e'
  surface-container-highest: '#333539'
  on-surface: '#e2e2e8'
  on-surface-variant: '#cac4cf'
  inverse-surface: '#e2e2e8'
  inverse-on-surface: '#2f3035'
  outline: '#948f9a'
  outline-variant: '#49454f'
  surface-tint: '#d0bcff'
  primary: '#e9ddff'
  on-primary: '#37265e'
  primary-container: '#d0bcff'
  on-primary-container: '#594983'
  inverse-primary: '#665590'
  secondary: '#b3c5ff'
  on-secondary: '#002b75'
  secondary-container: '#0466ff'
  on-secondary-container: '#f9f7ff'
  tertiary: '#ffdad6'
  on-tertiary: '#51221d'
  tertiary-container: '#ffb4ab'
  on-tertiary-container: '#7a433d'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e9ddff'
  primary-fixed-dim: '#d0bcff'
  on-primary-fixed: '#210f48'
  on-primary-fixed-variant: '#4d3d76'
  secondary-fixed: '#dbe1ff'
  secondary-fixed-dim: '#b3c5ff'
  on-secondary-fixed: '#001849'
  on-secondary-fixed-variant: '#003fa4'
  tertiary-fixed: '#ffdad5'
  tertiary-fixed-dim: '#ffb4ab'
  on-tertiary-fixed: '#360e0a'
  on-tertiary-fixed-variant: '#6c3832'
  background: '#111318'
  on-background: '#e2e2e8'
  surface-variant: '#333539'
  glass-border: rgba(255, 255, 255, 0.12)
  glass-bg: rgba(255, 255, 255, 0.03)
  glow-purple: rgba(208, 188, 255, 0.12)
  glow-blue: rgba(2, 102, 255, 0.1)
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 64px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: 0.05em
  code-sm:
    fontFamily: Courier Prime
    fontSize: 12px
    fontWeight: '400'
    lineHeight: '1.5'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
  container-max: 1200px
  section-gap: 128px
---

## Brand & Style
The Archive.01 design system is built for high-level scientific research and technical documentation. It evokes a "Scientific Glassmorphism" aesthetic—a sophisticated blend of laboratory precision and futuristic digital interfaces. 

The brand personality is intellectual, cold, and premium. It prioritizes data density and atmospheric depth, utilizing translucent layers, "physics-inspired" background elements (like formula floats and particle grids), and vibrant ambient blurs to create a sense of looking through a high-tech lens or microscope. The emotional response is one of discovery, rigorous documentation, and elite technological capability.

## Colors
The palette is rooted in a "Deep Space" dark mode (`#0a0c10`). The primary accent is a luminous **Digital Lavender** (`#d0bcff`), used for interactive elements and brand markers. A secondary **Research Blue** (`#0266ff`) is used for ambient glows and secondary highlights.

The color system relies heavily on alpha-blended neutrals rather than solid grays to maintain the "glass" effect. Surface containers are built from semi-transparent whites and purples over a dark void, allowing background physics-elements to bleed through subtly. Error states use a soft coral-red tertiary.

## Typography
The system uses **Inter** for all primary communication, leveraging its utilitarian and highly legible character. High-contrast weights (from 400 to 800) differentiate between technical labels and massive display headers. 

**Courier Prime** is used as a functional secondary font for "metadata" and "formula" elements, reinforcing the lab-archive aesthetic. Display headers use aggressive negative letter-spacing and heavy weights to create a "monumental" feel, while labels are uppercase with generous tracking to emulate technical instrument markings.

## Layout & Spacing
The layout follows a **12-column fixed grid** that centers on large viewports (max 1200px). Spacing is derived from an 8px base unit, but is applied generously to create an open, clinical feel. 

Vertical rhythm is defined by significant gaps between sections (128px on desktop) to allow the atmospheric background elements to "breathe." Complex data is presented in bento-style grids where elements span 4, 8, or 12 columns. On mobile, the grid collapses to a single column with 16px side margins.

## Elevation & Depth
Elevation is expressed through **transparency and blur** rather than traditional drop shadows. 
- **Scientific Glass:** A base layer using `3% white` opacity with a `20px` backdrop blur and a thin `12% white` border.
- **Focus Glass:** Used for active or highlighted cards, increasing background opacity to `6%` and blur to `40px` with a more prominent `20%` border.
- **Atmospheric Depth:** Large, blurred radial gradients in primary and secondary colors sit at the lowest Z-index, creating a sense of three-dimensional space behind the UI.
- **Interactive Lighting:** Hovering over glass cards triggers a dynamic radial gradient highlight that follows the cursor, simulating a light source reflecting off a physical glass pane.

## Shapes
The shape language combines **rounded rectangles** with **perfect circles** (pills) to balance technical precision with modern UI trends. 
- **Base Cards:** Use `rounded-xl` (1.5rem / 24px) to soften the large grid containers.
- **Interactive Elements:** Buttons and tags use `full` roundedness (pills) to clearly distinguish them from structural containers.
- **Reticles:** Circular elements (gauges/icons) reinforce the "instrumentation" theme.
- **Media:** Images should have a consistent `rounded-lg` (1rem / 16px) inner radius within their containers.

## Components
- **Primary Buttons:** Pill-shaped, high-contrast surfaces (Primary Container color). Text is uppercase or bold `label-md`.
- **Glass Buttons:** Secondary actions using the "Scientific Glass" style with subtle white borders.
- **Chips/Tags:** Small pill-shaped containers with a 2px dot indicator on the left side to signify "active status" or "category."
- **Reticle Gauges:** A custom component consisting of a 60px circle with a partial high-contrast border-top/left, used to frame icons as if they were viewed through a viewfinder.
- **Bento Cards:** Large containers for data, featuring a "title-at-top, stats-at-bottom" layout with high internal padding (32px).
- **Timeline Items:** Horizontal rows with monospaced date labels and glass backgrounds, utilizing hover states that slightly increase the white overlay opacity.