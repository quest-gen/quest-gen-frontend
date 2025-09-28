// Enums baseados nos modelos Pydantic
export type DifficultyLevel = 'easy' | 'medium' | 'hard'
export type QuestionType = 'multiple_choice' | 'true_false' | 'open_ended' | 'fill_blank' | 'matching'
export type MathSource = 'enem' | 'fuvest' | 'unicamp' | 'ufrj' | 'ufmg' | 'unesp' | 'ufsc' | 'ufrgs' | 'unifesp' | 'ime' | 'ita' | 'personalizado' | 'generico'

// Mapeamento para compatibilidade com dados existentes
export const DifficultyMapping = {
  'Fácil': 'easy' as DifficultyLevel,
  'Médio': 'medium' as DifficultyLevel,
  'Difícil': 'hard' as DifficultyLevel,
  'easy': 'Fácil',
  'medium': 'Médio',
  'hard': 'Difícil'
}

export const VestibularToSourceMapping: Record<string, MathSource> = {
  'ENEM': 'enem',
  'FUVEST': 'fuvest',
  'UNICAMP': 'unicamp',
  'UFRJ': 'ufrj',
  'UFMG': 'ufmg',
  'UNESP': 'unesp',
  'UFSC': 'ufsc',
  'UFRGS': 'ufrgs',
  'UNIFESP': 'unifesp',
  'IME': 'ime',
  'ITA': 'ita',
  'OBJETIVO': 'personalizado',
  'MACKENZIE': 'personalizado'
}

export interface Questao {
  id: string
  titulo?: string
  enunciado: string
  alternativas: Alternativa[]
  gabarito: string
  vestibular: string
  ano: number | null
  assunto: string
  dificuldade?: DifficultyLevel
  questionType?: QuestionType
  source?: MathSource
  explanation?: string
  language?: string
  createdAt: string
  updatedAt: string
}

export interface Alternativa {
  id: string
  letra: string
  texto: string
}

export interface CriarQuestaoRequest {
  vestibular: string
  assunto: string
  numeroAlternativas: number
}

// Novas interfaces baseadas nos modelos Pydantic
export interface QuestRequest {
  content: string
  numQuestions?: number
  difficulty?: DifficultyLevel
  questionType?: QuestionType
  language?: string
  source?: MathSource
  subject?: string
}

export interface QuestItem {
  question: string
  options: string[]
  correct_answer: string  // Backend uses snake_case
  explanation: string
  difficulty: string
  type: string
  source?: MathSource
  subject?: string
}

export interface QuestResponse {
  questions: QuestItem[]
  total_generated: number  // Backend uses snake_case
  success: boolean
  message?: string
}

export interface HealthResponse {
  status: string
  service: string
  timestamp?: string
}

export interface ErrorResponse {
  error: string
  detail?: string
  statusCode: number
}

export interface QuestaoSimilar {
  id: string
  enunciado: string
  vestibular: string
  ano: number
  assunto: string
  similaridade: number
}
