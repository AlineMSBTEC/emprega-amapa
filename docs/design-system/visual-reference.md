# Visual Reference Guide - Gamification System

## Visão Geral

Este documento fornece exemplos visuais e casos de uso para todos os componentes do sistema de gamificação, facilitando a compreensão de como os elementos devem ser usados em contextos reais.

**Última atualização:** 2025-09-30
**Versão:** 1.0

---

## Índice

1. [Tela de Ranking](#tela-de-ranking)
2. [Tela de Minhas Inscrições](#tela-de-minhas-inscrições)
3. [Componentes Isolados](#componentes-isolados)
4. [Estados e Variações](#estados-e-variações)
5. [Responsive Layouts](#responsive-layouts)
6. [Casos de Uso](#casos-de-uso)

---

## Tela de Ranking

### Layout Desktop (1440px+)

```
┌─────────────────────────────────────────────────────────────────────────┐
│  HEADER                                                                  │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  Ranking de Candidatos                                           │   │
│  │  Veja os candidatos mais dedicados e inspire-se                  │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│  FILTROS                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                 │
│  │ Especialidade│  │ Município    │  │ Nível        │                 │
│  │ [Dropdown]   │  │ [Dropdown]   │  │ [Range]      │                 │
│  └──────────────┘  └──────────────┘  └──────────────┘                 │
│                                                                          │
│  TOP 3 - DESTAQUE                                                        │
│  ┌───────────────────────────────────────────────────────────────────┐ │
│  │  ┌──────────┐     ┌──────────┐     ┌──────────┐                   │ │
│  │  │    🥈    │     │    🥇    │     │    🥉    │                   │ │
│  │  │   #2     │     │   #1     │     │   #3     │                   │ │
│  │  │  [IMG]   │     │  [IMG]   │     │  [IMG]   │                   │ │
│  │  │  Maria   │     │  João    │     │  Pedro   │                   │ │
│  │  │  Nv 7    │     │  Nv 8    │     │  Nv 6    │                   │ │
│  │  │ 1150 XP  │     │ 1250 XP  │     │ 950 XP   │                   │ │
│  │  │ 14 cursos│     │ 15 cursos│     │ 12 cursos│                   │ │
│  │  └──────────┘     └──────────┘     └──────────┘                   │ │
│  └───────────────────────────────────────────────────────────────────┘ │
│                                                                          │
│  RANKING COMPLETO                                                        │
│  ┌───────────────────────────────────────────────────────────────────┐ │
│  │ #4  [IMG]  Ana Silva          Nv 6 | ⚡800 XP | 📚10 cursos      │ │
│  │            ████████████████░░░░░░░░ (75%)                         │ │
│  │            🏆 🏆 🏆 🏆 🏆                                          │ │
│  ├───────────────────────────────────────────────────────────────────┤ │
│  │ #5  [IMG]  Carlos Mendes      Nv 5 | ⚡700 XP | 📚9 cursos       │ │
│  │            ██████████████░░░░░░░░░░ (65%)                         │ │
│  │            🏆 🏆 🏆 🏆                                             │ │
│  ├───────────────────────────────────────────────────────────────────┤ │
│  │ ...                                                                │ │
│  └───────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────┘
```

### Layout Mobile (< 768px)

```
┌──────────────────────────────┐
│  Ranking de Candidatos       │
│                              │
│  [Filtros Button]            │
│                              │
│  ┌──────────────────────────┐│
│  │      🥇                  ││
│  │      #1                  ││
│  │    [Avatar]              ││
│  │   João Silva             ││
│  │  Nível 8 - Expert        ││
│  │  ⚡ 1250 XP              ││
│  │  📚 15 cursos            ││
│  │  ████████████████ (85%)  ││
│  └──────────────────────────┘│
│                              │
│  ┌──────────────────────────┐│
│  │  #2  [IMG] Maria Santos  ││
│  │  Nível 7 | 1150 XP       ││
│  │  █████████████░░ (70%)   ││
│  └──────────────────────────┘│
│                              │
│  ┌──────────────────────────┐│
│  │  #3  [IMG] Pedro Costa   ││
│  │  Nível 6 | 950 XP        ││
│  │  ███████████░░░░ (60%)   ││
│  └──────────────────────────┘│
│                              │
│  [Carregar mais...]          │
└──────────────────────────────┘
```

---

## Tela de Minhas Inscrições

### Layout Desktop (1440px+)

```
┌─────────────────────────────────────────────────────────────────────────┐
│  HEADER                                                                  │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  Minhas Inscrições                                               │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│  PAINEL DE PERFIL GAMIFICADO                                             │
│  ┌───────────────────────────────────────────────────────────────────┐ │
│  │  [Avatar 120px]        João Silva                                 │ │
│  │                        Nível 3 - Explorador                       │ │
│  │                        ⚡ 430/500 XP para o Nível 4              │ │
│  │                        ████████████████░░░░░░ (86%)               │ │
│  │                                                                   │ │
│  │  📚 12 cursos  |  🏆 8 badges  |  🔥 5 dias                      │ │
│  └───────────────────────────────────────────────────────────────────┘ │
│                                                                          │
│  ┌─────────────────────────────────┐  ┌──────────────────────────────┐ │
│  │  CURSOS E INSCRIÇÕES            │  │  CONQUISTAS                  │ │
│  │                                 │  │                              │ │
│  │  ┌─────────────────────────────┐│  │  ┌─────┐ ┌─────┐ ┌─────┐  │ │
│  │  │ Desenvolvimento Web         ││  │  │ 🏆  │ │ ⭐  │ │ 🎯  │  │ │
│  │  │ SENAC                       ││  │  │Rare │ │Epic │ │Rare │  │ │
│  │  │ ✅ Aprovado     +50 XP ⚡   ││  │  └─────┘ └─────┘ └─────┘  │ │
│  │  │ [Download Certificado]      ││  │                              │ │
│  │  └─────────────────────────────┘│  │  ┌─────┐ ┌─────┐ ┌─────┐  │ │
│  │                                 │  │  │ 🏅  │ │ 🔒  │ │ 🔒  │  │ │
│  │  ┌─────────────────────────────┐│  │  │Common│ │Lock │ │Lock │  │ │
│  │  │ Marketing Digital           ││  │  └─────┘ └─────┘ └─────┘  │ │
│  │  │ SEBRAE                      ││  │                              │ │
│  │  │ ⏱️ Pendente                 ││  │  MISSÕES DIÁRIAS            │ │
│  │  │                             ││  │  ☐ Complete 1 curso         │ │
│  │  └─────────────────────────────┘│  │  ☐ Envie certificado        │ │
│  │                                 │  │  ☑ Visite o ranking         │ │
│  │  ┌─────────────────────────────┐│  │                              │ │
│  │  │ Excel Avançado              ││  │  PRÓXIMO MARCO              │ │
│  │  │ SENAI                       ││  │  🎯 5 cursos concluídos     │ │
│  │  │ 🎓 Finalizado   +50 XP ⚡   ││  │  Faltam 2 cursos            │ │
│  │  │ [Ver Certificado]           ││  │  Recompensa: Badge Épico    │ │
│  │  └─────────────────────────────┘│  │                              │ │
│  └─────────────────────────────────┘  └──────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────┘
```

### Layout Mobile (< 768px)

```
┌──────────────────────────────┐
│  Minhas Inscrições           │
│                              │
│  ┌──────────────────────────┐│
│  │    [Avatar 80px]         ││
│  │    João Silva            ││
│  │    Nível 3 - Explorador  ││
│  │    ⚡ 430/500 XP         ││
│  │    ██████████░░░░ (86%)  ││
│  │                          ││
│  │    📚 12  🏆 8  🔥 5     ││
│  └──────────────────────────┘│
│                              │
│  [Tab: Cursos] [Tab: Badges] │
│                              │
│  ┌──────────────────────────┐│
│  │ Desenvolvimento Web      ││
│  │ SENAC                    ││
│  │ ✅ Aprovado   +50 XP     ││
│  │ [Download Certificado]   ││
│  └──────────────────────────┘│
│                              │
│  ┌──────────────────────────┐│
│  │ Marketing Digital        ││
│  │ SEBRAE                   ││
│  │ ⏱️ Pendente              ││
│  └──────────────────────────┘│
│                              │
│  [Carregar mais...]          │
└──────────────────────────────┘
```

---

## Componentes Isolados

### XP Progress Bar

#### Variante Default
```
┌──────────────────────────────────────────┐
│ ⚡ 430/500 XP                      86%   │
│ ████████████████████████░░░░░░░░         │
│ Faltam 70 XP para o próximo nível       │
└──────────────────────────────────────────┘
```

#### Variante Gradient
```
┌──────────────────────────────────────────┐
│ ⚡ 850/1000 XP                     85%   │
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░         │
│ Faltam 150 XP para o próximo nível      │
└──────────────────────────────────────────┘
```

#### Small (sem texto)
```
██████████████████████░░░░░░░░░░ (75%)
```

---

### Level Badge

#### Small
```
┌──────────┐
│ NÍVEL 3  │
└──────────┘
```

#### Medium
```
┌─────────────┐
│   NÍVEL 3   │
│  Explorador │
└─────────────┘
```

#### Large com Stars
```
┌─────────────┐
│   NÍVEL 8   │
│    Expert   │
│  ★★★★★     │
└─────────────┘
```

#### Cores por Categoria

**Beginner (Verde):**
```
┌─────────────┐
│   NÍVEL 2   │  [Verde claro]
│   Aprendiz  │
└─────────────┘
```

**Intermediate (Azul):**
```
┌─────────────┐
│   NÍVEL 5   │  [Azul claro]
│   Dedicado  │
└─────────────┘
```

**Advanced (Magenta):**
```
┌─────────────┐
│   NÍVEL 7   │  [Magenta claro]
│   Avançado  │
└─────────────┘
```

**Expert (Azul Escuro):**
```
┌─────────────┐
│  NÍVEL 10   │  [Azul escuro]
│    Lenda    │
└─────────────┘
```

---

### Status Badges

```
⏱️ Pendente          [Amarelo suave]
🔍 Em Avaliação      [Azul médio]
✅ Aprovado          [Verde vivo]
⏳ Lista de Espera   [Amarelo/laranja]
❌ Recusado          [Vermelho controlado]
🎓 Finalizado        [Azul escuro/roxo]
```

---

### Medals

#### Top 3 Display
```
    🥈               🥇               🥉
  Silver            Gold            Bronze
    #2               #1               #3
```

#### Com Glow (Gold)
```
    ✨
   🥇  ← [Brilho dourado]
    ✨
```

---

### Achievement Badges

#### Unlocked - Rarity Examples

**Common (Cinza):**
```
┌─────────┐
│   📚    │
│ 1 Curso │
└─────────┘
```

**Rare (Azul):**
```
┌─────────┐
│   🏆    │
│5 Cursos │
└─────────┘
```

**Epic (Magenta):**
```
┌─────────┐
│   ⭐    │
│10 Cursos│
└─────────┘
```

**Legendary (Dourado):**
```
    ✨
┌─────────┐
│   👑    │  ← [Brilho especial]
│20 Cursos│
└─────────┘
    ✨
```

#### Locked
```
┌─────────┐
│   🔒    │  [Grayscale, opacity 40%]
│ Locked  │
└─────────┘
```

---

## Estados e Variações

### Ranking Card - Estados

#### Normal (Position > 3)
```
┌────────────────────────────────────────┐
│ #4  [IMG]  Ana Silva                   │
│            Nível 6 - Comprometido      │
│            ⚡ 800 XP  📚 10 cursos     │
│            ████████████░░░░░░ (65%)    │
│            🏆 🏆 🏆 🏆                 │
└────────────────────────────────────────┘
```

#### Top 3 - Gold Border
```
┌════════════════════════════════════════┐
║ #1  🥇  [IMG]  João Silva             ║ ← Border dourada
║             Nível 8 - Expert          ║   + Shadow glow
║             ⚡ 1250 XP  📚 15 cursos  ║
║             ████████████████ (85%)    ║
║             🏆 🏆 🏆 🏆 🏆 🏆         ║
└════════════════════════════════════════┘
```

#### Hover State
```
┌────────────────────────────────────────┐
│ #5  [IMG]  Carlos Mendes               │ ↑ translateY(-2px)
│            Nível 5 - Dedicado          │   + shadow-lg
│            ⚡ 700 XP  📚 9 cursos      │
│            ██████████████░░░░ (60%)    │
│            🏆 🏆 🏆 🏆                 │
└────────────────────────────────────────┘
```

---

### Course Card - Estados

#### Pendente
```
┌──────────────────────────────┐
│ [Imagem do Curso]            │
├──────────────────────────────┤
│ Marketing Digital            │
│ SEBRAE                       │
│ ⏱️ Pendente                  │
│                              │
│ [Ver Detalhes]               │
└──────────────────────────────┘
```

#### Aprovado
```
┌──────────────────────────────┐
│ [Imagem do Curso]            │
├──────────────────────────────┤
│ Desenvolvimento Web          │
│ SENAC                        │
│ ✅ Aprovado      +50 XP ⚡   │
│                              │
│ [Acessar Curso]              │
└──────────────────────────────┘
```

#### Finalizado com Certificado
```
┌──────────────────────────────┐
│ [Imagem do Curso]            │
├──────────────────────────────┤
│ Excel Avançado               │
│ SENAI                        │
│ 🎓 Finalizado    +50 XP ⚡   │
│                              │
│ [Download Certificado] 📥    │
└──────────────────────────────┘
```

---

## Responsive Layouts

### Breakpoints

```
Mobile:     < 640px   (1 coluna)
Tablet:  640-1024px   (2 colunas)
Desktop:   > 1024px   (3 colunas ou mais)
```

### Grid Adaptation

#### Desktop (3 colunas)
```
┌──────┐ ┌──────┐ ┌──────┐
│ Card │ │ Card │ │ Card │
└──────┘ └──────┘ └──────┘
┌──────┐ ┌──────┐ ┌──────┐
│ Card │ │ Card │ │ Card │
└──────┘ └──────┘ └──────┘
```

#### Tablet (2 colunas)
```
┌──────┐ ┌──────┐
│ Card │ │ Card │
└──────┘ └──────┘
┌──────┐ ┌──────┐
│ Card │ │ Card │
└──────┘ └──────┘
```

#### Mobile (1 coluna)
```
┌──────┐
│ Card │
└──────┘
┌──────┐
│ Card │
└──────┘
┌──────┐
│ Card │
└──────┘
```

---

## Casos de Uso

### Caso 1: Usuário Completa Primeiro Curso

**Sequência de Eventos:**

1. **Curso finalizado** → Status muda para "Finalizado"
2. **XP adicionado** → +50 XP (curso) + 25 XP (primeiro curso bonus)
3. **Badge desbloqueado** → "Primeiro Passo" (Common)
4. **Notificação Toast:**
```
┌────────────────────────────────┐
│ 🎉 Badge Desbloqueado!         │
│ [📚] Primeiro Passo            │
│ Complete seu primeiro curso    │
└────────────────────────────────┘
```

5. **XP Bar atualizada** → Animação de preenchimento
6. **Badge aparece** → Com animação "badge-unlock"

---

### Caso 2: Usuário Sobe de Nível

**Sequência de Eventos:**

1. **XP atinge threshold** → Ex: 250 XP (Nível 2 → Nível 3)
2. **Modal de Level Up:**
```
┌──────────────────────────────────┐
│        ✨ PARABÉNS! ✨           │
│                                  │
│  Você alcançou o Nível 3!       │
│                                  │
│  ┌─────────────┐                │
│  │   NÍVEL 3   │ [Animado]      │
│  │  Explorador │                │
│  │  ★★★☆☆     │                │
│  └─────────────┘                │
│                                  │
│  Continue aprendendo e          │
│  crescendo!                     │
│                                  │
│       [Continuar]                │
└──────────────────────────────────┘
```

3. **XP Bar reseta** → Começa do 0 para o novo nível
4. **Level Badge atualiza** → Nova cor se mudou de categoria
5. **Ranking atualizado** → Posição pode mudar

---

### Caso 3: Usuário Entra no Top 3

**Mudanças Visuais:**

**Antes (Posição #4):**
```
┌────────────────────────────────────────┐
│ #4  [IMG]  João Silva                  │
│            Nível 7 - Avançado          │
│            ⚡ 1100 XP  📚 14 cursos    │
└────────────────────────────────────────┘
```

**Depois (Posição #3):**
```
┌════════════════════════════════════════┐
║ #3  🥉  [IMG]  João Silva             ║ ← Bronze border
║             Nível 7 - Avançado        ║   + Medal
║             ⚡ 1150 XP  📚 15 cursos  ║
└════════════════════════════════════════┘
```

**Notificação:**
```
┌────────────────────────────────┐
│ 🏆 Parabéns!                   │
│ Você entrou no Top 3!          │
│ Posição: #3                    │
└────────────────────────────────┘
```

---

### Caso 4: Usuário Atinge Milestone (10 Cursos)

**Recompensas:**

1. **XP Bonus** → +200 XP (milestone)
2. **Badge Epic** → "Maratonista"
3. **Possível Level Up** → Dependendo do XP total
4. **Celebração Especial:**

```
┌──────────────────────────────────┐
│        🎊 MARCO ALCANÇADO! 🎊    │
│                                  │
│   10 Cursos Concluídos!          │
│                                  │
│     ┌─────────┐                 │
│     │   🏆    │ [Animado]       │
│     │Maratoni│                  │
│     │  sta   │                  │
│     └─────────┘                 │
│                                  │
│   Bonus: +200 XP                 │
│                                  │
│       [Continuar]                │
└──────────────────────────────────┘
```

---

## Color Swatches

### Status Colors (Light Mode)

```
Pendente:       ████  oklch(0.75 0.18 85)  - Amarelo suave
Em Avaliação:   ████  oklch(0.65 0.15 220) - Azul médio
Aprovado:       ████  oklch(0.65 0.2 145)  - Verde vivo
Lista Espera:   ████  oklch(0.75 0.18 85)  - Amarelo
Recusado:       ████  oklch(0.55 0.22 25)  - Vermelho
Finalizado:     ████  oklch(0.42 0.25 278) - Azul escuro
```

### Medal Colors

```
Gold:   ████  oklch(0.78 0.18 85)  - #FFD700
Silver: ████  oklch(0.75 0.01 264) - #C0C0C0
Bronze: ████  oklch(0.58 0.12 45)  - #CD7F32
```

### Level Categories

```
Beginner (1-3):      ████  oklch(0.65 0.2 145)  - Verde
Intermediate (4-6):  ████  oklch(0.65 0.15 220) - Azul
Advanced (7-9):      ████  oklch(0.62 0.32 318) - Magenta
Expert (10+):        ████  oklch(0.42 0.25 278) - Azul escuro
```

### Badge Rarities

```
Common:     ████  oklch(0.75 0.01 264) - Cinza
Rare:       ████  oklch(0.65 0.15 220) - Azul
Epic:       ████  oklch(0.62 0.32 318) - Magenta
Legendary:  ████  oklch(0.78 0.18 85)  - Dourado
```

---

## Animation Timings

```
Fast:       150ms  - Hover states, small transitions
Default:    250ms  - Standard transitions
Slow:       350ms  - Larger transitions
Celebrate:  600ms  - Special celebrations, level ups
```

---

## Icon Reference

### Gamification Icons (Lucide)

```
Trophy          🏆  - Ranking, vitórias, top position
Medal           🏅  - Conquistas, badges
Award           🎖️  - Prêmios especiais
Star            ⭐  - Favoritos, destaque
Zap             ⚡  - XP, energia
Target          🎯  - Objetivos, missões
TrendingUp      📈  - Progresso crescente
CheckCircle     ✅  - Concluído, aprovado
Clock           ⏱️  - Pendente, em andamento
XCircle         ❌  - Recusado, erro
AlertCircle     ⚠️  - Aviso, atenção
Crown           👑  - Primeiro lugar
Sparkles        ✨  - Novo, especial, celebração
BookOpen        📚  - Curso, aprendizado
GraduationCap   🎓  - Certificado, formação
Users           👥  - Comunidade, ranking
BarChart3       📊  - Estatísticas, progresso
Gift            🎁  - Recompensas
Flag            🚩  - Marcos, objetivos
Flame           🔥  - Sequência, streak
```

---

## Typography Hierarchy Example

```
┌──────────────────────────────────────┐
│  Ranking de Candidatos               │ ← H1: 32px bold
│  Veja os candidatos mais dedicados   │ ← Body: 16px regular
│                                      │
│  Top Candidatos                      │ ← H2: 24px bold
│                                      │
│  João Silva                          │ ← H3: 20px semibold
│  Nível 8 - Expert                    │ ← Label: 14px medium
│  1250 XP                             │ ← Stat: 32px bold
│  Faltam 150 XP para o próximo nível │ ← Caption: 12px regular
└──────────────────────────────────────┘
```

---

## Spacing Scale

```
xs:   4px   ▪
sm:   8px   ▪▪
md:  16px   ▪▪▪▪
lg:  24px   ▪▪▪▪▪▪
xl:  32px   ▪▪▪▪▪▪▪▪
2xl: 48px   ▪▪▪▪▪▪▪▪▪▪▪▪
```

**Exemplo de Uso:**
```
┌──────────────────────────────┐
│ ◄─── 16px (md) ───►          │
│  [Content]                   │
│       ▲                      │
│       │                      │
│    24px (lg)                 │
│       │                      │
│       ▼                      │
│  [Content]                   │
└──────────────────────────────┘
```

---

## Border Radius Scale

```
sm:   6px   ┌──┐
md:   8px   ┌───┐
lg:  10px   ┌────┐
xl:  14px   ┌─────┐
full: 999px  ●
```

---

**Este guia visual serve como referência rápida para implementação. Para especificações técnicas detalhadas, consulte os outros documentos do design system.**

---

**Última atualização:** 2025-09-30
**Versão:** 1.0
