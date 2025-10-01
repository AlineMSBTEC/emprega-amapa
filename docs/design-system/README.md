# Design System Documentation - Gamification Features

## Visão Geral

Esta documentação contém todas as diretrizes, especificações e guias de implementação para o sistema de gamificação do **Emprega Amapá**, incluindo:

- **Tela de Ranking de Candidatos**
- **Tela de Minhas Inscrições e Certificados Gamificada**

## Estrutura da Documentação

```
docs/design-system/
├── README.md                              # Este arquivo
├── gamification-brand-guidelines.md       # Diretrizes de marca e identidade visual
├── design-tokens.css                      # Tokens CSS implementáveis
├── component-library.md                   # Especificações de componentes
├── accessibility-checklist.md             # Checklist completo de acessibilidade
└── implementation-guide.md                # Guia técnico de implementação
```

---

## Documentos

### 1. Gamification Brand Guidelines
**Arquivo:** `gamification-brand-guidelines.md`

Diretrizes completas de marca e identidade visual para a camada de gamificação.

**Conteúdo:**
- Princípios de design (Motivadora, Profissional, Inclusiva, Confiável)
- Paleta de cores (status, XP, medalhas, níveis, badges)
- Tipografia e hierarquia
- Sistema de ícones
- Animações e movimento
- Espaçamento e layout
- Tom de voz e mensagens

**Quando usar:** Para entender a filosofia visual e tomar decisões de design.

---

### 2. Design Tokens
**Arquivo:** `design-tokens.css`

Tokens CSS prontos para integração com o projeto existente.

**Conteúdo:**
- CSS Custom Properties para todas as cores
- Gradientes pré-definidos
- Variáveis de tipografia
- Espaçamento e border radius
- Shadows e elevações
- Timing functions para animações
- Utility classes prontas
- Keyframes de animações

**Quando usar:** Durante a implementação, adicionar ao `app/globals.css`.

---

### 3. Component Library
**Arquivo:** `component-library.md`

Especificações detalhadas de todos os componentes de UI.

**Conteúdo:**
- XP Progress Bar
- Level Badge
- Medal Component
- Achievement Badge
- Status Badge
- Ranking Card
- Course Card Gamified
- Profile Panel Gamified
- Level Up Modal
- Achievement Unlock Toast
- Tooltip Component
- Filter Controls

Cada componente inclui:
- Descrição e visual
- Anatomia detalhada
- Props/API
- Código de implementação completo
- Estados e variantes
- Acessibilidade

**Quando usar:** Como referência durante desenvolvimento de componentes.

---

### 4. Accessibility Checklist
**Arquivo:** `accessibility-checklist.md`

Checklist completo para garantir conformidade com WCAG 2.1 Level AA.

**Conteúdo:**
- Contraste de cores (todos testados e aprovados)
- Navegação por teclado
- Screen readers (ARIA labels, roles)
- Animações e movimento (prefers-reduced-motion)
- Formulários e inputs
- Imagens e ícones
- Estrutura semântica
- Responsividade e zoom
- Ferramentas de teste
- Processo de validação

**Quando usar:** Durante desenvolvimento e antes de cada release.

---

### 5. Implementation Guide
**Arquivo:** `implementation-guide.md`

Guia técnico passo a passo para implementação.

**Conteúdo:**
- Setup inicial
- Integração de design tokens
- Criação de tipos TypeScript
- Implementação de componentes (código completo)
- Páginas e rotas
- Sistema de XP e níveis (lógica de negócio)
- Badges e conquistas (sistema de achievements)
- Ranking system
- Animações e celebrações
- Testes e validação

**Quando usar:** Como guia principal durante a fase de implementação.

---

## Quick Start

### Para Designers

1. Leia `gamification-brand-guidelines.md` para entender a identidade visual
2. Consulte `component-library.md` para especificações de componentes
3. Use `design-tokens.css` como referência de cores e estilos

### Para Desenvolvedores

1. Comece pelo `implementation-guide.md`
2. Integre `design-tokens.css` no projeto
3. Implemente componentes seguindo `component-library.md`
4. Valide com `accessibility-checklist.md`

### Para QA/Testers

1. Use `accessibility-checklist.md` como guia de testes
2. Valide componentes contra `component-library.md`
3. Verifique aderência às `gamification-brand-guidelines.md`

---

## Principais Features

### Sistema de XP e Níveis

- **XP por curso completado:** +50 XP
- **XP por certificado enviado:** +20 XP
- **Progressão de níveis:** 10 níveis definidos
- **Categorias:** Beginner (1-3), Intermediate (4-6), Advanced (7-9), Expert (10+)

### Sistema de Badges

- **4 raridades:** Common, Rare, Epic, Legendary
- **Tipos de conquistas:**
  - Cursos completados (1, 5, 10, 20+)
  - XP alcançado (marcos de XP)
  - Conquistas especiais

### Status de Inscrições

- **Pendente:** Aguardando ação
- **Em Avaliação:** Em processo
- **Aprovado:** Sucesso confirmado
- **Lista de Espera:** Situação temporária
- **Recusado:** Feedback negativo
- **Finalizado:** Curso concluído com sucesso

### Ranking System

- **Ordenação:** Por XP total, depois cursos, depois nível
- **Medalhas:** Top 3 recebem medalhas (ouro, prata, bronze)
- **Filtros:** Por especialidade, município, nível

---

## Paleta de Cores Principal

### Cores da Marca (Existentes)
```css
--primary: oklch(0.68 0.21 42);      /* Orange #FF6B00 */
--secondary: oklch(0.62 0.32 318);   /* Magenta #E900FF */
--tertiary: oklch(0.42 0.25 278);    /* Blue #3D00D4 */
```

