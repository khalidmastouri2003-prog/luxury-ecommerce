import { ArrowUpRight, Menu, Search, ShoppingBag, Sparkles } from "lucide-react"

const pieces = [
  { name: "Lumière Solitaire", type: "18k gold · diamond", price: "€2,480", tone: "from-[#c8b49a] via-[#efe5d7] to-[#8a7561]" },
  { name: "Sculpted Signet", type: "Recycled gold · hand-finished", price: "€1,160", tone: "from-[#887f75] via-[#d8d0c6] to-[#514b45]" },
  { name: "Nocturne Drop", type: "Onyx · pearl · gold", price: "€1,840", tone: "from-[#252421] via-[#81786c] to-[#0d0d0c]" },
]

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-background">
      <div className="border-b border-border/70 px-5 py-2 text-center text-[10px] uppercase tracking-[0.28em] text-muted-foreground sm:px-8">
        Complimentary delivery on orders over €500
      </div>
      <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6 sm:px-8 lg:px-12">
        <button className="rounded-full p-2 lg:hidden" aria-label="Open menu"><Menu /></button>
        <a href="#top" className="font-serif text-2xl tracking-[0.18em] sm:text-3xl">AURELIA</a>
        <nav className="hidden items-center gap-8 text-[11px] uppercase tracking-[0.2em] text-muted-foreground lg:flex">
          <a href="#collection" className="transition-colors hover:text-foreground">Collection</a>
          <a href="#story" className="transition-colors hover:text-foreground">Our story</a>
          <a href="#journal" className="transition-colors hover:text-foreground">Journal</a>
        </nav>
        <div className="flex items-center gap-1">
          <button className="rounded-full p-2" aria-label="Search"><Search /></button>
          <button className="rounded-full p-2" aria-label="Shopping bag"><ShoppingBag /></button>
        </div>
      </header>

      <section id="top" className="mx-auto grid max-w-7xl gap-10 px-5 pb-20 pt-10 sm:px-8 sm:pt-16 lg:grid-cols-[0.86fr_1.14fr] lg:items-center lg:px-12 lg:pb-28 lg:pt-20">
        <div className="animate-fade-up max-w-xl">
          <p className="mb-7 flex items-center gap-3 text-[10px] uppercase tracking-[0.34em] text-accent"><Sparkles /> The new collection</p>
          <h1 className="font-serif text-6xl leading-[0.92] tracking-[-0.045em] sm:text-8xl">Objects of <em className="font-normal text-accent">light.</em></h1>
          <p className="mt-8 max-w-md text-sm leading-7 text-muted-foreground sm:text-base">Fine jewelry designed in Paris, made to become part of your story. Considered forms, quiet brilliance, and the warmth of something made by hand.</p>
          <a href="#collection" className="mt-9 inline-flex items-center gap-3 border-b border-foreground pb-3 text-[11px] uppercase tracking-[0.22em]">Explore the collection <ArrowUpRight /></a>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-[2px] bg-[#b7ab9b] shadow-2xl shadow-foreground/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_58%_34%,rgba(255,246,225,.8),transparent_20%),linear-gradient(135deg,#82766a,#d7c8b4_48%,#5c5148)]" />
          <div className="absolute left-[32%] top-[19%] h-[58%] w-[38%] rotate-[18deg] rounded-[48%] border-[14px] border-[#d5b77d]/85 shadow-[0_10px_35px_rgba(35,26,17,.28)]" />
          <div className="absolute bottom-6 left-6 text-[10px] uppercase tracking-[0.28em] text-white/75">Aurelia · Atelier 01</div>
        </div>
      </section>

      <section id="collection" className="border-t border-border/70 px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex items-end justify-between gap-5"><div><p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Selected pieces</p><h2 className="font-serif text-4xl sm:text-5xl">The essentials</h2></div><a href="#collection" className="hidden border-b border-border pb-2 text-[10px] uppercase tracking-[0.22em] sm:block">View all pieces</a></div>
          <div className="grid gap-8 sm:grid-cols-3 sm:gap-5 lg:gap-8">{pieces.map((piece) => <article key={piece.name} className="group"><div className={`relative aspect-[4/5] overflow-hidden bg-gradient-to-br ${piece.tone}`}><div className="absolute inset-0 opacity-30 mix-blend-overlay bg-[radial-gradient(ellipse_at_center,white,transparent_55%)]" /><div className="absolute bottom-5 left-5 text-[10px] uppercase tracking-[0.24em] text-white/75">Aurelia</div></div><div className="flex items-start justify-between gap-3 pt-4"><div><h3 className="font-serif text-xl">{piece.name}</h3><p className="mt-1 text-xs text-muted-foreground">{piece.type}</p></div><p className="text-xs text-muted-foreground">{piece.price}</p></div></article>)}</div>
        </div>
      </section>

      <section id="story" className="bg-foreground px-5 py-20 text-background sm:px-8 lg:px-12 lg:py-28"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-end"><p className="max-w-2xl font-serif text-4xl leading-tight sm:text-6xl">“Jewelry should feel like a secret you choose to share.”</p><div className="max-w-sm text-sm leading-7 text-background/60"><p>We work slowly, with materials chosen for their character and permanence. Every Aurelia piece is finished by hand in our Paris atelier.</p><a href="#journal" className="mt-7 inline-flex items-center gap-3 border-b border-background/50 pb-2 text-[10px] uppercase tracking-[0.22em]">Discover our story <ArrowUpRight /></a></div></div></section>

      <footer id="journal" className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12"><p>© 2026 Aurelia Maison</p><div className="flex gap-6"><a href="#story">Instagram</a><a href="#story">Contact</a><a href="#top">Back to top</a></div></footer>
    </main>
  )
}
