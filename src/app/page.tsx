import Image from "next/image";
import Projects from "@/components/Projects"

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto p-6 flex flex-col items-center text-center">
      <header className="w-full flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">Castle Muhammed</h1>
        <nav className="space-x-6 text-sm uppercase tracking-widest text-parchment-ink/70">
          <a href="#projects">Projects</a>
          <a href="https://github.com/MuhammedEl-Sayed">Github</a>
          <a href="https://www.linkedin.com/in/muhammedelsayed/">LinkedIn</a>
        </nav> 
      </header>

      <section className="max-2xl">
        <h2 className="text-6xl sm:text-7xl font-bold leading-tight">
          Fantasy, Code, & Curiosity
        </h2>
        <p className="text-lg text-parchment-ink/70 mt-4">
          A curated collection of products and projects, primarily from my GitHub
        </p>

        <div className="mt-10 flex flex-col items-center">
          <div className="relative w-44 h-44 rounded-full overflow-hidden border-8 border-white/70 shadow-[0_15px_40px_rgba(0,0,0,0.15)]">
            <Image
              src="/portrait-placeholder.jpg"
              alt="Your portrait"
              fill
              className="object-cover filter sepia-[0.25] brightness-[0.96]"
            />
            <div className="absolute inset-0 rounded-full shadow-inner shadow-black/30 pointer-events-none" />
          </div>
          <p className="text-sm text-parchment-ink/60 mt-3">
            Built with Lora • Soft fantasy • Projects from GitHub
          </p>
        </div>
      </section>

      {/* Projects are dynamically fetched client-side */}
      <Projects />

      <footer className="mt-24 text-sm text-parchment-ink/60">
        © {new Date().getFullYear()} Castle. Crafted with Next.js.
      </footer>
    </main>  );
}
