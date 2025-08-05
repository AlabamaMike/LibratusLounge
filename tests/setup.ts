import { beforeAll, afterAll, beforeEach, afterEach, expect } from 'vitest';

// Global test setup
beforeAll(() => {
  // Setup test environment
});

afterAll(() => {
  // Cleanup after all tests
});

beforeEach(() => {
  // Reset mocks and state before each test
});

afterEach(() => {
  // Cleanup after each test
});

// Mock Cloudflare Workers global objects if needed
if (!globalThis.crypto?.randomUUID) {
  Object.defineProperty(globalThis.crypto, 'randomUUID', {
    value: () => `test-uuid-${Math.random().toString(36).substr(2, 9)}`,
    writable: true,
    configurable: true,
  });
}

// Type definitions for custom matchers
interface Decision {
  action: string;
  confidence: number;
  [key: string]: unknown;
}

// Add custom matchers if needed
interface CustomMatchers<R = unknown> {
  toBeValidDecision(): R;
}

declare module 'vitest' {
  interface Assertion<T = unknown> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}

expect.extend({
  toBeValidDecision(received: unknown): { pass: boolean; message: () => string } {
    const validActions = ['fold', 'call', 'raise', 'check', 'all-in'];
    const decision = received as Decision;
    
    const pass = 
      decision &&
      typeof decision === 'object' &&
      validActions.includes(decision.action) &&
      typeof decision.confidence === 'number' &&
      decision.confidence >= 0 &&
      decision.confidence <= 1;
    
    return {
      pass,
      message: (): string => pass
        ? `expected ${JSON.stringify(received)} not to be a valid decision`
        : `expected ${JSON.stringify(received)} to be a valid decision`,
    };
  },
});