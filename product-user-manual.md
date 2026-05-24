# Clinical Budgeting and Project Management System

## Product And User Manual

### Important Disclaimer

This document describes a prototype concept. The current application, demo data, protocol-derived assumptions, calculations, document text, monitoring plan text, contract language, SOP placeholders, and workflows are for illustration only. They are not validated, not regulatory-ready, not legal advice, and not suitable for contracting, clinical operations, quality decisions, or financial reporting without full professional review, implementation controls, and validation.

---

## 1. What The System Is

The Clinical Budgeting and Project Management System is a protocol-driven planning and execution platform for clinical studies.

It starts where clinical trial planning usually starts: with a protocol, a study design, expected subjects, sites, visits, procedures, monitoring assumptions, and operational milestones. Instead of turning those assumptions into a static spreadsheet, the system converts them into structured work units that can be budgeted, scheduled, staffed, completed, evidenced, billed, and monitored.

The core product idea is simple:

> A clinical trial budget should not be a flat spreadsheet. It should be an operational model of the study.

Each budget line becomes an expandable unit. A unit can represent a monitoring visit, site initiation visit, subject visit, data review activity, safety process, start-up package, month of project management, or another clinical operation. The unit can then be drilled down into location, role composition, schedule, evidence, workflow, payment, and performance.

The system is intended to become a unified layer across:

- clinical budgeting
- project management
- study start-up planning
- resource planning
- site and country allocation
- monitoring and SDV/SDR workload
- evidence and document tracking
- investigator grants and pass-throughs
- CRO labor and timesheets
- billing and sponsor reimbursement
- change order and out-of-scope control
- earned value and performance reporting

The current prototype demonstrates the operating model. A production version would require persistence, permissions, validation, audit trail, document storage, integrations, and regulated-system controls.

---

## 2. Why It Exists

Clinical studies are usually planned and managed across many disconnected tools:

- budget spreadsheets
- project plans
- CTMS records
- EDC data
- IRT data
- TMF or eTMF systems
- safety databases
- payment trackers
- email threads
- resource plans
- change order logs
- status reports
- PowerPoint dashboards

This creates repeated setup and constant reconciliation. The same study assumptions are re-entered in different places. The same visit or site event may affect budget, monitoring, data review, evidence, payment, resource demand, and performance reporting, but those impacts are often tracked separately.

The result is operational friction:

- budgets are hard to connect to actual work
- actual hours are hard to compare with planned assumptions
- evidence is chased by email
- site payment triggers are unclear
- completed work may not be billable because documents are missing
- sponsor reimbursement may lag investigator payment
- change orders are discovered late
- resource needs are not visible early enough
- study performance is reported after the fact

This system exists to connect those pieces through one model.

The product thesis is:

> One protocol setup should drive budget, schedule, work, evidence, payment, resource planning, and performance metrics.

That does not necessarily mean replacing every clinical system immediately. A practical version can start as the planning and control layer around existing systems, then expand into integrations or native modules over time.

---

## 3. Clinical Budgeting Workflow

The budgeting workflow begins with protocol interpretation.

The user identifies the clinical operations that drive cost:

- site start-up packages
- investigator meetings
- site initiation visits
- subject visits
- monitoring visits
- remote monitoring reviews
- CRF review
- query management
- SAE processing
- protocol deviation review
- CAPA follow-up
- project management months
- data management months
- medical monitoring months
- close-out activities
- statistical analysis and CSR activities

Each activity becomes a budget unit.

For each budget unit, the user defines:

- unit name
- unit type
- phase
- milestone
- number of units
- commercial source
- start and end dates
- location assumption
- labor composition
- pass-through cost
- investigator grant amount

The system calculates:

- planned labor cost per unit
- planned labor total
- pass-through total
- investigator grant total
- total planned budget
- planned hours
- FTE months
- FTE years
- open exposure

The important distinction is that the budget is not only a number. It becomes the first version of the operational plan.

---

## 4. Study Setup Workflow

A new study should begin with a clean study record.

Study-level fields should include:

- study name
- protocol name
- protocol number
- indication
- study phase
- sponsor
- CRO
- planned subjects
- planned countries
- planned sites
- planned start date
- planned end date
- currency
- status
- assumptions and disclaimer

