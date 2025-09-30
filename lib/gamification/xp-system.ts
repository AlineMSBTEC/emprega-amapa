import type { XPLevel, LevelCategory, XPTransaction } from "@/types"

/**
 * Sistema de XP e Níveis
 * Gerencia progressão de XP, cálculo de níveis e recompensas
 */

// Constantes de XP
export const XP_REWARDS = {
  COURSE_COMPLETED: 50,
  CERTIFICATE_UPLOADED: 20,
  FIRST_COURSE_BONUS: 25,
  MILESTONE_5_COURSES: 100,
  MILESTONE_10_COURSES: 200,
  DAILY_STREAK_BONUS: 5,
} as const

// Definição dos 10 níveis
export const LEVELS: XPLevel[] = [
  { level: 1, title: "Iniciante", xpRequired: 0, category: "beginner" },
  { level: 2, title: "Aprendiz", xpRequired: 100, category: "beginner" },
  { level: 3, title: "Explorador", xpRequired: 250, category: "beginner" },
  { level: 4, title: "Competente", xpRequired: 500, category: "intermediate" },
  { level: 5, title: "Qualificado", xpRequired: 800, category: "intermediate" },
  { level: 6, title: "Profissional", xpRequired: 1200, category: "intermediate" },
  { level: 7, title: "Especialista", xpRequired: 1700, category: "advanced" },
  { level: 8, title: "Mestre", xpRequired: 2300, category: "advanced" },
  { level: 9, title: "Elite", xpRequired: 3000, category: "advanced" },
  { level: 10, title: "Lenda", xpRequired: 4000, category: "expert" },
]

/**
 * Calcula o nível atual baseado no XP total
 */
export function calculateLevel(xp: number): XPLevel {
  // Encontra o maior nível onde o XP é >= xpRequired
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].xpRequired) {
      return LEVELS[i]
    }
  }
  return LEVELS[0]
}

/**
 * Retorna o próximo nível e XP necessário
 */
export function getNextLevel(currentLevel: number): {
  nextLevel: XPLevel | null
  xpNeeded: number
} {
  const nextLevelIndex = LEVELS.findIndex((l) => l.level === currentLevel + 1)

  if (nextLevelIndex === -1) {
    return { nextLevel: null, xpNeeded: 0 }
  }

  return {
    nextLevel: LEVELS[nextLevelIndex],
    xpNeeded: LEVELS[nextLevelIndex].xpRequired,
  }
}

/**
 * Calcula progresso até o próximo nível (0-100%)
 */
export function calculateLevelProgress(xp: number): {
  percentage: number
  currentXP: number
  xpToNext: number
  xpNeeded: number
} {
  const currentLevel = calculateLevel(xp)
  const { nextLevel } = getNextLevel(currentLevel.level)

  if (!nextLevel) {
    return {
      percentage: 100,
      currentXP: xp,
      xpToNext: 0,
      xpNeeded: 0,
    }
  }

  const currentLevelXP = currentLevel.xpRequired
  const nextLevelXP = nextLevel.xpRequired
  const xpInCurrentLevel = xp - currentLevelXP
  const xpNeededForNext = nextLevelXP - currentLevelXP

  return {
    percentage: Math.floor((xpInCurrentLevel / xpNeededForNext) * 100),
    currentXP: xpInCurrentLevel,
    xpToNext: xpNeededForNext - xpInCurrentLevel,
    xpNeeded: xpNeededForNext,
  }
}

/**
 * Calcula XP ganho ao completar um curso
 */
export function calculateCourseXP(options: {
  isFirstCourse?: boolean
  hasCertificate?: boolean
  coursesCompleted?: number
}): {
  baseXP: number
  bonusXP: number
  totalXP: number
  breakdown: Array<{ reason: string; amount: number }>
} {
  const breakdown: Array<{ reason: string; amount: number }> = []
  const baseXP = XP_REWARDS.COURSE_COMPLETED
  let bonusXP = 0

  breakdown.push({ reason: "Curso finalizado", amount: baseXP })

  if (options.hasCertificate) {
    bonusXP += XP_REWARDS.CERTIFICATE_UPLOADED
    breakdown.push({
      reason: "Certificado enviado",
      amount: XP_REWARDS.CERTIFICATE_UPLOADED,
    })
  }

  if (options.isFirstCourse) {
    bonusXP += XP_REWARDS.FIRST_COURSE_BONUS
    breakdown.push({
      reason: "Bônus primeiro curso",
      amount: XP_REWARDS.FIRST_COURSE_BONUS,
    })
  }

  if (options.coursesCompleted === 5) {
    bonusXP += XP_REWARDS.MILESTONE_5_COURSES
    breakdown.push({
      reason: "Marco: 5 cursos",
      amount: XP_REWARDS.MILESTONE_5_COURSES,
    })
  }

  if (options.coursesCompleted === 10) {
    bonusXP += XP_REWARDS.MILESTONE_10_COURSES
    breakdown.push({
      reason: "Marco: 10 cursos",
      amount: XP_REWARDS.MILESTONE_10_COURSES,
    })
  }

  return {
    baseXP,
    bonusXP,
    totalXP: baseXP + bonusXP,
    breakdown,
  }
}

/**
 * Verifica se o usuário subiu de nível após ganhar XP
 */
export function checkLevelUp(
  previousXP: number,
  newXP: number
): {
  leveledUp: boolean
  previousLevel: XPLevel
  newLevel: XPLevel
  levelsGained: number
} {
  const previousLevel = calculateLevel(previousXP)
  const newLevel = calculateLevel(newXP)
  const levelsGained = newLevel.level - previousLevel.level

  return {
    leveledUp: levelsGained > 0,
    previousLevel,
    newLevel,
    levelsGained,
  }
}

/**
 * Retorna categoria de cor baseado no nível
 */
export function getLevelCategory(level: number): LevelCategory {
  const levelData = LEVELS.find((l) => l.level === level)
  return levelData?.category || "beginner"
}

/**
 * Formata número de XP para exibição (ex: 1,234 XP)
 */
export function formatXP(xp: number): string {
  return new Intl.NumberFormat("pt-BR").format(xp)
}

/**
 * Cria uma transação de XP
 */
export function createXPTransaction(
  userId: string,
  amount: number,
  reason: XPTransaction["reason"],
  relatedId?: string
): XPTransaction {
  return {
    id: crypto.randomUUID(),
    userId,
    amount,
    reason,
    relatedId,
    timestamp: new Date().toISOString(),
  }
}

/**
 * Calcula total de XP de uma lista de transações
 */
export function sumXPTransactions(transactions: XPTransaction[]): number {
  return transactions.reduce((sum, t) => sum + t.amount, 0)
}
