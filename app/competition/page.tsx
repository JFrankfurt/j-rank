'use client'
import { ChangeEvent, useState } from 'react'
import Athletes, { Competitor, Gender } from '../components/Athletes'
import Button from '../components/Button'
import { CompetitorEditor } from '../components/CompetitorEditor'
import Matches, { Match } from '../components/Matches'
import styles from './page.module.scss'

interface FetchError extends Error {
  response?: Response
  statusCode?: number
}

function removeElementFromArray(array: any[], index: number) {
  const newArray = [...array]
  newArray.splice(index, 1)
  return newArray
}

export default function Competition() {
  const [competitionName, setCompetitionName] = useState('')
  const [competitors, setCompetitors] = useState<Competitor[]>([])
  const [editingCompetitor, setEditingCompetitor] = useState<null | number>(
    null
  )
  const [matches, setMatches] = useState<Match[]>([])
  const [editingMatch, setEditingMatch] = useState<null | number>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [updateStatusMessage, setUpdateStatusMessage] = useState('')

  if (loading && (editingCompetitor !== null || editingMatch !== null)) {
    setEditingCompetitor(null)
    setEditingMatch(null)
  }

  async function handleUpdateClick() {
    try {
      setError(null)
      setLoading(true)

      if (
        typeof competitionName !== 'string' ||
        competitionName.trim() === ''
      ) {
        throw new Error('Competition name is required.')
      }
      if (!Array.isArray(competitors) || competitors.length === 0) {
        throw new Error('Competitors list is required and cannot be empty.')
      }
      if (!Array.isArray(matches) || matches.length === 0) {
        throw new Error('Matches list is required and cannot be empty.')
      }

      const response = await fetch(`/competition/api`, {
        method: 'POST',
        body: JSON.stringify({
          competitionName,
          competitors,
          matches,
        }),
      })
      console.log('response.ok', response.ok)
      if (!response.ok) {
        const error: FetchError = new Error(`HTTP error: ${response.status}`)
        error.response = response
        error.statusCode = response.status
        throw error
      } else {
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

  function handleAthleteRemove(i: number) {
    setEditingCompetitor(null)
    setCompetitors(removeElementFromArray(competitors, i))
  }
  function handleMatchRemove(i: number) {
    setEditingMatch(null)
    setMatches(removeElementFromArray(matches, i))
  }
  function handleWinnerSelection(winner: 0 | 1 | undefined) {
    if (editingMatch === null) return
    const updatedMatches = [...matches]
    updatedMatches[editingMatch].winner = winner
    setMatches(updatedMatches)
  }

  const handleCompetitorChange = (c: Competitor) => {
    if (editingCompetitor === null) return
    const updatedCompetitors = [...competitors]
    updatedCompetitors[editingCompetitor] = c
    setCompetitors(updatedCompetitors)
  }
  function handleCompetitionNameChange(e: ChangeEvent<HTMLInputElement>) {
    setCompetitionName(e.target.value)
  }
  function createNewMatch() {
    setEditingCompetitor(null)
    setMatches([...matches, { competitors: [], winner: undefined }])
    setEditingMatch(matches.length)
  }

  function handleMatchCompetitorSelection(
    competitorIndex: 0 | 1,
    competitor: Competitor | undefined
  ) {
    if (editingMatch === null) return
    const updatedMatches = [...matches]
    if (!updatedMatches[editingMatch]) {
      console.error('Match not found')
      return
    }
    const updatedMatch = { ...updatedMatches[editingMatch] }
    if (!updatedMatch.competitors) {
      updatedMatch.competitors = [undefined, undefined]
    }
    updatedMatch.competitors[competitorIndex] = competitor
    updatedMatches[editingMatch] = updatedMatch
    setMatches(updatedMatches)
  }

  function getWinnerValue(winner: 0 | 1 | undefined) {
    if (editingMatch === null) return ''
    if (winner === undefined || matches[editingMatch].competitors.length !== 2)
      return ''
    const winningCompetitor = matches[editingMatch].competitors[winner]
    if (!winningCompetitor) return ''
    return `${winningCompetitor.firstName} ${winningCompetitor.lastName}`
  }

  return (
    <main className={styles.root}>
      <input
        className={styles.editableTitle}
        disabled={loading}
        type="text"
        value={competitionName}
        onChange={handleCompetitionNameChange}
        autoFocus
        id="competition"
        placeholder="competition name"
      />
      <section style={{ margin: '1em 0' }}>
        <Button
          disabled={loading}
          onClick={() => {
            setCompetitors([
              ...competitors,
              { firstName: '', lastName: '', team: '', gender: Gender.Male },
            ])
            setEditingCompetitor(competitors.length)
          }}
        >
          Add competitor
        </Button>

        {editingCompetitor !== null && (
          <>
            <CompetitorEditor
              competitor={competitors[editingCompetitor]}
              onChange={handleCompetitorChange}
            />
            <Button
              disabled={loading}
              onClick={() => setEditingCompetitor(null)}
            >
              Done
            </Button>
          </>
        )}
      </section>

      {competitors.length > 0 && (
        <Athletes
          athletes={competitors}
          editingIndex={editingCompetitor}
          onAthleteClick={(i) => setEditingCompetitor(i)}
          onAthleteRemoveClick={handleAthleteRemove}
        />
      )}
      {competitors.length > 1 && (
        <section>
          <h1>Matches</h1>
          <Button onClick={createNewMatch} disabled={loading}>
            Add match
          </Button>
          {editingMatch !== null && (
            <>
              <div className={styles.editor}>
                <div>
                  <h3>Editing: {editingMatch}</h3>
                  <label htmlFor="competitor 1">
                    <p>Competitor 1</p>
                    <select
                      disabled={loading}
                      name="competitor 1"
                      id="competitor 1"
                      placeholder="select competitor"
                      onChange={(e) => {
                        if (e.target.value === '') {
                          handleMatchCompetitorSelection(0, undefined)
                        }
                        handleMatchCompetitorSelection(
                          0,
                          competitors[parseInt(e.target.value)]
                        )
                      }}
                    >
                      <option value="">select competitor</option>
                      {competitors.map((competitor, i) => (
                        <option key={`competitor1-${i}`} value={i}>
                          {competitor.firstName} {competitor.lastName}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label htmlFor="competitor 2">
                    <p>Competitor 2</p>
                    <select
                      disabled={loading}
                      name="competitor 2"
                      id="competitor 2"
                      placeholder="select competitor"
                      onChange={(e) => {
                        if (e.target.value === '') {
                          handleMatchCompetitorSelection(1, undefined)
                        }
                        handleMatchCompetitorSelection(
                          1,
                          competitors[parseInt(e.target.value)]
                        )
                      }}
                    >
                      <option value="">select competitor</option>
                      {competitors.map((competitor, i) => (
                        <option key={`competitor2-${i}`} value={i}>
                          {competitor.firstName} {competitor.lastName}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label htmlFor="winner">
                    <p>Winner</p>
                    <select
                      name="winner"
                      id="winner"
                      placeholder="select winner"
                      value={getWinnerValue(matches[editingMatch].winner)}
                      disabled={
                        loading ||
                        matches[editingMatch]?.competitors?.length !== 2
                      }
                      onChange={(e) => {
                        if (e.target.value === '') {
                          handleWinnerSelection(undefined)
                        }
                        handleWinnerSelection(parseInt(e.target.value) as 0 | 1)
                      }}
                    >
                      <option value="">select winner</option>
                      {matches[editingMatch].competitors.map(
                        (competitor, i) => (
                          <option key={`winner-${i}`} value={i}>
                            {competitor?.firstName} {competitor?.lastName}
                          </option>
                        )
                      )}
                    </select>
                  </label>
                </div>
              </div>
              <Button disabled={loading} onClick={() => setEditingMatch(null)}>
                Done
              </Button>
            </>
          )}
          <Matches
            matches={matches}
            editingIndex={editingMatch}
            onMatchClick={(i) => setEditingMatch(i)}
            onMatchRemoveClick={handleMatchRemove}
          />
        </section>
      )}
      {competitors.length >= 2 && (
        <div>
          <Button
            style={{ marginTop: '1em' }}
            onClick={handleUpdateClick}
            disabled={loading}
          >
            Submit results
          </Button>
          <span>{updateStatusMessage}</span>
        </div>
      )}
      {error && <pre style={{ marginTop: '1em' }}>{error.toString()}</pre>}
    </main>
  )
}
