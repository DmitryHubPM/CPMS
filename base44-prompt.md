# Base44 Prompt

Build a web app called **Clinical Budgeting and Project Management System**.

The app is a prototype for clinical research budgeting and project control. It must show that a clinical study budget is not only a spreadsheet. Each budget line is an expandable work unit that can be planned from high-level assumptions, then progressively detailed into country/site allocation, schedule, resource plan, evidence, payments, change orders, and earned value.

## Product Positioning

This is a clinical budgeting and project management prototype. It sits conceptually between:

- Budget builder
- Project management system
- CTMS planning layer
- TMF/evidence tracking concept
- Resource planning tool
- Cash flow and earned value analytics tool
- Contract/change order/OOS control tool

It is not a validated regulated system yet. All screens must show or include a clear disclaimer:

> Illustration only. This demo uses simplified, educational assumptions. Budget numbers, contract language, PM plan language, monitoring plan language, SOP placeholders, and protocol-derived data are not actual, not validated, and not suitable for contracting, regulatory, quality, or operational decision-making.

## Demo Scenario

Use a realistic dummy clinical trial scenario based on a public pneumonia protocol reference:

- Project name: Test Project - LEAP2 Pneumonia Protocol Demo
- Protocol: NAB-BC-3781-3102 / LEAP2 CABP
- Protocol source URL: https://dac-trials.org/wp-content/uploads/PNE-Pneumonia-2019-Alexander-LEAP2.pdf
- Design: Phase 3 randomized double-blind pneumonia study
- Demo assumptions: 738 subjects, approximately 160 centers, countries/sites TBD

Do not claim the budget numbers are real. Use realistic-looking but fictional assumptions.

## Core Concept

The budget is built from **Budget Units**.

Supported unit types for MVP:

- Visit
- Month
- Package
- Processing item

A budget unit should have:

- Unit name
- Phase
- Milestone
- Commercial source
- Unit type
- Number of units
- Location level
- Location name
- Start date
- End date
- Pass-through cost per unit
- Investigator grant per unit
- Role composition
- Generated schedule
- Completion and evidence records
- Payment status
- Cost summary

## Commercial Source Logic

Every budget line must include a dropdown:

- Contract Unit
- CO1
- CO2
- CO3
- OOS1
- OOS2
- OOS3

Default must be **Contract Unit**.

Definitions:

- Contract Unit: baseline contracted scope
- CO1/CO2/CO3: change order items
- OOS1/OOS2/OOS3: out-of-scope items not yet converted into approved change orders

Commercial source must appear in the budget report and document constructor.

## Main Dashboard

Build a polished dashboard, not a spreadsheet-only app.

At the top show:

- Project card
- Protocol source link
- Disclaimer
- Planning timeline split by Start-Up, Initiation, Maintenance, Follow-Up
- Budget Story card
- KPI cards:
  - Planned Budget
  - Labor Budget
  - Planned Hours
  - FTE Effort
  - Average FTE Need
  - Pass-through
  - Investigator Grants
  - Actual Cost
- Progress bars:
  - Scheduled
  - Completed
  - Evidence Filed
  - Paid by Sponsor

## Budget Grid

Main working table columns:

- Unit list
- Phase
- Milestone
- Commercial source
- Location
- Number of units
- Pass-through / unit
- Investigator grant / unit
- Start
- End
- Status
- Actions

Actions:

- Save
- Open
- Delete
- Split country

Budget grid rows must be editable.

When saved, a budget row becomes an expandable budget unit.

## Unit Catalog

Add an **Add Expandable Unit** button.

When clicked, show a dropdown catalog. Selecting a unit adds the full line at once with unit, phase, and milestone.

Include catalog examples:

