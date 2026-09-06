import Hero from "@/components/hero"
import About from "@/components/about"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import Navigation from "@/components/navigation"
import ScrollToTop from "@/components/scroll-to-top"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="bg-black min-h-screen selection:bg-white/10 selection:text-white antialiased text-white">
      <Navigation />

      <main className="flex flex-col overflow-x-hidden">
        <section id="home">
          <Hero />
        </section>
        <About />
        <Projects />
        <Contact />
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  )
}
