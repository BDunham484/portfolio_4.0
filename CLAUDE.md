# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

- `npm run dev` - Start development server with Turbopack on localhost:3000 (also opens browser automatically)
- `npm run build` - Build production application
- `npm start` - Start production server
- `npm run lint` - Run ESLint for code quality checks

## Project Architecture

### Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript with strict mode
- **Styling**: CSS Modules + global CSS
- **Animation**: Framer Motion
- **UI Libraries**: React Icons, react-intersection-observer

### Key Project Structure
```
src/
├── app/
│   ├── Components/          # Reusable UI components
│   │   ├── Header/         # Navigation header
│   │   ├── GhostGrid/      # Background grid component
│   │   └── FramerMotionWrapper.tsx
│   ├── About/              # Space Invaders game page
│   ├── Projects/           # Projects showcase
│   ├── Contact/            # Contact page
│   ├── Resume/             # Resume page
│   └── layout.tsx          # Root layout with providers
├── context/
│   ├── SpaceInvadersContext.tsx  # Game state management
│   └── ActiveSectionContext.tsx # Section navigation state
└── hooks/
    ├── useSectionInView.ts      # Intersection observer hook
    ├── useDelayedNavigation.ts  # Navigation with transitions
    └── useWindowSize.tsx        # Responsive window sizing
```

### TypeScript Configuration
- Path aliases: `@/*` maps to `./src/*`, `@components/*` maps to `./src/app/Components/*`
- Strict mode enabled with `noUncheckedIndexedAccess`
- Target: ES2017

### Unique Features

#### Space Invaders Game
The About page contains a fully functional Space Invaders game built in React:
- **Context**: `SpaceInvadersContext` manages game grid, alien positions, and player state
- **Controls**: Arrow keys for movement, Arrow Down to start game, Arrow Up to shoot, End to stop
- **Grid System**: Dynamic grid calculation based on viewport size (targets ~50px squares)
- **Game Logic**: Alien movement patterns, collision detection, laser mechanics

#### Animation System
- Framer Motion used throughout for page transitions and element animations
- Custom variants for entrance/exit animations
- Frozen route system to prevent layout shifts during transitions

#### Responsive Design
- CSS Modules for component-scoped styling
- Dynamic calculations for viewport-dependent layouts
- Window size hooks for responsive behavior

### Development Notes
- Uses `'use client'` directive for client-side components
- Custom hooks for reusable logic (section views, navigation, window sizing)
- Geist font family loaded via next/font/google
- No testing framework currently configured