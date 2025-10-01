import type { RankingUser, UserGamificationProfile } from "@/types"

/**
 * Sistema de Ranking
 * Gerencia ordenação, filtros e posicionamento de usuários
 */

/**
 * Ordena usuários por XP (ranking)
 */
export function sortUsersByXP(users: RankingUser[]): RankingUser[] {
  return [...users].sort((a, b) => {
    // Primeiro por XP (maior primeiro)
    if (b.xp !== a.xp) {
      return b.xp - a.xp
    }
    // Se XP igual, por cursos completos
    if (b.coursesCompleted !== a.coursesCompleted) {
      return b.coursesCompleted - a.coursesCompleted
    }
    // Se ainda empate, alfabético
    return a.name.localeCompare(b.name, "pt-BR")
  })
}

/**
 * Adiciona posições ao ranking
 */
export function addRankingPositions(users: RankingUser[]): RankingUser[] {
  const sorted = sortUsersByXP(users)
  return sorted.map((user, index) => ({
    ...user,
    position: index + 1,
  }))
}

/**
 * Filtra usuários por município
 */
export function filterByMunicipality(
  users: RankingUser[],
  municipality: string
): RankingUser[] {
  if (!municipality) return users
  return users.filter(
    (user) =>
      user.municipality?.toLowerCase() === municipality.toLowerCase()
  )
}

/**
 * Filtra usuários por especialidade
 */
export function filterBySpecialty(
  users: RankingUser[],
  specialty: string
): RankingUser[] {
  if (!specialty) return users
  return users.filter(
    (user) => user.specialty?.toLowerCase() === specialty.toLowerCase()
  )
}

/**
 * Filtra usuários por faixa de nível
 */
export function filterByLevelRange(
  users: RankingUser[],
  minLevel: number,
  maxLevel: number
): RankingUser[] {
  return users.filter(
    (user) => user.level.level >= minLevel && user.level.level <= maxLevel
  )
}

/**
 * Aplica múltiplos filtros ao ranking
 */
export function applyRankingFilters(
  users: RankingUser[],
  filters: {
    municipality?: string
    specialty?: string
    minLevel?: number
    maxLevel?: number
  }
): RankingUser[] {
  let filtered = users

  if (filters.municipality) {
    filtered = filterByMunicipality(filtered, filters.municipality)
  }

  if (filters.specialty) {
    filtered = filterBySpecialty(filtered, filters.specialty)
  }

  if (filters.minLevel !== undefined && filters.maxLevel !== undefined) {
    filtered = filterByLevelRange(filtered, filters.minLevel, filters.maxLevel)
  }

  return addRankingPositions(filtered)
}

/**
 * Retorna o top N do ranking
 */
export function getTopRanking(users: RankingUser[], limit = 10): RankingUser[] {
  return addRankingPositions(users).slice(0, limit)
}

/**
 * Retorna os 3 primeiros (pódio) com destaque especial
 */
export function getPodium(users: RankingUser[]): {
  first: RankingUser | null
  second: RankingUser | null
  third: RankingUser | null
} {
  const ranked = addRankingPositions(users)

  return {
    first: ranked[0] || null,
    second: ranked[1] || null,
    third: ranked[2] || null,
  }
}

/**
 * Encontra a posição de um usuário específico
 */
export function findUserPosition(
  users: RankingUser[],
  userId: string
): {
  position: number
  user: RankingUser | null
  totalUsers: number
} {
  const ranked = addRankingPositions(users)
  const user = ranked.find((u) => u.userId === userId)

  return {
    position: user?.position || 0,
    user: user || null,
    totalUsers: ranked.length,
  }
}

/**
 * Retorna usuários ao redor de uma posição (contexto)
 */
export function getRankingContext(
  users: RankingUser[],
  position: number,
  contextSize = 2
): RankingUser[] {
  const ranked = addRankingPositions(users)
  const startIndex = Math.max(0, position - contextSize - 1)
  const endIndex = Math.min(ranked.length, position + contextSize)

  return ranked.slice(startIndex, endIndex)
}

/**
 * Calcula estatísticas do ranking
 */
export function getRankingStats(users: RankingUser[]): {
  totalUsers: number
  averageXP: number
  averageCoursesCompleted: number
  topXP: number
} {
  if (users.length === 0) {
    return {
      totalUsers: 0,
      averageXP: 0,
      averageCoursesCompleted: 0,
      topXP: 0,
    }
  }

  const totalXP = users.reduce((sum, user) => sum + user.xp, 0)
  const totalCourses = users.reduce(
    (sum, user) => sum + user.coursesCompleted,
    0
  )
  const ranked = sortUsersByXP(users)

  return {
    totalUsers: users.length,
    averageXP: Math.floor(totalXP / users.length),
    averageCoursesCompleted: Math.floor(totalCourses / users.length),
    topXP: ranked[0]?.xp || 0,
  }
}

/**
 * Determina o tipo de medalha baseado na posição
 */
export function getMedalType(
  position: number
): "gold" | "silver" | "bronze" | null {
  switch (position) {
    case 1:
      return "gold"
    case 2:
      return "silver"
    case 3:
      return "bronze"
    default:
      return null
  }
}

/**
 * Retorna cor da medalha
 */
export function getMedalColor(
  position: number
): { base: string; shine: string; shadow: string } | null {
  const medal = getMedalType(position)

  if (!medal) return null

  const colors = {
    gold: {
      base: "var(--medal-gold)",
      shine: "var(--medal-gold-shine)",
      shadow: "var(--medal-gold-shadow)",
    },
    silver: {
      base: "var(--medal-silver)",
      shine: "var(--medal-silver-shine)",
      shadow: "var(--medal-silver-shadow)",
    },
    bronze: {
      base: "var(--medal-bronze)",
      shine: "var(--medal-bronze-shine)",
      shadow: "var(--medal-bronze-shadow)",
    },
  }

  return colors[medal]
}

/**
 * Verifica se usuário está no top N
 */
export function isInTopN(position: number, n: number): boolean {
  return position > 0 && position <= n
}

/**
 * Calcula diferença de XP para a próxima posição
 */
export function getXPToNextPosition(
  users: RankingUser[],
  userId: string
): number {
  const ranked = addRankingPositions(users)
  const userIndex = ranked.findIndex((u) => u.userId === userId)

  if (userIndex === -1 || userIndex === 0) {
    return 0 // Não encontrado ou já é o primeiro
  }

  const userAbove = ranked[userIndex - 1]
  const currentUser = ranked[userIndex]

  return userAbove.xp - currentUser.xp + 1 // +1 para ultrapassar
}

/**
 * Retorna mensagem motivacional baseada na posição
 */
export function getMotivationalMessage(
  position: number,
  totalUsers: number
): string {
  if (position === 1) {
    return "🏆 Você está em primeiro lugar! Continue assim!"
  }

  if (position <= 3) {
    return "🥇 Você está no pódio! Excelente trabalho!"
  }

  if (position <= 10) {
    return "⭐ Você está no top 10! Muito bem!"
  }

  const percentile = Math.floor((position / totalUsers) * 100)

  if (percentile <= 25) {
    return "💪 Você está entre os 25% melhores!"
  }

  if (percentile <= 50) {
    return "📈 Você está na metade superior! Continue se aprimorando!"
  }

  return "🎯 Continue finalizando cursos para subir no ranking!"
}
