import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, MapPin, Users, Building2 } from "lucide-react"
import { Course } from "@/types"

interface CourseCardProps {
  course: Course
}

export function CourseCard({ course }: CourseCardProps) {
  const isOpen = course.status === "open"
  const hasLimitedVacancies = course.vacanciesRemaining < 10

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
      <CardHeader className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-lg leading-tight line-clamp-2">
            {course.title}
          </h3>
          <Badge variant={isOpen ? "default" : "secondary"}>
            {isOpen ? "Inscrições Abertas" : "Encerrado"}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {course.description}
        </p>
      </CardHeader>

      <CardContent className="flex-1 space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <Building2 className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          <span className="truncate">{course.institution}</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          <span className="capitalize">{course.modality}</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          <span>{course.duration}h de duração</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Users className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          <span>
            {course.vacanciesRemaining} de {course.vacancies} vagas disponíveis
          </span>
        </div>

        {isOpen && hasLimitedVacancies && (
          <Badge variant="destructive" className="w-fit">
            Últimas vagas!
          </Badge>
        )}
      </CardContent>

      <CardFooter>
        <Link href={`/cursos/${course.id}`} className="w-full">
          <Button
            className="w-full"
            variant={isOpen ? "default" : "outline"}
            disabled={!isOpen}
          >
            {isOpen ? "Ver Detalhes e Inscrever-se" : "Ver Detalhes"}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}