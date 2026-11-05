export const bookingCostLimits = {
  bookings: { max: 100000, step: 1 },
  minutes: { max: 240, step: 0.5 },
  hourlyCost: { max: 100000, step: 0.01 },
  missed: { max: 100000, step: 1 },
  value: { max: 10000000, step: 0.01 },
};

export const bookingCostSliderMax = { bookings: 1000, minutes: 30, hourlyCost: 1000, missed: 50, value: 5000 };

export type BookingCostInput = Record<keyof typeof bookingCostLimits, number>;

export function calculateBookingCost(input: BookingCostInput) {
  const invalid = (Object.keys(bookingCostLimits) as (keyof BookingCostInput)[]).filter(key => {
    const value = input[key];
    const { max, step } = bookingCostLimits[key];
    return !Number.isFinite(value) || value < 0 || value > max || Math.abs(value / step - Math.round(value / step)) > 0.000001;
  });
  if (input.missed > input.bookings && !invalid.includes('missed')) invalid.push('missed');
  if (invalid.length) return { valid: false as const, invalid };
  const hours = input.bookings * input.minutes / 60;
  return { valid: true as const, hours, laborValue: hours * input.hourlyCost, missedValue: input.missed * input.value };
}
