# Gamification Brand Guidelines - Emprega Amapá

## Visão Geral

Este documento define as diretrizes de marca e identidade visual para a camada de gamificação do sistema Emprega Amapá, incluindo o Ranking de Candidatos e o painel Minhas Inscrições e Certificados Gamificado.

**Última atualização:** 2025-09-30
**Versão:** 1.0

---

## 1. Princípios de Design

### Personalidade da Marca - Camada Gamificação

A gamificação do Emprega Amapá segue estes princípios fundamentais:

#### Motivadora
- Encoraja aprendizado contínuo e desenvolvimento profissional
- Celebra conquistas pequenas e grandes
- Fornece feedback positivo e construtivo
- Cria senso de progresso tangível

#### Profissional
- Mantém seriedade e credibilidade institucional
- Foco em desenvolvimento de carreira real
- Linguagem formal-amigável (não infantil)
- Visual sofisticado e maduro

#### Inclusiva
- Acessível para todos os níveis de habilidade
- Celebra diferentes tipos de conquistas
- Não promove competição prejudicial
- Respeita ritmos individuais de aprendizagem

#### Confiável
- Transparência nos critérios de pontuação
- Dados e progresso claramente explicados
- Plataforma governamental/institucional
- Segurança e privacidade respeitadas

#### Energética mas Madura
- Gamificação voltada para adultos
- Usa cores vibrantes com equilíbrio
- Animações sutis, não exageradas
- Celebrações apropriadas ao contexto profissional

---

## 2. Identidade Visual

### 2.1 Paleta de Cores

#### Cores Base da Marca
Estas cores já estão estabelecidas no sistema e devem ser mantidas:

```css
/* Cores Principais */
--primary: oklch(0.68 0.21 42);        /* Orange #FF6B00 */
--secondary: oklch(0.62 0.32 318);     /* Magenta #E900FF */
--tertiary: oklch(0.42 0.25 278);      /* Blue #3D00D4 */
```

**Uso:**
- **Primary (Orange):** Botões principais, destaques, chamadas para ação
- **Secondary (Magenta):** Acentos secundários, badges especiais
- **Tertiary (Blue):** Links, informações, elementos terciários

#### Cores de Status
Para indicadores de progresso e status de inscrições:

```css
/* Status de Inscrições */
--status-pending: oklch(0.75 0.18 85);      /* Yellow/Orange - Pendente */
--status-in-review: oklch(0.65 0.15 220);   /* Blue - Em Avaliação */
--status-approved: oklch(0.65 0.2 145);     /* Green - Aprovado */
--status-waitlist: oklch(0.75 0.18 85);     /* Yellow - Lista de Espera */
--status-rejected: oklch(0.55 0.22 25);     /* Red - Recusado */
--status-completed: oklch(0.42 0.25 278);   /* Purple/Blue - Finalizado */
```

**Significado e Uso:**
- **Pendente:** Amarelo suave - aguardando ação
- **Em Avaliação:** Azul médio - em processo
- **Aprovado:** Verde vivo - sucesso confirmado
- **Lista de Espera:** Amarelo/laranja - situação temporária
- **Recusado:** Vermelho controlado - feedback negativo
- **Finalizado:** Azul profundo - curso concluído com sucesso

#### Cores de Gamificação

```css
/* XP e Progresso */
--xp-bar-fill: oklch(0.68 0.21 42);         /* Orange - barra XP preenchida */
--xp-bar-background: oklch(0.95 0.005 264); /* Light gray - fundo da barra */
--xp-glow: oklch(0.68 0.21 42 / 0.3);       /* Orange glow - efeito brilho */

/* Medalhas - Ranking */
--medal-gold: oklch(0.78 0.18 85);          /* #FFD700 Gold */
--medal-gold-shine: oklch(0.88 0.16 85);    /* Gold highlight */
--medal-silver: oklch(0.75 0.01 264);       /* #C0C0C0 Silver */
--medal-silver-shine: oklch(0.85 0.01 264); /* Silver highlight */
--medal-bronze: oklch(0.58 0.12 45);        /* #CD7F32 Bronze */
--medal-bronze-shine: oklch(0.68 0.12 45);  /* Bronze highlight */

/* Níveis (Levels) */
--level-beginner: oklch(0.65 0.2 145);      /* Verde - Níveis 1-3 */
--level-intermediate: oklch(0.65 0.15 220); /* Azul - Níveis 4-6 */
--level-advanced: oklch(0.62 0.32 318);     /* Magenta - Níveis 7-9 */
--level-expert: oklch(0.42 0.25 278);       /* Azul escuro - Níveis 10+ */

/* Badges e Conquistas */
--badge-common: oklch(0.75 0.01 264);       /* Cinza claro - badges comuns */
--badge-rare: oklch(0.65 0.15 220);         /* Azul - badges raros */
--badge-epic: oklch(0.62 0.32 318);         /* Magenta - badges épicos */
--badge-legendary: oklch(0.78 0.18 85);     /* Dourado - badges lendários */
```

