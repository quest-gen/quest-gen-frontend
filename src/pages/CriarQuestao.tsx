import { useState } from 'react'
import { FormCriacaoQuestao } from '@/components/questoes/FormCriacaoQuestao'
import { CardQuestao } from '@/components/questoes/CardQuestao'
import { CriarQuestaoRequest, Questao } from '@/types/questao'
import { gerarQuestao } from '@/lib/api'

export function CriarQuestao() {
  const [questaoGerada, setQuestaoGerada] = useState<Questao | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleCriarQuestao = async (dados: CriarQuestaoRequest) => {
    setIsLoading(true)
    try {
      const questao = await gerarQuestao(dados)
      setQuestaoGerada(questao)
    } catch (error) {
      console.error('Erro ao gerar questão:', error)
      // TODO: Adicionar toast de erro
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

      {questaoGerada && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 text-center">
            Questão Gerada
          </h2>
          <div className="max-w-2xl mx-auto">
            <CardQuestao questao={questaoGerada} />
          </div>
        </div>
      )}
    </div>
  )
}
