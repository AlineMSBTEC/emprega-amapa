"use client"

import { cn } from "@/lib/utils"
import type { XPLevel, LevelCategory } from "@/types"

interface LevelBadgeProps {
  level: XPLevel
  size?: "sm" | "md" | "lg"
  showCategory?: boolean
  className?: string
}

const categoryColors: Record<
  LevelCategory,
  { bg: string; text: string; border: string }
> = {
  beginner: {
    bg: "bg-[var(--level-beginner-light)]",
    text: "text-[var(--level-beginner-dark)]",
    border: "border-[var(--level-beginner)]",
  },
  intermediate: {
    bg: "bg-[var(--level-intermediate-light)]",
    text: "text-[var(--level-intermediate-dark)]",
    border: "border-[var(--level-intermediate)]",
  },
  advanced: {
    bg: "bg-[var(--level-advanced-light)]",
    text: "text-[var(--level-advanced-dark)]",
    border: "border-[var(--level-advanced)]",
  },
  expert: {
    bg: "bg-[var(--level-expert-light)]",
    text: "text-[var(--level-expert-dark)]",
    border: "border-[var(--level-expert)]",
  },
}

const categoryLabels: Record<LevelCategory, string> = {
  beginner: "Iniciante",
  intermediate: "Intermediário",
  advanced: "Avançado",
  expert: "Especialista",
}

export function LevelBadge({
  level,
  size = "md",
  showCategory = false,
  className,
}: LevelBadgeProps) {
  const colors = categoryColors[level.category]

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-base",
  }

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border-2 font-semibold",
        colors.bg,
        colors.text,
        colors.border,
        sizeClasses[size],
        className
      )}
      role="status"
      aria-label={`Nível ${level.level}: ${level.title}`}
    >
      <span className="flex items-center gap-1.5">
        <span className="font-bold">Nível {level.level}</span>
        <span>•</span>
        <span>{level.title}</span>
      </span>
      {showCategory && (
        <>
          <span>•</span>
          <span className="text-xs opacity-80">
            {categoryLabels[level.category]}
          </span>
        </>
      )}
    </div>
  )
}