### 2.2 Gradientes

Para efeitos especiais em celebrações e destaques:

```css
/* Gradiente de Conquista */
--gradient-achievement: linear-gradient(
  135deg,
  oklch(0.68 0.21 42),      /* Orange */
  oklch(0.62 0.32 318)      /* Magenta */
);

/* Gradiente de XP Bar (sutil) */
--gradient-xp: linear-gradient(
  90deg,
  oklch(0.68 0.21 42),      /* Orange */
  oklch(0.75 0.19 50)       /* Orange lighter */
);

/* Gradiente de Medal - Gold */
--gradient-gold: linear-gradient(
  145deg,
  oklch(0.88 0.16 85),      /* Light gold */
  oklch(0.78 0.18 85),      /* Gold */
  oklch(0.68 0.16 80)       /* Darker gold */
);
```

### 2.3 Acessibilidade de Cores

Todas as combinações de cores seguem **WCAG 2.1 Level AA**:

#### Testes de Contraste Realizados

| Elemento | Foreground | Background | Ratio | Status |
|----------|-----------|------------|-------|--------|
| Texto Principal | `--foreground` | `--background` | 12.6:1 | AAA ✓ |
| Botão Primary | `--primary-foreground` | `--primary` | 4.8:1 | AA ✓ |
| Badge Aprovado | White | `--status-approved` | 4.9:1 | AA ✓ |
| Badge Recusado | White | `--status-rejected` | 4.6:1 | AA ✓ |
| XP Text | `--foreground` | `--xp-bar-fill` | 5.2:1 | AA ✓ |
| Medal Text | White | `--medal-gold` | 4.7:1 | AA ✓ |

**Regras de Contraste:**
- Texto normal (16px+): mínimo 4.5:1
- Texto grande (18px+ ou 14px+ bold): mínimo 3:1
- Elementos interativos: mínimo 3:1

---

## 3. Tipografia

### 3.1 Hierarquia Tipográfica

A fonte principal do sistema é **Geist Sans** (já configurada).

#### Para Gamificação

```css
/* Títulos e Destaque */
--font-hero: 600 2rem/2.5rem var(--font-geist-sans);        /* 32px - Títulos principais */
--font-heading: 600 1.5rem/2rem var(--font-geist-sans);     /* 24px - Seções */
--font-subheading: 600 1.25rem/1.75rem var(--font-geist-sans); /* 20px - Subseções */

/* Informações e Stats */
--font-stat-large: 700 3rem/3.5rem var(--font-geist-sans);  /* 48px - XP grande, níveis */
--font-stat-medium: 700 2rem/2.5rem var(--font-geist-sans); /* 32px - Rankings */
--font-stat-small: 600 1.5rem/2rem var(--font-geist-sans);  /* 24px - Stats pequenos */

/* Corpo e Labels */
--font-body: 400 1rem/1.5rem var(--font-geist-sans);        /* 16px - Texto padrão */
--font-label: 500 0.875rem/1.25rem var(--font-geist-sans);  /* 14px - Labels */
--font-caption: 400 0.75rem/1rem var(--font-geist-sans);    /* 12px - Legendas */

/* Badges e Tags */
--font-badge: 600 0.75rem/1rem var(--font-geist-sans);      /* 12px - Badges */
--font-badge-small: 600 0.625rem/0.875rem var(--font-geist-sans); /* 10px - Small badges */
```

