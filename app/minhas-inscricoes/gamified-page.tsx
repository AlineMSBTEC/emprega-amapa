"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  XPProgressBar,
  LevelBadge,
  AchievementBadge,
  StatusBadge,
} from "@/components/gamification"
import {
  calculateLevel,
  formatXP,
  getAllAchievements,
  calculateAchievementProgress,
} from "@/lib/gamification"
import type { UserGamificationProfile, EnrollmentGamified } from "@/types"
import {
  Trophy,
  Award,
  Zap,
  Calendar,
  Medal,
  Download,
  ExternalLink,
  Flame,
  User,
  TrendingUp,
  BookOpen,
} from "lucide-react"

// Mock data - Perfil do usuário
const mockProfile: UserGamificationProfile = {
  userId: "user-1",
  xp: 50,
  level: calculateLevel(50),
  achievements: getAllAchievements(["first-course"]),
  coursesCompleted: 1,
  certificatesUploaded: 0,
  streakDays: 1,
  rankingPosition: 21,
}

const mockEnrollments: EnrollmentGamified[] = [
  {
    id: "enroll-1",
    courseId: "course-1",
    course: {
      id: "course-1",
      title: "Excel Avançado para o Mercado de Trabalho",
      institution: "SENAC Amapá",
      description: "Domine fórmulas, tabelas dinâmicas e dashboards profissionais",
      modality: "online",
      duration: 40,
      status: "open",
      vacancies: 50,
      vacanciesRemaining: 12,
      area: "Informática",
      prerequisites: [],
      requiredDocuments: [],
      startDate: "2025-08-15",
      endDate: "2025-09-15",
    },
    status: "completed",
    enrollmentDate: "2025-08-10",
    studentData: {
      fullName: "João Silva",
      cpf: "123.456.789-00",
      email: "joao@email.com",
      phone: "(96) 99999-9999",
    },
    documents: [],
    certificateUrl: "/certificates/excel-avancado.pdf",
    updatedAt: "2025-09-20",
    xpEarned: 50,
    achievementsUnlocked: [],
  },
  {
    id: "enroll-2",
    courseId: "course-2",
    course: {
      id: "course-2",
      title: "Auxiliar Administrativo",
      institution: "SENAI Amapá",
      description: "Aprenda rotinas administrativas, atendimento e organização documental",
      modality: "presencial",
      duration: 160,
      status: "open",
      vacancies: 30,
      vacanciesRemaining: 8,
      area: "Administração",
      prerequisites: [],
      requiredDocuments: [],
      startDate: "2025-10-01",
      endDate: "2025-12-15",
    },
    status: "approved",
    enrollmentDate: "2025-09-25",
    studentData: {
      fullName: "João Silva",
      cpf: "123.456.789-00",
      email: "joao@email.com",
      phone: "(96) 99999-9999",
    },
    documents: [],
    updatedAt: "2025-09-26",
    xpEarned: 0,
    achievementsUnlocked: [],
  },
  {
    id: "enroll-3",
    courseId: "course-3",
    course: {
      id: "course-3",
      title: "Eletricista Predial",
      institution: "SENAI Amapá",
      description: "Instalações elétricas residenciais e comerciais",
      modality: "presencial",
      duration: 200,
      status: "open",
      vacancies: 25,
      vacanciesRemaining: 3,
      area: "Construção Civil",
      prerequisites: [],
      requiredDocuments: [],
      startDate: "2025-11-10",
      endDate: "2026-03-10",
    },
    status: "pending",
    enrollmentDate: "2025-09-28",
    studentData: {
      fullName: "João Silva",
      cpf: "123.456.789-00",
      email: "joao@email.com",
      phone: "(96) 99999-9999",
    },
    documents: [],
    updatedAt: "2025-09-28",
    xpEarned: 0,
    achievementsUnlocked: [],
  },
]

