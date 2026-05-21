const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const wholeNumber = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });
const oneDecimal = new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 });
const app = document.querySelector("#app");
const commercialSources = ["Contract Unit", "CO1", "CO2", "CO3", "OOS1", "OOS2", "OOS3"];

const defaultUnit = {
  unitName: "Monitoring Visit",
  unitType: "Visit",
  numberOfUnits: 10,
  milestone: "Site Monitoring",
  defaultAssumptionEnabled: true
};

const defaultComposition = [
  {
    department: "Clinical Operations",
    jobRole: "CRA II",
    function: "Monitoring",
    employeeName: "Not assigned",
    hoursPerUnit: 8,
    hourlyRate: 100,
    milestone: "Site Monitoring"
  },
  {
    department: "Clinical Operations",
    jobRole: "Project Manager",
    function: "Oversight",
    employeeName: "Not assigned",
    hoursPerUnit: 1,
    hourlyRate: 150,
    milestone: "Site Monitoring"
  },
  {
    department: "Clinical Operations",
    jobRole: "CTA",
    function: "Documentation",
    employeeName: "Not assigned",
    hoursPerUnit: 0.5,
    hourlyRate: 70,
    milestone: "Site Monitoring"
  }
];

const project = {
  name: "Test Project - LEAP2 Pneumonia Protocol Demo",
  protocol: "NAB-BC-3781-3102 / LEAP2 CABP",
  protocolUrl: "https://dac-trials.org/wp-content/uploads/PNE-Pneumonia-2019-Alexander-LEAP2.pdf",
  design: "Phase 3 randomized double-blind pneumonia study",
  assumptions: "738 subjects, approximately 160 centers, countries/sites TBD",
  disclaimer: "Illustration only. This demo uses simplified, educational assumptions. Budget numbers are not actual study costs, not validated, and not suitable for contracting, forecasting, or operational decision-making."
};

const demoBudgetDefinitions = [
  {
    unitName: "Site Start-Up Package",
    phase: "Start-Up",
    milestone: "Site Activation",
    numberOfUnits: 160,
    startDate: "2025-01-15",
    endDate: "2025-06-30",
    passThroughCostPerUnit: 850,
    investigatorGrantPerUnit: 0,
    roles: [
      ["Clinical Operations", "Study Start-Up Lead", "Site activation", 10, 150],
      ["Regulatory", "Regulatory Specialist", "Submission package", 14, 120],
      ["Clinical Operations", "Contracts & Budget Manager", "Site contract and budget", 8, 135],
      ["Clinical Operations", "CTA", "Document collection", 5, 75]
    ]
  },
  {
    unitName: "Site Initiation Visit (SIV)",
    phase: "Initiation",
    milestone: "Site Activation",
    numberOfUnits: 160,
    startDate: "2025-03-01",
    endDate: "2025-08-31",
    passThroughCostPerUnit: 1200,
    investigatorGrantPerUnit: 1500,
    roles: [
      ["Clinical Operations", "CRA II", "Initiation visit preparation, delivery, report", 16, 115],
      ["Clinical Operations", "Project Manager", "Oversight", 3, 160],
      ["Clinical Operations", "Clinical Trial Manager", "Activation oversight", 2, 140],
      ["Clinical Operations", "CTA", "Follow-up documentation", 2, 80]
    ]
  },
  {
    unitName: "Screening/Baseline Visit",
    phase: "Maintenance",
    milestone: "Subject Visit - Screening/Baseline",
    numberOfUnits: 738,
    startDate: "2025-04-01",
    endDate: "2026-03-31",
    passThroughCostPerUnit: 320,
    investigatorGrantPerUnit: 900,
    roles: [
      ["Data Management", "Clinical Data Manager", "eCRF review", 0.35, 115],
      ["Clinical Operations", "CRA II", "Source/SDV oversight", 0.25, 100],
      ["Medical", "Medical Monitor", "Eligibility review", 0.1, 180]
    ]
  },
  {
    unitName: "Day 4 / 96h ECR Safety-PK Visit",
    phase: "Maintenance",
    milestone: "Subject Visit - Day 4 / ECR",
    numberOfUnits: 738,
    startDate: "2025-04-04",
    endDate: "2026-04-10",
    passThroughCostPerUnit: 260,
    investigatorGrantPerUnit: 650,
    roles: [
      ["Data Management", "Clinical Data Manager", "ECR data review", 0.3, 115],
      ["Clinical Operations", "CRA II", "Visit oversight", 0.2, 100],
      ["Safety", "Safety Physician", "Safety review", 0.05, 180]
    ]
  },
  {
    unitName: "End of Treatment (EOT) Visit",
    phase: "Maintenance",
    milestone: "Subject Visit - EOT",
    numberOfUnits: 738,
    startDate: "2025-04-08",
    endDate: "2026-04-20",
    passThroughCostPerUnit: 150,
    investigatorGrantPerUnit: 520,
    roles: [
      ["Data Management", "Clinical Data Manager", "EOT data review", 0.3, 115],
      ["Clinical Operations", "CRA II", "Query follow-up", 0.2, 100]
    ]
  },
  {
    unitName: "Test of Cure (TOC) Visit",
    phase: "Maintenance",
    milestone: "Subject Visit - TOC",
    numberOfUnits: 738,
    startDate: "2025-04-15",
    endDate: "2026-05-10",
    passThroughCostPerUnit: 130,
    investigatorGrantPerUnit: 500,
    roles: [
      ["Data Management", "Clinical Data Manager", "TOC endpoint review", 0.4, 115],
      ["Medical", "Medical Monitor", "Clinical response review", 0.1, 180]
    ]
  },
  {
    unitName: "Late Follow-Up (LFU) Visit",
    phase: "Follow-Up",
    milestone: "Subject Visit - LFU",
    numberOfUnits: 738,
    startDate: "2025-05-01",
    endDate: "2026-06-10",
    passThroughCostPerUnit: 75,
    investigatorGrantPerUnit: 300,
    roles: [
      ["Data Management", "Clinical Data Manager", "LFU data review", 0.25, 115],
      ["Clinical Operations", "CRA II", "Follow-up tracking", 0.15, 100]
    ]
  },
  {
    unitName: "Monitoring Visit",
    phase: "Maintenance",
    milestone: "Site Monitoring",
    numberOfUnits: 480,
    startDate: "2025-04-01",
    endDate: "2026-06-30",
    passThroughCostPerUnit: 900,
    investigatorGrantPerUnit: 0,
    roles: [
      ["Clinical Operations", "CRA II", "Preparation, visit, follow-up, trip report", 20, 115],
      ["Clinical Operations", "Project Manager", "Oversight", 2, 160],
      ["Clinical Operations", "CTA", "Trip report QC and filing", 1.5, 80]
    ]
  },
  {
    unitName: "SAE Processing",
    phase: "Maintenance",
    milestone: "Safety Management",
    numberOfUnits: 50,
    startDate: "2025-04-01",
    endDate: "2026-06-30",
    passThroughCostPerUnit: 50,
    investigatorGrantPerUnit: 0,
    roles: [
      ["Safety", "Drug Safety Specialist", "SAE case processing", 3, 120],
      ["Medical", "Medical Monitor", "Medical review", 1, 180]
    ]
  },
  {
    unitName: "Data Cleaning / Query Management",
    phase: "Maintenance",
    milestone: "Data Cleaning",
    numberOfUnits: 738,
    startDate: "2025-04-01",
    endDate: "2026-07-15",
    passThroughCostPerUnit: 0,
    investigatorGrantPerUnit: 0,
    roles: [
      ["Data Management", "Clinical Data Manager", "Query review", 0.8, 115],
      ["Clinical Operations", "CRA II", "Site query follow-up", 0.2, 100]
    ]
  },
  {
    unitName: "Project Management Month",
    phase: "Maintenance",
    milestone: "Study Management",
    numberOfUnits: 18,
    startDate: "2025-01-01",
    endDate: "2026-06-30",
    passThroughCostPerUnit: 0,
    investigatorGrantPerUnit: 0,
    roles: [
      ["Clinical Operations", "Project Director", "Executive oversight", 40, 195],
      ["Clinical Operations", "Project Manager", "Study management", 160, 160],
      ["Clinical Operations", "Clinical Trial Manager", "Country/site oversight", 180, 140],
      ["Clinical Operations", "CTA", "Operations support", 160, 80],
      ["Clinical Operations", "Vendor Manager", "Vendor oversight", 60, 125],
      ["Finance", "Site Payments Analyst", "Grant and pass-through control", 40, 95]
    ]
  },
  {
    unitName: "Medical Monitoring Month",
    phase: "Maintenance",
    milestone: "Medical Oversight",
    numberOfUnits: 18,
    startDate: "2025-01-01",
    endDate: "2026-06-30",
    passThroughCostPerUnit: 0,
    investigatorGrantPerUnit: 0,
    roles: [
      ["Medical", "Medical Monitor", "Eligibility and safety oversight", 80, 185],
      ["Safety", "Safety Physician", "Safety signal review", 40, 185],
      ["Safety", "Drug Safety Specialist", "Safety operations", 80, 125]
    ]
  },
  {
    unitName: "Data Management Month",
    phase: "Maintenance",
    milestone: "Data Management",
    numberOfUnits: 18,
    startDate: "2025-01-01",
    endDate: "2026-07-31",
    passThroughCostPerUnit: 0,
    investigatorGrantPerUnit: 0,
    roles: [
      ["Data Management", "Clinical Data Manager", "Data review and cleaning", 160, 120],
      ["Data Management", "Database Programmer", "Edit checks and listings", 80, 125],
      ["Data Management", "Data Coordinator", "Reconciliation support", 120, 80],
      ["Data Management", "Clinical Data Reviewer", "Listing and query review", 120, 95]
    ]
  },
  {
    unitName: "Database Build",
    phase: "Initiation",
    milestone: "Database Setup",
    numberOfUnits: 1,
    startDate: "2025-01-15",
    endDate: "2025-03-31",
    passThroughCostPerUnit: 35000,
    investigatorGrantPerUnit: 0,
    roles: [
      ["Data Management", "Database Programmer", "EDC build", 180, 120],
      ["Data Management", "Clinical Data Manager", "Specification review", 100, 115],
      ["Clinical Operations", "Project Manager", "Build oversight", 30, 150]
    ]
  },
  {
    unitName: "CRF Design and UAT",
    phase: "Initiation",
    milestone: "System Validation",
    numberOfUnits: 1,
    startDate: "2025-02-01",
    endDate: "2025-04-15",
    passThroughCostPerUnit: 10000,
    investigatorGrantPerUnit: 0,
    roles: [
      ["Data Management", "Clinical Data Manager", "CRF design", 120, 115],
      ["Data Management", "Database Programmer", "UAT support", 80, 120],
      ["Clinical Operations", "CRA II", "Operational UAT", 30, 100]
    ]
  },
  {
    unitName: "Statistical Analysis and CSR",
    phase: "Follow-Up",
    milestone: "Final Analysis and Reporting",
    numberOfUnits: 1,
    startDate: "2026-05-15",
    endDate: "2026-09-30",
    passThroughCostPerUnit: 25000,
    investigatorGrantPerUnit: 0,
    roles: [
      ["Biostatistics", "Biostatistician", "Final analysis", 220, 160],
      ["Programming", "Statistical Programmer", "Tables/listings/figures", 260, 135],
      ["Medical Writing", "Medical Writer", "CSR authoring", 220, 145],
      ["Medical", "Medical Monitor", "Clinical interpretation", 50, 180]
    ]
  }
];

const sampleCatalog = [
  ["Protocol Review", "Start-Up", "Protocol Finalization"],
  ["Feasibility Assessment", "Start-Up", "Site Feasibility"],
  ["Site Selection Visit (SSV)", "Start-Up", "Site Selection"],
  ["Pre-Study Visit (PSV)", "Start-Up", "Site Selection"],
  ["Confidential Disclosure Agreement (CDA)", "Start-Up", "Site Contracting"],
  ["Site Contract Negotiation", "Start-Up", "Site Contracting"],
  ["Budget Negotiation", "Start-Up", "Site Contracting"],
  ["Regulatory Package Preparation", "Start-Up", "Regulatory Submission"],
  ["Ethics Committee Submission", "Start-Up", "Ethics Approval"],
  ["Health Authority Submission", "Start-Up", "Regulatory Approval"],
  ["Investigator Meeting", "Initiation", "Study Initiation"],
  ["Site Initiation Visit (SIV)", "Initiation", "Site Activation"],
  ["EDC User Setup", "Initiation", "System Setup"],
  ["Database Build", "Initiation", "Database Setup"],
  ["CRF Design", "Initiation", "Database Setup"],
  ["User Acceptance Testing (UAT)", "Initiation", "System Validation"],
  ["Randomization Setup", "Initiation", "IRT Configuration"],
  ["First Patient In (FPI) Support", "Initiation", "Enrollment Start"],
  ["Monitoring Visit", "Maintenance", "Site Monitoring"],
  ["Remote Monitoring Review", "Maintenance", "Central Monitoring"],
  ["Query Management", "Maintenance", "Data Cleaning"],
  ["CRF Page Review", "Maintenance", "Data Review"],
  ["SAE Processing", "Maintenance", "Safety Management"],
  ["Protocol Deviation Review", "Maintenance", "Compliance Review"],
  ["Interim Analysis", "Maintenance", "Interim Analysis"],
  ["DSMB Preparation", "Maintenance", "Safety Review Board"],
  ["Vendor Oversight Meeting", "Maintenance", "Vendor Management"],
  ["Enrollment Tracking", "Maintenance", "Recruitment Oversight"],
  ["Data Reconciliation", "Maintenance", "Data Reconciliation"],
  ["Last Patient Last Visit (LPLV) Support", "Closure", "Study Closeout"],
  ["Database Lock (DB Lock)", "Closure", "Database Finalization"],
  ["Statistical Analysis", "Closure", "Final Analysis"],
  ["Clinical Study Report (CSR)", "Closure", "Study Reporting"],
  ["Close-Out Visit (COV)", "Closure", "Site Closure"],
  ["TMF Final Reconciliation", "Closure", "TMF Finalization"],
  ["Archiving Preparation", "Closure", "Study Archiving"],
  ["Long-Term Follow-Up Visit", "Follow-Up", "Follow-Up Monitoring"],
  ["Survival Follow-Up Call", "Follow-Up", "Survival Follow-Up"],
  ["Annual Safety Report", "Follow-Up", "Post-Study Safety Reporting"],
  ["Study Pause Risk Review", "Pause", "Enrollment Pause Review"],
  ["CAPA Investigation", "Pause", "Corrective Actions"],
  ["Audit Response Management", "Pause", "Audit Remediation"],
  ["Re-Activation Readiness Review", "Pause", "Study Restart"]
].map(([unit, phase, milestone]) => ({ unit, phase, milestone }));

