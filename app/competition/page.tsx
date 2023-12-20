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

function removeElementFromArray(array: any[], index: number) {
  const newArray = [...array]
  console.log('removing', index)
  newArray.splice(index, 1)
  return newArray
}

export default function Competition() {
  const [competitors, setCompetitors] = useState<Competitor[]>([])
  const [editingCompetitor, setEditingCompetitor] = useState<null | number>(
    null
  )
  const [compNumber, setCompNumber] = useState('')

  function handleAthleteRemove(i: number) {
    setEditingCompetitor(null)
    setCompetitors(removeElementFromArray(competitors, i))
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
      <section>
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
                <h2>Editing: {editingCompetitor}</h2>
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
                <h2>Rating Initialization</h2>
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
              </div>
              <div>
                <h2>Weight Class Shortcuts</h2>
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

      <Athletes
        athletes={competitors}
        onAthleteClick={(i) => setEditingCompetitor(i)}
        onAthleteRemoveClick={handleAthleteRemove}
      />
      {competitors.length > 1 && (
        <section>
          <h1>Matches</h1>
          <Button onClick={createNewMatch}>Add match</Button>
        </section>
      )}
    </main>
  )
}
