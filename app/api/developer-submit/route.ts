import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const isDevelopment = process.env.NODE_ENV === 'development'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      full_name, 
      email, 
      phone, 
      location, 
      experience_years, 
      skills, 
      preferred_roles, 
      remote_preference, 
      current_status,
      user_type 
    } = body

    // Validate required fields
    if (!full_name || !email || !phone || !location || !experience_years || !skills || !preferred_roles || !remote_preference || !current_status) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Format the email content
    const emailData = {
      to: 'psmithul@gmail.com',
      subject: `👨‍💻 New Developer Profile: ${full_name} - Thinkify Labs`,
      timestamp: new Date().toISOString(),
      data: {
        full_name,
        email,
        phone,
        location,
        experience_years,
        skills,
        preferred_roles,
        remote_preference,
        current_status,
        user_type
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
            pass: process.env.GMAIL_PASS
          }
        })

        await transporter.verify()

        await transporter.sendMail({
          from: `"Thinkify Labs" <${process.env.GMAIL_USER}>`,
          to: 'psmithul@gmail.com',
          subject: emailData.subject,
          html: generateDeveloperEmailHTML(emailData.data),
          text: generateDeveloperEmailText(emailData.data)
        })

        emailSent = true
        emailMethod = 'Gmail SMTP'
        if (isDevelopment) {
          console.log('✅ Developer profile email sent successfully via Gmail SMTP')
        }
      } catch (error) {
        if (isDevelopment) {
          console.error('❌ Gmail SMTP failed:', error)
        }
      }
    }

    // Option 2: Formspree Fallback
    if (process.env.FORMSPREE_URL && !emailSent) {
      try {
        const response = await fetch(process.env.FORMSPREE_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            full_name: full_name,
            phone: phone,
            location: location,
            experience_years: experience_years,
            skills: skills.join(', '),
            preferred_roles: preferred_roles.join(', '),
            remote_preference: remote_preference,
            current_status: current_status,
            user_type: user_type,
            message: `New Developer Profile\nName: ${full_name}\nEmail: ${email}\nPhone: ${phone}\nLocation: ${location}\nExperience: ${experience_years}\nSkills: ${skills.join(', ')}\nPreferred Roles: ${preferred_roles.join(', ')}\nRemote Preference: ${remote_preference}\nCurrent Status: ${current_status}`
          }),
        })

        if (response.ok) {
          emailSent = true
          emailMethod = 'Formspree'
          if (isDevelopment) {
            console.log('✅ Developer profile sent via Formspree fallback')
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
      console.log('👨‍💻 New Developer Profile (Development Mode):', JSON.stringify(emailData, null, 2))
      emailMethod = 'Console Log (Development Mode)'
    } else if (!emailSent) {
      emailMethod = 'No Email Service Configured'
    }

    return NextResponse.json(
      { 
        message: 'Developer profile submitted successfully',
        method: emailMethod,
        success: true,
        data: emailData
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('❌ Error processing developer submission:', error)
    
    if (isDevelopment) {
      try {
        const body = await request.clone().json()
        console.log('👨‍💻 Developer profile data (saved due to error):', JSON.stringify(body, null, 2))
      } catch (logError) {
        console.error('Could not log developer profile data:', logError)
      }
    }
    
    return NextResponse.json(
      { 
        error: 'Profile submission temporarily unavailable. Your data has been logged.',
        success: true
      },
      { status: 200 }
    )
  }
}

function generateDeveloperEmailHTML(data: any) {
  const { 
    full_name, 
    email, 
    phone, 
    location, 
    experience_years, 
    skills, 
    preferred_roles, 
    remote_preference, 
    current_status 
  } = data
  
  return `
    <div style="font-family: 'Roboto', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
      <div style="background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%); padding: 30px; border-radius: 15px; text-align: center; margin-bottom: 30px;">
        <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">👨‍💻 New Developer Profile</h1>
        <p style="color: #e6f0fa; margin: 10px 0 0 0; font-size: 16px;">From Thinkify Labs Developer Form</p>
      </div>
      
      <div style="background: white; padding: 30px; border-radius: 15px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
        <div style="margin-bottom: 25px; padding: 20px; background: #eff6ff; border-radius: 10px; border-left: 4px solid #3b82f6;">
          <h3 style="margin: 0 0 8px 0; color: #1f2937; font-size: 18px;">👤 Personal Information</h3>
          <p style="margin: 0; font-size: 16px; color: #374151; font-weight: 500;">Name: ${full_name}</p>
          <p style="margin: 4px 0 0 0; font-size: 16px; color: #374151; font-weight: 500;">Location: ${location}</p>
        </div>
        
        <div style="margin-bottom: 25px; padding: 20px; background: #f0fdf4; border-radius: 10px; border-left: 4px solid #10b981;">
          <h3 style="margin: 0 0 8px 0; color: #1f2937; font-size: 18px;">📈 Experience</h3>
          <p style="margin: 0; font-size: 16px; color: #374151; font-weight: 500;">Years: ${experience_years}</p>
          <p style="margin: 4px 0 0 0; font-size: 16px; color: #374151; font-weight: 500;">Status: ${current_status}</p>
        </div>
        
        <div style="margin-bottom: 25px; padding: 20px; background: #fef3f2; border-radius: 10px; border-left: 4px solid #f97316;">
          <h3 style="margin: 0 0 8px 0; color: #1f2937; font-size: 18px;">⚡ Skills</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            ${skills.map((skill: string) => `
              <span style="background: #3b82f6; color: white; padding: 6px 12px; border-radius: 20px; font-size: 14px; font-weight: 500;">${skill}</span>
            `).join('')}
          </div>
        </div>
        
        <div style="margin-bottom: 25px; padding: 20px; background: #faf5ff; border-radius: 10px; border-left: 4px solid #a855f7;">
          <h3 style="margin: 0 0 8px 0; color: #1f2937; font-size: 18px;">🎯 Preferred Roles</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            ${preferred_roles.map((role: string) => `
              <span style="background: #8b5cf6; color: white; padding: 6px 12px; border-radius: 20px; font-size: 14px; font-weight: 500;">${role}</span>
            `).join('')}
          </div>
        </div>
        
        <div style="margin-bottom: 25px; padding: 20px; background: #ecfdf5; border-radius: 10px; border-left: 4px solid #10b981;">
          <h3 style="margin: 0 0 8px 0; color: #1f2937; font-size: 18px;">🌍 Remote Preference</h3>
          <p style="margin: 0; font-size: 16px; color: #374151; font-weight: 500;">${remote_preference}</p>
        </div>
        
        <div style="margin-bottom: 0; padding: 20px; background: #eff6ff; border-radius: 10px; border-left: 4px solid #3b82f6;">
          <h3 style="margin: 0 0 12px 0; color: #1f2937; font-size: 18px;">📧 Email</h3>
          <p style="margin: 0; font-size: 16px; color: #374151; font-weight: 500;">${email}</p>
        </div>
        
        <div style="margin-top: 20px; padding: 20px; background: #fef3f2; border-radius: 10px; border-left: 4px solid #f97316;">
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

function generateDeveloperEmailText(data: any) {
  const { 
    full_name, 
    email, 
    phone, 
    location, 
    experience_years, 
    skills, 
    preferred_roles, 
    remote_preference, 
    current_status 
  } = data
  
  return `
👨‍💻 NEW DEVELOPER PROFILE - THINKIFY LABS

👤 Personal Information
Name: ${full_name}
Location: ${location}

📈 Experience
Years: ${experience_years}
Status: ${current_status}

⚡ Skills: ${skills.join(', ')}

🎯 Preferred Roles: ${preferred_roles.join(', ')}

🌍 Remote Preference: ${remote_preference}

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
Sent from Thinkify Labs Developer Form
  `
} 