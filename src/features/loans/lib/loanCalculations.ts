/** Pure, demonstrative simple-interest projection. Not a real amortization schedule. */
const MONTHS = ['Janv.', 'Févr.', 'Mars', 'Avr.', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'] as const;
export interface LoanProjectionRow {
  index: number;
  label: string;
  shortLabel: string;
  interest: number;
  cumul: number;
}
export function buildLoanSchedule(amount: number, rate: number, monthsCount: number, startMonthIndex = 11, startYear = 2026): LoanProjectionRow[] {
  if (!Number.isFinite(amount) || amount <= 0) throw new RangeError('Le montant doit etre positif.');
  if (!Number.isFinite(rate) || rate < 0) throw new RangeError('Le taux doit etre positif ou nul.');
  if (!Number.isInteger(monthsCount) || monthsCount < 1 || monthsCount > 360) throw new RangeError('Duree invalide.');
  const monthlyInterest = (amount * rate) / 100;
  return Array.from({length: monthsCount}, (_, i) => {
    const offset = startMonthIndex + i;
    const monthIndex = ((offset % 12) + 12) % 12;
    const year = startYear + Math.floor(offset / 12);
    const name = MONTHS[monthIndex];
    return {index: i+1, label: `${name} ${year}`, shortLabel: `${name}\n${year}`, interest: monthlyInterest, cumul: monthlyInterest*(i+1)};
  });
}