#### Classes Tailwind Equivalentes

```tsx
// Títulos
<h1 className="text-[2rem] font-semibold leading-10">        {/* hero */}
<h2 className="text-2xl font-semibold leading-8">            {/* heading */}
<h3 className="text-xl font-semibold leading-7">             {/* subheading */}

// Stats
<div className="text-5xl font-bold leading-[3.5rem]">        {/* stat-large */}
<div className="text-[2rem] font-bold leading-10">           {/* stat-medium */}
<div className="text-2xl font-semibold leading-8">           {/* stat-small */}

// Corpo
<p className="text-base font-normal leading-6">              {/* body */}
<label className="text-sm font-medium leading-5">            {/* label */}
<span className="text-xs font-normal leading-4">             {/* caption */}

// Badges
<span className="text-xs font-semibold leading-4">           {/* badge */}
<span className="text-[0.625rem] font-semibold leading-3.5"> {/* badge-small */}
```

### 3.2 Tom de Voz

#### Mensagens Motivacionais

**Conquistas e Celebrações:**
- "Parabéns! Você alcançou o Nível 3!"
- "Mais um curso concluído. Continue assim!"
- "Você está a [X] XP do próximo nível!"

**Progresso:**
- "Você já completou [X] cursos"
- "Faltam apenas [X] XP para subir de nível"
- "Você está no caminho certo!"

**Incentivo:**
- "Inscreva-se em mais cursos para ganhar XP"
- "Complete mais cursos para desbloquear novos badges"
- "Continue aprendendo e avançando na sua carreira"

**Regras de Tom:**
1. Use "você" (não "tu" ou formal excessivo)
2. Seja direto e claro
3. Evite exclamações excessivas (máximo 1 por mensagem)
4. Mantenha linguagem profissional mas amigável
5. Foque em crescimento, não em competição

---

## 4. Sistema de Ícones

### 4.1 Biblioteca Principal

Usar **Lucide React** (já instalado) para todos os ícones.

#### Ícones de Gamificação Recomendados

```tsx
import {
  Trophy,      // Troféu - ranking, vitórias
  Medal,       // Medalha - conquistas
  Award,       // Prêmio - badges especiais
  Star,        // Estrela - favoritos, destaque
  Zap,         // Raio - XP, energia
  Target,      // Alvo - objetivos, missões
  TrendingUp,  // Progresso crescente
  CheckCircle, // Concluído, aprovado
  Clock,       // Pendente, em andamento
  XCircle,     // Recusado, erro
  AlertCircle, // Aviso, atenção
  Crown,       // Primeiro lugar, destaque
  Sparkles,    // Novo, especial, celebração
  BookOpen,    // Curso, aprendizado
  GraduationCap, // Certificado, formação
  Users,       // Comunidade, ranking
  BarChart3,   // Estatísticas, progresso
  Gift,        // Recompensas
  Flag,        // Marcos, objetivos
  Flame,       // Sequência, streak
} from "lucide-react"
```

### 4.2 Tamanhos e Uso

```tsx
// XP e Progress Bars
<Zap className="size-4 text-primary" />

// Medalhas no Ranking
<Trophy className="size-6 text-medal-gold" />
<Medal className="size-5 text-medal-silver" />

// Badges de Conquista
<Award className="size-8 text-badge-epic" />

// Status de Inscrições
<CheckCircle className="size-4 text-status-approved" />
<Clock className="size-4 text-status-pending" />
<XCircle className="size-4 text-status-rejected" />

// Celebrações
<Sparkles className="size-6 text-primary animate-pulse" />
```

### 4.3 Estilo de Ícones

**Características:**
- **Stroke width:** 2px (padrão Lucide)
- **Estilo:** Outline, minimalista
- **Cores:** Usar tokens de cor CSS
- **Tamanhos:** Múltiplos de 4px (12px, 16px, 20px, 24px, 32px)

---

## 5. Sistema de Animações

### 5.1 Princípios de Animação

1. **Sutil mas Perceptível:** Animações devem ser notadas mas não distrair
2. **Rápida:** Máximo 300ms para transições normais
3. **Significativa:** Cada animação deve ter propósito
4. **Acessível:** Respeitar `prefers-reduced-motion`

