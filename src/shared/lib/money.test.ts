import { describe, expect, it } from 'vitest';
import { formatEuro, formatEuroDecimal, formatPercentDecimal } from './money';
describe('formatage monetaire fr-FR', () => {
  it('formate les montants de demonstration', () => {
    expect(formatEuro(1000)).toBe('1 000 €');
    expect(formatEuroDecimal(1000)).toBe('1 000,00 €');
    expect(formatPercentDecimal(5)).toBe('5,00 %');
  });
});