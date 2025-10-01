"use client"

import { cn } from "@/lib/utils"
import { Award } from "lucide-react"

interface MedalProps {
  position: 1 | 2 | 3
  size?: "sm" | "md" | "lg"
  showPosition?: boolean
  className?: string
}

const medalStyles = {
  1: {
    bg: "bg-gradient-to-br from-[var(--medal-gold-shine)] to-[var(--medal-gold-shadow)]",
    border: "border-[var(--medal-gold)]",
    shadow: "shadow-[0_4px_12px_var(--medal-gold)]",
    label: "Ouro",
    emoji: "🥇",
  },
  2: {
    bg: "bg-gradient-to-br from-[var(--medal-silver-shine)] to-[var(--medal-silver-shadow)]",
    border: "border-[var(--medal-silver)]",
    shadow: "shadow-[0_4px_12px_var(--medal-silver)]",
    label: "Prata",
    emoji: "🥈",
  },
  3: {
    bg: "bg-gradient-to-br from-[var(--medal-bronze-shine)] to-[var(--medal-bronze-shadow)]",
    border: "border-[var(--medal-bronze)]",
    shadow: "shadow-[0_4px_12px_var(--medal-bronze)]",
    label: "Bronze",
    emoji: "🥉",
  },
}

const sizeClasses = {
  sm: {
    container: "w-8 h-8",
    icon: "w-4 h-4",
    text: "text-xs",
  },
  md: {
    container: "w-12 h-12",
    icon: "w-6 h-6",
    text: "text-sm",
  },
  lg: {
    container: "w-16 h-16",
    icon: "w-8 h-8",
    text: "text-base",
  },
}

export function Medal({
  position,
  size = "md",
  showPosition = true,
  className,
}: MedalProps) {
  const style = medalStyles[position]
  const sizes = sizeClasses[size]

  return (
    <div
      className={cn("flex flex-col items-center gap-1", className)}
      role="img"
      aria-label={`Medalha de ${style.label} - ${position}º lugar`}
    >
      <div
        className={cn(
          "relative flex items-center justify-center rounded-full border-4",
          "animate-pulse-glow",
          style.bg,
          style.border,
          style.shadow,
          sizes.container
        )}
      >
        <Award className={cn("text-white drop-shadow-lg", sizes.icon)} />
        {showPosition && (
          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center",
              "font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]",
              sizes.text
            )}
          >
            {position}
          </div>
        )}
      </div>
    </div>
  )
}

// Adicionar a animação ao globals.css via inline style
if (typeof document !== "undefined") {
  const style = document.createElement("style")
  style.textContent = `
    @keyframes pulse-glow {
      0%, 100% {
        opacity: 1;
        filter: brightness(1);
      }
      50% {
        opacity: 0.95;
        filter: brightness(1.1);
      }
    }
    .animate-pulse-glow {
      animation: pulse-glow 2s ease-in-out infinite;
    }
  `
  document.head.appendChild(style)
}