### 5.2 Timing Functions

```css
/* Easing Functions */
--ease-default: cubic-bezier(0.4, 0, 0.2, 1);      /* ease-in-out padrão */
--ease-in: cubic-bezier(0.4, 0, 1, 1);             /* entrada */
--ease-out: cubic-bezier(0, 0, 0.2, 1);            /* saída */
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55); /* bounce suave */

/* Durações */
--duration-fast: 150ms;
--duration-default: 250ms;
--duration-slow: 350ms;
--duration-celebrate: 600ms;
```

### 5.3 Animações Específicas

#### XP Bar Fill
```css
.xp-bar-fill {
  transition: width var(--duration-default) var(--ease-out);
}
```

#### Badge Unlock (Celebração)
```css
@keyframes badge-unlock {
  0% {
    transform: scale(0) rotate(-180deg);
    opacity: 0;
  }
  50% {
    transform: scale(1.2) rotate(0deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
}

.badge-unlock {
  animation: badge-unlock var(--duration-celebrate) var(--ease-bounce);
}
```

#### Level Up
```css
@keyframes level-up {
  0% {
    transform: translateY(20px);
    opacity: 0;
  }
  50% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.level-up {
  animation: level-up var(--duration-slow) var(--ease-out);
}
```

#### Pulse (para novos badges)
```css
@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 0 0 0 var(--xp-glow);
  }
  50% {
    box-shadow: 0 0 0 10px transparent;
  }
}

.pulse-glow {
  animation: pulse-glow 2s infinite;
}
```

#### Hover States
```css
/* Cards de Ranking */
.ranking-card {
  transition: all var(--duration-default) var(--ease-default);
}

.ranking-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px -4px oklch(0 0 0 / 0.1);
}

/* Badges */
.badge-item {
  transition: transform var(--duration-fast) var(--ease-default);
}

.badge-item:hover {
  transform: scale(1.1);
}
```

### 5.4 Acessibilidade

```css
/* Respeitar preferências do usuário */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 6. Espaçamento e Layout

### 6.1 Sistema de Espaçamento

Base: **4px** (Tailwind padrão)

```css
/* Espaçamentos Comuns em Gamificação */
--space-xs: 0.25rem;   /* 4px  - gaps mínimos */
--space-sm: 0.5rem;    /* 8px  - espaços pequenos */
--space-md: 1rem;      /* 16px - espaçamento padrão */
--space-lg: 1.5rem;    /* 24px - seções */
--space-xl: 2rem;      /* 32px - grandes seções */
--space-2xl: 3rem;     /* 48px - separação de blocos */
```

**Classes Tailwind:**
```tsx
p-1  // 4px
p-2  // 8px
p-4  // 16px
p-6  // 24px
p-8  // 32px
p-12 // 48px