function initialBudgetRows() {
  return demoBudgetDefinitions.map((item, index) => ({
    id: `budget-row-${index + 1}`,
    unitId: `unit-${index + 1}`,
    unitName: item.unitName,
    phase: item.phase,
    milestone: item.milestone,
    numberOfUnits: item.numberOfUnits,
    passThroughCostPerUnit: item.passThroughCostPerUnit,
    investigatorGrantPerUnit: item.investigatorGrantPerUnit,
    startDate: item.startDate,
    endDate: item.endDate,
    commercialSource: "Contract Unit",
    locationLevel: "Global",
    locationName: "Global",
    splitOpen: false,
    splits: [],
    dirty: false
  }));
}

function roleComposition(roles, milestone) {
  return roles.map(([department, jobRole, roleFunction, hoursPerUnit, hourlyRate]) => ({
    id: uid("role"),
    department,
    jobRole,
    function: roleFunction,
    employeeName: "Not assigned",
    hoursPerUnit,
    hourlyRate,
    milestone,
    assumptionType: "Default"
  }));
}

function protocolUnit(definition, index) {
  const unit = {
    id: `unit-${index + 1}`,
    unitName: definition.unitName,
    unitType: definition.unitName.includes("Package") || definition.unitName.includes("Processing") || definition.unitName.includes("Management") ? "Month" : "Visit",
    numberOfUnits: definition.numberOfUnits,
    milestone: definition.milestone,
    phase: definition.phase,
    locationLevel: "Global",
    locationName: "Global",
    locationAllocations: [{ id: `loc-${index + 1}`, level: "Global", name: "Global", units: definition.numberOfUnits, assumptionType: "Default" }],
    passThroughCostPerUnit: definition.passThroughCostPerUnit,
    investigatorGrantPerUnit: definition.investigatorGrantPerUnit,
    commercialSource: "Contract Unit",
    defaultAssumptionEnabled: true,
    composition: roleComposition(definition.roles, definition.milestone),
    schedule: [],
    activeTab: "detail",
    expanded: index === 0
  };
  generateSchedule(unit, definition.startDate, definition.endDate);
  unit.schedule.slice(0, index === 0 ? 20 : 0).forEach((item, itemIndex) => {
    item.completion.completed = itemIndex < 8;
    item.completion.actualCompletionDateTime = itemIndex < 8 ? `${item.plannedDate}T16:00` : "";
    item.completion.completedBy = itemIndex < 8 ? "Maya Chen" : "";
    item.completion.actualHours = itemIndex < 8 ? plannedHours(unit) : 0;
    item.completion.evidenceDocuments[0].status = itemIndex < 5 ? "Filed" : itemIndex < 8 ? "Draft" : "Missing";
    item.completion.evidenceDocuments[0].link = itemIndex < 5 ? "https://example.com/tmf-placeholder" : "";
    item.payment.paidToInvestigatorByCro = itemIndex < 6 ? "Yes" : "No";
    item.payment.paidToCroBySponsor = itemIndex < 4 ? "Yes" : "No";
    recomputeValidation(item);
  });
  return unit;
}

let state = {
  project,
  activeView: "plan",
  selectedUnitId: "unit-1",
  draft: { ...defaultUnit },
  catalogPick: "Remote Monitoring Review",
  showAddMenu: false,
  budgetRows: initialBudgetRows(),
  units: demoBudgetDefinitions.map(protocolUnit)
};

function uid(prefix) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

function instance(index, plannedDate, scheduleAssumptionType, completed, actualCompletionDateTime, completedBy, actualHours, docStatus, croPaid, sponsorPaid) {
  return {
    id: `visit-${index}`,
    index,
    plannedDate,
    scheduleAssumptionType,
    completion: {
      completed,
      actualCompletionDateTime,
      completedBy,
      actualHours,
      evidenceDocuments: [{ id: uid("doc"), type: "Trip Report", status: docStatus, link: "" }],
      validationStatus: docStatus === "Final" || docStatus === "Filed" ? "Validated" : completed ? "Pending evidence" : "Not started"
    },
    payment: {
      paidToInvestigatorByCro: croPaid,
      paidToCroBySponsor: sponsorPaid,
      paymentTrigger: "Completion + document filed"
    }
  };
}

function laborCostPerUnit(unit) {
  return unit.composition.reduce((sum, row) => sum + Number(row.hoursPerUnit || 0) * Number(row.hourlyRate || 0), 0);
}

function passThroughCostPerUnit(unit) {
  return Number(unit.passThroughCostPerUnit || 0);
}

function investigatorGrantPerUnit(unit) {
  return Number(unit.investigatorGrantPerUnit || 0);
}

function unitPlannedCost(unit) {
  return laborCostPerUnit(unit) + passThroughCostPerUnit(unit) + investigatorGrantPerUnit(unit);
}

function unitCount(unit) {
  const allocated = locationTotal(unit);
  return allocated || Number(unit.numberOfUnits || 0);
}

function plannedHours(unit) {
  return unit.composition.reduce((sum, row) => sum + Number(row.hoursPerUnit || 0), 0);
}

function blendedRate(unit) {
  const hours = plannedHours(unit);
  return hours ? laborCostPerUnit(unit) / hours : 0;
}

function isValidated(item) {
  return item.completion.completed && item.completion.evidenceDocuments.some((doc) => doc.status === "Final" || doc.status === "Filed");
}

function actualCost(unit, item) {
  const labor = Number(item.completion.actualHours || 0) * blendedRate(unit);
  const nonLabor = item.completion.completed ? passThroughCostPerUnit(unit) + investigatorGrantPerUnit(unit) : 0;
  return labor + nonLabor;
}

function metricsFor(unit) {
  const plannedUnit = unitPlannedCost(unit);
  const plannedUnitHours = plannedHours(unit);
  const totalPlanned = plannedUnit * unitCount(unit);
  const actual = unit.schedule.reduce((sum, item) => sum + actualCost(unit, item), 0);
  const validated = unit.schedule.reduce((sum, item) => sum + (isValidated(item) ? actualCost(unit, item) : 0), 0);
  return {
    plannedUnit,
    totalPlanned,
    plannedHours: plannedUnitHours * unitCount(unit),
    labor: laborCostPerUnit(unit) * unitCount(unit),
    passThrough: passThroughCostPerUnit(unit) * unitCount(unit),
    investigatorGrants: investigatorGrantPerUnit(unit) * unitCount(unit),
    actual,
    validated,
    notValidated: Math.max(actual - validated, 0),
    openExposure: Math.max(totalPlanned - actual, 0),
    scheduled: unit.schedule.filter((item) => item.plannedDate).length,
    completed: unit.schedule.filter((item) => item.completion.completed).length,
    evidenceFiled: unit.schedule.filter((item) => item.completion.evidenceDocuments.some((doc) => doc.status === "Filed")).length,
    sponsorPaid: unit.schedule.filter((item) => item.payment.paidToCroBySponsor === "Yes").length
  };
}

function portfolioMetrics() {
  return activeUnits().reduce(
    (acc, unit) => {
      const m = metricsFor(unit);
      Object.keys(acc).forEach((key) => (acc[key] += m[key] || 0));
      return acc;
    },
    { totalPlanned: 0, plannedHours: 0, labor: 0, passThrough: 0, investigatorGrants: 0, actual: 0, validated: 0, openExposure: 0, scheduled: 0, completed: 0, evidenceFiled: 0, sponsorPaid: 0 }
  );
}

function warnFor(unit, item) {
  const warnings = [];
  const docs = item.completion.evidenceDocuments;
  const hasFinal = docs.some((doc) => doc.status === "Final" || doc.status === "Filed");
  const hasFiled = docs.some((doc) => doc.status === "Filed");
  const hasDraft = docs.some((doc) => doc.status === "Draft");
  const missing = docs.length === 0 || docs.some((doc) => doc.status === "Missing");
  if (item.completion.completed && missing) warnings.push("Completed but evidence missing");
  if (item.completion.completed && hasDraft && !hasFinal) warnings.push("Completed but document only Draft");
  if (item.completion.completed && Number(item.completion.actualHours) > plannedHours(unit)) warnings.push("Actual hours exceed planned hours");
  if (item.payment.paidToCroBySponsor === "Yes" && !hasFiled) warnings.push("Unit paid but document not filed");
  if (item.payment.paidToInvestigatorByCro === "Yes" && item.payment.paidToCroBySponsor !== "Yes") {
    warnings.push("Investigator paid but sponsor reimbursement not received");
  }
  if (item.completion.completed && !hasFinal) warnings.push("Unit completed but evidence missing");
  return [...new Set(warnings)];
}

function render() {
  const metrics = portfolioMetrics();
  const durationMonths = projectDurationMonths();
  const active = activeUnits();
  const primaryUnit = active.find((unit) => unit.id === state.selectedUnitId) || active[0] || state.units[0];
  app.innerHTML = `
    <main class="app">
      <header class="topbar">
        <div>
          <p class="eyebrow">Clinical Project Management Prototype</p>
          <h1>Clinical Budgeting and Project Management System</h1>
          <p class="subhead">Protocol-derived planning model: budget assumptions become work units, schedules, evidence, payments, resources, and performance metrics.</p>
        </div>
      </header>

      <section class="card project-card">
        <div>
          <span class="label">Project</span>
          <strong>${escapeHtml(state.project.name)}</strong>
        </div>
        <div>
          <span class="label">Protocol basis</span>
          <strong><a href="${state.project.protocolUrl}" target="_blank" rel="noopener noreferrer">${escapeHtml(state.project.protocol)}</a></strong>
        </div>
        <div>
          <span class="label">Design assumptions</span>
          <strong>${escapeHtml(state.project.assumptions)}</strong>
        </div>
      </section>

      <section class="disclaimer">
        ${escapeHtml(state.project.disclaimer)}
      </section>

      ${phaseTimeline()}

      <section class="story">
        <h2>Budget Story</h2>
        <p>${active.length ? story(primaryUnit) : "No saved budget rows yet. Add an expandable unit, save the row, then drill down into composition, schedule, evidence, payment, and cost."}</p>
      </section>

      <section class="grid-kpi">
        ${kpi("Planned Budget", currency.format(metrics.totalPlanned))}
        ${kpi("Labor Budget", currency.format(metrics.labor), "from role hours x rates")}
        ${kpi("Planned Hours", wholeNumber.format(metrics.plannedHours), "total labor effort")}
        ${kpi("FTE Effort", oneDecimal.format(metrics.plannedHours / 1920), "FTE-years at 160 h/month")}
        ${kpi("Avg FTE Need", oneDecimal.format(durationMonths ? metrics.plannedHours / 160 / durationMonths : 0), `${durationMonths} month plan`)}
        ${kpi("Pass-through", currency.format(metrics.passThrough))}
        ${kpi("Investigator Grants", currency.format(metrics.investigatorGrants))}
        ${kpi("Actual Cost", currency.format(metrics.actual))}
      </section>

      <section class="progress-grid">
        ${progress("Scheduled", metrics.scheduled, totalUnits())}
        ${progress("Completed", metrics.completed, totalUnits())}
        ${progress("Evidence Filed", metrics.evidenceFiled, totalUnits())}
        ${progress("Paid by Sponsor", metrics.sponsorPaid, totalUnits())}
      </section>

      ${workspaceTabs()}
      ${workspaceView()}
    </main>
  `;
}

function workspaceTabs() {
  const views = [
    ["plan", "Plan"],
    ["budget", "Budget"],
    ["resources", "Resources"],
    ["cashflow", "Cash Flow"],
    ["timesheets", "Timesheets"],
    ["evidence", "Evidence"],
    ["eva", "EVA"],
    ["documents", "Contracts & Docs"]
  ];
  return `<nav class="workspace-tabs">${views.map(([key, label]) => `<button class="tab ${state.activeView === key ? "active" : ""}" data-action="set-view" data-view="${key}">${label}</button>`).join("")}</nav>`;
}

