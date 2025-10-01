import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { mockUser } from "@/data/user-mock"
import { Trophy, Zap } from "lucide-react"

export function SiteHeader() {
  const user = mockUser
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  // Mock gamification data
  const xp = 50
  const coursesCompleted = 1

  return (
    <header className="border-b bg-card sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
          <Image
            src="/logo-emprega-amapa.png"
            alt="Emprega Amapá"
            width={180}
            height={60}
            priority
            className="h-12 w-auto"
          />
        </Link>
        <nav className="flex items-center gap-2 sm:gap-4">
          <Link href="/cursos">
            <Button variant="ghost" size="sm" className="sm:size-default">
              Cursos
            </Button>
          </Link>
          <Link href="/minhas-inscricoes">
            <Button variant="ghost" size="sm" className="sm:size-default">
              <span className="hidden sm:inline">Minhas Inscrições</span>
              <span className="sm:hidden">Inscrições</span>
            </Button>
          </Link>
          <Link href="/ranking">
            <Button variant="ghost" size="sm" className="sm:size-default">
              <Trophy className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Ranking</span>
            </Button>
          </Link>

          {/* XP Display */}
          <div className="hidden lg:flex items-center gap-3 px-3 py-1.5 rounded-lg bg-primary/10">
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold">{xp} XP</span>
            </div>
            <div className="w-px h-4 bg-border" />
            <div className="flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold">{coursesCompleted}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 pl-2 sm:pl-4 border-l">
            <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
              {initials}
            </div>
            <span className="text-sm font-medium hidden md:inline">
              {user.name}
            </span>
          </div>
        </nav>
      </div>
    </header>
  )
}