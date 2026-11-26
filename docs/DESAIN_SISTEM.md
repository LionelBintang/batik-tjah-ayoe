# Desain Sistem Batik Tjah Ayoe

## Daftar Halaman
1. Landing Page (/)
2. Katalog Produk (/katalog) - cari & filter
3. Detail Produk (/produk/:id) - bahan, size chart, perawatan
4. Keranjang (/keranjang)
5. Checkout (/checkout) - simulasi, tanpa pembayaran asli
6. Widget Chatbot (melayang di semua halaman)

## Alur Pengguna
Landing -> Katalog -> Detail Produk -> (Tanya Chatbot) -> Keranjang -> Checkout -> Konfirmasi

## Arsitektur
Browser (React, Vercel)
   |-- ambil data produk --> Database (Supabase PostgreSQL)
   |-- kirim pertanyaan --> API Chatbot (FastAPI, Python, dibuat teman DS)
                               |-- cari data relevan di katalog & FAQ
                               |-- LLM menyusun jawaban dari hasil pencarian

## Status Tampilan (wajib ada)
- Loading: saat memuat katalog, checkout, atau menunggu chatbot
- Berhasil: pesanan terkonfirmasi, jawaban chatbot muncul
- Gagal: koneksi putus, pesan error jelas + tombol coba lagi

## Tidak Dikerjakan
Pembayaran asli, stok real-time, login/akun, pengiriman logistik.