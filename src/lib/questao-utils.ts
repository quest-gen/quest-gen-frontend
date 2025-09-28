import { Questao, DifficultyLevel, MathSource, QuestionType, VestibularToSourceMapping, DifficultyMapping } from '@/types/questao'

/**
 * Converte dificuldade do formato antigo (português) para o novo (inglês)
 */
export function convertDifficultyToNew(oldDifficulty: string): DifficultyLevel {
  const mapping: Record<string, DifficultyLevel> = {
    'Fácil': 'easy',
    'Médio': 'medium',
    'Difícil': 'hard'
  }
  return mapping[oldDifficulty] || 'medium'
}

/**
 * Converte dificuldade do formato novo (inglês) para o antigo (português)
 */
export function convertDifficultyToOld(newDifficulty: DifficultyLevel): string {
  const mapping: Record<DifficultyLevel, string> = {
    'easy': 'Fácil',
    'medium': 'Médio',
    'hard': 'Difícil'
  }
  return mapping[newDifficulty] || 'Médio'
}

/**
 * Converte vestibular para source
 */
export function convertVestibularToSource(vestibular: string): MathSource {
  return VestibularToSourceMapping[vestibular] || 'generico'
}

/**
 * Normaliza uma questão para garantir que tenha todos os campos necessários
 */
export function normalizeQuestao(questao: Partial<Questao>): Questao {
  return {
    id: questao.id || '',
    titulo: questao.titulo,
    enunciado: questao.enunciado || '',
    alternativas: questao.alternativas || [],
    gabarito: questao.gabarito || '',
    vestibular: questao.vestibular || '',
    ano: questao.ano || null,
    assunto: questao.assunto || '',
    dificuldade: questao.dificuldade || 'medium',
    questionType: questao.questionType || 'multiple_choice',
    source: questao.source || convertVestibularToSource(questao.vestibular || ''),
    explanation: questao.explanation,
    language: questao.language || 'português',
    createdAt: questao.createdAt || new Date().toISOString(),
    updatedAt: questao.updatedAt || new Date().toISOString()
  }
}

/**
 * Formata o tipo de questão para exibição
 */
export function formatQuestionType(type: QuestionType): string {
  const mapping: Record<QuestionType, string> = {
    'multiple_choice': 'Múltipla Escolha',
    'true_false': 'Verdadeiro/Falso',
    'open_ended': 'Dissertativa',
    'fill_blank': 'Preencher Lacunas',
    'matching': 'Associação'
  }
  return mapping[type] || 'Múltipla Escolha'
}

/**
 * Formata a fonte/origem para exibição
 */
export function formatSource(source: MathSource): string {
  const mapping: Record<MathSource, string> = {
    'enem': 'ENEM',
    'fuvest': 'FUVEST',
    'unicamp': 'UNICAMP',
    'ufrj': 'UFRJ',
    'ufmg': 'UFMG',
    'unesp': 'UNESP',
    'ufsc': 'UFSC',
    'ufrgs': 'UFRGS',
    'unifesp': 'UNIFESP',
    'ime': 'IME',
    'ita': 'ITA',
    'personalizado': 'Personalizado',
    'generico': 'Genérico'
  }
  return mapping[source] || 'Genérico'
}

/**
 * Calcula estatísticas de um conjunto de questões
 */
export function calculateQuestionStats(questoes: Questao[]) {
  const total = questoes.length
  
  const porDificuldade = questoes.reduce((acc, q) => {
    const dif = q.dificuldade || 'medium'
    acc[dif] = (acc[dif] || 0) + 1
    return acc
  }, {} as Record<DifficultyLevel, number>)
  
  const porVestibular = questoes.reduce((acc, q) => {
    acc[q.vestibular] = (acc[q.vestibular] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  
  const porAssunto = questoes.reduce((acc, q) => {
    acc[q.assunto] = (acc[q.assunto] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  
  const porSource = questoes.reduce((acc, q) => {
    const source = q.source || 'generico'
    acc[source] = (acc[source] || 0) + 1
    return acc
  }, {} as Record<MathSource, number>)
  
  return {
    total,
    porDificuldade,
    porVestibular,
    porAssunto,
    porSource
  }
}

/**
 * Filtra questões baseado em critérios
 */
export function filterQuestoes(
  questoes: Questao[],
  filtros: {
    vestibular?: string
    assunto?: string
    dificuldade?: DifficultyLevel
    source?: MathSource
    searchTerm?: string
  }
): Questao[] {
  return questoes.filter(questao => {
    // Filtro por vestibular
    if (filtros.vestibular && !questao.vestibular.toLowerCase().includes(filtros.vestibular.toLowerCase())) {
      return false
    }
    
    // Filtro por assunto
    if (filtros.assunto && !questao.assunto.toLowerCase().includes(filtros.assunto.toLowerCase())) {
      return false
    }
    
    // Filtro por dificuldade
    if (filtros.dificuldade && questao.dificuldade !== filtros.dificuldade) {
      return false
    }
    
    // Filtro por source
    if (filtros.source && questao.source !== filtros.source) {
      return false
    }
    
    // Filtro por termo de busca
    if (filtros.searchTerm) {
      const term = filtros.searchTerm.toLowerCase()
      const searchableText = [
        questao.titulo,
        questao.enunciado,
        questao.assunto,
        questao.vestibular,
        questao.explanation
      ].filter(Boolean).join(' ').toLowerCase()
      
      if (!searchableText.includes(term)) {
        return false
      }
    }
    
    return true
  })
}

/**
 * Ordena questões por diferentes critérios
 */
export function sortQuestoes(
  questoes: Questao[],
  sortBy: 'recent' | 'difficulty' | 'subject' | 'vestibular' = 'recent'
): Questao[] {
  const sorted = [...questoes]
  
  switch (sortBy) {
    case 'recent':
      return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    
    case 'difficulty':
      const difficultyOrder = { 'easy': 1, 'medium': 2, 'hard': 3 }
      return sorted.sort((a, b) => {
        const aLevel = difficultyOrder[a.dificuldade || 'medium']
        const bLevel = difficultyOrder[b.dificuldade || 'medium']
        return aLevel - bLevel
      })
    
    case 'subject':
      return sorted.sort((a, b) => a.assunto.localeCompare(b.assunto))
    
    case 'vestibular':
      return sorted.sort((a, b) => a.vestibular.localeCompare(b.vestibular))
    
    default:
      return sorted
  }
}
