'use client'
import styles from './Athletes.module.scss'
import tableStyles from './Table.module.scss'

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
  editingIndex?: number | null
  athletes: Competitor[]
  onAthleteClick?: (i: number) => void
  onAthleteRemoveClick?: (i: number) => void
}

export default function Athletes({
  athletes,
  editingIndex,
  onAthleteClick,
  onAthleteRemoveClick,
}: AthletesProps) {
  const handleClick = (i: number) => {
    if (onAthleteClick) onAthleteClick(i)
  }
  const handleRemove = (i: number) => (e: any) => {
    e.stopPropagation()
    if (onAthleteRemoveClick) onAthleteRemoveClick(i)
  }
  return (
    <table className={styles.root}>
      <thead className={tableStyles.thead}>
        <tr className={tableStyles.tr}>
          <th className={tableStyles.th}>#</th>
          <th className={tableStyles.th}>Name</th>
          <th className={tableStyles.th}></th>
          <th className={tableStyles.th}>Δ</th>
          <th className={tableStyles.th}>Rating</th>
          <th className={tableStyles.th}>Team</th>
          {onAthleteRemoveClick && <th className={tableStyles.th}></th>}
        </tr>
      </thead>
      <tbody className={tableStyles.tbody}>
        {athletes.map((athlete: Competitor, i: number) => (
          <tr
            key={i}
            className={
              tableStyles.tr +
              ' ' +
              (i === editingIndex ? tableStyles.editingRow : '')
            }
            onClick={() => handleClick(i)}
            style={{ cursor: onAthleteClick ? 'pointer' : 'initial' }}
          >
            <td className={tableStyles.td}>{i}</td>
            <td className={tableStyles.td}>
              {athlete.firstName || 'firstName'}
            </td>
            <td className={tableStyles.td}>{athlete.lastName || 'lastName'}</td>
            <td className={tableStyles.td}>{athlete.delta || '--'}</td>
            <td className={tableStyles.td}>{athlete.rating || 'unknown'}</td>
            <td className={tableStyles.td}>{athlete.team || 'unknown'}</td>
            {onAthleteRemoveClick && (
              <td
                className={tableStyles.td}
                onClick={handleRemove(i)}
                style={{ cursor: 'pointer' }}
              >
                ❌
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
