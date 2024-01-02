import styles from './page.module.scss'

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
