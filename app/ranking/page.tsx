import type { Metadata } from "next"
import { RankingScreen } from "./ranking-screen"

export const metadata: Metadata = {
  title: "Ranking de Candidatos | Emprega Amapá",
  description:
    "Veja os candidatos mais engajados em cursos e acompanhe sua posição no ranking",
}

export default function RankingPage() {
  return <RankingScreen />
}
