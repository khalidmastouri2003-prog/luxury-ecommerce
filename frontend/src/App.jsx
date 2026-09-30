import { ArrowUpRight, Sparkles } from "lucide-react"

export default function App() {
  return (
    <main className="shell">
      <header className="nav"><a className="brand" href="/">AURELIA</a><nav><a href="#collection">Collection</a><a href="#story">Our story</a><a href="#journal">Journal</a></nav><button aria-label="Open navigation">Menu</button></header>
      <section className="hero"><div><p className="eyebrow"><Sparkles size={14} /> The new collection</p><h1>Objects of <em>light.</em></h1><p className="lede">Fine jewelry designed in Paris, made to become part of your story. Considered forms, quiet brilliance, and the warmth of something made by hand.</p><a className="action" href="#collection">Explore the collection <ArrowUpRight size={16} /></a></div><div className="hero-art" aria-label="Abstract gold ring study" role="img"><span /></div></section>
      <section id="collection" className="section"><p className="eyebrow">Selected pieces</p><h2>The essentials</h2><p className="muted">Catalog browsing will be connected to the Laravel API in Phase 4.</p></section>
      <section id="story" className="story"><h2>Jewelry should feel like a secret you choose to share.</h2><p>We work slowly, with materials chosen for their character and permanence. Every Aurelia piece is finished by hand in our Paris atelier.</p></section>
      <footer id="journal"><span>© 2026 Aurelia Maison</span><span>Phase 1 foundation</span></footer>
    </main>
  )
}
