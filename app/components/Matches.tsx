'use client'
import { Competitor } from './Athletes'
import styles from './Matches.module.scss'

export interface Match {
  competitors: [Competitor?, Competitor?]
  winner: 0 | 1 | undefined
}

interface MatchesProps {
  matches: Match[]
  onMatchClick?: (i: number) => void
  onMatchRemoveClick?: (i: number) => void
}

export default function Matches({
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
      <thead>
        <tr>
          <th>#</th>
          <th>Competitor 1</th>
          <th>Competitor 2</th>
          <th>Winner</th>
          {onMatchRemoveClick && <th></th>}
        </tr>
      </thead>
      <tbody>
        {matches.map((match, i: number) => (
          <tr
            key={i}
            onClick={() => handleClick(i)}
            style={{ cursor: onMatchClick ? 'pointer' : 'initial' }}
          >
            <td>{i}</td>
            <td>{match.competitors[0]?.firstName || 'unknown'}</td>
            <td>{match.competitors[1]?.firstName || 'unknown'}</td>
            <td>
              {match.winner !== undefined ? match.competitors[match?.winner]?.firstName : 'unknown'}
            </td>
            {onMatchRemoveClick && (
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