### Cores de Status
```css
--status-approved: oklch(0.65 0.2 145);    /* Verde - Aprovado */
--status-rejected: oklch(0.55 0.22 25);    /* Vermelho - Recusado */
--status-pending: oklch(0.75 0.18 85);     /* Amarelo - Pendente */
--status-completed: oklch(0.42 0.25 278);  /* Azul - Finalizado */
```

### Medalhas
```css
--medal-gold: oklch(0.78 0.18 85);     /* #FFD700 */
--medal-silver: oklch(0.75 0.01 264);  /* #C0C0C0 */
--medal-bronze: oklch(0.58 0.12 45);   /* #CD7F32 */
```

---

## Acessibilidade

Todos os elementos seguem **WCAG 2.1 Level AA**:

- ✅ Contraste mínimo 4.5:1 para texto normal
- ✅ Contraste mínimo 3:1 para texto grande e elementos UI
- ✅ Navegação completa por teclado
- ✅ ARIA labels e roles apropriados
- ✅ Suporte a screen readers
- ✅ Respeita `prefers-reduced-motion`
- ✅ Touch targets mínimo 44×44px
- ✅ Suporta zoom 200%

---

## Tecnologias

- **Framework:** Next.js 15.5.4 (App Router)
- **UI:** React 19.1.0
- **Styling:** Tailwind CSS v4 + CSS Custom Properties
- **Components:** shadcn/ui + Radix UI
- **Icons:** Lucide React
- **TypeScript:** 5+

---

## Integração com Projeto Existente

Este design system foi criado para integrar-se perfeitamente com o projeto existente:

1. **Design tokens** usam o mesmo formato OKLCH já em uso
2. **Componentes** seguem o padrão shadcn/ui existente
3. **Estrutura** mantém convenções do projeto (App Router, TypeScript)
4. **Cores** complementam a paleta existente (orange, magenta, blue)
5. **Acessibilidade** mantém padrões já estabelecidos

---

## Estrutura de Implementação Recomendada

```
1. Setup (1 dia)
   - Integrar design tokens
   - Criar tipos TypeScript
   - Setup estrutura de pastas

2. Componentes Base (3-5 dias)
   - XP Progress Bar
   - Level Badge
   - Status Badge
   - Medal Component
   - Achievement Badge

3. Lógica de Negócio (2-3 dias)
   - Sistema de XP e níveis
   - Sistema de badges
   - Ranking system

4. Páginas (3-5 dias)
   - Tela de Ranking
   - Minhas Inscrições Gamificada
   - Modais e celebrações

5. Testes e Refinamento (2-3 dias)
   - Testes de acessibilidade
   - Testes de responsividade
   - Ajustes finais

Total estimado: 11-16 dias
```

---

## Manutenção e Atualizações

### Quando Atualizar

- Adicionar novo componente
- Mudar padrões de acessibilidade
- Novos tipos de badges/conquistas
- Ajustes na paleta de cores
- Mudanças no sistema de níveis

### Como Atualizar

1. Atualizar documento relevante
2. Atualizar versão e data
3. Adicionar nota de changelog
4. Comunicar mudanças ao time

---

## Recursos Externos

### Ferramentas
- **OKLCH Color Converter:** https://oklch.com/
- **Contrast Checker:** https://webaim.org/resources/contrastchecker/
- **Lucide Icons:** https://lucide.dev/
- **Tailwind CSS:** https://tailwindcss.com/

### Documentação
- **WCAG 2.1:** https://www.w3.org/WAI/WCAG21/quickref/
- **ARIA Practices:** https://www.w3.org/WAI/ARIA/apg/
- **Next.js:** https://nextjs.org/docs
- **shadcn/ui:** https://ui.shadcn.com

### Inspirações
- Duolingo (gamificação madura)
- LinkedIn Learning (badges profissionais)
- Codecademy (progresso e XP)
- Khan Academy (sistema de conquistas)

---

## Contribuindo

### Reportar Problemas

Se encontrar problemas com a documentação:
1. Verifique se está na versão mais recente
2. Consulte outros documentos relacionados
3. Documente o problema claramente
4. Sugira melhorias

### Sugerir Melhorias

- Novos componentes
- Melhorias de acessibilidade
- Otimizações de performance
- Novos patterns de uso

---

## Contato e Suporte

Para dúvidas sobre este design system:
- Consulte primeiro a documentação completa
- Verifique o `implementation-guide.md` para questões técnicas
- Use o `accessibility-checklist.md` para validação

---

## Changelog

### Versão 1.0 - 2025-09-30
- Documentação inicial completa
- Brand guidelines estabelecidos
- Component library definida
- Design tokens implementados
- Accessibility checklist criado
- Implementation guide completo

---

## Licença

Este design system é parte do projeto Emprega Amapá e segue as mesmas diretrizes e licenças do projeto principal.

---

**Última atualização:** 2025-09-30
**Versão:** 1.0
**Status:** Production Ready

---

## Quick Reference

| Precisa de... | Consulte... |
|---------------|-------------|
| Cores e estilos | `design-tokens.css` |
| Especificações de componentes | `component-library.md` |
| Código de implementação | `implementation-guide.md` |
| Guidelines visuais | `gamification-brand-guidelines.md` |
| Validação de acessibilidade | `accessibility-checklist.md` |
| Visão geral | Este arquivo (README.md) |

---

**Pronto para começar? Acesse o `implementation-guide.md` e comece a implementar!**
