# Mental Health Journal - Next.js PDP Application

## Project Description

A comprehensive mental health journaling application built with Next.js 15, featuring AI-powered content analysis, crisis detection, and a supportive chatbot companion. The app in theory wpuld provide a safe space for users to document their thoughts and feelings while receiving intelligent insights and support...

## Key Features

- **Secure Authentication**: NextAuth.js with Google OAuth and email/password support
- **AI-Powered Analysis**: OpenAI integration for content moderation and safety detection
- **Mental Health Chatbot**: GPT-4 powered companion for emotional support and guidance
- **Real-time Calendar**: Interactive journaling interface with instant updates
- **Crisis Detection**: Automated identification of concerning content with appropriate resources
- **Responsive Design**: Tailwind CSS with dark mode support and smooth animations

## Tech Stack

- **Frontend Framework**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS v3, Framer Motion, clsx, tailwind-merge
- **Authentication**: NextAuth.js, bcryptjs, @next-auth/prisma-adapter
- **Database**: PostgreSQL with Prisma ORM (@prisma/client, prisma)
- **AI Services**: OpenAI GPT-4, Content Moderation API
- **State Management**: React Context API, Custom Hooks
- **Date Handling**: dayjs for calendar operations
- **Icons**: Lucide React for iconography
- **Development Tools**: ESLint, Prettier, PostCSS, Autoprefixer

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes (auth, journal, analyze, chatbot)
│   ├── auth/              # Authentication pages
│   ├── calendar/          # Main calendar interface
│   └── layout.tsx         # Root layout with providers
├── components/             # React Components
│   ├── ui/                # Reusable UI components
│   ├── BaseCalendar/      # Calendar functionality
│   ├── AIChatbot/         # AI chatbot interface
│   ├── JournalingDrawer/  # Journal entry interface
│   └── icons/             # Custom SVG icons
├── hooks/                  # Custom React Hooks
├── contexts/               # React Context Providers
├── lib/                    # Utility Libraries
├── services/               # Business Logic Services
├── types/                  # TypeScript Definitions
└── constants/              # Application Constants
```

## How to Start

1. **Install Dependencies**: `npm install`
2. **Environment Setup**: Configure `.env` with required API keys
3. **Database Setup**: Run `npx prisma db push` to sync schema
4. **Development**: `npm run dev` (runs on port 3069)

## Environment Variables

```env
# Database
DATABASE_URL="postgresql://..."

# Authentication
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3069"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# OpenAI
OPENAI_API_KEY="your-openai-api-key"
```

## Core Architecture

### Authentication Flow
- NextAuth.js handles both OAuth and credentials authentication
- Prisma adapter manages user sessions and database persistence
- Secure password hashing with bcryptjs

### AI Integration
- Content analysis using OpenAI's moderation API
- Crisis detection with automated response systems
- GPT-4 powered chatbot for emotional support

### State Management
- React Context for global journal entry state
- Custom hooks for chatbot and theme management
- Real-time updates without page refreshes

## Security Features

- **Content and Chat Moderation**: AI-powered safety detection
- **Crisis Detection and Intervention**: Automated crisis response with emergency resources
- **Data Privacy**: Secure user data handling and storage(in theory)
- **Input Validation**: Comprehensive form validation and sanitization(no zod for now)

## Performance Optimizations

- **Code Splitting**: Automatic Next.js code splitting
- **Image Optimization**: Next.js built-in image optimization
<- **Bundle Optimization**: keeping dependencies clean
>

## Development Guidelines

- **TypeScript**: Strict typing throughout the app
- **Component Structure**: Single responsibility principle
- **Error Handling**: Comprehensive error boundaries and user feedback (could be more centralised)
- **Accessibility**: ARIA labels and keyboard navigation support(in some palces)
