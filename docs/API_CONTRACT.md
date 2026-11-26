# Kontrak API Chatbot (DRAFT, menunggu persetujuan DS)

Status: usulan FS, 26 Nov 2026

## Endpoint

### POST /chat
Mengirim pertanyaan pelanggan ke chatbot.

Request:
```json
{
  "message": "Ada kemeja batik warna biru?"
}
```
Aturan: `message` wajib diisi, 1-500 karakter.

Response 200 (berhasil):
```json
{
  "answer": "Ada, Kemeja Batik Lengan Pendek Motif Mandala (Rp 399.000).",
  "sources": [
    { "type": "product", "id": "P003" }
  ],
  "in_scope": true
}
```

Response 200 (di luar data / fallback anti-halusinasi):
```json
{
  "answer": "Maaf, informasi itu belum tersedia. Silakan hubungi WhatsApp atau Instagram resmi Batik Tjah Ayoe.",
  "sources": [],
  "in_scope": false
}
```

Response error (4xx/5xx):
```json
{
  "error": "invalid_request",
  "message": "Pesan tidak boleh kosong."
}
```

### GET /health
Untuk mengecek API hidup dan membangunkan server (cold start).
```json
{ "status": "ok" }
```

## Aturan Bersama
- Field `sources` berisi id produk (`P001`) atau FAQ (`F001`) yang dipakai untuk menjawab.
- `in_scope: false` artinya chatbot menolak karena data tidak ada. Frontend bisa menampilkannya dengan gaya berbeda.
- CORS (tugas DS) mengizinkan `http://localhost:5173` dan domain Vercel frontend.
- Timeout frontend: 30 detik (karena cold start hosting gratis). Setelah itu tampil pesan gagal + tombol coba lagi.
- Bahasa jawaban: Indonesia.

## Struktur Dataset Produk (harus sama dengan docs/schema.sql)
id, nama_produk, kategori, deskripsi, bahan, warna, ukuran_tersedia,
harga, occasion, perawatan, gambar_url, sumber, sumber_referensi, sumber_foto

- `ukuran_tersedia`: teks dipisah koma, mis. `S,M,L,XL`
- `harga`: angka bulat rupiah tanpa titik
- `occasion`: `casual` / `office` / `hangout`
- `kategori` yang dipakai: Kemeja, Outer, Dress, Rok (dll sesuai koleksi)

## Struktur Dataset FAQ
id, pertanyaan, jawaban