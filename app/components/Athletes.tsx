'use client'
import React, { useState, useEffect } from 'react'
import styles from './Athletes.module.scss'

interface AthletesProps {
  search: string
}

export default function Athletes({ search }: AthletesProps) {
  const [data, setData] = useState<any>([])
  useEffect(() => {
    fetch(`/search${search ? `?search=${search}` : ''}`)
      .then((response) => response.json())
      .then((data) => setData(data.response))
  }, [search])

  return (
    <table className={styles.root}>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Name</th>
          <th>Δ</th>
          <th>Rating</th>
          <th>School</th>
          <th>Nationality</th>
        </tr>
      </thead>
      <tbody>
        {data.map((athlete: any, i: number) => (
          <tr key={athlete.guid}>
            <td>{i}</td>
            <td>
              {athlete.firstName} {athlete.lastName}
            </td>
            <td>+4</td>
            <td>rating</td>
            <td>school</td>
            <td>🇺🇸</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