function workspaceView() {
  if (state.activeView === "budget") return budgetReportView();
  if (state.activeView === "resources") return resourceScheduleView();
  if (state.activeView === "cashflow") return cashFlowView();
  if (state.activeView === "timesheets") return timesheetView();
  if (state.activeView === "evidence") return evidenceTrackerView();
  if (state.activeView === "eva") return evaView();
  if (state.activeView === "documents") return documentsView();
  return planView();
}

function planView() {
  return `
    <div class="shell">
      ${createPanel()}
      <section>
        <div class="section-title">
          <h2>Budget Grid</h2>
          <span class="badge">${state.budgetRows.length} budget row${state.budgetRows.length === 1 ? "" : "s"}</span>
        </div>
        ${budgetGrid()}
        <div class="units">${activeUnits().map(unitCard).join("")}</div>
      </section>
    </div>
  `;
}

function budgetReportView() {
  return `
    <section class="report-grid">
      ${reportPanel("Budget by Unit", budgetDetailTable())}
      ${reportPanel("Budget Mix", `
        ${rollupRow("Labor", currency.format(portfolioMetrics().labor))}
        ${rollupRow("Pass-through", currency.format(portfolioMetrics().passThrough))}
        ${rollupRow("Investigator grants", currency.format(portfolioMetrics().investigatorGrants))}
        ${rollupRow("Total planned", currency.format(portfolioMetrics().totalPlanned))}
      `)}
      ${reportPanel("Budget by Phase", simpleRollupTable(rollupByUnit((unit) => unit.phase || "Unassigned", (unit) => metricsFor(unit).totalPlanned)))}
      ${reportPanel("Budget by Milestone", simpleRollupTable(rollupByUnit((unit) => unit.milestone, (unit) => metricsFor(unit).totalPlanned)))}
    </section>
  `;
}

function budgetDetailTable() {
  return `
    <div class="table-wrap">
      <table class="report-table">
        <thead><tr><th>Unit</th><th>Source</th><th>Phase</th><th>Milestone</th><th>Units</th><th>Hours</th><th>FTE-mo</th><th>Labor/unit</th><th>Pass-through/unit</th><th>Grant/unit</th><th>Total</th></tr></thead>
        <tbody>${activeUnits().map((unit) => `
          <tr>
            <td>${escapeHtml(unit.unitName)}</td>
            <td><span class="badge ${commercialSourceFor(unit).startsWith("OOS") ? "warn" : commercialSourceFor(unit).startsWith("CO") ? "study" : "good"}">${escapeHtml(commercialSourceFor(unit))}</span></td>
            <td>${escapeHtml(unit.phase || "")}</td>
            <td>${escapeHtml(unit.milestone)}</td>
            <td>${unitCount(unit)}</td>
            <td>${wholeNumber.format(metricsFor(unit).plannedHours)}</td>
            <td>${oneDecimal.format(metricsFor(unit).plannedHours / 160)}</td>
            <td>${currency.format(laborCostPerUnit(unit))}</td>
            <td>${currency.format(passThroughCostPerUnit(unit))}</td>
            <td>${currency.format(investigatorGrantPerUnit(unit))}</td>
            <td><strong>${currency.format(metricsFor(unit).totalPlanned)}</strong></td>
          </tr>`).join("")}</tbody>
      </table>
    </div>
  `;
}

function resourceScheduleView() {
  const rows = resourceRows();
  return `
    <section class="report-grid">
      ${reportPanel("Resource Demand by Month", resourceTable(rows))}
      ${reportPanel("Role FTE Summary", simpleRollupTable(rollupObjects(rows, (row) => `${row.department} / ${row.jobRole}`, (row) => row.hours), "Hours", true))}
    </section>
  `;
}

function resourceRows() {
  const buckets = {};
  activeUnits().forEach((unit) => {
    unit.schedule.forEach((item) => {
      const month = monthKey(item.plannedDate);
      unit.composition.forEach((role) => {
        const key = [month, role.department, role.jobRole, role.employeeName || "Not assigned"].join("|");
        buckets[key] ||= { month, department: role.department, jobRole: role.jobRole, employeeName: role.employeeName || "Not assigned", hours: 0 };
        buckets[key].hours += Number(role.hoursPerUnit || 0);
      });
    });
  });
  return Object.values(buckets).sort((a, b) => a.month.localeCompare(b.month) || a.department.localeCompare(b.department) || a.jobRole.localeCompare(b.jobRole));
}

function resourceTable(rows) {
  return `
    <div class="table-wrap">
      <table class="report-table">
        <thead><tr><th>Month</th><th>Department</th><th>Role</th><th>Employee</th><th>Hours</th><th>FTE</th></tr></thead>
        <tbody>${rows.slice(0, 120).map((row) => `
          <tr>
            <td>${row.month}</td>
            <td>${escapeHtml(row.department)}</td>
            <td>${escapeHtml(row.jobRole)}</td>
            <td>${escapeHtml(row.employeeName)}</td>
            <td>${row.hours.toFixed(1)}</td>
            <td>${(row.hours / 160).toFixed(2)}</td>
          </tr>`).join("")}</tbody>
      </table>
    </div>
  `;
}

function cashFlowView() {
  const rows = cashFlowRows();
  return `
    <section class="report-grid">
      ${reportPanel("Monthly Cash Flow", cashFlowTable(rows))}
      ${reportPanel("Cash Flow Totals", `
        ${rollupRow("Labor", currency.format(sum(rows, "labor")))}
        ${rollupRow("Pass-through", currency.format(sum(rows, "passThrough")))}
        ${rollupRow("Investigator grants", currency.format(sum(rows, "investigatorGrants")))}
        ${rollupRow("Total", currency.format(sum(rows, "total")))}
      `)}
    </section>
  `;
}

function cashFlowRows() {
  const buckets = {};
  activeUnits().forEach((unit) => {
    unit.schedule.forEach((item) => {
      const month = monthKey(item.plannedDate);
      buckets[month] ||= { month, labor: 0, passThrough: 0, investigatorGrants: 0, total: 0 };
      buckets[month].labor += laborCostPerUnit(unit);
      buckets[month].passThrough += passThroughCostPerUnit(unit);
      buckets[month].investigatorGrants += investigatorGrantPerUnit(unit);
      buckets[month].total += unitPlannedCost(unit);
    });
  });
  return Object.values(buckets).sort((a, b) => a.month.localeCompare(b.month));
}

function cashFlowTable(rows) {
  return `
    <div class="table-wrap">
      <table class="report-table">
        <thead><tr><th>Month</th><th>Labor</th><th>Pass-through</th><th>Investigator grants</th><th>Total cash</th></tr></thead>
        <tbody>${rows.map((row) => `
          <tr><td>${row.month}</td><td>${currency.format(row.labor)}</td><td>${currency.format(row.passThrough)}</td><td>${currency.format(row.investigatorGrants)}</td><td><strong>${currency.format(row.total)}</strong></td></tr>`).join("")}</tbody>
      </table>
    </div>
  `;
}

function timesheetView() {
  const rows = timesheetRows();
  return `
    <section class="report-grid">
      ${reportPanel("Generated Timesheet Plan", timesheetTable(rows))}
      ${reportPanel("Timesheet Totals", `
        ${rollupRow("Planned hours", rows.reduce((sumValue, row) => sumValue + row.plannedHours, 0).toFixed(1))}
        ${rollupRow("Actual hours", rows.reduce((sumValue, row) => sumValue + row.actualHours, 0).toFixed(1))}
        ${rollupRow("Variance hours", rows.reduce((sumValue, row) => sumValue + row.actualHours - row.plannedHours, 0).toFixed(1))}
      `)}
    </section>
  `;
}

function timesheetRows() {
  const rows = [];
  activeUnits().forEach((unit) => {
    unit.schedule.slice(0, 80).forEach((item) => {
      unit.composition.forEach((role) => {
        const planned = Number(role.hoursPerUnit || 0);
        const share = plannedHours(unit) ? planned / plannedHours(unit) : 0;
        rows.push({
          date: item.plannedDate || "TBD",
          unit: unit.unitName,
          location: item.locationName || unit.locationName || "Global",
          employee: role.employeeName || "Not assigned",
          role: role.jobRole,
          plannedHours: planned,
          actualHours: item.completion.completed ? Number(item.completion.actualHours || 0) * share : 0,
          status: item.completion.completed ? "Completed" : "Planned"
        });
      });
    });
  });
  return rows;
}

function timesheetTable(rows) {
  return `
    <div class="table-wrap">
      <table class="report-table">
        <thead><tr><th>Date</th><th>Unit</th><th>Location</th><th>Employee</th><th>Role</th><th>Planned h</th><th>Actual h</th><th>Status</th></tr></thead>
        <tbody>${rows.slice(0, 160).map((row) => `
          <tr><td>${row.date}</td><td>${escapeHtml(row.unit)}</td><td>${escapeHtml(row.location)}</td><td>${escapeHtml(row.employee)}</td><td>${escapeHtml(row.role)}</td><td>${row.plannedHours.toFixed(1)}</td><td>${row.actualHours.toFixed(1)}</td><td><span class="badge ${row.status === "Completed" ? "good" : ""}">${row.status}</span></td></tr>`).join("")}</tbody>
      </table>
    </div>
  `;
}

function evidenceTrackerView() {
  const rows = evidenceRows();
  return `
    <section class="report-grid">
      ${reportPanel("Evidence and Payment Tracker", evidenceTable(rows))}
      ${reportPanel("Evidence Summary", simpleRollupTable(rollupObjects(rows, (row) => row.documentStatus, () => 1), "Items"))}
    </section>
  `;
}

function evidenceRows() {
  const rows = [];
  activeUnits().forEach((unit) => {
    unit.schedule.forEach((item) => {
      const doc = item.completion.evidenceDocuments[0] || { type: "Other", status: "Missing", link: "" };
      rows.push({
        unit: unit.unitName,
        instance: `${unit.unitType} ${item.index}`,
        plannedDate: item.plannedDate || "TBD",
        location: item.locationName || unit.locationName || "Global",
        completed: item.completion.completed,
        documentType: doc.type,
        documentStatus: doc.status,
        proof: doc.link || "Placeholder",
        sponsorPaid: item.payment.paidToCroBySponsor
      });
    });
  });
  return rows;
}

function evidenceTable(rows) {
  return `
    <div class="table-wrap">
      <table class="report-table">
        <thead><tr><th>Unit</th><th>Instance</th><th>Date</th><th>Location</th><th>Completed</th><th>Document</th><th>Status</th><th>Proof</th><th>Sponsor paid</th></tr></thead>
        <tbody>${rows.slice(0, 140).map((row) => `
          <tr><td>${escapeHtml(row.unit)}</td><td>${row.instance}</td><td>${row.plannedDate}</td><td>${escapeHtml(row.location)}</td><td>${row.completed ? "Yes" : "No"}</td><td>${row.documentType}</td><td><span class="badge ${row.documentStatus === "Filed" ? "good" : row.documentStatus === "Draft" ? "warn" : "bad"}">${row.documentStatus}</span></td><td>${escapeHtml(row.proof)}</td><td>${row.sponsorPaid}</td></tr>`).join("")}</tbody>
      </table>
    </div>
  `;
}

function evaView() {
  const dataDate = "2025-09-30";
  const rows = activeUnits().map((unit) => evaUnitRow(unit, dataDate));
  const pv = rows.reduce((total, row) => total + row.plannedValue, 0);
  const ev = rows.reduce((total, row) => total + row.earnedValue, 0);
  const ac = rows.reduce((total, row) => total + row.actualCost, 0);
  return `
    <section class="report-grid">
      ${reportPanel("Earned Value Snapshot", `
        ${rollupRow("Data date", dataDate)}
        ${rollupRow("Planned value", currency.format(pv))}
        ${rollupRow("Earned value", currency.format(ev))}
        ${rollupRow("Actual cost", currency.format(ac))}
        ${rollupRow("SPI", pv ? (ev / pv).toFixed(2) : "0.00")}
        ${rollupRow("CPI", ac ? (ev / ac).toFixed(2) : "0.00")}
      `)}
      ${reportPanel("EVA by Unit", evaTable(rows))}
    </section>
  `;
}

function evaUnitRow(unit, dataDate) {
  const plannedItems = unit.schedule.filter((item) => item.plannedDate && item.plannedDate <= dataDate).length;
  const completedItems = unit.schedule.filter((item) => item.completion.completed).length;
  const plannedValue = plannedItems * unitPlannedCost(unit);
  const earnedValue = unit.schedule.filter(isValidated).length * unitPlannedCost(unit);
  const actualCostValue = metricsFor(unit).actual;
  return { unit: unit.unitName, plannedItems, completedItems, plannedValue, earnedValue, actualCost: actualCostValue };
}

function evaTable(rows) {
  return `
    <div class="table-wrap">
      <table class="report-table">
        <thead><tr><th>Unit</th><th>Planned units</th><th>Completed</th><th>PV</th><th>EV</th><th>AC</th><th>SPI</th><th>CPI</th></tr></thead>
        <tbody>${rows.map((row) => `
          <tr><td>${escapeHtml(row.unit)}</td><td>${row.plannedItems}</td><td>${row.completedItems}</td><td>${currency.format(row.plannedValue)}</td><td>${currency.format(row.earnedValue)}</td><td>${currency.format(row.actualCost)}</td><td>${row.plannedValue ? (row.earnedValue / row.plannedValue).toFixed(2) : "0.00"}</td><td>${row.actualCost ? (row.earnedValue / row.actualCost).toFixed(2) : "0.00"}</td></tr>`).join("")}</tbody>
      </table>
    </div>
  `;
}

