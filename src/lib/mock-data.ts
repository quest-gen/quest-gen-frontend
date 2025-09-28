import { Questao } from '@/types/questao'

export const questoesMock: Questao[] = [
  {
    id: 'questao-1',
    titulo: 'Função Quadrática - Estilo FUVEST',
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
    ano: null,
    assunto: 'Funções',
    dificuldade: 'medium',
    questionType: 'multiple_choice',
    source: 'fuvest',
    explanation: 'Para encontrar o mínimo de uma função quadrática, usamos x = -b/2a. Os zeros são encontrados igualando f(x) = 0.',
    language: 'português',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 'questao-2',
    titulo: 'Trigonometria - Estilo ENEM',
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
    ano: null,
    assunto: 'Trigonometria',
    dificuldade: 'easy',
    questionType: 'multiple_choice',
    source: 'enem',
    explanation: 'Em um triângulo 30-60-90, as razões são conhecidas: cateto oposto a 30° = hipotenusa/2, cateto adjacente = hipotenusa×√3/2.',
    language: 'português',
    createdAt: '2024-01-14T15:30:00Z',
    updatedAt: '2024-01-14T15:30:00Z'
  },
  {
    id: 'questao-3',
    titulo: 'Probabilidade - Estilo UNICAMP',
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
    ano: null,
    assunto: 'Probabilidade',
    dificuldade: 'hard',
    questionType: 'multiple_choice',
    source: 'unicamp',
    explanation: 'Para calcular probabilidades com combinações, usamos C(n,k) e aplicamos as regras de probabilidade.',
    language: 'português',
    createdAt: '2024-01-13T09:15:00Z',
    updatedAt: '2024-01-13T09:15:00Z'
  },
  {
    id: 'questao-4',
    titulo: 'Geometria Analítica - Estilo UNESP',
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
    ano: null,
    assunto: 'Geometria',
    dificuldade: 'medium',
    questionType: 'multiple_choice',
    source: 'unesp',
    explanation: 'Para encontrar a equação da reta, usamos a fórmula do coeficiente angular. A área do triângulo pode ser calculada usando determinantes.',
    language: 'português',
    createdAt: '2024-01-12T14:20:00Z',
    updatedAt: '2024-01-12T14:20:00Z'
  },
  {
    id: 'questao-5',
    titulo: 'Logaritmos - Estilo OBJETIVO',
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
    ano: null,
    assunto: 'Logaritmos',
    dificuldade: 'medium',
    questionType: 'multiple_choice',
    source: 'personalizado',
    explanation: 'Usando as propriedades dos logaritmos, log₂(x + 1) + log₂(x - 1) = log₂[(x + 1)(x - 1)] = log₂(x² - 1) = 3, então x² - 1 = 8.',
    language: 'português',
    createdAt: '2024-01-11T11:45:00Z',
    updatedAt: '2024-01-11T11:45:00Z'
  },
  {
    id: 'questao-6',
    titulo: 'Progressão Aritmética - Estilo MACKENZIE',
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
    ano: null,
    assunto: 'Progressões',
    dificuldade: 'easy',
    questionType: 'multiple_choice',
    source: 'personalizado',
    explanation: 'Para PA: aₙ = a₁ + (n-1)r. Para soma: Sₙ = n(a₁ + aₙ)/2. Para encontrar posição: 59 = 3 + (n-1)4.',
    language: 'português',
    createdAt: '2024-01-10T16:30:00Z',
    updatedAt: '2024-01-10T16:30:00Z'
  },
  {
    id: 'questao-7',
    titulo: 'Análise Combinatória - Estilo ITA',
    enunciado: `De quantas maneiras podemos formar uma comissão de 5 pessoas escolhidas entre 8 homens e 6 mulheres, de modo que:

a) Haja exatamente 3 homens e 2 mulheres?
b) Haja pelo menos 2 mulheres?
c) O presidente da comissão seja necessariamente um homem?`,
    alternativas: [
      { id: 'alt-7a', letra: 'A', texto: 'a) 840, b) 1716, c) 1001' },
      { id: 'alt-7b', letra: 'B', texto: 'a) 840, b) 1716, c) 1287' },
      { id: 'alt-7c', letra: 'C', texto: 'a) 560, b) 1430, c) 1001' },
      { id: 'alt-7d', letra: 'D', texto: 'a) 840, b) 1430, c) 1287' },
      { id: 'alt-7e', letra: 'E', texto: 'a) 560, b) 1716, c) 1287' }
    ],
    gabarito: 'B',
    vestibular: 'ITA',
    ano: 2023,
    assunto: 'Análise Combinatória',
    dificuldade: 'hard',
    questionType: 'multiple_choice',
    source: 'ita',
    explanation: 'Para resolver: a) C(8,3) × C(6,2) = 56 × 15 = 840. b) Total - (só homens + 1 mulher) = C(14,5) - C(8,5) - C(8,4)×C(6,1). c) Escolher 1 homem para presidente × C(13,4).',
    language: 'português',
    createdAt: '2024-01-09T08:20:00Z',
    updatedAt: '2024-01-09T08:20:00Z'
  },
  {
    id: 'questao-8',
    titulo: 'Estatística - Estilo ENEM',
    enunciado: `Um professor aplicou uma prova para 30 alunos e obteve as seguintes notas:

5, 6, 7, 7, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10, 10, 6, 7, 8, 9, 5, 6, 7, 8, 9, 10, 4, 5, 6, 7

Calcule a média, mediana e moda dessas notas.`,
    alternativas: [
      { id: 'alt-8a', letra: 'A', texto: 'Média = 7,5; Mediana = 8; Moda = 10' },
      { id: 'alt-8b', letra: 'B', texto: 'Média = 7,6; Mediana = 8; Moda = 9' },
      { id: 'alt-8c', letra: 'C', texto: 'Média = 7,6; Mediana = 7,5; Moda = 10' },
      { id: 'alt-8d', letra: 'D', texto: 'Média = 7,5; Mediana = 7,5; Moda = 9' },
      { id: 'alt-8e', letra: 'E', texto: 'Média = 7,4; Mediana = 8; Moda = 10' }
    ],
    gabarito: 'C',
    vestibular: 'ENEM',
    ano: 2023,
    assunto: 'Estatística',
    dificuldade: 'easy',
    questionType: 'multiple_choice',
    source: 'enem',
    explanation: 'Média = soma/30 = 228/30 = 7,6. Mediana = (15º + 16º termo)/2 = (7+8)/2 = 7,5. Moda = valor mais frequente = 10 (aparece 5 vezes).',
    language: 'português',
    createdAt: '2024-01-08T13:45:00Z',
    updatedAt: '2024-01-08T13:45:00Z'
  },
  {
    id: 'questao-9',
    titulo: 'Matrizes e Determinantes - Estilo UFMG',
    enunciado: `Considere as matrizes:

A = [2  1]    B = [3  -1]
    [3  4]        [2   5]

Calcule:
a) A + B
b) A × B  
c) det(A) e det(B)
d) A⁻¹ (inversa de A)`,
    alternativas: [
      { id: 'alt-9a', letra: 'A', texto: 'a) [5 0; 5 9], b) [8 3; 17 17], c) det(A)=5, det(B)=17, d) A⁻¹=[4/5 -1/5; -3/5 2/5]' },
      { id: 'alt-9b', letra: 'B', texto: 'a) [5 0; 5 9], b) [8 3; 17 17], c) det(A)=5, det(B)=17, d) A⁻¹=[4/5 1/5; 3/5 2/5]' },
      { id: 'alt-9c', letra: 'C', texto: 'a) [5 0; 5 9], b) [8 3; 17 17], c) det(A)=8, det(B)=17, d) A⁻¹=[4/5 -1/5; -3/5 2/5]' },
      { id: 'alt-9d', letra: 'D', texto: 'a) [5 0; 5 9], b) [6 2; 15 20], c) det(A)=5, det(B)=17, d) A⁻¹=[4/5 -1/5; -3/5 2/5]' },
      { id: 'alt-9e', letra: 'E', texto: 'a) [5 0; 5 9], b) [8 3; 17 17], c) det(A)=5, det(B)=13, d) A⁻¹=[4/5 -1/5; -3/5 2/5]' }
    ],
    gabarito: 'A',
    vestibular: 'UFMG',
    ano: 2022,
    assunto: 'Matrizes e Determinantes',
    dificuldade: 'medium',
    questionType: 'multiple_choice',
    source: 'ufmg',
    explanation: 'Soma: elemento por elemento. Produto: linha × coluna. det(A) = 2×4 - 1×3 = 5. det(B) = 3×5 - (-1)×2 = 17. A⁻¹ = (1/det(A)) × adj(A).',
    language: 'português',
    createdAt: '2024-01-07T10:15:00Z',
    updatedAt: '2024-01-07T10:15:00Z'
  },
  {
    id: 'questao-10',
    titulo: 'Função Exponencial - Estilo UFRJ',
    enunciado: `A população de uma cidade cresce segundo a função P(t) = 50000 × 2^(t/10), onde t é o tempo em anos e P(t) é a população.

Determine:
a) A população inicial (t = 0)
b) A população após 20 anos
c) Em quantos anos a população dobrará?
d) A taxa de crescimento anual`,
    alternativas: [
      { id: 'alt-10a', letra: 'A', texto: 'a) 50.000, b) 200.000, c) 10 anos, d) ≈7,2% ao ano' },
      { id: 'alt-10b', letra: 'B', texto: 'a) 50.000, b) 150.000, c) 15 anos, d) ≈5,5% ao ano' },
      { id: 'alt-10c', letra: 'C', texto: 'a) 25.000, b) 200.000, c) 10 anos, d) ≈7,2% ao ano' },
      { id: 'alt-10d', letra: 'D', texto: 'a) 50.000, b) 200.000, c) 20 anos, d) ≈3,6% ao ano' },
      { id: 'alt-10e', letra: 'E', texto: 'a) 50.000, b) 100.000, c) 10 anos, d) ≈10% ao ano' }
    ],
    gabarito: 'A',
    vestibular: 'UFRJ',
    ano: 2023,
    assunto: 'Funções',
    dificuldade: 'medium',
    questionType: 'multiple_choice',
    source: 'ufrj',
    explanation: 'P(0) = 50000×2⁰ = 50000. P(20) = 50000×2² = 200000. Para dobrar: 2P₀ = P₀×2^(t/10), logo t = 10. Taxa = (2^(1/10) - 1) ≈ 0,072.',
    language: 'português',
    createdAt: '2024-01-06T16:30:00Z',
    updatedAt: '2024-01-06T16:30:00Z'
  },
  {
    id: 'questao-11',
    titulo: 'Geometria Espacial - Estilo FUVEST',
    enunciado: `Um cone circular reto tem altura h = 12 cm e raio da base r = 5 cm.

Calcule:
a) A geratriz do cone
b) A área lateral do cone
c) A área total do cone
d) O volume do cone`,
    alternativas: [
      { id: 'alt-11a', letra: 'A', texto: 'a) 13 cm, b) 65π cm², c) 90π cm², d) 100π cm³' },
      { id: 'alt-11b', letra: 'B', texto: 'a) 13 cm, b) 65π cm², c) 90π cm², d) 314 cm³' },
      { id: 'alt-11c', letra: 'C', texto: 'a) 17 cm, b) 85π cm², c) 110π cm², d) 100π cm³' },
      { id: 'alt-11d', letra: 'D', texto: 'a) 13 cm, b) 60π cm², c) 85π cm², d) 100π cm³' },
      { id: 'alt-11e', letra: 'E', texto: 'a) 13 cm, b) 65π cm², c) 90π cm², d) 300π cm³' }
    ],
    gabarito: 'A',
    vestibular: 'FUVEST',
    ano: 2022,
    assunto: 'Geometria',
    dificuldade: 'medium',
    questionType: 'multiple_choice',
    source: 'fuvest',
    explanation: 'Geratriz: g = √(h² + r²) = √(144 + 25) = 13. Área lateral: πrg = π×5×13 = 65π. Área total: πr² + πrg = 25π + 65π = 90π. Volume: (1/3)πr²h = (1/3)π×25×12 = 100π.',
    language: 'português',
    createdAt: '2024-01-05T09:20:00Z',
    updatedAt: '2024-01-05T09:20:00Z'
  },
  {
    id: 'questao-12',
    titulo: 'Progressão Geométrica - Estilo UNICAMP',
    enunciado: `Uma progressão geométrica tem primeiro termo a₁ = 2 e razão q = 3.

Determine:
a) O 8º termo da progressão
b) A soma dos 6 primeiros termos
c) A soma dos infinitos termos (se convergir)
d) O produto dos 4 primeiros termos`,
    alternativas: [
      { id: 'alt-12a', letra: 'A', texto: 'a) 4374, b) 728, c) Não converge, d) 1296' },
      { id: 'alt-12b', letra: 'B', texto: 'a) 4374, b) 728, c) Não converge, d) 324' },
      { id: 'alt-12c', letra: 'C', texto: 'a) 2187, b) 364, c) Não converge, d) 1296' },
      { id: 'alt-12d', letra: 'D', texto: 'a) 4374, b) 364, c) Não converge, d) 648' },
      { id: 'alt-12e', letra: 'E', texto: 'a) 6561, b) 728, c) Não converge, d) 1296' }
    ],
    gabarito: 'A',
    vestibular: 'UNICAMP',
    ano: 2023,
    assunto: 'Progressões',
    dificuldade: 'medium',
    questionType: 'multiple_choice',
    source: 'unicamp',
    explanation: 'a₈ = a₁×q⁷ = 2×3⁷ = 4374. S₆ = a₁(q⁶-1)/(q-1) = 2×728/2 = 728. Como |q| > 1, não converge. Produto = (a₁×a₂×a₃×a₄) = 2×6×18×54 = 1296.',
    language: 'português',
    createdAt: '2024-01-04T14:10:00Z',
    updatedAt: '2024-01-04T14:10:00Z'
  },
  {
    id: 'questao-13',
    titulo: 'Números Complexos - Estilo IME',
    enunciado: `Considere o número complexo z = 3 + 4i.

Calcule:
a) |z| (módulo de z)
b) z* (conjugado de z)
c) z² 
d) z⁻¹ (inverso de z)
e) A forma trigonométrica de z`,
    alternativas: [
      { id: 'alt-13a', letra: 'A', texto: 'a) 5, b) 3-4i, c) -7+24i, d) 3/25-4i/25, e) 5(cos53°+isen53°)' },
      { id: 'alt-13b', letra: 'B', texto: 'a) 5, b) 3-4i, c) -7+24i, d) 3/25+4i/25, e) 5(cos37°+isen37°)' },
      { id: 'alt-13c', letra: 'C', texto: 'a) 7, b) 3-4i, c) -7+24i, d) 3/25-4i/25, e) 5(cos53°+isen53°)' },
      { id: 'alt-13d', letra: 'D', texto: 'a) 5, b) -3+4i, c) -7+24i, d) 3/25-4i/25, e) 5(cos53°+isen53°)' },
      { id: 'alt-13e', letra: 'E', texto: 'a) 5, b) 3-4i, c) 9+16i, d) 3/25-4i/25, e) 5(cos53°+isen53°)' }
    ],
    gabarito: 'A',
    vestibular: 'IME',
    ano: 2022,
    assunto: 'Números Complexos',
    dificuldade: 'hard',
    questionType: 'multiple_choice',
    source: 'ime',
    explanation: '|z| = √(3² + 4²) = 5. z* = 3-4i. z² = (3+4i)² = 9+24i-16 = -7+24i. z⁻¹ = z*/|z|² = (3-4i)/25. θ = arctan(4/3) ≈ 53°.',
    language: 'português',
    createdAt: '2024-01-03T11:25:00Z',
    updatedAt: '2024-01-03T11:25:00Z'
  },
  {
    id: 'questao-14',
    titulo: 'Limites - Estilo UFRGS',
    enunciado: `Calcule os seguintes limites:

a) lim(x→2) (x² - 4)/(x - 2)
b) lim(x→∞) (3x² + 2x - 1)/(x² - x + 5)
c) lim(x→0) sen(x)/x
d) lim(x→1) (x³ - 1)/(x² - 1)`,
    alternativas: [
      { id: 'alt-14a', letra: 'A', texto: 'a) 4, b) 3, c) 1, d) 3/2' },
      { id: 'alt-14b', letra: 'B', texto: 'a) 4, b) 3, c) 0, d) 3/2' },
      { id: 'alt-14c', letra: 'C', texto: 'a) 0, b) 3, c) 1, d) 3/2' },
      { id: 'alt-14d', letra: 'D', texto: 'a) 4, b) ∞, c) 1, d) 3/2' },
      { id: 'alt-14e', letra: 'E', texto: 'a) 4, b) 3, c) 1, d) 1' }
    ],
    gabarito: 'A',
    vestibular: 'UFRGS',
    ano: 2023,
    assunto: 'Cálculo',
    dificuldade: 'hard',
    questionType: 'multiple_choice',
    source: 'ufrgs',
    explanation: 'a) Fatorando: (x+2)(x-2)/(x-2) = x+2 → 4. b) Dividindo por x²: 3. c) Limite fundamental: 1. d) Fatorando: (x²+x+1)(x-1)/(x+1)(x-1) = (x²+x+1)/(x+1) → 3/2.',
    language: 'português',
    createdAt: '2024-01-02T15:40:00Z',
    updatedAt: '2024-01-02T15:40:00Z'
  },
  {
    id: 'questao-15',
    titulo: 'Derivadas - Estilo UFSC',
    enunciado: `Calcule as derivadas das seguintes funções:

a) f(x) = 3x⁴ - 2x³ + 5x - 1
b) g(x) = sen(x) × cos(x)
c) h(x) = ln(x²)
d) k(x) = e^(2x)
e) m(x) = (x² + 1)/(x - 1)`,
    alternativas: [
      { id: 'alt-15a', letra: 'A', texto: 'a) 12x³-6x²+5, b) cos(2x), c) 2/x, d) 2e^(2x), e) (x²-2x-1)/(x-1)²' },
      { id: 'alt-15b', letra: 'B', texto: 'a) 12x³-6x²+5, b) cos²(x)-sen²(x), c) 2/x, d) 2e^(2x), e) (x²-2x-1)/(x-1)²' },
      { id: 'alt-15c', letra: 'C', texto: 'a) 12x³-6x²+5, b) cos(2x), c) 1/x, d) 2e^(2x), e) (x²-2x-1)/(x-1)²' },
      { id: 'alt-15d', letra: 'D', texto: 'a) 12x³-6x²+5, b) cos(2x), c) 2/x, d) e^(2x), e) (x²-2x-1)/(x-1)²' },
      { id: 'alt-15e', letra: 'E', texto: 'a) 12x³-6x²+5, b) cos(2x), c) 2/x, d) 2e^(2x), e) (2x)/(x-1)²' }
    ],
    gabarito: 'A',
    vestibular: 'UFSC',
    ano: 2022,
    assunto: 'Cálculo',
    dificuldade: 'hard',
    questionType: 'multiple_choice',
    source: 'ufsc',
    explanation: 'a) Regra da potência. b) Produto: sen\'cos + sencos\' = cos²x - sen²x = cos(2x). c) ln(x²) = 2ln(x), derivada = 2/x. d) Regra da cadeia. e) Regra do quociente.',
    language: 'português',
    createdAt: '2024-01-01T12:00:00Z',
    updatedAt: '2024-01-01T12:00:00Z'
  },
  {
    id: 'questao-16',
    titulo: 'Inequações - Estilo PUC-SP',
    enunciado: `Resolva as seguintes inequações:

a) 2x - 3 > 5x + 6
b) x² - 5x + 6 ≤ 0
c) |x - 2| < 3
d) (x + 1)/(x - 2) ≥ 0`,
    alternativas: [
      { id: 'alt-16a', letra: 'A', texto: 'a) x < -3, b) 2 ≤ x ≤ 3, c) -1 < x < 5, d) x ≤ -1 ou x > 2' },
      { id: 'alt-16b', letra: 'B', texto: 'a) x < -3, b) 2 ≤ x ≤ 3, c) -1 < x < 5, d) x < -1 ou x ≥ 2' },
      { id: 'alt-16c', letra: 'C', texto: 'a) x > -3, b) 2 ≤ x ≤ 3, c) -1 < x < 5, d) x ≤ -1 ou x > 2' },
      { id: 'alt-16d', letra: 'D', texto: 'a) x < -3, b) x ≤ 2 ou x ≥ 3, c) -1 < x < 5, d) x ≤ -1 ou x > 2' },
      { id: 'alt-16e', letra: 'E', texto: 'a) x < -3, b) 2 ≤ x ≤ 3, c) x < -1 ou x > 5, d) x ≤ -1 ou x > 2' }
    ],
    gabarito: 'A',
    vestibular: 'PUC-SP',
    ano: 2023,
    assunto: 'Inequações',
    dificuldade: 'medium',
    questionType: 'multiple_choice',
    source: 'personalizado',
    explanation: 'a) 2x-5x > 6+3 → -3x > 9 → x < -3. b) (x-2)(x-3) ≤ 0, raízes 2 e 3, parábola para cima. c) -3 < x-2 < 3. d) Zeros: x=-1, assíntota: x=2, análise de sinais.',
    language: 'português',
    createdAt: '2023-12-31T18:30:00Z',
    updatedAt: '2023-12-31T18:30:00Z'
  },
  {
    id: 'questao-17',
    titulo: 'Polinômios - Estilo FGV',
    enunciado: `Considere o polinômio P(x) = x³ - 6x² + 11x - 6.

Determine:
a) As raízes do polinômio
b) A forma fatorada
c) P(0), P(1), P(2)
d) O resto da divisão de P(x) por (x - 4)`,
    alternativas: [
      { id: 'alt-17a', letra: 'A', texto: 'a) 1, 2, 3, b) (x-1)(x-2)(x-3), c) P(0)=-6, P(1)=0, P(2)=0, d) 6' },
      { id: 'alt-17b', letra: 'B', texto: 'a) 1, 2, 3, b) (x-1)(x-2)(x-3), c) P(0)=-6, P(1)=0, P(2)=0, d) 10' },
      { id: 'alt-17c', letra: 'C', texto: 'a) -1, 2, 3, b) (x+1)(x-2)(x-3), c) P(0)=-6, P(1)=0, P(2)=0, d) 6' },
      { id: 'alt-17d', letra: 'D', texto: 'a) 1, 2, 3, b) (x-1)(x-2)(x-3), c) P(0)=6, P(1)=0, P(2)=0, d) 6' },
      { id: 'alt-17e', letra: 'E', texto: 'a) 1, 2, 3, b) (x-1)(x-2)(x-3), c) P(0)=-6, P(1)=1, P(2)=0, d) 6' }
    ],
    gabarito: 'A',
    vestibular: 'FGV',
    ano: 2023,
    assunto: 'Polinômios',
    dificuldade: 'medium',
    questionType: 'multiple_choice',
    source: 'personalizado',
    explanation: 'Testando valores: P(1) = 1-6+11-6 = 0, P(2) = 8-24+22-6 = 0, P(3) = 27-54+33-6 = 0. Logo as raízes são 1, 2, 3. P(0) = -6. Pelo teorema do resto: P(4) = 64-96+44-6 = 6.',
    language: 'português',
    createdAt: '2023-12-30T14:15:00Z',
    updatedAt: '2023-12-30T14:15:00Z'
  },
  {
    id: 'questao-18',
    titulo: 'Sistemas Lineares - Estilo UNIFESP',
    enunciado: `Resolva o sistema de equações lineares:

2x + 3y - z = 7
x - y + 2z = 1  
3x + 2y + z = 8

Determine os valores de x, y e z.`,
    alternativas: [
      { id: 'alt-18a', letra: 'A', texto: 'x = 2, y = 1, z = 0' },
      { id: 'alt-18b', letra: 'B', texto: 'x = 1, y = 2, z = 1' },
      { id: 'alt-18c', letra: 'C', texto: 'x = 3, y = 0, z = -1' },
      { id: 'alt-18d', letra: 'D', texto: 'x = 1, y = 1, z = 2' },
      { id: 'alt-18e', letra: 'E', texto: 'Sistema impossível' }
    ],
    gabarito: 'B',
    vestibular: 'UNIFESP',
    ano: 2022,
    assunto: 'Sistemas Lineares',
    dificuldade: 'medium',
    questionType: 'multiple_choice',
    source: 'unifesp',
    explanation: 'Usando eliminação gaussiana ou substituição. Verificação: 2(1)+3(2)-1 = 7 ✓, 1-2+2(1) = 1 ✓, 3(1)+2(2)+1 = 8 ✓.',
    language: 'português',
    createdAt: '2023-12-29T10:45:00Z',
    updatedAt: '2023-12-29T10:45:00Z'
  },
  {
    id: 'questao-19',
    titulo: 'Circunferência - Estilo UNESP',
    enunciado: `Uma circunferência tem centro C(3, -2) e passa pelo ponto P(7, 1).

Determine:
a) O raio da circunferência
b) A equação geral da circunferência
c) A equação da reta tangente no ponto P
d) Os pontos de interseção com os eixos coordenados`,
    alternativas: [
      { id: 'alt-19a', letra: 'A', texto: 'a) r=5, b) x²+y²-6x+4y-12=0, c) 4x+3y-31=0, d) (8,0), (-2,0), (0,2), (0,-6)' },
      { id: 'alt-19b', letra: 'B', texto: 'a) r=5, b) x²+y²-6x+4y-12=0, c) 4x+3y-31=0, d) (6,0), (0,0), (0,2), (0,-6)' },
      { id: 'alt-19c', letra: 'C', texto: 'a) r=3, b) x²+y²-6x+4y-12=0, c) 4x+3y-31=0, d) (8,0), (-2,0), (0,2), (0,-6)' },
      { id: 'alt-19d', letra: 'D', texto: 'a) r=5, b) x²+y²-6x+4y+12=0, c) 4x+3y-31=0, d) (8,0), (-2,0), (0,2), (0,-6)' },
      { id: 'alt-19e', letra: 'E', texto: 'a) r=5, b) x²+y²-6x+4y-12=0, c) 3x+4y-25=0, d) (8,0), (-2,0), (0,2), (0,-6)' }
    ],
    gabarito: 'A',
    vestibular: 'UNESP',
    ano: 2023,
    assunto: 'Geometria',
    dificuldade: 'medium',
    questionType: 'multiple_choice',
    source: 'unesp',
    explanation: 'r = √[(7-3)² + (1-(-2))²] = √[16+9] = 5. Equação: (x-3)² + (y+2)² = 25. Tangente: perpendicular ao raio CP, coeficiente angular = -4/3, equação: 4x+3y-31=0.',
    language: 'português',
    createdAt: '2023-12-28T16:20:00Z',
    updatedAt: '2023-12-28T16:20:00Z'
  },
  {
    id: 'questao-20',
    titulo: 'Binômio de Newton - Estilo MACKENZIE',
    enunciado: `Desenvolva (2x + 3)⁵ usando o binômio de Newton.

Determine:
a) O termo geral
b) O coeficiente do termo em x³
c) O termo independente de x
d) A soma de todos os coeficientes`,
    alternativas: [
      { id: 'alt-20a', letra: 'A', texto: 'a) C(5,k)×(2x)^(5-k)×3^k, b) 720, c) 243, d) 3125' },
      { id: 'alt-20b', letra: 'B', texto: 'a) C(5,k)×(2x)^(5-k)×3^k, b) 720, c) 243, d) 1024' },
      { id: 'alt-20c', letra: 'C', texto: 'a) C(5,k)×(2x)^k×3^(5-k), b) 720, c) 243, d) 3125' },
      { id: 'alt-20d', letra: 'D', texto: 'a) C(5,k)×(2x)^(5-k)×3^k, b) 360, c) 243, d) 3125' },
      { id: 'alt-20e', letra: 'E', texto: 'a) C(5,k)×(2x)^(5-k)×3^k, b) 720, c) 81, d) 3125' }
    ],
    gabarito: 'A',
    vestibular: 'MACKENZIE',
    ano: 2022,
    assunto: 'Binômio de Newton',
    dificuldade: 'medium',
    questionType: 'multiple_choice',
    source: 'personalizado',
    explanation: 'Termo geral: C(5,k)×(2x)^(5-k)×3^k. Para x³: k=2, coef = C(5,2)×2³×3² = 10×8×9 = 720. Termo independente: k=5, 3⁵ = 243. Soma dos coef: (2+3)⁵ = 3125.',
    language: 'português',
    createdAt: '2023-12-27T13:10:00Z',
    updatedAt: '2023-12-27T13:10:00Z'
  }
]
