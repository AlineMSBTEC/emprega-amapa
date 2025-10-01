"use client"

import { cn } from "@/lib/utils"
import type { Achievement } from "@/types"
import { getBadgeRarityColor, getBadgeRarityBorderColor } from "@/lib/gamification"
import * as LucideIcons from "lucide-react"
import { LucideIcon } from "lucide-react"

interface AchievementBadgeProps {
  achievement: Achievement
  size?: "sm" | "md" | "lg"
  showTitle?: boolean
  showDescription?: boolean
  onClick?: () => void
  className?: string
}

const sizeClasses = {
  sm: {
    container: "w-12 h-12",
    icon: "w-6 h-6",
    title: "text-xs",
    description: "text-xs",
  },
  md: {
    container: "w-16 h-16",
    icon: "w-8 h-8",
    title: "text-sm",
    description: "text-xs",
  },
  lg: {
    container: "w-20 h-20",
    icon: "w-10 h-10",
    title: "text-base",
    description: "text-sm",
  },
}

const rarityLabels = {
  common: "Comum",
  rare: "Raro",
  epic: "Épico",
  legendary: "Lendário",
}

export function AchievementBadge({
  achievement,
  size = "md",
  showTitle = true,
  showDescription = false,
  onClick,
  className,
}: AchievementBadgeProps) {
  const sizes = sizeClasses[size]
  const isLocked = achievement.isLocked

  // Get icon component dynamically
  const IconComponent = (LucideIcons[
    achievement.icon as keyof typeof LucideIcons
  ] || LucideIcons.Award) as LucideIcon

  const bgColor = getBadgeRarityColor(achievement.rarity)
  const borderColor = getBadgeRarityBorderColor(achievement.rarity)

  return (
    <div
      className={cn(
        "flex flex-col items-center gap-2 group",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={
        isLocked
          ? `Conquista bloqueada: ${achievement.title}`
          : `Conquista desbloqueada: ${achievement.title}`
      }
    >
      {/* Badge Circle */}
      <div
        className={cn(
          "relative flex items-center justify-center rounded-full border-4",
          "transition-all duration-300",
          sizes.container,
          isLocked
            ? "bg-muted border-border opacity-50 grayscale"
            : "border-2 shadow-lg hover:scale-110"
        )}
        style={
          !isLocked
            ? {
                backgroundColor: bgColor,
                borderColor: borderColor,
              }
            : undefined
        }
      >
        <IconComponent
          className={cn(
            sizes.icon,
            isLocked ? "text-muted-foreground" : "text-white drop-shadow-md"
          )}
        />

        {/* Lock Overlay */}
        {isLocked && (
          <div className="absolute inset-0 flex items-center justify-center">
            <LucideIcons.Lock className="w-4 h-4 text-muted-foreground" />
          </div>
        )}

        {/* New Badge Indicator */}
        {!isLocked && achievement.unlockedAt && isRecent(achievement.unlockedAt) && (
          <div className="absolute -top-1 -right-1">
            <div className="w-3 h-3 rounded-full bg-destructive animate-pulse" />
          </div>
        )}
      </div>

      {/* Title */}
      {showTitle && (
        <div className="text-center space-y-0.5">
          <p
            className={cn(
              "font-semibold",
              sizes.title,
              isLocked ? "text-muted-foreground" : "text-foreground"
            )}
          >
            {achievement.title}
          </p>
          <p className={cn("text-muted-foreground", sizes.description)}>
            {rarityLabels[achievement.rarity]}
            {!isLocked && achievement.xpReward > 0 && (
              <> • +{achievement.xpReward} XP</>
            )}
          </p>
        </div>
      )}

      {/* Description */}
      {showDescription && (
        <p
          className={cn(
            "text-center text-muted-foreground max-w-[200px]",
            sizes.description
          )}
        >
          {achievement.description}
        </p>
      )}
    </div>
  )
}

/**
 * Verifica se a conquista foi desbloqueada recentemente (últimas 24h)
 */
function isRecent(unlockedAt: string): boolean {
  const unlockedDate = new Date(unlockedAt)
  const now = new Date()
  const hoursDiff = (now.getTime() - unlockedDate.getTime()) / (1000 * 60 * 60)
  return hoursDiff < 24
}
