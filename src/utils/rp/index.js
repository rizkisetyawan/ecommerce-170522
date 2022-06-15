/* eslint-disable import/prefer-default-export */
export const rp = (value) => Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
}).format(value);
