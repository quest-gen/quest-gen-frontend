import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { CardQuestao } from '@/components/questoes/CardQuestao'
import { ArrowLeft, Search, Filter, BookOpen, Calendar, TrendingUp, Plus, Grid, List } from 'lucide-react'
import { Questao, DifficultyMapping } from '@/types/questao'
import { buscarQuestoesPorFiltros, buscarEstatisticasQuestoes } from '@/lib/api'

export function TodasQuestoes() {
  const [questoes, setQuestoes] = useState<Questao[]>([])
  const [questoesFiltradas, setQuestoesFiltradas] = useState<Questao[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filtroVestibular, setFiltroVestibular] = useState<string>('todos')
  const [filtroAssunto, setFiltroAssunto] = useState<string>('todos')
  const [filtroDificuldade, setFiltroDificuldade] = useState<string>('todos')
  const [ordenacao, setOrdenacao] = useState<string>('recentes')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [currentPage, setCurrentPage] = useState(1)
  const [estadisticas, setEstatisticas] = useState<any>(null)
  
  const itemsPerPage = 12

  useEffect(() => {
    const carregarQuestoes = async () => {
      setIsLoading(true)
      try {
        const [questoesData, statsData] = await Promise.all([
          buscarQuestoesPorFiltros({ limit: 100 }),
          buscarEstatisticasQuestoes()
        ])
        setQuestoes(questoesData)
        setQuestoesFiltradas(questoesData)
        setEstatisticas(statsData)
      } catch (error) {
        console.error('Erro ao carregar questões:', error)
      } finally {
        setIsLoading(false)
      }
    }

    carregarQuestoes()
  }, [])

  // Filter and search questions
  useEffect(() => {
    let filtered = [...questoes]

    // Apply search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter(questao => 
        questao.enunciado.toLowerCase().includes(searchTerm.toLowerCase()) ||
        questao.assunto.toLowerCase().includes(searchTerm.toLowerCase()) ||
        questao.vestibular.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (questao.titulo && questao.titulo.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Apply filters
    if (filtroVestibular !== 'todos') {
      filtered = filtered.filter(q => q.vestibular === filtroVestibular)
    }

    if (filtroAssunto !== 'todos') {
      filtered = filtered.filter(q => q.assunto === filtroAssunto)
    }

    if (filtroDificuldade !== 'todos') {
      filtered = filtered.filter(q => q.dificuldade === filtroDificuldade)
    }

    // Apply sorting
    switch (ordenacao) {
      case 'recentes':
        filtered.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
        break
      case 'antigas':
        filtered.sort((a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime())
        break
      case 'vestibular':
        filtered.sort((a, b) => a.vestibular.localeCompare(b.vestibular))
        break
      case 'assunto':
        filtered.sort((a, b) => a.assunto.localeCompare(b.assunto))
        break
      case 'dificuldade':
        filtered.sort((a, b) => {
          const ordem = { 'easy': 1, 'medium': 2, 'hard': 3 }
          return (ordem[a.dificuldade as keyof typeof ordem] || 2) - (ordem[b.dificuldade as keyof typeof ordem] || 2)
        })
        break
    }

    setQuestoesFiltradas(filtered)
    setCurrentPage(1) // Reset to first page when filters change
  }, [questoes, searchTerm, filtroVestibular, filtroAssunto, filtroDificuldade, ordenacao])

  // Get unique values for filters
  const vestibularesUnicos = [...new Set(questoes.map(q => q.vestibular))].sort()
  const assuntosUnicos = [...new Set(questoes.map(q => q.assunto))].sort()
  const dificuldadesUnicas = [...new Set(questoes.map(q => q.dificuldade).filter(Boolean))].sort()

  // Pagination
  const totalPages = Math.ceil(questoesFiltradas.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const questoesPaginadas = questoesFiltradas.slice(startIndex, endIndex)

  const clearFilters = () => {
    setSearchTerm('')
    setFiltroVestibular('todos')
    setFiltroAssunto('todos')
    setFiltroDificuldade('todos')
    setOrdenacao('recentes')
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-pulse space-y-4 w-full max-w-6xl">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
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
              <BookOpen className="h-8 w-8 text-blue-600" />
              Todas as Questões
            </h1>
            <p className="text-gray-600">
              {questoesFiltradas.length} de {questoes.length} questões encontradas
            </p>
          </div>
        </div>
        
        <Button asChild>
          <Link to="/criar">
            <Plus className="h-4 w-4 mr-2" />
            Criar Nova
          </Link>
        </Button>
      </div>

      {/* Statistics Cards */}
      {estadisticas && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <BookOpen className="h-8 w-8 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold">{estadisticas.totalQuestoes}</div>
                  <div className="text-sm text-gray-600">Total de Questões</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-8 w-8 text-green-600" />
                <div>
                  <div className="text-2xl font-bold">{Object.keys(estadisticas.questoesPorVestibular).length}</div>
                  <div className="text-sm text-gray-600">Vestibulares</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-8 w-8 text-purple-600" />
                <div>
                  <div className="text-2xl font-bold">{Object.keys(estadisticas.questoesPorAssunto).length}</div>
                  <div className="text-sm text-gray-600">Assuntos</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Filter className="h-8 w-8 text-orange-600" />
                <div>
                  <div className="text-2xl font-bold">{Object.keys(estadisticas.questoesPorDificuldade).length}</div>
                  <div className="text-sm text-gray-600">Níveis</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Buscar e Filtrar
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar por enunciado, assunto, vestibular..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filters */}
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
              <label className="text-sm font-medium mb-2 block">Dificuldade</label>
              <Select value={filtroDificuldade} onValueChange={setFiltroDificuldade}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todas</SelectItem>
                  {dificuldadesUnicas.map(dificuldade => (
                    <SelectItem key={dificuldade} value={dificuldade}>
                      {DifficultyMapping[dificuldade as keyof typeof DifficultyMapping] || dificuldade || 'N/A'}
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
                  <SelectItem value="recentes">Mais Recentes</SelectItem>
                  <SelectItem value="antigas">Mais Antigas</SelectItem>
                  <SelectItem value="vestibular">Vestibular</SelectItem>
                  <SelectItem value="assunto">Assunto</SelectItem>
                  <SelectItem value="dificuldade">Dificuldade</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Filter Actions */}
          <div className="flex items-center justify-between pt-2 border-t">
            <Button variant="outline" size="sm" onClick={clearFilters}>
              Limpar Filtros
            </Button>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Visualização:</span>
              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {questoesFiltradas.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Search className="h-12 w-12 text-gray-400" />
          </div>
          <p className="text-gray-500 text-lg mb-2">
            Nenhuma questão encontrada com os filtros aplicados.
          </p>
          <p className="text-gray-400 text-sm mb-4">
            Tente ajustar os filtros ou fazer uma nova busca.
          </p>
          <Button variant="outline" onClick={clearFilters}>
            Limpar Filtros
          </Button>
        </div>
      ) : (
        <>
          {/* Questions Grid/List */}
          <div className={
            viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          }>
            {questoesPaginadas.map((questao) => (
              <CardQuestao key={questao.id} questao={questao} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-6">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                Anterior
              </Button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = i + 1
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </Button>
                  )
                })}
                {totalPages > 5 && (
                  <>
                    <span className="px-2">...</span>
                    <Button
                      variant={currentPage === totalPages ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setCurrentPage(totalPages)}
                    >
                      {totalPages}
                    </Button>
                  </>
                )}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                Próxima
              </Button>
            </div>
          )}

          {/* Results Summary */}
          <div className="text-center text-sm text-gray-600 pt-4 border-t">
            Mostrando {startIndex + 1}-{Math.min(endIndex, questoesFiltradas.length)} de {questoesFiltradas.length} questões
          </div>
        </>
      )}
    </div>
  )
}
