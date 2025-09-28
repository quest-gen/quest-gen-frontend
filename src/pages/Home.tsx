import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CardQuestao } from '@/components/questoes/CardQuestao'
import { Plus, BookOpen, Sparkles, TrendingUp } from 'lucide-react'
import { questoesMock } from '@/lib/mock-data'

export function Home() {
  const questoesRecentes = questoesMock.slice(0, 3)

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-12 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            QuestGen
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Geração Inteligente de Questões de Matemática para Vestibulares
          </p>
          <Button asChild size="lg" className="text-lg px-8">
            <Link to="/criar">
              <Plus className="mr-2 h-5 w-5" />
              Criar Nova Questão
            </Link>
          </Button>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-blue-600" />
              Geração Inteligente
            </CardTitle>
            <CardDescription>
              Crie questões personalizadas baseadas em vestibulares específicos e assuntos de matemática
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-green-600" />
              Banco de Questões
            </CardTitle>
            <CardDescription>
              Acesse um vasto banco de questões de matemática de diversos vestibulares brasileiros
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              Questões Similares
            </CardTitle>
            <CardDescription>
              Encontre questões similares para praticar e aprofundar o conhecimento em tópicos específicos
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Questões Recentes */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Questões Recentes</h2>
          <Button variant="outline" asChild>
            <Link to="/criar">Ver Todas</Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {questoesRecentes.map((questao) => (
            <CardQuestao key={questao.id} questao={questao} />
          ))}
        </div>
      </div>
    </div>
  )
}
