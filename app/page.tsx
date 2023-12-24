'use client'
import { useEffect, useState } from 'react'
import styles from './page.module.scss'
import { useDebounce } from '@uidotdev/usehooks'
import Athletes, { Gender } from './components/Athletes'
import Toggle from './components/Toggle'
import Button from './components/Button'

let currentDate = new Date()
let formattedDate =
  (currentDate.getMonth() + 1).toString().padStart(2, '0') +
  '/' +
  currentDate.getDate().toString().padStart(2, '0') +
  '/' +
  currentDate.getFullYear()

export default function Home() {
  const [search, setSearch] = useState('')
  const [gender, setGender] = useState(Gender.Male)
  const [weightClass, setWeightClass] = useState('135')
  const debouncedSearchTerm = useDebounce(search, 300)
  const [athletes, setAthletes] = useState<any>([])

  useEffect(() => {
    fetch(
      `/competitor/search/api${debouncedSearchTerm ? `?search=${debouncedSearchTerm}` : ''}`
    )
      .then((response) => response.json())
      .then((data) => setAthletes(data.response))
  }, [debouncedSearchTerm])

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
          placeholder="Search by name or school"
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
            <Button onClick={() => setWeightClass('115')}>115</Button>
            <Button onClick={() => setWeightClass('125')}>125</Button>
            <Button onClick={() => setWeightClass('135')}>135</Button>
            <Button onClick={() => setWeightClass('145')}>145</Button>
            <Button onClick={() => setWeightClass('145+')}>145+</Button>
          </>
        )}
      </div>

      <Athletes athletes={athletes} />
    </main>
  )
}
