// src/app/page.tsx
import GlobalStyles from "../components/GlobalStyles"
import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import About from "../components/About"
import Stats from "../components/Stats"
import Services from "../components/Services"
import Together from "../components/Together"
import TalentProfile from "../components/TalentProfile"
import TopTalent from "../components/TopTalent"
import ExampleContent from "../components/ExampleContent"
import Collaboration from "../components/Collaboration"
import Pricing from "../components/Pricing"
import Footer from "../components/Footer"

export default function Home() {
  return (
    <>
      <GlobalStyles />
      <Navbar />
      <Hero />
      <About />
      <Stats />
      <Services />
      <Together />
      <TalentProfile />
      <TopTalent />
      <ExampleContent />
      <Collaboration />
      <Pricing />
      <Footer />
    </>
  )
}
