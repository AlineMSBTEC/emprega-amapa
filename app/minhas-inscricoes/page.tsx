"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockUser, mockEnrollments } from "@/data/user-mock"
import {
  BookOpen,
  Calendar,
  FileText,
  Download,
  Award,
  Clock,
  CheckCircle2,
  AlertCircle,
  Hourglass,
} from "lucide-react"
import { EnrollmentStatus } from "@/types"

const statusConfig: Record<
  EnrollmentStatus,
  { label: string; variant: "default" | "secondary" | "destructive" | "outline"; icon: any }
> = {
  pending: {
    label: "Pendente",
    variant: "secondary",
    icon: Hourglass,
  },
  approved: {
    label: "Aprovado",
    variant: "default",
    icon: CheckCircle2,
  },
  rejected: {
    label: "Recusado",
    variant: "destructive",
    icon: AlertCircle,
  },
  waitlist: {
    label: "Lista de Espera",
    variant: "outline",
    icon: Clock,
  },
}

export default function MyEnrollmentsPage() {
  const user = mockUser
  const enrollments = mockEnrollments

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">Emprega Amapá</h1>
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/cursos">
              <Button variant="ghost">Cursos</Button>
            </Link>
            <Link href="/minhas-inscricoes">
              <Button variant="ghost">Minhas Inscrições</Button>
            </Link>
            <div className="flex items-center gap-2 pl-4 border-l">
              <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                MS
              </div>
              <span className="text-sm font-medium hidden sm:inline">Maria Silva</span>
            </div>
          </nav>
        </div>
      </header>

      <main className="flex-1 bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Minhas Inscrições</h2>
            <p className="text-muted-foreground">
              Acompanhe o status das suas inscrições e certificados
            </p>
          </div>

          {/* User Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6 pb-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{enrollments.length}</p>
                    <p className="text-sm text-muted-foreground">Inscrições Ativas</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 pb-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{user.completedCourses}</p>
                    <p className="text-sm text-muted-foreground">Cursos Concluídos</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 pb-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                    <Award className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{user.points}</p>
                    <p className="text-sm text-muted-foreground">
                      Pontos de Visibilidade
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enrollments List */}
          {enrollments.length > 0 ? (
            <div className="space-y-4">
              {enrollments.map((enrollment) => {
                const statusInfo = statusConfig[enrollment.status]
                const StatusIcon = statusInfo.icon

                return (
                  <Card key={enrollment.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <CardTitle className="mb-2">
                            {enrollment.course.title}
                          </CardTitle>
                          <p className="text-sm text-muted-foreground">
                            {enrollment.course.institution}
                          </p>
                        </div>
                        <Badge variant={statusInfo.variant} className="flex items-center gap-1">
                          <StatusIcon className="h-3 w-3" />
                          {statusInfo.label}
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Enrollment Info */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">
                              Data de Inscrição
                            </p>
                            <p className="font-medium">
                              {new Date(enrollment.enrollmentDate).toLocaleDateString(
                                "pt-BR"
                              )}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">Documentos</p>
                            <p className="font-medium">
                              {enrollment.documents.length} arquivo(s)
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">
                              Última Atualização
                            </p>
                            <p className="font-medium">
                              {new Date(enrollment.updatedAt).toLocaleDateString(
                                "pt-BR"
                              )}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Status Message */}
                      <div className="bg-muted/50 rounded-lg p-4">
                        {enrollment.status === "pending" && (
                          <p className="text-sm">
                            ⏳ Sua inscrição está sendo analisada pela instituição. Você
                            receberá uma atualização em breve.
                          </p>
                        )}
                        {enrollment.status === "approved" && (
                          <p className="text-sm">
                            ✅ Parabéns! Sua inscrição foi aprovada. Aguarde instruções
                            sobre o início das aulas.
                          </p>
                        )}
                        {enrollment.status === "rejected" && (
                          <p className="text-sm">
                            ❌ Infelizmente sua inscrição não foi aprovada. Entre em
                            contato com a instituição para mais informações.
                          </p>
                        )}
                        {enrollment.status === "waitlist" && (
                          <p className="text-sm">
                            📋 Você está na lista de espera. Caso haja desistências,
                            você será notificado.
                          </p>
                        )}
                      </div>

                      {/* Certificate Download */}
                      {enrollment.certificateUrl && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                              <Award className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                              <p className="font-medium text-sm">
                                Certificado Disponível
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Curso concluído com sucesso
                              </p>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            Baixar
                          </Button>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex gap-3 pt-2">
                        <Link href={`/cursos/${enrollment.course.id}`} className="flex-1">
                          <Button variant="outline" className="w-full" size="sm">
                            Ver Detalhes do Curso
                          </Button>
                        </Link>
                        <Button variant="ghost" size="sm">
                          Ver Documentos Enviados
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  Você ainda não tem inscrições
                </h3>
                <p className="text-muted-foreground mb-6">
                  Explore nosso catálogo e inscreva-se em cursos de qualificação
                  profissional
                </p>
                <Link href="/cursos">
                  <Button>Ver Cursos Disponíveis</Button>
                </Link>
              </CardContent>
            </Card>
          )}

          {/* Info Card */}
          <Card className="mt-8 bg-primary/5 border-primary/20">
            <CardContent className="pt-6 pb-6">
              <div className="flex items-start gap-3">
                <Award className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">
                    Sistema de Pontuação e Visibilidade
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Cada curso concluído aumenta sua pontuação no sistema, melhorando
                    sua visibilidade para empresas e oportunidades de emprego. Quanto
                    mais cursos você completar, maior será sua classificação!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 Emprega Amapá - Sistema de Qualificação Profissional</p>
        </div>
      </footer>
    </div>
  )
}