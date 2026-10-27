import { test, describe } from 'node:test';
import assert from 'node:assert';
import { toDisplayAmount, toContractAmount, formatUSDC } from './usdc.ts';

describe('USDC formatting utilities', () => {
  test('toDisplayAmount formats whole numbers to 2 decimal places', () => {
    assert.strictEqual(toDisplayAmount(10_000_000n), '1.00');
  });

  test('toDisplayAmount formats decimals correctly', () => {
    assert.strictEqual(toDisplayAmount(15_500_000n), '1.55');
  });

  test('toDisplayAmount handles fractional stroops', () => {
    assert.strictEqual(toDisplayAmount(100n), '0.00001');
  });

  test('toContractAmount converts display strings to stroops', () => {
    assert.strictEqual(toContractAmount('1.00'), 10_000_000n);
    assert.strictEqual(toContractAmount('1.55'), 15_500_000n);
    assert.strictEqual(toContractAmount('0.00001'), 100n);
  });

  test('formatUSDC appends the USDC unit', () => {
    assert.strictEqual(formatUSDC(10_000_000n), '1.00 USDC');
    assert.strictEqual(formatUSDC(15_500_000n), '1.55 USDC');
  });
});
