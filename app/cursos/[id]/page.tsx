import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { getCourseById } from "@/data/courses-mock"
import {
  Clock,
  MapPin,
  Users,
  Building2,
  Calendar,
  FileText,
  CheckCircle2,
  Award,
  ArrowLeft,
} from "lucide-react"

export default function CourseDetailsPage({
  params,
}: {
  params: { id: string }
}) {
  const course = getCourseById(params.id)

  if (!course) {
    notFound()
  }

  const isOpen = course.status === "open"

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1 bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          {/* Back Button */}
          <Link href="/cursos">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para Catálogo
            </Button>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Course Header */}
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <h2 className="text-3xl font-bold mb-2">{course.title}</h2>
                      <p className="text-muted-foreground">{course.description}</p>
                    </div>
                    <Badge variant={isOpen ? "default" : "secondary"} className="text-sm">
                      {isOpen ? "Inscrições Abertas" : "Encerrado"}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">{course.area}</Badge>
                    <Badge variant="outline" className="capitalize">
                      {course.modality}
                    </Badge>
                    {course.points && (
                      <Badge variant="outline">
                        <Award className="h-3 w-3 mr-1" />
                        {course.points} pontos
                      </Badge>
                    )}
                  </div>
                </CardHeader>
              </Card>

              {/* Course Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Informações do Curso</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <Building2 className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">Instituição</p>
                        <p className="text-sm text-muted-foreground">
                          {course.institution}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">Carga Horária</p>
                        <p className="text-sm text-muted-foreground">
                          {course.duration} horas
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">Modalidade</p>
                        <p className="text-sm text-muted-foreground capitalize">
                          {course.modality}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">Vagas</p>
                        <p className="text-sm text-muted-foreground">
                          {course.vacanciesRemaining} de {course.vacancies} disponíveis
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">Período</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(course.startDate).toLocaleDateString("pt-BR")} até{" "}
                          {new Date(course.endDate).toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                    </div>

                    {course.schedule && (
                      <div className="flex items-start gap-3">
                        <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium text-sm">Horário</p>
                          <p className="text-sm text-muted-foreground">
                            {course.schedule}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Prerequisites */}
              {course.prerequisites.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5" />
                      Pré-requisitos
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {course.prerequisites.map((prereq, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <span className="text-sm">{prereq}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Required Documents */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Documentos Obrigatórios
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Você precisará enviar os seguintes documentos no momento da
                    inscrição:
                  </p>
                  <ul className="space-y-2">
                    {course.requiredDocuments.map((doc, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span className="text-sm">{doc}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 p-4 bg-muted rounded-lg">
                    <p className="text-xs text-muted-foreground">
                      <strong>Formatos aceitos:</strong> PDF, JPG, PNG
                      <br />
                      <strong>Tamanho máximo:</strong> 5MB por arquivo
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar - Enrollment Action */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Inscrição</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isOpen ? (
                    <>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Vagas restantes:</span>
                          <span className="font-semibold">
                            {course.vacanciesRemaining}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Total de vagas:</span>
                          <span className="font-semibold">{course.vacancies}</span>
                        </div>
                        {course.points && (
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Pontuação:</span>
                            <span className="font-semibold flex items-center gap-1">
                              <Award className="h-3 w-3" />
                              {course.points} pontos
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="border-t pt-4">
                        <Link href={`/cursos/${course.id}/inscricao`}>
                          <Button className="w-full" size="lg">
                            Inscrever-se Agora
                          </Button>
                        </Link>
                        <p className="text-xs text-muted-foreground text-center mt-2">
                          Processo de inscrição simples e rápido
                        </p>
                      </div>

                      {course.vacanciesRemaining < 10 && (
                        <div className="bg-destructive/10 text-destructive rounded-lg p-3">
                          <p className="text-xs font-medium">
                            ⚠️ Últimas vagas disponíveis!
                          </p>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="space-y-4">
                      <div className="bg-muted rounded-lg p-4 text-center">
                        <p className="text-sm font-medium">
                          Inscrições encerradas
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Este curso não está mais disponível para inscrição
                        </p>
                      </div>
                      <Link href="/cursos">
                        <Button variant="outline" className="w-full">
                          Ver Outros Cursos
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}