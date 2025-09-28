import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { CardQuestao } from '@/components/questoes/CardQuestao'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Questao } from '@/types/questao'
import { buscarQuestoesSimilares } from '@/lib/api'

export function QuestoesSimilares() {
  const { id } = useParams<{ id: string }>()
  const [questoesSimilares, setQuestoesSimilares] = useState<Questao[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const carregarQuestoesSimilares = async () => {
      if (!id) return
      
      setIsLoading(true)
      try {
        const questoes = await buscarQuestoesSimilares(id)
        setQuestoesSimilares(questoes)
      } catch (error) {
        console.error('Erro ao buscar questões similares:', error)
      } finally {
        setIsLoading(false)
      }
    }

    carregarQuestoesSimilares()
  }, [id])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Carregando questões similares...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link to={`/questao/${id}`}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Questões Similares</h1>
          <p className="text-gray-600">
            Encontramos {questoesSimilares.length} questões relacionadas
          </p>
        </div>
      </div>

      {questoesSimilares.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            Nenhuma questão similar encontrada.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {questoesSimilares.map((questao) => (
            <CardQuestao key={questao.id} questao={questao} />
          ))}
        </div>
      )}
    </div>
  )
}
