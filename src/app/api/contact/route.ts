import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// NOTE: Add RESEND_API_KEY to your .env.local file in production
const apiKey = process.env.RESEND_API_KEY || 're_mock_key';
const resend = new Resend(apiKey);

export async function POST(request: Request) {
  try {
    const { email, message } = await request.json();

    if (!email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Since this is a portfolio, you probably want to send the emails to yourself.
    // Replace 'delivered@resend.dev' with your actual receiving email once domain is verified!
    const recipientEmail = process.env.CONTACT_EMAIL || 'delivered@resend.dev';

    // If the API key is not yet configured, gracefully mock the success for the front-end simulation
    if (apiKey === 're_mock_key') {
      console.log('--- START SECURE MOCK TRANSMISSION ---');
      console.log(`FROM_NODE: ${email}`);
      console.log(`PAYLOAD: ${message}`);
      console.log('--- END MOCK TRANSMISSION ---');
      
      // Simulate real-world network delay for the JARVIS UI feel (800ms)
      await new Promise(resolve => setTimeout(resolve, 800));
      return NextResponse.json({ success: true, mock: true });
    }

    // PRODUCTION RESEND LOGIC
    const data = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>', // Update this to your verified sender domain
      to: [recipientEmail],
      subject: `[SYSTEM KINETIK] New Transmission from ${email}`,
      html: `
        <h2>Secure Terminal Transmission</h2>
        <p><strong>Initiating Node (Sender):</strong> ${email}</p>
        <p><strong>Payload (Message):</strong></p>
        <blockquote>${message}</blockquote>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Transmission Error:', error);
    return NextResponse.json({ error: 'Failed to initiate transmission' }, { status: 500 });
  }
}
