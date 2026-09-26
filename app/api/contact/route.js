import { NextResponse } from 'next/server'
import { google } from 'googleapis'

export async function POST(request) {
  try {
    const body = await request.json()
    const { fullName, phone, email, city, service } = body || {}

    // Basic Server-Side Validation
    if (!fullName || typeof fullName !== 'string' || !fullName.trim()) {
      return NextResponse.json({ success: false, message: 'Full name is required.' }, { status: 400 })
    }

    if (!phone || typeof phone !== 'string' || !phone.trim()) {
      return NextResponse.json({ success: false, message: 'Phone number is required.' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      return NextResponse.json({ success: false, message: 'A valid email address is required.' }, { status: 400 })
    }

    if (!city || typeof city !== 'string' || !city.trim()) {
      return NextResponse.json({ success: false, message: 'City is required.' }, { status: 400 })
    }

    if (!service || typeof service !== 'string' || !service.trim()) {
      return NextResponse.json({ success: false, message: 'Service needed is required.' }, { status: 400 })
    }

    // Check Google Sheets Environment Variables
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL
    const privateKey = process.env.GOOGLE_PRIVATE_KEY
    const sheetId = process.env.GOOGLE_SHEET_ID
    const sheetRange = process.env.GOOGLE_SHEET_RANGE || 'Sheet1!A:F'

    if (!clientEmail || !privateKey || !sheetId) {
      console.error('Missing Google Sheets environment variables.')
      return NextResponse.json(
        {
          success: false,
          message: 'Server configuration error: Google Sheets environment variables are missing.',
        },
        { status: 500 }
      )
    }

    // Server-side timestamp generation (IST / Localized format)
    const now = new Date()
    const timestamp = now.toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    })

    // Authenticate with Google Sheets API
    const formattedPrivateKey = privateKey.replace(/\\n/g, '\n')
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: clientEmail,
        private_key: formattedPrivateKey,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })

    const sheets = google.sheets({ version: 'v4', auth })

    // Append submission row to Google Sheet
    // Columns: Timestamp | Full Name | Phone Number | Email | City | Service Needed
    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: sheetRange,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[timestamp, fullName.trim(), phone.trim(), email.trim().toLowerCase(), city.trim(), service.trim()]],
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Your consultation request has been submitted successfully!',
    })
  } catch (error) {
    console.error('Error submitting form to Google Sheets:', error)
    return NextResponse.json(
      {
        success: false,
        message: error.message || 'An error occurred while saving your request. Please try again.',
      },
      { status: 500 }
    )
  }
}
