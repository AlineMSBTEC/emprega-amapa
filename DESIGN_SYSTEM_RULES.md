# Design System Rules - Emprega Amapá

## Visão Geral
Este documento define as regras e padrões para integração de designs do Figma no protótipo de Inscrição em Cursos do sistema Emprega Amapá.

---

## 1. Token Definitions

### Localização
Design tokens são definidos em: `app/globals.css`

### Formato e Estrutura
Os tokens usam **CSS Custom Properties** com o formato **OKLCH** (color space moderno).

```css
:root {
  /* Cores Base */
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);

  /* Cores Semânticas */
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);

  /* Borders & Inputs */
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);

  /* Border Radius */
  --radius: 0.625rem; /* 10px */
}
```

### Sistema de Transformação
Tailwind CSS v4 usa `@theme inline` para mapear CSS variables:

```css
@theme inline {
  --color-primary: var(--primary);
  --color-foreground: var(--foreground);
  --radius-lg: var(--radius);
  --radius-md: calc(var(--radius) - 2px);
}
```

### Como Adicionar Novos Tokens do Figma

1. **Extrair cores do Figma** (formato hex)
2. **Converter para OKLCH** usando: https://oklch.com/
3. **Adicionar em `globals.css`** nas seções `:root` e `.dark`
4. **Mapear no @theme inline** se necessário para Tailwind

**Exemplo:**
```css
/* Figma: Primary Blue #2563EB */
:root {
  --primary: oklch(0.564 0.196 264.376);
}

.dark {
  --primary: oklch(0.645 0.186 264.376);
}
```

---

## 2. Component Library

### Localização
Componentes UI estão em: `components/ui/`

### Componentes Instalados
```
components/ui/
├── button.tsx          # Botões e ações
├── card.tsx            # Cards de conteúdo
├── input.tsx           # Campos de texto
├── label.tsx           # Labels de formulário
├── badge.tsx           # Status badges
├── dialog.tsx          # Modais
├── select.tsx          # Dropdowns
├── textarea.tsx        # Áreas de texto
└── form.tsx            # Form wrapper com validação
```

### Arquitetura de Componentes
- **Base:** Radix UI (acessibilidade e funcionalidade)
- **Estilo:** Tailwind CSS + CSS Variables
- **Variantes:** class-variance-authority (CVA)

**Exemplo de uso:**
```tsx
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

<Card>
  <CardHeader>Título</CardHeader>
  <CardContent>
    <Button variant="default">Inscrever-se</Button>
  </CardContent>
</Card>
```

### Como Criar Novos Componentes do Figma

1. **Instalar via shadcn/ui** (se existir):
   ```bash
   npx shadcn@latest add [component-name]
   ```

2. **Criar componente customizado** em `components/ui/`:
   ```tsx
   // components/ui/course-card.tsx
   import { Card } from "@/components/ui/card"
   import { Badge } from "@/components/ui/badge"

   export function CourseCard({ title, status }: CourseCardProps) {
     return (
       <Card className="p-6 hover:shadow-lg transition-shadow">
         <h3 className="text-lg font-semibold">{title}</h3>
         <Badge variant={status === "open" ? "default" : "secondary"}>
           {status}
         </Badge>
       </Card>
     )
   }
   ```

---

## 3. Frameworks & Libraries

### UI Framework
- **Next.js 15.5.4** (App Router)
- **React 19.1.0**

### Styling Framework
- **Tailwind CSS v4**
- **PostCSS** via `@tailwindcss/postcss`

### Form Management
- **react-hook-form 7.63.0** - Gerenciamento de estado de formulários
- **zod 4.1.11** - Validação de schema
- **@hookform/resolvers 5.2.2** - Integração Zod + React Hook Form

### Component Libraries
- **shadcn/ui** - Componentes base (estilo: new-york)
- **Radix UI** - Primitivos acessíveis
- **lucide-react 0.544.0** - Ícones
- **class-variance-authority 0.7.1** - Variantes de componentes
- **tailwind-merge 3.3.1** - Merge de classes Tailwind

### Build System
- **Turbopack** (bundler do Next.js 15)
- **TypeScript 5**

---

## 4. Asset Management

### Localização de Assets
```
public/
├── images/          # Imagens estáticas
├── logos/           # Logos do sistema
└── certificates/    # Certificados mock (PDF)
```

### Como Adicionar Assets do Figma

1. **Exportar do Figma:**
   - Formato: SVG (ícones), PNG/WebP (imagens), JPEG (fotos)
   - Resolução: 2x para imagens raster

