'use client'
import styles from './Athletes.module.scss'

export enum Gender {
  Male = 'Male',
  Female = 'Female',
}

export interface Competitor {
  firstName?: string
  lastName?: string
  weightClass?: FemaleWeightClass | MaleWeightClass
  team?: string
  delta?: string
  rating?: number
  gender?: Gender
}

export enum MaleWeightClass {
  Male_145 = '145 lb',
  Male_155 = '155 lb',
  Male_170 = '170 lb',
  Male_185 = '185 lb',
  Male_205 = '205 lb',
  Male_205Plus = '205+ lb',
}

export enum FemaleWeightClass {
  Female_115 = '115 lb',
  Female_125 = '125 lb',
  Female_135 = '135 lb',
  Female_145 = '145 lb',
  Female_145Plus = '145+ lb',
}


interface AthletesProps {
  athletes: Competitor[]
  onAthleteClick?: (i: number) => void
  onAthleteRemoveClick?: (i: number) => void
}

export default function Athletes({ athletes, onAthleteClick, onAthleteRemoveClick }: AthletesProps) {
  const handleClick = (i: number) => {
    if (onAthleteClick) onAthleteClick(i)
  }
  const handleRemove =
    (i: number) => (e: any) => {
      e.stopPropagation()
      if (onAthleteRemoveClick) onAthleteRemoveClick(i)
    }
  return (
    <table className={styles.root}>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Name</th>
          <th></th>
          <th>Δ</th>
          <th>Rating</th>
          <th>Team</th>
          {onAthleteRemoveClick && <th></th>}
        </tr>
      </thead>
      <tbody>
        {athletes.map((athlete: any, i: number) => (
          <tr
            key={i}
            onClick={() => handleClick(i)}
            style={{ cursor: onAthleteClick ? 'pointer' : 'initial' }}
          >
            <td>{i}</td>
            <td>{athlete.firstName || 'firstName'}</td>
            <td>{athlete.lastName || 'lastName'}</td>
            <td>{athlete.delta || '--'}</td>
            <td>{athlete.rating || 'unknown'}</td>
            <td>{athlete.team || 'unknown'}</td>
            {onAthleteRemoveClick && (
              <td onClick={handleRemove(i)} style={{ cursor: 'pointer' }}>
                ❌
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
