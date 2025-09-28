import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar } from '@/components/layout/Navbar'
import { Home } from '@/pages/Home'
import { CriarQuestao } from '@/pages/CriarQuestao'
import { QuestoesSimilares } from '@/pages/QuestoesSimilares'
import { DetalhesQuestao } from '@/pages/DetalhesQuestao'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/criar" element={<CriarQuestao />} />
            <Route path="/questao/:id/similares" element={<QuestoesSimilares />} />
            <Route path="/questao/:id" element={<DetalhesQuestao />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
