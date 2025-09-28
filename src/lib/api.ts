import { Questao, CriarQuestaoRequest } from '@/types/questao'
import { questoesMock } from './mock-data'

// Simula delay de rede
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export async function gerarQuestao(dados: CriarQuestaoRequest): Promise<Questao> {
  await delay(2000) // Simula processamento
  
  // Mock de geração de questão
  const novaQuestao: Questao = {
    id: `questao-${Date.now()}`,
    titulo: `Questão de ${dados.assunto} - ${dados.vestibular}`,
    enunciado: `Esta é uma questão gerada automaticamente sobre ${dados.assunto.toLowerCase()} no estilo do vestibular ${dados.vestibular}. 

Considere a seguinte situação matemática e resolva o problema proposto utilizando os conceitos fundamentais de ${dados.assunto.toLowerCase()}.

Dados os parâmetros apresentados, determine o valor correto que satisfaz as condições estabelecidas.`,
    alternativas: Array.from({ length: dados.numeroAlternativas }, (_, i) => ({
      id: `alt-${i}`,
      letra: String.fromCharCode(65 + i), // A, B, C, D, E
      texto: `Alternativa ${String.fromCharCode(65 + i)} - Resposta ${i + 1} para a questão de ${dados.assunto.toLowerCase()}`
    })),
    gabarito: 'A', // Sempre A para o mock
    vestibular: dados.vestibular,
    ano: new Date().getFullYear(),
    assunto: dados.assunto,
    dificuldade: 'Médio',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  
  return novaQuestao
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