function documentsView() {
  return `
    <section class="document-disclaimer">
      Illustration only. The sample contract, change order, PM plan, monitoring plan, and SOP/TMF language below is placeholder text generated for prototype discussion. It is not legal advice, not a regulatory-ready SOP, not a validated clinical operations document, and the protocol-derived numbers are not correct for contracting.
    </section>
    <section class="report-grid">
      ${reportPanel("Contract Constructor", contractBackbone())}
      ${reportPanel("Commercial Summary From Budget Grid", `
        ${simpleRollupTable(rollupByUnit((unit) => commercialSourceFor(unit), (unit) => metricsFor(unit).totalPlanned))}
        ${commercialRegisterTable()}
      `)}
      ${reportPanel("Change Order / OOS Register", changeOrderRegister())}
      ${reportPanel("Project Management Plan Backbone", pmPlanBackbone())}
      ${reportPanel("Monitoring Plan Backbone", monitoringPlanBackbone())}
      ${reportPanel("SOP / TMF Document Placeholders", sopDocumentBackbone())}
    </section>
  `;
}

function contractBackbone() {
  const metrics = portfolioMetrics();
  return `
    <div class="document-preview">
      <h4>Study Work Order / Clinical Services Agreement Draft</h4>
      <p><strong>Parties:</strong> Muster Sponsor AG and Muster CRO GmbH.</p>
      <p><strong>Protocol:</strong> ${escapeHtml(state.project.protocol)}. <strong>Project:</strong> ${escapeHtml(state.project.name)}.</p>
      <p><strong>Scope summary:</strong> CRO will provide clinical operations, start-up, monitoring, data management, medical/safety oversight, project management, and reporting support for the illustrated study model.</p>
      <ol>
        <li>Definitions and order of precedence</li>
        <li>Protocol, study assumptions, countries/sites TBD, and planning dependencies</li>
        <li>Scope of services by budget unit, phase, milestone, location, and evidence trigger</li>
        <li>Contract budget baseline: ${currency.format(metrics.totalPlanned)} total, including ${currency.format(metrics.labor)} labor, ${currency.format(metrics.passThrough)} pass-through, and ${currency.format(metrics.investigatorGrants)} investigator grants</li>
        <li>Payment schedule and payment triggers: completion, document filed, sponsor approval, or manual approval</li>
        <li>Change control: CO1, CO2, CO3 for approved scope/budget changes</li>
        <li>Out-of-scope tracking: OOS1, OOS2, OOS3 for work performed or requested before change-order approval</li>
        <li>Evidence, TMF/eTMF records, inspection readiness, and document retention</li>
        <li>Project governance, reporting cadence, issue escalation, and risk management</li>
        <li>Quality, audit rights, data privacy, pharmacovigilance interfaces, termination, and close-out</li>
      </ol>
    </div>
  `;
}

function commercialRegisterTable() {
  return `
    <div class="table-wrap" style="margin-top:12px">
      <table class="report-table compact-report">
        <thead><tr><th>Source</th><th>Units</th><th>Budget</th><th>Hours</th></tr></thead>
        <tbody>${commercialSources.map((source) => {
          const units = activeUnits().filter((unit) => commercialSourceFor(unit) === source);
          if (!units.length) return "";
          const budget = units.reduce((sumValue, unit) => sumValue + metricsFor(unit).totalPlanned, 0);
          const hours = units.reduce((sumValue, unit) => sumValue + metricsFor(unit).plannedHours, 0);
          return `<tr><td>${source}</td><td>${units.length}</td><td>${currency.format(budget)}</td><td>${wholeNumber.format(hours)}</td></tr>`;
        }).join("")}</tbody>
      </table>
    </div>
  `;
}

function changeOrderRegister() {
  const rows = activeUnits().filter((unit) => commercialSourceFor(unit) !== "Contract Unit");
  if (!rows.length) {
    return `<p class="helper">No change order or OOS items yet. In the Budget Grid, change any line from Contract Unit to CO1, CO2, OOS1, etc., then save the row.</p>`;
  }
  return `
    <div class="table-wrap">
      <table class="report-table">
        <thead><tr><th>Source</th><th>Unit</th><th>Phase</th><th>Milestone</th><th>Budget</th><th>Suggested document action</th></tr></thead>
        <tbody>${rows.map((unit) => {
          const source = commercialSourceFor(unit);
          return `<tr>
            <td><span class="badge ${source.startsWith("OOS") ? "warn" : "study"}">${source}</span></td>
            <td>${escapeHtml(unit.unitName)}</td>
            <td>${escapeHtml(unit.phase || "")}</td>
            <td>${escapeHtml(unit.milestone)}</td>
            <td>${currency.format(metricsFor(unit).totalPlanned)}</td>
            <td>${source.startsWith("OOS") ? "Track as out-of-scope, then convert to change order if approved" : "Include in change order budget and scope appendix"}</td>
          </tr>`;
        }).join("")}</tbody>
      </table>
    </div>
  `;
}

function pmPlanBackbone() {
  return `
    <div class="document-preview">
      <h4>Project Management Plan Draft Sections</h4>
      <ol>
        <li>Study overview, protocol basis, assumptions, and illustration disclaimer</li>
        <li>Governance model: Sponsor, CRO, sites, vendors, escalation path</li>
        <li>Baseline plan: phases, milestones, budget units, locations, schedule, and resource model</li>
        <li>Resource schedule and role responsibilities by department, role, and employee assignment when known</li>
        <li>Budget control: contract units, change orders, OOS tracker, pass-throughs, grants, cash flow</li>
        <li>Risk, issue, action, decision, and dependency management</li>
        <li>Reporting cadence: status report, KPI dashboard, EVA, open exposure, evidence status</li>
        <li>Close-out criteria and archive handover</li>
      </ol>
    </div>
  `;
}

function monitoringPlanBackbone() {
  return `
    <div class="document-preview">
      <h4>Monitoring Plan Draft Sections</h4>
      <ol>
        <li>Monitoring strategy for ${escapeHtml(state.project.protocol)} using the illustrative 160-center assumption</li>
        <li>Visit types: SIV, routine monitoring, remote review, close-out, and triggered visits</li>
        <li>Risk indicators: enrollment, protocol deviations, SAE activity, data quality, open queries, TMF gaps</li>
        <li>Monitoring frequency and country/site drill-down logic from global assumptions to exact visit dates</li>
        <li>Required evidence: trip report, action plan, CAPA, SAE documentation, filed status</li>
        <li>Payment and validation dependencies: completed plus document filed or sponsor approval</li>
        <li>Escalation, quality review, report finalization timelines, and inspection readiness</li>
      </ol>
    </div>
  `;
}

function sopDocumentBackbone() {
  return `
    <div class="document-preview">
      <h4>Placeholder SOP / TMF Document List</h4>
      <ul>
        <li>Budget Construction and Assumption Traceability SOP</li>
        <li>Change Order and Out-of-Scope Work Instruction</li>
        <li>Monitoring Visit Evidence and Trip Report Filing SOP</li>
        <li>Investigator Grant and Pass-Through Payment Control SOP</li>
        <li>Resource Planning, Timesheet, and Actual Hours Reconciliation SOP</li>
        <li>TMF/eTMF Document Index and Evidence Link Register</li>
      </ul>
    </div>
  `;
}

function reportPanel(title, body) {
  return `<section class="panel report-panel"><h3>${title}</h3>${body}</section>`;
}

function simpleRollupTable(data, valueLabel = "Budget", isHours = false) {
  const formatValue = (value) => {
    if (isHours) return value.toFixed(1);
    if (valueLabel === "Items") return String(value);
    return currency.format(value);
  };
  return `
    <div class="table-wrap">
      <table class="report-table compact-report">
        <thead><tr><th>Category</th><th>${valueLabel}</th>${isHours ? "<th>FTE months</th>" : ""}</tr></thead>
        <tbody>${Object.entries(data).sort((a, b) => b[1] - a[1]).map(([key, value]) => `<tr><td>${escapeHtml(key)}</td><td>${formatValue(value)}</td>${isHours ? `<td>${(value / 160).toFixed(2)}</td>` : ""}</tr>`).join("")}</tbody>
      </table>
    </div>
  `;
}

function rollupByUnit(keyFn, valueFn) {
  return activeUnits().reduce((acc, unit) => {
    const key = keyFn(unit);
    acc[key] = (acc[key] || 0) + valueFn(unit);
    return acc;
  }, {});
}

function rollupObjects(rows, keyFn, valueFn) {
  return rows.reduce((acc, row) => {
    const key = keyFn(row);
    acc[key] = (acc[key] || 0) + valueFn(row);
    return acc;
  }, {});
}

function monthKey(date) {
  if (!date) return "TBD";
  return new Date(`${date}T00:00`).toISOString().slice(0, 7);
}

function sum(rows, key) {
  return rows.reduce((total, row) => total + Number(row[key] || 0), 0);
}

function story(unit) {
  const m = metricsFor(unit);
  return `${unitCount(unit)} ${pluralUnitName(unit)} planned. ${m.scheduled} scheduled, ${m.completed} completed, ${m.evidenceFiled} validated with evidence, ${m.sponsorPaid} paid by Sponsor. Planned budget: ${currency.format(m.totalPlanned)}. Actual cost: ${currency.format(m.actual)}. Open exposure: ${currency.format(m.openExposure)}.`;
}

function phaseTimeline() {
  const phases = ["Start-Up", "Initiation", "Maintenance", "Follow-Up"];
  const rows = state.budgetRows.filter((row) => row.startDate && row.endDate);
  const min = Math.min(...rows.map((row) => new Date(`${row.startDate}T00:00`).getTime()));
  const max = Math.max(...rows.map((row) => new Date(`${row.endDate}T00:00`).getTime()));
  const span = Math.max(max - min, 1);
  return `
    <section class="phase-timeline card">
      <div class="timeline-head">
        <div>
          <span class="label">Protocol Planning Timeline</span>
          <strong>Start-up to follow-up budget phases</strong>
        </div>
        <span class="badge">Demo planning dates</span>
      </div>
      <div class="timeline-grid">
        ${phases.map((phase) => phaseTimelineCard(phase, min, span)).join("")}
      </div>
    </section>
  `;
}

function phaseTimelineCard(phase, min, span) {
  const phaseRows = state.budgetRows.filter((row) => row.phase === phase);
  if (!phaseRows.length) return "";
  const start = Math.min(...phaseRows.map((row) => new Date(`${row.startDate}T00:00`).getTime()));
  const end = Math.max(...phaseRows.map((row) => new Date(`${row.endDate}T00:00`).getTime()));
  const left = Math.max(((start - min) / span) * 100, 0);
  const width = Math.max(((end - start) / span) * 100, 4);
  const budget = phaseRows.reduce((sum, row) => sum + (findUnit(row.unitId) ? metricsFor(findUnit(row.unitId)).totalPlanned : 0), 0);
  return `
    <article class="timeline-card">
      <div class="timeline-meta">
        <strong>${phase}</strong>
        <span>${formatMonth(start)} - ${formatMonth(end)}</span>
      </div>
      <div class="timeline-track"><i style="left:${left}%;width:${width}%"></i></div>
      <div class="timeline-meta">
        <span>${phaseRows.length} units</span>
        <strong>${currency.format(budget)}</strong>
      </div>
    </article>
  `;
}

function formatMonth(value) {
  return new Date(value).toLocaleString("en-US", { month: "short", year: "numeric" });
}

function pluralUnitName(unit) {
  const name = unit.unitName.trim();
  if (Number(unit.numberOfUnits) === 1 || name.toLowerCase().endsWith("s")) return name;
  return `${name}s`;
}

function totalUnits() {
  return activeUnits().reduce((sum, unit) => sum + unitCount(unit), 0) || 1;
}

function projectDurationMonths() {
  const rows = state.budgetRows.filter((row) => row.startDate && row.endDate);
  if (!rows.length) return 0;
  const start = new Date(Math.min(...rows.map((row) => new Date(`${row.startDate}T00:00`).getTime())));
  const end = new Date(Math.max(...rows.map((row) => new Date(`${row.endDate}T00:00`).getTime())));
  return (end.getFullYear() - start.getFullYear()) * 12 + end.getMonth() - start.getMonth() + 1;
}

function kpi(label, value, note = "") {
  return `<article class="card kpi"><span>${label}</span><strong>${value}</strong>${note ? `<small>${note}</small>` : ""}</article>`;
}

function progress(label, value, total) {
  const percent = Math.round((value / total) * 100);
  return `
    <article class="card progress-card">
      <div class="progress-meta"><span>${label}</span><strong>${value}/${total}</strong></div>
      <div class="bar"><i style="width:${percent}%"></i></div>
    </article>
  `;
}

function createPanel() {
  return `
    <aside class="card creator">
      <h2>Add Expandable Unit</h2>
      ${state.units.length ? `
        <label style="margin-bottom:12px"><span>Open existing unit</span>
          <select data-scope="selected-unit" data-field="selectedUnitId">
            ${state.units.map((unit) => `<option value="${unit.id}" ${unit.id === state.selectedUnitId ? "selected" : ""}>${escapeHtml(unit.unitName)} (${unit.unitType})</option>`).join("")}
          </select>
        </label>
      ` : ""}
      <button class="primary" data-action="toggle-add-menu">${state.showAddMenu ? "Close unit catalog" : "Add expandable unit"}</button>
      ${state.showAddMenu ? `
      <div class="field-grid add-menu">
        <label><span>Reference unit catalog</span>
          <select data-scope="catalog-pick" data-field="catalogPick">
            ${sampleCatalog.map((item) => `<option value="${escapeHtml(item.unit)}" ${item.unit === state.catalogPick ? "selected" : ""}>${escapeHtml(item.unit)} - ${escapeHtml(item.phase)} / ${escapeHtml(item.milestone)}</option>`).join("")}
          </select>
        </label>
        <button class="ghost wide-button" data-action="add-catalog-row">Add selected row</button>
      </div>
      ` : ""}
      <p class="helper">The catalog is a dictionary: each selected unit brings its Phase and Milestone into the budget grid as one row.</p>
    </aside>
  `;
}

