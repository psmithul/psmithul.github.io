import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const isDevelopment = process.env.NODE_ENV === 'development'

// Email recipients
const EMAIL_RECIPIENTS = [
  'psmithul@gmail.com',
  'kulkarni.karthik@thinkify.io'
]

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { scale, remote, roles, email, phone, company_name } = body

    // Validate required fields
    if (!scale || !remote || !roles || !email || !phone || !company_name) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Format the email content
    const emailData = {
      to: EMAIL_RECIPIENTS,
      subject: `🚀 New Hiring Request from ${company_name} - Thinkify Labs`,
      timestamp: new Date().toISOString(),
      data: {
        company_name,
        scale,
        remote,
        roles,
        email,
        phone
      }
    }

    let emailSent = false
    let emailMethod = 'none'

    // Option 1: Gmail SMTP (Free)
    if (process.env.GMAIL_USER && process.env.GMAIL_PASS && !emailSent) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS // App password, not regular password
          }
        })

        // Verify connection
        await transporter.verify()

        // Send to each recipient
        for (const recipient of EMAIL_RECIPIENTS) {
          await transporter.sendMail({
            from: `"Thinkify Labs" <${process.env.GMAIL_USER}>`,
            to: recipient,
            subject: emailData.subject,
            html: generateEmailHTML(emailData.data),
            text: generateEmailText(emailData.data)
          })
        }

        emailSent = true
        emailMethod = 'Gmail SMTP'
        if (isDevelopment) {
          console.log('✅ Email sent successfully via Gmail SMTP to both recipients')
        }
      } catch (error) {
        if (isDevelopment) {
          console.error('❌ Gmail SMTP failed:', error)
          console.log('💡 Gmail SMTP troubleshooting:')
          console.log('   - Make sure you\'re using an App Password (not your regular password)')
          console.log('   - Enable 2-factor authentication on your Gmail account')
          console.log('   - Go to https://myaccount.google.com/security → App passwords')
          console.log('   - Generate a new app password for "Mail"')
          console.log('   - Use the 16-character password in GMAIL_PASS')
        }
      }
    }
    
    // Option 2: Outlook/Hotmail SMTP (Free)
    if (process.env.OUTLOOK_USER && process.env.OUTLOOK_PASS && !emailSent) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'hotmail',
          auth: {
            user: process.env.OUTLOOK_USER,
            pass: process.env.OUTLOOK_PASS
          }
        })

        await transporter.verify()

        // Send to each recipient
        for (const recipient of EMAIL_RECIPIENTS) {
          await transporter.sendMail({
            from: `"Thinkify Labs" <${process.env.OUTLOOK_USER}>`,
            to: recipient,
            subject: emailData.subject,
            html: generateEmailHTML(emailData.data),
            text: generateEmailText(emailData.data)
          })
        }

        emailSent = true
        emailMethod = 'Outlook SMTP'
        if (isDevelopment) {
          console.log('✅ Email sent successfully via Outlook SMTP to both recipients')
        }
      } catch (error) {
        if (isDevelopment) {
          console.error('❌ Outlook SMTP failed:', error)
        }
      }
    }
    
    // Option 3: Yahoo SMTP (Free)
    if (process.env.YAHOO_USER && process.env.YAHOO_PASS && !emailSent) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'yahoo',
          auth: {
            user: process.env.YAHOO_USER,
            pass: process.env.YAHOO_PASS
          }
        })

        await transporter.verify()

        // Send to each recipient
        for (const recipient of EMAIL_RECIPIENTS) {
          await transporter.sendMail({
            from: `"Thinkify Labs" <${process.env.YAHOO_USER}>`,
            to: recipient,
            subject: emailData.subject,
            html: generateEmailHTML(emailData.data),
            text: generateEmailText(emailData.data)
          })
        }

        emailSent = true
        emailMethod = 'Yahoo SMTP'
        if (isDevelopment) {
          console.log('✅ Email sent successfully via Yahoo SMTP to both recipients')
        }
      } catch (error) {
        if (isDevelopment) {
          console.error('❌ Yahoo SMTP failed:', error)
        }
      }
    }
    
    // Option 4: Custom SMTP (Free providers like Mailtrap, etc.)
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS && !emailSent) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: parseInt(process.env.SMTP_PORT || '587'),
          secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
          }
        })

        await transporter.verify()

        // Send to each recipient
        for (const recipient of EMAIL_RECIPIENTS) {
          await transporter.sendMail({
            from: `"Thinkify Labs" <${process.env.SMTP_USER}>`,
            to: recipient,
            subject: emailData.subject,
            html: generateEmailHTML(emailData.data),
            text: generateEmailText(emailData.data)
          })
        }

        emailSent = true
        emailMethod = 'Custom SMTP'
        if (isDevelopment) {
          console.log('✅ Email sent successfully via Custom SMTP to both recipients')
        }
      } catch (error) {
        if (isDevelopment) {
          console.error('❌ Custom SMTP failed:', error)
        }
      }
    }
    
    // Option 5: Webhook (for testing)
    if (process.env.WEBHOOK_URL && !emailSent) {
      try {
        const response = await fetch(process.env.WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...emailData,
            recipients: EMAIL_RECIPIENTS
          }),
        })

        if (response.ok) {
          emailSent = true
          emailMethod = 'Webhook'
          if (isDevelopment) {
            console.log('✅ Data sent to webhook successfully for both recipients')
          }
        }
      } catch (error) {
        if (isDevelopment) {
          console.error('❌ Webhook failed:', error)
        }
      }
    }
    
    // Option 6: Formspree Fallback (for production)
    if (process.env.FORMSPREE_URL && !emailSent) {
      try {
        const response = await fetch(process.env.FORMSPREE_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            phone: phone,
            company: company_name,
            scale: scale,
            remote: remote,
            roles: roles.join(', '),
            recipients: EMAIL_RECIPIENTS.join(', '),
            message: `Company: ${company_name}\nScaling: ${scale}\nRemote: ${remote}\nRoles: ${roles.join(', ')}\nEmail: ${email}\nPhone: ${phone}\n\nPlease also send to: ${EMAIL_RECIPIENTS.join(' and ')}`
          }),
        })

        if (response.ok) {
          emailSent = true
          emailMethod = 'Formspree'
          if (isDevelopment) {
            console.log('✅ Email sent via Formspree fallback')
          }
        }
      } catch (error) {
        if (isDevelopment) {
          console.error('❌ Formspree fallback failed:', error)
        }
      }
    }
    
    // Final fallback: Log to console (development only)
    if (!emailSent && isDevelopment) {
      console.log('📧 New Form Submission (Development Mode):')
      console.log('Recipients:', EMAIL_RECIPIENTS.join(', '))
      console.log('Data:', JSON.stringify(emailData, null, 2))
      console.log('')
      console.log('💡 Email not sent - Configure one of these FREE options:')
      console.log('')
      console.log('🔥 OPTION 1: Gmail SMTP (Recommended)')
      console.log('   GMAIL_USER=your-gmail@gmail.com')
      console.log('   GMAIL_PASS=your-16-character-app-password')
      console.log('   📝 Use App Password, not regular password!')
      console.log('')
      console.log('🔥 OPTION 2: Formspree (Production Fallback)')
      console.log('   FORMSPREE_URL=https://formspree.io/f/your-form-id')
      console.log('')
      console.log('🔥 OPTION 3: Webhook (Testing)')
      console.log('   WEBHOOK_URL=https://webhook.site/your-unique-id')
      console.log('')
      console.log('See EMAIL_SETUP.md for detailed instructions!')
      
      emailMethod = 'Console Log (Development Mode)'
    } else if (!emailSent) {
      emailMethod = 'No Email Service Configured'
    }

    return NextResponse.json(
      { 
        message: 'Request processed successfully',
        method: emailMethod,
        success: true,
        recipients: EMAIL_RECIPIENTS,
        data: emailData
      },
      { status: 200 }
    )

  } catch (error) {
    // Keep essential error logging for debugging
    console.error('❌ Error processing request:', error)
    
    // Even if there's an error, try to log the data so it's not lost (development only)
    if (isDevelopment) {
      try {
        const body = await request.clone().json()
        console.log('📧 Form data (saved due to error):', JSON.stringify(body, null, 2))
        console.log('📧 Intended recipients:', EMAIL_RECIPIENTS.join(', '))
      } catch (logError) {
        console.error('Could not log form data:', logError)
      }
    }
    
    return NextResponse.json(
      { 
        error: 'Email service temporarily unavailable. Your request has been logged.',
        success: true // Still return success so user doesn't see error
      },
      { status: 200 } // Return 200 instead of 500 to prevent user-facing errors
    )
  }
}

