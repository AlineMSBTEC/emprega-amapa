import { User, Enrollment } from "@/types"
import { mockCourses } from "./courses-mock"

// Mock user data (usuário já "logado")
export const mockUser: User = {
  id: "user-1",
  name: "Maria Silva Santos",
  email: "maria.silva@email.com",
  cpf: "123.456.789-00",
  phone: "(96) 98765-4321",
  enrollments: [],
  completedCourses: 2,
  points: 110
}

// Mock de inscrições anteriores (para demonstração)
export const mockEnrollments: Enrollment[] = [
  {
    id: "enroll-1",
    courseId: "8",
    course: mockCourses[7], // Auxiliar de Enfermagem
    status: "approved",
    enrollmentDate: "2025-08-10",
    studentData: {
      fullName: mockUser.name,
      cpf: mockUser.cpf,
      email: mockUser.email,
      phone: mockUser.phone,
      city: "Macapá",
      state: "AP"
    },
    documents: [
      {
        id: "doc-1",
        name: "RG.pdf",
        type: "RG",
        url: "/mock/rg.pdf",
        uploadedAt: "2025-08-10",
        size: 245000
      },
      {
        id: "doc-2",
        name: "CPF.pdf",
        type: "CPF",
        url: "/mock/cpf.pdf",
        uploadedAt: "2025-08-10",
        size: 198000
      }
    ],
    certificateUrl: "/mock/certificado-enfermagem.pdf",
    updatedAt: "2025-09-20"
  },
  {
    id: "enroll-2",
    courseId: "9",
    course: mockCourses[8], // Excel Avançado
    status: "pending",
    enrollmentDate: "2025-09-25",
    studentData: {
      fullName: mockUser.name,
      cpf: mockUser.cpf,
      email: mockUser.email,
      phone: mockUser.phone,
      city: "Macapá",
      state: "AP"
    },
    documents: [
      {
        id: "doc-3",
        name: "RG_Maria.pdf",
        type: "RG",
        url: "/mock/rg.pdf",
        uploadedAt: "2025-09-25",
        size: 245000
      }
    ],
    updatedAt: "2025-09-25"
  }
]

// Atualizar user com enrollments
mockUser.enrollments = mockEnrollments