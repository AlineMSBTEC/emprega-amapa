import type { Achievement, BadgeRarity, UserGamificationProfile } from "@/types"

/**
 * Sistema de Conquistas e Badges
 * Gerencia desbloqueio de emblemas e conquistas
 */

// Definição de todas as conquistas disponíveis
export const ACHIEVEMENTS: Omit<Achievement, "unlockedAt" | "isLocked">[] = [
  {
    id: "first-course",
    title: "Primeira Jornada",
    description: "Complete seu primeiro curso",
    icon: "GraduationCap",
    rarity: "common",
    xpReward: 25,
  },
  {
    id: "courses-5",
    title: "Aprendiz Dedicado",
    description: "Complete 5 cursos",
    icon: "BookOpen",
    rarity: "rare",
    xpReward: 100,
  },
  {
    id: "courses-10",
    title: "Especialista em Formação",
    description: "Complete 10 cursos",
    icon: "Award",
    rarity: "epic",
    xpReward: 200,
  },
  {
    id: "courses-25",
    title: "Mestre do Conhecimento",
    description: "Complete 25 cursos",
    icon: "Trophy",
    rarity: "legendary",
    xpReward: 500,
  },
  {
    id: "certificate-first",
    title: "Certificado Conquistado",
    description: "Envie seu primeiro certificado",
    icon: "FileCheck",
    rarity: "common",
    xpReward: 20,
  },
  {
    id: "certificate-5",
    title: "Colecionador de Diplomas",
    description: "Envie 5 certificados",
    icon: "FileStack",
    rarity: "rare",
    xpReward: 100,
  },
  {
    id: "level-5",
    title: "Qualificado",
    description: "Alcance o nível 5",
    icon: "Star",
    rarity: "rare",
    xpReward: 50,
  },
  {
    id: "level-10",
    title: "Lendário",
    description: "Alcance o nível máximo (10)",
    icon: "Crown",
    rarity: "legendary",
    xpReward: 300,
  },
  {
    id: "streak-7",
    title: "Semana Intensa",
    description: "Mantenha 7 dias consecutivos de atividade",
    icon: "Flame",
    rarity: "rare",
    xpReward: 75,
  },
  {
    id: "streak-30",
    title: "Dedicação Total",
    description: "Mantenha 30 dias consecutivos de atividade",
    icon: "Zap",
    rarity: "epic",
    xpReward: 250,
  },
  {
    id: "top-10",
    title: "Top 10",
    description: "Entre no top 10 do ranking",
    icon: "Medal",
    rarity: "epic",
    xpReward: 150,
  },
  {
    id: "top-3",
    title: "Pódio",
    description: "Entre no top 3 do ranking",
    icon: "Podium",
    rarity: "legendary",
    xpReward: 300,
  },
]

/**
 * Verifica quais conquistas foram desbloqueadas
 */
export function checkAchievementUnlocks(
  profile: UserGamificationProfile,
  previousProfile?: Partial<UserGamificationProfile>
): Achievement[] {
  const newlyUnlocked: Achievement[] = []
  const currentUnlockedIds = new Set(
    profile.achievements.filter((a) => !a.isLocked).map((a) => a.id)
  )
  const previousUnlockedIds = new Set(
    previousProfile?.achievements?.filter((a) => !a.isLocked).map((a) => a.id) || []
  )

  // Conquistas baseadas em cursos completos
  if (
    profile.coursesCompleted >= 1 &&
    !currentUnlockedIds.has("first-course") &&
    !previousUnlockedIds.has("first-course")
  ) {
    newlyUnlocked.push(createUnlockedAchievement("first-course"))
  }

  if (
    profile.coursesCompleted >= 5 &&
    !currentUnlockedIds.has("courses-5") &&
    !previousUnlockedIds.has("courses-5")
  ) {
    newlyUnlocked.push(createUnlockedAchievement("courses-5"))
  }

  if (
    profile.coursesCompleted >= 10 &&
    !currentUnlockedIds.has("courses-10") &&
    !previousUnlockedIds.has("courses-10")
  ) {
    newlyUnlocked.push(createUnlockedAchievement("courses-10"))
  }

  if (
    profile.coursesCompleted >= 25 &&
    !currentUnlockedIds.has("courses-25") &&
    !previousUnlockedIds.has("courses-25")
  ) {
    newlyUnlocked.push(createUnlockedAchievement("courses-25"))
  }

  // Conquistas baseadas em certificados
  if (
    profile.certificatesUploaded >= 1 &&
    !currentUnlockedIds.has("certificate-first") &&
    !previousUnlockedIds.has("certificate-first")
  ) {
    newlyUnlocked.push(createUnlockedAchievement("certificate-first"))
  }

  if (
    profile.certificatesUploaded >= 5 &&
    !currentUnlockedIds.has("certificate-5") &&
    !previousUnlockedIds.has("certificate-5")
  ) {
    newlyUnlocked.push(createUnlockedAchievement("certificate-5"))
  }

  // Conquistas baseadas em nível
  if (
    profile.level.level >= 5 &&
    !currentUnlockedIds.has("level-5") &&
    !previousUnlockedIds.has("level-5")
  ) {
    newlyUnlocked.push(createUnlockedAchievement("level-5"))
  }

  if (
    profile.level.level >= 10 &&
    !currentUnlockedIds.has("level-10") &&
    !previousUnlockedIds.has("level-10")
  ) {
    newlyUnlocked.push(createUnlockedAchievement("level-10"))
  }

  // Conquistas baseadas em streak
  if (
    profile.streakDays >= 7 &&
    !currentUnlockedIds.has("streak-7") &&
    !previousUnlockedIds.has("streak-7")
  ) {
    newlyUnlocked.push(createUnlockedAchievement("streak-7"))
  }

  if (
    profile.streakDays >= 30 &&
    !currentUnlockedIds.has("streak-30") &&
    !previousUnlockedIds.has("streak-30")
  ) {
    newlyUnlocked.push(createUnlockedAchievement("streak-30"))
  }

  // Conquistas baseadas em ranking
  if (
    profile.rankingPosition &&
    profile.rankingPosition <= 10 &&
    !currentUnlockedIds.has("top-10") &&
    !previousUnlockedIds.has("top-10")
  ) {
    newlyUnlocked.push(createUnlockedAchievement("top-10"))
  }

  if (
    profile.rankingPosition &&
    profile.rankingPosition <= 3 &&
    !currentUnlockedIds.has("top-3") &&
    !previousUnlockedIds.has("top-3")
  ) {
    newlyUnlocked.push(createUnlockedAchievement("top-3"))
  }

  return newlyUnlocked
}