Once saved, the study becomes the parent object for all downstream data.

All budget units, country splits, site splits, schedules, composition rows, sub-units, evidence, payments, timesheets, and reports must belong to the active study. This is essential. If units are stored globally instead of under a study, reports will mix data from different studies and become unreliable.

The correct structure is:

```text
Study
  Budget Unit
    Composition
    Location Allocation
    Schedule Instance
    Sub-unit
      Workflow Step
      Evidence Link
      Payment Impact
```

For users and implementation teams, this is important because it shows the system can support multiple studies, multiple scenarios, and eventually a portfolio view.

---

## 5. Planning Budget Units

Budget units are the main planning object.

A unit can be simple at first:

```text
Monitoring Visit
10 units
Global
8 CRA hours per unit
1 PM hour per unit
900 pass-through per unit
```

Later, the same unit can be detailed:

```text
Monitoring Visit
10 units
France: 3
Switzerland: 3
Italy: 4
Exact planned visit dates
Assigned CRA and PM
Trip report evidence
Payment trigger
Actual hours
```

This supports a realistic clinical planning process. At the beginning of a study, countries and sites may not be known. Later, details arrive gradually. The system should not force all details upfront. It should allow progressive refinement.

Each unit can include role rows:

- department
- role
- function
- employee name
- hours per unit
- hourly rate
- milestone
- assumption type

Default assumptions can be overwritten. When overwritten, the field should be marked as study-specific.

---

## 6. Country And Site Split

Clinical study budgets often start globally.

Example:

```text
10 monitoring visits globally
```

Later, the plan becomes more specific:

```text
France: 3 visits
Switzerland: 3 visits
Italy: 4 visits
```

The system should reconcile totals:

```text
Global total: 10
Country total: 10
Status: matched
```

If details are incomplete, the system should preserve the unknown remainder:

```text
Global total: 10
France: 3
Switzerland: 3
Known total: 6
TBD Country: 4
```

The same principle applies to sites:

```text
Italy: 4 sites
Known site: IT-001
TBD Site: 3
```

This is a strong design pattern because it reflects how clinical studies are actually planned. The model can begin with assumptions and become more exact over time without losing reconciliation.

---

## 7. Resource Planning

Resource planning is generated from budget unit composition and schedules.

If a monitoring visit requires:

- CRA II: 8 hours
- Project Manager: 1 hour

and there are 10 visits, the planned effort is:

```text
CRA II: 80 hours
Project Manager: 10 hours
Total: 90 hours
```

The system can convert hours into FTE:

```text
FTE months = planned hours / 160
FTE years = planned hours / 1920
```

The resource schedule should show:

- month
- department
- role
- employee
- planned hours
- actual hours
- FTE
- workload by study
- workload by country or site

This helps answer project leadership and management questions:

- How many people are needed?
- When are they needed?
- Which roles are overloaded?
- How does a protocol change affect staffing?
- How does delayed site activation shift demand?

In a mature system, this can become a resource forecasting engine across studies.

---

## 8. Actuals And Evidence

The system should not stop at planning. It should track actual execution.

For each scheduled unit instance, the user can record:

- completed or not completed
- actual completion date and time
- completed by
- actual hours
- evidence document type
- evidence status
- proof link
- validation status

Evidence may be:

- TMF document
- non-TMF operational document
- EDC reference
- IRT reference
- CTMS record
- SharePoint or Drive link
- invoice reference
- payment record

The system should not assume all evidence is uploaded directly. In many real organizations, the system should store a reference to the system of record.

Validation rule:

```text
A completed unit is validated only when required evidence exists and the evidence status is Final or Filed.
```

Warnings should appear when:

- a unit is completed but evidence is missing
- a document is still Draft
- actual hours exceed planned hours
- a payment is marked paid but evidence is not filed
- investigator payment was made but sponsor reimbursement is missing

This converts email follow-up into structured workflow.

---

## 9. Billing And Payment

Clinical study cost control often fails because work completion, evidence, investigator payment, sponsor reimbursement, and invoicing are managed separately.

The system should connect them.

For each unit or sub-unit, the system can track:

- whether it is billable
- payment trigger
- investigator payment status
- CRO billing status
- sponsor reimbursement status
- pass-through support
- change order or OOS impact

Payment triggers may include:

