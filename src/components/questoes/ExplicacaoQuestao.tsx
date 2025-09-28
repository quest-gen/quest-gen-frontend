import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Lightbulb, BookOpen } from 'lucide-react'
import { Questao, DifficultyMapping } from '@/types/questao'

interface ExplicacaoQuestaoProps {
  questao: Questao
}

export function ExplicacaoQuestao({ questao }: ExplicacaoQuestaoProps) {
  if (!questao.explanation) {
    return null
  }

  return (
    <Card className="mt-6 border-blue-200 bg-blue-50/50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-blue-900">
          <Lightbulb className="h-5 w-5" />
          Explicação
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-blue-800 leading-relaxed">
            {questao.explanation}
          </p>
          
          <div className="flex items-center gap-4 pt-2 border-t border-blue-200">
            <div className="flex items-center gap-2 text-sm text-blue-700">
              <BookOpen className="h-4 w-4" />
              <span>Assunto: {questao.assunto}</span>
            </div>
            
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
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
