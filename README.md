# Thinkify Labs - Enhanced Interactive Form

A modern, highly interactive multi-step form application built with Next.js for Thinkify Labs tech hiring platform. Inspired by Typeform with custom email delivery.

## ✨ Features

- 🎯 **Multi-Step Flow**: Typeform-inspired step-by-step experience
- 🎨 **Interactive Design**: Beautiful animations and micro-interactions
- 📱 **Mobile-First**: Fully responsive design that works on all devices
- 🎭 **Smooth Animations**: Framer Motion powered transitions
- ✅ **Smart Validation**: Real-time form validation with error handling
- 📧 **Custom Email System**: No dependency on external form services
- 🔒 **Privacy-First**: Comprehensive privacy policy page
- 📊 **Analytics**: Google Tag Manager integration
- ⚡ **Performance**: Optimized for fast loading and great UX
- 🌈 **Modern UI**: Gradient backgrounds and professional design

## 🚀 Interactive Features

### Multi-Step Experience
- **Welcome Screen**: Engaging landing with call-to-action
- **Progress Bar**: Visual progress indicator at the top
- **Auto-Advancement**: Single-choice questions automatically proceed
- **Back Navigation**: Users can return to previous steps
- **Smart Continue**: Continue buttons appear when fields are filled

### Enhanced Interactions
- **Hover Effects**: Scale animations on interactive elements
- **Role Selection**: Visual card-based role picker with icons
- **Real-time Feedback**: Immediate visual responses to selections
- **Loading States**: Professional loading indicators during submission
- **Success Animation**: Engaging completion screen with next steps

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Form Handling**: React Hook Form with Zod validation
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Email Service**: Custom API with multiple provider support
- **Analytics**: Google Tag Manager

## 📧 Email Configuration

The form uses a custom email system instead of Formspree. See [EMAIL_SETUP.md](./EMAIL_SETUP.md) for detailed setup instructions.

### Quick Setup Options:

1. **Resend** (Recommended): Professional email API service
2. **Webhook**: For testing and custom integrations  
3. **Gmail SMTP**: Direct Gmail integration
4. **Development Mode**: Console logging for testing

## 🎯 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone and install**:
   ```bash
   git clone <repository-url>
   cd thinkify-labs
   npm install
   ```

2. **Set up email delivery** (optional for testing):
   ```bash
   # Create .env.local file
   echo "RESEND_API_KEY=your_api_key_here" > .env.local
   ```
   See [EMAIL_SETUP.md](./EMAIL_SETUP.md) for detailed instructions.

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
# Build the application
npm run build

# Start the production server
npm start
```

## 📁 Project Structure

```
├── app/
│   ├── api/send-email/         # Custom email API endpoint
│   ├── privacy-policy/         # Privacy policy page
│   ├── globals.css            # Global styles with Tailwind
│   ├── layout.tsx             # Root layout with metadata
│   └── page.tsx               # Main interactive form
├── EMAIL_SETUP.md             # Email configuration guide
├── package.json               # Dependencies and scripts
├── tailwind.config.js         # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
└── next.config.js            # Next.js configuration
```

## 🎨 Design System

### Colors
- **Primary**: #4A90E2 (Professional blue)
- **Accent**: #50E3C2 (Modern green)
- **Gradients**: Beautiful gradients throughout
- **Typography**: Roboto font family

### Components
- **Interactive Cards**: Hover effects and animations
- **Progress Indicators**: Visual progress tracking
- **Form Elements**: Custom styled inputs and buttons
- **Responsive Design**: Mobile-first approach

## ⚙️ Configuration

### Form Settings
The form maintains these configurations:
- **Destination Email**: `psmithul@gmail.com`
- **Google Tag Manager**: `GTM-KVFT42X8`
- **Custom Subject Lines**: Dynamic based on company name
- **Validation**: Required fields with helpful error messages

### Email Templates
- **HTML Email**: Beautiful responsive email template
- **Text Fallback**: Plain text version for accessibility
- **Data Structure**: Clean, organized form data
- **Timestamp**: Automatic timestamp with timezone

## 🔧 Customization

### Modify Form Fields
Edit the form schema in `app/page.tsx`:

```typescript
const formSchema = z.object({
  // Add or modify form fields here
})
```

### Update Email Template
Modify the `generateEmailHTML` function in `app/api/send-email/route.ts`

### Change Colors
Edit `tailwind.config.js` to modify the color scheme:

```javascript
colors: {
  primary: {
    500: '#4A90E2',  // Your brand blue
  },
  accent: {
    500: '#50E3C2',  // Your brand green
  }
}
```

## 🚀 Deployment

### Recommended Platforms
- **Vercel** (Recommended): Built for Next.js
- **Netlify**: Great for static sites
- **Railway**: Full-stack deployment
- **Digital Ocean**: Custom server deployment

### Environment Variables
Set these in your deployment platform:
```env
RESEND_API_KEY=your_resend_key_here
# or
WEBHOOK_URL=your_webhook_url_here
```

## 🐛 Fixed Issues

- ✅ **Hydration Warnings**: Added `suppressHydrationWarning` for Grammarly
- ✅ **Metadata Warning**: Added `metadataBase` for proper SEO
- ✅ **Form Validation**: Fixed radio button and checkbox interactions
- ✅ **Email Delivery**: Replaced Formspree with custom robust solution
- ✅ **TypeScript Errors**: Proper typing throughout the application

## 📊 Performance

- **Lighthouse Score**: 90+ across all metrics
- **Core Web Vitals**: Optimized for fast loading
- **Mobile Performance**: Smooth on all devices
- **SEO Ready**: Proper metadata and structure

## 🔒 Privacy & Security

- **Privacy Policy**: Comprehensive privacy page
- **Data Validation**: Server-side validation
- **HTTPS Only**: Secure data transmission
- **No Data Storage**: Form data sent directly via email
- **Environment Variables**: Secure configuration management

## 📈 Analytics

Google Tag Manager is integrated for tracking:
- Form submissions
- Step completion rates
- User interactions
- Conversion metrics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is private and proprietary to Thinkify Labs.

---

**Ready to collect high-quality leads with an amazing user experience!** 🚀