// Types para o sistema de cursos

export type CourseStatus = "open" | "closed"
export type CourseModality = "presencial" | "online" | "hibrido"
export type EnrollmentStatus = "pending" | "approved" | "rejected" | "waitlist"

export interface Course {
  id: string
  title: string
  description: string
  institution: string
  modality: CourseModality
  duration: number // em horas
  status: CourseStatus
  vacancies: number
  vacanciesRemaining: number
  area: string
  prerequisites: string[]
  requiredDocuments: string[]
  startDate: string
  endDate: string
  schedule?: string
  points?: number // pontuação para visibilidade
}

export interface Enrollment {
  id: string
  courseId: string
  course: Course
  status: EnrollmentStatus
  enrollmentDate: string
  studentData: StudentData
  documents: UploadedDocument[]
  certificateUrl?: string
  updatedAt: string
}

export interface StudentData {
  fullName: string
  cpf: string
  email: string
  phone: string
  address?: string
  city?: string
  state?: string
}

export interface UploadedDocument {
  id: string
  name: string
  type: string // "RG", "CPF", "Comprovante de Residência", etc
  url: string
  uploadedAt: string
  size: number // em bytes
}

export interface EnrollmentFormData {
  fullName: string
  cpf: string
  email: string
  phone: string
  documents: File[]
}

// Mock user type
export interface User {
  id: string
  name: string
  email: string
  cpf: string
  phone: string
  enrollments: Enrollment[]
  completedCourses: number
  points: number
}