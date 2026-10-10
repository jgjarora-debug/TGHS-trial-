---
name: Executive Precision
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#434655'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#3755c3'
  on-secondary: '#ffffff'
  secondary-container: '#708cfd'
  on-secondary-container: '#00217a'
  tertiary: '#006243'
  on-tertiary: '#ffffff'
  tertiary-container: '#007d57'
  on-tertiary-container: '#bdffdc'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#dde1ff'
  secondary-fixed-dim: '#b8c4ff'
  on-secondary-fixed: '#001453'
  on-secondary-fixed-variant: '#173bab'
  tertiary-fixed: '#85f8c4'
  tertiary-fixed-dim: '#68dba9'
  on-tertiary-fixed: '#002114'
  on-tertiary-fixed-variant: '#005137'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.005em
  body-lg:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: 0em
  body-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0.005em
  label-lg:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.03em
  label-sm:
    fontFamily: Inter
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 12px
    letterSpacing: 0.05em
  code-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-lg: 1.5rem
  margin: 1.5rem
  margin-mobile: 0.75rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
  space-2xl: 2rem
---

## Brand & Style

This design system delivers an enterprise-grade recruiting operations cockpit engineered for high-velocity talent acquisition teams, executive search panels, and hiring coordinators. The visual personality balances analytical clarity, structural rigor, and modern corporate poise. 

Rather than treating recruiting as an administrative burden, the system reframes applicant management into a high-stakes talent intelligence workflow. It prioritizes information density without visual clutter, rapid keyboard navigation, explicit stage clarity, and deterministic system feedback.

The aesthetic fuses **Corporate / Modern** precision with **High-Density SaaS** mechanics:
- Surfaces are structurally partitioned using fine hair-thin dividers and deliberate tonal steps.
- Contrast is tuned for sustained 8-to-10 hour shifts, ensuring minimal optical fatigue across large widescreen arrays.
- Critical workflow statuses—such as candidate pipeline movement, interview scoring thresholds, and SLA timeouts—are prioritized through razor-sharp status indicators, tight tabular layouts, and compact visual tokens.

## Colors

The palette establishes an authoritative, predictable hierarchy tailored for continuous pipeline scanning, automated scoring, and compliance enforcement.

### Palette Architecture
- **Primary (`#2563eb` - Royal Blue):** Anchors primary calls-to-action, pipeline progress indications, active filter tabs, and interactive linkages across requisition workspaces.
- **Secondary (`#1e40af` - Deep Blue):** Reserved for elevated structural anchors: high-level navigation, primary header surfaces, active sidebar treatments, and executive metric callouts.
- **Tertiary / Success (`#059669` - Emerald):** Denotes Tier 1 candidate matches, affirmative interview scorecards, verified background checks, and successful candidate stage progressions.
- **Warning / SLA Alert (`#f59e0b` - Amber):** Flags candidates nearing SLA expiration, aging pipeline bottlenecks, schedule conflicts, and stalled background verifications.
- **Destructive / Risk (`#dc2626` - Crimson):** Reserved strictly for requisition blocks, candidate rejections, compliance flags, overdue requisitions, and irrevocable data removals.
- **Neutral Core (`#64748b` - Slate):** Powers the interface's structural chassis. Provides crisp distinction between neutral surfaces (`#f8fafc` canvas, `#ffffff` card backdrops, `#e2e8f0` stroke borders) and deep foreground copy (`#0f172a` primary text, `#475569` secondary details).

### Color Application Rules
- Maintain high-contrast data rows: zebra striping is rejected in favor of pure white containers flanked by `#f1f5f9` hover fills.
- Semantic indicators must always pair color with text or iconography to preserve full accessibility under high-speed triage.

## Typography

The typographical engine leverages **Inter** for maximum optical balance and high legibility across dense data matrices. **JetBrains Mono** is introduced for monospace identifiers, requisition tracking IDs, candidate hash tokens, and candidate salary ranges.

### Typographic Hierarchy
- **Numerals & Metrics:** Candidate counts, pipeline days-in-stage, and match scores utilize tabular figures (`font-variant-numeric: tabular-nums`) to prevent jitter across dynamic updates and sorted tables.
- **Labels & Micro-Tags:** All system badges, stage flags, and candidate pipeline chips utilize `label-md` or `label-sm` rendered in uppercase styling with positive letter-spacing to ensure crisp scannability at small footprints.
- **Editorial Compactness:** Line heights are restricted to tight, proportional boundaries (1.25x to 1.4x) to empower high row density without overlapping text baselines.

## Layout & Spacing

The structural framework is configured for variable multi-pane operations, including dual-pane applicant comparisons, Kanban-style talent boards, and infinite-scroll requisition tables.

### Layout Mechanics
- **Grid Architecture:** Multi-column fluid desktop layout governed by an 8px base rhythm with 4px sub-intervals for tight UI controls. Standard enterprise view assumes full-viewport workspaces with collapsible secondary navigation and persistent right-side candidate dossier drawers.
- **Horizontal Density:** Table cells feature horizontal padding of `space-md` (12px) and vertical padding of `space-sm` (8px), capping typical row height at 40px for maximum information visibility.
- **Form Factors & Breakpoints:**
  - **Desktop (>= 1280px):** Permanent left navigation (narrow icon/label rail), fluid 12-column core dashboard or multi-column Kanban board, and optional 480px slide-over dossier pane.
  - **Tablet (768px - 1279px):** Collapsible drawer navigation; data tables adopt horizontal scroll with frozen candidate identity columns.
  - **Mobile (< 768px):** Single-column stacked cards replace data tables; pipeline swimlanes convert to tabbed segment controllers. Margin contracts to `margin-mobile` (12px).

