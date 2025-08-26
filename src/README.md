# Source Code Organization

## Directory Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── journal/       # Journal CRUD operations
│   │   ├── analyze/       # Content analysis
│   │   ├── chatbot/       # AI chatbot interactions
│   │   └── health/        # Health checks
│   ├── auth/              # Authentication pages
│   ├── calendar/          # Calendar page
│   └── layout.tsx         # Root layout
├── components/             # React Components
│   ├── ui/                # Reusable UI components
│   ├── BaseCalendar/      # Calendar functionality
│   ├── AIChatbot/         # Chatbot components
│   ├── JournalingDrawer/  # Journal entry interface
│   ├── icons/             # Custom SVG icons
│   └── AuthHeader.tsx     # Authentication header
├── hooks/                  # Custom React Hooks
│   ├── useTheme.ts        # Theme management
│   ├── useChatbot.ts      # Chatbot state management
│   └── useJournal.ts      # Journal context hook
├── contexts/               # React Context Providers
│   └── JournalContext.tsx # Journal state management
├── lib/                    # Utility Libraries
│   ├── auth.ts            # NextAuth configuration
│   ├── openai.ts          # OpenAI client
│   ├── utils.ts           # General utilities
│   ├── chatbot-prompts.ts # AI prompt templates
│   ├── chatbot-context.ts # Context building logic
│   └── crisis-detection.ts # Crisis detection logic
├── services/               # Business Logic Services
│   ├── authService.ts     # Authentication logic
│   ├── journalService.ts  # Journal operations
│   ├── analysisService.ts # Content analysis
│   └── chatbotService.ts  # AI interactions
├── types/                  # TypeScript Type Definitions
│   └── index.ts           # Centralized types
├── constants/              # Application Constants
│   └── index.ts           # Centralized constants
├── generated/              # Generated files (Prisma)
├── lotties/               # Animation files
└── textures/              # Texture assets
```

## Organization Principles

### 1. Separation of Concerns
- **Components**: Pure UI components with minimal business logic
- **Services**: Business logic and external API interactions
- **Hooks**: State management and side effects
- **Types**: Centralized TypeScript definitions
- **Constants**: Application configuration and constants

### 2. Feature-Based Organization
- Related functionality is grouped together
- Each feature has its own directory when complex
- Shared utilities are in `lib/` and `services/`

### 3. Import Path Consistency
- All imports use `@/` alias for absolute paths
- Clear import hierarchy: `@/components/`, `@/services/`, `@/types/`

### 4. Scalability
- Easy to add new features
- Clear separation between UI and business logic
- Centralized configuration and types

## Best Practices

### Components
- Keep components focused and single-purpose
- Use TypeScript interfaces for props
- Implement proper error boundaries

### Services
- Handle all external API calls
- Implement proper error handling
- Return consistent response formats

### Types
- Define interfaces in `types/index.ts`
- Use strict typing throughout the application
- Avoid `any` types

### Constants
- Centralize all configuration values
- Use `as const` for immutable constants
- Group related constants together

## Adding New Features

1. **Create types** in `types/index.ts`
2. **Add constants** in `constants/index.ts`
3. **Implement services** in `services/`
4. **Create components** in appropriate `components/` subdirectory
5. **Add hooks** in `hooks/` if needed
6. **Update this README** with new structure

## Migration Notes

- **DemoWidget**: Consider removing from production
- **Loose files**: Move `AuthHeader.tsx` to appropriate auth directory
- **Asset folders**: Consider moving `lotties/` and `textures/` to `public/`
