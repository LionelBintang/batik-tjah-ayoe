import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import products from '../data/products.json'
import { kirimPesan, MODE_MOCK } from '../services/chatApi'
import './ChatWidget.css'

const SARAN = [
  'Ada kemeja batik?',
  'Cari outer untuk hangout',
  'Apakah ada sepatu batik?',
]

const SAPAAN = {
  role: 'bot',
  text: 'Halo! Aku asisten Batik Tjah Ayoe. Tanya apa saja soal produk kami.',
  sources: [],
  inScope: true,
}

function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([SAPAAN])
  const [input, setInput] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | error
  const [errorMsg, setErrorMsg] = useState('')
  const [pertanyaanTerakhir, setPertanyaanTerakhir] = useState('')
  const bawahRef = useRef(null)

  useEffect(() => {
    bawahRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, status, open])

  const ajukan = async (teks, tambahPesanUser) => {
    if (tambahPesanUser) {
      setMessages((m) => [...m, { role: 'user', text: teks }])
    }
    setStatus('loading')
    setErrorMsg('')
    setPertanyaanTerakhir(teks)

    try {
      const hasil = await kirimPesan(teks)
      setMessages((m) => [
        ...m,
        {
          role: 'bot',
          text: hasil.answer,
          sources: hasil.sources || [],
          inScope: hasil.in_scope !== false,
        },
      ])
      setStatus('idle')
    } catch (err) {
      setErrorMsg(err.message || 'Terjadi kesalahan.')
      setStatus('error')
    }
  }

  const handleKirim = (e) => {
    e.preventDefault()
    const teks = input.trim()
    if (!teks || status === 'loading') return
    setInput('')
    ajukan(teks, true)
  }

  const handleSaran = (teks) => {
    if (status === 'loading') return
    ajukan(teks, true)
  }

  const namaProduk = (id) => products.find((p) => p.id === id)?.nama_produk

  return (
    <>
      {!open && (
        <button
          type="button"
          className="chat-fab"
          onClick={() => setOpen(true)}
          aria-label="Buka asisten produk"
        >
          Tanya Kami
        </button>
      )}

      {open && (
        <div className="chat-panel" role="dialog" aria-label="Asisten Produk">
          <div className="chat-header">
            <div>
              <p className="chat-title">Asisten Produk</p>
              <p className="chat-sub">
                {MODE_MOCK ? 'Mode demo (jawaban pura-pura)' : 'Berdasarkan katalog & FAQ'}
              </p>
            </div>
            <button
              type="button"
              className="chat-close"
              onClick={() => setOpen(false)}
              aria-label="Tutup"
            >
              ×
            </button>
          </div>

          <div className="chat-body">
            {messages.map((m, idx) => (
              <div key={idx} className={'chat-row ' + m.role}>
                <div className={'chat-bubble' + (m.role === 'bot' && !m.inScope ? ' out-scope' : '')}>
                  <p>{m.text}</p>
                  {m.sources?.length > 0 && (
                    <div className="chat-sources">
                      {m.sources
                        .filter((s) => s.type === 'product')
                        .map((s) => (
                          <Link
                            key={s.id}
                            to={`/produk/${s.id}`}
                            onClick={() => setOpen(false)}
                          >
                            {namaProduk(s.id) || s.id}
                          </Link>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {status === 'loading' && (
              <p className="status loading">Asisten sedang mengetik...</p>
            )}

            {status === 'error' && (
              <div className="status error">
                <p>{errorMsg} Silakan coba lagi.</p>
                <button
                  type="button"
                  className="chat-retry"
                  onClick={() => ajukan(pertanyaanTerakhir, false)}
                >
                  Coba lagi
                </button>
              </div>
            )}

            <div ref={bawahRef} />
          </div>

          {messages.length === 1 && status === 'idle' && (
            <div className="chat-suggest">
              {SARAN.map((s) => (
                <button key={s} type="button" onClick={() => handleSaran(s)}>
                  {s}
                </button>
              ))}
            </div>
          )}

          <form className="chat-form" onSubmit={handleKirim}>
            <input
              type="text"
              value={input}
              maxLength={500}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tulis pertanyaan..."
              disabled={status === 'loading'}
            />
            <button type="submit" disabled={status === 'loading' || !input.trim()}>
              Kirim
            </button>
          </form>
        </div>
      )}
    </>
  )
}

export default ChatWidget