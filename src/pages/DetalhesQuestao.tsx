import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Calendar, BookOpen, Shuffle, Plus } from 'lucide-react'
import { Questao } from '@/types/questao'
import { buscarQuestaoPorId } from '@/lib/api'

export function DetalhesQuestao() {
  const { id } = useParams<{ id: string }>()
  const [questao, setQuestao] = useState<Questao | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const carregarQuestao = async () => {
      if (!id) return
      
      setIsLoading(true)
      try {
        const questaoData = await buscarQuestaoPorId(id)
        setQuestao(questaoData)
      } catch (error) {
        console.error('Erro ao buscar questão:', error)
      } finally {
        setIsLoading(false)
      }
    }

    carregarQuestao()
  }, [id])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-pulse space-y-4 w-full max-w-4xl">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  if (!questao) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Questão não encontrada.</p>
        <Button asChild className="mt-4">
          <Link to="/">Voltar ao Início</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link to="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Link>
        </Button>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <CardTitle className="text-2xl">
                {questao.titulo || `Questão ${questao.vestibular} ${questao.ano}`}
              </CardTitle>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  <span>{questao.assunto}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{questao.ano}</span>
                </div>
              </div>
            </div>
            <Badge variant="secondary" className="text-sm">
              {questao.vestibular}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Enunciado */}
          <div>
            <h3 className="font-semibold mb-3">Enunciado:</h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {questao.enunciado}
            </p>
          </div>

          {/* Alternativas */}
          <div>
            <h3 className="font-semibold mb-3">Alternativas:</h3>
            <div className="space-y-3">
              {questao.alternativas.map((alternativa) => (
                <div
                  key={alternativa.id}
                  className={`p-3 rounded-lg border ${
                    alternativa.letra === questao.gabarito
                      ? 'bg-green-50 border-green-200'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="font-semibold text-sm bg-white px-2 py-1 rounded border">
                      {alternativa.letra})
                    </span>
                    <p className="text-gray-700 flex-1">{alternativa.texto}</p>
                    {alternativa.letra === questao.gabarito && (
                      <Badge variant="default" className="text-xs">
                        Gabarito
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ações */}
          <div className="flex gap-3 pt-4 border-t">
            <Button asChild variant="outline" className="flex-1">
              <Link to={`/questao/${questao.id}/similares`}>
                <Shuffle className="h-4 w-4 mr-2" />
                Ver Questões Similares
              </Link>
            </Button>
            <Button asChild className="flex-1">
              <Link to="/criar">
                <Plus className="h-4 w-4 mr-2" />
                Gerar Nova a Partir Desta
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
