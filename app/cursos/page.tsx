"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { CourseCard } from "@/components/course-card"
import { mockCourses, getAvailableAreas, getInstitutions } from "@/data/courses-mock"
import { Search, Filter, X } from "lucide-react"

export default function CursosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedArea, setSelectedArea] = useState<string>("all")
  const [selectedInstitution, setSelectedInstitution] = useState<string>("all")
  const [selectedModality, setSelectedModality] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")

  const areas = getAvailableAreas()
  const institutions = getInstitutions()

  const filteredCourses = useMemo(() => {
    return mockCourses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.area.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesArea = selectedArea === "all" || course.area === selectedArea
      const matchesInstitution =
        selectedInstitution === "all" || course.institution === selectedInstitution
      const matchesModality =
        selectedModality === "all" || course.modality === selectedModality
      const matchesStatus =
        selectedStatus === "all" || course.status === selectedStatus

      return (
        matchesSearch &&
        matchesArea &&
        matchesInstitution &&
        matchesModality &&
        matchesStatus
      )
    })
  }, [searchTerm, selectedArea, selectedInstitution, selectedModality, selectedStatus])

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedArea("all")
    setSelectedInstitution("all")
    setSelectedModality("all")
    setSelectedStatus("all")
  }

  const hasActiveFilters =
    searchTerm ||
    selectedArea !== "all" ||
    selectedInstitution !== "all" ||
    selectedModality !== "all" ||
    selectedStatus !== "all"

  const openCoursesCount = filteredCourses.filter((c) => c.status === "open").length

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Catálogo de Cursos</h2>
            <p className="text-muted-foreground">
              Encontre o curso ideal para sua qualificação profissional
            </p>
          </div>

          {/* Filters */}
          <div className="bg-card rounded-lg border p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <h3 className="font-semibold">Filtros de Busca</h3>
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="ml-auto"
                >
                  <X className="h-4 w-4 mr-1" />
                  Limpar Filtros
                </Button>
              )}
            </div>

            <div className="space-y-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar cursos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>

              {/* Filters Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {/* Area Filter */}
                <Select value={selectedArea} onValueChange={setSelectedArea}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Área" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as Áreas</SelectItem>
                    {areas.map((area) => (
                      <SelectItem key={area} value={area}>
                        {area}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Institution Filter */}
                <Select
                  value={selectedInstitution}
                  onValueChange={setSelectedInstitution}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Instituição" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as Instituições</SelectItem>
                    {institutions.map((inst) => (
                      <SelectItem key={inst} value={inst}>
                        {inst}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Modality Filter */}
                <Select value={selectedModality} onValueChange={setSelectedModality}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Modalidade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as Modalidades</SelectItem>
                    <SelectItem value="presencial">Presencial</SelectItem>
                    <SelectItem value="online">Online</SelectItem>
                    <SelectItem value="hibrido">Híbrido</SelectItem>
                  </SelectContent>
                </Select>

                {/* Status Filter */}
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os Status</SelectItem>
                    <SelectItem value="open">Inscrições Abertas</SelectItem>
                    <SelectItem value="closed">Encerrado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">
                  {filteredCourses.length}
                </span>{" "}
                {filteredCourses.length === 1 ? "curso encontrado" : "cursos encontrados"}
              </p>
              {openCoursesCount > 0 && (
                <Badge variant="default">{openCoursesCount} com inscrições abertas</Badge>
              )}
            </div>
          </div>

          {/* Courses Grid */}
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-card rounded-lg border">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                Nenhum curso encontrado
              </h3>
              <p className="text-muted-foreground mb-4">
                Tente ajustar os filtros ou termos de busca
              </p>
              {hasActiveFilters && (
                <Button onClick={clearFilters} variant="outline">
                  Limpar Filtros
                </Button>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}