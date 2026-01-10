import { Routes, Route } from 'react-router-dom'
import MainNavbar from './components/MainNavbar'
import AlgebraPage from './pages/AlgebraPage'
import ChemistryPage from './pages/ChemistryPage'
import { Container } from 'react-bootstrap'

function App() {
  return (
    <>
      <MainNavbar />
      <Container>
        <Routes>
          <Route path="/algebra" element={<AlgebraPage />} />
          <Route path="/chemistry" element={<ChemistryPage />} />
        </Routes>
      </Container>
    </>
  )
}

export default App
