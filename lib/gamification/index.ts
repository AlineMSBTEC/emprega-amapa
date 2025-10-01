/**
 * Gamification System - Main Export
 * Sistema de gamificação do Emprega Amapá
 */

// XP System
export {
  XP_REWARDS,
  LEVELS,
  calculateLevel,
  getNextLevel,
  calculateLevelProgress,
  calculateCourseXP,
  checkLevelUp,
  getLevelCategory,
  formatXP,
  createXPTransaction,
  sumXPTransactions,
} from "./xp-system"

// Achievements System
export {
  ACHIEVEMENTS,
  checkAchievementUnlocks,
  getAllAchievements,
  getBadgeRarityColor,
  getBadgeRarityBorderColor,
  sortAchievementsByRarity,
  getRecentAchievements,
  calculateAchievementProgress,
} from "./achievements"

// Ranking System
export {
  sortUsersByXP,
  addRankingPositions,
  filterByMunicipality,
  filterBySpecialty,
  filterByLevelRange,
  applyRankingFilters,
  getTopRanking,
  getPodium,
  findUserPosition,
  getRankingContext,
  getRankingStats,
  getMedalType,
  getMedalColor,
  isInTopN,
  getXPToNextPosition,
  getMotivationalMessage,
} from "./ranking"
