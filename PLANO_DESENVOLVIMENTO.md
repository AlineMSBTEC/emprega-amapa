# Plano de Desenvolvimento - Protótipo Inscrição em Cursos

## Visão Geral
Desenvolvimento de protótipo funcional da funcionalidade de Inscrição em Cursos do sistema Emprega Amapá para validação com clientes.

---

## Fases de Desenvolvimento

### **FASE 1: Setup e Fundação** (1-2 dias)

#### Objetivos
- Preparar ambiente de desenvolvimento
- Configurar ferramentas e dependências
- Integrar design system do Figma

#### Tarefas
- [ ] Configurar projeto Next.js/React com TypeScript
- [ ] Instalar e configurar shadcn/ui
- [ ] Integrar design tokens do Figma (cores, tipografia, espaçamentos)
- [ ] Configurar estrutura de pastas e rotas
- [ ] Setup de dados mock (JSON local)

#### Entregáveis
- Projeto configurado e rodando
- Design system integrado
- Estrutura base de rotas

---

### **FASE 2: Componentes Base** (2 dias)

#### Objetivos
- Criar componentes reutilizáveis alinhados ao design system
- Garantir acessibilidade e responsividade

#### Tarefas
- [ ] Card de Curso (lista e detalhes)
- [ ] Componentes de Formulário com validação
- [ ] Componente de Upload de arquivos
- [ ] Badges de status (Pendente, Aprovado, Recusado, etc)
- [ ] Modais e diálogos de confirmação
- [ ] Layout e navegação base

#### Entregáveis
- Biblioteca de componentes funcionais
- Storybook ou página de componentes (opcional)

---

### **FASE 3: Implementação de Telas** (5-6 dias)

#### **Sprint 1: Descoberta e Navegação** (2 dias)
**Telas:**
- Catálogo de Cursos
- Detalhes do Curso

**Tarefas:**
- [ ] Listagem de cursos com dados mock
- [ ] Busca e filtros funcionais (área, instituição, status, modalidade)
- [ ] Cards de curso com informações essenciais
- [ ] Navegação para tela de detalhes
- [ ] Página de detalhes completa do curso
- [ ] Botão de inscrição ativo

---

#### **Sprint 2: Processo de Inscrição** (2 dias)
**Telas:**
- Formulário de Inscrição
- Confirmação de Inscrição

**Tarefas:**
- [ ] Formulário com campos obrigatórios
- [ ] Validação de CPF, email, telefone
- [ ] Upload de documentos com validação (formato PDF/JPG/PNG, tamanho até 5-10MB)
- [ ] Feedback visual de erros
- [ ] Tela de confirmação com status "Pendente"
- [ ] Link para "Minhas Inscrições"

---

#### **Sprint 3: Acompanhamento** (1-2 dias)
**Telas:**
- Minhas Inscrições e Certificados

**Tarefas:**
- [ ] Lista de inscrições do usuário
- [ ] Exibição de status atual
- [ ] Visualização de documentos enviados
- [ ] Download/visualização de certificados (mock)
- [ ] Indicador de pontuação/visibilidade

---

### **FASE 4: Refinamento e Polish** (1-2 dias)

#### Objetivos
- Garantir qualidade e experiência do usuário
- Preparar para demonstração

#### Tarefas
- [ ] Ajustes de responsividade (mobile, tablet, desktop)
- [ ] Transições e microinterações
- [ ] Testes de acessibilidade (navegação por teclado, screen readers)
- [ ] Revisão de textos e mensagens
- [ ] Loading states e feedback visual
- [ ] Deploy em ambiente de demonstração (Vercel/Netlify)

#### Entregáveis
- Protótipo totalmente funcional
- URL de demonstração
- Documentação de fluxos

---

### **FASE 5: Validação com Cliente** (1 dia)

#### Objetivos
- Demonstrar protótipo
- Coletar feedback estruturado

#### Tarefas
- [ ] Preparar roteiro de demonstração
- [ ] Conduzir sessão de validação
- [ ] Documentar feedback e ajustes necessários
- [ ] Priorizar melhorias

---

## Tecnologias

### Stack Principal (Definida)
- **Framework:** Next.js 15 (App Router)
- **Linguagem:** TypeScript
- **UI Components:** shadcn/ui (seguindo guia de estilo do Figma)
- **Styling:** Tailwind CSS
- **Validação:** Zod + React Hook Form
- **Icons:** Lucide React
- **Estado:** React Context (para inscrições do usuário)

### Integrações
- **Design:** Figma - https://www.figma.com/design/EoccqVg7l4tCU0hDkZCUWS/Emprega-Amap%C3%A1?node-id=983-2655&m=dev
- **Deploy:** Vercel
- **Dados:** Mock local (JSON - 15 cursos inventados)

---

## Escopo do Protótipo

### ✅ Incluído
- Interface funcional navegável
- Validações de frontend
- Dados mockados (JSON local)
- Visual fiel ao Figma
- Fluxo completo de inscrição
- Responsividade

### ❌ Não Incluído
- Backend real / API
- Banco de dados
- Autenticação completa
- Notificações por email/SMS
- Sistema de pontuação backend
- Integração com instituições

---

## Cronograma Estimado

| Fase | Duração | Dias Úteis |
|------|---------|------------|
| Fase 1: Setup | 1-2 dias | 1-2 |
| Fase 2: Componentes | 2 dias | 3-4 |
| Fase 3: Telas | 5-6 dias | 5-10 |
| Fase 4: Refinamento | 1-2 dias | 11-12 |
| Fase 5: Validação | 1 dia | 13 |

**Total:** 10-13 dias úteis (~2-3 semanas)

---

## Regras de Negócio (Simuladas no Protótipo)

1. Validação obrigatória de documentos (tipo e tamanho)
2. Inscrição sempre inicia com status "Pendente"
3. Status possíveis: Pendente, Aprovado, Lista de Espera, Recusado
4. Certificados aparecem apenas para cursos "Concluídos"
5. Pontuação aumenta com cursos realizados

---

## Configurações Confirmadas

### ✅ Informações Definidas
1. **Figma:** https://www.figma.com/design/EoccqVg7l4tCU0hDkZCUWS/Emprega-Amap%C3%A1?node-id=983-2655&m=dev
2. **UI Framework:** shadcn/ui (componentes + guia de estilo do Figma)
3. **Stack:** Next.js 15 + TypeScript + Tailwind CSS
4. **Dados Mock:** 15 cursos inventados com dados realistas
5. **Catálogo:** 15 cursos
6. **Idioma:** PT-BR

### ⏳ Decisões Pendentes
- [ ] Autenticação: simular tela de login OU começar já "logado"?
  - **Sugestão:** começar logado para focar no fluxo de inscrição
- [ ] Nome do usuário mock para teste?
  - **Sugestão:** "Maria Silva" ou outro nome fictício

---

## Próximos Passos Imediatos

1. **Extrair Design System do Figma** (cores, tipografia, componentes)
2. **Inicializar projeto Next.js 15**
3. **Configurar shadcn/ui**
4. **Criar estrutura de pastas**
5. **Gerar dados mock dos 15 cursos**