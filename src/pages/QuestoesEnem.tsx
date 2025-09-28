import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowLeft, BookOpen, Calendar, Settings, Eye, Loader2, ChevronLeft, ChevronRight, Search } from 'lucide-react'
import { buscarQuestoesEnem } from '@/lib/api'

interface EnemQuestion {
  id: string
  year: number
  index: number
  title: string
  context: string
  alternativesCount: number
  correctAlternative: string
  fullContext: string
  alternativesIntroduction: string
  alternatives: any[]
}

export function QuestoesEnem() {
  const navigate = useNavigate()
  const [questions, setQuestions] = useState<EnemQuestion[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedYear, setSelectedYear] = useState<number>(2023)
  const [currentOffset, setCurrentOffset] = useState<number>(136)
  const [, setTotalQuestions] = useState<number>(0)
  
  const questionsPerPage = 15
  const availableYears = Array.from({ length: 15 }, (_, i) => 2023 - i) // 2023 to 2009

  useEffect(() => {
    loadQuestions()
  }, [selectedYear, currentOffset])

  const loadQuestions = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await buscarQuestoesEnem({
        year: selectedYear,
        limit: questionsPerPage,
        offset: currentOffset
      })
      
      setQuestions(response.questions)
      setTotalQuestions(response.total)
    } catch (error) {
      console.error('Erro ao carregar questões ENEM:', error)
      setError(error instanceof Error ? error.message : 'Erro ao carregar questões')
    } finally {
      setIsLoading(false)
    }
  }

  const handleYearChange = (year: string) => {
    setSelectedYear(parseInt(year))
    setCurrentOffset(136) // Reset to first math question
  }

  const handlePrevPage = () => {
    if (currentOffset > 136) {
      setCurrentOffset(Math.max(136, currentOffset - questionsPerPage))
    }
  }

  const handleNextPage = () => {
    if (currentOffset + questionsPerPage <= 180) {
      setCurrentOffset(currentOffset + questionsPerPage)
    }
  }

  const handleModifyQuestion = (question: EnemQuestion) => {
    navigate('/modificar', {
      state: {
        selectedQuestion: question,
        prefilledYear: question.year,
        prefilledIndex: question.index
      }
    })
  }

  const canGoPrev = currentOffset > 136
  const canGoNext = currentOffset + questionsPerPage <= 180

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
              <BookOpen className="h-8 w-8 text-blue-600" />
              Questões ENEM - Matemática
            </h1>
            <p className="text-gray-600">
              Selecione uma questão real do ENEM para modificar e criar variações
            </p>
          </div>
        </div>
      </div>

      {/* Year Selection and Pagination */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium">Ano:</span>
                <Select value={selectedYear.toString()} onValueChange={handleYearChange}>
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {availableYears.map(year => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="text-sm text-gray-500">
                Questões {currentOffset} - {Math.min(currentOffset + questionsPerPage - 1, 180)} de 180
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevPage}
                disabled={!canGoPrev || isLoading}
              >
                <ChevronLeft className="h-4 w-4" />
                Anterior
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                disabled={!canGoNext || isLoading}
              >
                Próxima
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <span className="ml-2 text-gray-600">Carregando questões do ENEM {selectedYear}...</span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <div>
                <h3 className="font-semibold text-red-800">Erro ao carregar questões</h3>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Questions Grid */}
      {!isLoading && !error && (
        <>
          {questions.length === 0 ? (
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Search className="h-12 w-12 text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg mb-2">
                Nenhuma questão encontrada para {selectedYear}
              </p>
              <p className="text-gray-400 text-sm">
                Tente selecionar um ano diferente
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {questions.map((question) => (
                <Card key={question.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg line-clamp-2 leading-tight">
                          {question.title || `Questão ${question.index}`}
                        </CardTitle>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline">ENEM {question.year}</Badge>
                          <Badge variant="secondary">Questão {question.index}</Badge>
                          <Badge variant="outline" className="text-xs">
                            {question.alternativesCount} alternativas
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pb-3">
                    <div className="space-y-4">
                      {/* Question Preview */}
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Prévia do Enunciado:</h4>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-600 line-clamp-4">
                            {question.context}
                          </p>
                        </div>
                      </div>

                      {/* Correct Answer */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-gray-500">Gabarito:</span>
                        <Badge variant="default" className="text-xs">
                          {question.correctAlternative}
                        </Badge>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-2">
                        <Link 
                          to={`/questao/enem-${question.year}-${question.index}`}
                          state={{ 
                            questao: {
                              id: question.id,
                              titulo: question.title || `Questão ${question.index} - ENEM ${question.year}`,
                              enunciado: question.fullContext + (question.alternativesIntroduction ? '\n\n' + question.alternativesIntroduction : ''),
                              alternativas: question.alternatives.map((alt: any, index: number) => ({
                                id: `alt-${index}`,
                                letra: String.fromCharCode(65 + index), // A, B, C, D, E
                                texto: alt.text || alt
                              })),
                              gabarito: question.correctAlternative,
                              fonte: `ENEM ${question.year}`,
                              vestibular: `ENEM ${question.year}`,
                              dificuldade: 'medium',
                              tipo: 'matematica',
                              tags: [`ENEM ${question.year}`, 'Matemática'],
                              criadoEm: new Date().toISOString(),
                              isEnemQuestion: true,
                              enemData: {
                                year: question.year,
                                index: question.index,
                                alternativesIntroduction: question.alternativesIntroduction
                              }
                            }
                          }}
                          className="flex-1"
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Ver Completa
                          </Button>
                        </Link>
                        <Button
                          variant="default"
                          size="sm"
                          className="flex-1"
                          onClick={() => handleModifyQuestion(question)}
                        >
                          <Settings className="h-4 w-4 mr-2" />
                          Modificar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Bottom Pagination */}
          {questions.length > 0 && (
            <div className="flex items-center justify-center gap-4 pt-6">
              <Button
                variant="outline"
                onClick={handlePrevPage}
                disabled={!canGoPrev}
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Página Anterior
              </Button>
              
              <div className="text-sm text-gray-500">
                Questões {currentOffset} - {Math.min(currentOffset + questionsPerPage - 1, 180)}
              </div>
              
              <Button
                variant="outline"
                onClick={handleNextPage}
                disabled={!canGoNext}
              >
                Próxima Página
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
