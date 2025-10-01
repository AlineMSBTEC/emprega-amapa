"use client"

import { cn } from "@/lib/utils"
import type { EnrollmentStatus } from "@/types"
import {
  Clock,
  FileSearch,
  CheckCircle,
  Users,
  XCircle,
  Trophy,
  LucideIcon,
} from "lucide-react"

interface StatusBadgeProps {
  status: EnrollmentStatus
  size?: "sm" | "md" | "lg"
  className?: string
}

interface StatusConfig {
  label: string
  icon: LucideIcon
  bgVar: string
  fgVar: string
  lightVar: string
}

const statusConfigs: Record<EnrollmentStatus, StatusConfig> = {
  pending: {
    label: "Pendente",
    icon: Clock,
    bgVar: "var(--status-pending)",
    fgVar: "var(--status-pending-foreground)",
    lightVar: "var(--status-pending-light)",
  },
  "in-review": {
    label: "Em Avaliação",
    icon: FileSearch,
    bgVar: "var(--status-in-review)",
    fgVar: "var(--status-in-review-foreground)",
    lightVar: "var(--status-in-review-light)",
  },
  approved: {
    label: "Aprovado",
    icon: CheckCircle,
    bgVar: "var(--status-approved)",
    fgVar: "var(--status-approved-foreground)",
    lightVar: "var(--status-approved-light)",
  },
  waitlist: {
    label: "Lista de Espera",
    icon: Users,
    bgVar: "var(--status-waitlist)",
    fgVar: "var(--status-waitlist-foreground)",
    lightVar: "var(--status-waitlist-light)",
  },
  rejected: {
    label: "Recusado",
    icon: XCircle,
    bgVar: "var(--status-rejected)",
    fgVar: "var(--status-rejected-foreground)",
    lightVar: "var(--status-rejected-light)",
  },
  completed: {
    label: "Finalizado",
    icon: Trophy,
    bgVar: "var(--status-completed)",
    fgVar: "var(--status-completed-foreground)",
    lightVar: "var(--status-completed-light)",
  },
}

const sizeClasses = {
  sm: {
    container: "px-2 py-0.5 text-xs gap-1",
    icon: "w-3 h-3",
  },
  md: {
    container: "px-3 py-1 text-sm gap-1.5",
    icon: "w-4 h-4",
  },
  lg: {
    container: "px-4 py-1.5 text-base gap-2",
    icon: "w-5 h-5",
  },
}

export function StatusBadge({
  status,
  size = "md",
  className,
}: StatusBadgeProps) {
  const config = statusConfigs[status]
  const sizes = sizeClasses[size]
  const Icon = config.icon

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full font-medium",
        sizes.container,
        className
      )}
      style={{
        backgroundColor: config.bgVar,
        color: config.fgVar,
      }}
      role="status"
      aria-label={`Status: ${config.label}`}
    >
      <Icon className={sizes.icon} aria-hidden="true" />
      <span>{config.label}</span>
    </div>
  )
}

/**
 * Variante light do badge (para backgrounds escuros)
 */
export function StatusBadgeLight({
  status,
  size = "md",
  className,
}: StatusBadgeProps) {
  const config = statusConfigs[status]
  const sizes = sizeClasses[size]
  const Icon = config.icon

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full font-medium border-2",
        sizes.container,
        className
      )}
      style={{
        backgroundColor: config.lightVar,
        color: config.bgVar,
        borderColor: config.bgVar,
      }}
      role="status"
      aria-label={`Status: ${config.label}`}
    >
      <Icon className={sizes.icon} aria-hidden="true" />
      <span>{config.label}</span>
    </div>
  )
}
