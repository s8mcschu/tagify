import { Counter } from './counter';

describe('Counter', () => {
  it('should create an instance', () => {
    const directive = new Counter();
    expect(directive).toBeTruthy();
  });
});
