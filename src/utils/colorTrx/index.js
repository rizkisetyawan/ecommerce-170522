/* eslint-disable import/prefer-default-export */
export const colorTrx = (status = '') => {
  const result = {};
  switch (status) {
  case 'selesai':
    result.color = 'rgb(3, 172, 14)';
    result.bgcolor = 'rgb(214, 255, 222)';
    break;
  case 'ditolak':
  case 'dibatalkan':
    result.color = 'rgb(239, 20, 74)';
    result.bgcolor = 'rgb(255, 234, 239)';
    break;
  case 'dikirim':
  case 'diproses':
    result.color = '#5f5207';
    result.bgcolor = '#fbf5d0';
    break;
  default:
    result.color = 'text.primary';
    result.bgcolor = '#f0f0f0';
  }
  return result;
};
