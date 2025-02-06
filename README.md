# 🐾 Pet Care SaaS

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js%2015-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

An AI-powered Software as a Service (SaaS) platform that revolutionizes pet care management. Built with Next.js 15 and TypeScript, this platform helps pet parents track, manage, and optimize their pet's health and care routines with artificial intelligence.

[Demo](https://pet-care-saas.vercel.app) · [Report Bug](https://github.com/alexgutscher26/pet-care-saas/issues) · [Request Feature](https://github.com/alexgutscher26/pet-care-saas/issues)

</div>

## 🌟 Features Overview

### 🤖 AI-Powered Care
- **Smart Recommendations**: AI-driven pet care suggestions based on pet's breed, age, and health conditions
- **Predictive Health Analytics**: Early detection of potential health issues
- **Automated Care Plans**: Customized schedules for feeding, exercise, and medications

### 📊 Comprehensive Dashboard
- **Health Monitoring**: Real-time tracking of vital health metrics
- **Activity Tracking**: Monitor exercise, play time, and rest patterns
- **Milestone Tracking**: Document and celebrate important pet moments
- **Weather Integration**: Activity recommendations based on local weather

### 🔔 Smart Notifications
- **Multi-channel Alerts**: Email, SMS, and in-app notifications
- **Customizable Reminders**: For medications, appointments, and activities
- **Priority-based System**: Urgent alerts for critical care needs
- **Smart Scheduling**: AI-optimized reminder timing

### 💳 Subscription Plans
- **Free Tier**: Basic pet care tracking
- **Premium**: $5/month - Full AI features and unlimited pets
- **Enterprise**: Custom solutions for pet care businesses
- **30-day Money-back Guarantee**

### 🎨 Modern Design
- **Responsive Interface**: Seamless experience across all devices
- **Dark/Light Mode**: Customizable theme preferences
- **Intuitive Navigation**: User-friendly information architecture
- **Accessibility**: WCAG 2.1 compliant

## 🚀 Tech Stack

### Frontend
- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [Shadcn UI](https://ui.shadcn.com/)
- **State Management**: [React Query](https://tanstack.com/query/latest)
- **Charts**: [Recharts](https://recharts.org/)

### Backend & Infrastructure
- **Database**: [Supabase](https://supabase.com/)
- **File Storage**: [Supabase Storage](https://supabase.com/storage)
- **API Integration**: REST & GraphQL support

### Payments & Analytics
- **Payment Processing**: 
  - [Stripe](https://stripe.com/) - Credit card payments
  - [Lemon Squeezy](https://www.lemonsqueezy.com/) - Digital product sales
- **Analytics**: 
  - [Google Analytics](https://analytics.google.com/)
  - Custom event tracking
- **Error Tracking**: [Sentry](https://sentry.io/)

### Testing & Quality
- **Testing Framework**: [Jest](https://jestjs.io/)
- **E2E Testing**: [Playwright](https://playwright.dev/)
- **Linting**: ESLint with custom rules
- **Code Formatting**: Prettier

## 📋 Prerequisites

- Node.js 18.17 or later
- pnpm 8.x or later
- Git
- A Supabase account
- Stripe account (for payments)

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

4. Initialize the database:
   ```bash
   pnpm db:push
   ```

5. Start the development server:
   ```bash
   pnpm dev
   ```

## 🏗️ Project Structure

```
pet-care-landing/
├── app/                    # Next.js 15 App Router
│   ├── (auth)/            # Authentication routes
│   ├── (dashboard)/       # Protected dashboard routes
│   ├── (marketing)/       # Public marketing pages
│   └── api/               # API routes
├── components/            # Reusable UI components
│   ├── ui/               # Shadcn UI components
│   ├── forms/            # Form components
│   └── shared/           # Shared components
├── lib/                   # Utility functions
│   ├── utils/            # Helper functions
│   ├── hooks/            # Custom React hooks
│   └── config/           # Configuration files
├── public/               # Static assets
├── styles/               # Global styles
├── types/                # TypeScript definitions
└── tests/                # Test files
```

## 🔑 Environment Variables

Create a `.env.local` file with the following variables:

```env
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Database & Auth
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=your_ga_id
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn

# Payments
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
LEMON_SQUEEZY_API_KEY=your_lemon_squeezy_key
```

## 🚀 Deployment

1. **Vercel Deployment** (Recommended):
   ```bash
   vercel
   ```

2. **Manual Deployment**:
   ```bash
   pnpm build
   pnpm start
   ```

## 🧪 Testing

```bash
# Unit tests
pnpm test

# E2E tests
pnpm test:e2e

# Test coverage
pnpm test:coverage
```

## 📈 Performance

- **Lighthouse Score**: 95+ on all metrics
- **Core Web Vitals**: Meets all thresholds
- **Bundle Size**: Optimized with code splitting
- **Image Optimization**: Automatic with next/image
- **API Response Time**: < 100ms average

## 🛡️ Security

- **Authentication**: Multi-factor authentication support
- **Authorization**: Role-based access control
- **Data Protection**: End-to-end encryption
- **API Security**: Rate limiting and CORS protection
- **Regular Security Audits**: Automated vulnerability scanning

## 🌐 Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- Mobile browsers (iOS 12+, Android 8+)

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a pull request

Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and development process.

## 🙏 Acknowledgments

- [Next.js Team](https://nextjs.org/)
- [Vercel](https://vercel.com/)
- [Shadcn](https://ui.shadcn.com/)
- All our contributors and supporters

## 📞 Support

- Documentation: [docs.pet-care-saas.com](https://docs.pet-care-saas.com)
- Email: support@pet-care-saas.com
- Discord: [Join our community](https://discord.gg/pet-care-saas)

---

<div align="center">
Made with ❤️ by Alex Gutscher
</div>
