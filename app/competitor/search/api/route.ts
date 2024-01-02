import { Competitor, Gender } from '@/app/components/Athletes'
import { query } from '@/app/db'
import { NextRequest, NextResponse } from 'next/server'

interface CompetitorRow {
  delta: null | number
  email: null | string
  first_name: null | string
  gender: null | string
  instagram: null | string
  last_name: null | string
  rating: null | number
  team: null | string
  uuid: string
  weight_class: null | string
}

function competitorRowToCompetitor(row: CompetitorRow): Competitor {
  return {
    uuid: row.uuid,
    firstName: row.first_name ?? undefined,
    lastName: row.last_name ?? undefined,
    weightClass: row.weight_class ?? undefined,
    team: row.team ?? undefined,
    delta: row.delta !== null ? row.delta : undefined,
    rating: row.rating ?? undefined,
    gender: row.gender as Gender,
    instagram: row.instagram ?? undefined,
    email: row.email ?? undefined,
  }
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const search = url.searchParams.get('search')

    let queryString = `SELECT * FROM competitors`
    const values = []
    if (search) {
      queryString = `${queryString} WHERE first_name ILIKE $1 OR last_name ILIKE $1 OR team ILIKE $1 OR weight_class ILIKE $1 OR instagram ILIKE $1`
      values.push(`%${search}%`)
    }
    queryString = `${queryString} ORDER BY rating DESC;`

    const data = await query(queryString, values)

    return NextResponse.json(
      {
        success: true,
        data: data.rows.map(competitorRowToCompetitor),
      },
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
