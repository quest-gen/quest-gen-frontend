import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Filter, X, Search } from 'lucide-react'
import { DifficultyLevel, MathSource } from '@/types/questao'

interface FiltrosAvancadosProps {
  onFiltrar: (filtros: {
    vestibular?: string
    assunto?: string
    dificuldade?: DifficultyLevel
    source?: MathSource
  }) => void
  onLimpar: () => void
  isLoading?: boolean
}

const vestibulares = [
  'FUVEST', 'ENEM', 'UNICAMP', 'UNESP', 'OBJETIVO', 'MACKENZIE', 'PUC-SP', 'FGV'
]

const assuntos = [
  'Álgebra', 'Geometria', 'Trigonometria', 'Análise Combinatória',
  'Probabilidade', 'Estatística', 'Funções', 'Logaritmos', 'Progressões',
  'Matrizes e Determinantes'
]

const sources: MathSource[] = [
  'enem', 'fuvest', 'unicamp', 'ufrj', 'ufmg', 'unesp', 'ufsc', 
  'ufrgs', 'unifesp', 'ime', 'ita', 'personalizado', 'generico'
]

export function FiltrosAvancados({ onFiltrar, onLimpar, isLoading = false }: FiltrosAvancadosProps) {
  const [vestibular, setVestibular] = useState<string>('')
  const [assunto, setAssunto] = useState<string>('')
  const [dificuldade, setDificuldade] = useState<DifficultyLevel | ''>('')
  const [source, setSource] = useState<MathSource | ''>('')

  const handleFiltrar = () => {
    const filtros: any = {}
    if (vestibular) filtros.vestibular = vestibular
    if (assunto) filtros.assunto = assunto
    if (dificuldade) filtros.dificuldade = dificuldade
    if (source) filtros.source = source
    
    onFiltrar(filtros)
  }

  const handleLimpar = () => {
    setVestibular('')
    setAssunto('')
    setDificuldade('')
    setSource('')
    onLimpar()
  }

  const temFiltrosAtivos = vestibular || assunto || dificuldade || source

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Filter className="h-5 w-5" />
          Filtros Avançados
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div className="space-y-2">
            <Label>Vestibular</Label>
            <Select value={vestibular} onValueChange={setVestibular}>
              <SelectTrigger>
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos</SelectItem>
                {vestibulares.map((v) => (
                  <SelectItem key={v} value={v}>{v}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Assunto</Label>
            <Select value={assunto} onValueChange={setAssunto}>
              <SelectTrigger>
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos</SelectItem>
                {assuntos.map((a) => (
                  <SelectItem key={a} value={a}>{a}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Dificuldade</Label>
            <Select value={dificuldade} onValueChange={(value: DifficultyLevel | '') => setDificuldade(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Todas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todas</SelectItem>
                <SelectItem value="easy">Fácil</SelectItem>
                <SelectItem value="medium">Médio</SelectItem>
                <SelectItem value="hard">Difícil</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Origem</Label>
            <Select value={source} onValueChange={(value: MathSource | '') => setSource(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Todas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todas</SelectItem>
                {sources.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {temFiltrosAtivos && (
          <div className="flex flex-wrap gap-2 mb-4">
            {vestibular && (
              <Badge variant="secondary" className="gap-1">
                {vestibular}
                <X className="h-3 w-3 cursor-pointer" onClick={() => setVestibular('')} />
              </Badge>
            )}
            {assunto && (
              <Badge variant="secondary" className="gap-1">
                {assunto}
                <X className="h-3 w-3 cursor-pointer" onClick={() => setAssunto('')} />
              </Badge>
            )}
            {dificuldade && (
              <Badge variant="secondary" className="gap-1">
                {dificuldade === 'easy' ? 'Fácil' : dificuldade === 'medium' ? 'Médio' : 'Difícil'}
                <X className="h-3 w-3 cursor-pointer" onClick={() => setDificuldade('')} />
              </Badge>
            )}
            {source && (
              <Badge variant="secondary" className="gap-1">
                {source.toUpperCase()}
                <X className="h-3 w-3 cursor-pointer" onClick={() => setSource('')} />
              </Badge>
            )}
          </div>
        )}

        <div className="flex gap-2">
          <Button onClick={handleFiltrar} disabled={isLoading} className="flex-1">
            <Search className="h-4 w-4 mr-2" />
            Filtrar
          </Button>
          {temFiltrosAtivos && (
            <Button variant="outline" onClick={handleLimpar} disabled={isLoading}>
              <X className="h-4 w-4 mr-2" />
              Limpar
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