/**
 * Cria uma conquista desbloqueada
 */
function createUnlockedAchievement(achievementId: string): Achievement {
  const achievement = ACHIEVEMENTS.find((a) => a.id === achievementId)
  if (!achievement) {
    throw new Error(`Achievement ${achievementId} not found`)
  }

  return {
    ...achievement,
    unlockedAt: new Date().toISOString(),
    isLocked: false,
  }
}

/**
 * Retorna todas as conquistas com status de bloqueio
 */
export function getAllAchievements(
  unlockedIds: string[] = []
): Achievement[] {
  return ACHIEVEMENTS.map((achievement) => ({
    ...achievement,
    isLocked: !unlockedIds.includes(achievement.id),
    unlockedAt: unlockedIds.includes(achievement.id)
      ? new Date().toISOString()
      : undefined,
  }))
}

/**
 * Retorna a cor CSS variable baseada na raridade
 */
export function getBadgeRarityColor(rarity: BadgeRarity): string {
  const colors: Record<BadgeRarity, string> = {
    common: "var(--badge-common)",
    rare: "var(--badge-rare)",
    epic: "var(--badge-epic)",
    legendary: "var(--badge-legendary)",
  }
  return colors[rarity]
}

/**
 * Retorna a cor da borda baseada na raridade
 */
export function getBadgeRarityBorderColor(rarity: BadgeRarity): string {
  const colors: Record<BadgeRarity, string> = {
    common: "var(--badge-common-border)",
    rare: "var(--badge-rare-border)",
    epic: "var(--badge-epic-border)",
    legendary: "var(--badge-legendary-border)",
  }
  return colors[rarity]
}

/**
 * Ordena conquistas por raridade (legendária primeiro)
 */
export function sortAchievementsByRarity(
  achievements: Achievement[]
): Achievement[] {
  const rarityOrder: Record<BadgeRarity, number> = {
    legendary: 0,
    epic: 1,
    rare: 2,
    common: 3,
  }

  return [...achievements].sort(
    (a, b) => rarityOrder[a.rarity] - rarityOrder[b.rarity]
  )
}

/**
 * Retorna as 3 conquistas mais recentes
 */
export function getRecentAchievements(
  achievements: Achievement[],
  limit = 3
): Achievement[] {
  return achievements
    .filter((a) => !a.isLocked && a.unlockedAt)
    .sort(
      (a, b) =>
        new Date(b.unlockedAt!).getTime() - new Date(a.unlockedAt!).getTime()
    )
    .slice(0, limit)
}

/**
 * Calcula progresso de conquistas (% desbloqueadas)
 */
export function calculateAchievementProgress(
  achievements: Achievement[]
): {
  unlocked: number
  total: number
  percentage: number
} {
  const unlocked = achievements.filter((a) => !a.isLocked).length
  const total = achievements.length

  return {
    unlocked,
    total,
    percentage: Math.floor((unlocked / total) * 100),
  }
}