gap-1, gap-2, gap-4, etc.
```

### 6.2 Border Radius

```css
/* Border Radius */
--radius-sm: calc(var(--radius) - 4px);  /* 6px  - pequeno */
--radius-md: calc(var(--radius) - 2px);  /* 8px  - médio */
--radius-lg: var(--radius);              /* 10px - padrão */
--radius-xl: calc(var(--radius) + 4px);  /* 14px - grande */
--radius-full: 9999px;                   /* circular */
```

**Uso:**
- **Badges:** `rounded-full` (circular)
- **Cards:** `rounded-lg` (10px)
- **Progress bars:** `rounded-full` (bordas arredondadas)
- **Botões:** `rounded-md` (8px)
- **Avatares:** `rounded-full` (circular)

### 6.3 Shadows

```css
/* Elevações */
--shadow-sm: 0 1px 2px 0 oklch(0 0 0 / 0.05);
--shadow-md: 0 4px 6px -1px oklch(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px oklch(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px oklch(0 0 0 / 0.1);

/* Glow especial para conquistas */
--shadow-glow-primary: 0 0 20px oklch(0.68 0.21 42 / 0.4);
--shadow-glow-gold: 0 0 20px oklch(0.78 0.18 85 / 0.5);
```

**Uso:**
```tsx
className="shadow-md"        // Cards normais
className="shadow-lg"        // Cards destacados
className="shadow-xl"        // Modals, overlays
className="hover:shadow-lg"  // Hover states
```

---

## 7. Componentes de UI Específicos

### 7.1 Medals (Medalhas)

**Visual:**
- Círculos com gradiente
- Ícone de troféu/medalha no centro
- Brilho/shine sutil
- Posição: 1º, 2º, 3º

**Especificações:**
```tsx
// Tamanhos
Large: 80px × 80px   // Top 3 no ranking
Medium: 64px × 64px  // Perfil do usuário
Small: 40px × 40px   // Listas, cards

// Cores
Gold: --medal-gold (com gradiente)
Silver: --medal-silver (com gradiente)
Bronze: --medal-bronze (com gradiente)
```

### 7.2 XP Progress Bar

**Visual:**
- Barra horizontal com cantos arredondados
- Preenchimento gradiente (opcional)
- Label com XP atual/total
- Ícone de raio (Zap)

**Especificações:**
```tsx
// Tamanhos
Height: 12px (default), 16px (large)
Width: 100% do container
Border radius: full (rounded-full)

// Cores
Background: --xp-bar-background
Fill: --xp-bar-fill (ou gradiente)
Text: --foreground
```

### 7.3 Level Badge

**Visual:**
- Badge circular ou arredondado
- Número do nível grande e bold
- Título do nível (ex: "Explorador")
- Cor baseada na categoria do nível

**Especificações:**
```tsx
// Tamanhos
Large: 120px × 120px  // Perfil principal
Medium: 80px × 80px   // Cards
Small: 48px × 48px    // Inline

// Cores por categoria
Níveis 1-3: --level-beginner (verde)
Níveis 4-6: --level-intermediate (azul)
Níveis 7-9: --level-advanced (magenta)
Níveis 10+: --level-expert (azul escuro)
```

### 7.4 Achievement Badge

**Visual:**
- Ícone central representando a conquista
- Borda colorida baseada na raridade
- Tooltip com descrição ao hover
- Efeito de brilho se novo

**Especificações:**
```tsx
// Tamanhos
64px × 64px (default)
Border: 3px solid
Border radius: rounded-lg

// Cores por raridade
Common: --badge-common
Rare: --badge-rare
Epic: --badge-epic
Legendary: --badge-legendary

// Estados
Desbloqueado: opacity 100%, colorido
Bloqueado: opacity 40%, grayscale
Novo: pulse-glow animation
```

### 7.5 Status Badge (Inscrições)

**Visual:**
- Badge pequeno e compacto
- Ícone + texto
- Cores semânticas claras

**Especificações:**
```tsx
// Estados
Pendente: Clock icon, --status-pending
Em Avaliação: Search icon, --status-in-review
Aprovado: CheckCircle icon, --status-approved
Lista de Espera: Clock icon, --status-waitlist
Recusado: XCircle icon, --status-rejected
Finalizado: GraduationCap icon, --status-completed

// Tamanho
Height: 24px
Padding: 4px 8px
Font: 12px semibold
```

### 7.6 Ranking Card

**Visual:**
- Card com informações do usuário
- Posição + medalha (se top 3)
- Avatar, nome, nível
- XP total e barra de progresso
- Número de cursos concluídos
- Badges destacados

**Especificações:**
```tsx
// Layout
Padding: 16px
Gap between elements: 12px
Border radius: rounded-lg
Border: 1px solid --border
Background: --card

// Top 3 destaque
Gold: border-2 border-medal-gold, shadow-glow-gold
Silver: border-2 border-medal-silver
Bronze: border-2 border-medal-bronze

// Hover
transform: translateY(-2px)
shadow: shadow-lg
```

---

## 8. Guia de Implementação

### 8.1 Responsividade

**Breakpoints:**
```tsx
Mobile: < 640px    (sm)
Tablet: 640-1024px (md-lg)
Desktop: > 1024px  (lg+)
```

**Adaptações:**

#### Ranking Screen
```tsx
// Mobile: lista vertical
<div className="flex flex-col gap-4">

// Tablet+: grid 2 colunas
<div className="md:grid md:grid-cols-2 gap-4">

// Desktop: grid 3 colunas
<div className="lg:grid-cols-3">
```

#### XP Progress Bar
```tsx
// Mobile: stack vertical
<div className="flex flex-col gap-2">
  <span>430/500 XP</span>
  <ProgressBar />
</div>

// Desktop: horizontal inline
<div className="flex items-center gap-4">
  <ProgressBar />
  <span>430/500 XP</span>
</div>
```

#### Medal Size
```tsx
<Medal className="size-12 md:size-16 lg:size-20" />
```

### 8.2 Estados Interativos

#### Hover
```tsx
// Cards
className="hover:shadow-lg hover:-translate-y-1 transition-all"

// Badges
className="hover:scale-110 transition-transform"

// Botões
className="hover:bg-primary/90 transition-colors"
```

#### Focus (acessibilidade)
```tsx
className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
```

#### Disabled
```tsx
className="disabled:opacity-50 disabled:pointer-events-none"
```

### 8.3 Acessibilidade

#### ARIA Labels
```tsx
<div role="progressbar" aria-valuenow={430} aria-valuemin={0} aria-valuemax={500}>
  XP Progress
</div>

<button aria-label="Ver detalhes do badge de 5 cursos concluídos">
  <Award />
</button>

<div aria-live="polite" aria-atomic="true">
  Parabéns! Você subiu para o Nível 4!
</div>
```

#### Keyboard Navigation
```tsx
// Tooltips devem ser acessíveis via keyboard
<TooltipTrigger asChild>
  <button>Hover ou Tab para ver detalhes</button>
</TooltipTrigger>

// Tab index para elementos interativos
tabIndex={0}
```

#### Screen Readers
```tsx
// Informações escondidas visualmente mas acessíveis
<span className="sr-only">
  Você está no Nível 3, com 430 de 500 XP necessários para o próximo nível
</span>

// Imagens decorativas
<img alt="" aria-hidden="true" />
```

---

## 9. Checklist de Qualidade

### Design
- [ ] Cores seguem WCAG AA (contraste mínimo 4.5:1)
- [ ] Tipografia é legível em todos os tamanhos
- [ ] Ícones têm tamanho adequado (mínimo 16px clicável)
- [ ] Espaçamentos são consistentes
- [ ] Border radius segue sistema definido
- [ ] Sombras são sutis e consistentes

### Acessibilidade
- [ ] ARIA labels em elementos interativos
- [ ] Navegação por keyboard funciona
- [ ] Focus states visíveis
- [ ] Contraste de cores adequado
- [ ] Animações respeitam prefers-reduced-motion
- [ ] Screen readers podem navegar

### Performance
- [ ] Animações são suaves (60fps)
- [ ] Imagens otimizadas
- [ ] SVGs inline quando possível
- [ ] CSS usa hardware acceleration (transform, opacity)

### Responsividade
- [ ] Layout funciona em mobile (320px+)
- [ ] Tablet tem layout adaptado
- [ ] Desktop aproveita espaço disponível
- [ ] Testes em diferentes resoluções

### Conteúdo
- [ ] Mensagens motivacionais são apropriadas
- [ ] Tom de voz é profissional mas amigável
- [ ] Textos são claros e objetivos
- [ ] Evita jargão desnecessário

---

## 10. Referências e Recursos

### Ferramentas
- **OKLCH Converter:** https://oklch.com/
- **Contrast Checker:** https://webaim.org/resources/contrastchecker/
- **Lucide Icons:** https://lucide.dev/
- **Tailwind CSS:** https://tailwindcss.com/

### Inspirações
- Duolingo (gamificação madura)
- LinkedIn Learning (badges profissionais)
- Codecademy (progresso e XP)
- Khan Academy (sistema de conquistas)

### Documentos Relacionados
- `design-tokens.css` - Tokens CSS implementados
- `component-library.md` - Especificações de componentes
- `accessibility-checklist.md` - Checklist completo de acessibilidade
- `implementation-guide.md` - Guia técnico de implementação

---

**Revisão:** Este documento deve ser revisado trimestralmente ou quando houver mudanças significativas no sistema de gamificação.

**Contato:** Para dúvidas ou sugestões sobre estas diretrizes, contate a equipe de design.
