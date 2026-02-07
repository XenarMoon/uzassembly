import fs from 'fs'
import path from 'path'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

const useS3 = !!process.env.AWS_S3_BUCKET

export async function uploadBuffer(buffer: Buffer, filename: string, contentType = 'application/octet-stream') {
  if (useS3) {
    const client = new S3Client({ region: process.env.AWS_REGION })
    const bucket = process.env.AWS_S3_BUCKET as string
    const key = `${Date.now()}-${filename}`
    await client.send(new PutObjectCommand({ Bucket: bucket, Key: key, Body: buffer, ContentType: contentType, ACL: 'public-read' }))
    const base = process.env.AWS_S3_BASE_URL || `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com`
    return `${base}/${key}`
  }

  // Local fallback: save to public/uploads
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true })
  const filepath = path.join(uploadsDir, filename)
  fs.writeFileSync(filepath, buffer)
  return `/uploads/${filename}`
}
