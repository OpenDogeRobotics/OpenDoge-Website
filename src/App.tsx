import { Community } from "./components/Community";
import { Features } from "./components/Features";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import { Pipeline } from "./components/Pipeline";
import { QuickStart } from "./components/QuickStart";
import { Repos } from "./components/Repos";
import { Roadmap } from "./components/Roadmap";
import { Specs } from "./components/Specs";
import { TechStack } from "./components/TechStack";
import { LangProvider } from "./lib/i18n";

export default function App() {
  return (
    <LangProvider>
      <div className="relative min-h-screen bg-ink-950 text-zinc-300">
        {/* Ambient background */}
        <div className="pointer-events-none fixed inset-0 -z-20" aria-hidden>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(52,211,153,0.06),transparent_60%)]" />
        </div>

        <Navbar />
        <main>
          <Hero />
          <Pipeline />
          <Features />
          <Repos />
          <Specs />
          <TechStack />
          <QuickStart />
          <Roadmap />
          <Community />
        </main>
        <Footer />
      </div>
    </LangProvider>
  );
}
