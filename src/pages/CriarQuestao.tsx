import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FormCriacaoQuestao } from '@/components/questoes/FormCriacaoQuestao'
import { CardQuestao } from '@/components/questoes/CardQuestao'
import { Button } from '@/components/ui/button'
import { CriarQuestaoRequest, Questao, QuestRequest, QuestItem } from '@/types/questao'
import { gerarQuestao, gerarQuestoesAvancadas } from '@/lib/api'
import { Eye, ArrowRight } from 'lucide-react'

export function CriarQuestao() {
  const navigate = useNavigate()
  const [questaoGerada, setQuestaoGerada] = useState<Questao | null>(null)
  const [questoesGeradas, setQuestoesGeradas] = useState<QuestItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleViewDetails = (questao: Questao) => {
    navigate(`/questao/${questao.id}`, {
      state: {
        questao: questao,
        isNewlyCreated: true,
        creationTime: new Date().toISOString()
      }
    })
  }

  const handleCriarQuestao = async (dados: CriarQuestaoRequest & {
    dificuldade?: string
    tipoQuestao?: string
    conteudo?: string
  }) => {
    setIsLoading(true)
    setError(null)
    setQuestaoGerada(null)
    setQuestoesGeradas([])
    
    try {
      // Se há conteúdo específico, usar a API avançada
      if (dados.conteudo && dados.conteudo.length >= 50) {
        const request: QuestRequest = {
          content: dados.conteudo,
          numQuestions: 1,
          difficulty: dados.dificuldade as any || 'medium',
          questionType: dados.tipoQuestao as any || 'multiple_choice',
          language: 'português',
          source: 'generico',
          subject: 'matematica'
        }
        
        const response = await gerarQuestoesAvancadas(request)
        
        if (response.success && response.questions.length > 0) {
          setQuestoesGeradas(response.questions)
        } else {
          throw new Error(response.message || 'Falha ao gerar questões')
        }
      } else {
        // Usar a geração simples (que internamente usa a nova API)
        const questao = await gerarQuestao({
          vestibular: dados.vestibular,
          assunto: dados.assunto,
          numeroAlternativas: dados.numeroAlternativas
        })
        setQuestaoGerada(questao)
      }
    } catch (error) {
      console.error('Erro ao gerar questão:', error)
      setError(error instanceof Error ? error.message : 'Erro ao gerar questão. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Criar Nova Questão
        </h1>
        <p className="text-gray-600">
          Selecione os parâmetros para gerar uma questão personalizada
        </p>
      </div>

      <FormCriacaoQuestao onSubmit={handleCriarQuestao} isLoading={isLoading} />

      {error && (
        <div className="max-w-2xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Erro ao gerar questão
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {questaoGerada && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 text-center">
            Questão Gerada
          </h2>
          <div className="max-w-2xl mx-auto space-y-4">
            <CardQuestao questao={questaoGerada} showActions={false} />
            <div className="flex gap-3 justify-center">
              <Button onClick={() => handleViewDetails(questaoGerada)} className="flex-1 max-w-xs">
                <Eye className="h-4 w-4 mr-2" />
                Ver Detalhes Completos
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate(`/questao/${questaoGerada.id}/similares`, {
                  state: { questaoOriginal: questaoGerada }
                })}
                className="flex-1 max-w-xs"
              >
                <ArrowRight className="h-4 w-4 mr-2" />
                Ver Questões Similares
              </Button>
            </div>
          </div>
        </div>
      )}

      {questoesGeradas.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 text-center">
            Questões Geradas
          </h2>
          <div className="max-w-2xl mx-auto space-y-4">
            {questoesGeradas.map((questItem, index) => {
              // Converter QuestItem para Questao para compatibilidade com CardQuestao
              const questao: Questao = {
                id: `quest-${Date.now()}-${index}`,
                titulo: `Questão ${index + 1}`,
                enunciado: questItem.question,
                alternativas: questItem.options.map((opcao, i) => ({
                  id: `alt-${Date.now()}-${index}-${i}`,
                  letra: String.fromCharCode(65 + i),
                  texto: opcao
                })),
                gabarito: questItem.correct_answer,
                vestibular: questItem.source?.toUpperCase() || 'GENERICO',
                ano: null,
                assunto: questItem.subject || 'Matemática',
                dificuldade: questItem.difficulty as any,
                questionType: questItem.type as any,
                source: questItem.source,
                explanation: questItem.explanation,
                language: 'português',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
              }
              
              return (
                <div key={questao.id} className="space-y-3">
                  <CardQuestao questao={questao} showActions={false} />
                  <div className="flex gap-2 justify-center">
                    <Button 
                      size="sm" 
                      onClick={() => handleViewDetails(questao)}
                      className="flex-1 max-w-xs"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Ver Detalhes
                    </Button>
                    <Button 
                      size="sm"
                      variant="outline" 
                      onClick={() => navigate(`/questao/${questao.id}/similares`, {
                        state: { questaoOriginal: questao }
                      })}
                      className="flex-1 max-w-xs"
                    >
                      <ArrowRight className="h-4 w-4 mr-2" />
                      Ver Similares
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
