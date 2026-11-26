# Sumber Data & Asumsi

Terakhir diperbarui: 26 November 2026

## Catatan Umum

Seluruh data produk di prototype ini adalah **DATA CONTOH** untuk keperluan
capstone Asah 2026, **bukan informasi resmi Batik Tjah Ayoe**. Harga, ukuran,
ketersediaan, dan panduan perawatan bersifat sintetis/perkiraan. Website dan
chatbot tidak boleh menyatakan data ini sebagai harga, stok, atau promo resmi.

Data resmi produk dari mitra belum tersedia. Sebagai pengganti, tim memakai
**produk batik sejenis dari marketplace dan toko batik lain sebagai referensi
bentuk, bahan, dan warna**, lalu menulis ulang nama dan deskripsinya dengan
bahasa sendiri. Ini perluasan dari rencana awal (Instagram
@batik.tjahayoe dan Batik Riana Kesuma), karena produk di sumber tersebut
belum cukup untuk memenuhi target 25-30 entri.

## Arti Kolom Sumber

| Kolom | Isi |
|-------|-----|
| `sumber` | `referensi+sintetis` = dasar produk dari referensi, sebagian atribut dikarang. `instagram` = produk memang ada di @batik.tjahayoe. `sintetis` = sepenuhnya karangan tim |
| `sumber_referensi` | Toko/merek yang jadi referensi produk |
| `sumber_foto` | Asal foto produk |

## Daftar Produk (6 produk awal)

| ID | Nama Produk | Referensi | Sumber Foto |
|----|-------------|-----------|-------------|
| P001 | Kemeja Batik Lengan Panjang Katun Cokelat | Shopee - BATIK ZAFID | Shopee - BATIK ZAFID |
| P002 | Kemeja Batik Lengan Pendek Kuning | Mandalas | Mandalas |
| P003 | Kemeja Batik Lengan Pendek Motif Mandala | Mandalas (wearemandalas.com) | Mandalas (wearemandalas.com) |
| P004 | Kemeja Batik Slimfit Lengan Panjang Marun | Zalora | Zalora |
| P005 | Rok Batik Panjang Katun Halus | Shopee - Grosir_Batik_Laris | Shopee - Grosir_Batik_Laris |
| P006 | Outer Batik Wanita Motif Lereng Cokelat | Danarhadi | Danarhadi |

## Tautan Foto (untuk dokumentasi)

| ID | Tautan |
|----|--------|
| P001 | https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWihabqrlMgrdBP8MECsbD9qCbmexZkiIhlUgJ2XgObA&s=10 (hasil Google Images, tautan halaman asli toko belum dicatat) |
| P002 | https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWr6BL6EkuOpDxw3LUZiDx-rgXMJ7H64KFiQv-5GLn8A&s=10 (hasil Google Images, tautan halaman asli belum dicatat) |
| P003 | https://wearemandalas.com/cdn/shop/files/padilla-mandalas-kemeja-batik-pria-premium-lengan-pendek-1506604.jpg |
| P004 | https://static-id.zacdn.com/p/abiroy-4628-6403713-1.jpg |
| P005 | https://down-id.img.susercontent.com/file/id-11134207-7r992-lxtfb7c7t4mkeb |
| P006 | https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM-kZnMXm1HROji3j_A-V6GQ0sGPaQoPzxiKwhHCR8U3N34DU4Y1Ax0Us&s=10 (hasil Google Images, tautan halaman asli belum dicatat) |

## Asumsi

- **Harga** adalah perkiraan tim, bukan harga produk referensi maupun harga Batik Tjah Ayoe.
- **Ukuran tersedia** dan **panduan perawatan** adalah data sintetis, nantinya diselaraskan dengan materi size chart dan perawatan dari Capstone Clinic.
- **Bahan dan warna** diambil dari judul produk referensi. Bahan P003 dan P005 belum diverifikasi.
- **Occasion** (casual/office/hangout) ditentukan tim berdasarkan gaya produk.
- Nama produk ditulis ulang agar singkat dan tidak menyalin judul penjual asli.
- Foto dipakai **hanya untuk prototype capstone**, belum ada izin dari pemilik foto. Foto tidak untuk dipakai komersial.

## Perubahan dari Data Awal (Catatan Perbaikan)

- P002 dan P003 sebelumnya berkategori Outer dan Dress, padahal produknya kemeja. Diperbaiki menjadi Kemeja, deskripsinya disesuaikan.
- P004 sebelumnya bahan "Katun Merah" (warna tercampur di kolom bahan). Diperbaiki menjadi Katun, warna Marun.
- Warna "Putih Biru" disederhanakan menjadi "Biru" supaya filter warna tidak terlalu banyak variasi.
- Harga P002 disesuaikan karena produknya berubah dari outer ke kemeja lengan pendek.

## Yang Masih Harus Dilakukan

- [ ] Unduh foto dan simpan ke `frontend/public/products/`, jangan memakai tautan langsung (tautan eksternal bisa mati atau diblokir).
- [ ] Catat tautan halaman produk asli untuk P001, P002, P006.
- [ ] Minta izin pemakaian foto lewat mentor/Capstone Clinic, atau ganti dengan foto milik @batik.tjahayoe atau foto stok berlisensi bebas.
- [ ] Gabungkan dengan dataset 25-30 produk dan FAQ dari anggota DS.