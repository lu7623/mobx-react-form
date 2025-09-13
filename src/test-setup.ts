import '@testing-library/jest-dom';

// Global test setup
declare global {
  function expect<T>(value: T): any;
  function test(name: string, fn: () => void | Promise<void>): void;
  function describe(name: string, fn: () => void): void;
  function beforeEach(fn: () => void): void;
  function afterEach(fn: () => void): void;
}
