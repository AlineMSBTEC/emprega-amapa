# Component Library - Gamification System

## Visão Geral

Este documento especifica todos os componentes UI necessários para implementar o sistema de gamificação do Emprega Amapá.

**Última atualização:** 2025-09-30
**Versão:** 1.0

---

## Índice

1. [XP Progress Bar](#1-xp-progress-bar)
2. [Level Badge](#2-level-badge)
3. [Medal Component](#3-medal-component)
4. [Achievement Badge](#4-achievement-badge)
5. [Status Badge](#5-status-badge)
6. [Ranking Card](#6-ranking-card)
7. [Course Card Gamified](#7-course-card-gamified)
8. [Profile Panel Gamified](#8-profile-panel-gamified)
9. [Level Up Modal](#9-level-up-modal)
10. [Achievement Unlock Toast](#10-achievement-unlock-toast)
11. [Tooltip Component](#11-tooltip-component)
12. [Filter Controls](#12-filter-controls)

---

## 1. XP Progress Bar

### Descrição
Barra de progresso horizontal mostrando XP atual e necessário para o próximo nível.

### Visual
```
┌──────────────────────────────────────────┐
│ ⚡ 430/500 XP                            │
│ ████████████████░░░░░░░░░░░░ (86%)      │
│ Faltam 70 XP para o Nível 4             │
└──────────────────────────────────────────┘
```

### Anatomia
- **Icon (Zap):** 16px, cor primary
- **Label:** "X/Y XP" - font-label, bold
- **Progress Bar:** altura 12px, largura 100%
  - Background: `--xp-bar-background`
  - Fill: `--xp-bar-fill` ou `--gradient-xp`
  - Border radius: full
- **Helper Text:** "Faltam X XP..." - font-caption, muted

### Props / API

```tsx
interface XPProgressBarProps {
  currentXP: number
  targetXP: number
  size?: 'default' | 'large' | 'small'
  showLabel?: boolean
  showHelperText?: boolean
  variant?: 'solid' | 'gradient'
}
```

### Exemplo de Uso

```tsx
import { XPProgressBar } from "@/components/gamification/xp-progress-bar"

<XPProgressBar
  currentXP={430}
  targetXP={500}
  showLabel={true}
  showHelperText={true}
  variant="gradient"
/>
```

### Código de Implementação

```tsx
"use client"

import { Zap } from "lucide-react"
import { cn } from "@/lib/utils"

interface XPProgressBarProps {
  currentXP: number
  targetXP: number
  size?: 'default' | 'large' | 'small'
  showLabel?: boolean
  showHelperText?: boolean
  variant?: 'solid' | 'gradient'
  className?: string
}

export function XPProgressBar({
  currentXP,
  targetXP,
  size = 'default',
  showLabel = true,
  showHelperText = false,
  variant = 'solid',
  className
}: XPProgressBarProps) {
  const percentage = Math.min((currentXP / targetXP) * 100, 100)
  const remaining = Math.max(targetXP - currentXP, 0)

  const heights = {
    small: 'h-2',
    default: 'h-3',
    large: 'h-4'
  }

  return (
    <div className={cn("space-y-2", className)}>
      {showLabel && (
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1.5 font-semibold">
            <Zap className="size-4 text-primary" />
            <span>{currentXP}/{targetXP} XP</span>
          </div>
          <span className="text-muted-foreground">{Math.round(percentage)}%</span>
        </div>
      )}

      <div
        className={cn(
          "w-full bg-xp-bar-background rounded-full overflow-hidden border border-xp-bar-border",
          heights[size]
        )}
        role="progressbar"
        aria-valuenow={currentXP}
        aria-valuemin={0}
        aria-valuemax={targetXP}
        aria-label={`${currentXP} de ${targetXP} XP`}
      >
        <div
          className={cn(
            "h-full transition-all duration-300 ease-out",
            variant === 'gradient'
              ? "bg-gradient-to-r from-[oklch(0.68_0.21_42)] to-[oklch(0.75_0.19_50)]"
              : "bg-[oklch(0.68_0.21_42)]"
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {showHelperText && remaining > 0 && (
        <p className="text-xs text-muted-foreground">
          Faltam {remaining} XP para o próximo nível
        </p>
      )}
    </div>
  )
}
```

### Estados
- **Default:** XP atual < target
- **Completed:** XP atual >= target (100%)
- **Empty:** currentXP = 0

### Acessibilidade
- `role="progressbar"`
- `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- `aria-label` descritivo

---

## 2. Level Badge

### Descrição
Badge mostrando nível atual do usuário com cor baseada na categoria.

### Visual
```
┌─────────────┐
│   NÍVEL 3   │
│  Explorador │
│  ★★★☆☆     │
└─────────────┘
```

### Anatomia
- **Container:** padding 12-16px, border 2px, rounded-lg
- **Level Number:** font-stat-small, bold
- **Level Title:** font-label
- **Stars (opcional):** representação visual do nível
- **Background:** baseado na categoria do nível

### Props / API

```tsx
interface LevelBadgeProps {
  level: number
  title?: string
  size?: 'small' | 'medium' | 'large'
  showStars?: boolean
}
```

### Categorias de Nível

| Nível | Categoria | Cor | Título Sugerido |
|-------|-----------|-----|-----------------|
| 1-3 | Beginner | Verde | Iniciante / Explorador / Aprendiz |
| 4-6 | Intermediate | Azul | Estudante / Dedicado / Comprometido |
| 7-9 | Advanced | Magenta | Avançado / Expert / Mestre |
| 10+ | Expert | Azul Escuro | Lenda / Guru / Profissional |

### Exemplo de Uso

```tsx
import { LevelBadge } from "@/components/gamification/level-badge"

<LevelBadge
  level={3}
  title="Explorador"
  size="medium"
  showStars={true}
/>
```

### Código de Implementação

```tsx
import { cn } from "@/lib/utils"
import { Star } from "lucide-react"

interface LevelBadgeProps {
  level: number
  title?: string
  size?: 'small' | 'medium' | 'large'
  showStars?: boolean
  className?: string
}

const levelTitles: Record<number, string> = {
  1: "Iniciante",
  2: "Aprendiz",
  3: "Explorador",
  4: "Estudante",
  5: "Dedicado",
  6: "Comprometido",
  7: "Avançado",
  8: "Expert",
  9: "Mestre",
  10: "Lenda"
}

function getLevelCategory(level: number) {
  if (level <= 3) return 'beginner'
  if (level <= 6) return 'intermediate'
  if (level <= 9) return 'advanced'
  return 'expert'
}

export function LevelBadge({
  level,
  title,
  size = 'medium',
  showStars = false,
  className
}: LevelBadgeProps) {
  const category = getLevelCategory(level)
  const displayTitle = title || levelTitles[level] || `Nível ${level}`

  const sizes = {
    small: "text-sm p-2",
    medium: "text-base p-3",
    large: "text-xl p-4"
  }

  const categoryClasses = {
    beginner: "level-beginner",
    intermediate: "level-intermediate",
    advanced: "level-advanced",
    expert: "level-expert"
  }

  return (
    <div
      className={cn(
        "inline-flex flex-col items-center justify-center rounded-lg border-2",
        sizes[size],
        categoryClasses[category],
        className
      )}
    >
      <div className="text-2xl font-bold">NÍVEL {level}</div>
      <div className="text-sm font-medium">{displayTitle}</div>

      {showStars && (
        <div className="flex gap-0.5 mt-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                "size-3",
                i < Math.min(level, 5) ? "fill-current" : "fill-none"
              )}
            />
          ))}
        </div>
      )}
    </div>
  )
}
```

---

## 3. Medal Component

### Descrição
Medalha visual para Top 3 do ranking (ouro, prata, bronze).

### Visual
```
   🥇        🥈        🥉
  Gold     Silver    Bronze
   #1        #2        #3
```

### Anatomia
- **Container:** circular, tamanho configurável
- **Gradient Background:** baseado no tipo de medalha
- **Icon:** Trophy ou Medal (Lucide)
- **Position Number:** opcional, abaixo da medalha
- **Glow Effect:** sombra especial para gold

### Props / API

```tsx
interface MedalProps {
  type: 'gold' | 'silver' | 'bronze'
  size?: 'small' | 'medium' | 'large'
  showPosition?: boolean
  position?: number
}
```

### Tamanhos

- **small:** 40px × 40px
- **medium:** 64px × 64px
- **large:** 80px × 80px

### Exemplo de Uso

```tsx
import { Medal } from "@/components/gamification/medal"

<Medal
  type="gold"
  size="large"
  showPosition={true}
  position={1}
/>
```

### Código de Implementação

```tsx
import { Trophy } from "lucide-react"
import { cn } from "@/lib/utils"

interface MedalProps {
  type: 'gold' | 'silver' | 'bronze'
  size?: 'small' | 'medium' | 'large'
  showPosition?: boolean
  position?: number
  className?: string
}

export function Medal({
  type,
  size = 'medium',
  showPosition = false,
  position,
  className
}: MedalProps) {
  const sizes = {
    small: { container: "size-10", icon: "size-5" },
    medium: { container: "size-16", icon: "size-8" },
    large: { container: "size-20", icon: "size-10" }
  }

  const medalClasses = {
    gold: "medal-gold",
    silver: "medal-silver",
    bronze: "medal-bronze"
  }

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <div
        className={cn(
          "medal rounded-full flex items-center justify-center text-white",
          sizes[size].container,
          medalClasses[type]
        )}
        aria-label={`${type} medal${position ? ` - position ${position}` : ''}`}
      >
        <Trophy className={sizes[size].icon} />
      </div>

      {showPosition && position && (
        <span className="text-sm font-semibold">#{position}</span>
      )}
    </div>
  )
}
```

---

## 4. Achievement Badge

### Descrição
Badge representando uma conquista/achievement desbloqueado ou bloqueado.

### Visual
```
┌─────────┐  ┌─────────┐
│   🏆   │  │   🔒   │
│ Badge  │  │ Locked │
│ Name   │  │        │
└─────────┘  └─────────┘
  Unlocked     Locked
```

### Anatomia
- **Container:** 64×64px (padrão), rounded-lg, border 3px
- **Icon:** Award, Trophy, Star, etc. (Lucide)
- **Border Color:** baseado na raridade
- **State:** desbloqueado (colorido) ou bloqueado (grayscale, opacity)
- **Glow:** se novo badge
- **Tooltip:** descrição ao hover

### Props / API

```tsx
interface AchievementBadgeProps {
  id: string
  name: string
  description: string
  icon: LucideIcon
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  unlocked: boolean
  isNew?: boolean
  unlockedAt?: Date
}
```

### Raridades

| Rarity | Cor | Uso |
|--------|-----|-----|
| Common | Cinza | Completar 1 curso |
| Rare | Azul | Completar 5 cursos |
| Epic | Magenta | Completar 10 cursos, certificados especiais |
| Legendary | Dourado | Marcos especiais (20+ cursos, top ranking) |

### Exemplo de Uso

```tsx
import { AchievementBadge } from "@/components/gamification/achievement-badge"
import { Trophy } from "lucide-react"

<AchievementBadge
  id="first-course"
  name="Primeiro Passo"
  description="Complete seu primeiro curso"
  icon={Trophy}
  rarity="common"
  unlocked={true}
  isNew={false}
/>
```

### Código de Implementação

```tsx
import { LucideIcon, Lock } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface AchievementBadgeProps {
  id: string
  name: string
  description: string
  icon: LucideIcon
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  unlocked: boolean
  isNew?: boolean
  unlockedAt?: Date
  className?: string
}

const rarityClasses = {
  common: "border-[oklch(0.75_0.01_264)]",
  rare: "border-[oklch(0.65_0.15_220)]",
  epic: "border-[oklch(0.62_0.32_318)]",
  legendary: "border-[oklch(0.78_0.18_85)]"
}

export function AchievementBadge({
  name,
  description,
  icon: Icon,
  rarity,
  unlocked,
  isNew = false,
  unlockedAt,
  className
}: AchievementBadgeProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              "relative size-16 rounded-lg border-3 flex items-center justify-center transition-all",
              rarityClasses[rarity],
              unlocked
                ? "bg-card hover:scale-110 cursor-pointer"
                : "badge-locked cursor-not-allowed",
              isNew && "badge-new",
              className
            )}
            aria-label={unlocked ? `Badge desbloqueado: ${name}` : `Badge bloqueado: ${name}`}
          >
            {unlocked ? (
              <Icon className="size-8" />
            ) : (
              <Lock className="size-8" />
            )}
          </div>
        </TooltipTrigger>

        <TooltipContent>
          <div className="space-y-1">
            <p className="font-semibold">{name}</p>
            <p className="text-sm text-muted-foreground">{description}</p>
            {unlocked && unlockedAt && (
              <p className="text-xs text-muted-foreground">
                Desbloqueado em {new Date(unlockedAt).toLocaleDateString('pt-BR')}
              </p>
            )}
            {!unlocked && (
              <p className="text-xs text-muted-foreground italic">
                Ainda não desbloqueado
              </p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
```

---

## 5. Status Badge

### Descrição
Badge compacto mostrando status de inscrição em curso.

### Visual
```
⏱️ Pendente    🔍 Em Avaliação    ✅ Aprovado
⏳ Espera      ❌ Recusado        🎓 Finalizado
```

### Anatomia
- **Container:** inline-flex, padding 4px 8px, rounded-md
- **Icon:** 12px (Lucide)
- **Text:** font-badge (12px, semibold)
- **Background:** cor clara baseada no status
- **Border:** cor mais escura do status

### Props / API

```tsx
interface StatusBadgeProps {
  status: 'pending' | 'in-review' | 'approved' | 'waitlist' | 'rejected' | 'completed'
  size?: 'small' | 'default'
}
```

### Status e Cores

| Status | Label PT-BR | Icon | Cor |
|--------|-------------|------|-----|
| pending | Pendente | Clock | Yellow |
| in-review | Em Avaliação | Search | Blue |
| approved | Aprovado | CheckCircle | Green |
| waitlist | Lista de Espera | Clock | Yellow |
| rejected | Recusado | XCircle | Red |
| completed | Finalizado | GraduationCap | Purple |

### Exemplo de Uso

```tsx
import { StatusBadge } from "@/components/gamification/status-badge"

<StatusBadge status="approved" />
<StatusBadge status="pending" size="small" />
```

### Código de Implementação

```tsx
import { Clock, Search, CheckCircle, XCircle, GraduationCap } from "lucide-react"
import { cn } from "@/lib/utils"

type Status = 'pending' | 'in-review' | 'approved' | 'waitlist' | 'rejected' | 'completed'

interface StatusBadgeProps {
  status: Status
  size?: 'small' | 'default'
  className?: string
}

const statusConfig = {
  pending: {
    label: "Pendente",
    icon: Clock,
    className: "status-pending"
  },
  "in-review": {
    label: "Em Avaliação",
    icon: Search,
    className: "status-in-review"
  },
  approved: {
    label: "Aprovado",
    icon: CheckCircle,
    className: "status-approved"
  },
  waitlist: {
    label: "Lista de Espera",
    icon: Clock,
    className: "status-waitlist"
  },
  rejected: {
    label: "Recusado",
    icon: XCircle,
    className: "status-rejected"
  },
  completed: {
    label: "Finalizado",
    icon: GraduationCap,
    className: "status-completed"
  }
}

export function StatusBadge({ status, size = 'default', className }: StatusBadgeProps) {
  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <span
      className={cn(
        "status-badge",
        config.className,
        size === 'small' && "text-[10px] px-1.5 py-0.5",
        className
      )}
    >
      <Icon className={size === 'small' ? "size-2.5" : "size-3"} />
      {config.label}
    </span>
  )
}
```

---

## 6. Ranking Card

### Descrição
Card exibindo informações de um usuário no ranking.

### Visual
```
┌────────────────────────────────────────────┐
│ #1 🥇  [Avatar]  João Silva                │
│         Nível 8 - Avançado                 │
│         ⚡ 1250 XP  📚 15 cursos           │
│         ████████████████░░ (85%)           │
│         🏆 🏆 🏆 🏆 🏆 (5 badges)          │
└────────────────────────────────────────────┘
```

### Anatomia
- **Position:** número da posição (#1, #2, etc.)
- **Medal:** se top 3
- **Avatar:** imagem circular, 48px
- **Nome:** font-subheading, bold
- **Nível:** Level badge inline
- **Stats:** XP total, cursos concluídos
- **Progress Bar:** XP do nível atual
- **Badges:** até 5 badges principais

### Props / API

```tsx
interface RankingCardProps {
  position: number
  user: {
    id: string
    name: string
    avatar?: string
    level: number
    levelTitle: string
    xp: number
    currentLevelXP: number
    nextLevelXP: number
    coursesCompleted: number
    badges: Badge[]
  }
  variant?: 'compact' | 'detailed'
}
```

### Exemplo de Uso

```tsx
import { RankingCard } from "@/components/gamification/ranking-card"

<RankingCard
  position={1}
  user={{
    id: "user-1",
    name: "João Silva",
    avatar: "/avatars/joao.jpg",
    level: 8,
    levelTitle: "Avançado",
    xp: 1250,
    currentLevelXP: 850,
    nextLevelXP: 1000,
    coursesCompleted: 15,
    badges: [...]
  }}
  variant="detailed"
/>
```

### Código de Implementação

```tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Medal } from "./medal"
import { XPProgressBar } from "./xp-progress-bar"
import { AchievementBadge } from "./achievement-badge"
import { BookOpen, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

interface Badge {
  id: string
  name: string
  description: string
  icon: any
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  unlocked: boolean
}

interface RankingCardProps {
  position: number
  user: {
    id: string
    name: string
    avatar?: string
    level: number
    levelTitle: string
    xp: number
    currentLevelXP: number
    nextLevelXP: number
    coursesCompleted: number
    badges: Badge[]
  }
  variant?: 'compact' | 'detailed'
  className?: string
}

export function RankingCard({ position, user, variant = 'detailed', className }: RankingCardProps) {
  const isTopThree = position <= 3
  const medalType = position === 1 ? 'gold' : position === 2 ? 'silver' : 'bronze'

  return (
    <Card
      className={cn(
        "ranking-card",
        position === 1 && "top-1",
        position === 2 && "top-2",
        position === 3 && "top-3",
        className
      )}
    >
      <div className="flex items-start gap-4">
        {/* Position & Medal */}
        <div className="flex flex-col items-center gap-1 min-w-[60px]">
          <span className="text-2xl font-bold">#{position}</span>
          {isTopThree && <Medal type={medalType} size="small" />}
        </div>

        {/* Avatar */}
        <Avatar className="size-12">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>

        {/* User Info */}
        <div className="flex-1 space-y-3">
          <div>
            <h3 className="text-lg font-semibold">{user.name}</h3>
            <p className="text-sm text-muted-foreground">
              Nível {user.level} - {user.levelTitle}
            </p>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Zap className="size-4 text-primary" />
              <span className="font-semibold">{user.xp} XP</span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="size-4 text-muted-foreground" />
              <span>{user.coursesCompleted} cursos</span>
            </div>
          </div>

          {/* XP Progress */}
          {variant === 'detailed' && (
            <XPProgressBar
              currentXP={user.currentLevelXP}
              targetXP={user.nextLevelXP}
              showLabel={false}
              size="small"
            />
          )}

          {/* Top Badges */}
          {variant === 'detailed' && user.badges.length > 0 && (
            <div className="flex gap-2">
              {user.badges.slice(0, 5).map((badge) => (
                <AchievementBadge
                  key={badge.id}
                  {...badge}
                  className="size-8"
                />
              ))}
              {user.badges.length > 5 && (
                <span className="text-xs text-muted-foreground self-center">
                  +{user.badges.length - 5} mais
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
```

---

## 7. Course Card Gamified

### Descrição
Card de curso com elementos de gamificação (XP ganho, status).

### Visual
```
┌──────────────────────────────────────┐
│ [Imagem do Curso]                    │
├──────────────────────────────────────┤
│ Curso de Desenvolvimento Web         │
│ Instituição: SENAC                   │
│ ⏱️ Pendente    +50 XP ⚡            │
│                                      │
│ [Ver Detalhes]                       │
└──────────────────────────────────────┘
```

### Anatomia
- **Image:** 16:9 aspect ratio, top section
- **Title:** font-subheading
- **Institution:** font-body, muted
- **Status Badge:** canto superior direito ou inline
- **XP Reward:** destaque com ícone Zap
- **CTA Button:** "Ver Detalhes", "Baixar Certificado", etc.

### Props / API

```tsx
interface CourseCardGamifiedProps {
  course: {
    id: string
    title: string
    institution: string
    image?: string
  }
  enrollment: {
    status: Status
    xpGained?: number
    certificateUrl?: string
  }
  onAction?: () => void
}
```

### Exemplo de Uso

```tsx
import { CourseCardGamified } from "@/components/gamification/course-card-gamified"

<CourseCardGamified
  course={{
    id: "course-1",
    title: "Desenvolvimento Web",
    institution: "SENAC",
    image: "/courses/web-dev.jpg"
  }}
  enrollment={{
    status: "completed",
    xpGained: 50,
    certificateUrl: "/certificates/cert-123.pdf"
  }}
  onAction={() => console.log("Download certificate")}
/>
```

---

## 8. Profile Panel Gamified

### Descrição
Painel de perfil do usuário com informações de gamificação.

### Visual
```
┌────────────────────────────────────────────┐
│  [Avatar Grande]                           │
│  João Silva                                │
│  Nível 3 - Explorador                     │
│  ⚡ 430/500 XP para o Nível 4             │
│  ████████████████░░░░░░░░ (86%)           │
│                                            │
│  📚 12 cursos  |  🏆 8 badges  |  🔥 5 dias│
└────────────────────────────────────────────┘
```

### Anatomia
- **Avatar:** 80-120px, circular
- **Nome:** font-heading
- **Level Badge:** inline ou stacked
- **XP Progress Bar:** com label e helper text
- **Quick Stats:** cursos, badges, streak (opcional)
- **Background:** gradient ou solid

### Props / API

```tsx
interface ProfilePanelGamifiedProps {
  user: {
    name: string
    avatar?: string
    level: number
    levelTitle: string
    currentXP: number
    targetXP: number
    coursesCompleted: number
    badgesUnlocked: number
    streak?: number
  }
  variant?: 'compact' | 'detailed'
}
```

---

## 9. Level Up Modal

### Descrição
Modal de celebração quando usuário sobe de nível.

### Visual
```
┌────────────────────────────────────┐
│        ✨ PARABÉNS! ✨            │
│                                    │
│  Você alcançou o Nível 4!         │
│                                    │
│     [Grande Badge Nível 4]        │
│                                    │
│  Continue aprendendo e crescendo! │
│                                    │
│         [Continuar]                │
└────────────────────────────────────┘
```

### Anatomia
- **Overlay:** backdrop com blur
- **Modal:** centralizado, max-width 500px
- **Animation:** level-up keyframe
- **Celebration Elements:** Sparkles icons, gradiente
- **Level Badge:** large, destaque
- **Message:** motivacional
- **CTA Button:** fechar modal

### Props / API

```tsx
interface LevelUpModalProps {
  isOpen: boolean
  onClose: () => void
  newLevel: number
  levelTitle: string
  rewards?: string[]
}
```

---

## 10. Achievement Unlock Toast

### Descrição
Notificação toast quando badge é desbloqueado.

### Visual
```
┌──────────────────────────────────────┐
│ 🎉 Badge Desbloqueado!               │
│ [Badge Icon] Maratonista             │
│ Complete 10 cursos em um mês         │
└──────────────────────────────────────┘
```

### Anatomia
- **Toast Container:** canto superior direito
- **Icon:** celebration (Sparkles, Party Popper)
- **Badge Preview:** small achievement badge
- **Title:** "Badge Desbloqueado!"
- **Badge Name:** bold
- **Description:** small text
- **Auto-dismiss:** 5 segundos

---

## 11. Tooltip Component

### Descrição
Tooltip para explicar sistema de XP, badges, etc.

### Uso
- Explicar como ganhar XP
- Mostrar requisitos de badges
- Detalhes de conquistas

### Integração
Usar componente Tooltip do shadcn/ui com conteúdo customizado.

---

## 12. Filter Controls

### Descrição
Controles de filtro para tela de ranking.

### Opções
- **Por Especialidade:** dropdown com áreas
- **Por Município:** dropdown com cidades do Amapá
- **Por Nível:** slider ou checkboxes (1-10+)
- **Período:** último mês, trimestre, ano, todos

### Layout
- Desktop: horizontal inline
- Mobile: collapsible accordion

---

## Próximos Passos

1. Implementar componentes na ordem de prioridade
2. Criar Storybook stories para cada componente
3. Testes de acessibilidade com screen readers
4. Testes de responsividade em diferentes dispositivos
5. Performance testing com React DevTools

---

## Referências

- Design Tokens: `design-tokens.css`
- Brand Guidelines: `gamification-brand-guidelines.md`
- Accessibility: `accessibility-checklist.md`
- shadcn/ui Docs: https://ui.shadcn.com
