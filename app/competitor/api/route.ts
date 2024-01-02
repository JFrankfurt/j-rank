import { query } from '@/app/db'
import { NextRequest, NextResponse } from 'next/server'

const COMPETITOR_KEYS = [
  'firstName',
  'lastName',
  'weightClass',
  'team',
  'rating',
  'gender',
  'instagram',
  'email',
]
const REQUIRED_FIELDS = ['firstName', 'lastName', 'rating', 'gender']

export async function POST(request: NextRequest) {
  try {
    const competitor = await request.json()
    console.log(competitor)

    // Validate required fields
    for (let field of REQUIRED_FIELDS) {
      if (
        competitor[field] === undefined ||
        (typeof competitor[field] === 'string' &&
          competitor[field].trim() === '')
      ) {
        throw new Error(`Missing or invalid required field: ${field}`)
      }
    }

    // Validate and set optional fields
    const values = COMPETITOR_KEYS.map((key) => {
      let value = competitor[key]
      if (key === 'rating') {
        value = parseInt(value || '0')
      }
      return value === undefined || value === null ? '' : value
    })

    const qstring = `INSERT INTO competitors (first_name, last_name, weight_class, team, rating, gender, instagram, email) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`
    const qres = await query(qstring, values)
    console.log('qres', qres)
    return NextResponse.json(
      { success: true, data: qres.rows },
      {
        status: 200,
        statusText: 'success',
      }
    )
  } catch (e) {
    console.error(e)
    return NextResponse.json(
      { success: false },
      {
        status: 400,
        statusText: 'fail',
      }
    )
  }
}

export async function DELETE(request: NextRequest) {
  const data = await request.json()
  if (!data.id) {
    return NextResponse.json(
      { success: false },
      {
        status: 400,
        statusText: 'id not present',
      }
    )
  }
  const qstring = `DELETE FROM competitors WHERE uuid = $1`
  await query(qstring, data.id)
  return NextResponse.json(
    { success: true },
    {
      status: 200,
      statusText: 'success',
    }
  )
}
