import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, subject, message } = await req.json();
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ success: false, error: 'Bitte fülle alle Pflichtfelder aus.' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: 'w01bd533.kasserver.com',
      port: 587,
      secure: false,
      auth: {
        user: 'noreply@misscrypto.de',
        pass: 'f35eEetwgcjBjw8E43By',
      },
    });

    const mailOptions = {
      from: `MissCrypto Kontakt <noreply@misscrypto.de>`,
      to: 'info@misscrypto.de',
      subject: `[MissCrypto Kontakt] ${subject}`,
      replyTo: email,
      text: `Name: ${name}\nE-Mail: ${email}\nTelefon: ${phone || '-'}\n\nNachricht:\n${message}`,
      html: `<p><b>Name:</b> ${name}<br/><b>E-Mail:</b> ${email}<br/><b>Telefon:</b> ${phone || '-'}<br/><br/><b>Nachricht:</b><br/>${message.replace(/\n/g, '<br/>')}</p>`
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false, error: 'E-Mail-Versand fehlgeschlagen.' }, { status: 500 });
  }
} 