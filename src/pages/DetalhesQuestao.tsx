import { useEffect, useState } from 'react'
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Calendar, BookOpen, Shuffle, Plus, Share2, RefreshCw, Save, Clock, User, Zap, CheckCircle, Copy, Printer } from 'lucide-react'
import { Questao, DifficultyMapping } from '@/types/questao'
import { buscarQuestaoPorId } from '@/lib/api'
import { ExplicacaoQuestao } from '@/components/questoes/ExplicacaoQuestao'

export function DetalhesQuestao() {
  const { id } = useParams<{ id: string }>()
  const location = useLocation()
  const navigate = useNavigate()
  const [questao, setQuestao] = useState<Questao | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaved, setIsSaved] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  
  // Check if this is a newly created question passed via navigation state
  const isNewlyCreated = location.state?.isNewlyCreated || false
  const creationTime = location.state?.creationTime || null

  useEffect(() => {
    const carregarQuestao = async () => {
      if (!id) return
      
      // If question data is passed via navigation state, use it directly
      if (location.state?.questao) {
        setQuestao(location.state.questao)
        setIsLoading(false)
        if (isNewlyCreated) {
          setShowSuccess(true)
          setTimeout(() => setShowSuccess(false), 5000)
        }
        return
      }
      
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
  }, [id, location.state, isNewlyCreated])

  const handleSaveQuestion = async () => {
    // Mock save functionality
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 2000)
  }

  const handleCopyQuestion = async () => {
    if (!questao) return
    
    const questionText = `${questao.enunciado}\n\n${questao.alternativas.map(alt => `${alt.letra}) ${alt.texto}`).join('\n')}\n\nGabarito: ${questao.gabarito}`
    
    try {
      await navigator.clipboard.writeText(questionText)
      // Could add a toast notification here
    } catch (error) {
      console.error('Erro ao copiar questão:', error)
    }
  }

  const handlePrintQuestion = () => {
    window.print()
  }

  const handleShareQuestion = async () => {
    if (navigator.share && questao) {
      try {
        await navigator.share({
          title: questao.titulo || 'Questão Gerada',
          text: questao.enunciado,
          url: window.location.href
        })
      } catch (error) {
        console.error('Erro ao compartilhar:', error)
      }
    }
  }

  const handleRegenerateQuestion = () => {
    navigate('/criar', { 
      state: { 
        regenerateFrom: questao,
        vestibular: questao?.vestibular,
        assunto: questao?.assunto 
      } 
    })
  }

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
      {/* Success Banner for Newly Created Questions */}
      {showSuccess && isNewlyCreated && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <div>
              <h3 className="font-semibold text-green-800">Questão Gerada com Sucesso!</h3>
              <p className="text-sm text-green-700">
                Sua questão foi criada usando IA avançada. Você pode salvá-la, editá-la ou gerar questões similares.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Header with Navigation and Actions */}
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" asChild>
          <Link to="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Link>
        </Button>
        
        {/* Quick Actions */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleCopyQuestion}>
            <Copy className="h-4 w-4 mr-2" />
            Copiar
          </Button>
          <Button variant="outline" size="sm" onClick={handlePrintQuestion}>
            <Printer className="h-4 w-4 mr-2" />
            Imprimir
          </Button>
          {typeof navigator !== 'undefined' && 'share' in navigator && (
            <Button variant="outline" size="sm" onClick={handleShareQuestion}>
              <Share2 className="h-4 w-4 mr-2" />
              Compartilhar
            </Button>
          )}
        </div>
      </div>

      {/* Main Question Card */}
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-3">
              <CardTitle className="text-2xl">
                {questao.titulo || `Questão ${questao.vestibular} ${questao.ano || 'Gerada'}`}
              </CardTitle>
              
              {/* Metadata Row */}
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  <span>{questao.assunto}</span>
                </div>
                {questao.ano && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{questao.ano}</span>
                  </div>
                )}
                {isNewlyCreated && creationTime && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>Criada agora</span>
                  </div>
                )}
                {questao.questionType && (
                  <div className="flex items-center gap-1">
                    <Zap className="h-4 w-4" />
                    <span className="capitalize">{questao.questionType.replace('_', ' ')}</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Badges */}
            <div className="flex flex-col gap-2 ml-4">
              <Badge variant="secondary" className="text-sm">
                {questao.vestibular}
              </Badge>
              {questao.dificuldade && (
                <Badge 
                  variant={
                    questao.dificuldade === 'easy' ? 'default' : 
                    questao.dificuldade === 'medium' ? 'secondary' : 
                    'destructive'
                  }
                  className="text-xs"
                >
                  {DifficultyMapping[questao.dificuldade] || questao.dificuldade}
                </Badge>
              )}
              {questao.source && (
                <Badge variant="outline" className="text-xs">
                  {questao.source.toUpperCase()}
                </Badge>
              )}
              {isNewlyCreated && (
                <Badge variant="default" className="text-xs bg-blue-600">
                  <Zap className="h-3 w-3 mr-1" />
                  IA Gerada
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Question Statement */}
          <div>
            <h3 className="font-semibold mb-3 text-gray-900">Enunciado:</h3>
            <div className="bg-gray-50 p-4 rounded-lg border">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {questao.enunciado}
              </p>
            </div>
          </div>

          {/* Answer Options */}
          <div>
            <h3 className="font-semibold mb-3 text-gray-900">Alternativas:</h3>
            <div className="space-y-3">
              {questao.alternativas.map((alternativa) => (
                <div
                  key={alternativa.id}
                  className={`p-4 rounded-lg border transition-all ${
                    alternativa.letra === questao.gabarito
                      ? 'bg-green-50 border-green-200 ring-2 ring-green-100'
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className={`font-semibold text-sm px-3 py-1 rounded-full border ${
                      alternativa.letra === questao.gabarito
                        ? 'bg-green-600 text-white border-green-600'
                        : 'bg-white text-gray-700 border-gray-300'
                    }`}>
                      {alternativa.letra})
                    </span>
                    <p className="text-gray-700 flex-1 leading-relaxed">{alternativa.texto}</p>
                    {alternativa.letra === questao.gabarito && (
                      <Badge variant="default" className="text-xs bg-green-600">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Gabarito
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 pt-6 border-t">
            <Button 
              onClick={handleSaveQuestion}
              variant={isSaved ? "default" : "outline"}
              className="w-full"
            >
              {isSaved ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Salva!
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Salvar
                </>
              )}
            </Button>
            
            <Button variant="outline" className="w-full" onClick={handleRegenerateQuestion}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Regenerar
            </Button>
            
            <Button asChild variant="outline" className="w-full">
              <Link to={`/questao/${questao.id}/similares`}>
                <Shuffle className="h-4 w-4 mr-2" />
                Ver Similares
              </Link>
            </Button>
            
            <Button asChild variant="default" className="w-full">
              <Link to="/criar">
                <Plus className="h-4 w-4 mr-2" />
                Criar Nova
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Explanation Component */}
      {questao.explanation && (
        <div className="max-w-4xl mx-auto">
          <ExplicacaoQuestao questao={questao} />
        </div>
      )}

      {/* Generation Metadata for New Questions */}
      {isNewlyCreated && (
        <Card className="max-w-4xl mx-auto border-blue-200 bg-blue-50/30">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-blue-900 text-lg">
              <Zap className="h-5 w-5" />
              Informações da Geração
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2 text-blue-700">
                <User className="h-4 w-4" />
                <span>Gerada por IA</span>
              </div>
              <div className="flex items-center gap-2 text-blue-700">
                <Clock className="h-4 w-4" />
                <span>
                  {creationTime ? new Date(creationTime).toLocaleString('pt-BR') : 'Agora'}
                </span>
              </div>
              <div className="flex items-center gap-2 text-blue-700">
                <BookOpen className="h-4 w-4" />
                <span>Modelo: Google Gemini</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
