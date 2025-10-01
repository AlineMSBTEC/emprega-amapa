# Implementation Guide - Gamification System

## Visão Geral

Este guia fornece instruções práticas e passo a passo para implementar o sistema de gamificação no Emprega Amapá, incluindo configuração, criação de componentes e integração com o sistema existente.

**Última atualização:** 2025-09-30
**Versão:** 1.0

---

## Índice

1. [Setup Inicial](#1-setup-inicial)
2. [Integração de Design Tokens](#2-integração-de-design-tokens)
3. [Criação de Tipos TypeScript](#3-criação-de-tipos-typescript)
4. [Implementação de Componentes](#4-implementação-de-componentes)
5. [Páginas e Rotas](#5-páginas-e-rotas)
6. [Sistema de XP e Níveis](#6-sistema-de-xp-e-níveis)
7. [Badges e Conquistas](#7-badges-e-conquistas)
8. [Ranking System](#8-ranking-system)
9. [Animações e Celebrações](#9-animações-e-celebrações)
10. [Testes e Validação](#10-testes-e-validação)

---

## 1. Setup Inicial

### Pré-requisitos

O projeto já possui:
- ✅ Next.js 15.5.4
- ✅ React 19.1.0
- ✅ Tailwind CSS v4
- ✅ shadcn/ui componentes base
- ✅ Lucide React (ícones)
- ✅ TypeScript

### Estrutura de Pastas Recomendada

```
app/
├── ranking/
│   ├── page.tsx                    # Tela de Ranking
│   └── _components/
│       ├── ranking-list.tsx
│       ├── ranking-filters.tsx
│       └── ranking-card.tsx
├── minhas-inscricoes/
│   ├── page.tsx                    # Minhas Inscrições Gamificada
│   └── _components/
│       ├── profile-panel.tsx
│       ├── course-table.tsx
│       └── achievements-panel.tsx

components/
├── gamification/                   # Componentes de gamificação reutilizáveis
│   ├── xp-progress-bar.tsx
│   ├── level-badge.tsx
│   ├── medal.tsx
│   ├── achievement-badge.tsx
│   ├── status-badge.tsx
│   ├── level-up-modal.tsx
│   └── achievement-toast.tsx

lib/
├── gamification/                   # Lógica de negócio
│   ├── xp-system.ts               # Cálculos de XP e níveis
│   ├── achievements.ts            # Sistema de badges
│   └── ranking.ts                 # Lógica de ranking

types/
├── gamification.ts                # Types de gamificação

hooks/
├── use-reduced-motion.ts          # Hook de acessibilidade
├── use-xp-progress.ts             # Hook para progresso de XP
└── use-achievements.ts            # Hook para badges
```

---

## 2. Integração de Design Tokens

### Passo 1: Adicionar Tokens ao globals.css

Abra `app/globals.css` e adicione os tokens de gamificação:

```css
/* app/globals.css */
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

/* ... código existente ... */

:root {
  /* Tokens existentes */
  --radius: 0.625rem;
  --background: oklch(0.98 0.005 264);
  /* ... */

  /* ADICIONAR: Tokens de Gamificação */

  /* Status de Inscrições */
  --status-pending: oklch(0.75 0.18 85);
  --status-pending-foreground: oklch(0.2 0.01 264);
  --status-in-review: oklch(0.65 0.15 220);
  --status-in-review-foreground: oklch(1 0 0);
  --status-approved: oklch(0.65 0.2 145);
  --status-approved-foreground: oklch(1 0 0);
  --status-waitlist: oklch(0.75 0.18 85);
  --status-waitlist-foreground: oklch(0.2 0.01 264);
  --status-rejected: oklch(0.55 0.22 25);
  --status-rejected-foreground: oklch(1 0 0);
  --status-completed: oklch(0.42 0.25 278);
  --status-completed-foreground: oklch(1 0 0);

  /* XP e Progresso */
  --xp-bar-fill: oklch(0.68 0.21 42);
  --xp-bar-background: oklch(0.95 0.005 264);
  --xp-bar-border: oklch(0.88 0.005 264);

  /* Medalhas */
  --medal-gold: oklch(0.78 0.18 85);
  --medal-silver: oklch(0.75 0.01 264);
  --medal-bronze: oklch(0.58 0.12 45);

  /* Níveis */
  --level-beginner: oklch(0.65 0.2 145);
  --level-intermediate: oklch(0.65 0.15 220);
  --level-advanced: oklch(0.62 0.32 318);
  --level-expert: oklch(0.42 0.25 278);

  /* Badges */
  --badge-common: oklch(0.75 0.01 264);
  --badge-rare: oklch(0.65 0.15 220);
  --badge-epic: oklch(0.62 0.32 318);
  --badge-legendary: oklch(0.78 0.18 85);
}

.dark {
  /* Dark mode overrides */
  --status-pending: oklch(0.7 0.16 85);
  --status-in-review: oklch(0.6 0.14 220);
  --xp-bar-background: oklch(0.3 0.01 264);
  /* ... */
}
```

### Passo 2: Mapear para Tailwind (se necessário)

Se você quiser usar os tokens diretamente como classes Tailwind:

```css
@theme inline {
  /* Tokens existentes */
  --color-primary: var(--primary);
  /* ... */

  /* ADICIONAR: Gamification tokens */
  --color-xp-bar-fill: var(--xp-bar-fill);
  --color-medal-gold: var(--medal-gold);
  --color-status-approved: var(--status-approved);
  /* ... adicionar conforme necessário */
}
```

---

## 3. Criação de Tipos TypeScript

### Passo 1: Criar `types/gamification.ts`

```tsx
// types/gamification.ts

export type LevelCategory = 'beginner' | 'intermediate' | 'advanced' | 'expert'

export type BadgeRarity = 'common' | 'rare' | 'epic' | 'legendary'

export type EnrollmentStatus =
  | 'pending'
  | 'in-review'
  | 'approved'
  | 'waitlist'
  | 'rejected'
  | 'completed'

export interface XPLevel {
  level: number
  category: LevelCategory
  title: string
  minXP: number
  maxXP: number
}

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string // Lucide icon name
  rarity: BadgeRarity
  requirement: {
    type: 'courses_completed' | 'xp_earned' | 'special'
    value: number
    description: string
  }
}

export interface UserAchievement {
  achievementId: string
  achievement: Achievement
  unlocked: boolean
  unlockedAt?: Date
  isNew?: boolean
}

export interface UserGamificationProfile {
  userId: string
  level: number
  levelTitle: string
  levelCategory: LevelCategory
  totalXP: number
  currentLevelXP: number
  nextLevelXP: number
  coursesCompleted: number
  certificatesUploaded: number
  achievements: UserAchievement[]
  ranking?: {
    position: number
    totalUsers: number
  }
}

export interface RankingUser {
  id: string
  name: string
  avatar?: string
  level: number
  levelTitle: string
  levelCategory: LevelCategory
  totalXP: number
  currentLevelXP: number
  nextLevelXP: number
  coursesCompleted: number
  topBadges: UserAchievement[]
  position: number
}

export interface EnrollmentGamified {
  id: string
  courseId: string
  courseTitle: string
  courseImage?: string
  institution: string
  status: EnrollmentStatus
  enrollmentDate: Date
  xpGained: number
  certificateUrl?: string
  updatedAt: Date
}
```

### Passo 2: Atualizar `types/index.ts`

```tsx
// types/index.ts

// Exportar tipos existentes
export type CourseStatus = "open" | "closed"
export type CourseModality = "presencial" | "online" | "hibrido"

// Importar e re-exportar tipos de gamificação
export * from './gamification'

// Atualizar User interface
export interface User {
  id: string
  name: string
  email: string
  cpf: string
  phone: string
  avatar?: string
  enrollments: Enrollment[]

  // Adicionar gamificação
  gamification: {
    level: number
    totalXP: number
    coursesCompleted: number
    achievementsUnlocked: number
  }
}
```

---

## 4. Implementação de Componentes

### Passo 1: XP Progress Bar

Criar `components/gamification/xp-progress-bar.tsx`:

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
            <Zap className="size-4 text-primary" aria-hidden="true" />
            <span>{currentXP}/{targetXP} XP</span>
          </div>
          <span className="text-muted-foreground">{Math.round(percentage)}%</span>
        </div>
      )}

      <div
        className={cn(
          "w-full rounded-full overflow-hidden border",
          "bg-[oklch(0.95_0.005_264)] border-[oklch(0.88_0.005_264)]",
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
            "h-full transition-all duration-300 ease-out rounded-full",
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

      <span className="sr-only">
        Você tem {currentXP} de {targetXP} XP necessários.
        {remaining > 0 ? `Faltam ${remaining} XP para o próximo nível.` : 'Nível completo!'}
      </span>
    </div>
  )
}
```

### Passo 2: Status Badge

Criar `components/gamification/status-badge.tsx`:

```tsx
import { Clock, Search, CheckCircle, XCircle, GraduationCap } from "lucide-react"
import { cn } from "@/lib/utils"
import type { EnrollmentStatus } from "@/types/gamification"

interface StatusBadgeProps {
  status: EnrollmentStatus
  size?: 'small' | 'default'
  className?: string
}

const statusConfig = {
  pending: {
    label: "Pendente",
    icon: Clock,
    colorClass: "bg-[oklch(0.95_0.08_85)] text-[oklch(0.2_0.01_264)] border-[oklch(0.75_0.18_85)]"
  },
  "in-review": {
    label: "Em Avaliação",
    icon: Search,
    colorClass: "bg-[oklch(0.95_0.08_220)] text-[oklch(1_0_0)] border-[oklch(0.65_0.15_220)]"
  },
  approved: {
    label: "Aprovado",
    icon: CheckCircle,
    colorClass: "bg-[oklch(0.95_0.1_145)] text-[oklch(1_0_0)] border-[oklch(0.65_0.2_145)]"
  },
  waitlist: {
    label: "Lista de Espera",
    icon: Clock,
    colorClass: "bg-[oklch(0.95_0.08_85)] text-[oklch(0.2_0.01_264)] border-[oklch(0.75_0.18_85)]"
  },
  rejected: {
    label: "Recusado",
    icon: XCircle,
    colorClass: "bg-[oklch(0.95_0.1_25)] text-[oklch(1_0_0)] border-[oklch(0.55_0.22_25)]"
  },
  completed: {
    label: "Finalizado",
    icon: GraduationCap,
    colorClass: "bg-[oklch(0.95_0.12_278)] text-[oklch(1_0_0)] border-[oklch(0.42_0.25_278)]"
  }
}

export function StatusBadge({ status, size = 'default', className }: StatusBadgeProps) {
  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md border font-semibold",
        size === 'small' ? "text-[10px] px-1.5 py-0.5" : "text-xs px-2 py-0.5",
        config.colorClass,
        className
      )}
      role="status"
      aria-label={`Status: ${config.label}`}
    >
      <Icon className={size === 'small' ? "size-2.5" : "size-3"} aria-hidden="true" />
      {config.label}
    </span>
  )
}
```

### Passo 3: Level Badge

Criar `components/gamification/level-badge.tsx`:

```tsx
import { cn } from "@/lib/utils"
import { Star } from "lucide-react"
import type { LevelCategory } from "@/types/gamification"

interface LevelBadgeProps {
  level: number
  title?: string
  category?: LevelCategory
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

function getLevelCategory(level: number): LevelCategory {
  if (level <= 3) return 'beginner'
  if (level <= 6) return 'intermediate'
  if (level <= 9) return 'advanced'
  return 'expert'
}

export function LevelBadge({
  level,
  title,
  category,
  size = 'medium',
  showStars = false,
  className
}: LevelBadgeProps) {
  const levelCategory = category || getLevelCategory(level)
  const displayTitle = title || levelTitles[level] || `Nível ${level}`

  const sizes = {
    small: "text-xs p-2",
    medium: "text-sm p-3",
    large: "text-base p-4"
  }

  const categoryColors = {
    beginner: "bg-[oklch(0.95_0.1_145)] text-[oklch(0.55_0.22_145)] border-[oklch(0.65_0.2_145)]",
    intermediate: "bg-[oklch(0.95_0.08_220)] text-[oklch(0.55_0.17_220)] border-[oklch(0.65_0.15_220)]",
    advanced: "bg-[oklch(0.95_0.15_318)] text-[oklch(0.52_0.35_318)] border-[oklch(0.62_0.32_318)]",
    expert: "bg-[oklch(0.95_0.12_278)] text-[oklch(0.32_0.28_278)] border-[oklch(0.42_0.25_278)]"
  }

  return (
    <div
      className={cn(
        "inline-flex flex-col items-center justify-center rounded-lg border-2",
        sizes[size],
        categoryColors[levelCategory],
        className
      )}
      aria-label={`Nível ${level} - ${displayTitle}`}
    >
      <div className="font-bold">NÍVEL {level}</div>
      <div className="text-xs font-medium">{displayTitle}</div>

      {showStars && (
        <div className="flex gap-0.5 mt-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                "size-2.5",
                i < Math.min(level, 5) ? "fill-current" : "fill-none"
              )}
              aria-hidden="true"
            />
          ))}
        </div>
      )}
    </div>
  )
}
```

### Passo 4: Medal Component

Criar `components/gamification/medal.tsx`:

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

  const medalStyles = {
    gold: "bg-gradient-to-br from-[oklch(0.88_0.16_85)] via-[oklch(0.78_0.18_85)] to-[oklch(0.68_0.16_80)] shadow-[0_0_20px_oklch(0.78_0.18_85/0.5)]",
    silver: "bg-gradient-to-br from-[oklch(0.85_0.01_264)] via-[oklch(0.75_0.01_264)] to-[oklch(0.65_0.01_264)] shadow-lg",
    bronze: "bg-gradient-to-br from-[oklch(0.68_0.12_45)] via-[oklch(0.58_0.12_45)] to-[oklch(0.48_0.12_45)] shadow-md"
  }

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <div
        className={cn(
          "rounded-full flex items-center justify-center text-white",
          sizes[size].container,
          medalStyles[type]
        )}
        role="img"
        aria-label={`${type} medal${position ? ` - position ${position}` : ''}`}
      >
        <Trophy className={sizes[size].icon} aria-hidden="true" />
      </div>

      {showPosition && position && (
        <span className="text-sm font-semibold">#{position}</span>
      )}
    </div>
  )
}
```

---

## 5. Páginas e Rotas

### Passo 1: Criar Página de Ranking

Criar `app/ranking/page.tsx`:

```tsx
import { Suspense } from "react"
import { RankingList } from "./_components/ranking-list"
import { RankingFilters } from "./_components/ranking-filters"

export default function RankingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <header>
          <h1 className="text-4xl font-bold">Ranking de Candidatos</h1>
          <p className="text-muted-foreground mt-2">
            Veja os candidatos mais dedicados e inspire-se para continuar aprendendo
          </p>
        </header>

        <RankingFilters />

        <Suspense fallback={<div>Carregando ranking...</div>}>
          <RankingList />
        </Suspense>
      </div>
    </div>
  )
}
```

### Passo 2: Atualizar Minhas Inscrições

Criar `app/minhas-inscricoes/page.tsx`:

```tsx
import { Suspense } from "react"
import { ProfilePanelGamified } from "./_components/profile-panel"
import { CourseTable } from "./_components/course-table"
import { AchievementsPanel } from "./_components/achievements-panel"

export default function MinhasInscricoesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        <header>
          <h1 className="text-4xl font-bold">Minhas Inscrições</h1>
        </header>

        <Suspense fallback={<div>Carregando perfil...</div>}>
          <ProfilePanelGamified />
        </Suspense>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Suspense fallback={<div>Carregando cursos...</div>}>
              <CourseTable />
            </Suspense>
          </div>

          <aside>
            <Suspense fallback={<div>Carregando conquistas...</div>}>
              <AchievementsPanel />
            </Suspense>
          </aside>
        </div>
      </div>
    </div>
  )
}
```

---

## 6. Sistema de XP e Níveis

### Criar `lib/gamification/xp-system.ts`

```tsx
import type { XPLevel, LevelCategory } from "@/types/gamification"

// Definir níveis e XP necessário
export const XP_LEVELS: XPLevel[] = [
  { level: 1, category: 'beginner', title: 'Iniciante', minXP: 0, maxXP: 100 },
  { level: 2, category: 'beginner', title: 'Aprendiz', minXP: 100, maxXP: 250 },
  { level: 3, category: 'beginner', title: 'Explorador', minXP: 250, maxXP: 500 },
  { level: 4, category: 'intermediate', title: 'Estudante', minXP: 500, maxXP: 800 },
  { level: 5, category: 'intermediate', title: 'Dedicado', minXP: 800, maxXP: 1200 },
  { level: 6, category: 'intermediate', title: 'Comprometido', minXP: 1200, maxXP: 1700 },
  { level: 7, category: 'advanced', title: 'Avançado', minXP: 1700, maxXP: 2300 },
  { level: 8, category: 'advanced', title: 'Expert', minXP: 2300, maxXP: 3000 },
  { level: 9, category: 'advanced', title: 'Mestre', minXP: 3000, maxXP: 4000 },
  { level: 10, category: 'expert', title: 'Lenda', minXP: 4000, maxXP: Infinity },
]

// XP por ação
export const XP_REWARDS = {
  COURSE_COMPLETED: 50,
  CERTIFICATE_UPLOADED: 20,
  PROFILE_COMPLETED: 10,
  FIRST_COURSE: 25, // Bonus
  MILESTONE_5_COURSES: 100,
  MILESTONE_10_COURSES: 200,
} as const

/**
 * Calcula nível baseado no XP total
 */
export function calculateLevel(totalXP: number): XPLevel {
  for (let i = XP_LEVELS.length - 1; i >= 0; i--) {
    if (totalXP >= XP_LEVELS[i].minXP) {
      return XP_LEVELS[i]
    }
  }
  return XP_LEVELS[0]
}

/**
 * Retorna XP atual dentro do nível
 */
export function getCurrentLevelXP(totalXP: number): number {
  const level = calculateLevel(totalXP)
  return totalXP - level.minXP
}

/**
 * Retorna XP necessário para próximo nível
 */
export function getNextLevelXP(totalXP: number): number {
  const level = calculateLevel(totalXP)
  const nextLevel = XP_LEVELS.find(l => l.level === level.level + 1)

  if (!nextLevel) {
    return level.maxXP // Max level
  }

  return nextLevel.minXP - level.minXP
}

/**
 * Calcula XP restante para próximo nível
 */
export function getXPToNextLevel(totalXP: number): number {
  const level = calculateLevel(totalXP)
  const nextLevel = XP_LEVELS.find(l => l.level === level.level + 1)

  if (!nextLevel) {
    return 0 // Max level
  }

  return nextLevel.minXP - totalXP
}

/**
 * Verifica se subiu de nível após ganhar XP
 */
export function didLevelUp(previousXP: number, newXP: number): boolean {
  const previousLevel = calculateLevel(previousXP)
  const newLevel = calculateLevel(newXP)
  return newLevel.level > previousLevel.level
}

/**
 * Calcula XP total de um usuário baseado em ações
 */
export function calculateUserXP(actions: {
  coursesCompleted: number
  certificatesUploaded: number
  profileCompleted: boolean
}): number {
  let totalXP = 0

  // XP por cursos
  totalXP += actions.coursesCompleted * XP_REWARDS.COURSE_COMPLETED

  // XP por certificados
  totalXP += actions.certificatesUploaded * XP_REWARDS.CERTIFICATE_UPLOADED

  // XP por perfil completo
  if (actions.profileCompleted) {
    totalXP += XP_REWARDS.PROFILE_COMPLETED
  }

  // Bonus pelo primeiro curso
  if (actions.coursesCompleted >= 1) {
    totalXP += XP_REWARDS.FIRST_COURSE
  }

  // Milestones
  if (actions.coursesCompleted >= 5) {
    totalXP += XP_REWARDS.MILESTONE_5_COURSES
  }
  if (actions.coursesCompleted >= 10) {
    totalXP += XP_REWARDS.MILESTONE_10_COURSES
  }

  return totalXP
}
```

---

## 7. Badges e Conquistas

### Criar `lib/gamification/achievements.ts`

```tsx
import type { Achievement, UserAchievement } from "@/types/gamification"
import { Trophy, Award, Star, BookOpen, Zap, Target, Flame } from "lucide-react"

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-step',
    name: 'Primeiro Passo',
    description: 'Complete seu primeiro curso',
    icon: 'BookOpen',
    rarity: 'common',
    requirement: {
      type: 'courses_completed',
      value: 1,
      description: 'Completar 1 curso'
    }
  },
  {
    id: 'dedicated',
    name: 'Dedicado',
    description: 'Complete 5 cursos',
    icon: 'Award',
    rarity: 'rare',
    requirement: {
      type: 'courses_completed',
      value: 5,
      description: 'Completar 5 cursos'
    }
  },
  {
    id: 'marathon-runner',
    name: 'Maratonista',
    description: 'Complete 10 cursos',
    icon: 'Trophy',
    rarity: 'epic',
    requirement: {
      type: 'courses_completed',
      value: 10,
      description: 'Completar 10 cursos'
    }
  },
  {
    id: 'legend',
    name: 'Lenda',
    description: 'Complete 20 cursos',
    icon: 'Star',
    rarity: 'legendary',
    requirement: {
      type: 'courses_completed',
      value: 20,
      description: 'Completar 20 cursos'
    }
  },
  {
    id: 'xp-master',
    name: 'Mestre do XP',
    description: 'Alcance 1000 XP',
    icon: 'Zap',
    rarity: 'rare',
    requirement: {
      type: 'xp_earned',
      value: 1000,
      description: 'Ganhar 1000 XP'
    }
  },
  {
    id: 'xp-legend',
    name: 'Lenda do XP',
    description: 'Alcance 3000 XP',
    icon: 'Target',
    rarity: 'epic',
    requirement: {
      type: 'xp_earned',
      value: 3000,
      description: 'Ganhar 3000 XP'
    }
  }
]

/**
 * Verifica quais badges o usuário desbloqueou
 */
export function checkUnlockedAchievements(
  coursesCompleted: number,
  totalXP: number
): UserAchievement[] {
  return ACHIEVEMENTS.map(achievement => {
    let unlocked = false

    switch (achievement.requirement.type) {
      case 'courses_completed':
        unlocked = coursesCompleted >= achievement.requirement.value
        break
      case 'xp_earned':
        unlocked = totalXP >= achievement.requirement.value
        break
    }

    return {
      achievementId: achievement.id,
      achievement,
      unlocked,
      unlockedAt: unlocked ? new Date() : undefined,
      isNew: false // Você pode implementar lógica para marcar como novo
    }
  })
}

/**
 * Verifica se novos badges foram desbloqueados
 */
export function getNewlyUnlockedAchievements(
  previousCourses: number,
  newCourses: number,
  previousXP: number,
  newXP: number
): Achievement[] {
  const newlyUnlocked: Achievement[] = []

  ACHIEVEMENTS.forEach(achievement => {
    const { type, value } = achievement.requirement

    let wasUnlocked = false
    let isNowUnlocked = false

    if (type === 'courses_completed') {
      wasUnlocked = previousCourses >= value
      isNowUnlocked = newCourses >= value
    } else if (type === 'xp_earned') {
      wasUnlocked = previousXP >= value
      isNowUnlocked = newXP >= value
    }

    if (!wasUnlocked && isNowUnlocked) {
      newlyUnlocked.push(achievement)
    }
  })

  return newlyUnlocked
}
```

---

## 8. Ranking System

### Criar `lib/gamification/ranking.ts`

```tsx
import type { RankingUser } from "@/types/gamification"

/**
 * Ordena usuários por XP total (ranking)
 */
export function sortUsersByRanking(users: RankingUser[]): RankingUser[] {
  return [...users].sort((a, b) => {
    // Primeiro: por XP total (descendente)
    if (b.totalXP !== a.totalXP) {
      return b.totalXP - a.totalXP
    }

    // Empate: por cursos completados
    if (b.coursesCompleted !== a.coursesCompleted) {
      return b.coursesCompleted - a.coursesCompleted
    }

    // Empate: por nível
    return b.level - a.level
  })
}

/**
 * Atribui posições aos usuários
 */
export function assignRankingPositions(users: RankingUser[]): RankingUser[] {
  const sorted = sortUsersByRanking(users)

  return sorted.map((user, index) => ({
    ...user,
    position: index + 1
  }))
}

/**
 * Filtra usuários por especialidade
 */
export function filterBySpecialty(
  users: RankingUser[],
  specialty: string | null
): RankingUser[] {
  if (!specialty) return users
  // Implementar lógica de filtro baseado em especialidade
  // Por enquanto, retorna todos
  return users
}

/**
 * Filtra usuários por município
 */
export function filterByMunicipality(
  users: RankingUser[],
  municipality: string | null
): RankingUser[] {
  if (!municipality) return users
  // Implementar lógica de filtro baseado em município
  // Por enquanto, retorna todos
  return users
}

/**
 * Filtra usuários por faixa de nível
 */
export function filterByLevelRange(
  users: RankingUser[],
  minLevel: number | null,
  maxLevel: number | null
): RankingUser[] {
  return users.filter(user => {
    if (minLevel && user.level < minLevel) return false
    if (maxLevel && user.level > maxLevel) return false
    return true
  })
}
```

---

## 9. Animações e Celebrações

### Criar Level Up Modal

Criar `components/gamification/level-up-modal.tsx`:

```tsx
"use client"

import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { LevelBadge } from "./level-badge"
import { Sparkles } from "lucide-react"
import { useEffect, useState } from "react"

interface LevelUpModalProps {
  isOpen: boolean
  onClose: () => void
  newLevel: number
  levelTitle: string
  rewards?: string[]
}

export function LevelUpModal({
  isOpen,
  onClose,
  newLevel,
  levelTitle,
  rewards = []
}: LevelUpModalProps) {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setAnimate(true)
    } else {
      setAnimate(false)
    }
  }, [isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <div className="flex flex-col items-center gap-6 py-6">
          <div className="flex items-center gap-2 text-primary">
            <Sparkles className="size-6" />
            <span className="text-2xl font-bold">PARABÉNS!</span>
            <Sparkles className="size-6" />
          </div>

          <DialogTitle className="text-center text-xl">
            Você alcançou o Nível {newLevel}!
          </DialogTitle>

          <div
            className={animate ? "animate-[level-up_0.5s_ease-out]" : ""}
            style={{
              animation: animate ? "level-up 0.5s ease-out" : "none"
            }}
          >
            <LevelBadge
              level={newLevel}
              title={levelTitle}
              size="large"
              showStars={true}
            />
          </div>

          {rewards.length > 0 && (
            <div className="text-center space-y-2">
              <p className="font-semibold">Recompensas desbloqueadas:</p>
              <ul className="text-sm text-muted-foreground">
                {rewards.map((reward, i) => (
                  <li key={i}>{reward}</li>
                ))}
              </ul>
            </div>
          )}

          <DialogDescription className="text-center">
            Continue aprendendo e crescendo. Novos desafios esperam por você!
          </DialogDescription>

          <Button onClick={onClose} size="lg" className="w-full">
            Continuar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
```

### Adicionar Keyframes ao globals.css

```css
/* app/globals.css */

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
```

---

## 10. Testes e Validação

### Passo 1: Testes Manuais

1. **Navegação:**
   - [ ] Tab através de todos os elementos interativos
   - [ ] Focus states visíveis
   - [ ] Escape fecha modais

2. **Screen Reader:**
   - [ ] NVDA/VoiceOver anuncia corretamente
   - [ ] ARIA labels presentes
   - [ ] Live regions funcionando

3. **Visual:**
   - [ ] Contraste adequado em todos os elementos
   - [ ] Zoom 200% funciona
   - [ ] Responsivo em mobile

### Passo 2: Lighthouse

```bash
# Executar Lighthouse no Chrome DevTools
# ou via CLI:
npm install -g lighthouse
lighthouse http://localhost:3000/ranking --view
```

Metas:
- Accessibility score > 90
- Performance score > 80

### Passo 3: Testes Automatizados

```bash
# Instalar ferramentas
npm install -D @testing-library/react @testing-library/jest-dom vitest

# Exemplo de teste
# components/gamification/__tests__/xp-progress-bar.test.tsx
```

```tsx
import { render, screen } from '@testing-library/react'
import { XPProgressBar } from '../xp-progress-bar'

describe('XPProgressBar', () => {
  it('renders current and target XP', () => {
    render(<XPProgressBar currentXP={430} targetXP={500} />)

    expect(screen.getByText('430/500 XP')).toBeInTheDocument()
  })

  it('calculates percentage correctly', () => {
    render(<XPProgressBar currentXP={430} targetXP={500} showLabel={true} />)

    expect(screen.getByText('86%')).toBeInTheDocument()
  })

  it('has correct ARIA attributes', () => {
    render(<XPProgressBar currentXP={430} targetXP={500} />)

    const progressBar = screen.getByRole('progressbar')
    expect(progressBar).toHaveAttribute('aria-valuenow', '430')
    expect(progressBar).toHaveAttribute('aria-valuemax', '500')
  })
})
```

---

## Conclusão

Este guia fornece a base completa para implementar o sistema de gamificação. Siga os passos em ordem e adapte conforme necessário para o seu caso de uso específico.

### Próximos Passos Sugeridos

1. Implementar componentes básicos (XP Bar, Badges, Status)
2. Criar lógica de XP e níveis
3. Implementar páginas (Ranking, Minhas Inscrições)
4. Adicionar animações e celebrações
5. Testar acessibilidade e responsividade
6. Integrar com backend (APIs)
7. Deploy e monitoramento

### Recursos Adicionais

- **Design Tokens:** `docs/design-system/design-tokens.css`
- **Brand Guidelines:** `docs/design-system/gamification-brand-guidelines.md`
- **Component Library:** `docs/design-system/component-library.md`
- **Accessibility:** `docs/design-system/accessibility-checklist.md`

---

**Boa implementação!**
