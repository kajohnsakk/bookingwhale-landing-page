import { bookingCostLimits, bookingCostSliderMax, calculateBookingCost, type BookingCostInput } from '../lib/booking-cost';

for (const section of document.querySelectorAll<HTMLElement>('[data-booking-cost]')) {
  const form = section.querySelector<HTMLFormElement>('form')!;
  const inputs = [...form.querySelectorAll<HTMLInputElement>('input[type=number]')];
  const reset = section.querySelector<HTMLButtonElement>('[data-cost-reset]')!;
  const th = section.dataset.locale === 'th';
  const zh = section.dataset.locale === 'zh';
  const numberLocale = zh ? 'zh-CN' : th ? 'th-TH' : 'en-US';
  const format = new Intl.NumberFormat(numberLocale, { maximumFractionDigits: 1 });
  const currency = new Intl.NumberFormat(numberLocale, { maximumFractionDigits: 0 });
  const sliders = [...form.querySelectorAll<HTMLInputElement>('[data-cost-slider]')];
  const syncSliders = () => {
    for (const slider of sliders) {
      const key = slider.dataset.costSlider as keyof BookingCostInput;
      const field = inputs.find(input => input.name === key)!;
      const value = field.valueAsNumber;
      const valid = Number.isFinite(value) && value >= 0 && value <= bookingCostLimits[key].max;
      const max = Math.max(bookingCostSliderMax[key], Number(slider.max), valid ? value : 0);
      slider.max = String(max);
      if (valid) slider.value = String(value);
      slider.style.setProperty('--range-progress', `${slider.valueAsNumber / max * 100}%`);
      slider.setAttribute('aria-valuetext', `${format.format(slider.valueAsNumber)} ${section.querySelector(`#cost-${key}-unit`)!.textContent}`);
      section.querySelector(`[data-cost-range-max="${key}"]`)!.textContent = format.format(max);
    }
  };
  const render = (edited: boolean) => {
    const input = Object.fromEntries(inputs.map(field => [field.name, field.valueAsNumber])) as BookingCostInput;
    const result = calculateBookingCost(input);
    for (const field of inputs) {
      const key = field.name as keyof BookingCostInput;
      const error = section.querySelector<HTMLElement>(`[data-cost-error="${key}"]`)!;
      const invalid = !result.valid && result.invalid.includes(key);
      field.setAttribute('aria-invalid', String(invalid));
      error.hidden = !invalid;
      if (invalid) error.textContent = key === 'missed' && input.missed > input.bookings
        ? (zh ? '不能超过每月预约总数。' : th ? 'ต้องไม่เกินจำนวนการจองต่อเดือน' : 'Cannot exceed total monthly bookings.')
        : (zh ? `请输入 0 至 ${format.format(bookingCostLimits[key].max)} 之间的有效数值。` : th ? `กรอกค่าระหว่าง 0–${format.format(bookingCostLimits[key].max)} ตามช่วงที่ช่องนี้รองรับ` : `Enter a valid value between 0 and ${format.format(bookingCostLimits[key].max)}.`);
    }
    section.querySelector('[data-cost-state]')!.textContent = !result.valid
      ? (zh ? '请检查标出的数值后继续计算。' : th ? 'ตรวจตัวเลขที่กรอก เพื่อคำนวณต่อ' : 'Check the highlighted values to calculate.')
      : edited ? (zh ? '根据您的数据估算 · 每月' : th ? 'ค่าประมาณจากข้อมูลของคุณ · ต่อเดือน' : 'Estimate from your inputs · Per month')
      : (zh ? '示例数据 · 请按实际经营情况调整' : th ? 'ตัวอย่างสมมติ · แก้ตัวเลขให้ตรงกับร้านคุณ' : 'Illustrative example · Adjust to match your business');
    section.querySelector('[data-cost-hours]')!.textContent = result.valid ? format.format(result.hours) : '—';
    section.querySelector('[data-cost-labor]')!.textContent = result.valid ? currency.format(result.laborValue) : '—';
    section.querySelector('[data-cost-missed]')!.textContent = result.valid ? currency.format(result.missedValue) : '—';
  };
  inputs.forEach(input => input.disabled = false);
  sliders.forEach(slider => slider.disabled = false);
  syncSliders();
  reset.disabled = false;
  form.addEventListener('submit', event => event.preventDefault());
  form.addEventListener('input', event => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement)) return;
    if (target.dataset.costSlider) {
      inputs.find(input => input.name === target.dataset.costSlider)!.value = target.value;
    }
    syncSliders();
    render(true);
  });
  reset.addEventListener('click', () => {
    sliders.forEach(slider => slider.max = String(bookingCostSliderMax[slider.dataset.costSlider as keyof BookingCostInput]));
    form.reset();
    syncSliders();
    render(false);
  });
}
