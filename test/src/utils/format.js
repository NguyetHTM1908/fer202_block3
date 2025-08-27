export function formatPrice(v) {
  const n = typeof v === 'string' ? parseFloat(v) : v;
  return Number.isNaN(n) ? '$0.00' : `$${n.toFixed(2)}`;
}

// Chuẩn hoá đường dẫn ảnh lấy từ db.json
export function assetUrl(p) {
  if (!p) return '';
  if (/^https?:\/\//i.test(p)) return p;          // URL tuyệt đối
  // thêm '/' đầu, tránh '//'
  return '/' + String(p).replace(/^\/+/, '');
}