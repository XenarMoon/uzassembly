import { NextRequest, NextResponse } from 'next/server'

const TELEGRAM_BOT_TOKEN = '8065145975:AAESCd86MlkW03Ujj7k4cI7P_VgatkbYSWQ'
const TELEGRAM_CHAT_ID = '7634630022' // test qilinmoqda with your actual chat ID

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, company, reason, reasonTitle, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Format message for Telegram
    const telegramMessage = `
🆕 <b>Yangi murojaat!</b>

👤 <b>Ism:</b> ${name}
📧 <b>Email:</b> ${email}
📱 <b>Telefon:</b> ${phone || "Ko'rsatilmagan"}
🏢 <b>Kompaniya:</b> ${company || "Ko'rsatilmagan"}
📋 <b>Murojaat turi:</b> ${reasonTitle || reason}

💬 <b>Xabar:</b>
${message}

📅 <b>Sana:</b> ${new Date().toLocaleString('uz-UZ', { timeZone: 'Asia/Tashkent' })}
🌐 <b>Sayt:</b> uzassembly.uz
    `.trim()

    // Send to Telegram
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: telegramMessage,
          parse_mode: 'HTML',
        }),
      }
    )

    if (!telegramResponse.ok) {
      const errorData = await telegramResponse.json()
      console.error('Telegram API error:', errorData)
      return NextResponse.json(
        { error: 'Failed to send message' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
