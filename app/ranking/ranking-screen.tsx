"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { formatXP, calculateLevel } from "@/lib/gamification"
import type { RankingUser } from "@/types"
import { User, Lock, BookOpen, GraduationCap, Target } from "lucide-react"

// Mock data - usuário atual
const currentUser = {
  userId: "current-user",
  name: "João Silva",
  xp: 50,
  level: calculateLevel(50),
  coursesCompleted: 1,
  achievements: [],
  position: 21,
}

// Mock data - ranking
const mockRankingUsers: RankingUser[] = Array.from({ length: 20 }, (_, i) => ({
  userId: `user-${i + 1}`,
  name: `${["Maria", "Pedro", "Ana", "Carlos", "Juliana", "Roberto", "Fernanda", "Lucas", "Camila", "Rafael"][i % 10]} ${["Silva", "Santos", "Oliveira", "Souza", "Costa", "Lima", "Pereira", "Ferreira"][i % 8]}`,
  xp: 1000 - i * 40,
  level: calculateLevel(1000 - i * 40),
  coursesCompleted: 25 - i,
  achievements: [],
  position: i + 1,
  municipality: ["Macapá", "Santana", "Laranjal do Jari", "Oiapoque"][i % 4],
  specialty: ["TI", "Gestão", "Saúde", "Educação"][i % 4],
}))

// Divisões baseadas em cursos completados
const leagues = [
  {
    name: "Iniciante",
    color: "from-green-600 to-green-800",
    icon: "🌱",
    locked: false,
    courses: "0-5 cursos",
    description: "Começando a jornada"
  },
  {
    name: "Aprendiz",
    color: "from-blue-500 to-blue-700",
    icon: "📚",
    locked: true,
    courses: "6-15 cursos",
    description: "Desenvolvendo conhecimento"
  },
  {
    name: "Profissional",
    color: "from-purple-500 to-purple-700",
    icon: "🎓",
    locked: true,
    courses: "16-30 cursos",
    description: "Especialista em formação"
  },
  {
    name: "Expert",
    color: "from-yellow-400 to-yellow-600",
    icon: "👑",
    locked: true,
    courses: "30+ cursos",
    description: "Líder em capacitação"
  },
]

