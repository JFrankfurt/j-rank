'use client'
import { ChangeEvent, useState } from 'react'
import Button from '../components/Button'
import styles from './page.module.scss'
import Athletes, {
  Competitor,
  FemaleWeightClass,
  Gender,
  MaleWeightClass,
} from '../components/Athletes'
import Toggle from '../components/Toggle'
import Matches, { Match } from '../components/Matches'

function removeElementFromArray(array: any[], index: number) {
  const newArray = [...array]
  console.log('removing', index)
  newArray.splice(index, 1)
  return newArray
}

export default function Competition() {
  const [compNumber, setCompNumber] = useState('')
  const [competitors, setCompetitors] = useState<Competitor[]>([])
  const [editingCompetitor, setEditingCompetitor] = useState<null | number>(
    null
  )
  const [matches, setMatches] = useState<Match[]>([])
  const [editingMatch, setEditingMatch] = useState<null | number>(null)

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

  const handleCompetitorFieldChange =
    (i: number, field: keyof Competitor) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      const updatedCompetitors = [...competitors]
      updatedCompetitors[i] = {
        ...updatedCompetitors[i],
        [field]: e.target.value,
      }
      setCompetitors(updatedCompetitors)
    }
  function handleCompNumberChange(e: ChangeEvent<HTMLInputElement>) {
    setCompNumber(e.target.value)
  }
  function createNewMatch() {
    setEditingCompetitor(null)
    setMatches([...matches, { competitors: [], winner: undefined }])
    setEditingMatch(matches.length)
  }
  function handleGenderToggle() {
    if (editingCompetitor === null) return
    const updatedCompetitors = [...competitors]
    updatedCompetitors[editingCompetitor] = {
      ...updatedCompetitors[editingCompetitor],
      weightClass: undefined,
      gender:
        updatedCompetitors[editingCompetitor].gender === Gender.Male
          ? Gender.Female
          : Gender.Male,
    }
    setCompetitors(updatedCompetitors)
  }
  function handleRatingShortcut(value: number) {
    if (editingCompetitor === null) return
    const updatedCompetitors = [...competitors]
    updatedCompetitors[editingCompetitor] = {
      ...updatedCompetitors[editingCompetitor],
      rating: value,
    }
    setCompetitors(updatedCompetitors)
  }
  function handleWeightClassShortcut(wc: MaleWeightClass | FemaleWeightClass) {
    if (editingCompetitor === null) return
    const updatedCompetitors = [...competitors]
    updatedCompetitors[editingCompetitor] = {
      ...updatedCompetitors[editingCompetitor],
      weightClass: wc,
    }
    setCompetitors(updatedCompetitors)
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
    if (winner === undefined || matches[editingMatch].competitors.length !== 2) return ''
    const winningCompetitor = matches[editingMatch].competitors[winner] 
    if (!winningCompetitor) return ''
    return `${winningCompetitor.firstName} ${winningCompetitor.lastName}`
  }

  return (
    <main className={styles.root}>
      <h1>TNJJ{compNumber && ` ${compNumber}`}</h1>
      <section>
        <label htmlFor="competition">
          <p>competition #</p>
          <input
            type="number"
            value={compNumber}
            onChange={handleCompNumberChange}
            autoFocus
            id="competition"
            placeholder="competition number"
          />
        </label>
      </section>
      <section style={{ margin: '1em 0' }}>
        <Button
          onClick={() => {
            setCompetitors([
              ...competitors,
              { firstName: '', lastName: '', team: '' },
            ])
            setEditingCompetitor(competitors.length)
          }}
        >
          Add competitor
        </Button>
        {editingCompetitor !== null && (
          <>
            <div className={styles.editor}>
              <div>
                <h3>Editing: {editingCompetitor}</h3>
                <label htmlFor="firstName">
                  <p>First Name</p>
                  <input
                    type="text"
                    id="firstName"
                    placeholder="firstName"
                    value={competitors[editingCompetitor].firstName}
                    onChange={handleCompetitorFieldChange(
                      editingCompetitor,
                      'firstName'
                    )}
                  />
                </label>
                <label htmlFor="lastName">
                  <p>Last Name</p>
                  <input
                    type="text"
                    id="lastName"
                    placeholder="lastName"
                    value={competitors[editingCompetitor].lastName}
                    onChange={handleCompetitorFieldChange(
                      editingCompetitor,
                      'lastName'
                    )}
                  />
                </label>
                <label htmlFor="team">
                  <p>Team</p>
                  <input
                    type="text"
                    id="team"
                    placeholder="team"
                    value={competitors[editingCompetitor].team}
                    onChange={handleCompetitorFieldChange(
                      editingCompetitor,
                      'team'
                    )}
                  />
                </label>
                <label htmlFor="weightClass">
                  <p>Weight Class</p>
                  <input
                    type="text"
                    id="weightClass"
                    placeholder="weightClass"
                    value={competitors[editingCompetitor].weightClass || ''}
                    onChange={handleCompetitorFieldChange(
                      editingCompetitor,
                      'weightClass'
                    )}
                  />
                </label>
                <label htmlFor="gender">
                  <p>Gender</p>
                  <Toggle
                    id="gender"
                    checked={
                      competitors[editingCompetitor].gender === Gender.Male
                    }
                    onChange={handleGenderToggle}
                    offContent={'♀'}
                    onContent={'♂'}
                  />
                </label>
                <label htmlFor="rating">
                  <p>Rating</p>
                  <input
                    type="text"
                    id="rating"
                    placeholder="rating"
                    value={competitors[editingCompetitor].rating}
                    onChange={handleCompetitorFieldChange(
                      editingCompetitor,
                      'rating'
                    )}
                  />
                </label>
              </div>
              <div>
                <h2>Rating</h2>
                <ul className={styles.ratingShortcuts}>
                  <li onClick={() => handleRatingShortcut(1200)}>
                    white: 1200
                  </li>
                  <li onClick={() => handleRatingShortcut(1400)}>blue: 1400</li>
                  <li onClick={() => handleRatingShortcut(1600)}>
                    purple: 1600
                  </li>
                  <li onClick={() => handleRatingShortcut(1800)}>
                    brown: 1800
                  </li>
                  <li onClick={() => handleRatingShortcut(2000)}>
                    black: 2000
                  </li>
                </ul>
                <h2 style={{ marginTop: '1em' }}>Weight Class</h2>
                <ul className={styles.ratingShortcuts}>
                  {Object.values(
                    competitors[editingCompetitor].gender === Gender.Male
                      ? MaleWeightClass
                      : FemaleWeightClass
                  ).map((wc) => (
                    <li onClick={() => handleWeightClassShortcut(wc)} key={wc}>
                      {wc}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <Button onClick={() => setEditingCompetitor(null)}>Done</Button>
          </>
        )}
      </section>

      {competitors.length > 0 && (
        <Athletes
          athletes={competitors}
          onAthleteClick={(i) => setEditingCompetitor(i)}
          onAthleteRemoveClick={handleAthleteRemove}
        />
      )}
      {competitors.length > 1 && (
        <section>
          <h1>Matches</h1>
          <Button onClick={createNewMatch}>Add match</Button>
          {editingMatch !== null && (
            <>
              <div className={styles.editor}>
                <div>
                  <h3>Editing: {editingMatch}</h3>
                  <label htmlFor="competitor 1">
                    <p>Competitor 1</p>
                    <select
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
              <Button onClick={() => setEditingMatch(null)}>Done</Button>
            </>
          )}
          <Matches
            matches={matches}
            onMatchClick={(i) => setEditingMatch(i)}
            onMatchRemoveClick={handleMatchRemove}
          />
        </section>
      )}
    </main>
  )
}