export function GamifiedEnrollmentsPage() {
  const achievementProgress = calculateAchievementProgress(mockProfile.achievements)
  const unlockedAchievements = mockProfile.achievements.filter((a) => !a.isLocked)

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna Principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Card de Perfil */}
            <Card className="overflow-hidden">
              {/* Banner com Avatar */}
              <div className="relative h-48 bg-gradient-to-br from-primary via-secondary to-tertiary">
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute top-4 right-4 rounded-full"
                >
                  <User className="w-4 h-4" />
                </Button>
                <div className="absolute -bottom-16 left-8">
                  <div className="w-32 h-32 rounded-full border-4 border-background bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <User className="w-16 h-16 text-primary" />
                  </div>
                </div>
              </div>

              {/* Info do Usuário */}
              <div className="pt-20 px-8 pb-6 space-y-4">
                <div>
                  <h1 className="text-3xl font-bold">João Silva</h1>
                  <p className="text-muted-foreground">@joaosilva</p>
                  <p className="text-sm text-muted-foreground">
                    Por aqui desde setembro de 2025
                  </p>
                </div>

                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-primary" />
                    <span><span className="font-bold">{mockProfile.coursesCompleted}</span> {mockProfile.coursesCompleted === 1 ? 'curso concluído' : 'cursos concluídos'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-secondary" />
                    <span><span className="font-bold">{mockProfile.achievements.filter(a => !a.isLocked).length}</span> conquistas</span>
                  </div>
                </div>

                <LevelBadge level={mockProfile.level} size="lg" />
              </div>
            </Card>

            {/* Estatísticas */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Estatísticas</h2>
              <div className="grid grid-cols-2 gap-4">
                {/* Dias Seguidos */}
                <Card className="p-6 bg-gradient-to-br from-orange-500/10 to-orange-600/5 border-orange-500/20">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center">
                      <Flame className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold">{mockProfile.streakDays}</p>
                      <p className="text-sm text-muted-foreground">Dias seguidos</p>
                    </div>
                  </div>
                </Card>

                {/* Total de XP */}
                <Card className="p-6 bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border-yellow-500/20">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                      <Zap className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold">{formatXP(mockProfile.xp)}</p>
                      <p className="text-sm text-muted-foreground">Total de XP</p>
                    </div>
                  </div>
                </Card>

                {/* Liga/Divisão */}
                <Card className="p-6 bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-xl font-bold capitalize">{mockProfile.level.category}</p>
                      <p className="text-sm text-muted-foreground">Divisão</p>
                    </div>
                  </div>
                  <div className="mt-2 px-2 py-1 bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 rounded text-xs font-semibold inline-block">
                    ESTA SEMANA
                  </div>
                </Card>

                {/* Pódios */}
                <Card className="p-6 bg-gradient-to-br from-gray-500/10 to-gray-600/5 border-gray-500/20">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gray-500/20 flex items-center justify-center">
                      <Medal className="w-6 h-6 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold">0</p>
                      <p className="text-sm text-muted-foreground">Pódios</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Conquistas */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Conquistas</h2>
                <Button variant="link" asChild>
                  <Link href="/conquistas">VER TODAS</Link>
                </Button>
              </div>

              <div className="space-y-4">
                {unlockedAchievements.slice(0, 3).map((achievement) => (
                  <Card key={achievement.id} className="p-4">
                    <div className="flex items-center gap-4">
                      <AchievementBadge
                        achievement={achievement}
                        size="lg"
                        showTitle={false}
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">{achievement.title}</h3>
                          <span className="text-sm text-muted-foreground">
                            {achievementProgress.unlocked}/{achievementProgress.total}
                          </span>
                        </div>
                        <XPProgressBar
                          currentXP={mockProfile.xp}
                          size="sm"
                          showLabel={false}
                        />
                        <p className="text-sm text-muted-foreground mt-2">
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Minhas Inscrições */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Minhas Inscrições</h2>
              <div className="space-y-4">
                {mockEnrollments.map((enrollment) => (
                  <EnrollmentCard key={enrollment.id} enrollment={enrollment} />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Direita */}
          <div className="space-y-6">
            {/* Top 3 do Ranking */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">TOP 3 DO RANKING</h3>
                <Trophy className="w-5 h-5 text-primary" />
              </div>

              <div className="space-y-3">
                {[
                  { name: "Maria Lacerda", coursesCompleted: 32, position: 1 },
                  { name: "Júnior Coimbra", coursesCompleted: 28, position: 2 },
                  { name: "Arthur Araújo", coursesCompleted: 24, position: 3 },
                ].map((user, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center font-bold text-primary">
                      #{user.position}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{user.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {user.coursesCompleted} cursos concluídos
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Próxima Divisão */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Próxima Divisão</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Divisão Atual</span>
                  <span className="font-semibold text-primary">🌱 Iniciante</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Próxima Divisão</span>
                  <span className="font-semibold">📚 Aprendiz</span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progresso</span>
                    <span className="font-semibold">{mockProfile.coursesCompleted}/6 cursos</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all"
                      style={{ width: `${(mockProfile.coursesCompleted / 6) * 100}%` }}
                    />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Complete mais {6 - mockProfile.coursesCompleted} cursos para avançar!
                </p>
              </div>
            </Card>

            {/* Sua Posição no Ranking */}
            <Card className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10">
              <div className="flex items-center gap-3 mb-3">
                <TrendingUp className="w-6 h-6 text-primary" />
                <div>
                  <p className="font-semibold">Sua Posição</p>
                  <p className="text-2xl font-bold text-primary">
                    #{mockProfile.rankingPosition}
                  </p>
                </div>
              </div>
              <Button className="w-full" asChild>
                <Link href="/ranking">Ver Ranking Completo</Link>
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

function EnrollmentCard({ enrollment }: { enrollment: EnrollmentGamified }) {
  const isCompleted = enrollment.status === "completed"

  return (
    <Card
      className={`p-5 ${
        isCompleted
          ? "border-2 border-[var(--status-completed)] bg-[var(--status-completed-light)]"
          : ""
      }`}
    >
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Icon/Badge */}
        <div className="flex-shrink-0">
          <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
            <BookOpen className="w-8 h-8 text-primary" />
          </div>
        </div>

        {/* Informações do Curso */}
        <div className="flex-1 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-lg">{enrollment.course.title}</h3>
            <StatusBadge status={enrollment.status} size="sm" />
          </div>

          <p className="text-sm text-muted-foreground">
            {enrollment.course.institution} • {enrollment.course.modality} •{" "}
            {enrollment.course.duration}h
          </p>

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              Inscrição: {new Date(enrollment.enrollmentDate).toLocaleDateString("pt-BR")}
            </div>
          </div>

          {isCompleted && enrollment.xpEarned > 0 && (
            <div className="flex items-center gap-2 text-primary font-semibold text-sm">
              <Trophy className="w-4 h-4" />
              +{enrollment.xpEarned} XP conquistados
            </div>
          )}

          {/* Ações */}
          <div className="flex gap-2 pt-2">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/cursos/${enrollment.courseId}`}>
                Ver Detalhes
                <ExternalLink className="w-3 h-3 ml-2" />
              </Link>
            </Button>

            {isCompleted && enrollment.certificateUrl && (
              <Button size="sm" asChild>
                <a
                  href={enrollment.certificateUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="w-3 h-3 mr-2" />
                  Certificado
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}
