import { NextResponse } from 'next/server'

function response(data, status = 200) {
  return NextResponse.json(data, { status, headers: { 'Cache-Control': 'no-store' } })
}

export async function GET(request, { params }) {
  const path = (await params)?.path || []
  const route = `/${path.join('/')}`
  if (route === '/' || route === '/root') return response({ ok: true, message: 'Northstar API is ready' })
  return response({ error: `Route ${route} not found` }, 404)
}

export async function OPTIONS() { return new NextResponse(null, { status: 204 }) }
