/** Affichage prototype en EUR, à adapter à la devise validée du domaine. */
const formatter = new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 0, maximumFractionDigits: 0});
const decimalFormatter = new Intl.NumberFormat('fr-FR', {minimumFractionDigits: 2, maximumFractionDigits: 2});
const spaces = (formatted: string) => formatted.replace(/[\u00A0\u202F]/g, ' ');
export function formatEuro(value: number): string {
  return `${spaces(formatter.format(Number.isFinite(value) ? value : 0))} €`;
}
export function formatEuroDecimal(value: number): string {
  return `${spaces(decimalFormatter.format(Number.isFinite(value) ? value : 0))} €`;
}
export function formatPercentDecimal(value: number): string {
  return `${spaces(decimalFormatter.format(Number.isFinite(value) ? value : 0))} %`;
}