# 🐾 Pet Care SaaS

An AI-powered Software as a Service (SaaS) platform that revolutionizes pet care management. Built with Next.js 15 and TypeScript, this platform helps pet parents track, manage, and optimize their pet's health and care routines with artificial intelligence.

## ✨ Key SaaS Features

- 🤖 **AI-Powered Care**
  - Smart pet care recommendations
  - Personalized care reminders
  - Intelligent health tracking

- 📊 **Health Dashboard**
  - Comprehensive health monitoring
  - Progress tracking over time
  - Important milestone tracking

- 🔔 **Smart Notifications**
  - Multi-channel delivery (Email, SMS, App)
  - Customizable alerts
  - Care milestone reminders

- 💳 **Simple Pricing**
  - Affordable monthly subscription ($5/month) Will Change Later
  - 30-day money-back guarantee
  - Cancel anytime flexibility

- 🎨 **Modern UI/UX**
  - Responsive design
  - Intuitive navigation
  - Beautiful gradients and animations

## 🚀 Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) with App Router
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [Shadcn UI](https://ui.shadcn.com/)
- **Authentication:** [Clerk](https://clerk.com/)
- **Database:** [Supabase](https://supabase.com/)
- **State Management:** [React Query](https://tanstack.com/query/latest)
- **Payment Processing:** [Stripe](https://stripe.com/), [Lemon Squeezy](https://www.lemonsqueezy.com/)
- **Analytics:** [Google Analytics](https://analytics.google.com/)
- **Testing:** [Jest](https://jestjs.io/)

## 📋 Prerequisites

- Node.js 18.17 or later
- pnpm 8.x or later

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/alexgutscher26/pet-care-saas.git
   cd pet-care-saas
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Fill in your environment variables in `.env.local`

4. Start the development server:
   ```bash
   pnpm dev
   ```

## 🏗️ Project Structure

```
pet-care-landing/
├── app/                    # Next.js 15 App Router
├── components/            # Reusable UI components
├── lib/                   # Utility functions and configurations
├── public/               # Static assets
└── types/                # TypeScript type definitions
```

## 🔑 Environment Variables

Create a `.env.local` file with the following variables:

```env
# Database Also using Supabase for Auth
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Analytics Not Implemented
NEXT_PUBLIC_GA_MEASUREMENT_ID=

# Payments Not Implemented
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
LEMON_SQUEEZY_API_KEY=
```

## 📱 Features

- Responsive design with mobile-first approach
- Modern UI components with Shadcn UI
- Secure authentication with Clerk
- Real-time database with Supabase
- Payment processing integration
- Analytics tracking
- Performance optimized images
- Accessibility compliant
- SEO optimized

## 🧪 Testing

Run the test suite:

```bash
pnpm test
```

## 🚀 Deployment

The application can be deployed on [Vercel](https://vercel.com) with zero configuration:

```bash
pnpm build
```

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.