- Protocol Review | Start-Up | Protocol Finalization
- Feasibility Assessment | Start-Up | Site Feasibility
- Site Selection Visit (SSV) | Start-Up | Site Selection
- Pre-Study Visit (PSV) | Start-Up | Site Selection
- Site Contract Negotiation | Start-Up | Site Contracting
- Regulatory Package Preparation | Start-Up | Regulatory Submission
- Ethics Committee Submission | Start-Up | Ethics Approval
- Health Authority Submission | Start-Up | Regulatory Approval
- Investigator Meeting | Initiation | Study Initiation
- Site Initiation Visit (SIV) | Initiation | Site Activation
- Database Build | Initiation | Database Setup
- CRF Design | Initiation | Database Setup
- User Acceptance Testing (UAT) | Initiation | System Validation
- Monitoring Visit | Maintenance | Site Monitoring
- Remote Monitoring Review | Maintenance | Central Monitoring
- Query Management | Maintenance | Data Cleaning
- CRF Page Review | Maintenance | Data Review
- SAE Processing | Maintenance | Safety Management
- Protocol Deviation Review | Maintenance | Compliance Review
- Vendor Oversight Meeting | Maintenance | Vendor Management
- Enrollment Tracking | Maintenance | Recruitment Oversight
- Data Reconciliation | Maintenance | Data Reconciliation
- Last Patient Last Visit (LPLV) Support | Closure | Study Closeout
- Database Lock (DB Lock) | Closure | Database Finalization
- Statistical Analysis | Closure | Final Analysis
- Clinical Study Report (CSR) | Closure | Study Reporting
- Close-Out Visit (COV) | Closure | Site Closure
- TMF Final Reconciliation | Closure | TMF Finalization
- Archiving Preparation | Closure | Study Archiving
- Long-Term Follow-Up Visit | Follow-Up | Follow-Up Monitoring
- Annual Safety Report | Follow-Up | Post-Study Safety Reporting

## Country And Site Drill-Down

The system must support progressive detail:

1. Start with one global line, for example 10 Monitoring Visits globally.
2. Later split into countries, for example:
   - France: 3
   - Switzerland: 3
   - Italy: 4
3. If the user allocates less than the global total, show the remainder as TBD Country.
4. For each country, allow site split.
5. If a country has 4 sites but only 1 site is known, show 3 as TBD Site.
6. Prevent or warn if country total exceeds global total.
7. Prevent or warn if site total exceeds country total.
8. Save country/site split and update schedules.

## Unit Drill-Down Tabs

Each unit card must include:

1. Detail Builder
2. Unit Composition
3. Duration & Schedule
4. Completion & Evidence
5. Payment Logic
6. Cost Summary

### Detail Builder

Show maturity ladders:

- Location: Global -> Region -> Country -> Site
- Staffing: Department -> Role -> Employee
- Timing: Date range -> Generated dates -> Exact dates
- Actuals: Planned -> Completed -> Validated -> Paid

Allow adding location allocations.
Allow assigning sample employees.

### Unit Composition

Editable role rows:

- Department
- Job role
- Function
- Employee name
- Hours per unit
- Hourly rate
- Milestone
- Assumption type: Default or Study-specific

If a default value is changed, mark it as Study-specific.

### Duration & Schedule

Fields:

- Start date
- End date
- Auto-generate schedule
- Planned date per unit instance
- Location per unit instance

Allow planned date overrides. If edited, mark as Study-specific schedule.

### Completion & Evidence

For each unit instance:

- Planned date
- Actual completion date/time
- Completed by
- Actual hours
- Evidence document type
- Evidence document status
- Proof link placeholder
- Validation status

Document types:

- Trip Report
- Action Plan
- CAPA
- SAE
- Other

Document statuses:

- Missing
- Draft
- Final
- Filed

Validation rule:

A completed unit is validated only when required evidence is attached and document status is Final or Filed.

Warnings:

- Completed but evidence missing
- Completed but document only Draft
- Actual hours exceed planned hours

### Payment Logic

For each completed unit show:

- Paid to investigator by CRO: Yes / No / Not applicable
- Paid to CRO by Sponsor: Yes / No / Not billable
- Payment trigger:
  - Completion only
  - Completion + document filed
  - Completion + sponsor approval
  - Manual approval

