import { Course } from "@/types"

export const mockCourses: Course[] = [
  {
    id: "1",
    title: "Desenvolvimento Web Full Stack",
    description: "Aprenda a criar aplicações web completas com React, Node.js e banco de dados. Curso prático com projetos reais e acompanhamento de mentores especializados.",
    institution: "SENAC Amapá",
    modality: "hibrido",
    duration: 160,
    status: "open",
    vacancies: 30,
    vacanciesRemaining: 12,
    area: "Tecnologia da Informação",
    prerequisites: ["Ensino médio completo", "Conhecimento básico de informática"],
    requiredDocuments: ["RG", "CPF", "Comprovante de residência", "Certificado de conclusão do ensino médio"],
    startDate: "2025-11-15",
    endDate: "2026-01-30",
    schedule: "Segunda a Quinta, 19h às 22h",
    points: 80
  },
  {
    id: "2",
    title: "Marketing Digital e Redes Sociais",
    description: "Domine as estratégias de marketing digital, gestão de redes sociais, criação de conteúdo e análise de métricas para impulsionar negócios online.",
    institution: "SEBRAE Amapá",
    modality: "online",
    duration: 80,
    status: "open",
    vacancies: 50,
    vacanciesRemaining: 28,
    area: "Marketing e Vendas",
    prerequisites: ["Ensino médio completo"],
    requiredDocuments: ["RG", "CPF", "Comprovante de residência"],
    startDate: "2025-11-01",
    endDate: "2025-12-20",
    schedule: "Terça e Quinta, 14h às 18h (online ao vivo)",
    points: 50
  },
  {
    id: "3",
    title: "Assistente Administrativo",
    description: "Capacitação completa para atuar na área administrativa de empresas, incluindo rotinas de escritório, atendimento, documentação e ferramentas de gestão.",
    institution: "SENAI Amapá",
    modality: "presencial",
    duration: 120,
    status: "open",
    vacancies: 25,
    vacanciesRemaining: 8,
    area: "Administração",
    prerequisites: ["Ensino médio completo"],
    requiredDocuments: ["RG", "CPF", "Comprovante de residência", "Foto 3x4"],
    startDate: "2025-10-25",
    endDate: "2025-12-15",
    schedule: "Segunda a Sexta, 8h às 12h",
    points: 60
  },
  {
    id: "4",
    title: "Eletricista Predial",
    description: "Curso técnico para formação de eletricistas prediais qualificados, com aulas práticas e teóricas sobre instalações elétricas residenciais e comerciais.",
    institution: "IFAP - Instituto Federal do Amapá",
    modality: "presencial",
    duration: 200,
    status: "open",
    vacancies: 20,
    vacanciesRemaining: 15,
    area: "Construção Civil",
    prerequisites: ["Ensino médio cursando ou completo", "Idade mínima: 18 anos"],
    requiredDocuments: ["RG", "CPF", "Comprovante de residência", "Certificado de escolaridade"],
    startDate: "2025-11-20",
    endDate: "2026-03-10",
    schedule: "Segunda a Sexta, 14h às 18h",
    points: 100
  },
  {
    id: "5",
    title: "Confeitaria e Panificação",
    description: "Aprenda técnicas profissionais de confeitaria, panificação artesanal, decoração de bolos e criação de produtos de padaria com alta qualidade.",
    institution: "SENAR Amapá",
    modality: "presencial",
    duration: 100,
    status: "open",
    vacancies: 15,
    vacanciesRemaining: 5,
    area: "Gastronomia",
    prerequisites: ["Ensino fundamental completo"],
    requiredDocuments: ["RG", "CPF", "Comprovante de residência"],
    startDate: "2025-11-05",
    endDate: "2025-12-28",
    schedule: "Terça a Quinta, 8h às 12h",
    points: 55
  },
  {
    id: "6",
    title: "Inglês para Negócios - Intermediário",
    description: "Curso de inglês focado em comunicação empresarial, vocabulário técnico, apresentações, negociações e correspondência comercial.",
    institution: "SENAC Amapá",
    modality: "hibrido",
    duration: 90,
    status: "open",
    vacancies: 30,
    vacanciesRemaining: 20,
    area: "Idiomas",
    prerequisites: ["Inglês básico", "Ensino médio completo"],
    requiredDocuments: ["RG", "CPF"],
    startDate: "2025-10-28",
    endDate: "2025-12-22",
    schedule: "Segunda e Quarta, 19h às 22h",
    points: 45
  },
  {
    id: "7",
    title: "Design Gráfico e Comunicação Visual",
    description: "Formação completa em design gráfico, incluindo Adobe Photoshop, Illustrator, identidade visual, diagramação e criação de peças publicitárias.",
    institution: "SEBRAE Amapá",
    modality: "online",
    duration: 140,
    status: "open",
    vacancies: 40,
    vacanciesRemaining: 32,
    area: "Design e Criatividade",
    prerequisites: ["Ensino médio completo", "Computador com internet"],
    requiredDocuments: ["RG", "CPF", "Comprovante de residência"],
    startDate: "2025-11-10",
    endDate: "2026-01-25",
    schedule: "Segunda a Quinta, 18h às 21h (online)",
    points: 70
  },
  {
    id: "8",
    title: "Auxiliar de Enfermagem",
    description: "Capacitação para atuar como auxiliar de enfermagem em hospitais, clínicas e postos de saúde, com aulas práticas e estágio supervisionado.",
    institution: "IFAP - Instituto Federal do Amapá",
    modality: "presencial",
    duration: 400,
    status: "closed",
    vacancies: 25,
    vacanciesRemaining: 0,
    area: "Saúde",
    prerequisites: ["Ensino médio completo", "Idade mínima: 18 anos"],
    requiredDocuments: ["RG", "CPF", "Comprovante de residência", "Certificado do ensino médio", "Atestado médico"],
    startDate: "2025-09-15",
    endDate: "2026-05-30",
    schedule: "Segunda a Sexta, 8h às 12h + Estágio",
    points: 150
  },
  {
    id: "9",
    title: "Excel Avançado para Empresas",
    description: "Domine fórmulas avançadas, tabelas dinâmicas, macros, automação de planilhas e análise de dados com Excel para aumentar produtividade.",
    institution: "SENAC Amapá",
    modality: "online",
    duration: 40,
    status: "open",
    vacancies: 60,
    vacanciesRemaining: 45,
    area: "Informática",
    prerequisites: ["Excel básico"],
    requiredDocuments: ["RG", "CPF"],
    startDate: "2025-11-01",
    endDate: "2025-11-30",
    schedule: "Terça e Quinta, 19h às 22h",
    points: 30
  },
  {
    id: "10",
    title: "Mecânica de Motocicletas",
    description: "Curso técnico para formação de mecânicos especializados em manutenção e reparo de motocicletas, com foco em diagnóstico e resolução de problemas.",
    institution: "SENAI Amapá",
    modality: "presencial",
    duration: 180,
    status: "open",
    vacancies: 18,
    vacanciesRemaining: 10,
    area: "Mecânica",
    prerequisites: ["Ensino médio cursando ou completo", "Idade mínima: 18 anos"],
    requiredDocuments: ["RG", "CPF", "Comprovante de residência", "Certificado de escolaridade"],
    startDate: "2025-11-18",
    endDate: "2026-02-28",
    schedule: "Segunda a Sexta, 14h às 18h",
    points: 90
  },
  {
    id: "11",
    title: "Empreendedorismo e Gestão de Pequenos Negócios",
    description: "Aprenda a planejar, iniciar e gerenciar seu próprio negócio com estratégias de gestão, finanças, marketing e modelo de negócios.",
    institution: "SEBRAE Amapá",
    modality: "hibrido",
    duration: 60,
    status: "open",
    vacancies: 35,
    vacanciesRemaining: 18,
    area: "Empreendedorismo",
    prerequisites: ["Ensino médio completo"],
    requiredDocuments: ["RG", "CPF"],
    startDate: "2025-11-08",
    endDate: "2025-12-18",
    schedule: "Sábados, 8h às 12h",
    points: 40
  },
  {
    id: "12",
    title: "Cuidador de Idosos",
    description: "Capacitação para cuidadores profissionais de idosos, com conteúdo sobre saúde do idoso, primeiros socorros, nutrição e atividades diárias.",
    institution: "SENAR Amapá",
    modality: "presencial",
    duration: 80,
    status: "open",
    vacancies: 20,
    vacanciesRemaining: 12,
    area: "Saúde e Assistência Social",
    prerequisites: ["Ensino fundamental completo", "Idade mínima: 18 anos"],
    requiredDocuments: ["RG", "CPF", "Comprovante de residência"],
    startDate: "2025-11-12",
    endDate: "2025-12-30",
    schedule: "Segunda a Sexta, 14h às 17h",
    points: 50
  },
  {
    id: "13",
    title: "Operador de Empilhadeira",
    description: "Curso de qualificação para operar empilhadeiras com segurança, incluindo legislação, manutenção básica e prática operacional.",
    institution: "SENAI Amapá",
    modality: "presencial",
    duration: 50,
    status: "closed",
    vacancies: 12,
    vacanciesRemaining: 0,
    area: "Logística",
    prerequisites: ["Ensino médio completo", "CNH categoria B ou superior", "Idade mínima: 18 anos"],
    requiredDocuments: ["RG", "CPF", "CNH", "Comprovante de residência"],
    startDate: "2025-10-10",
    endDate: "2025-11-05",
    schedule: "Segunda a Sexta, 8h às 12h",
    points: 35
  },
  {
    id: "14",
    title: "Costura Industrial e Modelagem",
    description: "Formação profissional em costura industrial, modelagem de roupas, corte e acabamento para trabalhar em confecções ou empreender na área.",
    institution: "SENAR Amapá",
    modality: "presencial",
    duration: 120,
    status: "open",
    vacancies: 22,
    vacanciesRemaining: 16,
    area: "Moda e Vestuário",
    prerequisites: ["Ensino fundamental completo"],
    requiredDocuments: ["RG", "CPF", "Comprovante de residência"],
    startDate: "2025-11-15",
    endDate: "2026-01-20",
    schedule: "Segunda a Sexta, 14h às 18h",
    points: 60
  },
  {
    id: "15",
    title: "Atendimento ao Cliente e Técnicas de Vendas",
    description: "Desenvolva habilidades de comunicação, atendimento de excelência, técnicas de vendas, negociação e fidelização de clientes.",
    institution: "SEBRAE Amapá",
    modality: "online",
    duration: 40,
    status: "open",
    vacancies: 80,
    vacanciesRemaining: 65,
    area: "Vendas e Atendimento",
    prerequisites: ["Ensino médio cursando ou completo"],
    requiredDocuments: ["RG", "CPF"],
    startDate: "2025-10-30",
    endDate: "2025-11-28",
    schedule: "Segunda e Quarta, 19h às 22h",
    points: 30
  }
]

// Helper functions
export const getCourseById = (id: string): Course | undefined => {
  return mockCourses.find(course => course.id === id)
}

export const getOpenCourses = (): Course[] => {
  return mockCourses.filter(course => course.status === "open")
}

export const getCoursesByArea = (area: string): Course[] => {
  return mockCourses.filter(course => course.area === area)
}

export const getCoursesByModality = (modality: string): Course[] => {
  return mockCourses.filter(course => course.modality === modality)
}

export const getAvailableAreas = (): string[] => {
  return Array.from(new Set(mockCourses.map(course => course.area)))
}

export const getInstitutions = (): string[] => {
  return Array.from(new Set(mockCourses.map(course => course.institution)))
}