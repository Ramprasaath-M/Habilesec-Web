export type CompanyStatistic = {
  value: number;
  suffix: string;
  label: string;
  approved: boolean;
};

// Proposed values copied from Habilesec EX/src/lib/content.js:STATS and
// backend/src/contentSeed.js. Inherited marketing copy is not verification.
// Management must confirm these before setting approved=true for production.
// In particular, 7+ years conflicts with the reference's 2020 founding year.
export const companyStatistics: readonly CompanyStatistic[] = [
  { value: 7, suffix: "+", label: "YEARS OF EXCELLENCE", approved: false },
  { value: 100, suffix: "+", label: "GLOBAL CLIENTS", approved: false },
  { value: 50, suffix: "+", label: "SECURITY EXPERTS", approved: false },
  { value: 6, suffix: "", label: "INDUSTRY SECTORS", approved: false },
];