function budgetGrid() {
  return `
    <section class="card budget-grid-card">
      <div class="structure-head">
        <div>
          <h3>Budget Lines</h3>
          <p>One row equals one expandable work unit. Save commits row edits into the drill-down unit.</p>
        </div>
      </div>
      <div class="table-wrap">
        <table class="budget-table">
          <thead>
            <tr>
              <th>Unit list</th>
              <th>Phase</th>
              <th>Milestone</th>
              <th>Commercial source</th>
              <th>Location</th>
              <th>No. units</th>
              <th>Pass-through / unit</th>
              <th>Grant / unit</th>
              <th>Start</th>
              <th>End</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>${state.budgetRows.map(budgetRow).join("")}</tbody>
        </table>
      </div>
    </section>
  `;
}

function budgetRow(row) {
  const unit = findUnit(row.unitId);
  const splitStatus = row.splits?.length ? splitTotal(row) <= Number(row.numberOfUnits || 0) && !hasOverallocatedSites(row) : true;
  return `
    <tr>
      <td><input value="${escapeHtml(row.unitName)}" data-scope="budget-row" data-row="${row.id}" data-field="unitName" /></td>
      <td><input value="${escapeHtml(row.phase)}" data-scope="budget-row" data-row="${row.id}" data-field="phase" /></td>
      <td><input value="${escapeHtml(row.milestone)}" data-scope="budget-row" data-row="${row.id}" data-field="milestone" /></td>
      <td>
        <select data-scope="budget-row" data-row="${row.id}" data-field="commercialSource" aria-label="Commercial source">
          ${commercialSources.map((value) => option(value, row.commercialSource || "Contract Unit")).join("")}
        </select>
      </td>
      <td>
        <div class="location-editor">
          <select data-scope="budget-row" data-row="${row.id}" data-field="locationLevel" aria-label="Location level">
            ${["Global", "Region", "Country", "Site"].map((value) => option(value, row.locationLevel || "Global")).join("")}
          </select>
          <input value="${escapeHtml(row.locationName || "Global")}" data-scope="budget-row" data-row="${row.id}" data-field="locationName" ${row.locationLevel === "Global" ? "disabled" : ""} aria-label="Location name" />
        </div>
      </td>
      <td><input type="number" min="1" value="${row.numberOfUnits}" data-scope="budget-row" data-row="${row.id}" data-field="numberOfUnits" /></td>
      <td><input type="number" min="0" value="${row.passThroughCostPerUnit || 0}" data-scope="budget-row" data-row="${row.id}" data-field="passThroughCostPerUnit" /></td>
      <td><input type="number" min="0" value="${row.investigatorGrantPerUnit || 0}" data-scope="budget-row" data-row="${row.id}" data-field="investigatorGrantPerUnit" /></td>
      <td><input type="date" value="${row.startDate}" data-scope="budget-row" data-row="${row.id}" data-field="startDate" /></td>
      <td><input type="date" value="${row.endDate}" data-scope="budget-row" data-row="${row.id}" data-field="endDate" /></td>
      <td>
        <span class="badge ${!splitStatus ? "bad" : row.dirty ? "warn" : unit ? "good" : "study"}">${!splitStatus ? hasOverallocatedSites(row) ? "Site over-allocation" : `Over by ${splitTotal(row) - row.numberOfUnits}` : row.splits?.length && countryRemainder(row) ? `TBD ${countryRemainder(row)}` : row.dirty ? "Unsaved" : unit ? "Saved" : "Needs save"}</span>
      </td>
      <td>
        <div class="row-actions">
          <button class="icon-button" data-action="toggle-country-split" data-row="${row.id}">${row.splitOpen || row.splits?.length ? "Country split" : "Split country"}</button>
          <button class="icon-button" data-action="save-budget-row" data-row="${row.id}" ${splitStatus ? "" : "disabled"}>Save</button>
          <button class="icon-button" data-action="open-budget-row" data-row="${row.id}" ${unit && !row.dirty ? "" : "disabled"}>Open</button>
          <button class="icon-button danger" data-action="delete-budget-row" data-row="${row.id}">Delete</button>
        </div>
      </td>
    </tr>
    ${row.splitOpen || row.splits?.length ? countrySplitRows(row) : ""}
  `;
}

function countrySplitRows(row) {
  const remainder = countryRemainder(row);
  const countryOver = Math.max(splitTotal(row) - Number(row.numberOfUnits || 0), 0);
  return `
    <tr class="split-row">
      <td colspan="12">
        <div class="split-editor">
          <div class="split-editor-head">
            <strong>Country distribution</strong>
            <span class="badge ${countryOver ? "bad" : "good"}">Countries ${splitTotal(row)} / ${row.numberOfUnits}</span>
            ${countryOver ? `<span class="badge bad">${countryOver} over global</span>` : remainder ? `<span class="badge warn">${remainder} TBD Country</span>` : `<span class="badge good">Country total matched</span>`}
          </div>
          <div class="split-lines">
            ${row.splits.map((split) => {
              const siteKnown = siteTotal(split);
              const siteRemainder = Math.max(Number(split.units || 0) - siteKnown, 0);
              return `
              <div class="split-line">
                <span class="badge study">Country</span>
                <input value="${escapeHtml(split.name)}" data-scope="country-split" data-row="${row.id}" data-split="${split.id}" data-field="name" />
                <input type="number" min="0" value="${split.units}" data-scope="country-split" data-row="${row.id}" data-split="${split.id}" data-field="units" />
                <input type="date" value="${split.startDate}" data-scope="country-split" data-row="${row.id}" data-split="${split.id}" data-field="startDate" />
                <input type="date" value="${split.endDate}" data-scope="country-split" data-row="${row.id}" data-split="${split.id}" data-field="endDate" />
                <span class="badge ${siteKnown <= Number(split.units || 0) ? "good" : "bad"}">Sites ${siteKnown}/${split.units}</span>
                ${siteRemainder ? `<span class="badge warn">${siteRemainder} TBD Site</span>` : ""}
                <button class="icon-button" data-action="toggle-site-split" data-row="${row.id}" data-split="${split.id}">${split.siteOpen || split.sites?.length ? "Sites" : "Split sites"}</button>
                <button class="icon-button" data-action="save-country-split" data-row="${row.id}">Save country split</button>
                <button class="icon-button danger" data-action="delete-country-split" data-row="${row.id}" data-split="${split.id}">Delete</button>
              </div>
              ${split.siteOpen || split.sites?.length ? siteSplitRows(row, split) : ""}`;
            }).join("")}
          </div>
          <button class="ghost" data-action="add-country-split" data-row="${row.id}">Add country line</button>
        </div>
      </td>
    </tr>
  `;
}

function siteSplitRows(row, split) {
  const over = Math.max(siteTotal(split) - Number(split.units || 0), 0);
  return `
    <div class="site-lines">
      <div class="split-editor-head">
        <strong>Sites in ${escapeHtml(split.name)}</strong>
        <span class="badge ${over ? "bad" : "good"}">Sites ${siteTotal(split)} / ${split.units}</span>
        ${over ? `<span class="badge bad">${over} over country</span>` : siteRemainder(split) ? `<span class="badge warn">${siteRemainder(split)} TBD Site</span>` : `<span class="badge good">Site total matched</span>`}
      </div>
      ${(split.sites || []).map((site) => `
        <div class="split-line site-line">
          <span class="badge">Site</span>
          <select data-scope="site-split" data-row="${row.id}" data-split="${split.id}" data-site="${site.id}" data-field="countryName" aria-label="Site country">
            ${row.splits.map((country) => option(country.name, site.countryName || split.name)).join("")}
          </select>
          <input value="${escapeHtml(site.name)}" data-scope="site-split" data-row="${row.id}" data-split="${split.id}" data-site="${site.id}" data-field="name" />
          <input type="number" min="0" value="${site.units}" data-scope="site-split" data-row="${row.id}" data-split="${split.id}" data-site="${site.id}" data-field="units" />
          <button class="icon-button danger" data-action="delete-site-split" data-row="${row.id}" data-split="${split.id}" data-site="${site.id}">Delete</button>
        </div>`).join("")}
      <div class="row-actions">
        <button class="ghost" data-action="add-site-split" data-row="${row.id}" data-split="${split.id}">Add known site</button>
        <button class="ghost" data-action="save-country-split" data-row="${row.id}">Save site split</button>
      </div>
    </div>
  `;
}

function assumptionBadge(value, defaultValue) {
  return value === defaultValue ? `<em class="badge default">Default</em>` : `<em class="badge study">Study-specific assumption</em>`;
}

function input(label, scope, field, value, type = "text", defaultValue = undefined, extra = "") {
  const badge = defaultValue === undefined ? "" : assumptionBadge(String(value), String(defaultValue));
  return `<label><span>${label} ${badge}</span><input ${extra} type="${type}" value="${escapeHtml(value)}" data-scope="${scope}" data-field="${field}" /></label>`;
}

function option(value, selected) {
  return `<option value="${value}" ${value === selected ? "selected" : ""}>${value}</option>`;
}

function unitCard(unit) {
  const m = metricsFor(unit);
  return `
    <article class="unit-card" data-unit-id="${unit.id}">
      <header class="unit-head">
        <div>
          <div class="unit-title">
            <input class="title-input" value="${escapeHtml(unit.unitName)}" data-scope="unit-field" data-unit="${unit.id}" data-field="unitName" aria-label="Unit name" />
            <span class="badge">${unit.unitType}</span>
            <span class="badge ${unit.defaultAssumptionEnabled ? "default" : "study"}">${unit.defaultAssumptionEnabled ? "Defaults enabled" : "Study-specific"}</span>
          </div>
      <div class="mini-metrics">
            <span class="badge">${escapeHtml(unit.phase || "Unassigned Phase")}</span>
            <label class="inline-edit"><span>Milestone</span><input value="${escapeHtml(unit.milestone)}" data-scope="unit-field" data-unit="${unit.id}" data-field="milestone" /></label>
            <label class="inline-edit"><span>Location</span><input value="${escapeHtml(unit.locationName || "Global")}" data-scope="unit-field" data-unit="${unit.id}" data-field="locationName" /></label>
            <span class="badge">${unitCount(unit)} units</span>
            <span class="badge study">${detailStatus(unit)}</span>
            <span class="badge">${currency.format(m.plannedUnit)} per unit</span>
            <span class="badge good">${m.completed} completed</span>
            <span class="badge warn">${warningCount(unit)} warnings</span>
          </div>
        </div>
        <button class="ghost" data-action="toggle-unit" data-unit="${unit.id}">${unit.expanded ? "Collapse" : "Expand"}</button>
      </header>
      ${unit.expanded ? `<div class="unit-body">${tabs(unit)}${tabBody(unit)}</div>` : ""}
    </article>
  `;
}

function tabs(unit) {
  const tabsList = [
    ["detail", "Detail Builder"],
    ["composition", "Unit Composition"],
    ["schedule", "Duration & Schedule"],
    ["evidence", "Completion & Evidence"],
    ["payment", "Payment Logic"],
    ["cost", "Cost Summary"]
  ];
  return `<nav class="tabs">${tabsList.map(([key, label]) => `<button class="tab ${unit.activeTab === key ? "active" : ""}" data-action="set-tab" data-unit="${unit.id}" data-tab="${key}">${label}</button>`).join("")}</nav>`;
}

function tabBody(unit) {
  if (unit.activeTab === "detail") return detailTab(unit);
  if (unit.activeTab === "composition") return compositionTab(unit);
  if (unit.activeTab === "schedule") return scheduleTab(unit);
  if (unit.activeTab === "evidence") return evidenceTab(unit);
  if (unit.activeTab === "payment") return paymentTab(unit);
  return costTab(unit);
}

