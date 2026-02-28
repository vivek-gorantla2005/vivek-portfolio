import { useState } from 'react';
import { SmoothScroll } from './components/SmoothScroll';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './features/hero/Hero';
import { About } from './features/about/About';
import { Projects } from './features/projects/Projects';
import { SkillsMarquee } from './features/skills/SkillsMarquee';
import { CustomCursor } from './components/CustomCursor';
import { Contact } from './features/contact/Contact';
import { CallToAction } from './features/cta/CallToAction';
import { Preloader } from './components/Preloader';
import { Journey } from './features/journey/Journey';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <ThemeProvider>
      <Preloader onComplete={() => setIsLoading(false)} />
      {!isLoading && (
        <SmoothScroll>
          <CustomCursor />
          <div style={{ position: 'relative', backgroundColor: 'var(--bg-main)', minHeight: '100vh' }}>
            <Navbar />
            <Hero />
            <About />
            <Journey />
            <Projects />
            <SkillsMarquee />
            <CallToAction />
            <Contact />
          </div>
        </SmoothScroll>
      )}
    </ThemeProvider>
  )
}

export default App
