# Emprega Amapá - Protótipo de Inscrição em Cursos

Protótipo funcional da funcionalidade de inscrição em cursos de capacitação profissional do sistema Emprega Amapá.

## 🎯 Objetivo

Validar com clientes o fluxo completo de inscrição em cursos, desde a descoberta até o acompanhamento de status e certificados.

## ✨ Funcionalidades Implementadas

### 1. Página Inicial (Home)
- Hero section com chamada para ação
- Estatísticas do sistema
- Explicação do fluxo de inscrição
- Navegação intuitiva

### 2. Catálogo de Cursos
- Listagem de 15 cursos mockados
- Busca em tempo real
- Filtros por:
  - Área de conhecimento
  - Instituição
  - Modalidade (Presencial/Online/Híbrido)
  - Status (Aberto/Fechado)
- Cards informativos com dados principais
- Indicador de vagas limitadas

### 3. Detalhes do Curso
- Informações completas do curso
- Pré-requisitos
- Documentos obrigatórios
- Cronograma e modalidade
- Call-to-action contextual

### 4. Formulário de Inscrição
- Validação completa com Zod + React Hook Form
- Campos obrigatórios:
  - Nome completo
  - CPF (com validação real)
  - Email
  - Telefone
- Upload múltiplo de documentos
- Validação de formato (PDF, JPG, PNG) e tamanho (máx 5MB)
- Formatação automática de CPF e telefone
- Feedback visual de erros

### 5. Confirmação de Inscrição
- Mensagem de sucesso
- Status inicial: "Pendente"
- Próximos passos
- Navegação rápida

### 6. Minhas Inscrições
- Lista de inscrições do usuário
- Dashboard com:
  - Total de inscrições
  - Cursos concluídos
  - Pontos de visibilidade
- Status de cada inscrição (Pendente/Aprovado/Recusado/Lista de Espera)
- Download de certificados (mock)
- Sistema de badges por status

## 🛠 Stack Tecnológica

### Core
- **Next.js 15.5.4** - Framework React com App Router
- **React 19.1.0** - Biblioteca UI
- **TypeScript 5** - Type safety
- **Tailwind CSS v4** - Styling utility-first

### UI & Forms
- **shadcn/ui** - Componentes acessíveis (estilo new-york)
- **Radix UI** - Primitivos de componentes
- **React Hook Form 7.63** - Gerenciamento de formulários
- **Zod 4.1.11** - Validação de schema
- **Lucide React** - Ícones consistentes

### Ferramentas
- **Turbopack** - Bundler do Next.js 15
- **ESLint** - Linting
- **class-variance-authority** - Variantes de componentes
- **tailwind-merge** - Merge de classes

## 📁 Estrutura do Projeto

```
prototipo-cursos/
├── app/                           # Next.js App Router
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home
│   ├── not-found.tsx             # 404 customizado
│   ├── cursos/                   # Rotas de cursos
│   │   ├── page.tsx              # Catálogo
│   │   ├── loading.tsx           # Loading state
│   │   └── [id]/                 # Detalhes dinâmicos
│   │       ├── page.tsx          # Detalhes do curso
│   │       ├── loading.tsx
│   │       └── inscricao/
│   │           ├── page.tsx      # Formulário
│   │           └── confirmacao/
│   │               └── page.tsx  # Confirmação
│   └── minhas-inscricoes/
│       ├── page.tsx              # Dashboard de inscrições
│       └── loading.tsx
├── components/
│   ├── ui/                       # shadcn/ui components
│   ├── course-card.tsx           # Card de curso
│   ├── file-upload.tsx           # Upload de documentos
│   ├── site-header.tsx           # Header reutilizável
│   ├── site-footer.tsx           # Footer reutilizável
│   └── page-loading.tsx          # Loading component
├── lib/
│   ├── utils.ts                  # Helpers (cn, etc)
│   └── validations.ts            # Schemas Zod + validações
├── data/
│   ├── courses-mock.ts           # 15 cursos mockados
│   └── user-mock.ts              # Dados do usuário
├── types/
│   └── index.ts                  # TypeScript interfaces
└── DESIGN_SYSTEM_RULES.md        # Documentação completa
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js 20+ instalado
- npm ou yarn

### Instalação

```bash
# Instalar dependências
npm install

# Rodar servidor de desenvolvimento
npm run dev

# Build de produção
npm run build

# Iniciar servidor de produção
npm start
```

### Acesso

- **Local:** http://localhost:3000
- **Catálogo:** http://localhost:3000/cursos
- **Minhas Inscrições:** http://localhost:3000/minhas-inscricoes

## 👤 Usuário Mock

O protótipo simula um usuário já autenticado:

- **Nome:** Maria Silva Santos
- **Email:** maria.silva@email.com
- **CPF:** 123.456.789-00
- **Inscrições:** 2 (1 aprovada, 1 pendente)
- **Cursos Concluídos:** 2
- **Pontos:** 110

## 📊 Dados Mock

### Cursos (15 total)
- Áreas diversas: TI, Marketing, Administração, Saúde, Gastronomia, etc
- Instituições: SENAC, SEBRAE, SENAI, IFAP, SENAR
- Modalidades: Presencial, Online, Híbrido
- Status: 13 abertos, 2 fechados

### Validações Implementadas

- **CPF:** Validação real de dígitos verificadores
- **Email:** Validação de formato
- **Telefone:** Formatação automática (XX) XXXXX-XXXX
- **Arquivos:**
  - Formatos: PDF, JPG, PNG
  - Tamanho máximo: 5MB por arquivo
  - Validação em tempo real

## 🎨 Design System

Consulte [DESIGN_SYSTEM_RULES.md](DESIGN_SYSTEM_RULES.md) para:
- Token definitions (cores OKLCH, tipografia)
- Componentes disponíveis
- Padrões de código
- Integração com Figma
- Boas práticas

## 📦 Componentes shadcn/ui Instalados

- button
- card
- input
- label
- badge
- dialog
- select
- form
- textarea

## 🔄 Fluxo de Usuário

1. **Home** → Ver chamada para ação
2. **Catálogo** → Buscar e filtrar cursos
3. **Detalhes** → Ver informações completas
4. **Formulário** → Preencher dados e enviar documentos
5. **Confirmação** → Receber feedback de sucesso
6. **Minhas Inscrições** → Acompanhar status

## 📝 Regras de Negócio (Simuladas)

1. Validação obrigatória de documentos (tipo e tamanho)
2. Inscrição sempre inicia com status "Pendente"
3. Status possíveis: Pendente, Aprovado, Recusado, Lista de Espera
4. Certificados aparecem apenas para cursos concluídos
5. Pontuação aumenta com cursos realizados
6. Vagas limitadas sinalizadas visualmente

## 🎯 Próximos Passos (Não Incluídos no Protótipo)

- [ ] Backend real / API
- [ ] Banco de dados
- [ ] Autenticação completa
- [ ] Sistema de notificações (email/SMS)
- [ ] Upload real de arquivos para cloud storage
- [ ] Integração com instituições
- [ ] Sistema de pontuação backend
- [ ] Dashboard administrativo

## 📄 Licença

Projeto desenvolvido para validação de protótipo - Governo do Estado do Amapá

## 👥 Contato

Para dúvidas ou sugestões sobre o protótipo, entre em contato com a equipe de desenvolvimento.

---

**Desenvolvido com Next.js 15, React 19, TypeScript e shadcn/ui**