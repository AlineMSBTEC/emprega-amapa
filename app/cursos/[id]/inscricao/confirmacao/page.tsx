import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { getCourseById } from "@/data/courses-mock"
import { CheckCircle2, Home, List } from "lucide-react"

export default function ConfirmationPage({ params }: { params: { id: string } }) {
  const course = getCourseById(params.id)

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Curso não encontrado</h2>
          <Link href="/cursos">
            <Button>Voltar para Catálogo</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold">Emprega Amapá</h1>
          </Link>
          <nav className="flex items-center gap-4">
            <div className="flex items-center gap-2 pl-4 border-l">
              <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                MS
              </div>
              <span className="text-sm font-medium hidden sm:inline">
                Maria Silva
              </span>
            </div>
          </nav>
        </div>
      </header>

      <main className="flex-1 bg-muted/30 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <Card className="text-center">
            <CardContent className="pt-12 pb-12">
              {/* Success Icon */}
              <div className="mb-6 flex justify-center">
                <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="h-12 w-12 text-green-600" />
                </div>
              </div>

              {/* Success Message */}
              <h2 className="text-3xl font-bold mb-3">
                Inscrição Enviada com Sucesso!
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Sua inscrição no curso <strong>{course.title}</strong> foi registrada.
              </p>

              {/* Status Info */}
              <Card className="bg-muted/50 border-dashed mb-8">
                <CardContent className="pt-6 pb-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Status:</span>
                      <span className="font-semibold text-orange-600">
                        Pendente de Análise
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Curso:</span>
                      <span className="font-medium">{course.title}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Instituição:</span>
                      <span className="font-medium">{course.institution}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Next Steps */}
              <div className="text-left mb-8 bg-muted/50 rounded-lg p-6">
                <h3 className="font-semibold mb-3 text-center">📋 Próximos Passos</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-foreground">1.</span>
                    <span>
                      Sua inscrição será analisada pela instituição{" "}
                      <strong className="text-foreground">{course.institution}</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-foreground">2.</span>
                    <span>
                      Você receberá um email com atualizações sobre o status da sua
                      inscrição
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-foreground">3.</span>
                    <span>
                      Acompanhe o andamento na área{" "}
                      <strong className="text-foreground">"Minhas Inscrições"</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-foreground">4.</span>
                    <span>
                      Após aprovação, você receberá instruções sobre o início das aulas
                    </span>
                  </li>
                </ul>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/minhas-inscricoes">
                  <Button size="lg" className="w-full sm:w-auto">
                    <List className="mr-2 h-5 w-5" />
                    Ver Minhas Inscrições
                  </Button>
                </Link>
                <Link href="/cursos">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    <BookOpen className="mr-2 h-5 w-5" />
                    Buscar Mais Cursos
                  </Button>
                </Link>
                <Link href="/">
                  <Button size="lg" variant="ghost" className="w-full sm:w-auto">
                    <Home className="mr-2 h-5 w-5" />
                    Ir para Início
                  </Button>
                </Link>
              </div>

              {/* Support Info */}
              <div className="mt-8 pt-6 border-t">
                <p className="text-sm text-muted-foreground">
                  Dúvidas? Entre em contato com{" "}
                  <strong className="text-foreground">{course.institution}</strong> ou
                  acesse nossa Central de Ajuda
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 Emprega Amapá - Sistema de Qualificação Profissional</p>
        </div>
      </footer>
    </div>
  )
}