import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Home, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <main className="flex-1 flex items-center justify-center bg-muted/30 px-4">
        <div className="text-center max-w-md">
          <div className="mb-6">
            <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
            <h2 className="text-3xl font-bold mb-2">Página não encontrada</h2>
            <p className="text-muted-foreground">
              Desculpe, a página que você está procurando não existe ou foi movida.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/">
              <Button className="w-full sm:w-auto">
                <Home className="mr-2 h-4 w-4" />
                Ir para Início
              </Button>
            </Link>
            <Link href="/cursos">
              <Button variant="outline" className="w-full sm:w-auto">
                <Search className="mr-2 h-4 w-4" />
                Ver Cursos
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}