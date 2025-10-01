"use client"

import { cn } from "@/lib/utils"
import { calculateLevelProgress, formatXP } from "@/lib/gamification"

interface XPProgressBarProps {
  currentXP: number
  showLabel?: boolean
  showPercentage?: boolean
  size?: "sm" | "md" | "lg"
  animated?: boolean
  className?: string
}

export function XPProgressBar({
  currentXP,
  showLabel = true,
  showPercentage = false,
  size = "md",
  animated = true,
  className,
}: XPProgressBarProps) {
  const { percentage, currentXP: levelXP, xpToNext, xpNeeded } = calculateLevelProgress(currentXP)

  const sizeClasses = {
    sm: "h-2",
    md: "h-3",
    lg: "h-4",
  }

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  }

  return (
    <div className={cn("w-full space-y-1", className)}>
      {showLabel && (
        <div
          className={cn(
            "flex items-center justify-between",
            textSizeClasses[size]
          )}
        >
          <span className="font-medium text-[var(--xp-text)]">
            {formatXP(levelXP)} / {formatXP(xpNeeded)} XP
          </span>
          {showPercentage && (
            <span className="text-muted-foreground">{percentage}%</span>
          )}
          {!showPercentage && (
            <span className="text-muted-foreground">
              {formatXP(xpToNext)} para o próximo nível
            </span>
          )}
        </div>
      )}

      <div
        className={cn(
          "relative w-full overflow-hidden rounded-full",
          "bg-[var(--xp-bar-background)] border border-[var(--xp-bar-border)]",
          sizeClasses[size]
        )}
      >
        <div
          className={cn(
            "h-full rounded-full",
            "bg-gradient-to-r from-[var(--xp-gradient-start)] to-[var(--xp-gradient-end)]",
            "shadow-[0_0_8px_var(--xp-glow)]",
            animated && "transition-all duration-500 ease-out"
          )}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${percentage}% de progresso para o próximo nível`}
        />
      </div>
    </div>
  )
}
