import { test, describe } from 'node:test';
import assert from 'node:assert';
import { truncateAddress } from './truncate.ts';

describe('Address truncation utility', () => {
  test('truncates valid Stellar public key to 4...4 format', () => {
    const pubKey = 'GA7QYNF7SOWQ3GLR2BGMZEHXAVIRZA4KVWLTJJFC7MGXUA74P7UJUO5U';
    assert.strictEqual(truncateAddress(pubKey), 'GA7Q...UO5U');
  });

  test('handles empty or short strings without error', () => {
    assert.strictEqual(truncateAddress(''), '');
    assert.strictEqual(truncateAddress(null), '');
    assert.strictEqual(truncateAddress('SHORT'), 'SHORT');
  });

  test('supports custom start and end lengths', () => {
    const hash = 'abcdef1234567890';
    assert.strictEqual(truncateAddress(hash, 6, 4), 'abcdef...7890');
  });
});
