import logo from './assets/logo.png'
import './App.css'

function App() {
  return (
    <main className="hero">
      <img src={logo} alt="Logo Batik Tjah Ayoe" className="hero-logo" />
      <p className="script">batik untuk gaya sehari-hari</p>
      <h1>Koleksi Terbaru</h1>
      <button className="btn">Lihat Koleksi</button>
    </main>
  )
}

export default App