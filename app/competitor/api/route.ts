import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const competitor = await request.json()
  console.log(competitor)
  return NextResponse.json(
    { success: true },
    {
      status: 200,
      statusText: 'success',
    }
  )
}
