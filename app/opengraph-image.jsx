import { ImageResponse } from 'next/og'

export const dynamic = 'force-static'

export const alt = 'Atharva Gham Portfolio'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #020617 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '100px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
          <div style={{ 
            background: 'linear-gradient(135deg, rgba(14,165,233,0.2), rgba(20,184,166,0.08))', 
            border: '2px solid rgba(148,163,184,0.4)',
            width: '100px', height: '100px', borderRadius: '24px', 
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '44px', color: '#38bdf8', fontWeight: 700
          }}>
            AG
          </div>
          <span style={{ marginLeft: '32px', fontSize: '56px', color: '#eef2f7', fontWeight: 600 }}>
            Atharva Gham
          </span>
        </div>
        
        <h1 style={{ fontSize: '80px', color: '#ffffff', fontWeight: 700, lineHeight: 1.1, margin: 0, padding: 0 }}>
          Software Security, <br/>Proven with Evidence
        </h1>
        <p style={{ fontSize: '34px', color: '#94a3b8', marginTop: '44px', maxWidth: '860px' }}>
          Offensive testing, detection engineering, and secure systems — with the proof.
        </p>
      </div>
    ),
    { ...size }
  )
}
