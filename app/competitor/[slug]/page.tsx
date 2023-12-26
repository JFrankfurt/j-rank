import { Competitor } from '@/app/components/Athletes'
import styles from './page.module.scss'
import { NextPageContext } from 'next'

interface CompetitorPageProps {
  params: { slug: string }
}

export default function Competitor({ params: { slug } }: CompetitorPageProps) {
  return (
    <main className={styles.root} id={slug}>
      <h1>Competitor name</h1>
      <p>{slug}</p>
    </main>
  )
}

export async function generateStaticParams() {
  const competitors: Competitor[] = await fetch('/competitor/api').then(
    (res) => res.json()
  )

  return competitors.map((competitor) => ({
    slug: competitor.uuid as string,
  }))
}
