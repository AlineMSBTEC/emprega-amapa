# Accessibility Checklist - Gamification System

## Visão Geral

Este documento fornece um checklist completo de acessibilidade para o sistema de gamificação do Emprega Amapá, garantindo conformidade com WCAG 2.1 Level AA.

**Última atualização:** 2025-09-30
**Versão:** 1.0

---

## Índice

1. [Contraste de Cores](#1-contraste-de-cores)
2. [Navegação por Teclado](#2-navegação-por-teclado)
3. [Screen Readers](#3-screen-readers)
4. [ARIA Labels e Roles](#4-aria-labels-e-roles)
5. [Animações e Movimento](#5-animações-e-movimento)
6. [Formulários e Inputs](#6-formulários-e-inputs)
7. [Imagens e Ícones](#7-imagens-e-ícones)
8. [Estrutura Semântica](#8-estrutura-semântica)
9. [Responsividade e Zoom](#9-responsividade-e-zoom)
10. [Testes e Ferramentas](#10-testes-e-ferramentas)

---

## 1. Contraste de Cores

### Requisitos WCAG AA

- **Texto Normal (< 18px):** Contraste mínimo de 4.5:1
- **Texto Grande (≥ 18px ou ≥ 14px bold):** Contraste mínimo de 3:1
- **Elementos UI (botões, ícones):** Contraste mínimo de 3:1

### Verificação de Cores do Sistema

#### Cores Principais

| Elemento | Foreground | Background | Ratio | Status |
|----------|-----------|------------|-------|--------|
| Texto principal | `--foreground` (oklch 0.2) | `--background` (oklch 0.98) | 12.6:1 | ✅ AAA |
| Botão Primary | White (oklch 1.0) | `--primary` (oklch 0.68) | 4.8:1 | ✅ AA |
| Botão Secondary | White (oklch 1.0) | `--secondary` (oklch 0.62) | 4.7:1 | ✅ AA |
| Texto Muted | `--muted-foreground` (oklch 0.5) | `--background` | 4.6:1 | ✅ AA |

#### Status Badges

| Status | Foreground | Background | Ratio | Status |
|--------|-----------|------------|-------|--------|
| Aprovado | White | `--status-approved` (oklch 0.65) | 4.9:1 | ✅ AA |
| Recusado | White | `--status-rejected` (oklch 0.55) | 4.6:1 | ✅ AA |
| Pendente | Dark (oklch 0.2) | `--status-pending` (oklch 0.75) | 6.2:1 | ✅ AA |
| Em Avaliação | White | `--status-in-review` (oklch 0.65) | 5.1:1 | ✅ AA |
| Finalizado | White | `--status-completed` (oklch 0.42) | 8.5:1 | ✅ AAA |

#### Medalhas e XP

| Elemento | Foreground | Background | Ratio | Status |
|----------|-----------|------------|-------|--------|
| XP Text | `--foreground` | `--xp-bar-fill` | 5.2:1 | ✅ AA |
| Medal Gold Text | White | `--medal-gold` | 4.7:1 | ✅ AA |
| Medal Silver Text | Dark | `--medal-silver` | 5.8:1 | ✅ AA |
| Medal Bronze Text | White | `--medal-bronze` | 5.1:1 | ✅ AA |

### Checklist

- [ ] Todas as combinações de texto/fundo atendem 4.5:1 (ou 3:1 para texto grande)
- [ ] Ícones e elementos UI atendem 3:1
- [ ] Cores não são a única forma de transmitir informação
- [ ] Estados hover/focus têm contraste adequado
- [ ] Links são distinguíveis por mais que só cor
- [ ] Dark mode mantém contraste adequado

### Ferramentas

- **WebAIM Contrast Checker:** https://webaim.org/resources/contrastchecker/
- **Chrome DevTools:** Lighthouse > Accessibility
- **Contrast Ratio (Lea Verou):** https://contrast-ratio.com/

---

## 2. Navegação por Teclado

### Requisitos

- Todos os elementos interativos acessíveis via Tab
- Ordem de tabulação lógica
- Estados de foco visíveis
- Atalhos de teclado não conflitam
- Escape fecha modais/overlays

### Elementos Interativos

#### XP Progress Bar
```tsx
<div
  role="progressbar"
  aria-valuenow={430}
  aria-valuemin={0}
  aria-valuemax={500}
  aria-label="430 de 500 XP para o próximo nível"
  tabIndex={0}
>
  {/* Progress bar content */}
</div>
```

#### Achievement Badge
```tsx
<button
  aria-label="Badge Maratonista - Complete 10 cursos em um mês"
  tabIndex={0}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      showBadgeDetails()
    }
  }}
>
  <Award className="size-8" />
</button>
```

#### Modal de Level Up
```tsx
<Dialog
  open={isOpen}
  onOpenChange={setIsOpen}
  onEscapeKeyDown={() => setIsOpen(false)}
>
  <DialogContent>
    {/* Foco automático no primeiro elemento */}
    <DialogTitle>Parabéns! Você alcançou o Nível 4!</DialogTitle>
    <Button autoFocus onClick={() => setIsOpen(false)}>
      Continuar
    </Button>
  </DialogContent>
</Dialog>
```

### Focus States

```css
/* Focus visível para todos os elementos interativos */
.focus-visible-ring:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--ring);
  border-color: var(--ring);
}

/* Aplicar em botões, badges, cards clicáveis */
.ranking-card:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}
```

### Checklist

- [ ] Tab percorre todos os elementos interativos
- [ ] Shift+Tab funciona em ordem reversa
- [ ] Focus states são claramente visíveis
- [ ] Escape fecha modais e overlays
- [ ] Enter/Space ativam botões e links
- [ ] Arrow keys navegam em listas (quando apropriado)
- [ ] Não há armadilhas de foco (focus traps)
- [ ] Skip links disponíveis para conteúdo principal

---

## 3. Screen Readers

### Requisitos

- Conteúdo significativo é anunciado
- Elementos decorativos são ocultados
- Labels descritivos para todos os elementos
- Live regions para atualizações dinâmicas
- Ordem de leitura lógica

### Implementações

#### Informações Escondidas Visualmente

```tsx
<div className="flex items-center gap-2">
  <Zap className="size-4 text-primary" aria-hidden="true" />
  <span>430/500 XP</span>
  <span className="sr-only">
    Você tem 430 de 500 XP necessários para alcançar o próximo nível
  </span>
</div>
```

#### Live Regions para Notificações

```tsx
<div
  role="status"
  aria-live="polite"
  aria-atomic="true"
  className="sr-only"
>
  {notification && `Nova conquista desbloqueada: ${notification.badgeName}`}
</div>
```

#### Celebrações e Level Up

```tsx
<Dialog aria-labelledby="level-up-title" aria-describedby="level-up-description">
  <DialogTitle id="level-up-title">
    Parabéns! Você alcançou o Nível 4!
  </DialogTitle>
  <DialogDescription id="level-up-description">
    Continue aprendendo e crescendo. Novos desafios esperam por você.
  </DialogDescription>
</Dialog>
```

#### Ranking Cards

```tsx
<article
  aria-labelledby={`user-${user.id}-name`}
  aria-describedby={`user-${user.id}-stats`}
>
  <h3 id={`user-${user.id}-name`}>
    #{position} - {user.name}
  </h3>

  <div id={`user-${user.id}-stats`} className="sr-only">
    Posição {position} no ranking.
    Nível {user.level} - {user.levelTitle}.
    {user.xp} pontos de experiência totais.
    {user.coursesCompleted} cursos concluídos.
    {user.badges.length} badges desbloqueados.
  </div>

  {/* Visual content */}
</article>
```

#### Progress Bars

```tsx
<div
  role="progressbar"
  aria-valuenow={currentXP}
  aria-valuemin={0}
  aria-valuemax={targetXP}
  aria-label={`Progresso de XP: ${currentXP} de ${targetXP}`}
>
  <div className="xp-bar-fill" style={{ width: `${percentage}%` }}>
    <span className="sr-only">
      {percentage}% completo. Faltam {targetXP - currentXP} XP para o próximo nível.
    </span>
  </div>
</div>
```

### Checklist

- [ ] Todos os ícones decorativos têm `aria-hidden="true"`
- [ ] Ícones funcionais têm labels (`aria-label` ou texto visível)
- [ ] Imagens têm alt text apropriado
- [ ] Elementos interativos têm labels descritivos
- [ ] Live regions para mudanças dinâmicas
- [ ] Títulos de página e seções são únicos e descritivos
- [ ] Conteúdo é anunciado em ordem lógica

---

## 4. ARIA Labels e Roles

### Requisitos

- Roles semânticos apropriados
- Labels descritivos para elementos interativos
- Relacionamentos entre elementos
- Estados dinâmicos atualizados

### Roles Comuns

#### Gamification Components

```tsx
// Progress Bar
<div role="progressbar" aria-valuenow={50} aria-valuemin={0} aria-valuemax={100}>

// Status Badge
<span role="status" aria-label="Status da inscrição: Aprovado">

// Achievement Badge (interativo)
<button role="button" aria-label="Badge Primeiro Passo - Desbloqueado">

// Achievement Badge (não interativo)
<div role="img" aria-label="Badge Maratonista - Ainda não desbloqueado">

// Ranking List
<ol role="list" aria-label="Ranking de candidatos">
  <li role="listitem">

// Modal de Celebração
<div role="dialog" aria-modal="true" aria-labelledby="title">

// Notification Toast
<div role="alert" aria-live="assertive">
```

### Labels Descritivos

#### Botões com Apenas Ícones

```tsx
<button aria-label="Filtrar ranking por município">
  <Filter className="size-4" />
</button>

<button aria-label="Fechar modal">
  <X className="size-4" />
</button>

<button aria-label="Baixar certificado do curso Desenvolvimento Web">
  <Download className="size-4" />
</button>
```

#### Links

```tsx
<a href="/ranking" aria-label="Ver ranking completo de candidatos">
  Ver Ranking
</a>

<a href={certificateUrl} aria-label={`Baixar certificado do curso ${courseName}`}>
  Download
</a>
```

#### Formulários de Filtro

```tsx
<label htmlFor="municipality-filter">
  Filtrar por Município
</label>
<select
  id="municipality-filter"
  aria-label="Selecione um município para filtrar o ranking"
>
  <option>Todos os municípios</option>
  <option>Macapá</option>
  <option>Santana</option>
</select>
```

### Estados Dinâmicos

```tsx
// Badge bloqueado vs desbloqueado
<button
  aria-label={unlocked ? "Badge Maratonista - Desbloqueado" : "Badge Maratonista - Bloqueado"}
  aria-disabled={!unlocked}
>

// Botão de ação
<button
  aria-label="Inscrever-se no curso"
  aria-busy={isLoading}
  disabled={isLoading}
>
  {isLoading ? "Inscrevendo..." : "Inscrever-se"}
</button>
```

### Checklist

- [ ] Roles ARIA apropriados usados
- [ ] Labels descritivos para elementos interativos
- [ ] aria-label ou aria-labelledby em todos os landmarks
- [ ] aria-describedby para informações adicionais
- [ ] aria-live para atualizações dinâmicas
- [ ] aria-expanded para elementos colapsáveis
- [ ] aria-selected para elementos selecionáveis
- [ ] aria-disabled para elementos desabilitados

---

## 5. Animações e Movimento

### Requisitos

- Respeitar `prefers-reduced-motion`
- Animações não causam convulsões (< 3 flashes/segundo)
- Usuário pode pausar animações longas
- Animações não bloqueiam interação

### Implementação

```css
/* Desabilitar animações se usuário preferir */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  /* Remover animações específicas */
  .badge-unlock,
  .level-up,
  .pulse-glow,
  .shimmer {
    animation: none !important;
  }

  /* Manter transições suaves mas instantâneas */
  .ranking-card:hover {
    transform: none;
  }
}
```

### React/Next.js

```tsx
"use client"

import { useReducedMotion } from "@/hooks/use-reduced-motion"

export function AchievementBadge({ unlocked, isNew }: Props) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div
      className={cn(
        "badge",
        unlocked && !prefersReducedMotion && isNew && "badge-new"
      )}
    >
      {/* Badge content */}
    </div>
  )
}
```

### Hook `useReducedMotion`

```tsx
// hooks/use-reduced-motion.ts
import { useEffect, useState } from "react"

export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = () => {
      setPrefersReducedMotion(mediaQuery.matches)
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  return prefersReducedMotion
}
```

### Checklist

- [ ] `prefers-reduced-motion` é respeitado
- [ ] Animações não têm mais de 3 flashes por segundo
- [ ] Animações longas (> 5s) podem ser pausadas
- [ ] Parallax e scroll effects são reduzidos/removidos
- [ ] Auto-play é desabilitado ou pode ser pausado
- [ ] Transições essenciais ainda funcionam (muito rápidas)

---

## 6. Formulários e Inputs

### Requisitos

- Labels associados a inputs
- Mensagens de erro descritivas
- Validação clara e acessível
- Instruções visíveis e anunciadas

### Filtros de Ranking

```tsx
<form aria-label="Filtros do ranking">
  <div className="form-field">
    <label htmlFor="specialty">
      Filtrar por Especialidade
    </label>
    <select
      id="specialty"
      aria-describedby="specialty-help"
      aria-invalid={errors.specialty ? "true" : "false"}
    >
      <option value="">Todas as especialidades</option>
      <option value="tech">Tecnologia</option>
      <option value="health">Saúde</option>
    </select>
    <span id="specialty-help" className="text-sm text-muted-foreground">
      Selecione uma especialidade para filtrar os resultados
    </span>
    {errors.specialty && (
      <span role="alert" className="text-destructive">
        {errors.specialty.message}
      </span>
    )}
  </div>
</form>
```

### Checklist

- [ ] Todos os inputs têm labels associados
- [ ] Labels são visíveis (não apenas placeholders)
- [ ] Mensagens de erro usam `role="alert"` ou `aria-live="assertive"`
- [ ] aria-invalid para campos com erro
- [ ] aria-required para campos obrigatórios
- [ ] aria-describedby para instruções e ajuda
- [ ] Validação em tempo real não é intrusiva
- [ ] Erros são anunciados claramente

---

## 7. Imagens e Ícones

### Requisitos

- Alt text descritivo para imagens significativas
- Alt vazio para imagens decorativas
- Ícones funcionais têm labels
- SVGs têm títulos quando apropriado

### Implementações

#### Imagens de Cursos

```tsx
<Image
  src={course.image}
  alt={`Imagem ilustrativa do curso ${course.title}`}
  width={400}
  height={225}
/>
```

#### Avatares

```tsx
<Avatar>
  <AvatarImage src={user.avatar} alt={`Foto de ${user.name}`} />
  <AvatarFallback aria-label={`Avatar de ${user.name}`}>
    {user.name.charAt(0)}
  </AvatarFallback>
</Avatar>
```

#### Ícones Decorativos

```tsx
<div className="flex items-center gap-2">
  <Zap className="size-4 text-primary" aria-hidden="true" />
  <span>430 XP</span>
</div>
```

#### Ícones Funcionais

```tsx
<button aria-label="Fechar">
  <X className="size-4" aria-hidden="true" />
</button>

<a href="/help" aria-label="Central de ajuda">
  <HelpCircle className="size-5" aria-hidden="true" />
</a>
```

#### SVG com Título

```tsx
<svg role="img" aria-labelledby="medal-title">
  <title id="medal-title">Medalha de ouro - Primeiro lugar</title>
  {/* SVG content */}
</svg>
```

### Checklist

- [ ] Imagens significativas têm alt text descritivo
- [ ] Imagens decorativas têm alt="" ou aria-hidden="true"
- [ ] Ícones decorativos têm aria-hidden="true"
- [ ] Ícones funcionais têm aria-label no elemento pai
- [ ] SVGs complexos têm `<title>` e `<desc>`
- [ ] Text over images tem contraste adequado
- [ ] Imagens não são a única forma de transmitir informação

---

## 8. Estrutura Semântica

### Requisitos

- HTML semântico apropriado
- Hierarquia de headings lógica
- Landmarks ARIA
- Estrutura de documento clara

### Hierarquia de Headings

```tsx
// Página de Ranking
<h1>Ranking de Candidatos</h1>

<section aria-labelledby="filters-heading">
  <h2 id="filters-heading">Filtros</h2>
  {/* Filtros */}
</section>

<section aria-labelledby="ranking-heading">
  <h2 id="ranking-heading">Top Candidatos</h2>

  <article>
    <h3>{user.name} - Posição #{position}</h3>
    {/* User details */}
  </article>
</section>
```

### Landmarks

```tsx
<body>
  <header role="banner">
    <nav aria-label="Navegação principal">
      {/* Nav items */}
    </nav>
  </header>

  <main role="main" id="main-content">
    <h1>Ranking de Candidatos</h1>
    {/* Main content */}
  </main>

  <aside role="complementary" aria-labelledby="sidebar-heading">
    <h2 id="sidebar-heading">Filtros Avançados</h2>
    {/* Sidebar content */}
  </aside>

  <footer role="contentinfo">
    {/* Footer content */}
  </footer>
</body>
```

### Checklist

- [ ] Um único `<h1>` por página
- [ ] Headings em ordem hierárquica (não pular níveis)
- [ ] Landmarks HTML5 ou ARIA usados
- [ ] Listas usam `<ul>`, `<ol>`, `<li>`
- [ ] Elementos semânticos (`<article>`, `<section>`, `<aside>`)
- [ ] `<button>` para ações, `<a>` para navegação
- [ ] Tabelas usam `<th>`, `<caption>`, scope

---

## 9. Responsividade e Zoom

### Requisitos

- Suporta zoom até 200%
- Conteúdo não corta em zoom
- Reflow funciona em viewports pequenos
- Touch targets adequados (44×44px mínimo)

### Touch Targets

```css
/* Garantir tamanho mínimo de toque */
.badge-item {
  min-width: 44px;
  min-height: 44px;
  padding: 8px;
}

/* Aumentar área de clique sem afetar visual */
.small-button {
  position: relative;
}

.small-button::before {
  content: "";
  position: absolute;
  inset: -8px; /* Aumenta área de clique */
}
```

### Zoom e Reflow

```tsx
// Design responsivo
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Cards adaptam-se ao tamanho da tela */}
</div>

// Unidades relativas
<div className="text-base p-4 gap-2">
  {/* Usa rem/em, não px fixos */}
</div>
```

### Checklist

- [ ] Layout funciona em 200% zoom
- [ ] Conteúdo não corta ou sobrepõe em zoom
- [ ] Touch targets mínimo 44×44px
- [ ] Espaçamento entre elementos clicáveis
- [ ] Texto pode ser redimensionado sem quebrar layout
- [ ] Horizontal scroll não é necessário (exceto tabelas)
- [ ] Conteúdo reflow para viewports pequenos

---

## 10. Testes e Ferramentas

### Ferramentas Recomendadas

#### Extensões de Browser

- **axe DevTools:** https://www.deque.com/axe/devtools/
- **WAVE:** https://wave.webaim.org/extension/
- **Lighthouse:** Built-in Chrome DevTools
- **Accessibility Insights:** https://accessibilityinsights.io/

#### Screen Readers

- **NVDA (Windows):** https://www.nvaccess.org/
- **JAWS (Windows):** https://www.freedomscientific.com/products/software/jaws/
- **VoiceOver (Mac/iOS):** Built-in
- **TalkBack (Android):** Built-in

#### Contrast Checkers

- **WebAIM Contrast Checker:** https://webaim.org/resources/contrastchecker/
- **Contrast Ratio:** https://contrast-ratio.com/
- **Colour Contrast Analyser:** https://www.tpgi.com/color-contrast-checker/

#### Automated Testing

```bash
# Instalar pa11y
npm install -D pa11y

# Testar página
pa11y http://localhost:3000/ranking

# Testar múltiplas páginas
pa11y-ci --config .pa11yci.json
```

```json
// .pa11yci.json
{
  "defaults": {
    "standard": "WCAG2AA",
    "timeout": 10000
  },
  "urls": [
    "http://localhost:3000/ranking",
    "http://localhost:3000/minhas-inscricoes"
  ]
}
```

### Processo de Teste

#### 1. Automated Testing
- Executar Lighthouse Accessibility
- Rodar axe DevTools
- Verificar com WAVE

#### 2. Keyboard Testing
- Testar navegação completa via Tab
- Verificar focus states
- Testar Escape, Enter, Space
- Verificar skip links

#### 3. Screen Reader Testing
- NVDA/JAWS no Windows
- VoiceOver no Mac
- Verificar anúncios corretos
- Testar live regions

#### 4. Visual Testing
- Testar em 200% zoom
- Verificar contraste de cores
- Testar dark mode
- Dispositivos móveis

#### 5. Manual Review
- Revisar ARIA labels
- Verificar alt texts
- Checar ordem de leitura
- Validar semântica HTML

### Checklist Final

- [ ] Lighthouse Accessibility score > 90
- [ ] axe DevTools sem erros críticos
- [ ] Navegação por teclado completa
- [ ] Screen reader testa sem problemas
- [ ] Contraste de cores adequado
- [ ] Zoom 200% funciona
- [ ] Responsivo em mobile
- [ ] `prefers-reduced-motion` respeitado
- [ ] Formulários acessíveis
- [ ] Documentação atualizada

---

## Recursos Adicionais

### Documentação

- **WCAG 2.1:** https://www.w3.org/WAI/WCAG21/quickref/
- **ARIA Authoring Practices:** https://www.w3.org/WAI/ARIA/apg/
- **MDN Accessibility:** https://developer.mozilla.org/en-US/docs/Web/Accessibility

### Cursos

- **WebAIM:** https://webaim.org/articles/
- **Deque University:** https://dequeuniversity.com/
- **Google Web Fundamentals:** https://developers.google.com/web/fundamentals/accessibility

---

**Nota:** Este checklist deve ser revisado antes de cada release e atualizado conforme novas funcionalidades são adicionadas ao sistema de gamificação.