- completion only
- completion plus document filed
- completion plus sponsor approval
- manual approval

Example:

```text
Monitoring Visit 1
Completed: Yes
Trip Report: Filed
Paid to investigator: Not applicable
Paid to CRO by Sponsor: Yes
Status: validated and billable
```

Example warning:

```text
Monitoring Visit 2
Completed: Yes
Trip Report: Draft
Paid to investigator: Yes
Paid to CRO by Sponsor: No
Warning: investigator paid but sponsor reimbursement not received
Warning: document not filed
```

This creates a bridge between operations and finance.

---

## 10. EVA And Performance

Earned Value Analysis, or EVA, helps compare plan, completion, and actual cost.

The system can calculate:

- Planned Value
- Earned Value
- Actual Cost
- Schedule Performance Index
- Cost Performance Index

Basic definitions:

```text
Planned Value = budgeted value of work planned by the data date
Earned Value = budgeted value of validated work completed
Actual Cost = actual cost recorded for completed work
SPI = Earned Value / Planned Value
CPI = Earned Value / Actual Cost
```

This is powerful for clinical studies because many activities are completed operationally but not yet validated or billable. EVA can show that distinction.

Example:

```text
A visit is completed, but the trip report is not filed.
Operational status: completed
Validation status: pending evidence
Earned value: not fully earned
Billing status: not ready
```

This gives sponsors, CROs, and project leaders an earlier view of risk.

---

## 11. Contract, Change Order, And OOS

Every budget unit should have a commercial source:

- Contract Unit
- CO1
- CO2
- CO3
- OOS1
- OOS2
- OOS3

Contract Unit means the work is included in the baseline contract.

CO means the work is part of an approved or planned change order.

OOS means the work is out of scope and has not yet been converted to a change order.

This is important because study teams often perform work before the commercial status is clear. The system can make that visible.

The Contracts & Docs module should generate or support:

- contract/work order backbone
- commercial budget summary
- change order register
- OOS register
- PM plan outline
- monitoring plan outline
- SOP and TMF placeholder list

The goal is not to auto-generate final legal documents. The goal is to connect commercial documents to the live budget and operational model.

---

## 12. End-To-End Demo Scenario

The following scenario can be used for product demos, user training, and functional testing.

### Step 1: Create Study

Create a new study:

```text
Study name: My Test Study
Protocol: Test Protocol
Phase: Phase 3
Planned subjects: 100
Planned sites: 10
Start date: 2026-01-01
End date: 2026-12-31
```

Save the study.

Expected result:

- dashboard header shows My Test Study
- study appears in study selector
- study remains after refresh

### Step 2: Add Budget Unit

Add unit:

```text
Unit name: Monitoring Visit
Unit type: Visit
Number of units: 10
Commercial source: Contract Unit
Phase: Maintenance
Milestone: Site Monitoring
Start date: 2026-02-01
End date: 2026-11-30
Pass-through per unit: 900
Investigator grant per unit: 0
```

Add composition:

```text
CRA II: 8 hours at 100/hour
Project Manager: 1 hour at 150/hour
```

Expected calculation:

```text
Labor per unit = 950
Total labor = 9,500
Pass-through total = 9,000
Grant total = 0
Total planned budget = 18,500
Planned hours = 90
FTE months = 0.56
```

### Step 3: Split Countries

Split the 10 visits:

```text
France: 3
Switzerland: 3
Italy: 4
```

Expected result:

```text
Country total = 10
Global total = 10
No reconciliation error
```

### Step 4: Assign Employees

Assign:

```text
CRA II = Maya Chen
Project Manager = Jonas Keller
```

Save employee assignments.

Expected result:

- assignments remain after refresh
- resource schedule uses assigned employees

### Step 5: Generate Schedule

Generate planned visit dates between February 2026 and November 2026.

Override at least three planned dates manually.

Expected result:

- default generated dates are visible
- overridden dates are marked study-specific
- schedule remains after save and refresh

### Step 6: Update Actuals

Mark two visits completed.

Visit 1:

```text
Completed by: Maya Chen
Actual hours: 9
Trip Report: Filed
```

Visit 2:

```text
Completed by: Maya Chen
Actual hours: 8
Trip Report: Draft
```

Expected result:

