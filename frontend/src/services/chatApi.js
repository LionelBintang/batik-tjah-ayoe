import products from '../data/products.json'

// Kalau VITE_API_URL kosong, pakai jawaban pura-pura (mock).
const API_URL = import.meta.env.VITE_API_URL || ''
const TIMEOUT_MS = 30000

export const MODE_MOCK = !API_URL

const FALLBACK =
  'Maaf, informasi itu belum tersedia. Silakan hubungi WhatsApp atau Instagram resmi Batik Tjah Ayoe.'

const STOPWORDS = new Set([
  'ada', 'apakah', 'apa', 'yang', 'dan', 'untuk', 'dengan', 'bisa',
  'mau', 'cari', 'tersedia', 'punya', 'ini', 'itu', 'dong', 'ya', 'kak',
  'batik', 'warna', 'produk', 'tolong', 'rekomendasi',
])

// Topik yang TIDAK ada di data: wajib dijawab "belum tersedia"
const DI_LUAR_DATA = ['stok', 'promo', 'diskon', 'ongkir', 'pengiriman', 'resi']

const tunggu = (ms) => new Promise((r) => setTimeout(r, ms))

function kataKata(teks) {
  return teks.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean)
}

// JAWABAN PURA-PURA. Ini bukan AI, hanya pencocokan kata untuk menguji tampilan.
async function jawabPuraPura(message) {
  await tunggu(1000)
  if (!navigator.onLine) throw new Error('Tidak bisa terhubung ke server.')

  const kata = kataKata(message)

  if (kata.some((k) => DI_LUAR_DATA.includes(k))) {
    return { answer: FALLBACK, sources: [], in_scope: false }
  }

  const kunci = kata.filter((k) => k.length >= 3 && !STOPWORDS.has(k))
  const cocok = products.filter((p) => {
    const teksProduk = kataKata(
      [p.nama_produk, p.kategori, p.warna, p.occasion, p.bahan].join(' ')
    )
    return kunci.some((k) => teksProduk.includes(k))
  })

  if (kunci.length === 0 || cocok.length === 0) {
    return { answer: FALLBACK, sources: [], in_scope: false }
  }

  const tampil = cocok.slice(0, 3)
  const daftar = tampil
    .map((p) => `${p.nama_produk} (Rp ${p.harga.toLocaleString('id-ID')})`)
    .join(', ')

  return {
    answer: `Ada ${cocok.length} produk yang cocok. Beberapa di antaranya: ${daftar}.`,
    sources: tampil.map((p) => ({ type: 'product', id: p.id })),
    in_scope: true,
  }
}

export async function kirimPesan(message) {
  if (MODE_MOCK) return jawabPuraPura(message)

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)

  try {
    const res = await fetch(`${API_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
      signal: controller.signal,
    })

    if (!res.ok) {
      let pesan = 'Server sedang bermasalah.'
      try {
        const data = await res.json()
        if (data.message) pesan = data.message
      } catch {
        // abaikan kalau bukan JSON
      }
      throw new Error(pesan)
    }

    return await res.json()
  } catch (err) {
    if (err.name === 'AbortError') {
      throw new Error('Server terlalu lama merespons.')
    }
    if (err instanceof TypeError) {
      throw new Error('Tidak bisa terhubung ke server.')
    }
    throw err
  } finally {
    clearTimeout(timer)
  }
}