# Environment Configuration

Copy this to `.env.local` and configure at least one email option:

```bash
# Email Configuration Options
# Choose ONE of the following options to enable email delivery:

# Option 1: Gmail SMTP (Recommended for development)
# GMAIL_USER=your-gmail@gmail.com
# GMAIL_PASS=your-16-character-app-password

# Option 2: Outlook/Hotmail SMTP
# OUTLOOK_USER=your-email@outlook.com
# OUTLOOK_PASS=your-password

# Option 3: Yahoo SMTP
# YAHOO_USER=your-email@yahoo.com
# YAHOO_PASS=your-password

# Option 4: Custom SMTP (for services like Mailtrap, SendGrid, etc.)
# SMTP_HOST=smtp.mailtrap.io
# SMTP_PORT=587
# SMTP_SECURE=false
# SMTP_USER=your-username
# SMTP_PASS=your-password

# Option 5: Webhook for testing (e.g., webhook.site)
# WEBHOOK_URL=https://webhook.site/your-unique-id

# Option 6: Formspree fallback
# FORMSPREE_URL=https://formspree.io/f/your-form-id
```

## Email Recipients

All form submissions will be sent to:
- `psmithul@gmail.com`
- `kulkarni.karthik@thinkify.io`

## Gmail Setup Instructions

1. Enable 2-factor authentication on your Gmail account
2. Go to [Google Account Security](https://myaccount.google.com/security)
3. Click "App passwords"
4. Generate a new app password for "Mail"
5. Use the 16-character password in `GMAIL_PASS`
6. Use your full Gmail address in `GMAIL_USER`

## Testing

If no email configuration is provided, form submissions will be logged to the console in development mode. 