function detailTab(unit) {
  return `
    <div class="detail-summary">
      <div class="panel">
        <h3>Budgeting Reality Check</h3>
        <p class="helper">Clinical study budgets usually start as a top-down assumption, then become more exact as country/site activation, resource assignment, visit dates, completion evidence, and payment facts arrive. This unit keeps each layer traceable.</p>
      </div>
      <div class="panel">
        <h3>Detail Maturity</h3>
        ${ladder("Location", ["Global", "Region", "Country", "Site"], locationDetailLevel(unit))}
        ${ladder("Staffing", ["Department", "Role", "Employee"], staffingDetailLevel(unit))}
        ${ladder("Timing", ["Date range", "Generated dates", "Exact dates"], timingDetailLevel(unit))}
        ${ladder("Actuals", ["Planned", "Completed", "Validated", "Paid"], actualDetailLevel(unit))}
      </div>
    </div>
    <div class="split-panel" style="margin-top:12px">
      <div class="panel">
        <h3>Location Drill-Down</h3>
        <p class="helper">Start Global. Replace with regions, countries, or sites as study setup becomes known.</p>
        <div class="table-wrap compact-table">
          <table>
            <thead><tr><th>Level</th><th>Name</th><th>Units</th><th>Assumption</th><th></th></tr></thead>
            <tbody>${locationAllocations(unit).map((row) => locationAllocationRow(unit, row)).join("")}</tbody>
          </table>
        </div>
        <div class="row-actions" style="margin-top:12px">
          <button class="ghost" data-action="add-location-allocation" data-unit="${unit.id}">Add next location detail</button>
          <button class="ghost" data-action="apply-country-split" data-unit="${unit.id}">Example: 3 France / 3 Switzerland / 4 Italy</button>
        </div>
      </div>
      <div class="panel">
        <h3>Staffing Drill-Down</h3>
        <p class="helper">Move from department-level budget roles to named employee assignments when resourcing is known.</p>
        <div class="table-wrap compact-table">
          <table>
            <thead><tr><th>Department</th><th>Role</th><th>Employee</th><th>Assumption</th></tr></thead>
            <tbody>${unit.composition.map((row) => `
              <tr>
                ${cellInput(unit.id, row.id, "department", row.department)}
                ${cellInput(unit.id, row.id, "jobRole", row.jobRole)}
                ${cellInput(unit.id, row.id, "employeeName", row.employeeName)}
                <td><span class="badge ${row.assumptionType === "Default" ? "default" : "study"}">${staffingRowLevel(row)}</span></td>
              </tr>`).join("")}</tbody>
          </table>
        </div>
        <button class="ghost" data-action="assign-sample-employees" data-unit="${unit.id}" style="margin-top:12px">Assign sample employees</button>
      </div>
    </div>
  `;
}

function ladder(label, steps, current) {
  return `
    <div class="ladder">
      <span class="label">${label}</span>
      <div>${steps.map((step) => `<span class="badge ${steps.indexOf(step) <= steps.indexOf(current) ? "good" : ""}">${step}</span>`).join("")}</div>
    </div>
  `;
}

function compositionTab(unit) {
  return `
    <div class="table-wrap">
      <table>
        <thead><tr><th>Department</th><th>Job role</th><th>Function</th><th>Employee</th><th>Hours</th><th>Rate</th><th>Milestone</th><th>Assumption</th></tr></thead>
        <tbody>
          ${unit.composition.map((row) => `
            <tr>
              ${cellInput(unit.id, row.id, "department", row.department)}
              ${cellInput(unit.id, row.id, "jobRole", row.jobRole)}
              ${cellInput(unit.id, row.id, "function", row.function)}
              ${cellInput(unit.id, row.id, "employeeName", row.employeeName)}
              ${cellInput(unit.id, row.id, "hoursPerUnit", row.hoursPerUnit, "number")}
              ${cellInput(unit.id, row.id, "hourlyRate", row.hourlyRate, "number")}
              ${cellInput(unit.id, row.id, "milestone", row.milestone)}
              <td><span class="badge ${row.assumptionType === "Default" ? "default" : "study"}">${row.assumptionType}</span></td>
            </tr>`).join("")}
        </tbody>
      </table>
    </div>
    <button class="ghost" data-action="add-role" data-unit="${unit.id}" style="margin-top:12px">Add role row</button>
  `;
}

function cellInput(unitId, rowId, field, value, type = "text") {
  return `<td><input type="${type}" value="${escapeHtml(value)}" data-scope="composition" data-unit="${unitId}" data-row="${rowId}" data-field="${field}" /></td>`;
}

function locationAllocationRow(unit, row) {
  return `
    <tr>
      <td><select data-scope="location-allocation" data-unit="${unit.id}" data-location="${row.id}" data-field="level">${["Global", "Region", "Country", "Site"].map((value) => option(value, row.level)).join("")}</select></td>
      <td><input value="${escapeHtml(row.name)}" data-scope="location-allocation" data-unit="${unit.id}" data-location="${row.id}" data-field="name" ${row.level === "Global" ? "disabled" : ""} /></td>
      <td><input type="number" min="0" value="${row.units}" data-scope="location-allocation" data-unit="${unit.id}" data-location="${row.id}" data-field="units" /></td>
      <td><span class="badge ${row.assumptionType === "Default" ? "default" : "study"}">${row.assumptionType}</span></td>
      <td><button class="icon-button danger" data-action="delete-location-allocation" data-unit="${unit.id}" data-location="${row.id}" ${locationAllocations(unit).length === 1 ? "disabled" : ""}>Delete</button></td>
    </tr>
  `;
}