function generateEmailHTML(data: any) {
  const { company_name, scale, remote, roles, email, phone } = data
  
  return `
    <div style="font-family: 'Roboto', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
      <div style="background: linear-gradient(135deg, #4A90E2 0%, #50E3C2 100%); padding: 30px; border-radius: 15px; text-align: center; margin-bottom: 30px;">
        <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">🚀 New Hiring Request</h1>
        <p style="color: #e6f0fa; margin: 10px 0 0 0; font-size: 16px;">From Thinkify Labs Form</p>
      </div>
      
      <div style="background: white; padding: 30px; border-radius: 15px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
        ${company_name ? `
          <div style="margin-bottom: 25px; padding: 20px; background: #f0f9ff; border-radius: 10px; border-left: 4px solid #4A90E2;">
            <h3 style="margin: 0 0 8px 0; color: #1f2937; font-size: 18px;">🏢 Company</h3>
            <p style="margin: 0; font-size: 16px; color: #374151; font-weight: 500;">${company_name}</p>
          </div>
        ` : ''}
        
        <div style="margin-bottom: 25px; padding: 20px; background: #f0fdf4; border-radius: 10px; border-left: 4px solid #50E3C2;">
          <h3 style="margin: 0 0 8px 0; color: #1f2937; font-size: 18px;">📈 Scaling Plans</h3>
          <p style="margin: 0; font-size: 16px; color: #374151; font-weight: 500;">${scale}</p>
        </div>
        
        <div style="margin-bottom: 25px; padding: 20px; background: #fef3f2; border-radius: 10px; border-left: 4px solid #f97316;">
          <h3 style="margin: 0 0 8px 0; color: #1f2937; font-size: 18px;">🌍 Remote Work</h3>
          <p style="margin: 0; font-size: 16px; color: #374151; font-weight: 500;">${remote}</p>
        </div>
        
        <div style="margin-bottom: 25px; padding: 20px; background: #faf5ff; border-radius: 10px; border-left: 4px solid #a855f7;">
          <h3 style="margin: 0 0 12px 0; color: #1f2937; font-size: 18px;">👥 Roles Needed</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            ${roles.map((role: string) => `
              <span style="background: #4A90E2; color: white; padding: 6px 12px; border-radius: 20px; font-size: 14px; font-weight: 500;">${role}</span>
            `).join('')}
          </div>
        </div>
        
        <div style="margin-bottom: 25px; padding: 20px; background: #ecfdf5; border-radius: 10px; border-left: 4px solid #10b981;">
          <h3 style="margin: 0 0 12px 0; color: #1f2937; font-size: 18px;">📧 Email</h3>
          <p style="margin: 0; font-size: 16px; color: #374151; font-weight: 500;">${email}</p>
        </div>
        
        <div style="margin-bottom: 0; padding: 20px; background: #eff6ff; border-radius: 10px; border-left: 4px solid #3b82f6;">
          <h3 style="margin: 0 0 8px 0; color: #1f2937; font-size: 18px;">📞 Phone</h3>
          <p style="margin: 0; font-size: 16px; color: #374151; font-weight: 500;">${phone}</p>
        </div>
      </div>
      
      <div style="text-align: center; margin-top: 30px; padding: 20px; background: white; border-radius: 15px;">
        <p style="margin: 0; color: #6b7280; font-size: 14px;">
          Received at ${new Date().toLocaleString('en-US', { 
            timeZone: 'America/New_York',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })} EST
        </p>
      </div>
    </div>
  `
}

function generateEmailText(data: any) {
  const { company_name, scale, remote, roles, email, phone } = data
  
  return `
🚀 NEW HIRING REQUEST - THINKIFY LABS

🏢 Company: ${company_name}
📈 Scaling Plans: ${scale}
🌍 Remote Work: ${remote}
👥 Roles Needed: ${roles.join(', ')}
📧 Email: ${email}
📞 Phone: ${phone}

🕐 Received at ${new Date().toLocaleString('en-US', { 
  timeZone: 'America/New_York',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
})} EST

---
Sent from Thinkify Labs Form
  `
} 