2. **Otimizar:**
   - SVG: usar SVGO ou tool online
   - Imagens: usar Image component do Next.js

3. **Referenciar:**
   ```tsx
   import Image from "next/image"

   <Image
     src="/images/hero-banner.png"
     alt="Banner"
     width={1200}
     height={400}
     priority
   />
   ```

### Otimização
- **Next.js Image Component** - otimização automática
- **SVG inline** - para ícones pequenos/customizáveis
- **WebP** - formato preferido para fotos

---

## 5. Icon System

### Localização
- **Biblioteca:** `lucide-react` (instalado)
- **Import:** `import { IconName } from "lucide-react"`

### Ícones Disponíveis
Todos os ícones Lucide estão disponíveis: https://lucide.dev/icons/

### Convenção de Uso

```tsx
import { Search, Filter, ChevronRight, BookOpen } from "lucide-react"

<Button>
  <Search className="mr-2 h-4 w-4" />
  Buscar Cursos
</Button>

<Badge>
  <BookOpen className="mr-1 h-3 w-3" />
  Presencial
</Badge>
```

### Tamanhos Padrão
- **h-3 w-3** (12px) - Small badges/labels
- **h-4 w-4** (16px) - Buttons, inline text
- **h-5 w-5** (20px) - Cards, headers
- **h-6 w-6** (24px) - Large buttons, hero sections

### Cores
Use classes Tailwind para colorir:
```tsx
<Check className="h-4 w-4 text-green-600" />
<AlertCircle className="h-4 w-4 text-destructive" />
<Info className="h-4 w-4 text-muted-foreground" />
```

---

## 6. Styling Approach

### CSS Methodology
**Utility-First** com Tailwind CSS v4

### Convenções de Estilo

#### 1. Usar utilitários Tailwind diretamente
```tsx
<div className="flex items-center justify-between p-4 rounded-lg border">
  {/* conteúdo */}
</div>
```

#### 2. Composição de classes com `cn()` helper
```tsx
import { cn } from "@/lib/utils"

<Button
  className={cn(
    "w-full",
    isPrimary && "bg-primary",
    isDisabled && "opacity-50 cursor-not-allowed"
  )}
/>
```

#### 3. Variantes com CVA (Class Variance Authority)
```tsx
import { cva, type VariantProps } from "class-variance-authority"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        outline: "border border-input bg-background",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
      },
    },
  }
)
```

### Global Styles
Definidos em `app/globals.css`:

```css
@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

### Responsive Design

Breakpoints Tailwind CSS (padrão):
- `sm:` 640px
- `md:` 768px
- `lg:` 1024px
- `xl:` 1280px
- `2xl:` 1536px

**Exemplo de uso mobile-first:**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Mobile: 1 coluna, Tablet: 2, Desktop: 3 */}
</div>

<Button className="w-full sm:w-auto">
  {/* Mobile: full width, Desktop: auto */}
</Button>
```

---

## 7. Project Structure

### Estrutura de Pastas
```
prototipo-cursos/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   ├── globals.css          # Global styles & tokens
│   ├── cursos/              # Rotas de cursos
│   │   ├── page.tsx         # /cursos - Catálogo
│   │   ├── [id]/            # /cursos/[id] - Detalhes
│   │   └── inscricao/       # /cursos/inscricao - Formulário
│   └── minhas-inscricoes/   # /minhas-inscricoes
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── course-card.tsx      # Componentes específicos
│   ├── enrollment-form.tsx
│   └── ...
├── lib/
│   ├── utils.ts             # Helpers (cn, etc)
│   └── validations.ts       # Schemas Zod
├── data/
│   └── courses-mock.ts      # Dados mock (15 cursos)
├── types/
│   └── index.ts             # TypeScript types
├── public/                  # Assets estáticos
└── components.json          # shadcn config
```

### Convenções de Nomenclatura

#### Arquivos
- **Componentes:** `PascalCase.tsx` (ex: `CourseCard.tsx`)
- **Pages (App Router):** `page.tsx`, `layout.tsx`, `loading.tsx`
- **Utils:** `kebab-case.ts` (ex: `date-utils.ts`)
- **Types:** `index.ts` ou `types.ts`

#### Componentes React
```tsx
// ✅ Bom - Export nomeado
export function CourseCard({ title }: CourseCardProps) {}

// ✅ Bom - Default export para pages
export default function CoursesPage() {}
```

