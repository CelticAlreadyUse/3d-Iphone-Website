import Chip from "./components/Chip"
import Features from "./components/Features"
import Footer from "./components/Footer"
import Hero from "./components/Hero"
import Highlights from "./components/Highlights"
import Model from "./components/Model"
import Navbar from "./components/Navbar"
import * as Sentry from '@sentry/react'
function App() {
  return (
  <main className="bg-black overflow-x-hidden">
    <Navbar></Navbar>
    <Hero></Hero>
    <Highlights/>
    <Model/>
    <Features/>
    <Chip/>
    <Footer/>
  </main>
  )
}

export default Sentry.withProfiler(App)
