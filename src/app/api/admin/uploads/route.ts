import { NextRequest, NextResponse } from 'next/server'
import { uploadBuffer } from '@/lib/storage'
export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const form = await request.formData()
    const file = form.get('file') as unknown as File | null
    if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 })

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const name = (file as any).name || `upload-${Date.now()}`

    const url = await uploadBuffer(buffer, `${Date.now()}-${name}`, (file as any).type || undefined)

    return NextResponse.json({ url })
  } catch (err) {
    console.error('Upload error', err)
    return NextResponse.json({ error: 'Internal' }, { status: 500 })
  }
}
