import { describe, expect, it } from 'vitest';
import { buildLoanSchedule } from './loanCalculations';
describe('projection de pret (interets simples mensuels)', () => {
  it('calcule les interets et le cumul sur 12 mois', () => {
    const schedule = buildLoanSchedule(1000, 5, 12);
    expect(schedule).toHaveLength(12);
    expect(schedule[0]).toMatchObject({label: 'Déc. 2026', interest: 50, cumul: 50});
    expect(schedule.at(-1)).toMatchObject({label: 'Nov. 2027', cumul: 600});
  });
  it('refuse les valeurs invalides', () => {
    expect(() => buildLoanSchedule(-1000, 5, 12)).toThrow(RangeError);
    expect(() => buildLoanSchedule(1000, -2, 12)).toThrow(RangeError);
    expect(() => buildLoanSchedule(1000, 5, 0)).toThrow(RangeError);
  });
});