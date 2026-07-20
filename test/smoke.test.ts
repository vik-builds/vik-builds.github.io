import { describe, it, expect } from 'vitest';
import { formatDate } from '../src/lib/format';

describe('harness', () => {
  it('resolves project modules', () => {
    expect(typeof formatDate).toBe('function');
  });
});
