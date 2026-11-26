// DATA CONTOH. Nanti diganti dengan size chart resmi dari materi Capstone Clinic.
export const sizeCharts = {
  atasan: {
    judul: 'Size Chart Atasan (cm)',
    kolom: ['Ukuran', 'Lingkar Dada', 'Panjang Badan', 'Panjang Lengan'],
    baris: [
      ['S', 100, 69, 59],
      ['M', 104, 71, 60],
      ['L', 108, 73, 61],
      ['XL', 112, 75, 62],
    ],
  },
  bawahan: {
    judul: 'Size Chart Bawahan (cm)',
    kolom: ['Ukuran', 'Lingkar Pinggang', 'Lingkar Pinggul', 'Panjang'],
    baris: [
      ['S', 70, 94, 90],
      ['M', 74, 98, 90],
      ['L', 78, 102, 90],
      ['XL', 82, 106, 90],
    ],
  },
}

export const jenisUkuran = {
  Kemeja: 'atasan',
  Outer: 'atasan',
  Dress: 'atasan',
  Rok: 'bawahan',
}