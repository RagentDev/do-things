# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Development & Building
```bash
npm run dev           # Start development server with host binding
npm run build         # Create production build
npm run preview       # Preview production build
```

### Code Quality
```bash
npm run check         # Type checking with svelte-check
npm run check:watch   # Type checking in watch mode
npm run lint          # Run prettier and eslint checks
npm run format        # Format code with prettier
```

### Project Setup Requirements
- Use line endings set to "LF" (Unix/MacOS): `git config --global core.autocrlf false`
- Run `npm install` to set up dependencies

## Architecture Overview

This is a SvelteKit 5 application with TypeScript that implements a daily goals tracking system. The project uses modern Svelte 5 features including runes for state management.

### Core Architecture Patterns

**Rune-based State Management**: The application uses Svelte 5 runes instead of traditional stores. State is managed through dedicated rune files in `src/lib/runes/`:
- `dailyGoalsRunes.svelte.ts` - Manages daily goals and goal setups with localStorage persistence
- `loggerRunes.svelte.ts` - Development-only logging system with on-screen console
- `themeStore.svelte.ts` - Theme switching with system preference detection

**State Persistence**: Each rune implements its own localStorage persistence pattern with:
- Initial state loading from storage
- Reactive effects for automatic saving
- Error handling for storage failures

**Component Structure**:
- `src/lib/components/common/` - Reusable UI components (GlassCard, MrButton, MrIcon)
- `src/lib/components/console/` - Development console components
- `src/lib/components/goals/` - Goal-specific components

### Key Libraries & Dependencies
- **date-fns**: Used for all date operations and formatting
- **@mdi/js**: Material Design Icons
- **Sass**: CSS preprocessing with custom utility classes

### Styling Architecture
The project uses **custom utility classes** defined in `src/lib/styles/utility.scss` instead of TailwindCSS. This provides a minimal set of utility classes for:
- Layout (flex, grid, positioning)
- Spacing (margin, padding with consistent scale)
- Typography (font sizes, weights, alignment)
- Display utilities (block, hidden, etc.)

Use these custom utility classes for consistent styling across components.

### Logging System
The project includes a custom logger for development that displays logs in an on-screen console:

```typescript
import { logger } from '$lib/runes/loggerRunes.svelte';

// Available only in development mode
logger?.info('Message');
logger?.success('Success message');  
logger?.error('Error message');
logger?.warn('Warning message');
logger?.debug('Debug message');
```

**Important**: Only use this logger in runes/stores. Reserve `console.error` for serious errors only.

### Environment Configuration
Environment configuration is handled through `src/lib/config.ts` with `isDev`, `isProd`, and `isTest` exports based on `APP_ENV`.

### PWA Features
The application includes service worker configuration and is set up as a Progressive Web App with manifest and icons in the `static/` directory.