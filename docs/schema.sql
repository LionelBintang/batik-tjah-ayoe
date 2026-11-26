-- Tabel produk (isinya dari dataset teman DS)
CREATE TABLE products (
  id              TEXT PRIMARY KEY,        -- contoh: P001
  nama_produk     VARCHAR(150) NOT NULL,
  kategori        TEXT NOT NULL,           -- kemeja, outer, dress, dll
  deskripsi       TEXT,
  bahan           TEXT,
  warna           TEXT,
  ukuran_tersedia TEXT,                    -- contoh: "S,M,L,XL"
  harga           INTEGER NOT NULL,        -- rupiah, tanpa desimal
  occasion        TEXT,                    -- casual / office / hangout
  perawatan       TEXT,
  gambar_url      TEXT,
  sumber          TEXT                     -- publik / sintetis
);

-- Tabel FAQ (dipakai chatbot)
CREATE TABLE faqs (
  id         TEXT PRIMARY KEY,             -- contoh: F001
  pertanyaan TEXT NOT NULL,
  jawaban    TEXT NOT NULL
);

-- Pesanan simulasi
CREATE TABLE orders (
  id            SERIAL PRIMARY KEY,
  nama_pembeli  TEXT NOT NULL,
  no_whatsapp   varchar(20) NOT NULL,
  alamat        TEXT NOT NULL,
  total_harga   INTEGER NOT NULL,
  created_at    TIMESTAMP DEFAULT NOW()
);

-- Isi tiap pesanan (1 pesanan bisa banyak produk)
CREATE TABLE order_items (
  id          SERIAL PRIMARY KEY,
  order_id    INTEGER REFERENCES orders(id),
  product_id  TEXT REFERENCES products(id),
  ukuran      TEXT NOT NULL,
  jumlah      INTEGER NOT NULL,
  harga_satuan INTEGER NOT NULL
);