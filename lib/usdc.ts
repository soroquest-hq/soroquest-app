/**
 * USDC amount helpers.
 *
 * USDC on Stellar uses 7 decimal places.
 * 1 USDC = 10_000_000 (ten million stroops)
 *
 * The contract stores amounts as i128 (bigint in JS).
 * NEVER do inline math on USDC amounts in components — use these helpers.
 */

const STROOPS_PER_USDC = 10_000_000n;

/**
 * Convert a raw contract amount (bigint) to a display string.
 * @example toDisplayAmount(10_000_000n) === '1.00'
 * @example toDisplayAmount(15_500_000n) === '1.55'
 * @example toDisplayAmount(100n) === '0.0000100'
 */
export function toDisplayAmount(raw: bigint): string {
  const whole = raw / STROOPS_PER_USDC;
  const fraction = raw % STROOPS_PER_USDC;
  const fractionStr = fraction.toString().padStart(7, '0');
  // Trim trailing zeros but keep at least 2 decimal places
  const trimmed = fractionStr.replace(/0+$/, '').padEnd(2, '0');
  return `${whole}.${trimmed}`;
}

/**
 * Convert a display string (from user input) to a raw contract amount (bigint).
 * @example toContractAmount('1.00') === 10_000_000n
 * @example toContractAmount('1.55') === 15_500_000n
 * @throws if the input is not a valid number
 */
export function toContractAmount(display: string): bigint {
  const [wholePart, fractionPart = ''] = display.split('.');
  const paddedFraction = fractionPart.slice(0, 7).padEnd(7, '0');
  return BigInt(wholePart) * STROOPS_PER_USDC + BigInt(paddedFraction);
}

/** Format a raw amount for display with USDC suffix, e.g. "1.50 USDC" */
export function formatUSDC(raw: bigint): string {
  return `${toDisplayAmount(raw)} USDC`;
}
