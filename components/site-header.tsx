import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { mockUser } from "@/data/user-mock"

export function SiteHeader() {
  const user = mockUser
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

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