# QuestGen Frontend

**Geração Inteligente de Questões de Matemática para Vestibulares**

## 🎯 Sobre o Projeto

O QuestGen é uma aplicação web que permite gerar novas questões de matemática para vestibulares a partir de questões existentes e consultar questões similares. O frontend foi construído com foco em **visualização e interação do usuário**, com chamadas de API para o backend.

## 🚀 Tecnologias

- **React 18** + **Vite** - Framework e build tool
- **TypeScript** - Tipagem estática
- **TailwindCSS** - Estilização utilitária
- **shadcn/ui** - Biblioteca de componentes UI
- **React Router DOM** - Roteamento
- **Axios** - Cliente HTTP
- **Lucide React** - Ícones

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Componentes base do shadcn/ui
│   ├── layout/         # Componentes de layout (Navbar)
│   └── questoes/       # Componentes específicos de questões
├── pages/              # Páginas da aplicação
├── types/              # Definições de tipos TypeScript
├── lib/                # Utilitários e configurações
└── App.tsx             # Componente principal
```

## 🎨 Páginas Principais

### 1. **Home / Dashboard** (`/`)
- Apresentação do QuestGen
- Botão CTA "Criar Nova Questão"
- Lista das questões recentes
- Cards com features principais

### 2. **Criar Questão** (`/criar`)
- Formulário de geração:
  - Seleção de vestibular (FUVEST, ENEM, UNICAMP, etc.)
  - Seleção de assunto (Álgebra, Geometria, etc.)
  - Número de alternativas (3-5)
- Exibição da questão gerada
- Botões para ver similares

### 3. **Questões Similares** (`/questao/:id/similares`)
- Lista de questões relacionadas
- Cards com informações resumidas
- Filtros por vestibular e assunto

### 4. **Detalhes da Questão** (`/questao/:id`)
- Visualização completa da questão
- Enunciado e alternativas
- Gabarito destacado
- Ações: ver similares, gerar nova

## 🔧 Instalação e Execução

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

## 🎯 Componentes Principais

### `CardQuestao`
Componente reutilizável para exibir questões em formato de card:
- Título e informações básicas
- Enunciado resumido
- Badges de vestibular e assunto
- Botões de ação

### `FormCriacaoQuestao`
Formulário para geração de questões:
- Selects para vestibular e assunto
- Validação de campos obrigatórios
- Estado de loading durante geração

### `Navbar`
Navegação principal:
- Logo do QuestGen
- Links para páginas principais
- Responsivo para mobile

## 🔌 Integração com API

O frontend está preparado para consumir os seguintes endpoints:

```typescript
// Gerar nova questão
POST /api/questions/generate
{
  "vestibular": "FUVEST",
  "assunto": "Álgebra", 
  "numeroAlternativas": 5
}

// Buscar questão por ID
GET /api/questions/:id

// Buscar questões similares
GET /api/questions/:id/similar

// Listar questões recentes
GET /api/questions/recent
```

## 🎨 Design System

### Cores
- **Primário**: Azul (`#3B82F6`)
- **Fundo**: Cinza claro (`#F9FAFB`)
- **Cards**: Branco com sombra suave
- **Texto**: Cinza escuro (`#111827`)

### Tipografia
- **Fonte**: Inter (Google Fonts)
- **Tamanhos**: Sistema de escala do Tailwind

### Componentes UI
Baseados no **shadcn/ui** com customizações:
- Botões com variantes (default, outline, ghost)
- Cards com header, content e footer
- Selects com Radix UI
- Badges para categorização

## 🚀 Próximos Passos

1. **Integração com Backend Real**
   - Substituir mocks por chamadas reais
   - Tratamento de erros da API
   - Loading states aprimorados

2. **Melhorias de UX**
   - Toast notifications
   - Skeleton loading
   - Paginação nas listas

3. **Funcionalidades Avançadas**
   - Filtros avançados
   - Busca por texto
   - Favoritos
   - Histórico de questões geradas

4. **Performance**
   - Lazy loading de componentes
   - Otimização de imagens
   - Cache de requisições

## 📝 Notas de Desenvolvimento

- **Mock Data**: Dados de exemplo em `src/lib/mock-data.ts`
- **API Layer**: Simulação em `src/lib/api.ts` com delays
- **Tipos**: Definições completas em `src/types/questao.ts`
- **Responsividade**: Mobile-first com Tailwind
- **Acessibilidade**: Componentes semânticos e ARIA labels

---

**QuestGen** - Transformando a criação de questões de matemática com inteligência artificial 🚀
