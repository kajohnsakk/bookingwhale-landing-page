import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calculateBookingCost } from '../src/lib/booking-cost.ts';

const input = { bookings: 120, minutes: 5, hourlyCost: 150, missed: 3, value: 500 };

test('calculates monthly hours and keeps labor value separate from missed revenue', () => {
  assert.deepEqual(calculateBookingCost(input), { valid: true, hours: 10, laborValue: 1500, missedValue: 1500 });
});

test('zero bookings and zero costs produce zero rather than fabricated losses', () => {
  assert.deepEqual(calculateBookingCost({ ...input, bookings: 0, missed: 0 }), { valid: true, hours: 0, laborValue: 0, missedValue: 0 });
  assert.deepEqual(calculateBookingCost({ ...input, hourlyCost: 0, value: 0 }), { valid: true, hours: 10, laborValue: 0, missedValue: 0 });
});

test('rejects empty, nonfinite, negative, out-of-range and fractional booking counts', () => {
  for (const value of [NaN, Infinity, -1, 100001, 1.5]) {
    const result = calculateBookingCost({ ...input, bookings: value });
    assert.equal(result.valid, false);
    assert.ok(result.invalid.includes('bookings'));
  }
  for (const key of ['minutes', 'hourlyCost', 'missed', 'value']) {
    assert.equal(calculateBookingCost({ ...input, [key]: NaN }).valid, false);
    assert.equal(calculateBookingCost({ ...input, [key]: -1 }).valid, false);
  }
});

test('missed bookings cannot exceed total bookings', () => {
  assert.deepEqual(calculateBookingCost({ ...input, missed: 121 }), { valid: false, invalid: ['missed'] });
  assert.equal(calculateBookingCost({ ...input, missed: 120 }).valid, true);
});

test('uses unrounded hours for money and accepts half-minutes and currency decimals', () => {
  const result = calculateBookingCost({ bookings: 3, minutes: 2.5, hourlyCost: 100.5, missed: 1, value: 99.99 });
  assert.deepEqual(result, { valid: true, hours: 0.125, laborValue: 12.5625, missedValue: 99.99 });
});
