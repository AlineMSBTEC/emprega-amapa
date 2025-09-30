"use client"

import { useState, use } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileUpload } from "@/components/file-upload"
import { getCourseById } from "@/data/courses-mock"
import { enrollmentFormSchema, type EnrollmentFormData, formatCPF, formatPhone } from "@/lib/validations"
import { ArrowLeft, AlertCircle, Loader2 } from "lucide-react"

export default function EnrollmentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const course = getCourseById(id)
  const [files, setFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<EnrollmentFormData>({
    resolver: zodResolver(enrollmentFormSchema),
  })

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

  if (course.status !== "open") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Inscrições Encerradas</h2>
          <p className="text-muted-foreground mb-4">
            Este curso não está mais disponível para inscrição
          </p>
          <Link href="/cursos">
            <Button>Ver Outros Cursos</Button>
          </Link>
        </div>
      </div>
    )
  }

  const onSubmit = async () => {
    if (files.length === 0) {
      alert("Por favor, envie pelo menos um documento")
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Redirect to confirmation page
    router.push(`/cursos/${course.id}/inscricao/confirmacao`)
  }

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCPF(e.target.value)
    setValue("cpf", formatted)
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value)
    setValue("phone", formatted)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 bg-muted/30">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Back Button */}
          <Link href={`/cursos/${course.id}`}>
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para Detalhes do Curso
            </Button>
          </Link>

          {/* Page Header */}
          <div className="mb-6">
            <h2 className="text-3xl font-bold mb-2">Formulário de Inscrição</h2>
            <p className="text-muted-foreground">
              Preencha seus dados e envie os documentos necessários
            </p>
          </div>

          {/* Course Info Card */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{course.title}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {course.institution}
                  </p>
                </div>
                <Badge>Inscrição em andamento</Badge>
              </div>
            </CardHeader>
          </Card>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Data */}
            <Card>
              <CardHeader>
                <CardTitle>Dados Pessoais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="fullName">
                    Nome Completo <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="fullName"
                    {...register("fullName")}
                    placeholder="Digite seu nome completo"
                  />
                  {errors.fullName && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                {/* CPF */}
                <div className="space-y-2">
                  <Label htmlFor="cpf">
                    CPF <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="cpf"
                    {...register("cpf")}
                    onChange={handleCPFChange}
                    placeholder="000.000.000-00"
                    maxLength={14}
                  />
                  {errors.cpf && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.cpf.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="seu@email.com"
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone">
                    Telefone <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="phone"
                    {...register("phone")}
                    onChange={handlePhoneChange}
                    placeholder="(00) 00000-0000"
                    maxLength={15}
                  />
                  {errors.phone && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                {/* Optional Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Endereço (Opcional)</Label>
                    <Input
                      id="address"
                      {...register("address")}
                      placeholder="Rua, número, complemento"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">Cidade (Opcional)</Label>
                    <Input
                      id="city"
                      {...register("city")}
                      placeholder="Macapá"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="state">Estado (Opcional)</Label>
                    <Input
                      id="state"
                      {...register("state")}
                      placeholder="AP"
                      maxLength={2}
                      className="uppercase"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Documents Upload */}
            <Card>
              <CardHeader>
                <CardTitle>
                  Documentos <span className="text-destructive">*</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <FileUpload
                  requiredDocuments={course.requiredDocuments}
                  onFilesChange={setFiles}
                />
              </CardContent>
            </Card>

            {/* Important Info */}
            <div className="bg-muted border border-border rounded-lg p-4">
              <h4 className="font-medium text-sm mb-2">⚠️ Informações Importantes</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Todos os campos marcados com * são obrigatórios</li>
                <li>• Verifique se os documentos estão legíveis antes de enviar</li>
                <li>• Após enviar, sua inscrição será analisada pela instituição</li>
                <li>
                  • Você receberá atualizações sobre o status da inscrição por email
                </li>
              </ul>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <Link href={`/cursos/${course.id}`} className="flex-1">
                <Button type="button" variant="outline" className="w-full">
                  Cancelar
                </Button>
              </Link>
              <Button
                type="submit"
                className="flex-1"
                disabled={isSubmitting || files.length === 0}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  "Enviar Inscrição"
                )}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}