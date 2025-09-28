import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Loader2, Sparkles } from 'lucide-react'
import { DifficultyLevel, QuestionType } from '@/types/questao'

interface FormCriacaoQuestaoProps {
  onSubmit: (dados: {
    vestibular: string
    assunto: string
    numeroAlternativas: number
    dificuldade?: DifficultyLevel
    tipoQuestao?: QuestionType
    conteudo?: string
  }) => void
  isLoading?: boolean
}

const vestibulares = [
  'FUVEST',
  'ENEM',
  'UNICAMP',
  'UNESP',
  'OBJETIVO',
  'MACKENZIE',
  'PUC-SP',
  'FGV'
]

const assuntos = [
  'Álgebra',
  'Geometria',
  'Trigonometria',
  'Análise Combinatória',
  'Probabilidade',
  'Estatística',
  'Funções',
  'Logaritmos',
  'Progressões',
  'Matrizes e Determinantes'
]

export function FormCriacaoQuestao({ onSubmit, isLoading = false }: FormCriacaoQuestaoProps) {
  const [vestibular, setVestibular] = useState('')
  const [assunto, setAssunto] = useState('')
  const [numeroAlternativas, setNumeroAlternativas] = useState(5)
  const [dificuldade, setDificuldade] = useState<DifficultyLevel>('medium')
  const [tipoQuestao, setTipoQuestao] = useState<QuestionType>('multiple_choice')
  const [conteudo, setConteudo] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (vestibular && assunto) {
      onSubmit({ 
        vestibular, 
        assunto, 
        numeroAlternativas,
        dificuldade,
        tipoQuestao,
        conteudo: conteudo.trim() || undefined
      })
    }
  }

  const isFormValid = vestibular && assunto

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-blue-600" />
          Gerar Nova Questão
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="vestibular">Vestibular</Label>
              <Select value={vestibular} onValueChange={setVestibular}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o vestibular" />
                </SelectTrigger>
                <SelectContent>
                  {vestibulares.map((v) => (
                    <SelectItem key={v} value={v}>
                      {v}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="assunto">Assunto</Label>
              <Select value={assunto} onValueChange={setAssunto}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o assunto" />
                </SelectTrigger>
                <SelectContent>
                  {assuntos.map((a) => (
                    <SelectItem key={a} value={a}>
                      {a}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="alternativas">Número de Alternativas</Label>
              <Select 
                value={numeroAlternativas.toString()} 
                onValueChange={(value) => setNumeroAlternativas(parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 alternativas</SelectItem>
                  <SelectItem value="4">4 alternativas</SelectItem>
                  <SelectItem value="5">5 alternativas</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dificuldade">Dificuldade</Label>
              <Select value={dificuldade} onValueChange={(value: DifficultyLevel) => setDificuldade(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Fácil</SelectItem>
                  <SelectItem value="medium">Médio</SelectItem>
                  <SelectItem value="hard">Difícil</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tipo">Tipo de Questão</Label>
              <Select value={tipoQuestao} onValueChange={(value: QuestionType) => setTipoQuestao(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="multiple_choice">Múltipla Escolha</SelectItem>
                  <SelectItem value="true_false">Verdadeiro/Falso</SelectItem>
                  <SelectItem value="open_ended">Dissertativa</SelectItem>
                  <SelectItem value="fill_blank">Preencher Lacunas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="conteudo">Conteúdo Base (Opcional)</Label>
            <Textarea
              id="conteudo"
              placeholder="Digite um conteúdo específico para gerar questões mais direcionadas... (mínimo 50 caracteres)"
              value={conteudo}
              onChange={(e) => setConteudo(e.target.value)}
              rows={4}
              className="resize-none"
            />
            {conteudo.length > 0 && conteudo.length < 50 && (
              <p className="text-sm text-amber-600">
                Conteúdo deve ter pelo menos 50 caracteres ({conteudo.length}/50)
              </p>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            size="lg"
            disabled={!isFormValid || isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Gerando Questão...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Gerar Questão
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
