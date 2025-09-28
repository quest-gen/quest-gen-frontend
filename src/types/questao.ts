export interface Questao {
  id: string
  titulo?: string
  enunciado: string
  alternativas: Alternativa[]
  gabarito: string
  vestibular: string
  ano: number
  assunto: string
  dificuldade?: 'Fácil' | 'Médio' | 'Difícil'
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

export interface QuestaoSimilar {
  id: string
  enunciado: string
  vestibular: string
  ano: number
  assunto: string
  similaridade: number
}
