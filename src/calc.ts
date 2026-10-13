/** Real-estate finance helpers shared by the calculator page and teasers. All figures are estimates. */

export interface MortgageInput {
  price: number;
  downPct: number;
  rate: number; // annual %
  years: number;
}

export function mortgage({ price, downPct, rate, years }: MortgageInput) {
  const down = price * (downPct / 100);
  const loan = Math.max(price - down, 0);
  const r = rate / 100 / 12;
  const n = years * 12;
  const monthly = r === 0 ? loan / n : (loan * r) / (1 - Math.pow(1 + r, -n));
  const total = monthly * n;
  return { down, loan, monthly, total, interest: total - loan };
}

/** Largest loan whose payment fits the given monthly budget. */
export function loanForPayment(payment: number, rate: number, years: number) {
  const r = rate / 100 / 12;
  const n = years * 12;
  return r === 0 ? payment * n : (payment * (1 - Math.pow(1 + r, -n))) / r;
}

export interface PlanInput {
  price: number;
  reserve: number;
  signPct: number;
  buildPct: number;
  months: number;
}

/** Pre-construction plan used by the agency: reserve → % at signing → % in installments → balance on delivery. */
export function preconstruction({ price, reserve, signPct, buildPct, months }: PlanInput) {
  const sign = Math.max(price * (signPct / 100) - reserve, 0);
  const build = price * (buildPct / 100);
  const installment = months > 0 ? build / months : build;
  const delivery = price - reserve - sign - build;
  return { reserve, sign, build, installment, delivery };
}

/** Typical Dominican closing costs on a resale: 3% transfer tax + ~1.5% legal/appraisal fees. */
export const CLOSING_PCT = 4.5;
