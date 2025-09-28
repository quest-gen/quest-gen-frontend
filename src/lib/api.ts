import { Questao, CriarQuestaoRequest, QuestRequest, QuestResponse, HealthResponse, VestibularToSourceMapping } from '@/types/questao'
import { questoesMock } from './mock-data'

// Configuração da API
const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'https://backend-production-f117.up.railway.app'

// Cliente HTTP com configuração base
class ApiClient {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    console.log(`Making API request to: ${url}`)
    console.log('Request config:', config)

    try {
      const response = await fetch(url, config)
      
      console.log(`Response status: ${response.status}`)
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error(`API Error Response:`, errorData)
        throw new Error(errorData.detail || `HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      console.log('Response data:', data)
      return data
    } catch (error) {
      console.error(`API request failed: ${url}`, error)
      if (error instanceof Error) {
        throw error
      }
      throw new Error('Erro de conexão com a API')
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' })
  }

  async getWithBody<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'GET',
      body: JSON.stringify(data),
    })
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }
}

const apiClient = new ApiClient(API_BASE_URL)

// Simula delay de rede para funções mock que ainda não foram migradas
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export async function gerarQuestao(dados: CriarQuestaoRequest): Promise<Questao> {
  try {
    // Gerar conteúdo base para a questão
    const conteudoBase = `Gere uma questão de ${dados.assunto} no estilo do vestibular ${dados.vestibular}. 
    A questão deve abordar conceitos fundamentais de ${dados.assunto.toLowerCase()} e seguir o padrão de dificuldade e formato típico do ${dados.vestibular}.
    Inclua contexto prático e aplicação dos conceitos matemáticos.`

    // Usar a nova API para gerar questões
    const response = await gerarQuestoesAvancadas({
      content: conteudoBase,
      numQuestions: 1,
      difficulty: 'medium',
      questionType: 'multiple_choice',
      language: 'português',
      source: VestibularToSourceMapping[dados.vestibular] || 'generico',
      subject: 'matematica'
    })

    if (response.success && response.questions.length > 0) {
      const questItem = response.questions[0]
      
      // Converter QuestItem para Questao
      const novaQuestao: Questao = {
        id: `questao-${Date.now()}`,
        titulo: `Questão de ${dados.assunto} - Estilo ${dados.vestibular}`,
        enunciado: questItem.question,
        alternativas: questItem.options.slice(0, dados.numeroAlternativas).map((opcao, i) => ({
          id: `alt-${Date.now()}-${i}`,
          letra: String.fromCharCode(65 + i), // A, B, C, D, E
          texto: opcao
        })),
        gabarito: questItem.correct_answer,
        vestibular: dados.vestibular,
        ano: null,
        assunto: dados.assunto,
        dificuldade: questItem.difficulty as any,
        questionType: questItem.type as any,
        source: questItem.source,
        explanation: questItem.explanation,
        language: 'português',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      
      return novaQuestao
    } else {
      throw new Error(response.message || 'Falha ao gerar questão')
    }
  } catch (error) {
    console.error('Erro ao gerar questão:', error)
    
    // Fallback para mock em caso de erro
    const novaQuestao: Questao = {
      id: `questao-${Date.now()}`,
      titulo: `Questão de ${dados.assunto} - Estilo ${dados.vestibular}`,
      enunciado: `Esta é uma questão gerada automaticamente sobre ${dados.assunto.toLowerCase()} no estilo do vestibular ${dados.vestibular}. 

Considere a seguinte situação matemática e resolva o problema proposto utilizando os conceitos fundamentais de ${dados.assunto.toLowerCase()}.

Dados os parâmetros apresentados, determine o valor correto que satisfaz as condições estabelecidas.`,
      alternativas: Array.from({ length: dados.numeroAlternativas }, (_, i) => ({
        id: `alt-${Date.now()}-${i}`,
        letra: String.fromCharCode(65 + i), // A, B, C, D, E
        texto: `Alternativa ${String.fromCharCode(65 + i)} - Resposta ${i + 1} para a questão de ${dados.assunto.toLowerCase()}`
      })),
      gabarito: 'A', // Sempre A para o fallback
      vestibular: dados.vestibular,
      ano: null,
      assunto: dados.assunto,
      dificuldade: 'medium',
      questionType: 'multiple_choice',
      source: VestibularToSourceMapping[dados.vestibular] || 'generico',
      explanation: `Esta questão aborda conceitos fundamentais de ${dados.assunto.toLowerCase()} aplicados no contexto de vestibulares brasileiros.`,
      language: 'português',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    return novaQuestao
  }
}

export async function buscarQuestaoPorId(id: string): Promise<Questao | null> {
  await delay(500)
  
  const questao = questoesMock.find(q => q.id === id)
  return questao || null
}

export async function buscarQuestoesSimilares(id: string): Promise<Questao[]> {
  await delay(1000)
  
  const questaoOriginal = questoesMock.find(q => q.id === id)
  if (!questaoOriginal) return []
  
  // Retorna questões do mesmo assunto, exceto a original
  return questoesMock
    .filter(q => q.id !== id && q.assunto === questaoOriginal.assunto)
    .slice(0, 6)
}

export async function buscarQuestoesRecentes(): Promise<Questao[]> {
  await delay(300)
  
  return questoesMock.slice(0, 10)
}

// Funções da API Real

export async function gerarQuestoesAvancadas(request: QuestRequest): Promise<QuestResponse> {
  try {
    // Mapear os dados para o formato esperado pela API
    const apiRequest = {
      content: request.content,
      num_questions: request.numQuestions || 5,
      difficulty: request.difficulty || 'medium',
      question_type: request.questionType || 'multiple_choice',
      language: request.language || 'português',
      source: request.source || 'generico',
      subject: request.subject || 'matematica'
    }

    console.log('Enviando requisição para /api/generate:', apiRequest)
    const response = await apiClient.post<QuestResponse>('/api/generate', apiRequest)
    console.log('Resposta recebida:', response)
    return response
  } catch (error) {
    console.error('Erro ao gerar questões:', error)
    
    // Melhor tratamento de erro para debug
    if (error instanceof Error) {
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
    }
    
    return {
      questions: [],
      total_generated: 0,
      success: false,
      message: error instanceof Error ? error.message : 'Erro ao gerar questões. Tente novamente.'
    }
  }
}

export async function verificarSaudeAPI(): Promise<HealthResponse> {
  try {
    const response = await apiClient.get<any>('/api/health')
    return {
      status: response.status,
      service: response.service,
      timestamp: new Date().toISOString()
    }
  } catch (error) {
    console.error('Erro ao verificar saúde da API:', error)
    return {
      status: 'unhealthy',
      service: 'QuestGen API',
      timestamp: new Date().toISOString()
    }
  }
}

// Novas funções para buscar metadados da API
export async function buscarTiposQuestao(): Promise<string[]> {
  try {
    const response = await apiClient.get<{ types: string[] }>('/api/types')
    return response.types
  } catch (error) {
    console.error('Erro ao buscar tipos de questão:', error)
    // Fallback para tipos padrão
    return ['multiple_choice', 'true_false', 'open_ended', 'fill_blank', 'matching']
  }
}

export async function buscarDificuldades(): Promise<string[]> {
  try {
    const response = await apiClient.get<{ difficulties: string[] }>('/api/difficulties')
    return response.difficulties
  } catch (error) {
    console.error('Erro ao buscar dificuldades:', error)
    // Fallback para dificuldades padrão
    return ['easy', 'medium', 'hard']
  }
}

export async function buscarFontes(): Promise<Array<{value: string, label: string, description: string}>> {
  try {
    const response = await apiClient.get<{ sources: Array<{value: string, label: string, description: string}> }>('/api/sources')
    return response.sources
  } catch (error) {
    console.error('Erro ao buscar fontes:', error)
    // Fallback para fontes padrão
    return [
      { value: 'enem', label: 'ENEM', description: 'Questões no estilo do Exame Nacional do Ensino Médio' },
      { value: 'fuvest', label: 'FUVEST', description: 'Questões da Fundação Universitária para o Vestibular (USP)' },
      { value: 'unicamp', label: 'UNICAMP', description: 'Questões da Universidade Estadual de Campinas' },
      { value: 'generico', label: 'Genérico', description: 'Questões de matemática genéricas' }
    ]
  }
}

export async function buscarQuestoesPorFiltros(filtros: {
  vestibular?: string
  assunto?: string
  dificuldade?: string
  source?: string
  limit?: number
}): Promise<Questao[]> {
  await delay(500)
  
  let questoesFiltradas = questoesMock
  
  if (filtros.vestibular) {
    questoesFiltradas = questoesFiltradas.filter(q => 
      q.vestibular.toLowerCase().includes(filtros.vestibular!.toLowerCase())
    )
  }
  
  if (filtros.assunto) {
    questoesFiltradas = questoesFiltradas.filter(q => 
      q.assunto.toLowerCase().includes(filtros.assunto!.toLowerCase())
    )
  }
  
  if (filtros.dificuldade) {
    questoesFiltradas = questoesFiltradas.filter(q => 
      q.dificuldade === filtros.dificuldade
    )
  }
  
  if (filtros.source) {
    questoesFiltradas = questoesFiltradas.filter(q => 
      q.source === filtros.source
    )
  }
  
  const limit = filtros.limit || 20
  return questoesFiltradas.slice(0, limit)
}

export async function buscarEstatisticasQuestoes(): Promise<{
  totalQuestoes: number
  questoesPorVestibular: Record<string, number>
  questoesPorAssunto: Record<string, number>
  questoesPorDificuldade: Record<string, number>
}> {
  await delay(300)
  
  const totalQuestoes = questoesMock.length
  
  const questoesPorVestibular = questoesMock.reduce((acc, q) => {
    acc[q.vestibular] = (acc[q.vestibular] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  
  const questoesPorAssunto = questoesMock.reduce((acc, q) => {
    acc[q.assunto] = (acc[q.assunto] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  
  const questoesPorDificuldade = questoesMock.reduce((acc, q) => {
    const dificuldade = q.dificuldade || 'medium'
    acc[dificuldade] = (acc[dificuldade] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  
  return {
    totalQuestoes,
    questoesPorVestibular,
    questoesPorAssunto,
    questoesPorDificuldade
  }
}

// Fetch ENEM questions directly from ENEM API
export async function buscarQuestoesEnem(request: {
  year: number
  limit?: number
  offset?: number
}): Promise<{
  questions: Array<{
    id: string
    year: number
    index: number
    title: string
    context: string
    alternativesCount: number
    correctAlternative: string
    fullContext: string
    alternativesIntroduction: string
    alternatives: any[]
  }>
  total: number
  year: number
  offset: number
  limit: number
}> {
  try {
    const params = new URLSearchParams({
      year: request.year.toString(),
      limit: (request.limit || 15).toString(),
      offset: (request.offset || 136).toString(),
      discipline: 'matematica'
    })

    // Call ENEM API directly
    const response = await fetch(`https://api.enem.dev/v1/exams/${request.year}/questions?${params.toString()}`)
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()
    
    // Transform ENEM API response to match our frontend format
    const transformedQuestions = data.questions.map((question: any) => ({
      id: `enem-${question.year}-${question.index}`,
      year: question.year,
      index: question.index,
      title: question.title,
      context: question.context ? (question.context.length > 200 ? question.context.substring(0, 200) + "..." : question.context) : "",
      alternativesCount: question.alternatives ? question.alternatives.length : 0,
      correctAlternative: question.correctAlternative,
      fullContext: question.context || "",
      alternativesIntroduction: question.alternativesIntroduction || "",
      alternatives: question.alternatives || []
    }))

    return {
      questions: transformedQuestions,
      total: data.metadata.total,
      year: request.year,
      offset: request.offset || 136,
      limit: request.limit || 15
    }
  } catch (error) {
    console.error('Erro ao buscar questões ENEM:', error)
    throw error
  }
}

// Modify existing ENEM questions
export async function modificarQuestaoEnem(request: {
  year: number
  index: number
  includeOriginal?: boolean
  scaleFactor?: number
  placeholders?: Record<string, string>
}): Promise<{
  title?: string
  contextTemplate: string
  alternativesIntroductionTemplate: string
  alternatives: any[]
  correctAlternative?: string
  placeholders: Record<string, string>
  rendered: {
    context: string
    alternativesIntroduction: string
  }
  originalQuestion?: any
}> {
  try {
    // Create JSON body for GET request
    const requestBody: any = {
      year: request.year,
      index: request.index,
      include_original: request.includeOriginal || false,
    }

    if (request.scaleFactor) {
      requestBody.scale_factor = request.scaleFactor
    }

    if (request.placeholders) {
      requestBody.placeholders = request.placeholders
    }

    console.log('Sending POST request with JSON body:', requestBody)
    
    const response = await apiClient.post('/api/modify', requestBody)
    
    console.log('Modify response:', response)
    return response
  } catch (error) {
    console.error('Erro ao modificar questão ENEM:', error)
    throw error
  }
}
