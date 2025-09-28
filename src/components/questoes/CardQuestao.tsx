import { Link } from 'react-router-dom'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, BookOpen, Eye, Shuffle } from 'lucide-react'
import { Questao } from '@/types/questao'

interface CardQuestaoProps {
  questao: Questao
  showActions?: boolean
}

export function CardQuestao({ questao, showActions = true }: CardQuestaoProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg line-clamp-2 leading-tight">
            {questao.titulo || `Questão ${questao.vestibular} ${questao.ano}`}
          </CardTitle>
          <Badge variant="secondary" className="ml-2 shrink-0">
            {questao.vestibular}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        <p className="text-sm text-gray-600 line-clamp-3 mb-4">
          {questao.enunciado}
        </p>
        
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <BookOpen className="h-3 w-3" />
            <span>{questao.assunto}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{questao.ano}</span>
          </div>
        </div>
      </CardContent>

      {showActions && (
        <CardFooter className="pt-0 gap-2">
          <Button asChild variant="outline" size="sm" className="flex-1">
            <Link to={`/questao/${questao.id}`}>
              <Eye className="h-4 w-4 mr-2" />
              Ver Detalhes
            </Link>
          </Button>
          <Button asChild variant="default" size="sm" className="flex-1">
            <Link to={`/questao/${questao.id}/similares`}>
              <Shuffle className="h-4 w-4 mr-2" />
              Ver Similares
            </Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
