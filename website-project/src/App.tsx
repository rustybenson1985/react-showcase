import { Routes, Route } from 'react-router-dom'
import MainNavbar from './components/MainNavbar'
import AlgebraPage from './pages/math/AlgebraPage'
import ChemistryPage from './pages/science/ChemistryPage'
import { Container } from 'react-bootstrap'
import { ThemeProvider } from './context/ThemeProvider.tsx'

function App() {
  return (
    <ThemeProvider>
      <MainNavbar />
      <Container>
        <Routes>
          <Route path="/math/algebra" element={<AlgebraPage />} />
          <Route path="/science/chemistry" element={<ChemistryPage />} />
        </Routes>
      </Container>
    </ThemeProvider>
  )
}

export default App
