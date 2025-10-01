import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen, Users, Award, ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <main className="flex-1">
        <section className="bg-gradient-to-b from-muted/50 to-background py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Capacite-se e transforme seu futuro profissional
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Encontre cursos de qualificação profissional gratuitos e
                impulsione sua carreira no mercado de trabalho do Amapá.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/cursos">
                  <Button size="lg" className="w-full sm:w-auto">
                    Ver Cursos Disponíveis
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/minhas-inscricoes">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Minhas Inscrições
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 border-y bg-card">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center">
                <BookOpen className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-3xl font-bold mb-2">15+</h3>
                <p className="text-muted-foreground">Cursos Disponíveis</p>
              </div>
              <div className="flex flex-col items-center">
                <Users className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-3xl font-bold mb-2">500+</h3>
                <p className="text-muted-foreground">Vagas Abertas</p>
              </div>
              <div className="flex flex-col items-center">
                <Award className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-3xl font-bold mb-2">100%</h3>
                <p className="text-muted-foreground">Certificados Reconhecidos</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold mb-4">Como Funciona</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Um processo simples para você se capacitar e conquistar novas
                oportunidades
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xl mx-auto mb-4">
                  1
                </div>
                <h4 className="font-semibold mb-2">Escolha seu Curso</h4>
                <p className="text-sm text-muted-foreground">
                  Navegue pelo catálogo e encontre o curso ideal para seus objetivos
                </p>
              </div>
              <div className="text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xl mx-auto mb-4">
                  2
                </div>
                <h4 className="font-semibold mb-2">Faça sua Inscrição</h4>
                <p className="text-sm text-muted-foreground">
                  Preencha o formulário e envie os documentos necessários
                </p>
              </div>
              <div className="text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xl mx-auto mb-4">
                  3
                </div>
                <h4 className="font-semibold mb-2">Receba seu Certificado</h4>
                <p className="text-sm text-muted-foreground">
                  Complete o curso e aumente sua visibilidade no mercado
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}