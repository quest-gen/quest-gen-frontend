import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Settings, Loader2, RefreshCw, Eye, Copy, AlertCircle, CheckCircle, List, Edit } from 'lucide-react'
import { modificarQuestaoEnem } from '@/lib/api'

interface ModifiedQuestion {
  title?: string
  contextTemplate: string
  alternativesIntroductionTemplate: string
  alternatives: any[]
  correctAlternative?: string
  placeholders: Record<string, string>
  rendered: {
    context: string
    alternativesIntroduction: string
  }
  originalQuestion?: any
}

export function ModificarQuestao() {
  const location = useLocation()
  const [year, setYear] = useState<number>(2023)
  const [index, setIndex] = useState<number>(136)
  const [scaleFactor, setScaleFactor] = useState<string>('')
  const [includeOriginal, setIncludeOriginal] = useState<boolean>(true)
  const [customPlaceholders, setCustomPlaceholders] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [modifiedQuestion, setModifiedQuestion] = useState<ModifiedQuestion | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [selectedQuestion, setSelectedQuestion] = useState<any>(null)
  const [inputMode, setInputMode] = useState<'list' | 'manual'>('list') // New mode toggle

  // Check if a question was selected from the ENEM questions list
  useEffect(() => {
    if (location.state?.selectedQuestion) {
      const question = location.state.selectedQuestion
      setSelectedQuestion(question)
      setYear(question.year)
      setIndex(question.index)
      setInputMode('list') // Set to list mode when coming from selection
    } else {
      setInputMode('manual') // Default to manual mode if no selection
    }
    if (location.state?.prefilledYear) {
      setYear(location.state.prefilledYear)
    }
    if (location.state?.prefilledIndex) {
      setIndex(location.state.prefilledIndex)
    }
  }, [location.state])

  const handleModifyQuestion = async () => {
    setIsLoading(true)
    setError(null)
    setModifiedQuestion(null)

    try {
      let placeholders: Record<string, string> | undefined
      if (customPlaceholders.trim()) {
        try {
          placeholders = JSON.parse(customPlaceholders)
        } catch (e) {
          throw new Error('Formato JSON inválido nos placeholders personalizados')
        }
      }

      const request = {
        year,
        index,
        includeOriginal,
        scaleFactor: scaleFactor ? parseFloat(scaleFactor) : undefined,
        placeholders
      }

      const response = await modificarQuestaoEnem(request)
      setModifiedQuestion(response)
    } catch (error) {
      console.error('Erro ao modificar questão:', error)
      setError(error instanceof Error ? error.message : 'Erro ao modificar questão')
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      // Could add a toast notification here
    } catch (error) {
      console.error('Erro ao copiar:', error)
    }
  }

  const resetForm = () => {
    setYear(2023)
    setIndex(136)
    setScaleFactor('')
    setCustomPlaceholders('')
    setIncludeOriginal(true)
    setModifiedQuestion(null)
    setError(null)
    setSelectedQuestion(null)
    // Keep the current input mode, don't reset it
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Settings className="h-8 w-8 text-blue-600" />
              Modificar Questão ENEM
            </h1>
            <p className="text-gray-600">
              Ajuste parâmetros de questões existentes do banco ENEM
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={resetForm}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Resetar
          </Button>
        </div>
      </div>

      {/* Mode Toggle */}
      <Card className="border-gray-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900">Modo de Seleção</h3>
              <p className="text-sm text-gray-600">
                Escolha como selecionar a questão ENEM para modificar
              </p>
            </div>
            <div className="flex border rounded-lg">
              <Button
                variant={inputMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setInputMode('list')}
                className="rounded-r-none"
              >
                <List className="h-4 w-4 mr-2" />
                Lista de Questões
              </Button>
              <Button
                variant={inputMode === 'manual' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setInputMode('manual')}
                className="rounded-l-none"
              >
                <Edit className="h-4 w-4 mr-2" />
                Entrada Manual
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* List Mode: Selected Question Preview */}
      {inputMode === 'list' && selectedQuestion && (
        <Card className="border-blue-200 bg-blue-50/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-900">
              <Eye className="h-5 w-5" />
              Questão Selecionada
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant="outline">ENEM {selectedQuestion.year}</Badge>
                <Badge variant="secondary">Questão {selectedQuestion.index}</Badge>
                <Badge variant="outline" className="text-xs">
                  {selectedQuestion.alternativesCount} alternativas
                </Badge>
              </div>
              
              <div>
                <h4 className="font-medium text-blue-900 mb-2">Título:</h4>
                <p className="text-blue-800">{selectedQuestion.title}</p>
              </div>
              
              <div>
                <h4 className="font-medium text-blue-900 mb-2">Prévia do Enunciado:</h4>
                <div className="bg-white p-3 rounded border">
                  <p className="text-sm text-gray-700 line-clamp-3">
                    {selectedQuestion.fullContext || selectedQuestion.context}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-blue-900">Gabarito:</span>
                <Badge variant="default" className="text-xs">
                  {selectedQuestion.correctAlternative}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Configuration Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Configurações da Modificação
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* List Mode: Select Question Button */}
          {inputMode === 'list' && !selectedQuestion && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-yellow-800">Nenhuma questão selecionada</h3>
                  <p className="text-sm text-yellow-700">
                    Selecione uma questão real do ENEM da lista para modificar
                  </p>
                </div>
                <Button asChild variant="outline" className="border-yellow-300 text-yellow-700 hover:bg-yellow-100">
                  <Link to="/enem">
                    <Eye className="h-4 w-4 mr-2" />
                    Selecionar Questão
                  </Link>
                </Button>
              </div>
            </div>
          )}

          {/* Manual Mode: Year and Index Input */}
          {inputMode === 'manual' && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-4">
                <Edit className="h-5 w-5 text-blue-600" />
                <div>
                  <h3 className="font-medium text-blue-800">Entrada Manual</h3>
                  <p className="text-sm text-blue-700">
                    Digite diretamente o ano e índice da questão ENEM que deseja modificar
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="manual-year">Ano da Prova ENEM</Label>
                  <Input
                    id="manual-year"
                    type="number"
                    min="2009"
                    max="2023"
                    value={year}
                    onChange={(e) => setYear(parseInt(e.target.value) || 2023)}
                    placeholder="Ex: 2023"
                  />
                  <p className="text-xs text-blue-600">Anos disponíveis: 2009-2023</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="manual-index">Índice da Questão</Label>
                  <Input
                    id="manual-index"
                    type="number"
                    min="136"
                    max="180"
                    value={index}
                    onChange={(e) => setIndex(parseInt(e.target.value) || 136)}
                    placeholder="Ex: 136"
                  />
                  <p className="text-xs text-blue-600">Questões de Matemática: 136-180</p>
                </div>
              </div>
            </div>
          )}

          {/* List Mode: Show selected question info, Manual Mode: Show current selection */}
          {(inputMode === 'list' && selectedQuestion) || inputMode === 'manual' ? (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Settings className="h-4 w-4 text-gray-600" />
                <span className="font-medium text-gray-800">Questão Atual:</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">ENEM {year}</Badge>
                <Badge variant="secondary">Questão {index}</Badge>
                {inputMode === 'list' && selectedQuestion && (
                  <Badge variant="outline" className="text-xs">
                    {selectedQuestion.alternativesCount} alternativas
                  </Badge>
                )}
              </div>
            </div>
          ) : null}

          {/* Modification Parameters */}

          <div className="space-y-2">
            <Label htmlFor="scaleFactor">Fator de Escala (Opcional)</Label>
            <Input
              id="scaleFactor"
              type="number"
              step="0.1"
              min="0.1"
              value={scaleFactor}
              onChange={(e) => setScaleFactor(e.target.value)}
              placeholder="Ex: 1.5 (multiplica todos os números por 1.5)"
            />
            <p className="text-xs text-gray-500">Multiplicador aplicado a todos os números da questão</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="placeholders">Placeholders Personalizados (JSON)</Label>
            <textarea
              id="placeholders"
              className="w-full h-24 p-3 border rounded-md resize-none font-mono text-sm"
              value={customPlaceholders}
              onChange={(e) => setCustomPlaceholders(e.target.value)}
              placeholder='{"{{n1}}": "100", "{{n2}}": "250"}'
            />
            <p className="text-xs text-gray-500">
              Formato JSON para sobrescrever placeholders específicos
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="includeOriginal"
              checked={includeOriginal}
              onChange={(e) => setIncludeOriginal(e.target.checked)}
              className="rounded"
            />
            <Label htmlFor="includeOriginal">Incluir questão original para comparação</Label>
          </div>

          <Button 
            onClick={handleModifyQuestion} 
            disabled={isLoading}
            className="w-full"
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Modificando Questão...
              </>
            ) : (
              <>
                <Settings className="mr-2 h-4 w-4" />
                Modificar Questão
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Error Display */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <div>
                <h3 className="font-semibold text-red-800">Erro ao modificar questão</h3>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Modified Question Display */}
      {modifiedQuestion && (
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <h2 className="text-2xl font-bold text-gray-900">Questão Modificada</h2>
          </div>

          {/* Question Info */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{modifiedQuestion.title || 'Questão ENEM'}</CardTitle>
                <div className="flex gap-2">
                  <Badge variant="outline">Ano {year}</Badge>
                  <Badge variant="outline">Questão {index}</Badge>
                  {scaleFactor && (
                    <Badge variant="secondary">Escala {scaleFactor}x</Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Context */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">Enunciado:</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(modifiedQuestion.rendered.context)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="whitespace-pre-line">{modifiedQuestion.rendered.context}</p>
                </div>
              </div>

              {/* Alternatives Introduction */}
              {modifiedQuestion.rendered.alternativesIntroduction && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">Introdução das Alternativas:</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(modifiedQuestion.rendered.alternativesIntroduction)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="whitespace-pre-line">{modifiedQuestion.rendered.alternativesIntroduction}</p>
                  </div>
                </div>
              )}

              {/* Alternatives */}
              {modifiedQuestion.alternatives && modifiedQuestion.alternatives.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Alternativas:</h3>
                  <div className="space-y-2">
                    {modifiedQuestion.alternatives.map((alt: any, index: number) => (
                      <div
                        key={index}
                        className={`p-3 rounded-lg border ${
                          alt.letter === modifiedQuestion.correctAlternative
                            ? 'bg-green-50 border-green-200'
                            : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span className="font-semibold text-sm bg-white px-2 py-1 rounded border">
                            {alt.letter})
                          </span>
                          <p className="flex-1">{alt.text}</p>
                          {alt.letter === modifiedQuestion.correctAlternative && (
                            <Badge variant="default" className="text-xs">
                              Gabarito
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Placeholders */}
              {Object.keys(modifiedQuestion.placeholders).length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Placeholders Utilizados:</h3>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                      {Object.entries(modifiedQuestion.placeholders).map(([key, value]) => (
                        <div key={key} className="flex items-center gap-2">
                          <code className="text-xs bg-white px-2 py-1 rounded border">
                            {key}
                          </code>
                          <span className="text-sm">→</span>
                          <span className="text-sm font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Original Question Comparison */}
          {includeOriginal && modifiedQuestion.originalQuestion && (
            <Card className="border-blue-200 bg-blue-50/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-900">
                  <Eye className="h-5 w-5" />
                  Questão Original (Para Comparação)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Enunciado Original:</h3>
                  <div className="bg-white p-4 rounded-lg border">
                    <p className="whitespace-pre-line">{modifiedQuestion.originalQuestion.context}</p>
                  </div>
                </div>

                {modifiedQuestion.originalQuestion.alternativesIntroduction && (
                  <div>
                    <h3 className="font-semibold mb-2">Introdução Original:</h3>
                    <div className="bg-white p-4 rounded-lg border">
                      <p className="whitespace-pre-line">{modifiedQuestion.originalQuestion.alternativesIntroduction}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}