Warnings:

- Unit completed but evidence missing
- Unit paid but document not filed
- Investigator paid but sponsor reimbursement not received

### Cost Summary

Calculate:

- Unit planned labor cost
- Pass-through cost
- Investigator grant cost
- Total planned budget
- Actual cost
- Variance
- Validated cost
- Not validated cost
- Open exposure

Roll up by:

- Milestone
- Department
- Job role
- Month
- Completion status
- Payment status

## Top-Level Report Tabs

Create the following top-level tabs:

1. Plan
2. Budget
3. Resources
4. Cash Flow
5. Timesheets
6. Evidence
7. EVA
8. Contracts & Docs

### Budget Tab

Show:

- Budget by unit
- Commercial source
- Phase
- Milestone
- Units
- Hours
- FTE-months
- Labor / unit
- Pass-through / unit
- Grant / unit
- Total
- Rollups by phase and milestone

### Resources Tab

Show monthly resource schedule:

- Month
- Department
- Role
- Employee
- Hours
- FTE

### Cash Flow Tab

Show monthly cash flow split:

- Labor
- Pass-through
- Investigator grants
- Total

### Timesheets Tab

Generate planned timesheet rows:

- Date
- Unit
- Location
- Employee
- Role
- Planned hours
- Actual hours
- Status

### Evidence Tab

Show evidence and payment tracker:

- Unit
- Instance
- Date
- Location
- Completed
- Document type
- Document status
- Proof link
- Sponsor paid

### EVA Tab

Show earned value:

- Planned Value
- Earned Value
- Actual Cost
- SPI
- CPI
- Unit-level EVA table

### Contracts & Docs Tab

Create a document constructor with:

- Strong illustration-only disclaimer
- Contract / work order backbone between Muster Sponsor AG and Muster CRO GmbH
- Commercial summary from budget grid
- Change Order / OOS register
- Project Management Plan backbone
- Monitoring Plan backbone
- SOP / TMF placeholder list

Contract sections should include:

- Parties
- Protocol and project
- Scope of services
- Budget baseline
- Payment triggers
- Change control
- OOS tracking
- Evidence and TMF/eTMF records
- Governance and reporting
- Quality, audit rights, privacy, PV interfaces, termination, close-out

PM Plan sections should include:

- Study overview
- Governance
- Baseline plan
- Resource schedule
- Budget control
- Risk and issue management
- Reporting cadence
- Close-out

Monitoring Plan sections should include:

- Monitoring strategy
- Visit types
- Risk indicators
- Monitoring frequency
- Required evidence
- Payment and validation dependencies
- Escalation and inspection readiness

SOP/TMF placeholders should include:

- Budget Construction and Assumption Traceability SOP
- Change Order and Out-of-Scope Work Instruction
- Monitoring Visit Evidence and Trip Report Filing SOP
- Investigator Grant and Pass-Through Payment Control SOP
- Resource Planning, Timesheet, and Actual Hours Reconciliation SOP
- TMF/eTMF Document Index and Evidence Link Register

## UX Requirements

- Modern dashboard layout
- Cards, badges, tabs, progress bars
- Clear visual labels for default vs study-specific assumptions
- Clear warnings
- No backend required for MVP if Base44 uses local/demo state
- Use dummy data
- App must work immediately after launch
- Make it polished enough for a product demo
- Keep the app focused on the drill-down concept, not a full clinical trial system

## Future Direction

Design the model so it could later be mirrored in Excel and Power BI:

- Excel input tables for units and assumptions
- Power BI relational model for calculations
- Resource schedules
- Cost grids
- Completion schedules
- Timesheets
- Multi-project or multi-scenario support

Also design it so a future backend could add:

- Database persistence
- User roles
- Audit trail
- Document storage
- Electronic signatures
- Validation controls
- Protocol parsing with AI
