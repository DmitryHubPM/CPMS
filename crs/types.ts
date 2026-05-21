export type UnitType = "Visit" | "Month";
export type AssumptionType = "Default" | "Study-specific";
export type DocumentType = "Trip Report" | "Action Plan" | "CAPA" | "SAE" | "Other";
export type DocumentStatus = "Missing" | "Draft" | "Final" | "Filed";
export type ValidationStatus = "Not started" | "Pending evidence" | "Validated";
export type PaymentTrigger =
  | "Completion only"
  | "Completion + document filed"
  | "Completion + sponsor approval"
  | "Manual approval";

export interface RateCard {
  department: string;
  jobRole: string;
  function: string;
  hourlyRate: number;
}

export interface UnitComposition {
  id: string;
  department: string;
  jobRole: string;
  function: string;
  employeeName: string;
  hoursPerUnit: number;
  hourlyRate: number;
  milestone: string;
  assumptionType: AssumptionType;
}

export interface EvidenceDocument {
  id: string;
  type: DocumentType;
  status: DocumentStatus;
  link?: string;
}

export interface UnitCompletion {
  completed: boolean;
  actualCompletionDateTime: string;
  completedBy: string;
  actualHours: number;
  evidenceDocuments: EvidenceDocument[];
  validationStatus: ValidationStatus;
}

export interface PaymentStatus {
  paidToInvestigatorByCro: "Yes" | "No" | "Not applicable";
  paidToCroBySponsor: "Yes" | "No" | "Not billable";
  paymentTrigger: PaymentTrigger;
}

export interface UnitSchedule {
  id: string;
  index: number;
  locationLevel?: "Global" | "Region" | "Country" | "Site";
  locationName?: string;
  plannedDate: string;
  scheduleAssumptionType: AssumptionType;
  completion: UnitCompletion;
  payment: PaymentStatus;
}

export interface LocationAllocation {
  id: string;
  level: "Global" | "Region" | "Country" | "Site";
  name: string;
  units: number;
  assumptionType: AssumptionType;
}

export interface BudgetUnit {
  id: string;
  unitName: string;
  unitType: UnitType;
  numberOfUnits: number;
  milestone: string;
  phase?: string;
  locationLevel?: "Global" | "Region" | "Country" | "Site";
  locationName?: string;
  locationAllocations?: LocationAllocation[];
  passThroughCostPerUnit?: number;
  investigatorGrantPerUnit?: number;
  defaultAssumptionEnabled: boolean;
  composition: UnitComposition[];
  schedule: UnitSchedule[];
  activeTab: "detail" | "composition" | "schedule" | "evidence" | "payment" | "cost";
  expanded: boolean;
}

export type BudgetStructureLineKind = "Phase" | "Milestone" | "Budget Unit";

export interface BudgetStructureLine {
  id: string;
  kind: BudgetStructureLineKind;
  name: string;
  unitId?: string;
}

export interface BudgetGridRow {
  id: string;
  unitId?: string;
  unitName: string;
  phase: string;
  milestone: string;
  locationLevel: "Global" | "Region" | "Country" | "Site";
  locationName: string;
  passThroughCostPerUnit?: number;
  investigatorGrantPerUnit?: number;
  splitOpen?: boolean;
  splits?: Array<{
    id: string;
    name: string;
    units: number;
    startDate: string;
    endDate: string;
    siteOpen?: boolean;
    sites?: Array<{
      id: string;
      countryName?: string;
      name: string;
      units: number;
    }>;
  }>;
  numberOfUnits: number;
  startDate: string;
  endDate: string;
  dirty: boolean;
}
