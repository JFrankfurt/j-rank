import {
  Competitor,
  FemaleWeightClass,
  Gender,
  MaleWeightClass,
} from './Athletes'
import styles from './CompetitorEditor.module.scss'
import Toggle from './Toggle'

interface CompetitorEditorProps {
  competitor: Competitor
  onChange: (c: Competitor) => void
  disabled?: boolean
}

export const CompetitorEditor = ({
  disabled,
  competitor,
  onChange,
}: CompetitorEditorProps) => {
  if (!competitor) return null
  return (
    <>
      <div className={styles.editor}>
        <div>
          <h3>Editor</h3>
          <label htmlFor="firstName">
            <p>First Name</p>
            <input
              disabled={disabled}
              type="text"
              id="firstName"
              placeholder="firstName"
              value={competitor.firstName}
              onChange={({ target: { value } }) =>
                onChange({ ...competitor, firstName: value })
              }
            />
          </label>
          <label htmlFor="lastName">
            <p>Last Name</p>
            <input
              disabled={disabled}
              type="text"
              id="lastName"
              placeholder="lastName"
              value={competitor.lastName}
              onChange={({ target: { value } }) =>
                onChange({ ...competitor, lastName: value })
              }
            />
          </label>
          <label htmlFor="team">
            <p>Team</p>
            <input
              disabled={disabled}
              type="text"
              id="team"
              placeholder="team"
              value={competitor.team}
              onChange={({ target: { value } }) =>
                onChange({ ...competitor, team: value })
              }
            />
          </label>
          <label htmlFor="weightClass">
            <p>Weight Class</p>
            <input
              disabled={disabled}
              type="text"
              id="weightClass"
              placeholder="weightClass"
              value={competitor.weightClass || ''}
              onChange={({ target: { value } }) =>
                onChange({ ...competitor, weightClass: value })
              }
            />
          </label>
          <label htmlFor="gender">
            <p>Gender</p>
            <Toggle
              disabled={disabled}
              id="gender"
              checked={competitor.gender === Gender.Male}
              onChange={() =>
                onChange({
                  ...competitor,
                  gender:
                    competitor.gender === Gender.Male
                      ? Gender.Female
                      : Gender.Male,
                })
              }
              offContent={'♀'}
              onContent={'♂'}
            />
          </label>
          <label htmlFor="rating">
            <p>Rating</p>
            <input
              disabled={disabled}
              type="text"
              id="rating"
              placeholder="rating"
              value={competitor.rating}
              onChange={({ target: { value } }) =>
                onChange({ ...competitor, rating: parseInt(value) })
              }
            />
          </label>
        </div>
        <div>
          <h2>Rating</h2>
          <ul className={styles.ratingShortcuts}>
            <li onClick={() => onChange({ ...competitor, rating: 1200 })}>
              white: 1200
            </li>
            <li onClick={() => onChange({ ...competitor, rating: 1400 })}>
              blue: 1400
            </li>
            <li onClick={() => onChange({ ...competitor, rating: 1600 })}>
              purple: 1600
            </li>
            <li onClick={() => onChange({ ...competitor, rating: 1800 })}>
              brown: 1800
            </li>
            <li onClick={() => onChange({ ...competitor, rating: 2000 })}>
              black: 2000
            </li>
          </ul>
          <h2 style={{ marginTop: '1em' }}>Weight Class</h2>
          <ul className={styles.ratingShortcuts}>
            {Object.values(
              competitor.gender === Gender.Male
                ? MaleWeightClass
                : FemaleWeightClass
            ).map((wc) => (
              <li
                onClick={() => onChange({ ...competitor, weightClass: wc })}
                key={wc}
              >
                {wc}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
