import { ImageResponse } from 'next/og'
import { readFileSync } from 'fs'
import { join } from 'path'

export const size = {
  width: 180,
  height: 180,
}
export const contentType = 'image/png'

export default function AppleIcon() {
  // Read the logo file and convert to base64
  const logoPath = join(process.cwd(), 'public', 'images', 'logo', 'footer-blue.png')
  const logoBuffer = readFileSync(logoPath)
  const logoBase64 = `data:image/png;base64,${logoBuffer.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0C1425',
          borderRadius: 36,
        }}
      >
        <img
          src={logoBase64}
          width={140}
          height={140}
          style={{
            objectFit: 'contain',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  )
}
