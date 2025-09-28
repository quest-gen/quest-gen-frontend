import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Loader2, Sparkles } from 'lucide-react'

interface FormCriacaoQuestaoProps {
  onSubmit: (dados: {
    vestibular: string
    assunto: string
    numeroAlternativas: number
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (vestibular && assunto) {
      onSubmit({ vestibular, assunto, numeroAlternativas })
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

          <div className="space-y-2">
            <Label htmlFor="alternativas">Número de Alternativas</Label>
            <Select 
              value={numeroAlternativas.toString()} 
              onValueChange={(value) => setNumeroAlternativas(parseInt(value))}
            >
              <SelectTrigger className="w-full md:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3">3 alternativas</SelectItem>
                <SelectItem value="4">4 alternativas</SelectItem>
                <SelectItem value="5">5 alternativas</SelectItem>
              </SelectContent>
            </Select>
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