- completed count = 2
- evidence filed count = 1
- Visit 1 is validated
- Visit 2 is pending evidence
- warning appears for Draft evidence
- actual cost updates

### Step 7: Update Billing

Visit 1:

```text
Paid to investigator by CRO: Yes
Paid to CRO by Sponsor: Yes
Payment trigger: Completion + document filed
```

Visit 2:

```text
Paid to investigator by CRO: Yes
Paid to CRO by Sponsor: No
Payment trigger: Completion + document filed
```

Expected result:

- sponsor paid count = 1
- warning appears for investigator paid but sponsor reimbursement not received
- payment status remains after save and refresh

### Step 8: Review Reports

Open:

- Budget
- Resources
- Cash Flow
- Timesheets
- Evidence
- EVA
- Contracts & Docs

Expected result:

- all reports show only My Test Study
- demo study data does not mix into the new study
- calculations remain traceable

---

## 13. Future Development Roadmap

### Phase 1: Working Demonstrator

Goal: show the concept clearly.

Capabilities:

- study creation
- study persistence
- budget units
- country/site split
- composition and cost calculations
- resource schedule
- evidence tracker
- payment tracker
- EVA
- document backbones

### Phase 2: Persistent Multi-Study Application

Goal: make the prototype usable for repeated demos and early pilots.

Capabilities:

- database persistence
- user-created studies
- scenario versions
- import/export
- improved validation
- audit-friendly change history
- manual and help system

### Phase 3: Workflow And Evidence Layer

Goal: reduce email and manual reconciliation.

Capabilities:

- sub-units
- workflow steps
- owners and due dates
- TMF and non-TMF evidence
- system references
- status approvals
- escalation rules

### Phase 4: Protocol Schedule Of Activities Engine

Goal: convert protocol structure into operational and financial consequences.

Capabilities:

- visit schedule
- procedures
- labs
- drug administration
- CRF pages
- SDV/SDR workload
- safety review
- deviation and CAPA triggers

### Phase 5: Integrations

Goal: connect to systems of record.

Potential integrations:

- EDC
- IRT
- CTMS
- eTMF
- safety database
- finance and invoicing
- HR/resource planning
- document management

### Phase 6: Regulated Enterprise Platform

Goal: become production-ready for clinical operations.

Required capabilities:

- authentication
- role-based access
- audit trail
- data integrity controls
- electronic signatures where required
- validation package
- SOP alignment
- backup and recovery
- security review
- privacy controls
- inspection readiness

---

## 14. Prototype Links And References

### Prototype Implementations

1. Codex prototype: https://dmitryhubpm.github.io/CPMS/
2. Base44 prototype: https://clinico-plan-pro.base44.app/

### Public Protocol Reference

The following publicly available protocol document is referenced solely for educational and illustrative prototype purposes. No affiliation, endorsement, validation, or operational use is implied.

LEAP2 Pneumonia Protocol: https://dac-trials.org/wp-content/uploads/PNE-Pneumonia-2019-Alexander-LEAP2.pdf

### Related Publications

1. Exploring AI-H Budgeting Framework for Clinical Trial Financial Feasibility: A Conceptual Analysis  
   https://doi.org/10.5281/zenodo.15651378

2. Clinical Project Management Systems (CPMS): A Project-Centric Reframing of Trial Operations  
   https://doi.org/10.5281/zenodo.17924337

3. Some Aspects of Digitalization and Digital Transformation in Clinical Research: Bridging TMF Completeness, Work Delivery, and Financial Recognition for Data Quality, Audit Readiness, and Financial Integrity  
   https://doi.org/10.5281/zenodo.16418598

These publications provide conceptual background for the prototype's approach to protocol-driven budgeting, project control, evidence tracking, and financial recognition.

---

## Product Summary

The opportunity is to replace fragmented clinical study planning and reconciliation with a unified protocol-driven operating model.

The system does not need to replace every enterprise platform immediately. It can begin as the layer that connects budget, work, evidence, payment, and performance. Over time, it can expand into integrations and selected native modules.

The core value proposition is:

> Plan once. Execute from the same model. Track actuals, evidence, payments, and performance without rebuilding the study in separate systems.

This is a practical and scalable direction because it starts with a painful, visible business problem: clinical budgets are disconnected from the work they are supposed to fund and control.
