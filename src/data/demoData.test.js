import { describe, expect, it } from 'vitest';
import { SIDEBAR_ITEMS } from './demoData';

describe('sidebar navigation fixtures', () => {
  it('has a valid icon component for each navigation entry', () => {
    expect(SIDEBAR_ITEMS.length).toBeGreaterThan(0);
    for (const item of SIDEBAR_ITEMS) {
      expect(item.id).toBeTruthy();
      expect(item.label).toBeTruthy();
      expect(typeof item.icon).toBe('object');
      expect(item.icon).toBeTruthy();
    }
  });
});
