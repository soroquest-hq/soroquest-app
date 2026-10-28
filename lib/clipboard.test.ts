import { test, describe } from 'node:test';
import assert from 'node:assert';
import { copyToClipboard } from './clipboard.ts';

describe('Clipboard utility fallback', () => {
  test('returns false cleanly in server-side/Node context', async () => {
    const result = await copyToClipboard('CA7C6LGWPTZVUTZX7EXJVLWCQG6DVWPROBPO3FGXYKEY4W5H4HRPO5UV');
    assert.strictEqual(result, false);
  });
});
