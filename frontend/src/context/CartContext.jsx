import { createContext, useContext, useEffect, useReducer } from 'react'

const CartContext = createContext(null)
const STORAGE_KEY = 'tjahayoe_cart'
const MAKS_JUMLAH = 10

function muatKeranjang() {
  try {
    const tersimpan = localStorage.getItem(STORAGE_KEY)
    return tersimpan ? JSON.parse(tersimpan) : []
  } catch {
    return []
  }
}

function reducer(items, action) {
  switch (action.type) {
    case 'TAMBAH': {
      const { produk, ukuran, jumlah } = action
      const ada = items.find((i) => i.id === produk.id && i.ukuran === ukuran)
      if (ada) {
        return items.map((i) =>
          i === ada
            ? { ...i, jumlah: Math.min(i.jumlah + jumlah, MAKS_JUMLAH) }
            : i
        )
      }
      return [
        ...items,
        {
          id: produk.id,
          nama_produk: produk.nama_produk,
          harga: produk.harga,
          gambar_url: produk.gambar_url,
          ukuran,
          jumlah,
        },
      ]
    }
    case 'UBAH_JUMLAH':
      return items.map((i) =>
        i.id === action.id && i.ukuran === action.ukuran
          ? { ...i, jumlah: Math.min(Math.max(action.jumlah, 1), MAKS_JUMLAH) }
          : i
      )
    case 'HAPUS':
      return items.filter(
        (i) => !(i.id === action.id && i.ukuran === action.ukuran)
      )
    case 'KOSONGKAN':
      return []
    default:
      return items
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, null, muatKeranjang)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // abaikan kalau penyimpanan browser tidak tersedia
    }
  }, [items])

  const value = {
    items,
    tambah: (produk, ukuran, jumlah) =>
      dispatch({ type: 'TAMBAH', produk, ukuran, jumlah }),
    ubahJumlah: (id, ukuran, jumlah) =>
      dispatch({ type: 'UBAH_JUMLAH', id, ukuran, jumlah }),
    hapus: (id, ukuran) => dispatch({ type: 'HAPUS', id, ukuran }),
    kosongkan: () => dispatch({ type: 'KOSONGKAN' }),
    totalItem: items.reduce((sum, i) => sum + i.jumlah, 0),
    totalHarga: items.reduce((sum, i) => sum + i.harga * i.jumlah, 0),
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart harus dipakai di dalam CartProvider')
  return ctx
}