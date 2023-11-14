'use client'
import { useState } from 'react'
import styles from './page.module.scss'
import { useDebounce } from '@uidotdev/usehooks'
import Athletes from './components/Athletes'
import Toggle from './components/Toggle'
import Button from './components/Button'

let currentDate = new Date()
let formattedDate =
  (currentDate.getMonth() + 1).toString().padStart(2, '0') +
  '/' +
  currentDate.getDate().toString().padStart(2, '0') +
  '/' +
  currentDate.getFullYear()

enum Gender {
  Male,
  Female,
}

export default function Home() {
  const [search, setSearch] = useState('')
  const [gender, setGender] = useState(Gender.Male)
  const [weightClass, setWeightClass] = useState('P4P')
  const debouncedSearchTerm = useDebounce(search, 300)

  return (
    <main className={styles.root}>
      <p className={styles.wrestlers}>🤼‍♂️</p>
      <h1 className={styles.title}>Live BJJ Ratings</h1>
      <p>last update: {formattedDate}</p>
      <label htmlFor="search" style={{ position: 'relative' }}>
        <p className={styles.mag}>🔍</p>
        <input
          id="search"
          name="search"
          placeholder="Search by name, school, country, or event"
          type="text"
          value={search}
          className={styles.input}
          onChange={(e) => setSearch(e.target.value)}
        />
      </label>
      <div className={styles.controls}>
        <Toggle
          checked={gender === Gender.Male}
          onChange={() =>
            setGender((state) =>
              state !== Gender.Male ? Gender.Male : Gender.Female
            )
          }
          offContent={'♀'}
          onContent={'♂'}
        />
        {gender === Gender.Male ? (
          <>
            <Button onClick={() => setWeightClass('P4P')}>P4P</Button>
            <Button onClick={() => setWeightClass('135')}>135</Button>
            <Button onClick={() => setWeightClass('145')}>145</Button>
            <Button onClick={() => setWeightClass('155')}>155</Button>
            <Button onClick={() => setWeightClass('170')}>170</Button>
            <Button onClick={() => setWeightClass('185')}>185</Button>
            <Button onClick={() => setWeightClass('205')}>205</Button>
            <Button onClick={() => setWeightClass('205+')}>205+</Button>
          </>
        ) : (
          <>
            <Button>P4P</Button>
            <Button>P4P</Button>
            <Button>P4P</Button>
            <Button>P4P</Button>
          </>
        )}
      </div>

      <Athletes search={debouncedSearchTerm} />
    </main>
  )
}
