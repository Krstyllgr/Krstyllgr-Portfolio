import { MailService } from '@sendgrid/mail';

if (!process.env.SENDGRID_API_KEY) {
  throw new Error("SENDGRID_API_KEY environment variable must be set");
}

const mailService = new MailService();
mailService.setApiKey(process.env.SENDGRID_API_KEY);

interface EmailParams {
  to: string;
  from: string;
  subject: string;
  text?: string;
  html?: string;
}

export async function sendEmail(params: EmailParams): Promise<boolean> {
  try {
    const emailData: any = {
      to: params.to,
      from: params.from,
      subject: params.subject,
    };
    
    if (params.text) {
      emailData.text = params.text;
    }
    
    if (params.html) {
      emailData.html = params.html;
    }
    
    console.log('Attempting to send email:', emailData);
    await mailService.send(emailData);
    console.log('Email sent successfully');
    return true;
  } catch (error) {
    console.error('SendGrid email error:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
    return false;
  }
}

export function createContactNotificationEmail(contactData: {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}) {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
        New Contact Form Submission
      </h2>
      
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #333; margin-top: 0;">Contact Information</h3>
        <p><strong>Name:</strong> ${contactData.firstName} ${contactData.lastName}</p>
        <p><strong>Email:</strong> <a href="mailto:${contactData.email}">${contactData.email}</a></p>
        <p><strong>Subject:</strong> ${contactData.subject}</p>
      </div>
      
      <div style="background-color: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        <h3 style="color: #333; margin-top: 0;">Message</h3>
        <p style="line-height: 1.6; white-space: pre-wrap;">${contactData.message}</p>
      </div>
      
      <div style="margin-top: 20px; padding: 15px; background-color: #e9ecef; border-radius: 8px;">
        <p style="margin: 0; font-size: 14px; color: #666;">
          This email was sent from your portfolio website contact form.
        </p>
      </div>
    </div>
  `;

  const text = `
New Contact Form Submission

Name: ${contactData.firstName} ${contactData.lastName}
Email: ${contactData.email}
Subject: ${contactData.subject}

Message:
${contactData.message}

---
This email was sent from your portfolio website contact form.
  `;

  return { html, text };
}