# VR Green ERP

> Enterprise Resource Planning website for an eco-friendly packaging MSME — replacing paper logs and spreadsheet chaos with a real-time, role-aware command center for the factory floor.

## Quick Facts

- **Client:** VR Green Private Limited (eco-friendly packaging startup, MSME, ISO 9001/22001/14000 certified)
- **Category:** UI/UX Design
- **Role:** Lead Product Designer
- **Timeline:** 4–6 weeks (2024–2025)
- **Industry:** Manufacturing / Sustainable Packaging
- **Status:** Live / Shipped

## The Problem

VR Green's factory operations were running on a patchwork of paper logs, spreadsheets, and ad-hoc semi-digital tools. As a young MSME scaling up production of compostable cups and bags, the cracks were widening:

- Inefficiencies and delays in task assignments
- No real-time monitoring of production, machines, or attendance
- Poor coordination between production, inventory, and HR
- Difficulty generating performance reports — leadership flying blind

For a sustainability-first business, the irony was sharp: paper-heavy operations managing eco-friendly products. The factory needed a single source of truth that matched the company's values.

## The Approach

### Research & Discovery
- **Stakeholder interviews** with plant managers, supervisors, and floor operators
- **Pain-point synthesis** — surfaced the lack of cross-department visibility, no centralized dashboard, and untrackable work orders/inventory
- **Competitor analysis** — studied Odoo, SAP, Acumatica, and Workday to map common ERP modules, dashboard patterns, and the rising bar around sustainability KPIs and mobile-first access

### User Personas
Designed for five distinct roles, each with very different tech comfort and goals:
1. **Ramesh — Production Floor Operator** (29, low–moderate tech). Needs simple, icon-driven task views.
2. **Priya — Floor Supervisor / Plant Manager** (38, moderate tech). Needs live KPIs, drag-and-drop reassignments, approvals.
3. **Amir — Inventory/Store Manager** (32, moderate–high tech). Needs accurate, alert-driven stock visibility across warehouses.
4. **Sunita — HR/Admin Officer** (41, moderate tech). Needs streamlined onboarding, attendance, compliance.
5. **Mr. Verma — Director/Owner** (45, moderate tech). Needs executive-level KPIs, mobile access, scheduled reports.

### Information Architecture
Mapped the system into ten focused modules:
- Dashboard — KPIs, targets, pending requests
- Orders — current orders, history, add/edit
- Productions — ongoing & history, batch control
- Manufacturing — assignments, machine/operator allocation
- Product Inventory — warehouse/floor view, item input/output
- Duty Roster — floor/shift allocation, supervisor & operator assignment
- Pending Requests — sign-in, leave, attendance approvals
- HR Portal — onboarding, directory, compliance
- Dispatch Log — shipment history, delivery status
- Admin Panel — site config, user roles, audit logs

### Wireframes → UI
Started on paper — quick sketches for Dashboard, Order Screen, Sign Up, and Forms. Iterated into high-fidelity screens once the IA stabilized.

## The Solution

A web-first ERP designed for a manufacturing floor — clean, dense where it needs to be, calm everywhere else.

**Key flows shipped:**
- **Dashboard** — Welcome strip, four KPI tiles (Recent Orders, Orders in Progress, Machines in Use, Operator Attendance), Daily Production Target donut, Pending Sign-In Requests with deny/approve, and a Recent Orders table with status pills.
- **Order Add flow** — Current Order list + side panel "Add New Order" with customer, address, product, variant, quantity, pricing, and description.
- **Production Add flow** — Filterable production table (priority, status, time period, status chips for Completed/Pending/Processing/Shipped/Delivered/Cancelled/Returned) plus a batch detail/edit panel.
- **Manufacturing Add flow** — Same filtering pattern, with Machine column and "Assign New Machine" form for operator/helper allocation.
- **Inventory** — Warehouse and finished-product views with reference order, variant, quantity, type, and "Add Item" panel.
- **Duty Roster** — Multi-block form for Floor Incharge, Supervisor (with floor/area/shift), and Machine Operator/Helper roles.
- **Sign Up onboarding** — 5-step employee onboarding (Personal Details → Address & Employment → Educational Qualifications → References → Document Uploads) with progress rail, including UAN/ESIC fields for Indian compliance.
- **Component system** — Sidebar variants (collapsed, expanded, with sub-items, dark theme), status chips, document upload state machine, table rows.

### Design System
- **Primary:** `#14AE5C` Industrial Green — sustainability and growth, aligned with VR Green's brand
- **Secondary:** `#0A1B2D` Deep Blue — neutral depth without the harshness of pure black
- **Neutrals:** `#1E1E1E`, `#D9D9D9`
- **Type:** Inter — open-source variable sans-serif chosen for clarity in data-heavy environments. Variations: Semi Bold, Medium, Regular. Sizes: 9pt, 7pt, 6pt.

## The Outcome

- Workers begin each day with clarity — assignments, targets, and shift status visible at a glance
- Bottlenecks and resource gaps surface in real time instead of in next week's report
- Inventory loss dropped and waste was curtailed — an ecological as much as economic win
- VR Green's sustainability values became visible inside the product itself, not just on the packaging

## Image Inventory

| # | Section | Description |
|---|---|---|
| 1 | Hero | Laptop mockup of the Dashboard on a green half-circle backdrop |
| 2 | Problem | Problem statement card (optional — can be text-only) |
| 3 | Research | Research & Discovery summary visual (optional) |
| 4 | Personas | Persona profile illustrations (5 personas) — optional gallery |
| 5 | IA | Information Architecture table screenshot |
| 6 | Wireframes | Gallery of 4 hand-drawn wireframes (Dashboard, Order, Sign Up, Forms) |
| 7 | Dashboard | Full-width Dashboard screen on green background |
| 8 | Orders | Order Add flow — list view + Add New Order panel (gallery, 2 cols) |
| 9 | Productions | Production Add flow — list + view/edit panel (gallery, 2 cols) |
| 10 | Manufacturing | Manufacturing Add flow — list + Add Machine panel (gallery, 2 cols) |
| 11 | Inventory | Product Inventory — warehouse table + Add Item panel (gallery, 2 cols) |
| 12 | Duty Roster | Duty Roster multi-section form |
| 13 | Onboarding | Sign Up wizard with progress rail |
| 14 | Components | Main Components board on dark background — sidebars, chips, upload, rows |
| 15 | Colors | Color palette card (Industrial Green, Deep Blue, greys) |
| 16 | Typography | Inter type specimen card |
| 17 | Closing | "Thank You" laptop mockup (optional) |

## Assets & Links

- Source PDF: VR Green Case Study.pdf (2025)
- Live URL: (to be added if available)
- Figma file: (to be added if available)

## Raw Notes

- Footer of every PDF page: "VR Green Private Limited 2025" — implies the case study was published/finalized in 2025 even if design work happened late 2024 (dashboard shows "11th November 2024").
- Brand context worth preserving in the intro: MSME, recognized by Department for Promotion of Industry and Internal Trade, ISO certifications, post-COVID sustainability narrative.
- The Indian-compliance details in the onboarding flow (UAN, ESIC, Aadhaar upload) are a strong proof-of-context detail — keep them.
- Dashboard donut + KPI tiles are the signature visual; lead with that as the hero.
- For the CMS version, I'd suggest replacing the PDF's repeated Research & Discovery slide with a single tighter section.
- Status chip set (Completed/Pending/Processing/Shipped/Delivered/Cancelled/Returned) is a nice component-system proof point — surface it explicitly in the Components section.