function scheduleTab(unit) {
  return `
    <div class="toolbar">
      <label><span>Start date</span><input type="date" data-scope="schedule-generator" data-unit="${unit.id}" data-field="start" value="2025-04-01"></label>
      <label><span>End date</span><input type="date" data-scope="schedule-generator" data-unit="${unit.id}" data-field="end" value="2025-12-31"></label>
      <button class="ghost" data-action="generate-schedule" data-unit="${unit.id}">Generate split</button>
    </div>
    <div class="table-wrap">
      <table>
        <thead><tr><th>Unit</th><th>Location</th><th>Planned date</th><th>Schedule assumption</th></tr></thead>
        <tbody>
          ${unit.schedule.map((item) => `
            <tr>
              <td>${unit.unitType} ${item.index}</td>
              <td><span class="badge ${item.locationLevel === "Global" ? "default" : "study"}">${escapeHtml(item.locationName || "Global")}</span></td>
              <td><input type="date" value="${item.plannedDate}" data-scope="schedule" data-unit="${unit.id}" data-instance="${item.id}" data-field="plannedDate"></td>
              <td><span class="badge ${item.scheduleAssumptionType === "Default" ? "default" : "study"}">${item.scheduleAssumptionType === "Default" ? "Default" : "Study-specific schedule"}</span></td>
            </tr>`).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function evidenceTab(unit) {
  return `
    <div class="table-wrap">
      <table>
        <thead><tr><th>Unit</th><th>Planned</th><th>Complete</th><th>Completion date/time</th><th>Completed by</th><th>Actual hours</th><th>Document</th><th>Status</th><th>Proof link / placeholder</th><th>Validation</th></tr></thead>
        <tbody>
          ${unit.schedule.map((item) => {
            const doc = item.completion.evidenceDocuments[0] || { type: "Trip Report", status: "Missing" };
            return `<tr>
              <td>${unit.unitType} ${item.index}</td>
              <td>${item.plannedDate || "TBD"}</td>
              <td><input type="checkbox" ${item.completion.completed ? "checked" : ""} data-scope="completion" data-unit="${unit.id}" data-instance="${item.id}" data-field="completed"></td>
              <td><input type="datetime-local" value="${item.completion.actualCompletionDateTime}" data-scope="completion" data-unit="${unit.id}" data-instance="${item.id}" data-field="actualCompletionDateTime"></td>
              <td><input value="${escapeHtml(item.completion.completedBy)}" data-scope="completion" data-unit="${unit.id}" data-instance="${item.id}" data-field="completedBy"></td>
              <td><input type="number" step="0.25" value="${item.completion.actualHours}" data-scope="completion" data-unit="${unit.id}" data-instance="${item.id}" data-field="actualHours"></td>
              <td><select data-scope="document" data-unit="${unit.id}" data-instance="${item.id}" data-field="type">${["Trip Report", "Action Plan", "CAPA", "SAE", "Other"].map((v) => option(v, doc.type)).join("")}</select></td>
              <td><select data-scope="document" data-unit="${unit.id}" data-instance="${item.id}" data-field="status">${["Missing", "Draft", "Final", "Filed"].map((v) => option(v, doc.status)).join("")}</select></td>
              <td><input placeholder="TMF/eTMF link placeholder" value="${escapeHtml(doc.link || "")}" data-scope="document" data-unit="${unit.id}" data-instance="${item.id}" data-field="link"></td>
              <td><span class="badge ${isValidated(item) ? "good" : item.completion.completed ? "warn" : ""}">${validationLabel(item)}</span></td>
            </tr>`;
          }).join("")}
        </tbody>
      </table>
    </div>
    ${warningPanel(unit)}
  `;
}

function paymentTab(unit) {
  const completed = unit.schedule.filter((item) => item.completion.completed);
  if (!completed.length) return `<div class="empty">No completed units yet. Mark an instance complete to unlock payment logic.</div>`;
  return `
    <div class="table-wrap">
      <table>
        <thead><tr><th>Unit</th><th>Paid to investigator by CRO</th><th>Paid to CRO by Sponsor</th><th>Payment trigger</th><th>Warnings</th></tr></thead>
        <tbody>
          ${completed.map((item) => `
            <tr>
              <td>${unit.unitType} ${item.index}</td>
              <td><select data-scope="payment" data-unit="${unit.id}" data-instance="${item.id}" data-field="paidToInvestigatorByCro">${["Yes", "No", "Not applicable"].map((v) => option(v, item.payment.paidToInvestigatorByCro)).join("")}</select></td>
              <td><select data-scope="payment" data-unit="${unit.id}" data-instance="${item.id}" data-field="paidToCroBySponsor">${["Yes", "No", "Not billable"].map((v) => option(v, item.payment.paidToCroBySponsor)).join("")}</select></td>
              <td><select data-scope="payment" data-unit="${unit.id}" data-instance="${item.id}" data-field="paymentTrigger">${["Completion only", "Completion + document filed", "Completion + sponsor approval", "Manual approval"].map((v) => option(v, item.payment.paymentTrigger)).join("")}</select></td>
              <td>${warnFor(unit, item).map((w) => `<span class="badge warn">${w}</span>`).join(" ") || `<span class="badge good">Clear</span>`}</td>
            </tr>`).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function costTab(unit) {
  const m = metricsFor(unit);
  return `
    <div class="split-panel">
      <div class="panel">
        <h3>Cost Summary</h3>
        ${rollupRow("Labor per unit", currency.format(laborCostPerUnit(unit)))}
        ${rollupRow("Pass-through per unit", currency.format(passThroughCostPerUnit(unit)))}
        ${rollupRow("Investigator grant per unit", currency.format(investigatorGrantPerUnit(unit)))}
        ${rollupRow("Unit planned cost", currency.format(m.plannedUnit))}
        ${rollupRow("Total planned budget", currency.format(m.totalPlanned))}
        ${rollupRow("Total labor budget", currency.format(m.labor))}
        ${rollupRow("Total pass-through budget", currency.format(m.passThrough))}
        ${rollupRow("Total investigator grants", currency.format(m.investigatorGrants))}
        ${rollupRow("Actual cost", currency.format(m.actual))}
        ${rollupRow("Variance", currency.format(m.actual - m.totalPlanned))}
        ${rollupRow("Validated cost", currency.format(m.validated))}
        ${rollupRow("Not validated cost", currency.format(m.notValidated))}
        ${rollupRow("Open exposure", currency.format(m.openExposure))}
      </div>
      <div class="panel warnings">
        <h3>Risk Signals</h3>
        ${allWarnings(unit).map((w) => `<div class="warning">${w}</div>`).join("") || `<div class="badge good">No warnings</div>`}
      </div>
    </div>
    <div class="rollups" style="margin-top:12px">
      ${rollupPanel("By Milestone", rollup(unit, (row) => row.milestone))}
      ${rollupPanel("By Location", locationRollup(unit))}
      ${rollupPanel("By Department", rollup(unit, (row) => row.department))}
      ${rollupPanel("By Job Role", rollup(unit, (row) => row.jobRole))}
      ${rollupPanel("By Month", monthRollup(unit))}
      ${rollupPanel("By Completion Status", statusRollup(unit))}
      ${rollupPanel("By Payment Status", paymentRollup(unit))}
    </div>
  `;
}

function rollup(unit, keyFn) {
  return unit.composition.reduce((acc, row) => {
    const key = keyFn(row);
    acc[key] = (acc[key] || 0) + Number(row.hoursPerUnit || 0) * Number(row.hourlyRate || 0) * unitCount(unit);
    return acc;
  }, {});
}

function locationRollup(unit) {
  const planned = unitPlannedCost(unit);
  return locationAllocations(unit).reduce((acc, row) => {
    acc[row.name || row.level] = (acc[row.name || row.level] || 0) + Number(row.units || 0) * planned;
    return acc;
  }, {});
}

function monthRollup(unit) {
  return unit.schedule.reduce((acc, item) => {
    const key = item.plannedDate ? new Date(`${item.plannedDate}T00:00`).toLocaleString("en-US", { month: "short", year: "numeric" }) : "TBD";
    acc[key] = (acc[key] || 0) + unitPlannedCost(unit);
    return acc;
  }, {});
}

function statusRollup(unit) {
  return unit.schedule.reduce((acc, item) => {
    const key = item.completion.completed ? "Completed" : item.plannedDate ? "Scheduled" : "Unscheduled";
    acc[key] = (acc[key] || 0) + unitPlannedCost(unit);
    return acc;
  }, {});
}

function paymentRollup(unit) {
  return unit.schedule.reduce((acc, item) => {
    const key = item.payment.paidToCroBySponsor === "Yes" ? "Sponsor paid" : item.payment.paidToInvestigatorByCro === "Yes" ? "CRO exposure" : "Open";
    acc[key] = (acc[key] || 0) + unitPlannedCost(unit);
    return acc;
  }, {});
}

function rollupPanel(title, data) {
  return `<div class="panel"><h3>${title}</h3>${Object.entries(data).map(([key, value]) => rollupRow(key, currency.format(value))).join("")}</div>`;
}

function rollupRow(label, value) {
  return `<div class="rollup-row"><span>${escapeHtml(label)}</span><strong>${value}</strong></div>`;
}

function validationLabel(item) {
  if (isValidated(item)) return "Validated";
  if (item.completion.completed) return "Pending evidence";
  return "Not started";
}

function warningPanel(unit) {
  const warnings = allWarnings(unit);
  return `<div class="warnings" style="margin-top:12px">${warnings.map((w) => `<div class="warning">${w}</div>`).join("")}</div>`;
}

function allWarnings(unit) {
  return unit.schedule.flatMap((item) => warnFor(unit, item).map((warning) => `${unit.unitType} ${item.index}: ${warning}`));
}

function warningCount(unit) {
  return allWarnings(unit).length;
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[char]);
}

function findUnit(id) {
  return state.units.find((unit) => unit.id === id);
}

function findInstance(unit, id) {
  return unit.schedule.find((item) => item.id === id);
}

function findBudgetRow(id) {
  return state.budgetRows.find((row) => row.id === id);
}

function splitTotal(row) {
  return (row.splits || []).reduce((sum, split) => sum + Number(split.units || 0), 0);
}

function countryRemainder(row) {
  return Math.max(Number(row.numberOfUnits || 0) - splitTotal(row), 0);
}

function siteTotal(split) {
  return (split.sites || []).reduce((sum, site) => sum + Number(site.units || 0), 0);
}

function siteRemainder(split) {
  return Math.max(Number(split.units || 0) - siteTotal(split), 0);
}

function hasOverallocatedSites(row) {
  return (row.splits || []).some((split) => siteTotal(split) > Number(split.units || 0));
}

function moveSiteToCountry(row, fromSplit, site, countryName) {
  if (fromSplit.name === countryName) return;
  const target = row.splits.find((split) => split.name === countryName);
  if (!target) return;
  fromSplit.sites = (fromSplit.sites || []).filter((item) => item.id !== site.id);
  target.sites = target.sites || [];
  target.siteOpen = true;
  target.sites.push({ ...site, countryName });
}

function locationAllocationsFromBudgetRow(row) {
  if (!row.splits?.length) {
    return [
      {
        id: uid("loc"),
        level: row.locationLevel || "Global",
        name: row.locationLevel === "Global" ? "Global" : row.locationName.trim() || "Unassigned Location",
        units: Math.max(Number(row.numberOfUnits || 1), 1),
        startDate: row.startDate,
        endDate: row.endDate,
        assumptionType: row.locationLevel === "Global" ? "Default" : "Study-specific"
      }
    ];
  }

  const allocations = [];
  row.splits.forEach((split) => {
    if (split.sites?.length) {
      split.sites.forEach((site) => {
        allocations.push({
          id: uid("loc"),
          level: "Site",
          name: `${site.countryName || split.name} / ${site.name}`,
          countryName: site.countryName || split.name,
          units: Number(site.units || 0),
          startDate: split.startDate || row.startDate,
          endDate: split.endDate || row.endDate,
          assumptionType: "Study-specific"
        });
      });
      if (siteRemainder(split)) {
        allocations.push({
          id: uid("loc"),
          level: "Site",
          name: `${split.name} / TBD Site`,
          countryName: split.name,
          units: siteRemainder(split),
          startDate: split.startDate || row.startDate,
          endDate: split.endDate || row.endDate,
          assumptionType: "Default"
        });
      }
    } else {
      allocations.push({
        id: uid("loc"),
        level: "Country",
        name: split.name,
        units: Number(split.units || 0),
        startDate: split.startDate || row.startDate,
        endDate: split.endDate || row.endDate,
        assumptionType: "Study-specific"
      });
    }
  });

  if (countryRemainder(row)) {
    allocations.push({
      id: uid("loc"),
      level: "Country",
      name: "TBD Country",
      units: countryRemainder(row),
      startDate: row.startDate,
      endDate: row.endDate,
      assumptionType: "Default"
    });
  }
  return allocations.filter((allocation) => Number(allocation.units || 0) > 0);
}

function defaultCountrySplits(row) {
  const total = Math.max(Number(row.numberOfUnits || 1), 1);
  if (total === 10) {
    return [
      { id: uid("split"), name: "France", units: 3, startDate: row.startDate, endDate: row.endDate, siteOpen: false, sites: [] },
      { id: uid("split"), name: "Switzerland", units: 3, startDate: row.startDate, endDate: row.endDate, siteOpen: false, sites: [] },
      { id: uid("split"), name: "Italy", units: 3, startDate: row.startDate, endDate: row.endDate, siteOpen: false, sites: [] }
    ];
  }
  const first = Math.ceil(total / 3);
  const second = Math.floor((total - first) / 2);
  return [
    { id: uid("split"), name: "France", units: first, startDate: row.startDate, endDate: row.endDate, siteOpen: false, sites: [] },
    { id: uid("split"), name: "Switzerland", units: second, startDate: row.startDate, endDate: row.endDate, siteOpen: false, sites: [] },
    { id: uid("split"), name: "Italy", units: 0, startDate: row.startDate, endDate: row.endDate, siteOpen: false, sites: [] }
  ];
}

function activeUnits() {
  const ids = new Set(state.budgetRows.map((row) => row.unitId).filter(Boolean));
  return state.units.filter((unit) => ids.has(unit.id));
}

function commercialSourceFor(unit) {
  const row = state.budgetRows.find((item) => item.unitId === unit.id);
  return row?.commercialSource || unit.commercialSource || "Contract Unit";
}

function locationAllocations(unit) {
  if (!unit.locationAllocations?.length) {
    unit.locationAllocations = [
      {
        id: uid("loc"),
        level: unit.locationLevel || "Global",
        name: unit.locationName || "Global",
        units: Number(unit.numberOfUnits || 1),
        assumptionType: unit.locationLevel === "Global" ? "Default" : "Study-specific"
      }
    ];
  }
  return unit.locationAllocations;
}

function locationTotal(unit) {
  return locationAllocations(unit).reduce((sum, row) => sum + Number(row.units || 0), 0);
}

function locationDetailLevel(unit) {
  const order = ["Global", "Region", "Country", "Site"];
  return locationAllocations(unit).reduce((best, row) => (order.indexOf(row.level) > order.indexOf(best) ? row.level : best), "Global");
}

function staffingRowLevel(row) {
  if (row.employeeName && row.employeeName !== "Not assigned") return "Employee";
  if (row.jobRole) return "Role";
  return "Department";
}

function staffingDetailLevel(unit) {
  if (unit.composition.some((row) => staffingRowLevel(row) === "Employee")) return "Employee";
  if (unit.composition.some((row) => staffingRowLevel(row) === "Role")) return "Role";
  return "Department";
}

function timingDetailLevel(unit) {
  if (unit.schedule.some((item) => item.scheduleAssumptionType === "Study-specific")) return "Exact dates";
  if (unit.schedule.some((item) => item.plannedDate)) return "Generated dates";
  return "Date range";
}

function actualDetailLevel(unit) {
  if (unit.schedule.some((item) => item.payment.paidToCroBySponsor === "Yes")) return "Paid";
  if (unit.schedule.some(isValidated)) return "Validated";
  if (unit.schedule.some((item) => item.completion.completed)) return "Completed";
  return "Planned";
}

function detailStatus(unit) {
  return `${locationDetailLevel(unit)} / ${staffingDetailLevel(unit)} detail`;
}

function nextLocationAllocation(unit) {
  const current = locationDetailLevel(unit);
  const next = current === "Global" ? "Region" : current === "Region" ? "Country" : "Site";
  const names = { Region: "Europe", Country: "Germany", Site: "Site 001" };
  return { id: uid("loc"), level: next, name: names[next], units: 1, assumptionType: "Study-specific" };
}

function syncUnitCountFromLocations(unit) {
  const total = locationTotal(unit);
  if (total > 0) {
    unit.numberOfUnits = total;
    resizeSchedule(unit);
    assignScheduleLocations(unit);
    const row = state.budgetRows.find((item) => item.unitId === unit.id);
    if (row) {
      row.numberOfUnits = total;
      row.locationLevel = locationDetailLevel(unit);
      row.locationName = locationAllocations(unit).map((item) => item.name).join(", ");
      row.dirty = true;
    }
  }
}

function expandedLocationSlots(unit) {
  return locationAllocations(unit).flatMap((allocation) =>
    Array.from({ length: Number(allocation.units || 0) }, () => ({
      locationLevel: allocation.level,
      locationName: allocation.name,
      startDate: allocation.startDate,
      endDate: allocation.endDate
    }))
  );
}

function assignScheduleLocations(unit) {
  const slots = expandedLocationSlots(unit);
  unit.schedule.forEach((item, index) => {
    const slot = slots[index] || { locationLevel: unit.locationLevel || "Global", locationName: unit.locationName || "Global" };
    item.locationLevel = slot.locationLevel;
    item.locationName = slot.locationName;
  });
}

function applyCountrySplit(unit) {
  unit.locationAllocations = [
    { id: uid("loc"), level: "Country", name: "France", units: 3, assumptionType: "Study-specific" },
    { id: uid("loc"), level: "Country", name: "Switzerland", units: 3, assumptionType: "Study-specific" },
    { id: uid("loc"), level: "Country", name: "Italy", units: 4, assumptionType: "Study-specific" }
  ];
  syncUnitCountFromLocations(unit);
}

function normalizeName(value) {
  return String(value || "").trim().toLowerCase();
}

function resizeSchedule(unit) {
  const count = Math.max(Number(unit.numberOfUnits || 1), 1);
  unit.schedule = Array.from({ length: count }, (_, index) => {
    const existing = unit.schedule[index];
    return {
      ...(existing || instance(index + 1, "", "Default", false, "", "", 0, "Missing", "Not applicable", "No")),
      id: existing?.id || uid("unit-instance"),
      index: index + 1,
      locationLevel: existing?.locationLevel || unit.locationLevel || "Global",
      locationName: existing?.locationName || unit.locationName || "Global"
    };
  });
}

function makeUnitFromRow(row) {
  const allocations = locationAllocationsFromBudgetRow(row);
  const unit = {
    id: uid("unit"),
    unitName: row.unitName.trim() || "New Budget Unit",
    unitType: row.unitName.toLowerCase().includes("month") ? "Month" : "Visit",
    numberOfUnits: Math.max(Number(row.numberOfUnits || 1), 1),
    milestone: row.milestone.trim() || "Unassigned Milestone",
    phase: row.phase.trim() || "Unassigned Phase",
    locationLevel: row.splits?.length ? "Country" : row.locationLevel || "Global",
    locationName: row.splits?.length ? allocations.map((allocation) => allocation.name).join(", ") : row.locationLevel === "Global" ? "Global" : row.locationName.trim() || "Unassigned Location",
    locationAllocations: allocations,
    passThroughCostPerUnit: Number(row.passThroughCostPerUnit || 0),
    investigatorGrantPerUnit: Number(row.investigatorGrantPerUnit || 0),
    commercialSource: row.commercialSource || "Contract Unit",
    defaultAssumptionEnabled: true,
    composition: defaultComposition.map((role) => ({
      id: uid("role"),
      assumptionType: "Default",
      ...role,
      milestone: row.milestone.trim() || role.milestone
    })),
    schedule: [],
    activeTab: "detail",
    expanded: true
  };
  generateSchedule(unit, row.startDate || "2025-04-01", row.endDate || "2025-12-31");
  return unit;
}

function commitBudgetRow(row) {
  let unit = row.unitId ? findUnit(row.unitId) : null;
  if (!unit) unit = state.units.find((item) => normalizeName(item.unitName) === normalizeName(row.unitName));
  if (!unit) {
    unit = makeUnitFromRow(row);
    state.units.push(unit);
  } else {
    const allocations = locationAllocationsFromBudgetRow(row);
    unit.unitName = row.unitName.trim() || unit.unitName;
    unit.numberOfUnits = Math.max(Number(row.numberOfUnits || 1), 1);
    unit.milestone = row.milestone.trim() || unit.milestone;
    unit.phase = row.phase.trim() || unit.phase || "Unassigned Phase";
    unit.passThroughCostPerUnit = Number(row.passThroughCostPerUnit || unit.passThroughCostPerUnit || 0);
    unit.investigatorGrantPerUnit = Number(row.investigatorGrantPerUnit || unit.investigatorGrantPerUnit || 0);
    unit.commercialSource = row.commercialSource || unit.commercialSource || "Contract Unit";
    unit.locationLevel = row.splits?.length ? "Country" : row.locationLevel || "Global";
    unit.locationName = row.splits?.length ? allocations.map((allocation) => allocation.name).join(", ") : row.locationLevel === "Global" ? "Global" : row.locationName.trim() || "Unassigned Location";
    unit.locationAllocations = allocations;
    unit.composition.forEach((role) => {
      role.milestone = unit.milestone;
    });
    generateSchedule(unit, row.startDate || "2025-04-01", row.endDate || "2025-12-31");
    unit.expanded = true;
  }
  row.unitId = unit.id;
  row.unitName = unit.unitName;
  row.phase = unit.phase || row.phase;
  row.milestone = unit.milestone;
  row.locationLevel = unit.locationLevel || "Global";
  row.locationName = unit.locationName || "Global";
  row.numberOfUnits = unit.numberOfUnits;
  row.passThroughCostPerUnit = passThroughCostPerUnit(unit);
  row.investigatorGrantPerUnit = investigatorGrantPerUnit(unit);
  row.commercialSource = unit.commercialSource || row.commercialSource || "Contract Unit";
  row.splits = row.splits || [];
  row.dirty = false;
  state.selectedUnitId = unit.id;
  loadDraftFromUnit(unit);
  return unit;
}

function loadDraftFromUnit(unit) {
  state.draft = {
    unitName: unit.unitName,
    unitType: unit.unitType,
    numberOfUnits: unit.numberOfUnits,
    milestone: unit.milestone,
    defaultAssumptionEnabled: unit.defaultAssumptionEnabled
  };
}

function catalogItemFor(unitName) {
  return sampleCatalog.find((item) => item.unit === unitName) || sampleCatalog.find((item) => normalizeName(item.unit) === normalizeName(unitName));
}

function generateSchedule(unit, start, end) {
  const startDate = new Date(`${start}T00:00`);
  const endDate = new Date(`${end}T00:00`);
  const count = Number(unit.numberOfUnits || 0);
  const slots = expandedLocationSlots(unit);
  unit.schedule = Array.from({ length: count }, (_, index) => {
    const existing = unit.schedule[index];
    const slot = slots[index] || { locationLevel: unit.locationLevel || "Global", locationName: unit.locationName || "Global" };
    const scopedSlots = slots.filter((item) => item.locationName === slot.locationName);
    const localIndex = slots.slice(0, index + 1).filter((item) => item.locationName === slot.locationName).length - 1;
    const scopedStart = new Date(`${slot.startDate || start}T00:00`);
    const scopedEnd = new Date(`${slot.endDate || end}T00:00`);
    const span = Math.max(scopedEnd - scopedStart, 0);
    const date = new Date(scopedStart.getTime() + (scopedSlots.length <= 1 ? 0 : (span / (scopedSlots.length - 1)) * localIndex));
    return {
      ...(existing || instance(index + 1, "", "Default", false, "", "", 0, "Missing", "Not applicable", "No")),
      id: existing?.id || uid("unit-instance"),
      index: index + 1,
      locationLevel: slot.locationLevel,
      locationName: slot.locationName,
      plannedDate: date.toISOString().slice(0, 10),
      scheduleAssumptionType: "Default"
    };
  });
}

function recomputeValidation(item) {
  item.completion.validationStatus = validationLabel(item);
}

app.addEventListener("input", (event) => {
  const el = event.target;
  if (!el.dataset.scope) return;
  const value = el.type === "checkbox" ? el.checked : el.type === "number" ? Number(el.value) : el.value;
  updateFromInput(el, value);
  if (el.type === "checkbox") render();
});

app.addEventListener("change", (event) => {
  const el = event.target;
  if (!el.dataset.scope) return;
  const value = el.type === "checkbox" ? el.checked : el.type === "number" ? Number(el.value) : el.value;
  updateFromInput(el, value);
  render();
});

app.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  const action = button.dataset.action;
  const unit = findUnit(button.dataset.unit);
  if (action === "set-view") {
    state.activeView = button.dataset.view || "plan";
  }
  if (action === "toggle-add-menu") {
    state.showAddMenu = !state.showAddMenu;
  }
  if (action === "add-catalog-row") {
    const picked = catalogItemFor(state.catalogPick);
    if (picked && !state.budgetRows.some((row) => normalizeName(row.unitName) === normalizeName(picked.unit))) {
      state.budgetRows.push({
        id: uid("budget-row"),
        unitId: "",
        unitName: picked.unit,
        phase: picked.phase,
        milestone: picked.milestone,
        numberOfUnits: picked.unit === "Monitoring Visit" ? 10 : 1,
        passThroughCostPerUnit: 0,
        investigatorGrantPerUnit: 0,
        commercialSource: "Contract Unit",
        startDate: "2025-04-01",
        endDate: "2025-12-31",
        locationLevel: "Global",
        locationName: "Global",
        splitOpen: false,
        splits: [],
        dirty: true
      });
    }
    state.showAddMenu = false;
  }
  if (action === "toggle-unit" && unit) unit.expanded = !unit.expanded;
  if (action === "set-tab" && unit) unit.activeTab = button.dataset.tab;
  if (action === "add-role" && unit) {
    unit.composition.push({
      id: uid("role"),
      department: "Clinical Operations",
      jobRole: "New role",
      function: "Support",
      employeeName: "Not assigned",
      hoursPerUnit: 1,
      hourlyRate: 100,
      milestone: unit.milestone,
      assumptionType: "Study-specific"
    });
  }
  if (action === "add-location-allocation" && unit) {
    const allocations = locationAllocations(unit);
    if (allocations.length === 1 && allocations[0].level === "Global") allocations[0].units = Math.max(unit.numberOfUnits - 1, 0);
    allocations.push(nextLocationAllocation(unit));
    syncUnitCountFromLocations(unit);
  }
  if (action === "apply-country-split" && unit) {
    applyCountrySplit(unit);
  }
  if (action === "delete-location-allocation" && unit) {
    unit.locationAllocations = locationAllocations(unit).filter((row) => row.id !== button.dataset.location);
    syncUnitCountFromLocations(unit);
  }
  if (action === "assign-sample-employees" && unit) {
    const names = ["Maya Chen", "Jonas Keller", "Amina Novak", "Leo Martin"];
    unit.composition.forEach((row, index) => {
      row.employeeName = names[index % names.length];
      row.assumptionType = "Study-specific";
    });
  }
  if (action === "generate-schedule" && unit) {
    const start = app.querySelector(`[data-scope="schedule-generator"][data-unit="${unit.id}"][data-field="start"]`)?.value || "2025-04-01";
    const end = app.querySelector(`[data-scope="schedule-generator"][data-unit="${unit.id}"][data-field="end"]`)?.value || "2025-12-31";
    generateSchedule(unit, start, end);
  }
  if (action === "toggle-country-split") {
    const row = findBudgetRow(button.dataset.row);
    if (row) {
      if (!row.splits?.length) row.splits = defaultCountrySplits(row);
      row.splitOpen = !row.splitOpen;
      row.dirty = true;
    }
  }
  if (action === "add-country-split") {
    const row = findBudgetRow(button.dataset.row);
    if (row) {
      row.splits.push({ id: uid("split"), name: "New country", units: 0, startDate: row.startDate, endDate: row.endDate, siteOpen: false, sites: [] });
      row.dirty = true;
    }
  }
  if (action === "delete-country-split") {
    const row = findBudgetRow(button.dataset.row);
    if (row) {
      row.splits = row.splits.filter((split) => split.id !== button.dataset.split);
      row.dirty = true;
    }
  }
  if (action === "toggle-site-split") {
    const row = findBudgetRow(button.dataset.row);
    const split = row?.splits.find((item) => item.id === button.dataset.split);
    if (split) {
      if (!split.sites?.length) split.sites = [{ id: uid("site"), countryName: split.name, name: `${split.name.slice(0, 2).toUpperCase()}-001`, units: 1 }];
      split.siteOpen = !split.siteOpen;
      row.dirty = true;
    }
  }
  if (action === "add-site-split") {
    const row = findBudgetRow(button.dataset.row);
    const split = row?.splits.find((item) => item.id === button.dataset.split);
    if (split) {
      split.sites = split.sites || [];
      split.sites.push({ id: uid("site"), countryName: split.name, name: "New site", units: 1 });
      row.dirty = true;
    }
  }
  if (action === "delete-site-split") {
    const row = findBudgetRow(button.dataset.row);
    const split = row?.splits.find((item) => item.id === button.dataset.split);
    if (split) {
      split.sites = (split.sites || []).filter((site) => site.id !== button.dataset.site);
      row.dirty = true;
    }
  }
  if (action === "save-country-split") {
    const row = findBudgetRow(button.dataset.row);
    if (row && splitTotal(row) <= Number(row.numberOfUnits || 0) && !hasOverallocatedSites(row)) commitBudgetRow(row);
  }
  if (action === "save-budget-row") {
    const row = findBudgetRow(button.dataset.row);
    if (row) commitBudgetRow(row);
  }
  if (action === "open-budget-row") {
    const row = findBudgetRow(button.dataset.row);
    const targetUnit = row ? findUnit(row.unitId) : null;
    if (targetUnit && !row.dirty) {
      state.selectedUnitId = targetUnit.id;
      targetUnit.expanded = true;
      loadDraftFromUnit(targetUnit);
    }
  }
  if (action === "delete-budget-row") {
    state.budgetRows = state.budgetRows.filter((row) => row.id !== button.dataset.row);
    if (!activeUnits().some((item) => item.id === state.selectedUnitId)) {
      state.selectedUnitId = activeUnits()[0]?.id || "";
    }
  }
  render();
});