export function RankingScreen() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna Principal - Ranking */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header - Divisão */}
            <div className="text-center space-y-6">
              {/* Badges de Liga */}
              <div className="flex justify-center gap-3">
                {leagues.map((league, idx) => (
                  <div
                    key={idx}
                    className={`relative w-16 h-20 rounded-2xl bg-gradient-to-br ${league.color}
                    flex items-center justify-center text-3xl
                    ${league.locked ? "opacity-30" : "shadow-lg"}`}
                  >
                    {league.locked && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-2xl">
                        <Lock className="w-6 h-6 text-white" />
                      </div>
                    )}
                    <span>{league.icon}</span>
                  </div>
                ))}
              </div>

              <div>
                <h1 className="text-4xl font-bold mb-2">Divisão Iniciante</h1>
                <p className="text-muted-foreground mb-2">
                  Complete cursos para subir no ranking dessa semana.
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  {leagues[0].courses} • {leagues[0].description}
                </p>
                <Button size="lg" asChild>
                  <Link href="/cursos">
                    <BookOpen className="w-4 h-4 mr-2" />
                    EXPLORAR CURSOS
                  </Link>
                </Button>
              </div>
            </div>

            {/* Lista de Ranking */}
            <Card className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Ranking Semanal</h2>
                <div className="text-sm text-muted-foreground">
                  Top 20 • Atualizado hoje
                </div>
              </div>
              <div className="space-y-2">
                {mockRankingUsers.map((user, idx) => (
                  <RankingRow key={user.userId} user={user} position={idx + 1} />
                ))}
              </div>
            </Card>

            {/* Card do Usuário Atual */}
            <Card className="p-4 bg-gradient-to-r from-primary/5 to-secondary/5 border-2 border-primary/30">
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-muted-foreground w-8">
                  {currentUser.position}
                </span>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center relative">
                  <User className="w-6 h-6" />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white dark:bg-gray-900 flex items-center justify-center border-2 border-primary">
                    <span className="text-xs">👤</span>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{currentUser.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <GraduationCap className="w-3 h-3 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {currentUser.coursesCompleted} {currentUser.coursesCompleted === 1 ? 'curso' : 'cursos'}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">{formatXP(currentUser.xp)}</p>
                  <p className="text-xs text-muted-foreground">XP</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar Direita */}
          <div className="space-y-6">
            {/* Info da Liga Atual */}
            <Card className="p-6 bg-gradient-to-br from-green-500/10 to-green-700/10 border-green-500/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-xl bg-green-500/20 flex items-center justify-center text-3xl">
                  🌱
                </div>
                <div>
                  <p className="font-bold text-lg">Iniciante</p>
                  <p className="text-sm text-muted-foreground">Sua divisão atual</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Seus cursos:</span>
                  <span className="font-semibold">{currentUser.coursesCompleted}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Seu XP:</span>
                  <span className="font-semibold">{formatXP(currentUser.xp)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Posição:</span>
                  <span className="font-semibold">#{currentUser.position}</span>
                </div>
              </div>
              <div className="mt-4 p-3 bg-green-500/10 rounded-lg">
                <p className="text-xs text-muted-foreground">
                  💡 Complete mais cursos para subir no ranking e desbloquear a próxima divisão!
                </p>
              </div>
            </Card>

            {/* Próxima Divisão */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Próxima Divisão</h3>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center text-2xl relative">
                  📚
                  <Lock className="absolute w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-semibold">Aprendiz</p>
                  <p className="text-xs text-muted-foreground">
                    {leagues[1].courses}
                  </p>
                </div>
              </div>
              <div className="mt-3">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Progresso</span>
                  <span className="font-semibold">{currentUser.coursesCompleted}/6 cursos</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
                    style={{ width: `${Math.min(100, (currentUser.coursesCompleted / 6) * 100)}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Faltam {6 - currentUser.coursesCompleted} cursos para desbloquear
                </p>
              </div>
            </Card>

            {/* Como Funciona */}
            <Card className="p-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Target className="w-4 h-4" />
                Como funciona?
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Complete cursos para ganhar XP</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Cada curso finalizado = +50 XP</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Certificado enviado = +20 XP extra</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Suba de divisão completando mais cursos</span>
                </li>
              </ul>
            </Card>

            {/* CTA */}
            <Card className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10">
              <h3 className="font-semibold mb-2">Quer subir no ranking?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Explore nosso catálogo e comece um novo curso hoje!
              </p>
              <Button className="w-full" asChild>
                <Link href="/cursos">
                  Ver Cursos Disponíveis
                </Link>
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

function RankingRow({ user, position }: { user: RankingUser; position: number }) {
  const isTopThree = position <= 3

  return (
    <div
      className={`flex items-center gap-4 p-3 rounded-lg hover:bg-accent/50 transition-colors
      ${isTopThree ? "bg-primary/5" : ""}`}
    >
      {/* Posição */}
      <div className="w-8 text-center">
        {isTopThree ? (
          <span className="text-2xl">
            {position === 1 ? "🥇" : position === 2 ? "🥈" : "🥉"}
          </span>
        ) : (
          <span className="text-lg font-semibold text-muted-foreground">
            {position}
          </span>
        )}
      </div>

      {/* Avatar */}
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center">
        <User className="w-6 h-6" />
      </div>

      {/* Nome e Info */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold truncate">{user.name}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <GraduationCap className="w-3 h-3 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">
            {user.coursesCompleted} {user.coursesCompleted === 1 ? 'curso' : 'cursos'}
          </span>
        </div>
      </div>

      {/* XP */}
      <div className="text-right">
        <p className="text-lg font-bold">{formatXP(user.xp)}</p>
        <p className="text-xs text-muted-foreground">XP</p>
      </div>
    </div>
  )
}