#### Tipos TypeScript
```tsx
// types/index.ts
export interface Course {
  id: string
  title: string
  institution: string
  status: "open" | "closed"
  // ...
}

export type EnrollmentStatus = "pending" | "approved" | "rejected" | "waitlist"
```

### Padrões de Organização

#### 1. Feature-based Organization
Componentes específicos de feature ficam junto:
```
app/cursos/
├── page.tsx                 # Página principal
├── _components/             # Componentes privados da rota
│   ├── course-filters.tsx
│   └── course-list.tsx
└── [id]/
    ├── page.tsx
    └── _components/
        └── course-details.tsx
```

#### 2. Shared Components
Componentes reutilizáveis em `components/`:
```tsx
// components/course-card.tsx
export function CourseCard() {} // Usado em múltiplas rotas

// components/ui/button.tsx
export function Button() {} // shadcn component
```

#### 3. Data & Types
```tsx
// data/courses-mock.ts
export const mockCourses: Course[] = [...]

// types/index.ts
export interface Course {}
export type EnrollmentStatus = ...
```

---

## 8. Integração com Figma

### Workflow de Design para Código

1. **Extrair Design Tokens**
   - Abrir Figma Dev Mode
   - Copiar variáveis de cor (hex)
   - Converter para OKLCH
   - Adicionar em `globals.css`

2. **Componentes**
   - Verificar se existe componente shadcn/ui equivalente
   - Se sim: usar shadcn e customizar
   - Se não: criar componente custom em `components/`

3. **Espaçamentos**
   - Usar escala Tailwind (4px base):
     - `p-2` = 8px
     - `p-4` = 16px
     - `gap-6` = 24px
   - Manter consistência com Figma

4. **Tipografia**
   - Font: Geist Sans (Google Fonts - já instalada)
   - Tamanhos: usar classes Tailwind
     ```tsx
     text-sm   // 14px
     text-base // 16px
     text-lg   // 18px
     text-xl   // 20px
     text-2xl  // 24px
     ```

5. **Responsividade**
   - Seguir breakpoints do Figma
   - Implementar mobile-first
   - Testar em todos os tamanhos

### Checklist de Integração

- [ ] Cores extraídas e convertidas para OKLCH
- [ ] Componentes mapeados (shadcn ou custom)
- [ ] Tipografia configurada
- [ ] Espaçamentos consistentes
- [ ] Ícones identificados (Lucide)
- [ ] Assets exportados e otimizados
- [ ] Responsividade implementada
- [ ] Dark mode suportado (se aplicável)

---

## 9. Boas Práticas

### Acessibilidade
- Usar componentes shadcn/ui (baseados em Radix UI = acessíveis)
- Sempre adicionar `alt` em imagens
- Labels em todos os inputs
- Contraste de cores adequado (WCAG AA)

### Performance
- Usar `next/image` para otimização automática
- Lazy load de componentes pesados
- Evitar re-renders desnecessários (React.memo se necessário)

### TypeScript
- Sempre tipar props de componentes
- Evitar `any` - usar `unknown` ou tipos específicos
- Criar interfaces reutilizáveis em `types/`

### Code Style
- **2 spaces** para indentação
- **Aspas duplas** para strings
- **Semicolons** opcionais (mas consistente)
- **Imports organizados:**
  1. React/Next
  2. Bibliotecas externas
  3. Componentes locais
  4. Utils/Types
  5. Styles

---

## 10. Comandos Úteis

### Desenvolvimento
```bash
npm run dev          # Iniciar dev server (Turbopack)
npm run build        # Build de produção
npm run start        # Servidor de produção
npm run lint         # ESLint
```

### shadcn/ui
```bash
npx shadcn@latest add [component]     # Adicionar componente
npx shadcn@latest add button card     # Adicionar múltiplos
npx shadcn@latest diff button         # Ver mudanças em componente
```

### Figma
```bash
# MCP Figma configurado em:
# http://127.0.0.1:3845/mcp
```

---

## 11. Referências

- **Next.js Docs:** https://nextjs.org/docs
- **Tailwind CSS v4:** https://tailwindcss.com/docs
- **shadcn/ui:** https://ui.shadcn.com
- **Radix UI:** https://www.radix-ui.com
- **Lucide Icons:** https://lucide.dev
- **React Hook Form:** https://react-hook-form.com
- **Zod:** https://zod.dev
- **OKLCH Color Converter:** https://oklch.com

---

## Contato e Dúvidas

Este documento deve ser atualizado conforme novos padrões e componentes são adicionados ao projeto.

**Última atualização:** 2025-09-30