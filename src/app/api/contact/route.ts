import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    // Check required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Lütfen gerekli tüm alanları (Ad, E-posta, Mesaj) doldurunuz." },
        { status: 400 }
      );
    }

    const gmailUser = process.env.GMAIL_USER || "kyhnayas@gmail.com";
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

    // Verify app password is set
    if (!gmailAppPassword) {
      console.warn("WARNING: GMAIL_APP_PASSWORD is not set in environment variables.");
      return NextResponse.json(
        { error: "E-posta servisi yapılandırılmadı. Lütfen GMAIL_APP_PASSWORD çevre değişkenini kontrol edin." },
        { status: 500 }
      );
    }

    // Configure SMTP transport using Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailAppPassword, // Google 16-character App Password
      },
    });

    // Formulate structured HTML email
    const mailOptions = {
      from: `"${name}" <${gmailUser}>`, // Must be GMAIL_USER as SMTP sender
      to: "kyhnayas@gmail.com",
      replyTo: email, // Direct reply to sender
      subject: `[3D Portfolyo İletişim]: ${subject || "Yeni Mesaj"}`,
      text: `Gönderen: ${name}\nE-posta: ${email}\nKonu: ${subject || "Yok"}\n\nMesaj:\n${message}`,
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 25px; border: 1px solid #1e293b; border-radius: 8px; background-color: #0b0f19; color: #f3f4f6;">
          <div style="text-align: center; border-bottom: 2px solid #00e5ff; padding-bottom: 15px; margin-bottom: 20px;">
            <h1 style="color: #00e5ff; margin: 0; font-size: 24px; font-weight: bold; letter-spacing: 1px;">İLETİŞİM FORMU MESAJI</h1>
            <p style="color: #94a3b8; margin: 5px 0 0 0; font-size: 12px; font-family: monospace;">3d.kayhanayas.com</p>
          </div>
          
          <div style="margin-bottom: 20px; line-height: 1.6;">
            <p style="margin: 8px 0;"><strong style="color: #00e5ff;">Gönderen Kişi:</strong> ${name}</p>
            <p style="margin: 8px 0;"><strong style="color: #00e5ff;">E-posta Adresi:</strong> <a href="mailto:${email}" style="color: #a855f7; text-decoration: none;">${email}</a></p>
            <p style="margin: 8px 0;"><strong style="color: #00e5ff;">Konu:</strong> ${subject || "Belirtilmemiş"}</p>
          </div>
          
          <div style="background-color: #111827; border-left: 4px solid #a855f7; padding: 15px; border-radius: 4px; margin-top: 15px;">
            <h3 style="margin-top: 0; margin-bottom: 10px; color: #a855f7; font-size: 14px; letter-spacing: 0.5px;">GÖNDERİLEN MESAJ:</h3>
            <p style="margin: 0; font-size: 14px; white-space: pre-wrap; color: #e2e8f0; font-weight: 300;">${message}</p>
          </div>
          
          <hr style="border: 0; border-top: 1px solid #1e293b; margin: 30px 0 15px 0;" />
          <div style="text-align: center; font-size: 10px; color: #64748b; font-family: monospace;">
            Bu otomatik mesaj 3D Portfolyo İletişim Formu kullanılarak gönderilmiştir.
          </div>
        </div>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ 
      success: true, 
      message: "Mesajınız başarıyla iletildi! En kısa sürede geri dönüş yapılacaktır." 
    });

  } catch (error: any) {
    console.error("Nodemailer Email Error:", error);
    return NextResponse.json(
      { error: "Mesaj iletilemedi. Lütfen daha sonra tekrar deneyin veya doğrudan 3d@kayhanayas.com adresine yazın." },
      { status: 500 }
    );
  }
}
