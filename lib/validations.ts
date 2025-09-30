import { z } from "zod"

// Validação de CPF
function isValidCPF(cpf: string): boolean {
  cpf = cpf.replace(/[^\d]/g, "")

  if (cpf.length !== 11) return false
  if (/^(\d)\1{10}$/.test(cpf)) return false

  let sum = 0
  let remainder

  for (let i = 1; i <= 9; i++) {
    sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i)
  }

  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(cpf.substring(9, 10))) return false

  sum = 0
  for (let i = 1; i <= 10; i++) {
    sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i)
  }

  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(cpf.substring(10, 11))) return false

  return true
}

// Schema para formulário de inscrição
export const enrollmentFormSchema = z.object({
  fullName: z
    .string()
    .min(3, "Nome deve ter no mínimo 3 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres")
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Nome deve conter apenas letras"),

  cpf: z
    .string()
    .min(11, "CPF inválido")
    .max(14, "CPF inválido")
    .refine((cpf) => isValidCPF(cpf), {
      message: "CPF inválido",
    }),

  email: z
    .string()
    .email("Email inválido")
    .toLowerCase(),

  phone: z
    .string()
    .min(10, "Telefone inválido")
    .regex(/^[\d\s\(\)\-]+$/, "Telefone inválido"),

  address: z
    .string()
    .min(5, "Endereço deve ter no mínimo 5 caracteres")
    .optional(),

  city: z
    .string()
    .min(2, "Cidade inválida")
    .optional(),

  state: z
    .string()
    .length(2, "Estado deve ter 2 caracteres")
    .optional(),
})

export type EnrollmentFormData = z.infer<typeof enrollmentFormSchema>

// Validação de arquivo
export const validateFile = (file: File): { valid: boolean; error?: string } => {
  const maxSize = 5 * 1024 * 1024 // 5MB
  const allowedTypes = ["application/pdf", "image/jpeg", "image/jpg", "image/png"]

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: "Formato não permitido. Envie apenas PDF, JPG ou PNG",
    }
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      error: "Arquivo muito grande. Tamanho máximo: 5MB",
    }
  }

  return { valid: true }
}

// Helper para formatar CPF
export const formatCPF = (value: string): string => {
  const numbers = value.replace(/\D/g, "")
  if (numbers.length <= 11) {
    return numbers
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
  }
  return numbers.slice(0, 11)
}

// Helper para formatar telefone
export const formatPhone = (value: string): string => {
  const numbers = value.replace(/\D/g, "")
  if (numbers.length <= 11) {
    return numbers
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
  }
  return numbers.slice(0, 11)
}