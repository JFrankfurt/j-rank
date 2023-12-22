'use client'
import { Competitor } from './Athletes'
import styles from './Matches.module.scss'
import tableStyles from './Table.module.scss'

export interface Match {
  competitors: [Competitor?, Competitor?]
  winner: 0 | 1 | undefined
}

interface MatchesProps {
  editingIndex?: number | null
  matches: Match[]
  onMatchClick?: (i: number) => void
  onMatchRemoveClick?: (i: number) => void
}

export default function Matches({
  editingIndex,
  matches,
  onMatchClick,
  onMatchRemoveClick,
}: MatchesProps) {
  const handleClick = (i: number) => {
    if (onMatchClick) onMatchClick(i)
  }
  const handleRemove = (i: number) => (e: any) => {
    e.stopPropagation()
    if (onMatchRemoveClick) onMatchRemoveClick(i)
  }
  return (
    <table className={styles.root}>
      <thead className={tableStyles.thead}>
        <tr className={tableStyles.tr}>
          <th className={tableStyles.th}>#</th>
          <th className={tableStyles.th}>Competitor 1</th>
          <th className={tableStyles.th}>Competitor 2</th>
          <th className={tableStyles.th}>Winner</th>
          {onMatchRemoveClick && <th className={tableStyles.th}></th>}
        </tr>
      </thead>
      <tbody className={tableStyles.tbody}>
        {matches.map((match, i: number) => (
          <tr
            key={i}
            onClick={() => handleClick(i)}
            className={
              tableStyles.tr +
              ' ' +
              (i === editingIndex ? tableStyles.editingRow : '')
            }
            style={{ cursor: onMatchClick ? 'pointer' : 'initial' }}
          >
            <td className={tableStyles.td}>{i}</td>
            <td className={tableStyles.td}>
              {match.competitors[0]?.firstName || 'unknown'}
            </td>
            <td className={tableStyles.td}>
              {match.competitors[1]?.firstName || 'unknown'}
            </td>
            <td className={tableStyles.td}>
              {match.winner !== undefined
                ? match.competitors[match?.winner]?.firstName
                : 'unknown'}
            </td>
            {onMatchRemoveClick && (
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
