import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('query')
    
    return NextResponse.json({}, { status: 200 })
  } catch (e) {
    return NextResponse.json({}, { status: 500 })
  }
}
