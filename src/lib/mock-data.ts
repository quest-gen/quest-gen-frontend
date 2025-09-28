import { Questao } from '@/types/questao'

export const questoesMock: Questao[] = [
  {
    id: 'questao-1',
    titulo: 'Função Quadrática - FUVEST 2023',
    enunciado: `Considere a função f(x) = x² - 4x + 3.

Determine o valor de x para o qual f(x) atinge seu valor mínimo e calcule esse valor mínimo.

Além disso, encontre os zeros da função e esboce o gráfico correspondente.`,
    alternativas: [
      { id: 'alt-1a', letra: 'A', texto: 'x = 2, valor mínimo = -1, zeros: x = 1 e x = 3' },
      { id: 'alt-1b', letra: 'B', texto: 'x = -2, valor mínimo = 15, zeros: x = -1 e x = -3' },
      { id: 'alt-1c', letra: 'C', texto: 'x = 4, valor mínimo = 3, zeros: x = 0 e x = 4' },
      { id: 'alt-1d', letra: 'D', texto: 'x = 1, valor mínimo = 0, zeros: x = 2 e x = 4' },
      { id: 'alt-1e', letra: 'E', texto: 'x = 3, valor mínimo = 6, zeros: x = 2 e x = 5' }
    ],
    gabarito: 'A',
    vestibular: 'FUVEST',
    ano: 2023,
    assunto: 'Funções',
    dificuldade: 'Médio',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 'questao-2',
    titulo: 'Trigonometria - ENEM 2023',
    enunciado: `Em um triângulo retângulo, um dos ângulos agudos mede 30°. Se a hipotenusa mede 10 cm, calcule:

a) O comprimento do cateto oposto ao ângulo de 30°
b) O comprimento do cateto adjacente ao ângulo de 30°
c) A área do triângulo`,
    alternativas: [
      { id: 'alt-2a', letra: 'A', texto: 'Cateto oposto = 5 cm, cateto adjacente = 5√3 cm, área = 12,5√3 cm²' },
      { id: 'alt-2b', letra: 'B', texto: 'Cateto oposto = 10 cm, cateto adjacente = 10√3 cm, área = 50√3 cm²' },
      { id: 'alt-2c', letra: 'C', texto: 'Cateto oposto = 5√3 cm, cateto adjacente = 5 cm, área = 12,5√3 cm²' },
      { id: 'alt-2d', letra: 'D', texto: 'Cateto oposto = 3 cm, cateto adjacente = 4 cm, área = 6 cm²' },
      { id: 'alt-2e', letra: 'E', texto: 'Cateto oposto = 6 cm, cateto adjacente = 8 cm, área = 24 cm²' }
    ],
    gabarito: 'A',
    vestibular: 'ENEM',
    ano: 2023,
    assunto: 'Trigonometria',
    dificuldade: 'Fácil',
    createdAt: '2024-01-14T15:30:00Z',
    updatedAt: '2024-01-14T15:30:00Z'
  },
  {
    id: 'questao-3',
    titulo: 'Probabilidade - UNICAMP 2023',
    enunciado: `Uma urna contém 5 bolas vermelhas, 3 bolas azuis e 2 bolas verdes. Retiramos 3 bolas simultaneamente da urna.

Qual é a probabilidade de que:
a) As 3 bolas sejam da mesma cor?
b) Pelo menos uma bola seja vermelha?`,
    alternativas: [
      { id: 'alt-3a', letra: 'A', texto: 'a) 1/12, b) 5/6' },
      { id: 'alt-3b', letra: 'B', texto: 'a) 1/10, b) 11/12' },
      { id: 'alt-3c', letra: 'C', texto: 'a) 3/40, b) 11/12' },
      { id: 'alt-3d', letra: 'D', texto: 'a) 1/8, b) 3/4' },
      { id: 'alt-3e', letra: 'E', texto: 'a) 1/6, b) 2/3' }
    ],
    gabarito: 'B',
    vestibular: 'UNICAMP',
    ano: 2023,
    assunto: 'Probabilidade',
    dificuldade: 'Difícil',
    createdAt: '2024-01-13T09:15:00Z',
    updatedAt: '2024-01-13T09:15:00Z'
  },
  {
    id: 'questao-4',
    titulo: 'Geometria Analítica - UNESP 2023',
    enunciado: `Considere os pontos A(1, 2), B(4, 6) e C(7, 2) no plano cartesiano.

Determine:
a) A equação da reta que passa pelos pontos A e B
b) A área do triângulo ABC
c) As coordenadas do circuncentro do triângulo ABC`,
    alternativas: [
      { id: 'alt-4a', letra: 'A', texto: 'a) y = (4/3)x + 2/3, b) 12, c) (4, 4)' },
      { id: 'alt-4b', letra: 'B', texto: 'a) y = (3/4)x + 5/4, b) 9, c) (3, 5)' },
      { id: 'alt-4c', letra: 'C', texto: 'a) y = (4/3)x - 2/3, b) 12, c) (4, 4)' },
      { id: 'alt-4d', letra: 'D', texto: 'a) y = 2x, b) 8, c) (2, 3)' },
      { id: 'alt-4e', letra: 'E', texto: 'a) y = x + 1, b) 6, c) (4, 3)' }
    ],
    gabarito: 'C',
    vestibular: 'UNESP',
    ano: 2023,
    assunto: 'Geometria',
    dificuldade: 'Médio',
    createdAt: '2024-01-12T14:20:00Z',
    updatedAt: '2024-01-12T14:20:00Z'
  },
  {
    id: 'questao-5',
    titulo: 'Logaritmos - OBJETIVO 2023',
    enunciado: `Resolva a equação logarítmica:

log₂(x + 1) + log₂(x - 1) = 3

Determine o valor de x que satisfaz a equação e verifique se a solução é válida no domínio da função.`,
    alternativas: [
      { id: 'alt-5a', letra: 'A', texto: 'x = 3' },
      { id: 'alt-5b', letra: 'B', texto: 'x = 4' },
      { id: 'alt-5c', letra: 'C', texto: 'x = 5' },
      { id: 'alt-5d', letra: 'D', texto: 'x = 2' },
      { id: 'alt-5e', letra: 'E', texto: 'Não há solução real' }
    ],
    gabarito: 'A',
    vestibular: 'OBJETIVO',
    ano: 2023,
    assunto: 'Logaritmos',
    dificuldade: 'Médio',
    createdAt: '2024-01-11T11:45:00Z',
    updatedAt: '2024-01-11T11:45:00Z'
  },
  {
    id: 'questao-6',
    titulo: 'Progressão Aritmética - MACKENZIE 2023',
    enunciado: `Uma progressão aritmética tem primeiro termo a₁ = 3 e razão r = 4.

Calcule:
a) O 15º termo da progressão
b) A soma dos 20 primeiros termos
c) Em que posição se encontra o termo igual a 59`,
    alternativas: [
      { id: 'alt-6a', letra: 'A', texto: 'a) 59, b) 820, c) 15ª posição' },
      { id: 'alt-6b', letra: 'B', texto: 'a) 63, b) 900, c) 16ª posição' },
      { id: 'alt-6c', letra: 'C', texto: 'a) 55, b) 780, c) 14ª posição' },
      { id: 'alt-6d', letra: 'D', texto: 'a) 67, b) 950, c) 17ª posição' },
      { id: 'alt-6e', letra: 'E', texto: 'a) 51, b) 720, c) 13ª posição' }
    ],
    gabarito: 'A',
    vestibular: 'MACKENZIE',
    ano: 2023,
    assunto: 'Progressões',
    dificuldade: 'Fácil',
    createdAt: '2024-01-10T16:30:00Z',
    updatedAt: '2024-01-10T16:30:00Z'
  }
]