function updateFromInput(el, value) {
  if (el.dataset.scope === "draft") {
    state.draft[el.dataset.field] = value;
    return;
  }

  if (el.dataset.scope === "catalog-pick") {
    state.catalogPick = value;
    return;
  }

  if (el.dataset.scope === "selected-unit") {
    state.selectedUnitId = value;
    const selected = findUnit(value);
    if (selected) {
      selected.expanded = true;
      loadDraftFromUnit(selected);
    }
    return;
  }

  const unit = findUnit(el.dataset.unit);

  if (el.dataset.scope === "budget-row") {
    const row = findBudgetRow(el.dataset.row);
    if (!row) return;
    row[el.dataset.field] = value;
    if (el.dataset.field === "locationLevel") {
      row.locationName = value === "Global" ? "Global" : "";
    }
    row.dirty = true;
    const item = catalogItemFor(row.unitName);
    if (el.dataset.field === "unitName" && item) {
      row.phase = item.phase;
      row.milestone = item.milestone;
    }
    return;
  }

  if (el.dataset.scope === "country-split") {
    const row = findBudgetRow(el.dataset.row);
    const split = row?.splits.find((item) => item.id === el.dataset.split);
    if (!split) return;
    split[el.dataset.field] = value;
    row.dirty = true;
    return;
  }

  if (el.dataset.scope === "site-split") {
    const row = findBudgetRow(el.dataset.row);
    const split = row?.splits.find((item) => item.id === el.dataset.split);
    const site = split?.sites?.find((item) => item.id === el.dataset.site);
    if (!site) return;
    if (el.dataset.field === "countryName") {
      moveSiteToCountry(row, split, site, value);
      row.dirty = true;
      return;
    }
    site[el.dataset.field] = value;
    row.dirty = true;
    return;
  }

  if (!unit) return;

  if (el.dataset.scope === "unit-field") {
    const previousName = unit.unitName;
    unit[el.dataset.field] = value;
    if (el.dataset.field === "numberOfUnits") resizeSchedule(unit);
    if (el.dataset.field === "unitName") {
      state.budgetRows.forEach((row) => {
        if (row.unitId === unit.id || row.unitName === previousName) {
          row.unitName = value;
          row.dirty = true;
        }
      });
    }
    if (el.dataset.field === "locationName") {
      state.budgetRows.forEach((row) => {
        if (row.unitId === unit.id) {
          row.locationName = value;
          row.locationLevel = value === "Global" ? "Global" : row.locationLevel || "Site";
          row.dirty = true;
        }
      });
    }
    if (unit.id === state.selectedUnitId) loadDraftFromUnit(unit);
    return;
  }

  if (el.dataset.scope === "composition") {
    const row = unit.composition.find((item) => item.id === el.dataset.row);
    row[el.dataset.field] = value;
    row.assumptionType = "Study-specific";
  }

  if (el.dataset.scope === "location-allocation") {
    const row = locationAllocations(unit).find((item) => item.id === el.dataset.location);
    if (!row) return;
    row[el.dataset.field] = value;
    if (el.dataset.field === "level" && value === "Global") row.name = "Global";
    if (el.dataset.field === "level" && value !== "Global" && row.name === "Global") row.name = value === "Region" ? "Europe" : value === "Country" ? "Germany" : "Site 001";
    row.assumptionType = row.level === "Global" && row.name === "Global" ? "Default" : "Study-specific";
    syncUnitCountFromLocations(unit);
  }

  if (el.dataset.scope === "schedule") {
    const item = findInstance(unit, el.dataset.instance);
    item[el.dataset.field] = value;
    item.scheduleAssumptionType = "Study-specific";
  }

  if (el.dataset.scope === "schedule-location") {
    const item = findInstance(unit, el.dataset.instance);
    item[el.dataset.field] = value;
    item.scheduleAssumptionType = "Study-specific";
  }

  if (el.dataset.scope === "completion") {
    const item = findInstance(unit, el.dataset.instance);
    item.completion[el.dataset.field] = value;
    if (el.dataset.field === "completed" && value && !item.completion.actualCompletionDateTime) {
      item.completion.actualCompletionDateTime = `${item.plannedDate || "2025-04-01"}T17:00`;
      item.completion.completedBy = item.completion.completedBy || "Maya Chen";
      item.completion.actualHours = item.completion.actualHours || plannedHours(unit);
    }
    recomputeValidation(item);
  }

  if (el.dataset.scope === "document") {
    const item = findInstance(unit, el.dataset.instance);
    if (!item.completion.evidenceDocuments.length) item.completion.evidenceDocuments.push({ id: uid("doc"), type: "Trip Report", status: "Missing" });
    item.completion.evidenceDocuments[0][el.dataset.field] = value;
    recomputeValidation(item);
  }

  if (el.dataset.scope === "payment") {
    const item = findInstance(unit, el.dataset.instance);
    item.payment[el.dataset.field] = value;
  }
}

render();
