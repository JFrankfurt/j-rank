'use client'
import { useState } from 'react'
import styles from './page.module.scss'
import { useDebounce } from '@uidotdev/usehooks'
import Athletes from './components/Athletes'

let currentDate = new Date()
let formattedDate =
  (currentDate.getMonth() + 1).toString().padStart(2, '0') +
  '/' +
  currentDate.getDate().toString().padStart(2, '0') +
  '/' +
  currentDate.getFullYear()

export default function Home() {
  const [search, setSearch] = useState('')
  const debouncedSearchTerm = useDebounce(search, 300)

  return (
    <main className={styles.root}>
      <h1 className={styles.title}>Live BJJ Ratings</h1>
      <p>last update: {formattedDate}</p>
      <p className={styles.wrestlers}>🤼‍♂️</p>
      <input
        id="search"
        placeholder="search"
        type="text"
        value={search}
        className={styles.input}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Athletes search={debouncedSearchTerm} />
    </main>
  )
}
