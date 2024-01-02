'use client'
import { Competitor, Gender } from '@/app/components/Athletes'
import Button from '@/app/components/Button'
import { CompetitorEditor } from '@/app/components/CompetitorEditor'
import { useEffect, useState } from 'react'
import styles from './page.module.scss'
interface FetchError extends Error {
  response?: Response
  statusCode?: number
}

const INITIAL_COMPETITOR = {
  gender: Gender.Male,
}

export default function AddCompetitor() {
  const [competitor, setCompetitor] = useState<Competitor>(INITIAL_COMPETITOR)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<null | Error>(null)
  const [updateStatusMessage, setUpdateStatusMessage] = useState('')

  useEffect(() => {
    setError(null)
  }, [competitor])

  async function handleUpdateClick() {
    try {
      setError(null)
      setLoading(true)

      if (!competitor.firstName || !competitor.lastName || !competitor.gender) {
        throw new Error('Missing required field.')
      }

      const response = await fetch(`/competitor/api`, {
        method: 'POST',
        body: JSON.stringify(competitor),
      })
      console.log('response.ok', response.ok)
      if (!response.ok) {
        const error: FetchError = new Error(`HTTP error: ${response.status}`)
        error.response = response
        error.statusCode = response.status
        throw error
      } else {
        setCompetitor(INITIAL_COMPETITOR)
        setUpdateStatusMessage('success')
        setTimeout(() => setUpdateStatusMessage(''), 1000)
      }
    } catch (e) {
      if (e instanceof Error) {
        setError(e as FetchError)
      } else {
        setError(new Error('An unknown error occurred'))
      }
      console.error(e)
    } finally {
      setLoading(false)
    }
  }
  return (
    <main className={styles.root}>
      <h1>Add Competitor</h1>
      <CompetitorEditor
        disabled={loading}
        competitor={competitor}
        onChange={setCompetitor}
      />
      <Button
        disabled={loading}
        onClick={handleUpdateClick}
        style={{ marginRight: '1em' }}
      >
        Submit
      </Button>
      <Button
        disabled={loading}
        onClick={() => setCompetitor(INITIAL_COMPETITOR)}
      >
        Clear
      </Button>
      <pre>{updateStatusMessage}</pre>
      <pre>{error?.toString()}</pre>
    </main>
  )
}
