import { test, describe } from 'node:test';
import assert from 'node:assert';
import { formatUSDC, toDisplayAmount } from './usdc.ts';

describe('Bounty Card formatting & display', () => {
  test('formats micro-USDC stroop amounts accurately', () => {
    const rawAmount = 50_000_000n; // 5.00 USDC (7 decimals)
    assert.strictEqual(toDisplayAmount(rawAmount), '5.00');
    assert.strictEqual(formatUSDC(rawAmount), '5.00 USDC');
  });

  test('formats zero and large bounty rewards', () => {
    assert.strictEqual(formatUSDC(0n), '0.00 USDC');
    assert.strictEqual(formatUSDC(1_000_000_000n), '100.00 USDC');
  });
});
