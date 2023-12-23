import { FemaleWeightClass, Gender, MaleWeightClass } from './Athletes'
import Button from './Button'
import styles from './CompetitorEditor.module.scss'


interface CompetitorEditorProps {
  disabled?: boolean
}

export const CompetitorEditor = ({ disabled, competitor, handleChange }: CompetitorEditorProps) => (
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
            onChange={handleCompetitorFieldChange(
              editingCompetitor,
              'firstName'
            )}
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
            onChange={handleCompetitorFieldChange(
              editingCompetitor,
              'lastName'
            )}
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
            onChange={handleCompetitorFieldChange(editingCompetitor, 'team')}
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
            onChange={handleCompetitorFieldChange(
              editingCompetitor,
              'weightClass'
            )}
          />
        </label>
        <label htmlFor="gender">
          <p>Gender</p>
          <Toggle
            disabled={disabled}
            id="gender"
            checked={competitor.gender === Gender.Male}
            onChange={handleGenderToggle}
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
            onChange={handleCompetitorFieldChange(editingCompetitor, 'rating')}
          />
        </label>
      </div>
      <div>
        <h2>Rating</h2>
        <ul className={styles.ratingShortcuts}>
          <li onClick={() => handleRatingShortcut(1200)}>white: 1200</li>
          <li onClick={() => handleRatingShortcut(1400)}>blue: 1400</li>
          <li onClick={() => handleRatingShortcut(1600)}>purple: 1600</li>
          <li onClick={() => handleRatingShortcut(1800)}>brown: 1800</li>
          <li onClick={() => handleRatingShortcut(2000)}>black: 2000</li>
        </ul>
        <h2 style={{ marginTop: '1em' }}>Weight Class</h2>
        <ul className={styles.ratingShortcuts}>
          {Object.values(
            competitor.gender === Gender.Male
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

  </>
)