## Elevation & Depth

Visual hierarchy uses a refined **Low-Contrast Outline & Tonal Layer** strategy. Heavy drop shadows are omitted to preserve crisp line work and prevent interface heaviness during multi-window enterprise usage.

### Surface Hierarchy & Elevation Levels
- **Canvas Base (`#f8fafc`):** The ground floor for the entire application canvas.
- **Surface Level 1 (`#ffffff`):** Standard data tables, Kanban lanes, candidate cards, and metrics tiles. Bound by crisp `1px solid #e2e8f0` structural borders.
- **Surface Level 2 (Elevated Panels):** Hovered candidate cards, active drawer surfaces, and contextual filter popovers. Uses `border: 1px solid #cbd5e1` with a calibrated ambient shadow: `0 4px 6px -1px rgba(15, 23, 42, 0.05), 0 2px 4px -2px rgba(15, 23, 42, 0.05)`.
- **Surface Level 3 (Modals & Overlays):** Interview score entry dialogs, offer approval modals, and bulk export managers. Supported by a 40% opacity slate scrim (`rgba(15, 23, 42, 0.40)`) and an elevation shadow: `0 20px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04)`.

## Shapes

The design system operates with **Soft** corner geometry (`roundedness: 1`), communicating operational discipline, architectural precision, and compact enterprise efficiency.

### Shape Geometry Application
- **Buttons, Inputs, Selects, and Table Cells:** Standardized at `0.25rem` (4px) border-radius. This keeps adjacent input fields visually tight and unified within dense toolbars.
- **Cards, Filter Sheets, and Stage Containers:** Standardized at `rounded-lg` (`0.5rem` / 8px) to establish clear structural separation without consuming unnecessary screen margin.
- **Drawers and Modals:** Fixed at `rounded-xl` (`0.75rem` / 12px) on floating surfaces, maintaining clean internal right angles.
- **System Badges and Status Dots:** Micro status indicators use `9999px` (fully rounded capsules) strictly for tags, SLA alerts, and candidate score pills to contrast clearly against the rectilinear input controls.

## Components

### Buttons
- **Primary:** Background `#2563eb`, border transparent, text `#ffffff`, font `label-lg`. Hover state `#1e40af`. Active state `#1d4ed8`. Height: 32px (compact) or 36px (standard). Padding: 0 12px.
- **Secondary / Outline:** Background `#ffffff`, border `1px solid #cbd5e1`, text `#0f172a`. Hover state `#f8fafc` with border `#94a3b8`.
- **Destructive:** Background `#dc2626`, text `#ffffff`. Hover state `#b91c1c`.
- **Ghost:** Background transparent, text `#475569`. Hover state `#f1f5f9` with text `#0f172a`.

### Badges & Status Chips
- **Tier 1 / Success:** Background `#ecfdf5`, border `1px solid #a7f3d0`, text `#065f46`.
- **SLA Alert / Warning:** Background `#fffbeb`, border `1px solid #fde68a`, text `#92400e`.
- **Risk / Rejection:** Background `#fef2f2`, border `1px solid #fecaca`, text `#991b1b`.
- **Neutral / Informational:** Background `#f1f5f9`, border `1px solid #e2e8f0`, text `#334155`.
- **Dimensions:** Height 20px, horizontal padding 6px, border radius 9999px, typography `label-sm`.

### Data Tables
- **Header:** Background `#f8fafc`, bottom border `1px solid #cbd5e1`, text `#475569`, font `label-md` (uppercase), height 36px.
- **Data Rows:** Background `#ffffff`, bottom border `1px solid #e2e8f0`, height 40px, hover fill `#f8fafc`.
- **Active / Selected Row:** Background `#eff6ff`, border-left `3px solid #2563eb`.

### Inputs & Form Controls
- **Text Inputs & Dropdowns:** Height 32px, background `#ffffff`, border `1px solid #cbd5e1`, font `body-md`. Focus ring: `2px solid #2563eb` with an offset of 0px. Placeholder text `#94a3b8`.
- **Checkboxes & Radios:** Size 14x14px, border `1px solid #94a3b8`, checked background `#2563eb`, checkmark white. Border radius: 2px for checkboxes, 50% for radios.

### Cards & Dossier Panels
- **Candidate Kanban Cards:** Background `#ffffff`, border `1px solid #e2e8f0`, padding `10px 12px`, border-radius 4px. Left indicator strip: 3px accent matching status (Emerald, Amber, Royal Blue, or Neutral Slate).
- **Candidate Profile Drawer:** Right-side slide-over panel, background `#ffffff`, border-left `1px solid #cbd5e1`, width 540px on standard desktop.

### Candidate Scorecard Matrix (Domain-Specific)
- **Rating Meter:** 5-segment horizontal bar measuring stage evaluations. Completed segments fill with `#059669` (passing) or `#dc2626` (below threshold). Empty segments use `#e2e8f0`.