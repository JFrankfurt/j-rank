import { CompetitorEditor } from '@/app/components/CompetitorEditor'
import styles from './page.module.scss'

export default function AddCompetitor() {

  return (
    <main className={styles.root}>
      <h1>Add Competitor</h1>
      <CompetitorEditor />
    </main>
  )
}