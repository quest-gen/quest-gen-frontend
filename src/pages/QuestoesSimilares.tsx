import { useEffect, useState } from 'react'
import { useParams, Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowLeft, Loader2, Filter, Shuffle, Target, TrendingUp, BookOpen, Calendar, Zap, Eye, GitCompare } from 'lucide-react'
import { Questao, DifficultyMapping } from '@/types/questao'
import { buscarQuestoesSimilares, buscarQuestaoPorId } from '@/lib/api'

interface QuestaoComSimilaridade extends Questao {
  similaridade: number
  motivoSimilaridade: string[]
}

export function QuestoesSimilares() {
  const { id } = useParams<{ id: string }>()
  const location = useLocation()
  const [questaoOriginal, setQuestaoOriginal] = useState<Questao | null>(null)
  const [questoesSimilares, setQuestoesSimilares] = useState<QuestaoComSimilaridade[]>([])
  const [questoesFiltradas, setQuestoesFiltradas] = useState<QuestaoComSimilaridade[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filtroVestibular, setFiltroVestibular] = useState<string>('todos')
  const [filtroDificuldade, setFiltroDificuldade] = useState<string>('todos')
  const [filtroAssunto, setFiltroAssunto] = useState<string>('todos')
  const [ordenacao, setOrdenacao] = useState<string>('similaridade')

  // Mock function to generate similarity data
  const gerarDadosSimilaridade = (questao: Questao, questaoOriginal: Questao): QuestaoComSimilaridade => {
    const motivosSimilaridade: string[] = []
    let similaridade = 0

    // Check subject similarity
    if (questao.assunto === questaoOriginal.assunto) {
      motivosSimilaridade.push('Mesmo assunto')
      similaridade += 40
    }

    // Check vestibular similarity
    if (questao.vestibular === questaoOriginal.vestibular) {
      motivosSimilaridade.push('Mesmo vestibular')
      similaridade += 20
    }

    // Check difficulty similarity
    if (questao.dificuldade === questaoOriginal.dificuldade) {
      motivosSimilaridade.push('Mesma dificuldade')
      similaridade += 15
    }

    // Check question type similarity
    if (questao.questionType === questaoOriginal.questionType) {
      motivosSimilaridade.push('Mesmo tipo')
      similaridade += 10
    }

    // Check source similarity
    if (questao.source === questaoOriginal.source) {
      motivosSimilaridade.push('Mesma fonte')
      similaridade += 10
    }

    // Add some randomness for more realistic similarity scores
    similaridade += Math.floor(Math.random() * 15)

    // Ensure similarity is between 0 and 100
    similaridade = Math.min(100, Math.max(0, similaridade))

    return {
      ...questao,
      similaridade,
      motivoSimilaridade: motivosSimilaridade
    }
  }

  useEffect(() => {
    const carregarQuestoesSimilares = async () => {
      if (!id) return
      
      setIsLoading(true)
      try {
        // Load original question first
        let original: Questao | null = null
        
        // Check if original question is passed via navigation state
        if (location.state?.questaoOriginal) {
          original = location.state.questaoOriginal
          setQuestaoOriginal(original)
        } else {
          original = await buscarQuestaoPorId(id)
          setQuestaoOriginal(original)
        }

        if (original) {
          // Load similar questions
          const questoes = await buscarQuestoesSimilares(id)
          
          // Add similarity data to each question
          const questoesComSimilaridade = questoes.map(questao => 
            gerarDadosSimilaridade(questao, original!)
          )

          // Sort by similarity (highest first)
          questoesComSimilaridade.sort((a, b) => b.similaridade - a.similaridade)

          setQuestoesSimilares(questoesComSimilaridade)
          setQuestoesFiltradas(questoesComSimilaridade)
        }
      } catch (error) {
        console.error('Erro ao buscar questões similares:', error)
      } finally {
        setIsLoading(false)
      }
    }

    carregarQuestoesSimilares()
  }, [id, location.state])

  // Filter and sort questions
  useEffect(() => {
    let questoesFiltradas = [...questoesSimilares]

    // Apply filters
    if (filtroVestibular !== 'todos') {
      questoesFiltradas = questoesFiltradas.filter(q => q.vestibular === filtroVestibular)
    }

    if (filtroDificuldade !== 'todos') {
      questoesFiltradas = questoesFiltradas.filter(q => q.dificuldade === filtroDificuldade)
    }

    if (filtroAssunto !== 'todos') {
      questoesFiltradas = questoesFiltradas.filter(q => q.assunto === filtroAssunto)
    }

    // Apply sorting
    switch (ordenacao) {
      case 'similaridade':
        questoesFiltradas.sort((a, b) => b.similaridade - a.similaridade)
        break
      case 'dificuldade':
        questoesFiltradas.sort((a, b) => {
          const ordem = { 'easy': 1, 'medium': 2, 'hard': 3 }
          return (ordem[a.dificuldade as keyof typeof ordem] || 2) - (ordem[b.dificuldade as keyof typeof ordem] || 2)
        })
        break
      case 'vestibular':
        questoesFiltradas.sort((a, b) => a.vestibular.localeCompare(b.vestibular))
        break
      case 'assunto':
        questoesFiltradas.sort((a, b) => a.assunto.localeCompare(b.assunto))
        break
    }

    setQuestoesFiltradas(questoesFiltradas)
  }, [questoesSimilares, filtroVestibular, filtroDificuldade, filtroAssunto, ordenacao])

  // Get unique values for filters
  const vestibularesUnicos = [...new Set(questoesSimilares.map(q => q.vestibular))].sort()
  const dificuldadesUnicas = [...new Set(questoesSimilares.map(q => q.dificuldade).filter(Boolean))].sort()
  const assuntosUnicos = [...new Set(questoesSimilares.map(q => q.assunto))].sort()

  const getSimilarityColor = (similarity: number) => {
    if (similarity >= 80) return 'bg-green-500'
    if (similarity >= 60) return 'bg-yellow-500'
    if (similarity >= 40) return 'bg-orange-500'
    return 'bg-red-500'
  }

  const getSimilarityLabel = (similarity: number) => {
    if (similarity >= 80) return 'Muito Similar'
    if (similarity >= 60) return 'Similar'
    if (similarity >= 40) return 'Pouco Similar'
    return 'Diferente'
  }

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
      {/* Header with Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link to={`/questao/${id}`}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Shuffle className="h-8 w-8 text-blue-600" />
              Questões Similares
            </h1>
            <p className="text-gray-600">
              Encontramos {questoesSimilares.length} questões relacionadas • {questoesFiltradas.length} exibidas
            </p>
          </div>
        </div>
      </div>

      {/* Original Question Summary */}
      {questaoOriginal && (
        <Card className="border-blue-200 bg-blue-50/30">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-blue-900">
              <Target className="h-5 w-5" />
              Questão Original
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-blue-600" />
                <span className="font-medium">Assunto:</span>
                <span>{questaoOriginal.assunto}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-blue-600" />
                <span className="font-medium">Vestibular:</span>
                <span>{questaoOriginal.vestibular}</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                <span className="font-medium">Dificuldade:</span>
                <Badge variant="outline" className="text-xs">
                  {questaoOriginal.dificuldade ? DifficultyMapping[questaoOriginal.dificuldade] || questaoOriginal.dificuldade : 'N/A'}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-blue-600" />
                <span className="font-medium">Tipo:</span>
                <span className="capitalize">{questaoOriginal.questionType?.replace('_', ' ') || 'N/A'}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters and Sorting */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Filter className="h-5 w-5" />
            Filtros e Ordenação
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Vestibular</label>
              <Select value={filtroVestibular} onValueChange={setFiltroVestibular}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  {vestibularesUnicos.map(vestibular => (
                    <SelectItem key={vestibular} value={vestibular}>
                      {vestibular}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Dificuldade</label>
              <Select value={filtroDificuldade} onValueChange={setFiltroDificuldade}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todas</SelectItem>
                  {dificuldadesUnicas.map(dificuldade => (
                    <SelectItem key={dificuldade} value={dificuldade || 'unknown'}>
                      {DifficultyMapping[dificuldade as keyof typeof DifficultyMapping] || dificuldade || 'N/A'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Assunto</label>
              <Select value={filtroAssunto} onValueChange={setFiltroAssunto}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  {assuntosUnicos.map(assunto => (
                    <SelectItem key={assunto} value={assunto}>
                      {assunto}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Ordenar por</label>
              <Select value={ordenacao} onValueChange={setOrdenacao}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="similaridade">Similaridade</SelectItem>
                  <SelectItem value="dificuldade">Dificuldade</SelectItem>
                  <SelectItem value="vestibular">Vestibular</SelectItem>
                  <SelectItem value="assunto">Assunto</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Similar Questions Grid */}
      {questoesFiltradas.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Shuffle className="h-12 w-12 text-gray-400" />
          </div>
          <p className="text-gray-500 text-lg mb-2">
            Nenhuma questão similar encontrada com os filtros aplicados.
          </p>
          <p className="text-gray-400 text-sm">
            Tente ajustar os filtros ou remover algumas restrições.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {questoesFiltradas.map((questao) => (
            <Card key={questao.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg line-clamp-2 leading-tight">
                    {questao.titulo || `Questão ${questao.vestibular} ${questao.ano || 'Gerada'}`}
                  </CardTitle>
                  <div className="flex flex-col gap-2 ml-2 shrink-0">
                    <Badge variant="secondary">
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
                  </div>
                </div>
                
                {/* Similarity Score */}
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${getSimilarityColor(questao.similaridade)}`}></div>
                    <span className="text-sm font-medium">{questao.similaridade}% similar</span>
                    <Badge variant="outline" className="text-xs">
                      {getSimilarityLabel(questao.similaridade)}
                    </Badge>
                  </div>
                </div>

                {/* Similarity Reasons */}
                {questao.motivoSimilaridade.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {questao.motivoSimilaridade.map((motivo, index) => (
                      <Badge key={index} variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                        {motivo}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardHeader>

              <CardContent className="pb-3">
                <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                  {questao.enunciado}
                </p>
                
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-3 w-3" />
                    <span>{questao.assunto}</span>
                  </div>
                  {questao.ano && (
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{questao.ano}</span>
                    </div>
                  )}
                  {questao.questionType && (
                    <div className="flex items-center gap-1">
                      <Target className="h-3 w-3" />
                      <span className="capitalize">{questao.questionType.replace('_', ' ')}</span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button asChild variant="outline" size="sm" className="flex-1">
                    <Link to={`/questao/${questao.id}`}>
                      <Eye className="h-4 w-4 mr-2" />
                      Ver Detalhes
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm">
                    <GitCompare className="h-4 w-4 mr-2" />
                    Comparar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Summary Statistics */}
      {questoesFiltradas.length > 0 && (
        <Card className="border-gray-200 bg-gray-50/30">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5" />
              Estatísticas de Similaridade
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {questoesFiltradas.filter(q => q.similaridade >= 80).length}
                </div>
                <div className="text-gray-600">Muito Similares</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {questoesFiltradas.filter(q => q.similaridade >= 60 && q.similaridade < 80).length}
                </div>
                <div className="text-gray-600">Similares</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {questoesFiltradas.filter(q => q.similaridade >= 40 && q.similaridade < 60).length}
                </div>
                <div className="text-gray-600">Pouco Similares</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {Math.round(questoesFiltradas.reduce((acc, q) => acc + q.similaridade, 0) / questoesFiltradas.length)}%
                </div>
                <div className="text-gray-600">Similaridade Média</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
