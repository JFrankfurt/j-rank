import { NextResponse } from 'next/server'
import { Competitor } from '@/app/components/Athletes'

interface Competition {
  competition: string
  competitors: Competitor[]
  matches: { competitors: [Competitor, Competitor]; winner: 0 | 1 }[]
}

// create competition
// create id
export async function POST(request: Request) {
  const data: Competition = await request.json()
  console.log(data)
  return NextResponse.json({
    status: 'SUCCESS',
    response: data,
  })
}

// update existing competition
export async function PATCH(request: Request) {
  const data: Competition = await request.json()
  console.log(data)
  return NextResponse.json({
    status: 'SUCCESS',
    response: data,
  })
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    return NextResponse.json({
      status: 'SUCCESS',
      response: id,
    })
  } catch (e) {
    console.error(e)
    return NextResponse.next({ status: 500 })
  }
}
